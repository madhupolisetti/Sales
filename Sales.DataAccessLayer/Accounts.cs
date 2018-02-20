using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using log4net;
namespace Orders.DataAccessLayer
{
    class Accounts : DataAccess
    {

        private SqlConnection _sqlConnection = null;
        private SqlCommand _sqlCommand = null;
        private SqlDataAdapter _da = null;
        private DataSet _ds = null;
        public Accounts(string connString)
            : base(connString)
        {

        }

        public dynamic GetProductInformation(byte productId)
        {
            //try
            //{
            //    this._sqlCommand = new SqlCommand(StoredProcedure.GET_QUOTATION_STATUSES, this._sqlConnection);
            //    this._sqlCommand.Parameters.Add(ProcedureParameter.IS_ONLY_ACTIVE, SqlDbType.Bit).Value = onlyActive;
            //    this._helper.PopulateCommonOutputParameters(ref this._sqlCommand);
            //    this._da = new SqlDataAdapter(this._sqlCommand);
            //    this._da.Fill(this._ds = new DataSet());
            //    if (!this._sqlCommand.IsSuccess())
            //        return this.ErrorResponse();
            //    if (this._ds.Tables.Count > 0)
            //        this._ds.Tables[0].TableName = Label.QUOTATION_STATUSES;
            //    this._ds.Tables.Add(this._helper.ConvertOutputParametersToDataTable(this._sqlCommand.Parameters));
            //    this._helper.ParseDataSet(this._ds, tablePreferences);
            //    return this._helper.GetResponse();
            //}
            //catch (Exception e)
            //{
            //    Logger.Error(string.Format("Unable to fetch QuotationStatuses. {0}", e.ToString()));
            //    throw new QuotationException(string.Format("Unable to fetch QuotationStatuses. {0}", e.Message));
            //}
            //finally
            //{
            //    this.Clean();
            //}
            return 1;
        }

    }
}
