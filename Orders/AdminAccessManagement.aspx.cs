using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using OC = Orders.CommonClasses;

namespace Orders
{
    public partial class AdminAccessManagement : System.Web.UI.Page
    {
        public OC.Role accessRole;
        public int adminId; public string currentPage = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["AdminId"] == null || Convert.ToInt16(Session["AdminId"]) == 0)
            {
                Response.Redirect("/LoginWithGoogle.aspx?msg=your session has been expired please login again");
            }
            else
            {
                adminId = Convert.ToInt32(Session["AdminId"]);
            }
            if (Session["AccessRole"] != null || Session["AccessRole"].ToString() != "")
            {
                accessRole = (OC.Role)Session["AccessRole"];

                //if (accessRole == BlueKite.UserDefinedClasses.Role.SUPER_USER ||
                //     accessRole == BlueKite.UserDefinedClasses.Role.HR)
                //{

                //}
                //else
                //{
                //    currentPage = System.IO.Path.GetFileName(Request.Url.AbsolutePath);
                //    Response.Redirect("UnauthorizedUser.aspx?Page=" + currentPage);
                //}

            }

        }
    }
}