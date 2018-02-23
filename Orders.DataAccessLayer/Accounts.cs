using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using log4net;
using Orders.UserDefinedClasses;

namespace Orders.DataAccessLayer
{
    public class Accounts : DataAccess
    {

        private SqlConnection _sqlConnection = new SqlConnection();
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _da = null;
        private DataSet _ds = null;
        public Accounts(string connString)
            : base(connString)
        {

        }

        public DataSet GetProductInformation(byte productId, out bool success)
        {
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.GET_PRODUCT_DETAILS, this._sqlConnection);
                this._sqlCommand.CommandType = CommandType.StoredProcedure;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.Bit).Value = productId;
                this.PopulateCommonOutputParameters(ref this._sqlCommand);
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);



            }
            catch (Exception e)
            {
                //Logger.Error(string.Format("Unable to fetch QuotationStatuses. {0}", e.ToString()));
                //throw new QuotationException(string.Format("Unable to fetch QuotationStatuses. {0}", e.Message));
            }
            finally
            {

            }
            success = Convert.ToBoolean(_sqlCommand.Parameters[ProcedureParameters.SUCCESS].Value);
            return _ds;
        }

        public void CreateAccountProduct(AccountProducts accountProperty, out decimal accountId)
        {
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.CREATE_ACCOUNT_PRODUCT, this._sqlConnection);
                this._sqlCommand.Parameters.Add(ProcedureParameters.NAME, SqlDbType.NVarChar, 50).Value = accountProperty.ProductAccountName;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.TinyInt).Value = accountProperty.ProductId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.MOBILE, SqlDbType.VarChar, 15).Value = accountProperty.MobileNo;
                this._sqlCommand.Parameters.Add(ProcedureParameters.EMAIL, SqlDbType.VarChar, 100).Value = accountProperty.Email;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_USER_ID, SqlDbType.BigInt).Value = accountProperty.ProductAccountId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.ADDRESS, SqlDbType.NVarChar, -1).Value = accountProperty.Address;
                this._sqlCommand.Parameters.Add(ProcedureParameters.GSTIN, SqlDbType.VarChar, 15).Value = accountProperty.Gstin;
                this._sqlCommand.Parameters.Add(ProcedureParameters.STATE_ID, SqlDbType.Int).Value = accountProperty.StateId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.COUNTRY_ID, SqlDbType.Int).Value = accountProperty.CountryId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.OWNER_EMAIL, SqlDbType.VarChar, 100).Value = accountProperty.OwnerShipEmail;
                this.PopulateCommonOutputParameters(ref this._sqlCommand);
                this._sqlCommand.Parameters.Add(ProcedureParameters.ACCOUNT_ID, System.Data.SqlDbType.Decimal).Direction = System.Data.ParameterDirection.Output;
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);
                this._ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));



            }
            catch (Exception e)
            {
                //Logger.Error(string.Format("Unable to fetch QuotationStatuses. {0}", e.ToString()));
                //throw new QuotationException(string.Format("Unable to fetch QuotationStatuses. {0}", e.Message));
            }
            finally
            {

            }
            accountId = Convert.ToDecimal(_sqlCommand.Parameters[ProcedureParameters.ACCOUNT_ID].Value);

        }

        internal void PopulateCommonOutputParameters(ref System.Data.SqlClient.SqlCommand sqlCommand)
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.Parameters.Add(ProcedureParameters.SUCCESS, System.Data.SqlDbType.Bit).Direction = System.Data.ParameterDirection.Output;
            sqlCommand.Parameters.Add(ProcedureParameters.MESSAGE, System.Data.SqlDbType.VarChar, 1000).Direction = System.Data.ParameterDirection.Output;
        }
        internal DataTable ConvertOutputParametersToDataTable(System.Data.SqlClient.SqlParameterCollection parameters)
        {
            DataTable outputParameters = new DataTable("OutputParameters");
            for (int iterator = 0; iterator <= parameters.Count - 1; iterator++)
            {
                if (parameters[iterator].Direction.Equals(ParameterDirection.Output))
                {
                    outputParameters.Columns.Add(parameters[iterator].ParameterName.Replace("@", ""));
                }
            }
            DataRow row = outputParameters.NewRow();
            foreach (DataColumn column in outputParameters.Columns)
            {
                row[column.ColumnName] = parameters["@" + column.ColumnName].Value;
            }
            outputParameters.Rows.Add(row);
            return outputParameters;
        }
    }
}
