using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Orders.DataAccessLayer
{
    public class DataAccess : IDisposable
    {
        private SqlConnection _connection;
        protected DataAccess(string sConnString)
        {
            _connection = new SqlConnection(sConnString);
        }

        protected SqlConnection Connection
        {
            get { return _connection; }
        }

        public void Dispose()
        {
            _connection.Dispose();
        }
    }
}
