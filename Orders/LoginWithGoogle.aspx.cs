using System;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AdminUI
{
    public partial class LoginWithGoogle : System.Web.UI.Page
    {
        public string navigateUrl = "";
        public string RedirectUrl = "";

        protected void Page_Load(object sender, EventArgs e)
        {

            if ((Session["AdminId"] != null))
            {
                Server.Transfer("Dashboard.aspx");
            }
            if (Request["CurrentPage"] != "")
            {
                Session["CurrentPage"] = Request["CurrentPage"];
            }
            if (!this.IsPostBack)
            {
                navigateUrl = "https://accounts.google.com/o/oauth2/auth?";
                navigateUrl += "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&";
                navigateUrl += "state=%2Fprofile&";
                //navigateUrl += "redirect_uri=" + BlueKite.UserDefinedClasses.AppConfig.GetApplicationKey("GoogleLoginRedirectUrl") + "&";
                navigateUrl += "response_type=token&";
                //navigateUrl += "client_id=" + BlueKite.UserDefinedClasses.AppConfig.GetApplicationKey("GoogleClientId");
                LoginNavigator.NavigateUrl = navigateUrl;
            }
            try
            {
                //if (string.IsNullOrEmpty(Request.QueryString["access_token"]) == false)
                //{
                //    BlueKite.BAL.Login loginObj = new BlueKite.BAL.Login(BlueKite.UserDefinedClasses.RequestFormat.JSON, BlueKite.UserDefinedClasses.ResponseFormat.JSON);
                //    JObject result = loginObj.AdminLoginCheck(Request.QueryString["access_token"].ToString().Trim()) as JObject;
                //    if (!Convert.ToBoolean(result.SelectToken("Success").ToString()))
                //    {
                //        Response.Redirect("Unauthorized.aspx?reason=" + result.SelectToken("Message").ToString());
                //        Response.Write(result.SelectToken("Message").ToString());
                //    }
                //    else
                //    {

                //        string sessionId = System.Guid.NewGuid().ToString();
                //        HttpCookie sessionCookie = new HttpCookie("SessionId", sessionId);
                //        sessionCookie.HttpOnly = true;
                //        Response.Cookies.Add(sessionCookie);
                //        Session["SessionId"] = sessionId;
                //        JObject adminObject = ((JArray)result.SelectToken("AdminDetails")).First as JObject;
                //        Session["AdminId"] = Convert.ToInt32(adminObject.SelectToken("AdminId").ToString());
                //        Session["Email"] = adminObject.SelectToken("Email").ToString();
                //        Session["Mobile"] = adminObject.SelectToken("Mobile").ToString();
                //        Session["Designation"] = adminObject.SelectToken("Designation").ToString();
                //        Session["Department"] = adminObject.SelectToken("Department").ToString();
                //        Session["BranchName"] = adminObject.SelectToken("BranchName").ToString();
                //        Session["EmployeeName"] = adminObject.SelectToken("EmployeeName").ToString();
                //        string absolutePath = Convert.ToString(Request["AbsolutePath"]);
                //        if (absolutePath.ToLower().Contains(".aspx"))
                //        {
                //            Response.Redirect(absolutePath.Trim(), false);
                //        }

                //        else
                //        {
                //            Response.Redirect("/AccountLookUp.aspx", false);
                //        }


                //    }
                //}
            }
            catch (Exception ex)
            {
                Response.Write(ex.ToString());
                //Response.Redirect("500.aspx");
            }
        }

    }
}
