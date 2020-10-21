<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Orders.aspx.cs" Inherits="Orders.OrdersList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <link href="JsFiles/DateTimePicker/daterangepicker-bs3.css" rel="stylesheet" />
    <link href="CssFiles/components.min.css" rel="stylesheet" />
    <style>

        #divQuotationservices label>strong {
       font-size: 12px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">


            <div class="portlet light">
                <div class="portlet-body pad-top-0">
                    <div id="tbl">
                        <div class="text-right font-blue">
                            <a href="#" id="FilterByMore" class="btn-link margin-right-5">Search by more</a> <i class="fa fa-caret-down" id="filterIcn"></i>
                        </div>
                        <div class="row margin-bottom-15" id="firstRow">
                            <div class="col-sm-3">
                                <label>Date</label>
                                <div class="input-group" id="defaultrange">
                                    <input type="text" class="form-control form-filter input-sm" id="daterangetext" value='This Month' />
                                    <span class="input-group-btn">
                                        <button class="btn default date-range-toggle" type="button" style="padding: 4px 12px !important;"><i class="fa fa-calendar"></i></button>
                                    </span>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <label>Product</label>
                                <select id="ddlProduct" name="Product" class="form-control form-filter input-sm">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Bill Mode</label>
                                <select id="ddlBillMode" name="BillMode" class="form-control form-filter input-sm">
                                    <option value="1">Prepaid</option>
                                    <option value="2">Postpaid</option>
                                    <option value="3">Unlimited</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Account Name</label>
                                <input type="text" id="txtAccountName" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div class="row margin-bottom-15" id="secondRow" style="display: none;">
                            <div class="col-sm-3">
                                <label>Mobile</label>
                                <input type="text" id="txtMobile" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                                <label>Email</label>
                                <input type="text" id="txtEmail" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                                <label>Activation Status</label>
                                <select id="ddlOrderStatus" name="OrderStatus" class="form-control form-filter input-sm">

                                    <%--   <option value="2">Partially Activated</option>--%>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Search By ID</label>
                                <input type="text" id="txtNumber" class="form-control form-filter input-sm" placeholder="Quotation/Invoice" />
                            </div>
                        </div>
                        <div class="row margin-bottom-15" id="thirdRow">
                        </div>
                        <div class="text-right">
                            <input type="button" value="Search" id="btnsearch" class="btn btn-success" style="width: 66px; margin-left: 10px;" />
                            <input type="button" value="Download" id="btn_download" class="btn btn-success" style="width: 90px; margin-left: 10px;" />
                            <input type="button" value="Cancel" id="btncancel" class="btn btn-default" style="width: 66px; margin-left: 11px;" />
                        </div>

                    </div>
                </div>
            </div>

            <div class="portlet light portlet-fit portlet-datatable">
                <div class="portlet-body">
                    <form id="form1" runat="server">

                        <div class="row margin-bottom-10">
                            <div class="col-sm-6">
                                <div id="Quotation-Details-Length" class="dataTables_length">
                                    <span class="margin-right-10">Show Entries :</span>
                                    <label>
                                        <select id="dropPages" class="form-control input-sm" name="Quotation-Details-Length" aria-controls="reportstable">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                        </select>

                                    </label>

                                </div>
                            </div>
                        </div>



                        <div class="table-responsive">
                            <table id='orderActivation' role='grid' class='table table-advance table-bordered'>
                                <thead>
                                    <tr>
                                        <%--  <th></th>--%>
                                        <th>Product Name</th>
                                        <th>Account Name</th>
                                        <th>Company Name</th>
                                        <th>Ownership Name</th>                                        
                                        <th>Mobile #</th>
                                        <th>Invoice #</th>
                                        <th>Proforma Invoice #</th>
                                        <th>Invoice Raised Date</th>
                                        <th>Latest Paid Date</th>
                                        <%--<th>Payment Mode</th>--%>
                                        <th>Total Amount</th>
                                        <th>Payment Status</th>
                                        <th>Due Date</th>
                                        <th>Payment Modes</th>
                                        <th>Account Status</th>
                                        <th>Order Status</th>
                                        <th>Generate Tax Invoice #</th>
                                        <%--<th>Activation</th>--%>
                                        <th>Comments</th>
                                        <%--<th>Order Actions</th>--%>
                                    </tr>
                                </thead>
                                <tbody id="data"></tbody>
                            </table>
                        </div>
                        <div id="page-selection"></div>


                        <asp:Label ID="lblafttax" runat="server" CssClass="lblafttax"></asp:Label>
                        <asp:Label ID="lbltotamt" runat="server" CssClass="lbltotamt"></asp:Label>
                        <asp:Label ID="lblsbctamt" runat="server" CssClass="lblsbctamt"></asp:Label>
                        <asp:Label ID="lblkrishikalyanAmt" runat="server" CssClass="lblkrishikalyanAmt"></asp:Label>
                        <asp:Label ID="lblgradTot" runat="server" CssClass="lblgradTot"></asp:Label>
                        <asp:Label ID="amountinRs" runat="server" CssClass="amountinRs"></asp:Label>

                        <div id="MetaData">
                        </div>
                    </form>
                </div>
            </div>


        </div>
        <div class="modal fade in" id="divMultiplePayments" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog" style="width: 1000px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <div align="center">
                            <h3 class="modal-title" style="color: #2977aa;">Payment Details</h3>
                        </div>
                    </div>
                    <div class="modal-body">
                        <%--Modal body goes here --%>
                        <div id="divmodalbody" style="display:inline-block;"></div>
                        <label><b>Total Amount : </b></label>
                        <label class="label label-primary label-sm"><b id="bTotalPayment"></b></label>
                        <br>
                        <label><b>Pending Amount : </b></label>
                        <label class="label label-warning label-sm"><b id="bPendingAmount"></b></label>
                        <div id="divMultiplePaymentDetails"></div>
                    </div>

                    <div class="modal-footer">
                        <h5 class="text-center bold">Are you sure ? you want to Verify this account information?</h5>
                        <div class="text-center margin-bottom-15">
                            <button type="button" class="btn btn-primary" id="ccSubmit" data-dismiss="modal">Submit</button>
                            <button type="button" class="btn btn-default" id="ccCancel" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <%--popup for chargeback/refund--%>
        <div class="modal fade" id="chargeBackOrRefundPopUp" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-body">

                        <label class="table-head">Reason for Charge Back/Refund</label>
                        <textarea id="txtReasonforChargeBackorRefund" name="textarea" rows="5" class="form-control" style="resize: none;"></textarea>

                        <div class="text-right margin-top-15">
                            <button type="button" class="btn btn-primary" id="Submit" data-dismiss="modal">Submit</button>
                            <button type="button" class="btn btn-default" id="Cancel" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      


        <div class="modal fade in" id="quotationServicesModal" tabindex="-1" aria-hidden="true" >
            <div class="modal-dialog modal-lg"> 
                <div class="modal-content">
                    <div class="modal-header">  
                        <h4 class="modal-title"><b>Activate Order</b></h4>
                    </div>
                    <div class="modal-body" id="divQuotationservices" >

                    </div>

                    <div class="modal-footer">
                        <button id="btnClose" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button id="btnActivate" type="button" class="btn btn-primary" data-dismiss="modal">Activate</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </div>
    <input type="hidden" id="hdnOrderId" class="hdnOrderId" />
    <input type="hidden" id="hdnInvoiceNumber" class="hdnInvoiceNumber" />
    <input type="hidden" id="hdnTotalAmount" class="hdnInvoiceNumber" />
    <input type="hidden" id="hdnDueAmount" class="hdnInvoiceNumber" />


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/DateTimePicker/moment.min.js"></script>
    <script src="JsFiles/DateTimePicker/daterangepicker.js"></script>
    <script src="Scripts/OrdersClient.js?type=v9" type="text/javascript"></script>
    <script src="Scripts/orders.js?type=v9" type="text/javascript"></script>
    <script src="JsFiles/jquery.bootpag.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var adminId = "<%=Session["AdminId"].ToString()%>";
            getAdminId(adminId);
            $("#lable_href_name").html('Orders');
        });
    </script>
</asp:Content>
