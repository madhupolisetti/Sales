using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orders.UserDefinedClasses
{
    public class AccountProducts
    {

        private int id = 0;
        private decimal accountId = 0;
        private decimal productAccountId = 0;
        private string productAccountName = string.Empty;
        private string mobileNo = string.Empty;
        private string email = string.Empty;
        private int stateId = 0;
        private byte countryId = 0;
        private string address = string.Empty;
        private string gstin = string.Empty;
        private int ownerShipId = 0;
        private bool status = false;
        private string ownerShipEmail = string.Empty;
        private byte productId = 0;
        private string stateName = string.Empty;
        private string registeredDate = string.Empty;
        private string company = string.Empty;
        public int Id { get; set; }
        public decimal AccountId { get; set; }
        public decimal ProductAccountId { get; set; }
        public string ProductAccountName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public int StateId { get; set; }
        public byte CountryId { get; set; }
        public string Address { get; set; }
        public string Gstin { get; set; }
        public int OwnerShipId { get; set; }
        public bool Status { get; set; }
        public string OwnerShipEmail { get; set; }
        public byte ProductId { get; set; }
        public string StateName { get; set; }
        public string RegisteredDate { get; set; }
        public string Company { get; set; }
    }
}
