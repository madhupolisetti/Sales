<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Invoices.aspx.cs" Inherits="Orders.Invoices" %>
<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
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
                                <label class="table-head">Date</label>
                                <div class="input-group input-icon right" id="defaultrange" style="width: 100%;">
                                    <i class="fa fa-calendar"></i>
                                    <input type="text" class="form-control form-filter input-sm" id="daterangetext" value='This Month' />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Billing Mode</label>
                                <select id="ddlBillingMode" name="BillingMode" class="form-control form-filter input-sm">
                                    <option value="0">PrePaid</option>
                                    <option value="1">Post Paid</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Account Name</label>
                                <input type="text" id="txtuser" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Mobile</label>
                                <input type="text" id="txtmblnum" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div class="row margin-bottom-15" id="secondRow" style="display:none;">
                            <div class="col-sm-3">
                                <label class="table-head">Email Id</label>
                                <input type="text" id="txtemail" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Payment Status</label>
                                <select id="ddlpaymetstatus" name="PaymentStatus" class="form-control form-filter input-sm">
                                    <option value="3">Select</option>
                                    <option value="2">All</option>
                                    <option value="0">Pending</option>
                                    <option value="1">Payment Raised</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Search By ID</label>
                                <input type="text" id="txtSearchById" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div>
                            <label class="pull-left"><a id="btnAddNewQuotation" style="" class="btn margin-right-10 color-green"><i class="fa fa-plus"></i>Create New Quotation</a></label>
                            <label class="pull-right">
                                <input type="button" value="Search" id="btnsearch" class="btn btn-success" style="width: 66px; margin-left: 10px;" />
                                <input type="button" value="Cancel" id="btncancel" class="btn btn-default" style="width: 66px; margin-left: 11px;" />
                            </label>
                            <div class="clearfix"></div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="portlet light portlet-fit portlet-datatable">
                <div class="portlet-body">

                    <div class="row margin-bottom-15">
                        <div class="col-sm-6">
                            <div id="Quotation-Details-Length" class="dataTables_length">
                                <span class="margin-right-10">Show Entries :</span>
                                <label>
                                    <select id="dropPages" class="form-control input-inline" name="Quotation-Details-Length" aria-controls="reportstable">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>

                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <ul class="results-icns pull-right">
                                <li>
                                    <label class="btncreate" id="btncreate"><i class="icon icon-plus"></i></label>
                                </li>
                                <li>
                                    <label class="btnview" id="btnView"><i class="icon icon-eye"></i></label>
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
                        <table id='invoicesearch' role='grid' class='table table-advance table-bordered'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Account Name</th>
                                    <th>Contact Name</th>
                                    <th>OwnerShip Name</th>
                                    <th>Mobile #</th>
                                    <th>Mail ID</th>
                                    <th>Country</th>
                                    <th>Quotation Raised Date</th>
                                    <th>Invoice Raised Date</th>
                                    <th>Quotation #</th>
                                    <th>Invoice #</th>
                                    <th>Total Amount</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody id="data"></tbody>
                        </table>
                    </div>
                    <div id="page-selection"></div>


                </div>
            </div>

            <div id="MetaData"></div>
        </div>
    </div>
    

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="Scripts/OrdersClient.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var dateRange = "";
            var invoiceSearchData = {};
            var ordersClient = new OrdersClient();
            dateRange = $("#daterangetext").val();
            invoiceSearchData.AccountId = 0; invoiceSearchData.ProductId = 1; invoiceSearchData.InvoiceId = 0;
            invoiceSearchData.QuotationNumber = ""; invoiceSearchData.EmployeeId = 0; invoiceSearchData.OwnerShipId = 0;
            invoiceSearchData.ChannelId = 2; invoiceSearchData.BillingModeId = 0; invoiceSearchData.PageNumber = 1;
            invoiceSearchData.Mobile = ""; invoiceSearchData.Email = ""; invoiceSearchData.Limit = 20;
            invoiceSearchData.FromDateTime = "2018-02-01";

            getInvoices();

            $(document).delegate('#FilterByMore', 'click', function () {
                var anchorText = $(this).text();
                if (anchorText == "Search by more") {
                    $("#secondRow").show();
                    $("#FilterByMore").text("Search by less");
                    $("#filterIcn").removeClass("fa fa-caret-down").addClass("fa fa-caret-up");
                }
                else {
                    $("#secondRow").hide();
                    $("#FilterByMore").text("Search by more");
                    $("#filterIcn").removeClass("fa fa-caret-up").addClass("fa fa-caret-down");
                }
            });

            $(document).delegate('.check_tool', 'change', function () {
                $('.check_tool').prop('checked', false);
                $('.check_tool').removeClass("Checked");
                $(this).prop('checked', true);
                $(this).addClass("Checked");
            });

            $("#btnView").click(function () {
                var quotationId = $('.check_tool.Checked').attr("QuotationId");
                var $form = $("<form/>").attr("id", "data_form")
                                        .attr("action", "Invoice.aspx")
                                        .attr("method", "post");
                $("body").append($form);
                AddParameter($form, "QuotationId", quotationId);
                $form[0].submit();
            });

            function getInvoices() {
                if (dateRange == "This Month") {
                    invoiceSearchData.FromDateTime = "2018-02-01";
                    invoiceSearchData.FromDateTime = "2018-02-28";
                }
                else {
                    var fromDateT0date = dateRange.split("-");
                    invoiceSearchData.FromDateTime = fromDateT0date[0];
                    invoiceSearchData.ToDateTime = fromDateT0date[1];
                }
                ordersClient.GetInvoices(invoiceSearchData, function (res) {
                    if (res.Success == true) {
                        if (res.Invoices.length > 0) {
                            var invoicesData = renderInvoices(res.Invoices);
                            $("#data").html(invoicesData);
                        }
                        else {
                            $("#data").html("<tr ><td align='center' colspan='12'> No records Found</td></tr>");
                        }
                    }
                    else {
                        ErrorNotifier(res.Message);
                    }
                });

            }

            function renderInvoices(Invoices) {
                var invoicesData = "";
                for (var i = 0; i < Invoices.length; i++) {
                    invoicesData += "<tr><td><input type='checkbox'  QuotationId='" + Invoices[i].QuotationId + "' status='" + Invoices[i].StatusId + "' class='check_tool' value='" + Invoices[i]["QuotationId"] + "' AccountId='" + Invoices[i]["AccountId"] + "' BillMode = '" + Invoices[i]["BillingModeId"] + "' /></td>";
                    invoicesData += "<td><a class='nameHypClass' id='" + Invoices[i].AccountId + "'>" + Invoices[i].AccountName + "</a></td>";
                    invoicesData += "<td>" + Invoices[i].AccountName + "</td>";
                    invoicesData += "<td>" + Invoices[i].OwnerShipName + "</td>";
                    invoicesData += "<td>" + Invoices[i].Mobile + "</td>";
                    invoicesData += "<td class='font-blue-soft'>" + Invoices[i].Email + "</td>";
                    invoicesData += "<td>" + Invoices[i].Country + "</td>";
                    invoicesData += "<td>" + Invoices[i].QuotationCreatedTime + "</td>";
                    invoicesData += "<td>" + Invoices[i].InvoiceGeneratedTime + "</td>";
                    invoicesData += "<td class='alert-warning'>" + Invoices[i].QuotationNumber + "</td>";
                    invoicesData += "<td class='alert-warning'>" + Invoices[i].InvoiceNumber + "</td>";
                    var amount = parseFloat(Invoices[i].OrderAmount);
                    var currencyName = Invoices[i].Currency;
                    var taxMessage = ""
                    invoicesData += "<td><a href='javascript:;' class='font-grey-gallery'><label class='bold' data-toggle='tooltip' title='" + taxMessage + "'>" + amount + " " + currencyName + "</label></a></td>";
                    //Invoices += "<td><span class='label label-sm label-warning'>" + Invoices[i].Status + "</span></td></tr>";
                    if (Invoices[i].Status == "Created") {
                        invoicesData += "<td><span class='label label-sm label-warning'>" + Invoices[i].Status + "</span></td></tr>";
                    }
                    else {
                        invoicesData += "<td><span class='label label-sm label-info'>" + Invoices[i].Status + "</span></td></tr>";
                    }
                }
                return invoicesData;

            }

            function AddParameter(form, name, value) {
                var $input = $("<input />").attr("type", "hidden")
                                        .attr("name", name)
                                        .attr("value", value);
                form.append($input);
            }
        });
    </script>
</asp:Content>
