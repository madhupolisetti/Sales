using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orders.UserDefinedClasses;
using OC = Orders.CommonClasses;
using BA = Orders.BussinessLogicLayer;
using System.Web.SessionState;

namespace Orders.AjaxHandlers
{
    /// <summary>
    /// Summary description for AdminAccess
    /// </summary>
    public class AdminAccess : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            JObject resJObj = new JObject();


            int adminID = 0;

            if (HttpContext.Current.Session["AdminId"] == null || HttpContext.Current.Session["AdminId"].ToString() == string.Empty)
            {


                context.Response.StatusCode = 401;
                context.Response.StatusDescription = "Invalid Session";
                context.Response.End();

            }

            adminID = Convert.ToInt32(HttpContext.Current.Session["AdminId"].ToString());

            int type = Convert.ToInt32(context.Request["type"]);

            switch (type)
            {

                case 1:
                    resJObj = GetEmployeeData(context);
                    context.Response.Write(resJObj);
                    return;
                case 2:
                    resJObj = EmployeeDetails(context);
                    context.Response.Write(resJObj);
                    return;
                case 3:
                    resJObj = GetEmployeeDetails(context);
                    context.Response.Write(resJObj);
                    return;
                case 4: resJObj = GetProfileDetails(context);
                    context.Response.Write(resJObj);
                    return;
            }
        }
        private JObject EmployeeDetails(HttpContext context)
        {

            JObject resJObj = new JObject();


            Employee empObj = new Employee();

            int Id = 0, dept = 0, designation = 0, branch = 0, accessRole = 0, mode = 0, status = 1;
            int empId = 0, maritalStatus = 0, traineeId = 0, teamLead = 0;
            string name = "", mobile = "", birthDate = "", joinDate = "", confirmDate = "", email = "";

            if (String.IsNullOrEmpty(context.Request["id"]) == false)
            {
                Id = Convert.ToInt32(context.Request["id"]);
                empObj.Id = Id;
            }
            else
            {
                empObj.Id = Id;
            }

            if (String.IsNullOrEmpty(context.Request["empId"]) == false)
            {
                empId = Convert.ToInt32(context.Request["empId"]);
                empObj.EmployeeId = empId;
            }
            else
            {
                empObj.Id = empId;
            }


            if (String.IsNullOrEmpty(context.Request["name"]) == false)
            {
                name = context.Request["name"];
                empObj.Name = name;
            }

            else
            {
                empObj.Name = name;
            }


            if (String.IsNullOrEmpty(context.Request["email"]) == false)
            {
                email = context.Request["email"];
                empObj.Email = email;

            }
            else
            {
                empObj.Email = email;
            }

            if (String.IsNullOrEmpty(context.Request["mobile"]) == false)
            {
                mobile = context.Request["mobile"];
                empObj.Mobile = mobile;

            }
            else
            {
                empObj.Mobile = mobile;
            }

            if (String.IsNullOrEmpty(context.Request["birthDate"]) == false)
            {
                birthDate = context.Request["birthDate"];
                empObj.BirthDate = birthDate;

            }
            else
            {
                empObj.BirthDate = birthDate;
            }
            if (String.IsNullOrEmpty(context.Request["joinDate"]) == false)
            {
                joinDate = context.Request["joinDate"];
                empObj.JoinDate = joinDate;

            }
            else
            {
                empObj.JoinDate = joinDate;
            }
            if (String.IsNullOrEmpty(context.Request["confirmDate"]) == false)
            {
                confirmDate = context.Request["confirmDate"];
                empObj.ConfirmDate = confirmDate;

            }
            else
            {
                empObj.ConfirmDate = confirmDate;
            }
            if (String.IsNullOrEmpty(context.Request["dept"]) == false)
            {
                dept = Convert.ToInt32(context.Request["dept"]);
                empObj.Department = dept;

            }
            else
            {
                empObj.Department = dept;
            }
            if (String.IsNullOrEmpty(context.Request["designation"]) == false)
            {
                designation = Convert.ToInt32(context.Request["designation"]);
                empObj.Designation = designation;

            }
            else
            {
                empObj.Designation = designation;
            }
            if (String.IsNullOrEmpty(context.Request["branch"]) == false)
            {
                branch = Convert.ToInt32(context.Request["branch"]);
                empObj.Branch = branch;

            }
            else
            {
                empObj.Branch = branch;
            }
            if (String.IsNullOrEmpty(context.Request["accessRole"]) == false)
            {
                accessRole = Convert.ToInt32(context.Request["accessRole"]);
                empObj.Role = accessRole;

            }
            else
            {
                empObj.Role = accessRole;
            }
            if (String.IsNullOrEmpty(context.Request["traineeId"]) == false)
            {
                traineeId = Convert.ToInt32(context.Request["traineeId"]);
                empObj.TraineeId = traineeId;

            }
            else
            {
                empObj.TraineeId = traineeId;

            }
            if (String.IsNullOrEmpty(context.Request["teamLead"]) == false)
            {
                teamLead = Convert.ToInt32(context.Request["teamLead"]);
                empObj.TeamLead = teamLead;

            }
            else
            {
                empObj.TeamLead = teamLead;
            }

            if (String.IsNullOrEmpty(context.Request["maritalStatus"]) == false)
            {
                maritalStatus = Convert.ToInt32(context.Request["martialStatus"]);
                empObj.MaritalStatus = maritalStatus;

            }
            else
            {
                empObj.MaritalStatus = maritalStatus;

            }


            if (String.IsNullOrEmpty(context.Request["mode"]) == false)
            {
                mode = Convert.ToInt32(context.Request["mode"]);
                empObj.Mode = mode;

            }
            else
            {
                empObj.Mode = mode;
            }

            if (String.IsNullOrEmpty(context.Request["status"]) == false)
            {
                status = Convert.ToInt32(context.Request["status"]);
                empObj.Status = status;

            }
            else
            {
                empObj.Status = status;
            }

            BA.AdminAccess AA = new BA.AdminAccess();
            resJObj = AA.EmployeeDetails(empObj,OC.MyConf.MyConnectionString);
            return resJObj;
        }
        private JObject GetEmployeeDetails(HttpContext context)
        {
            JObject resJObj = new JObject();
            BA.AdminAccess AA = new BA.AdminAccess();
            resJObj = AA.GetEmployeeDetails(Convert.ToInt32(context.Request["pageLength"]), context.Request["AccountName"], context.Request["AccountEmail"], Convert.ToInt32(context.Request["pageIndex"]), OC.MyConf.MyConnectionString);
            //BlueKite.BAL.AdminAccount obj = new BlueKite.BAL.AdminAccount(BlueKite.UserDefinedClasses.ResponseFormat.JSON);
            //resJObj = obj.GetEmployeeDetails(Convert.ToInt32(context.Request["pageLength"]), context.Request["AccountName"], context.Request["AccountEmail"], Convert.ToInt32(context.Request["pageIndex"]));
            return resJObj;
        }
        private JObject GetProfileDetails(HttpContext context)
        {
            JObject resJObj = new JObject();
            BA.AdminAccess AA = new BA.AdminAccess();
            resJObj = AA.GetProfileDetails(Convert.ToInt32(context.Request["id"]), OC.MyConf.MyConnectionString);
            return resJObj;
        }
        private JObject GetEmployeeData(HttpContext context)
        {
            JObject resJObj = new JObject();
            BA.AdminAccess AA = new BA.AdminAccess();
            resJObj = AA.GetEmployeeData(OC.MyConf.MyConnectionString);
            //BlueKite.BAL.AdminAccount obj = new BlueKite.BAL.AdminAccount(BlueKite.UserDefinedClasses.ResponseFormat.JSON);
            //resJObj = obj.GetEmployeeData();
            return resJObj;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}