using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace Orders.CommonClasses
{
    public static class MyConf
    {
        private static string myConnString;
        
        public static string MyConnectionString
        {
            get
            {
                if (myConnString == null)
                {
                    myConnString = ConfigurationManager.ConnectionStrings["SalesDbConnectionString"].ConnectionString;
                }
                return myConnString;
            }
        }

        public static string GetApplicationKey(string key)
        {
            return System.Configuration.ConfigurationManager.AppSettings[key] == null ? "" : System.Configuration.ConfigurationManager.AppSettings[key].ToString();
        }
    }
}