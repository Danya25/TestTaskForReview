using System;
using System.Collections.Generic;
using System.Text;

namespace MentalstackTestTask.Common
{
    public class MethodResult<T>
    {
        public T Value { get; set; }
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
        public string Message { get; set; }
        public string ExceptionMessage { get; set; }

        private Exception _exception { get; set; }

        public MethodResult()
        {
            this.Success = false;
            this.Message = "Undefined";
        }

        public MethodResult<T> SetException(Exception ex)
        {
            this._exception = ex;
            this.GetFullExceptionMessage();
            return this;
        }
        public MethodResult<T> SetValue(T value)
        {
            this.Value = value;
            return this;
        }
        public Exception GetException()
        {
            return this._exception;
        }
        private string GetFullExceptionMessage(Exception ex)
        {
            StringBuilder stringBuilder = new StringBuilder();
            if (ex == null)
                return stringBuilder.ToString();
            stringBuilder.AppendFormat("Message: {0}; Error body: {1}", Message, ex.Message);
            if (ex.InnerException != null)
                stringBuilder.AppendFormat("\r\nInner exception: {0}", this.GetFullExceptionMessage(ex.InnerException));
            return stringBuilder.ToString();
        }
        public string GetFullExceptionMessage()
        {
            if (this._exception == null)
                return string.Format("Message: {0}; Exception missing", Message);
            return string.Format("Description:{0}\r\nTrace:{1}", this.GetFullExceptionMessage(this._exception), _exception.StackTrace);
        }

        public MethodResult<T> SetSuccess(T value, string message = "")
        {
            this._exception = (Exception)null;
            this.Success = true;
            this.Message = message;
            this.Value = value;
            return this;
        }
        public MethodResult<T> SetError(string message, Exception ex = null)
        {
            this._exception = ex;
            this.Success = false;
            this.Message = message;
            this.GetFullExceptionMessage();
            return this;
        }

        public MethodResult<T> SetErrorList(List<string> listErrors)
        {
            this.Errors = listErrors;
            return this;
        }

        public void ThrowExceptionIfNotOk()
        {
            if (this.Success)
                return;
            this.ThrowException();
        }

        public void ThrowException()
        {
            throw this._exception == null ? new Exception() : new Exception(this.Message);
        }

        public static MethodResult<T> GetErrorResult(string message = "", Exception ex = null)
        {
            MethodResult<T> methodResult = new MethodResult<T>();
            methodResult._exception = ex;
            methodResult.Success = false;
            methodResult.Message = message;
            methodResult.GetFullExceptionMessage();
            return methodResult;
        }

        public static MethodResult<T> GetExceptionResult(string message, Exception ex)
        {
            MethodResult<T> methodResult = new MethodResult<T>();
            methodResult._exception = ex;
            methodResult.Success = false;
            methodResult.Message = message;
            methodResult.ExceptionMessage = ex.Message;
            methodResult.GetFullExceptionMessage();
            return methodResult;
        }

        public static MethodResult<T> GetSuccessResult(T value, string message = "")
        {
            return new MethodResult<T>()
            {
                _exception = (Exception)null,
                Success = true,
                Message = message,
                Value = value
            };
        }
    }
}
