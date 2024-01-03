using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logix.Movies.Core.Wrappers
{
    public class Response<T>
    {
        public Response()
        {
            Succeeded = true;
        }
        public Response(T data, string message = null)
        {
            Succeeded = true;
            Message = message;
            Data = data;
        }
        public Response(string message)
        {
            Succeeded = true;
            Message = message;
        }
        public Response(bool succeed, string message)
        {
            Succeeded = succeed;
            Message = message;
        }
        public Response(bool succeed, string message, List<string> errors)
        {
            Succeeded = succeed;
            Message = message;
            Errors = errors;
        }

        public Response(T data, bool succeed, string message)
        {
            Data = data;
            Succeeded = succeed;
            Message = message;
        }

        public Response(T data, bool succeed, string message, List<string> errors)
        {
            Data = data;
            Succeeded = succeed;
            Message = message;
            Errors = errors;
        }
        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
        public T Data { get; set; }
        public string Title { get; set; }
    }
}
