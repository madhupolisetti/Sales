﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using OC = Orders.CommonClasses;

namespace Orders
{
    public partial class Quotation : System.Web.UI.Page
    {
        public int quotationId = 0;
        public bool isPostPaid = false;
        public int employeeId = 0;
        public OC.Role accessRole;
        public string myPage;
        public Int32 TestCreditsAdminId = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            quotationId = Convert.ToInt32(Request["QuotationId"]);
            isPostPaid = Convert.ToBoolean(Request["IsPostPaidQuotation"]);
            employeeId = Convert.ToInt32(Context.Request["EmployeeId"]);
            TestCreditsAdminId = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["TestCreditsAdminId"].ToString());
            if (Session["AdminId"] == null || Session["AdminId"].ToString() == string.Empty)
            {
                Response.Redirect("LoginWithGoogle.aspx");
            }
            if (Session["AccessRole"] != null || Session["AccessRole"].ToString() != "")
            {
                accessRole = (OC.Role)Session["AccessRole"];

                if (accessRole == OC.Role.SUPER_USER ||
                    accessRole == OC.Role.SALES_TL ||
                    accessRole == OC.Role.SALES ||
                    accessRole == OC.Role.IT_SOFTWARE ||
                    accessRole == OC.Role.IT_SOFTWARE_TL)
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