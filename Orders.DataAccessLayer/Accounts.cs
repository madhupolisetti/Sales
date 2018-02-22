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

        private SqlConnection _sqlConnection = null;
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _da = null;
        private DataSet _ds = null;
        public Accounts(string connString)
            : base(connString)
        {

        }

        public DataSet GetProductInformation(byte productId)
        {
            try
            {
                this._sqlCommand = new SqlCommand(StoredProcedure.GET_PRODUCT_DETAILS, this._sqlConnection);
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
            return _ds;
        }

        public void CreateAccountProduct(AccountProducts accountProperty)
        {
            try
            {
                this._sqlCommand = new SqlCommand(StoredProcedure.CREATE_ACCOUNT_PRODUCT, this._sqlConnection);
                this._sqlCommand.Parameters.Add(ProcedureParameters.PRODUCT_ID, SqlDbType.Bit).Value = accountProperty.ProductId;
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
