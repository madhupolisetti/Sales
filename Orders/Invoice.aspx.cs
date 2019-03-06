using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using OC = Orders.CommonClasses;

namespace Orders
{
    public partial class Invoice : System.Web.UI.Page
    {
        public int quotationId = 0;
        public int invoiceId = 0;
        public int billMode = 1;
        public OC.Role accessRole;
        public string myPage;
        protected void Page_Load(object sender, EventArgs e)
        {
            quotationId = Convert.ToInt32(Context.Request["QuotationId"]);
            invoiceId = Convert.ToInt32(Context.Request["InvoiceId"]);
            billMode = Convert.ToInt32(Context.Request["BillMode"]);
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
                     accessRole == OC.Role.ACCOUNTS_MANAGER ||
                     accessRole == OC.Role.ACCOUNTS ||
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