using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using OC = Orders.CommonClasses;
namespace Orders
{
    public partial class CreateQuotation : System.Web.UI.Page
    {
        public decimal accountId = 0;
        public byte productId = 0;
        public string registeredDate = string.Empty;
        public string companyName = string.Empty;
        public string contactName = string.Empty;
        public string email = string.Empty;
        public string mobile = string.Empty;
        public string country = string.Empty;
        public string address = string.Empty;
        public string stateId = string.Empty;
        public string QuotationType = string.Empty;
        public string gstin = string.Empty;
        public string AccountOwnerEmail = string.Empty;   
        public string isFirstTime;
        public int quotationId = 0;
        public byte isPostPaid = 0; // should be public byte billingMode = 0;
        public OC.Role accessRole;
        public Int64 AccountProductId;
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
            if (Request["QuotationId"] != null && Request["QuotationId"] != string.Empty)
            {
                quotationId = Convert.ToInt32(Request["QuotationId"]);
            }
            if (Request["BillMode"] != null && Request["BillMode"] != string.Empty)
            {
                isPostPaid = Convert.ToByte(Request["BillMode"]);
            }
            if (Request["ID"] != null && Request["ID"] != string.Empty)
            {
                accountId = Convert.ToDecimal(Request["ID"]);
            }
            if (Request["productId"] != null && Request["productId"] != string.Empty)
            {
                productId = Convert.ToByte(Request["productId"]);
            }
            if (Request["address"] != null && Request["address"] != string.Empty)
            {
                address = Request["address"];
            }
            if (Request["contactName"] != null && Request["contactName"] != string.Empty)
            {
                contactName = Request["contactName"];
            }
            if (Request["country"] != null && Request["country"] != string.Empty)
            {
                country = Request["country"];
            }
            if (Request["registeredDate"] != null && Request["registeredDate"] != string.Empty)
            {
                registeredDate = Request["registeredDate"];
            }
            if (Request["company"] != null && Request["company"] != string.Empty)
            {
                companyName = Request["company"];
            }
            if (Request["email"] != null && Request["email"] != string.Empty)
            {
                email = Request["email"];
            }
            if (Request["mobile"] != null && Request["mobile"] != string.Empty)
            {
                mobile = Request["mobile"];
            }
            if (Request["state"] != null && Request["state"] != string.Empty)
            {
                stateId = Request["state"];
            }

            if (!String.IsNullOrEmpty(Request["AccountproductId"]))
            {

                AccountProductId = Convert.ToInt64(Request["AccountproductId"]);
            }
            if (!String.IsNullOrEmpty(Request["QuotationType"]))
            {
                QuotationType = Convert.ToString(Request["QuotationType"]);
            }
            if (!String.IsNullOrEmpty(Request["isFirstTime"]))
            {
                isFirstTime = Convert.ToString(Request["isFirstTime"]);
            }
            if (!String.IsNullOrEmpty(Request["gstin"]))
            {
                gstin = Convert.ToString(Request["gstin"]);
            }
            if (!String.IsNullOrEmpty(Request["AccountOwner"]))
            {
                AccountOwnerEmail = Convert.ToString(Request["AccountOwner"]);
            }
        }
    }
}
