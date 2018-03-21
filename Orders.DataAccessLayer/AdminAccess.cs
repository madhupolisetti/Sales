using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Orders.UserDefinedClasses;

namespace Orders.DataAccessLayer
{
   public class AdminAccess :DataAccess
    {
        private SqlConnection _sqlConnection = new SqlConnection();
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _da = null;
        private DataSet _ds = null;
        public AdminAccess(string connString)
            : base(connString)
        {

        }
        public DataSet GetEmployeeData()
        {
            _sqlConnection = Connection;
          //  SqlConnection sqlCon = new SqlConnection(UserDefinedClasses.AppConfig.BlueKiteAdminDbConnectionString);
            this._sqlCommand = new SqlCommand("GetEmployeeData", _sqlConnection);
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            try
            {

                this._sqlCommand.Parameters.Add("@Success", SqlDbType.Bit).Direction = ParameterDirection.Output;
                this._sqlCommand.Parameters.Add("@Message", SqlDbType.VarChar, 1000).Direction = ParameterDirection.Output;
                da.SelectCommand = this._sqlCommand;
                da.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    ds.Tables[0].TableName = "Employees";
                    ds.Tables[1].TableName = "Designations";
                    ds.Tables[2].TableName = "CompanyBranches";
                    ds.Tables[3].TableName = "AccessRoles";
                    ds.Tables[4].TableName = "Departments";
                }
                ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
            }
            catch (Exception ex)
            {
                ds = null;
             //   Utilities.Logger.Error(System.Reflection.MethodInfo.GetCurrentMethod().Name + "--" + ex.ToString());
            }

            return ds;
        }
        public int EmployeeDetails(Employee empObj, out int success, out string message)
        {
            int retVal = 0;
            _sqlConnection = Connection;
             this._sqlCommand = new SqlCommand("EmployeeDetails", _sqlConnection);
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            try
            {
                this._sqlCommand.CommandType = CommandType.StoredProcedure;
                this._sqlCommand.Parameters.Add("@Mode", SqlDbType.Int).Value = empObj.Mode;
                this._sqlCommand.Parameters.Add("@ID", SqlDbType.VarChar, 100).Value = empObj.Id;
                this._sqlCommand.Parameters.Add("@Name", SqlDbType.VarChar, 100).Value = empObj.Name;
                this._sqlCommand.Parameters.Add("@Email", SqlDbType.VarChar, 100).Value = empObj.Email;
                this._sqlCommand.Parameters.Add("@Mobile", SqlDbType.VarChar, 100).Value = empObj.Mobile;
                this._sqlCommand.Parameters.Add("@BirthDate", SqlDbType.VarChar, 100).Value = empObj.BirthDate;
                this._sqlCommand.Parameters.Add("@JoinDate", SqlDbType.VarChar, 100).Value = empObj.JoinDate;
                this._sqlCommand.Parameters.Add("@ConfirmDate", SqlDbType.VarChar, 100).Value = empObj.ConfirmDate;
                this._sqlCommand.Parameters.Add("@Designation", SqlDbType.Int).Value = empObj.Designation;
                this._sqlCommand.Parameters.Add("@Department", SqlDbType.Int).Value = empObj.Department;
                this._sqlCommand.Parameters.Add("@Branch", SqlDbType.Int).Value = empObj.Branch;
                this._sqlCommand.Parameters.Add("@Role", SqlDbType.Int).Value = empObj.Role;
                this._sqlCommand.Parameters.Add("@TraineeID", SqlDbType.Int).Value = empObj.TraineeId;
                this._sqlCommand.Parameters.Add("@EmployeeID", SqlDbType.Int).Value = empObj.EmployeeId;
                this._sqlCommand.Parameters.Add("@Status", SqlDbType.Int).Value = empObj.Status;
                this._sqlCommand.Parameters.Add("@TeamLead", SqlDbType.Int).Value = empObj.TeamLead;
                this._sqlCommand.Parameters.Add("@MaritalStatus", SqlDbType.TinyInt).Value = empObj.MaritalStatus;
                this._sqlCommand.Parameters.Add("@Success", SqlDbType.Bit).Direction = ParameterDirection.Output;
                this._sqlCommand.Parameters.Add("@Message", SqlDbType.VarChar, 1000).Direction = ParameterDirection.Output;
                _sqlConnection.Open();
                retVal = this._sqlCommand.ExecuteNonQuery();
                _sqlConnection.Close();
            }
            catch (Exception ex)
            {
              // Utilities.Logger.Error(System.Reflection.MethodInfo.GetCurrentMethod().Name + "--" + ex.ToString());
            }

            success = Convert.ToInt32(this._sqlCommand.Parameters["@Success"].Value);
            message = this._sqlCommand.Parameters["@Message"].Value.ToString();

            return retVal;
        }

        public DataSet GetEmployeeDetails(int pageLength, String AccountName, String AccountEmail, int pageIndex)
        {

            _sqlConnection = Connection;
             this._sqlCommand = new SqlCommand("GetEmployeeDetails", _sqlConnection);
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            try
            {
                this._sqlCommand.CommandType = CommandType.StoredProcedure;

                this._sqlCommand.Parameters.Add("@PageLength", SqlDbType.Int).Value = pageLength;
                this._sqlCommand.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageIndex;
                this._sqlCommand.Parameters.Add("@AccountName", SqlDbType.VarChar, 100).Value = AccountName;
                this._sqlCommand.Parameters.Add("@AccountEmail", SqlDbType.VarChar, 150).Value = AccountEmail;
                this._sqlCommand.Parameters.Add("@TotalCount", SqlDbType.Int).Direction = ParameterDirection.Output;
                this._sqlCommand.Parameters.Add("@Success", SqlDbType.Bit).Direction = ParameterDirection.Output;
                this._sqlCommand.Parameters.Add("@Message", SqlDbType.VarChar, 1000).Direction = ParameterDirection.Output;
                da.SelectCommand = this._sqlCommand;
                da.Fill(ds);
                if (ds.Tables.Count > 0)
                {
                    ds.Tables[0].TableName = "Employees";
                }
                ds.Tables.Add(this.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
            }
            catch (Exception ex)
            {
                ds = null;
             //   Utilities.Logger.Error(System.Reflection.MethodInfo.GetCurrentMethod().Name + "--" + ex.ToString());
            }

            return ds;
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
