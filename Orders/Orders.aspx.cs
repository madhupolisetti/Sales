using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using OC = Orders.CommonClasses;

namespace Orders
{
    public partial class OrdersList : System.Web.UI.Page
    {
        public OC.Role accessRole;
        public string myPage;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["AdminId"] == null || Session["AdminId"].ToString() == string.Empty)
            {
                Response.Redirect("LoginWithGoogle.aspx");
            }
            if (Session["AccessRole"] != null || Session["AccessRole"].ToString() != "")
            {
                accessRole = (OC.Role)Session["AccessRole"];

                if (accessRole == OC.Role.SUPER_USER ||                  
                    accessRole == OC.Role.ACCOUNTS ||
                    accessRole == OC.Role.ACCOUNTS_MANAGER)
                {

                }
                else
                {
                    myPage = System.IO.Path.GetFileName(Request.Url.AbsolutePath);
                    Response.Redirect("UnauthorizedUser.aspx?Page=" + myPage);
                }

            }
        }
    }
}