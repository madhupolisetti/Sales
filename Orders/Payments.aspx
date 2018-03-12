<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Payments.aspx.cs" Inherits="Orders.Payments" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <title>Payment Details</title>


    <link href="JsFiles/DateTimePicker/daterangepicker-bs3.css" rel="stylesheet" />
    <link href="CssFiles/jquery-ui.css" rel="stylesheet" />
    <link href="assets/global/css/jquiryUI.min.css" rel="stylesheet" />
    <link href="CssFiles/components.min.css" rel="stylesheet" />
    <style>
        .btn-cancelcolor {
            color: #fff;
            background-color: #BDBDBD;
        }

        .btn-3:hover {
            background: #7F7F7F;
            color: #fff;
        }

        #divMultiplePaymentDetails th {
            border-color: #C0C0C0;
            vertical-align: text-top;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">

            <div class="portlet light">
                <div class="portlet-body pad-top-0">
                    <div id="tbl">
                        <div class="text-right font-blue"><a href="#" id="FilterByMore" class="btn-link margin-right-5">Search by more</a> <i class="fa fa-caret-down" id="filterIcn"></i></div>
                        <div class="row margin-bottom-15" id="firstRow">
                            <div class="col-sm-3">
                                <label class="table-head">Date</label>
                                <div class="input-group input-icon right" id="defaultrange" style="width: 100%;">
                                    <i class="fa fa-calendar"></i>
                                    <input type="text" class="form-control form-filter input-sm" id="daterangetext" value='This Month' />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Bill Mode</label>
                                <select id="ddlProduct" name="Product" class="form-control form-filter input-sm">
                                    
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Bill Mode</label>
                                <select id="ddlBillMode" name="BillMode" class="form-control form-filter input-sm">
                                    <option class="active" value="1">Pre Paid</option>
                                    <option value="2">Post Paid</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Account Name</label>
                                <input type="text" id="txtUserName" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div class="row margin-bottom-15" id="secondRow">
                            <div class="col-sm-3">
                                <label class="table-head">Mobile</label>
                                <input type="text" id="txtMobile" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Email Id</label>
                                <input type="text" id="txtEmail" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                               <label class="table-head">Payment Status</label>
                                <select id="ddlPaymentStatus" name="PaymentStatus" class="form-control form-filter input-sm">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Search By ID</label>
                                <input type="text" id="txtInvoice" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div>
                            <label class="pull-right">
                                <input type="button" value="Search" id="btnSearch" class="btn btn-success" style="width: 66px;" />
                                <input type="button" value="Cancel" id="btnCancel" class="btn btn-default" style="width: 66px; margin-left: 0px;" />
                            </label>
                            <div class="clearfix"></div>
                        </div>
                    </div>


                </div>
            </div>
            <div class="portlet light portlet-fit portlet-datatable">
                <div class="portlet-body">
                    <form runat="server">
                        <input type="hidden" id="hdnInvoiceId" class="hdnInvoiceId" />
                        <input type="hidden" id="hdnOrderId" class="hdnOrderId" />
                        <input type="hidden" id="hdnInvoiceNumber" class="hdnInvoiceNumber" />
                        <input type="hidden" id="hdnTotalAmount" class="hdnInvoiceNumber" />
                        <input type="hidden" id="hdnDueAmount" class="hdnInvoiceNumber" />

                        <input type="hidden" id="hdnCount" class="hdnCount" />



                        <div id="showEntriesandIcons" class="row margin-bottom-15">
                            <div class="col-sm-6">
                                <div id="Quotation-Details-Length" class="dataTables_length">
                                    <span class="margin-right-10">Show Entries :</span>
                                    <label>
                                        <select id="dropPages" class="form-control input-sm" name="Quotation-Details-Length" aria-controls="reportstable">
                                            <option value="4">10</option>
                                            <option value="5">20</option>
                                            <option value="6">50</option>
                                        </select>

                                    </label>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <ul class="results-icns pull-right">
                                    <li>
                                        <label class="btnaddnew enable-icn" id="btnCreatePayment"><i class="fa fa-plus" title="create payment"></i></label>
                                    </li>
                                    <li>
                                        <label class="btnview" id="btnview"><i class="icon icon-eye"></i></label>
                                    </li>
                                    <li>
                                        <label class="btnedit" id="btnedit"><i class="icon icon-pencil"></i></label>
                                    </li>
                                    <li>
                                        <label class="btndownload" id="btndownload"><i class="glyphicon glyphicon-download"></i></label>
                                    </li>
                                    <li>
                                        <label class="btnpayment" id="btnpayment"><i class="glyphicon glyphicon-credit-card"></i></label>
                                    </li>
                                    <li>
                                        <label class="btndelete" id="btndelete"><i class="icon icon-trash"></i></label>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div class="table-responsive">
                            <table id='tblPaymentDetails' role='grid' class='table table-advance table-bordered'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Account Name</th>
                                        <th>Contact Name</th>
                                        <th>OwnerShip Name</th>
                                        <th>Mobile #</th>
                                        <th>Mail ID</th>
                                        <th>Invoice Raised Date</th>
                                        <th>Invoice #</th>
                                        <th>Total Amount</th>
                                        <th>Due Amount</th>
                                        <th>Payment Status</th>
                                        <th>Last PaidDate</th>
                                        <th>Received Amount</th>
                                        <th>GSTIN Amount</th>
                                        <th>Activation Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tblDiv"></tbody>
                            </table>
                        </div>
                        <div id="page-selection"></div>


                        <div class="modal fade in" id="divMultiplePayments" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog" style="width: 1000px;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div align="center">
                                            <h3 class="modal-title" style="color: #2977aa;">Payment Details</h3>
                                        </div>
                                    </div>
                                    <div class="modal-body" id="divmodalbody" style="overflow-x: scroll; overflow-y: scroll;">
                                        <label class="" style="padding-left: 210px;"><b>Total Amount : </b></label>
                                        <label class="label label-primary label-sm"><b id="totalAmount"></b></label>
                                        <label class="" style="padding-left: 200px;"><b>Pending Amount : </b></label>
                                        <label class="label label-warning label-sm "><b id="pendingAmount"></b></label>
                                        <div id="divMultiplePaymentDetails"></div>
                                    </div>
                                    <div class="modal-footer">
                                        <button id="btnClose" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                                <!-- /.modal-content -->
                            </div>
                            <!-- /.modal-dialog -->
                        </div>

                        <%--<div class="row margin-top-20 " style="background-color: #32c5d2; overflow: hidden; margin-left: 6px; margin-right: -5px;">
                            <div style="float: left;">
                                <asp:ImageButton ID="btnsettings" runat="server" Height="30px" ImageUrl="~/images/SettingsIcon.png" />
                            </div>
                            <div style="float: right;">
                                <asp:ImageButton ID="btnaddnew" CssClass="btnaddnew" runat="server" ImageUrl="~/images/create.png" PostBackUrl="~/CreatePayment.aspx" Width="20px" ToolTip="Create Payment" />
                                <asp:ImageButton ID="btnview" runat="server" ImageUrl="~/images/ViewIcon.png" CssClass="btnview" ToolTip="View" />
                                <asp:ImageButton ID="btnedit" runat="server" ImageUrl="~/images/EditIcon.png" Height="20px" CssClass="btnedit" ToolTip="Edit" />
                                <asp:ImageButton ID="btndownload" runat="server" ImageUrl="~/images/DownloadIcon.png" CssClass="btndownload" ToolTip="Download" />
                                <asp:ImageButton ID="btnpayment" CssClass="btnpayment" runat="server" ImageUrl="~/images/payment.png" ToolTip="Payment" Width="20px" Enabled="false" />
                                <asp:ImageButton ID="btndelete" runat="server" ImageUrl="~/images/delete.png" CssClass="btndelete" ToolTip="Delete" Width="20px" />
                            </div>
                        </div>--%>
                        <%--<div id="tblDiv" class="row" style="width: 100%; overflow: auto; margin-left: 6px;"></div>--%>


                        <!-- class="container" end-->


                    </form>
                </div>
            </div>
            <form action='/CreatePayment.aspx' method='post' id='pageCreatePayment'>
                <input type="hidden" name="hdnOrderDueAmount" id="hdnOrderDueAmount" />
                <input type="hidden" name="hdnCountryId" id="hdnCountryId" />
                <input type="hidden" name="hdnTANNumber" id="hdnTANNumber" />
                <input type="hidden" name="hdnqInVoiceId" id="hdnqInVoiceId" />
                <input type="hidden" name="hdnqInVoiceNumber" id="hdnqInVoiceNumber" />
                <input type="hidden" id="hdnInvoiceIds" name="hdnInvoiceIds" />
                <input type="hidden" id="hdnPartiallyclick" name="hdnPartiallyclick" />
                <input type="hidden" id="hdnGetOrderId" name="hdnGetOrderId" />
            </form>
        </div>
    </div>

    <div class="modal fade" id="convertAccount">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h5 class="modal-title bold font-blue-soft">Convert Account</h5>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table no-border">
                            <tr>
                                <td class="col-sm-6">
                                    <select id="ddlConvert" name="ConvertAccount" class="form-control form-filter input-sm">
                                        <option value="0">--- Select ---</option>
                                        <option value="1">Convert To Bad-Debt</option>
                                        <option value="2">Waved Off</option>
                                    </select>
                                </td>
                                <td>
                                    <select id="ddlConvertType" class="form-control form-filter input-sm" style="display: none;">
                                        <option value="0">--- Select ---</option>
                                        <option value="1">Invoices</option>
                                        <option value="2">Account</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div id="convertToBadDebtData">
                                        <div id="invoices" style="display: none;">
                                            <span>The following invoices of this account are also in over due status. Select from the below list if you want to add these invoices to bad-debt. </span>
                                            <br />
                                            <div id="badDebtInvoiceData"></div>
                                        </div>
                                        <div id="wholeAccount" style="display: none;">
                                            <span>The whole account will be converted to BAD-DEBT and account will be blocked forever.</span><br />
                                            <div id="badDebtAccountData"></div>
                                        </div>
                                    </div>
                                    <div id="convertWaveOffData" style="display: none">
                                        <div class="table-responsive">
                                            <table class="table no-border">
                                                <tr>
                                                    <td class="col-sm-6">
                                                        <label>Amount : </label>
                                                    </td>
                                                    <td class="col-sm-6">
                                                        <input type="text" id="waveOffAmount" /></td>
                                                </tr>
                                                <tr>
                                                    <td class="col-sm-6">
                                                        <label>Comments : </label>
                                                    </td>
                                                    <td class="col-sm-6">
                                                        <textarea id="waveOffComments"></textarea></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>

                </div>
                <div class="modal-footer">
                    <div class="row" id="convertAccountFooter" style="display: none">
                        <div class="col-sm-6 col-md-6">
                            <button type="button" id="btnRequestCancel" data-dismiss="modal" aria-hidden="true" class="btn btn-success margin-right-5 ">Cancel</button>
                        </div>
                        <div class="col-sm-6 col-md-6">
                            <button type="button" id="btnRequestProceed" class="btn btn-danger margin-left-5">Proceed</button>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="approveWaveOffRequest" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal-sm">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Are you sure, Wave Off this Amount?
                </div>
                <div class="modal-footer">
                    <button id="btnApproveWaveOff" class="btn btn-primary" type="button">
                        Approve</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Reject</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="approveBadDebitInvoiceRequest" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal-sm">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Are you sure, you want to convert this invoice/these invoices to BAD-DEBT? Which can not be reveted.
                </div>
                <div class="modal-footer">
                    <button id="btnApproveBadDebitInvoice" class="btn btn-primary" type="button">
                        Approve</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Reject</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="approveBadDebitAccountRequest" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal-sm">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    Are you sure, you want to make this account a BAD_DEBT? which can not be reveted.
                </div>
                <div class="modal-footer">
                    <button id="btnApproveBadDebitAccount" class="btn btn-primary" type="button">
                        Approve</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Reject</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/daterangepicker.js"></script>
    <script src="JsFiles/DateTimePicker/moment.min.js"></script>
    <script src="JsFiles/DateTimePicker/daterangepicker.js"></script>
    <script src="Scripts/OrdersClient.js" type="text/javascript"></script>
    <script src="Scripts/payments.js" type="text/javascript"></script>
</asp:Content>
