using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Orders
{
    public partial class GoogleLoginCallBack : System.Web.UI.Page
    {
        public string sCall = "var kk;";
        public string sToken = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["access_token"] != null)
            {
                sCall = "CallUserInfor();";
                sToken = Request.QueryString["access_token"].ToString();
            }
        }
    }
}