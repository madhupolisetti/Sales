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

        #region PRIVATE VARIABLES

        private string _connectionString = string.Empty;
        private SqlConnection _sqlConnection = null;
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _da = null;
        private DataSet _ds = null;
        private JObject _jObj = null;
        private JArray _jArr = null;

        #endregion
        #region Products Related
        public const string GET_PRODUCT_DETAILS = "GetProductDetails";
        #endregion


    }
}
