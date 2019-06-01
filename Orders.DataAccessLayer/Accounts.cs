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
        Helper _helper = new Helper(ResponseFormat.JSON);
        private void Clean()
        {
            if (this._da != null)
                this._da.Dispose();
            this._da = null;
            if (this._ds != null)
                this._ds.Dispose();
            this._ds = null;
        }
        private void DataSetClean()
        {

            if (this._ds != null)
                this._ds.Dispose();
            this._ds = null;
        }

        public void DataAdapterClean()
        {
            if (this._da != null)
                this._da.Dispose();
            this._da = null;
        }
        private dynamic ErrorResponse()
        {
            this._helper.CreateProperty(Label.SUCCESS, false);
            this._helper.CreateProperty(Label.MESSAGE, this._sqlCommand.GetMessage());
            return this._helper.GetResponse();
        }
        public Accounts(string connString)
            : base(connString)
        {

        }

        public dynamic GetAccountProductDetails(byte productId, string mobileNumber, out bool success)
        {
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.GET_ACCOUNT_PRODUCT_DETAILS, this._sqlConnection);
                this._sqlCommand.CommandType = CommandType.StoredProcedure;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.Bit).Value = productId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.MOBILE, SqlDbType.VarChar, 15).Value = mobileNumber;
                this.PopulateCommonOutputParameters(ref this._sqlCommand);
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);
                if (this._ds.Tables.Count > 0)
                {
                    this._ds.Tables[0].TableName = Label.USER_DETAILS;
                }
                this._ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
                this._helper.ParseDataSet(_ds, null);


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
            return this._helper.GetResponse();
        }

        public dynamic CreateAccountProduct(AccountProducts accountProperty, out decimal accountId, out decimal accountProductID)
        {
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.CREATE_ACCOUNT_PRODUCT, this._sqlConnection);
                this._sqlCommand.Parameters.Add(ProcedureParameters.NAME, SqlDbType.NVarChar, 50).Value = accountProperty.ProductAccountName;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.TinyInt).Value = accountProperty.ProductId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.MODE, SqlDbType.TinyInt).Value = 1;
                this._sqlCommand.Parameters.Add(ProcedureParameters.MOBILE, SqlDbType.VarChar, 15).Value = accountProperty.MobileNo;
                this._sqlCommand.Parameters.Add(ProcedureParameters.EMAIL, SqlDbType.VarChar, 100).Value = accountProperty.Email;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_USER_ID, SqlDbType.BigInt).Value = accountProperty.ProductAccountId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.ADDRESS, SqlDbType.NVarChar, -1).Value = accountProperty.Address;
                this._sqlCommand.Parameters.Add(ProcedureParameters.GSTIN, SqlDbType.VarChar, 15).Value = accountProperty.Gstin;
                this._sqlCommand.Parameters.Add(ProcedureParameters.STATE_ID, SqlDbType.Int).Value = accountProperty.StateId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.COMPANY, SqlDbType.VarChar, 100).Value = accountProperty.Company;
                this._sqlCommand.Parameters.Add(ProcedureParameters.REGISTERED_DATE, SqlDbType.DateTime).Value = accountProperty.RegisteredDate;
                this._sqlCommand.Parameters.Add(ProcedureParameters.COUNTRY, SqlDbType.VarChar, 50).Value = accountProperty.Country;
                this._sqlCommand.Parameters.Add(ProcedureParameters.ACCESS_TOKEN, SqlDbType.VarChar, 64).Value = accountProperty.AccessToken;
                this._sqlCommand.Parameters.Add(ProcedureParameters.BILLING_DAY, SqlDbType.Int).Value = accountProperty.BillingDay;
                this._sqlCommand.Parameters.Add(ProcedureParameters.BILLING_MODE_ID, SqlDbType.Int).Value = accountProperty.BillingMode;
                if (accountProperty.OwnerShipEmail != null)
                {
                    this._sqlCommand.Parameters.Add(ProcedureParameters.OWNER_EMAIL, SqlDbType.VarChar, 100).Value = accountProperty.OwnerShipEmail;
                }
                else
                {
                    this._sqlCommand.Parameters.Add(ProcedureParameters.OWNER_EMAIL, SqlDbType.VarChar, 100).Value = "";
                }
                
                this.PopulateCommonOutputParameters(ref this._sqlCommand);
                this._sqlCommand.Parameters.Add(ProcedureParameters.ACCOUNT_ID, System.Data.SqlDbType.Decimal).Direction = System.Data.ParameterDirection.Output;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ACCOUNT_ID, System.Data.SqlDbType.Decimal).Direction = System.Data.ParameterDirection.Output;
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);
                
                this._ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
                this._helper.ParseDataSet(_ds, null);


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
            accountProductID = Convert.ToDecimal(_sqlCommand.Parameters[ProcedureParameters.PRODUCT_ACCOUNT_ID].Value);
            return this._helper.GetResponse();
        }
        public dynamic UpdateAccountProduct(AccountProducts accountProperty)
        {
    
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.CREATE_ACCOUNT_PRODUCT, this._sqlConnection);
                this._sqlCommand.Parameters.Add(ProcedureParameters.NAME, SqlDbType.NVarChar, 50).Value = accountProperty.ProductAccountName;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.TinyInt).Value = accountProperty.ProductId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.MODE, SqlDbType.TinyInt).Value = 2;
                this._sqlCommand.Parameters.Add(ProcedureParameters.MOBILE, SqlDbType.VarChar, 20).Value = accountProperty.MobileNo;
                this._sqlCommand.Parameters.Add(ProcedureParameters.EMAIL, SqlDbType.VarChar, 100).Value = accountProperty.Email;
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_USER_ID, SqlDbType.BigInt).Value = accountProperty.ProductAccountId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.ADDRESS, SqlDbType.NVarChar, -1).Value = accountProperty.Address;
                this._sqlCommand.Parameters.Add(ProcedureParameters.GSTIN, SqlDbType.VarChar, 15).Value = accountProperty.Gstin;
                this._sqlCommand.Parameters.Add(ProcedureParameters.STATE_ID, SqlDbType.Int).Value = accountProperty.StateId;
                this._sqlCommand.Parameters.Add(ProcedureParameters.COMPANY, SqlDbType.VarChar, 100).Value = accountProperty.Company;
                this._sqlCommand.Parameters.Add(ProcedureParameters.COUNTRY, SqlDbType.VarChar, 50).Value = accountProperty.Country;
                this._sqlCommand.Parameters.Add(ProcedureParameters.OWNER_EMAILID, SqlDbType.Int).Value = accountProperty.OwnerShipId;
                

                this.PopulateCommonOutputParameters(ref this._sqlCommand);
                this._sqlCommand.Parameters.Add(ProcedureParameters.ACCOUNT_ID, System.Data.SqlDbType.Decimal).Direction = System.Data.ParameterDirection.Output;
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);
              
                this._ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
                this._helper.ParseDataSet(_ds, null);


            }
            catch (Exception e)
            {
                //Logger.Error(string.Format("Unable to fetch QuotationStatuses. {0}", e.ToString()));
                //throw new QuotationException(string.Format("Unable to fetch QuotationStatuses. {0}", e.Message));
            }
            finally
            {

            }
            
            return this._helper.GetResponse();
        }

        public dynamic GetAccountOwnersAndPlans(byte productId, out bool success)
        {
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.GET_ACCOUNT_OWNERS_AND_PLANS, this._sqlConnection);
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.TinyInt).Value = productId;
                this.PopulateCommonOutputParameters(ref this._sqlCommand);
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);
                if (this._ds.Tables.Count > 1)
                {
                    this._ds.Tables[0].TableName = Label.PLANS;
                    this._ds.Tables[1].TableName = Label.EMPLOYEES;

                }
                this._ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
                this._helper.ParseDataSet(_ds, null);
               
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
            return this._helper.GetResponse();
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
