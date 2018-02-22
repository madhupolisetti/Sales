using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using log4net;

namespace Orders.UserDefinedClasses
{
    public static class Logger
    {
        private static ILog _defaultLogger = null;
        private static ILog _traceLogger = null;
        public static void InitializeLogger()
        {
            log4net.GlobalContext.Properties[Label.LOG_NAME] = DateTime.Now.ToString(Label.LOG_FILE_FORMAT);
            log4net.Config.XmlConfigurator.Configure();
            _defaultLogger = log4net.LogManager.GetLogger(Label.DEFAULT_LOGGER);
            _traceLogger = log4net.LogManager.GetLogger(Label.TRACE_LOGGER);
        }
        public static void Info(object input, bool isTrace = false)
        {
            if (isTrace)
            {
                _traceLogger.Info(input);
            }
            else
            {
                _defaultLogger.Info(input);
            }
        }
        public static void Error(object input, bool isTrace = false)
        {
            if (isTrace)
            {
                _traceLogger.Error(input);
            }
            else
            {
                _defaultLogger.Error(input);
            }
        }
        public static void Warn(object input, bool isTrace = false)
        {
            if (isTrace)
            {
                _traceLogger.Warn(input);
            }
            else
            {
                _defaultLogger.Warn(input);
            }
        }
        public static void Fatal(object input, bool isTrace = false)
        {
            if (isTrace)
            {
                _traceLogger.Fatal(input);
            }
            else
            {
                _defaultLogger.Fatal(input);
            }
        }
    }
}
