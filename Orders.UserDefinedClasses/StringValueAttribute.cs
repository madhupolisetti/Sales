using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orders.UserDefinedClasses
{
    public class StringValueAttribute : System.Attribute
    {
        public string _value = string.Empty;
        public StringValueAttribute(string value)
        {
            this._value = value;
        }
        public string Value
        {
            get { return this._value; }
        }
    }
}
