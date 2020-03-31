using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;
namespace Orders.UserDefinedClasses
{
    public static class StoredProcedure
    {
        #region Products Related
        public const string GET_ACCOUNT_PRODUCT_DETAILS = "GetAccountProductDetails";
        public const string GET_PRODUCT_DETAILS = "GetProductDetails";
        #endregion
        #region Account Related
        public const string CREATE_ACCOUNT_PRODUCT = "CreateAccountProduct";
        #endregion
        #region Login Related
        public const string Admin_Login_Check = "AdminLoginCheck";
        #endregion
        #region AccountOwners and Plans related
        public const string GET_ACCOUNT_OWNERS_AND_PLANS = "GetAccountOwnersAndPlans";
        #endregion

    }
}
