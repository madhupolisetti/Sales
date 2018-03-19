<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Payment.aspx.cs" Inherits="Orders.Payment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.min.css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker3.min.css" />
    <title>Create Payment</title>
    <style type="text/css">
        #tblInVoiceGenerate th {
            text-align: center;
        }

        #myTabContent table td {
            font-size: 13px;
        }
        /*#UlListitems li{
            border: 1px solid #36A6EB;
            float:none !important;
        }*/

        read .nav-left-links li {
            float: none;
            margin: 0;
        }

        #divMultiplePayments {
            z-index: 999999;
        }

        .whatsImg {
            background: #F1F3FA;
            padding: 5px 8px;
        }

        .spacing-table {
            margin: auto;
        }

        .tabbable-custom > .nav-tabs > li.active > a, .tabbable-custom > .nav-tabs > li.active > a:hover {
            color: #005fa8 !important;
        }

        .nav-left-links li {
            float: none;
            border-bottom: 1px solid #ddd !important;
            margin-bottom: 1px;
        }

            .nav-left-links li a {
                margin-right: 0;
                border: 0;
                background-color: #f0f0f0;
                color: #404040;
            }

                .nav-left-links li a:hover {
                    background-color: #36A6EB;
                    color: #FFF;
                }

        .nav-left-links .glyphicon {
            color: #fff;
        }

        .nav-left-links .active .glyphicon {
            color: #333;
        }

        .nav-left-links > li.active > a,
        .nav-left-links > li.active > a:hover,
        .nav-left-links > li.active > a:focus {
            border: 0;
            color: #FFF;
            background-color: #36A6EB;
        }

        .tabbable-custom > .nav-tabs > li.active {
            border-top: 3px solid #005fa8 !important;
        }

        .tabbable-custom > .nav-tabs > li {
            border-top: 3px solid #ddd !important;
            background: #F9F9F9;
            border-right: 1px solid #ccc;
        }

            .tabbable-custom > .nav-tabs > li a {
                color: #808080 !important;
            }
        /*.tab-content {
            margin-left: 45px;
        }*/

        .tab-content .tab-pane {
            display: none;
            background-color: #fff;
            padding: 1.6rem;
            overflow-y: auto;
        }

        .tab-content .active {
            display: block;
        }

        .spacing-table {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 13px;
            border-collapse: separate;
            border-spacing: 0 7px; /* this is the ultimate fix */
        }

            .spacing-table td:first-child {
                text-align: right;
                padding: 5px 15px;
            }

        .btn-orangecolor {
            color: #fff;
            background-color: #ffa500;
        }

        .btn-3:hover {
            background: #e59400;
            color: #fff;
        }
    </style>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">

            <form>

                <!-- BEGIN PAGE CONTENT -->

                <input type="hidden" id="hdnInvoiceId" class="hdninvoiceId" value="<%=invoiceId %>" />
                <input type="hidden" id="hdnQuotationId" class="hdninvoiceId" value="<%=quotationId %>" />
                <input type="hidden" id="hdnAccountId" class="hdninvoiceId" value="<%=accountId %>" />
                <input type="hidden" id="hdnProductId" class="hdninvoiceId" value="1" />




                <!-- BEGIN PAGE CONTENT INNER -->


                <!-- BEGIN Credentials PORTLET -->
                <div class="text-center">
                    <label class="tab-style-default" id="btnOrderSummary" style="width: 200px;">Order Summary</label>
                    <label class="tab-style-blue margin-right-10" id="btnPaymentMethod" style="width: 200px;">Payment Method</label>
                </div>


                <!-- END Credentials PORTLET -->


                <div class="portlet light margin-top-20">

                    <div class="portlet-body">
                        <div id="divPendingAmount" class="margin-bottom-15">
                            <div class="pull-left margin-right-20">
                                <label class="bold">Total Amount:</label>
                                <label id="lblTotalAmount" class="lblTotalAmount label label-primary label-sm"></label>
                            </div>
                            <div class="pull-left">
                                <label class="bold">Pending Amount:</label>
                                <label id="lblPendingAmount" class="lblPendingAmount label label-warning label-sm"></label>

                            </div>
                            <div class="clearfix"></div>
                            <hr />
                        </div>

                        <div id="divIVORDate" style="display: none;">
                            <!-- BEGIN SMS Priority routing information -->

                            <div class="row margin-bottom-20">
                                <div class="col-sm-4">
                                    <label>Invoice Order#:</label>
                                    <input type="text" id="txtInvoiceOrder" disabled="disabled" class="form-control" />
                                </div>
                                <div class="col-sm-4">
                                    <label>Raised Date:</label>
                                    <input type="text" id="txtInvoiceRaisedDate" disabled="disabled" class="form-control" />
                                </div>
                                <div class="col-sm-4 margin-top-25">
                                    <%--<input type="button" value="Submit" id="btnsubmit" class="btn btn-primary" />--%>
                                </div>
                            </div>
                            <div>
                            </div>

                            <div class="portlet-body">

                                <div class="text-center">
                                    <div id="MetaData" class="dynamic">
                                    </div>
                                </div>
                            </div>


                            <div id="NoteText" style="display: none;">
                                <div id="OrderSummaryHtml"></div>
                                <div id="TaxSummaryHtml"></div>
                                <label>Order Confirmation Email should be sent to the Account User Business MailID,along T&C</label>


                                <div>
                                    <input type="button" value="Continue" id="btnContinue" class="btn btn-primary" style="margin-left: 700px; margin-top: -4px;" />

                                </div>

                            </div>
                            <!-- END MYNUMBERS PORTLET -->


                            <!-- END SMS Priority routing information -->
                        </div>




                        <div id="divIVORDate1" style="display: block;">


                            <div class="portlet light">

                                <div class="tabbable-custom nav-justified">
                                    <ul class="nav nav-tabs nav-justified" id="UlListitems">
                                        <li class="active">
                                            <a href="#tab_1_1_1" data-toggle="tab">Payment Methods</a>
                                        </li>

                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tab_1_1_1">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <ul class="nav nav-tabs nav-left-links" id="UlListitemsPaymentMethods">
                                                        <%--<li class="active"><a href="#Cash" data-toggle="tab">Cash<span></span></a></li>
                                                        <li><a href="#Cheque" data-toggle="tab"><span>Cheque</span></a></li>
                                                        <li><a href="#OnlineTransfer" data-toggle="tab"><span>Online Transfer</span></a></li>
                                                        <li><a href="#OnlinePayment" data-toggle="tab">Online Payment<span></span></a></li>--%>
                                                    </ul>
                                                </div>
                                                <div class="col-sm-8">
                                                    <div id="myTabContent" class="tab-content ">
                                                        <div class="tab-pane" id="Cash">
                                                            <table class="spacing-table table-head">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><span>Cash Deposit Date</span></td>
                                                                        <td>
                                                                            <input id="txtCashDepositeDate" type="text" class="form-control hasDatepicker" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Cash Deposit Amount</span></td>
                                                                        <td>
                                                                            <input id="txtCashDepositeAmount" type="text" class="form-control" onkeypress="return isNumberKey(event)" /></td>
                                                                    </tr>
                                                                    <tr id="trCashpercentageOfAmt">
                                                                        <td><span>Activate Amount</span></td>
                                                                        <td>
                                                                            <select id="txtCashPercentageOfAmt" class="form-control">
                                                                                <option value="25">25</option>
                                                                                <option value="50">50</option>
                                                                                <option value="75">75</option>
                                                                                <option value="100" selected="selected">100</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span></span></td>
                                                                        <td>
                                                                            <input type="checkbox" class="check_tool" id="chkCash" />
                                                                            Is TDS Applicable</td>
                                                                    </tr>
                                                                    <%--<tr id="trCashTanNumber" style="display: none;">
                                                                        <td><span>Enter GSTIN Number#</span></td>
                                                                        <td>
                                                                            <input id="txtCashTANNumber" type="text" class="form-control" /></td>
                                                                    </tr>--%>
                                                                    <tr id="trCashTanAmount" style="display: none;">
                                                                        <td><span>Enter GSTIN Amount</span></td>
                                                                        <td>
                                                                            <select id="ddlCashTANAmount" class="form-control">
                                                                                <option value="Select">Select</option>
                                                                                <option value="2">2%</option>
                                                                                <option value="10">10%</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Our SMSC Bank Account</span></td>
                                                                        <td>
                                                                            <select id="ddlCashDepositingBankAccount" class="form-control select-wrapper">
                                                                                <option value="" selected="selected">Select </option>

                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Comments (if any)</span></td>
                                                                        <td>
                                                                            <textarea id="CashComments" name="textarea" rows="1" cols="20" class="form-control"></textarea></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="tab-pane" id="Cheque">
                                                            <table class="spacing-table table-head">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><span>Cheque Deposit Date</span></td>
                                                                        <td>
                                                                            <input id="txtChequeDepositDate" type="text" class="form-control hasDatepicker"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Cheque Number</span></td>
                                                                        <td>
                                                                            <input id="txtCheque" type="text" class="form-control" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Cheque Amount</span></td>
                                                                        <td>
                                                                            <input id="txtChequeAmount" type="text" class="form-control" onkeypress="return isNumberKey(event)" /></td>
                                                                    </tr>
                                                                    <tr id="trChequePercentageOfAmt">
                                                                        <td><span>Activate Amount</span></td>
                                                                        <td>
                                                                            <select id="txtChequePercentageOfAmt" class="form-control">
                                                                                <option value="25">25</option>
                                                                                <option value="50">50</option>
                                                                                <option value="75">75</option>
                                                                                <option value="100" selected="selected">100</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span></span></td>
                                                                        <td>
                                                                            <input type="checkbox" class="check_tool" id="chkCheque" />
                                                                            Is TDS Applicable</td>
                                                                    </tr>

                                                                    <tr id="trChequeTanAmount" style="display: none;">
                                                                        <td><span>Enter GSTIN Amount</span></td>
                                                                        <td>
                                                                            <select id="ddlChequeTANAmount" class="form-control">
                                                                                <option value="Select">Select</option>
                                                                                <option value="2">2%</option>
                                                                                <option value="10">10%</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Our SMSC Bank Account</span></td>
                                                                        <td>
                                                                            <select id="ddlChequeDepositingBankAccount" class="form-control select-wrapper">
                                                                                <option value="" selected="selected">Select </option>

                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Cheque Holder Name</span></td>
                                                                        <td>
                                                                            <input id="txtChequeHolderName" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Comments (if any)</span></td>
                                                                        <td>
                                                                            <textarea id="ChequeComments" name="textarea" rows="1" cols="20" class="form-control"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Attachments</td>
                                                                        <td>
                                                                            <input type="file" name="file" multiple="multiple" accept="image/gif, image/jpeg,image/png" id="UploadCHEQUEAttachments" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <div id="CHEQUEAttachments"></div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="tab-pane active" id="OnlineTransfer">
                                                            <table class="spacing-table table-head">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><span>Our SMSC Bank Account</span></td>
                                                                        <td>
                                                                            <select id="ddlOnlineTransferBank" class="form-control select-wrapper" value="108">
                                                                                <option value="" selected="selected">Select </option>

                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Deposit Date</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferDepositDate" type="text" class="form-control hasDatepicker"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Transfer Amount</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferTransferAmount" type="text" class="form-control" onkeypress="return isNumberKey(event)"></td>
                                                                    </tr>
                                                                    <tr id="trOnlineTransferPercentageOfAmt">
                                                                        <td><span>Activate Amount</span></td>
                                                                        <td>
                                                                            <select id="txtOnlineTransferPercentageOfAmt" class="form-control">
                                                                                <option value="25">25</option>
                                                                                <option value="50">50</option>
                                                                                <option value="75">75</option>
                                                                                <option value="100" selected="selected">100</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr id="trOnlineTransferTransactionNumber">
                                                                        <td><span>Transaction Number</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferTransactionNumber" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <input type="checkbox" class="check_tool" id="chkOnline">
                                                                            Is TDS Applicable</td>
                                                                    </tr>
                                                                    <%--<tr id="trOnlineTanNumber" style="display: none;">
                                                                        <td><span>Enter GSTIN Number#</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTANNumber" type="text" class="form-control"></td>
                                                                    </tr>--%>
                                                                    <tr id="trOnlineTanAmount" style="display: none;">
                                                                        <td><span>Enter GSTIN Amount</span></td>
                                                                        <td>
                                                                            <select id="ddlOnlineTANAmount" class="form-control">
                                                                                <option value="Select">Select</option>
                                                                                <option value="2">2%</option>
                                                                                <option value="10">10%</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <%--<tr id="trOnlineTransferDueDate">
                                                                        <td><span>Due Date</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferDueDate" type="text" class="form-control hasDatepicker"></td>
                                                                    </tr>--%>
                                                                    <tr>
                                                                        <td><span>Client Account#</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferClientAccount" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Client Account Name</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferClientAccountName" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Comments (if any)</span></td>
                                                                        <td>
                                                                            <textarea id="OnlineTransfrComments" name="textarea" rows="1" cols="20" class="form-control"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Attachments</td>
                                                                        <td>
                                                                            <input type="file" name="file" multiple="multiple" accept="image/gif, image/jpeg,image/png" id="UploadOTCAttachments"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <div id="OTCAttachments"></div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="tab-pane" id="OnlinePayment">
                                                            <table class="spacing-table table-head">
                                                                <tbody>
                                                                    <tr id="trOnlineTransferThroughCCOnlinePaymentGateway">
                                                                        <td><span>Online Payment Gateway</span></td>
                                                                        <td>
                                                                            <select select="" id="txtOnlineTransferThroughCCAvenueOnlinePaymentGateway" class="form-control">
                                                                                <option value="0" selected="">Select</option>

                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Payment Gateway ReferenceId</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferPaymentReferenceId" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Enter Amount</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferCCAvenueEnterAmount" type="text" class="form-control" onkeypress="return isNumberKey(event)"></td>
                                                                    </tr>
                                                                    <tr id="trOnlineTransferCCAvenueTransactionNumber">
                                                                        <td><span>Transaction Number</span></td>
                                                                        <td>
                                                                            <input id="txtOnlineTransferCCAvenueTransactionNumber" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr id="trOnlineTransferThroughCCAvenuePercentageOfAmt">
                                                                        <td><span>Activate Amount</span></td>
                                                                        <td>
                                                                            <select id="txtOnlineTransferThroughCCAvenuePercentageOfAmt" class="form-control">
                                                                                <option value="25">25</option>
                                                                                <option value="50">50</option>
                                                                                <option value="75">75</option>
                                                                                <option value="100" selected="selected">100</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Comments (if any)</span></td>
                                                                        <td>
                                                                            <textarea id="txtOnlineTransferThroughCCAvenueComments" name="textarea" rows="1" cols="20" class="form-control"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Attachments</td>
                                                                        <td>
                                                                            <input type="file" name="file" multiple="multiple" accept="image/gif, image/jpeg,image/png" id="UploadOnlineTransferAttachments"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <div id="OTAttachments"></div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="tab-pane" id="PurchaseOrder">
                                                            <table class="spacing-table table-head">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><span>Client Company Name</span></td>
                                                                        <td>
                                                                            <input id="txtPOClientCompanyName" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Select Date</span></td>
                                                                        <td>
                                                                            <input id="txtPODate" type="text" class="form-control hasDatepicker"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Our SMSC Bank Account</span></td>
                                                                        <td>
                                                                            <select id="ddlpurchaseOrderDepositingBank" class="form-control select-wrapper">
                                                                                <option value="" selected="selected">Select </option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Enter Amount</span></td>
                                                                        <td>
                                                                            <input id="txtPOAmount" type="text" class="form-control" onkeypress="return isNumberKey(event)"></td>
                                                                    </tr>
                                                                    <tr id="trPOTanNumber" style="display: none;">
                                                                        <td><span>Enter GSTIN Number#</span></td>
                                                                        <td>
                                                                            <input id="txtPOTANNumber" type="text" class="form-control"></td>
                                                                    </tr>
                                                                    <tr id="trPOTanAmount" style="display: none;">
                                                                        <td><span>Enter GSTIN Amount</span></td>
                                                                        <td>
                                                                            <select id="ddlPOTANAmount" class="form-control">
                                                                                <option value="Select">Select</option>
                                                                                <option value="2">2%</option>
                                                                                <option value="10">10%</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <%--<tr id="trPODueDate">
                                                                        <td><span>Select Due Date</span></td>
                                                                        <td>
                                                                            <input id="txtPODueDate" type="text" class="form-control hasDatepicker"></td>
                                                                    </tr>--%>
                                                                    <tr>
                                                                        <td><span>Comments (if any)</span></td>
                                                                        <td>
                                                                            <textarea id="txtPOComments" name="textarea" rows="1" cols="20" class="form-control"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Attachments</td>
                                                                        <td>
                                                                            <input type="file" name="file" multiple="multiple" accept="image/gif, image/jpeg,image/png" id="UploadPOAttachments"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <div id="POAttachments"></div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="tab-pane" id="Pending">
                                                            <table class="spacing-table table-head">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><span>Select Due Date</span></td>
                                                                        <td>
                                                                            <input id="txtPendingDueDate" type="text" class="form-control hasDatepicker"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span>Comments (if any)</span></td>
                                                                        <td>
                                                                            <textarea id="txtPendingComments" name="textarea" rows="1" cols="20" class="form-control"></textarea></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span></span></td>
                                                                        <td><a class="anchorclass" style="font-size: 13px; border-radius: 0.25em; display: inline; font-weight: bold; display: inline; font-weight: bold; margin-left: 125px; line-height: 1; text-align: center; white-space: nowrap;" href="javascript:;">View Previous Payment Details</a></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="text-center">
                                    <input type="button" value="Confirm" id="btnConfirm" class="btn btn-primary" />
                                </div>
                                <%--<div class="row">
                                    <div class="col-md-2 col-sm-3">
                                        <div>
                                            <ul class="nav nav-tabs nav-left-links" >
                                                <li class="active dropdown dropdown-user" id="PaymentMethod">
                                                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                                        <span class="username username-hide-on-mobile">Payment Methods</span>
                                                        <i class="fa fa-angle-down"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-menu-default" >
                                                        
                                                    </ul>

                                                </li>
                                                
                                                <li><a href="" data-toggle="tab"><span>Purchase Order</span></a></li>
                                                <li><a href="" data-toggle="tab"><span>Pending</span></a></li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-10 col-sm-9">
                                        <div class="cont-box">
                                        <div class="tab-content ">
                                           
                                        </div>
                                          
                                            </div>
                                    </div>
                                </div>--%>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- END PAGE CONTENT -->

                <div class="modal fade in" id="basic" tabindex="-1" aria-hidden="true" style="margin-left: 343px; width: 350px;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <span style="color: green;">Payment Generated Successfully </span>
                            </div>
                            <div class="modal-body">

                                <span>You will be redirected after </span><span id="lblCount" style="color: red;"></span>&nbsp;<span> seconds </span>
                                <div>
                                    <button id="btnRedirect" style="margin-top: 13px;" type="button" class="btn green" data-dismiss="modal">Goto Payment Details</button>
                                </div>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
            </form>

            <div class="dropdown-menu-list"></div>
        </div>
    </div>

    <div class="modal fade in" id="divMultiplePayments" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" style="width: 95%;">
            <div class="modal-content">
                <div class="modal-header">
                    <div align="center">
                        <h3 class="modal-title" style="color: #2977aa;">Payment Details</h3>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="table-responsive" id="divmodalbody">
                    </div>
                    <%--Modal body goes here --%>
                </div>
                <div class="modal-footer">
                    <button id="btnClose" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="Scripts/OrdersClient.js"></script>
    <script type="text/javascript" src="Scripts/payment.js?type=v3"></script>
</asp:Content>
