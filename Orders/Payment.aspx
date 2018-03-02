<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Payment.aspx.cs" Inherits="Orders.Payment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script type="text/javascript" src="Scripts/OrdersClient.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var ordersClient = new OrdersClient();
            ordersClient.GetBankAccounts(true, function (res) {
                console.log(res);
            });
            ordersClient.GetPaymentGateways(true, function (res) {
                console.log(res);
            });
        });

    </script>
</asp:Content>
