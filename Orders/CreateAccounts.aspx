<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="CreateAccounts.aspx.cs" Inherits="Orders.CreateAccounts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <link href="CssFiles/jquery-ui.css" rel="stylesheet" />
    <link href="/CssFiles/bootstrap-switch.min.css" rel="stylesheet" />
    <style>
        .form-control {
            width: 20% !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="form-group form-md-line-input form-md-floating-label for_select" id="registerName_div">
                <input type="text" class="form-control" id="registerName" />
                <label for="form_control_1">Account Name</label>
                <span class="help-block" id="registerName_error">Account Name can be only 50 characters.</span>
            </div>
            <div class="form-group form-md-line-input form-md-floating-label for_select" id="registerMobile_div">
                <select id="ddlCountry" class="form-control"></select>
                <input type="text" class="form-control" id="registerMobile" />
                <label for="form_control_1">Mobile Number

                </label>
                <span class="help-block" id="registerMobile_error">Account Name can be only 50 characters.</span>
            </div>
            <div class="form-group form-md-line-input form-md-floating-label for_select" id="registerMobile_GSTIN">
                <input type="text" class="form-control" id="registerGSTIN" />
                 <label for="form_control_1">GSTIN</label>
                <span class="help-block" id="registerMobile_GSTIN ">GSTIN can be only 15 characters.</span>
            </div>
            <div class="form-group form-md-line-input form-md-floating-label for_select" id="registerMobile_OwnerShip">
                <select id="ownerShipId" class="form-control"></select>
            </div>

        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="Scripts/OrdersClient.js" type="text/javascript"></script>
    <script src="Scripts/createAccounts.js" type="text/javascript"></script>
</asp:Content>
