using Logix.Movies.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.SmartTable
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> OrderByName<T>(this IQueryable<T> source, string propertyName, bool isDescending, bool isThenBy = false)
        {
            if (source == null)
            {
                throw new ArgumentException(nameof(source));
            }

            if (string.IsNullOrWhiteSpace(propertyName))
            {
                throw new ArgumentException(nameof(propertyName));
            }

            Type type = typeof(T);
            ParameterExpression parameter = Expression.Parameter(type, "p");
            MemberExpression memberAccess = null;
            foreach (var property in propertyName.Split('.'))
                memberAccess = MemberExpression.Property
                    (memberAccess ?? (parameter as Expression), property);
            type = memberAccess?.Type;
            PropertyInfo propertyInfo = memberAccess.Member as PropertyInfo;
            Expression expression = Expression.Property(memberAccess.Expression, memberAccess.Member.Name);
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            LambdaExpression lambda = Expression.Lambda(delegateType, expression, parameter);

            var methodName = isDescending ? "OrderByDescending" : "OrderBy";
            if (isThenBy)
            {
                methodName = isDescending ? "ThenByDescending" : "ThenBy";
            }
            object result = typeof(Queryable).GetMethods().Single(
                method => method.Name == methodName
                        && method.IsGenericMethodDefinition
                        && method.GetGenericArguments().Length == 2
                        && method.GetParameters().Length == 2)
                .MakeGenericMethod(typeof(T), type)
                .Invoke(null, new object[] { source, lambda });
            return (IQueryable<T>)result;
        }

        public static IQueryable<T> FilterByName<T>(this IQueryable<T> Query, Filter filterOpt)
        {
            List<Filters> Criterias = filterOpt.Filters;
            if (Criterias.Count() == 0)
                return Query;

            LambdaExpression lambda;
            Expression resultCondition = null;

            // Create a member expression pointing to given column
            Type type = typeof(T);
            ParameterExpression parameter = Expression.Parameter(type, "p");

            foreach (var searchCriteria in Criterias)
            {
                if (string.IsNullOrEmpty(searchCriteria.Field))
                    continue;
                type = typeof(T);

                MemberExpression memberAccess = null;
                foreach (var property in searchCriteria.Field.Split('.'))
                    memberAccess = MemberExpression.Property
                        (memberAccess ?? (parameter as Expression), property);
                type = memberAccess?.Type;
                // Change the type of the parameter 'value'. it is necessary for comparisons (specially for booleans)
                // ConstantExpression filter = Expression.Constant(searchCriteria.Value, type);
                ConstantExpression filter = Expression.Constant(null);
                if (searchCriteria.Value != null)
                {
                    if (type == typeof(Guid))
                    {
                        filter = Expression.Constant
                       (
                           searchCriteria.Value.ToGuid(Guid.Empty)
                       );
                    }
                    else if (type == typeof(Guid?))
                    {
                        filter = Expression.Constant
                      (
                          searchCriteria.Value.ToGuid()
                      );
                    }
                    else
                    {
                        filter = Expression.Constant
                       (
                           Convert.ChangeType(searchCriteria.Value, type)
                       );
                    }
                }

                var valueExpression = Expression.Convert(filter, type);

                //switch operation
                Expression condition = null;
                switch (searchCriteria.Operator)
                {
                    //equal ==
                    case WhereOperation.Equal:
                        condition = Expression.Equal(memberAccess, valueExpression);
                        break;
                    //not equal !=
                    case WhereOperation.NotEqual:
                        condition = Expression.NotEqual(memberAccess, valueExpression);
                        break;
                    // Greater
                    case WhereOperation.Greater:
                        condition = Expression.GreaterThan(memberAccess, valueExpression);
                        break;
                    // Greater or equal
                    case WhereOperation.GreaterOrEqual:
                        condition = Expression.GreaterThanOrEqual(memberAccess, valueExpression);
                        break;
                    // Less
                    case WhereOperation.Less:
                        condition = Expression.LessThan(memberAccess, valueExpression);
                        break;
                    // Less or equal
                    case WhereOperation.LessEqual:
                        condition = Expression.LessThanOrEqual(memberAccess, valueExpression);
                        break;
                    //string.Contains()
                    case WhereOperation.Contains:
                        condition = Expression.Call(memberAccess,
                                                    typeof(string).GetMethod("Contains", new[] { typeof(string) }), filter);
                        break;
                    // First char
                    case WhereOperation.FirstChar:
                        condition = Expression.Call(memberAccess,
                                                    typeof(string).GetMethod("StartsWith", new[] { typeof(string) }), filter);
                        break;
                    default:
                        continue;
                }

                if (filterOpt.Logic.Value == Logic.or.Value)
                    resultCondition = resultCondition != null ? Expression.Or(resultCondition, condition) : condition;
                if (filterOpt.Logic.Value == Logic.and.Value)
                    resultCondition = resultCondition != null ? Expression.And(resultCondition, condition) : condition;
            }

            lambda = Expression.Lambda(resultCondition, parameter);

            MethodCallExpression result = Expression.Call(
                       typeof(Queryable), "Where",
                       new[] { Query.ElementType },
                       Query.Expression,
                       lambda);

            return Query.Provider.CreateQuery<T>(result);
        }
    }
}
