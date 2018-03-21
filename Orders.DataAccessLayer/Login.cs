using Orders.UserDefinedClasses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orders.DataAccessLayer
{
   public class Login : DataAccess
    {
        private SqlConnection _sqlConnection = new SqlConnection();
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _da = null;
        private DataSet _ds = null;
        public Login(string connString)
            : base(connString)
        {

        }
        public DataSet AdminLoginCheck(string emailAddress, out Boolean Success, out string Message)
        {
            SqlConnection sqlCon = null;
            SqlCommand sqlCmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            try
            {
                _sqlConnection = Connection;
                this._sqlCommand = new SqlCommand(StoredProcedure.Admin_Login_Check, this._sqlConnection);
                this._sqlCommand.CommandType = CommandType.StoredProcedure;
                this._sqlCommand.Parameters.Add(ProcedureParameters.EMAIL, SqlDbType.VarChar, 200).Value = emailAddress;

                this._sqlCommand.Parameters.Add("@Success", SqlDbType.Bit).Direction = ParameterDirection.Output;
                this._sqlCommand.Parameters.Add("@Message", SqlDbType.VarChar, 1000).Direction = ParameterDirection.Output;
               // this.PopulateCommonOutputParameters(ref this._sqlCommand);
                _da = new SqlDataAdapter(_sqlCommand);
                _ds = new DataSet();
                _da.Fill(_ds);
                _ds.Tables[0].TableName = "AdminDetails";
                //this._ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
            }
            catch (Exception ex)
            {
                Logger.Info("ex at entity :  " + ex.ToString());
                
            }
             Success =  Convert.ToBoolean(this._sqlCommand.Parameters["@Success"].Value);
             Message = Convert.ToString(this._sqlCommand.Parameters["@Message"].Value);
            return _ds;
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
