using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UD = Orders.UserDefinedClasses;
using ODAl= Orders.DataAccessLayer;


namespace Orders.BussinessLogicLayer
{
  public class AdminAccess
    {
      public static JObject responseObj = new JObject();
        DataSet _ds = null;
        UD.Helper helper = new UD.Helper(UD.ResponseFormat.JSON);
        public AdminAccess()
        {
            responseObj = new JObject();
           
        }
        public dynamic GetEmployeeData(string conString)
        {
            DataSet ds = new DataSet();
            ODAl.AdminAccess rptObj = new ODAl.AdminAccess(conString);

            ds = rptObj.GetEmployeeData();
            if (ds == null)
            {
                responseObj.Add(new JProperty("Success", "false"));
                responseObj.Add(new JProperty("Message", "Data Base Error"));
            }
            else
            {
                helper.ParseDataSet(ds);
                responseObj = helper.GetDataSetJobj;
            }
            return responseObj;
        }
        public dynamic EmployeeDetails(UD.Employee empObj, string sConString)
        {

            JObject resObj = new JObject();
            int retVal = 0, success = 0;
            string message = "";

            ODAl.AdminAccess rptObj = new ODAl.AdminAccess(sConString);
            retVal = rptObj.EmployeeDetails(empObj, out success, out message);

            resObj = new JObject(new JProperty("Success", true),
                                 new JProperty("retVal", success),
                                 new JProperty("Message", message));


            return resObj;
        }
        public dynamic GetEmployeeDetails(int pageLength, String AccountName, String AccountEmail, int pageIndex,string sConstring)
        {
            DataSet ds = new DataSet();
            ODAl.AdminAccess rptObj = new ODAl.AdminAccess(sConstring);

            UD.TablePreferences EmployeeTablePreferences = new UD.TablePreferences("", "", true, false);
            Dictionary<string, UD.TablePreferences> EmployeeDictionary = new Dictionary<string, UD.TablePreferences>();
            EmployeeDictionary.Add("Employees", EmployeeTablePreferences);

            ds = rptObj.GetEmployeeDetails(pageLength, AccountName, AccountEmail, pageIndex);
            if (ds == null)
            {
                responseObj.Add(new JProperty("Success", "false"));
                responseObj.Add(new JProperty("Message", "Data Base Error"));
            }
            else {
                helper.ParseDataSet(ds, EmployeeDictionary);
                responseObj = helper.GetDataSetJobj;
            }

            return responseObj;
        }

    }
}
