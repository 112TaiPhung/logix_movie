using Logix.Movies.Core.Response;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Helpers
{
    public static class EnumHelper
    {
        public static T ToEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        public static List<DataValueResponse> GetDescriptions<T>() where T : Enum
        {
            var type = typeof(T);
            var values = new List<DataValueResponse>();
            var names = Enum.GetNames(type);
            foreach (var name in names)
            {
                var field = type.GetField(name);
                var fields = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                foreach (DescriptionAttribute item in fields)
                {
                    var data = new DataValueResponse()
                    {
                        Id = name,
                        Name = name,
                        Description = item.Description
                    };
                    values.Add(data);
                }
            }
            values?.OrderBy(x => x.Name).ToList();
            return values;
        }

        public static string GetDescriptionFromKey<T>(string key) where T : Enum
        {
            try
            {
                var type = typeof(T);
                var name = Enum.GetNames(type).FirstOrDefault(e => e == key);
                var field = type.GetField(name);
                var fields = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                foreach (DescriptionAttribute item in fields)
                {
                    var data = new DataValueResponse()
                    {
                        Id = name,
                        Name = name,
                        Description = item.Description
                    };
                    return item?.Description;
                }
                return key;
            }
            catch
            {
                return key;
            }
        }

        public static string GetKeyFromDescription<T>(string description) where T : Enum
        {
            var type = typeof(T);
            var names = Enum.GetNames(type);
            foreach (var name in names)
            {
                var field = type.GetField(name);
                var fields = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                foreach (DescriptionAttribute item in fields)
                {
                    if (item.Description == description)
                    {
                        return name;
                    }
                }
            }
            return null;
        }

        public static string GetEnumDescription(this Enum enumValue)
        {
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }
    }   
}
