<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="CreateQuotation.aspx.cs" Inherits="Orders.CreateQuotation" %>

<asp:Content ID="Content2" ContentPlaceHolderID="CSS" runat="server">
    <title>Create Quotation</title>

    <link href="CssFiles/jquery-ui.css" rel="stylesheet" />
    <link href="/CssFiles/bootstrap-switch.min.css" rel="stylesheet" />
    <style type="text/css">
        .csspanel {
            display: block;
            margin-left: 2px;
            margin-right: 2px;
            padding-top: 0.35em;
            padding-bottom: 0.625em;
            padding-left: 0.75em;
            padding-right: 0.75em;
            border: groove;
            width: 650px;
        }

        .csspanel1 {
            display: block;
            margin-left: 564px;
            margin-right: 105px;
            margin-top: -336px;
            border: groove;
            width: 260px;
            font: 200px;
        }

        .cssfont {
            font-size: smaller;
        }

        .cont-box {
            background: #fff;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">

            <span id="errmsg"></span>

            <div class="portlet light">
                <div class="portlet-body">
                    <h4 class="bold">Create Quotation</h4>

                    <hr />
                    <div class="table-responsive">

                        <table class="table no-border table-head">
                            <tr>
                                <td class="col-sm-4">
                                    <label>Registered Date</label>
                                    <input type="text" id="txtRegisteredDate" name ="RegisteredDate" class="txtRegisteredDate form-control updateValues" value="<%= registeredDate %>" />
                                </td>

                                <td class="col-sm-4">
                                    <label>Company/Business Name</label>
                                    <input type="text" id="txtCompanyName" name="CompanyName" class="txtCompanyName form-control updateValues" value="<%= companyName %>" />
                                </td>

                                <td class="col-sm-4">
                                    <label>Contact Name</label>
                                    <input type="text" id="txtContactName" name ="ContactName" class="txtContactName form-control updateValues" value="<%= contactName %>" />
                                </td>
                            </tr>

                            <tr>


                                <td>
                                    <label>Business Mail ID</label>
                                    <input type="text" id="txtBusinessMailID" name ="BusinessMailID" class="txtBusinessMailID form-control updateValues" value="<%= email %>" />
                                </td>

                                <td>
                                    <label>Mobile</label>
                                    <input type="text" id="txtMobile" name ="Mobile" class="txtMobile form-control updateValues" value="<%= mobile %>" />
                                </td>
                                <td>
                                    <%--<label>Alternate Mobile / Landline</label>
                                    <input type="text" id="txtAlternateMobile" class="txtAlternateMobile form-control" />--%>
                                    <label>GSTIN</label>
                                    <input type="text" id="txtGSTIN"  name ="GSTIN" class="updateValues txtGSTIN form-control" value ="<% = gstin %>" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Country</label>
                                    <select id="ddlCountry" disabled class="ddlCountry form-control updateValues" name="Country">
                                    </select><br />
                                    <label id="lblstate" style="display: none">State</label>
                                    <select id="state" class="form-control updateValues" name="States">
                                    </select>
                                </td>
                                <td colspan="2">
                                    <label>Address</label>
                                    <textarea name="txtContactAddress" name ="ContactAddress" class="txtContactAddress form-control updateValues" rows="3" cols="5"><%= address %></textarea>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label>Account Owner</label>
                                    <select id="ddlAccountOwner" name ="AccountOwner" class="ddlCountry form-control updateValues" name="AccountOwner">
                                    </select><br />

                                </td>
                                <td style ="display:none;">
                                    <label>Plans</label>
                                    <select id="ddlRechargeType" name ="RechargeType" class="ddlCountry form-control updateValues" name="RechargeType"></select><br />
                                </td>
                                <td>
                                    
                                    <input type="button" value="Update Details"  id="btnUpdate" class="btn btn-primary"/>&nbsp;
                                </td>

                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="portlet light">
                <div class="portlet-body">
                    <form id="frm" runat="server" class="frm">
                        <h4 class="bold">Select Services</h4>
                        <hr />
                        <div id="divMain" class="ServicesDiv row" style="border-color: black; margin-top: 15px;">
                        </div>
                        <div class="txtdiv" style="border-color: black">
                        </div>
                        <input type="button" value="Save" id="btnSave" class="btn btn-primary" style="width: 60px; display: none" />&nbsp;
              
                        <input type="button" value="Update" id="btnEdit" class="btn btn-primary" style="width: 80px; display: none" />

                    </form>
                    <form action='/Quotation.aspx' method='post' id='pageQuotationInvoice'>
                        <input type="hidden" name="hdnQuotInvoiceId" id="hdnQuotInvoiceId" />
                        <input type="hidden" name="hdnBillMode" id="hdnBillMode" />
                    </form>
                </div>
            </div>

            <input type="hidden" name="hdnProductId" id="hdnProductId" value="<%=productId %>" />
            <input type="hidden" name="hdnQuotationType" id="hdnQuotationType" value="<%= QuotationType%>" />
            <input type="hidden" name="hdnAccountId" id="hdnAccountId" value="<%=accountId %>" />
            <input type="hidden" name="hdnAccountProductId" id="AccountProductId" value="<%=AccountProductId %>" />
            <input type="hidden" name="hdnQuotationId" id="hdnQuotationId" value="<%=quotationId %>" />
            <input type="hidden" name="hdnIsPostPaid" id="hdnIsPostPaid" value="<%=isPostPaid %>" />
            <input type="hidden" name="hdnMobileNumber" id="hdnMobileNo" value="<%=mobile %>" />
            <input type="hidden" name="hdnStateId" id="hdnStateId" value="<%=stateId %>" />
            <input type="hidden" name="hdnCountryId" id="hdnCountryId" value="<%= country %>" />
            <input type="hidden" name="hdnIsFirstTime" id="hdnIsFirstTime" value="<%= isFirstTime %>" />
            <input type="hidden" name="hdnGstin" id="hdnGstin" value="<%= gstin %>" />
            <input type="hidden" name="hdnAccessRole" id="hdnAccessRole" value="<%=accessRole  %>" />
            <input type="hidden" name="hdnAdminId" id="hdnAdminId" value="<%= AdminId %>" />
            <input type="hidden" name="hdnTestCreditsAdminId" id="hdnTestCreditsAdminId" value="<%= TestCreditsAdminId %>" />
            <input type="hidden" name="hdnAccountOwnerEmail" id="hdnAccountOwnerEmail" value="<%= AccountOwnerEmail %>" />
            <input type="hidden" name="hdnAccountTypeId" id="hdnAccountTypeId" value="<%= AccountTypeId %>" />
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/bootstrap-switch.min.js"></script>
    <script src="Scripts/OrdersClient.js?type=v17"></script>
    <script src="Scripts/getServices.js?type=v10"></script>
    <script src="Scripts/createquotation.js?type=v25"></script>

    <%--   <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>--%>
    <script src="JsFiles/jquery-ui.js"></script>
    <script type="text/javascript">
        $(function () {
            $(".txtRegisteredDate").datepicker();
            var isFirstTime = $("#hdnIsFirstTime").val();
            if (isFirstTime == "false")
            {
                $("#btnUpdate").prop('value', "Update Details");
            }
            else if (isFirstTime == "true") {
                
                $("#btnUpdate").prop('value', 'Save Details');
            }
        });
    </script>
</asp:Content>
