using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orders.UserDefinedClasses
{
    public static class ExtensionMethods
    {
        public static bool IsDbNull(this object input)
        {
            return input.Equals(DBNull.Value) ? true : false;
        }
        public static bool IsSuccess(this System.Data.SqlClient.SqlCommand sqlCommand)
        {
            if (!sqlCommand.Parameters.Contains(ProcedureParameters.SUCCESS))
                throw new KeyNotFoundException("Success output parameter is not found in the sqlcommand parameters list.");
            return Convert.ToBoolean(sqlCommand.Parameters[ProcedureParameters.SUCCESS].Value);
        }
        public static string GetMessage(this System.Data.SqlClient.SqlCommand sqlCommand)
        {
            return sqlCommand.Parameters[ProcedureParameters.MESSAGE].IsDbNull() ? "Null Message" : sqlCommand.Parameters[ProcedureParameters.MESSAGE].Value.ToString();
        }

    }
}
