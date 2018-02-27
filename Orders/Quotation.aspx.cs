using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

namespace Orders
{
    public partial class Quotation : System.Web.UI.Page
    {
        public int quotationId = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            quotationId = Convert.ToInt32(Request["QuotationId"]);

        }
    }
}