using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Helpers
{
    public static class ConvertHelper
    {
        public static DateTime ToLocal(this DateTime dateTime, int offset = 7)
        {
            return dateTime.AddHours(offset);
        }

        public static DateTime? ToLocal(this DateTime? dateTime, int offset = 7)
        {
            if (dateTime == null)
            {
                return null;
            }
            else
            {
                return dateTime.Value.AddHours(offset);
            }
        }

        public static string ToSafetyString(this object value, bool isTrim = false, string defaultValue = "")
        {
            if (value == null)
                return defaultValue;

            string result = value.ToString();

            if (isTrim)
                result = result.Trim();

            return result;
        }

        public static Guid? ToGuid(this object value)
        {
            try
            {
                var guidStr = value.ToSafetyString();
                if (guidStr == null)
                {
                    return null;
                }
                else
                {
                    return Guid.Parse(guidStr);
                }
            }
            catch
            {
                return null;
            }
        }

        public static Guid ToGuid(this object value, Guid defaultValue)
        {
            var result = value.ToGuid();
            if (result == null)
            {
                return defaultValue;
            }
            else
            {
                return result.Value;
            }
        }
    }
}
