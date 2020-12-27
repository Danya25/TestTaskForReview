using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentalstackTestTask.Common
{
    public static class MethodResultExt
    {
        public static MethodResult<T> ToSuccessMethodResult<T>(this T result)
        {
            return MethodResult<T>.GetSuccessResult(result, string.Empty);
        }

        public static MethodResult<T> ToErrorMethodResult<T>(this Exception ex, string friendlyText = "An error has occurred")
        {
            return MethodResult<T>.GetExceptionResult(friendlyText, ex);
        }

        public static MethodResult<T> ToErrorMethodResult<T>(this string friendlyText)
        {
            return MethodResult<T>.GetErrorResult(friendlyText, (Exception)null);
        }

        public static MethodResult<T> ToErrorMethodResult<T>(this List<string> errors, Exception ex = null, string friendlyText = "An error has occurred")
        {
            MethodResult<T> methodResult = new MethodResult<T>();
            methodResult.SetError(friendlyText, ex);
            methodResult.Errors = errors;
            return methodResult;
        }

        public static MethodResult<TTarget> To<TFrom, TTarget>(this MethodResult<TFrom> methodResultFrom, TTarget newValue)
        {
            MethodResult<TTarget> methodResult = new MethodResult<TTarget>();
            methodResult.Success = methodResultFrom.Success;
            methodResult.Value = newValue;
            methodResult.SetException(methodResultFrom.GetException());
            methodResult.Errors = methodResultFrom.Errors;
            methodResult.Message = methodResultFrom.Message;
            return methodResult;
        }
    }
}
