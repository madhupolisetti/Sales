<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Quotations.aspx.cs" Inherits="Orders.Quotations" %>

<asp:Content ID="Content2" ContentPlaceHolderID="CSS" runat="server">
    <title>Quotation</title>
    <%-- <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />--%>
    <link href="CssFiles/jquery-ui.css" rel="stylesheet" />
    <link href="JsFiles/DateTimePicker/daterangepicker-bs3.css" rel="stylesheet" />

    <style>
        .inactive {
            background-color: red;
        }

        .clicked {
            background-color: orange;
        }

        .toggle {
            display: inline-block;
            height: 48px;
            width: 48px;
            background: url("http://icons.iconarchive.com/icons/pixelmixer/basic/48/plus-icon.png");
        }

        table.dataTable.no-footer {
            border-color: #ccc !important;
        }

        .red-tooltip + .tooltip > .tooltip-inner {
            background-color: #f00;
        }

        .red-tooltip + .tooltip > .tooltip-arrow {
            border-bottom-color: #f00;
        }

        #reportstable .heading {
            border-bottom: 1px solid #ff0000 !important;
        }
    </style>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">


            <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />
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
                                <select id="ddlBillMode" name="PaymentStatus" class="form-control form-filter input-sm">
                                    <option value="1">PrePaid</option>
                                    <option value="2">PostPaid</option>
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
                        <div class="row margin-bottom-15" style="display: none;" id="secondRow">
                            <div class="col-sm-3">
                                <label class="table-head">E-mail Id</label>
                                <input type="text" id="txtemail" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Quotation Status</label>
                                <select id="ddlQuotationType" name="PaymentStatus" class="form-control form-filter input-sm">
                                    <option value="3">Select</option>
                                    <option value="2">All</option>
                                    <option value="0">Pending</option>
                                    <option value="1">Invoice Raised</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Search By Id</label>
                                <input type="text" id="txtSearchById" class="form-control form-filter input-sm" />
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>

                        <div>
                            <label class="pull-left"><a id="btnAddNewQuotation" style="" class="btn color-green"><i class="fa fa-plus"></i>Create New Quotation</a></label>
                            <label class="pull-right">
                                <input type="button" value="Search" id="btnsearch" class="btn btn-success" style="width: 66px; margin-left: 10px;" />
                                <input type="button" value="Cancel" id="btncancel" class="btn btn-default btn-3" style="width: 66px; margin-left: 11px;" />
                            </label>
                            <div class="clearfix"></div>

                        </div>
                    </div>

                </div>
            </div>
            <div class="portlet light portlet-fit portlet-datatable">
                <div class="portlet-body">
                    <form id="form1" runat="server">
                        <div class="row">
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
                                        <label class="btnview" id="btnview"><i class="icon icon-eye"></i></label>
                                    </li>
                                    <li>
                                        <label class="btnedit" id="btnedit"><i class="icon icon-pencil"></i></label>
                                    </li>
                                    <li>
                                        <label class="btninvoice" id="btninvoice"><i class="icon icon-doc"></i></label>
                                    </li>
                                    <li>
                                        <label class="btndownload" id="btndownload"><i class="glyphicon glyphicon-download-alt"></i></label>
                                    </li>
                                    <li>
                                        <label class="btnpayment" id="btnpayment"><i class="glyphicon glyphicon-credit-card"></i></label>
                                    </li>
                                    <li>
                                        <label class="btn btn-circle btn-icon-only btn-default" id="btndelete"><i class="icon icon-trash"></i></label>
                                    </li>
                                </ul>
                            </div>
                        </div>




                        <div class="table-responsive">
                            <table id='quotationdetails' aria-describedby='sample_1_info' role='grid' class='table table-advance table-bordered'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Account Name</th>
                                        <th>Contact Name</th>
                                        <th>OwnerShip Name</th>
                                        <th>Company Name</th>
                                        <th>Mobile #</th>
                                        <th>Mail ID</th>
                                        <th>Country</th>
                                        <th>Quotation Created Date</th>
                                        <th>Quotation #</th>
                                        <th>Total Amount</th>
                                        <th>Quotation Status</th>
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


                        <div id="MetaData"></div>

                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade in" id="createQuotation" tabindex="-1" aria-hidden="true" style="position: relative; margin-top: -70px; margin-left: -180px;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" style="padding-left: 150px;"><b>Create Quotation</b></h4>
                    </div>
                    <div class="modal-body">
                        <%--Modal body goes here --%>
                        <table class="table no-border">
                            <tr>
                                <td>
                                    <span>Product</span>

                                </td>
                                <td>
                                    <select id="ddlProducts" class="form-control">
                                        <option value="2">BlueKite </option>
                                        <option value="1">GrpTalk </option>
                                    </select>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Account Name</span>

                                </td>
                                <td>

                                    <input type="text" id="txtUserName" class="form-control" onkeypress="return IsAlphaNumeric(event);" />
                                    <span id="error" style="color: Red; display: none">* Special Characters not allowed</span>
                                    <span id="lblerrAccountName" style="color: Red;"></span>

                                </td>
                            </tr>
                            <tr>
                                <td><span>Mobile </span>

                                </td>
                                <td>

                                    <input type="text" id="txtUserMobile" class="form-control" onkeypress='return isNumberKey(event)' />
                                    <span id="lblerrMobile" style="color: Red;"></span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>Account Quotation Type</span></td>
                                <td>

                                    <input type="radio" id="RegisteredUser" name="User" value="1" class="RegisteredUser" />
                                    Registered User 
                                        <input type="radio" id="NonRegisteredUser" class="NonRegisteredUser margin-left-10" name="User" value="0" />
                                    Non-Registered User 
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type="button" class="btn btn-primary margin-right-5" id="btnSubmit">Submit</button>
                                    <button id="btnCancel" type="button" class="btn btn-default">Cancel</button>

                                </td>
                            </tr>
                        </table>

                    </div>

                    <div class="modal-footer">
                        <button id="btnClose" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>


        <input type="hidden" name="hdnQuotationId" id="hdnQuotationId" />
        <input type="hidden" name="hdnIsPostPaid" id="hdnIsPostPaid" />
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/daterangepicker.js"></script>
    <script src="JsFiles/DateTimePicker/moment.min.js"></script>
    <script src="JsFiles/DateTimePicker/daterangepicker.js"></script>
    <script src="JsFiles/jquery-ui.js"></script>
    <script src="Scripts/OrdersClient.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var quotationSearchData = {};
            var dateRange = "";
            var webUrl = $("#hdnWebUrl").val();
            var ordersClient = new OrdersClient();
            $("#daterangetext").daterangepicker();
            $("#btnAddNewQuotation").click(function () {
                $("#createQuotation").modal("show");
            });
            dateRange = $("#daterangetext").val();
            quotationSearchData.AccountId = 0;
            quotationSearchData.ProductId = 1;
            quotationSearchData.QuotationId = 0;
            quotationSearchData.QuotationNumber = "";
            quotationSearchData.EmployeeId = 0;
            quotationSearchData.OwnerShipId = 0;
            quotationSearchData.ChannelId = 2;
            quotationSearchData.BillingModeId = 0;
            quotationSearchData.PageNumber = 1;
            quotationSearchData.Mobile = $("#txtmblnum").val();
            quotationSearchData.Email = $("#txtemail").val();
            quotationSearchData.Limit = $("#dropPages").val();
            getQuotations();

            $("#btnsearch").click(function () {
                dateRange = $("#daterangetext").val();
                quotationSearchData.AccountId = 0;
                quotationSearchData.ProductId = 1;
                quotationSearchData.QuotationId = 0;
                quotationSearchData.QuotationNumber = $("#txtSearchById").val();
                quotationSearchData.EmployeeId = 0;
                quotationSearchData.OwnerShipId = 0;
                quotationSearchData.ChannelId = 2;
                quotationSearchData.BillingModeId = $("#ddlBillMode").val();
                quotationSearchData.PageNumber = 1;
                quotationSearchData.Mobile = $("#txtmblnum").val();
                quotationSearchData.Email = $("#txtemail").val();
                quotationSearchData.Limit = $("#dropPages").val();
                getQuotations();
            });

            $("#btnview").click(function () {
                var quotationId = $('.check_tool.Checked').attr("id");
                var $form = $("<form/>").attr("id", "data_form")
                                        .attr("action", "Quotation.aspx")
                                        .attr("method", "post");
                $("body").append($form);
                AddParameter($form, "QuotationId", quotationId);
                $form[0].submit();
            });

            $("#btninvoice").click(function () {
                var quotationId = $('.check_tool.Checked').attr("id");
                ordersClient.CreateInvoice(quotationId, 1, 1, function (res) {
                    if (res.Success == true) {
                        var $form = $("<form/>").attr("id", "data_form")
                                        .attr("action", "Invoice.aspx")
                                        .attr("method", "post");
                        $("body").append($form);
                        AddParameter($form, "QuotationId", quotationId);
                        $form[0].submit();
                    } else {
                        ErrorNotifier(res.Message);
                    }
                });
            });

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
            $("#btndelete").click(function () {
                var quotationId = $('.check_tool.Checked').attr("id");
                var billMode = $('.check_tool.Checked').attr("BillMode");
                ordersClient.DeleteQuotation(quotationId, false, function (res) {
                    if (res.Success == true) {
                        SuccessNotifier(res.Message)
                        getQuotations();
                    }
                    else {
                        ErrorNotifier(res.Message);
                    }
                });

            });

            $("#btndownload").click(function () {
                var quotationId = $('.check_tool.Checked').attr("id");
                var billMode = $('.check_tool.Checked').attr("BillMode");
                ordersClient.DownloadQuotation(quotationId, false, function (res) {
                    console.log(res);
                    var a = document.createElement('a');
                    a.href = webUrl + res.FilePath;
                    a.download = webUrl + res.FilePath;
                    document.body.appendChild(a);
                    a.click();
                });
            });
            $(document).on('change', '.check_tool', function () {
                $("#hdnQuotationId").val($(this).attr("id"));
                $("#hdnIsPostPaid").val($(this).attr("billmode"));

            });
            $("#btnedit").click(function () {//To edit Quotation                
                var quotationId = $("#hdnQuotationId").val()
                var isBillMode = $("#hdnIsPostPaid").val();
                var productId = 1;
                var mobileNo = "9640986555";
                getProductRelatedUserInformation(productId, mobileNo, quotationId, isBillMode);
                return false;

                if (chkcount > 1 && headerhckBoxId == true) {
                    $('#quotationdetails').find('input[type=checkbox]:checked').removeAttr('checked');
                    ErrorNotifier("you can't edit more than one Quotation at a time");

                    $(".hdnQuotationId").val("");
                    return false;
                }
                else if (chkcount > 1 && headerhckBoxId == false) {
                    $('#quotationdetails').find('input[type=checkbox]:checked').removeAttr('checked');
                    ErrorNotifier("you can't edit more than one Quotation at a time");

                    $(".hdnQuotationId").val("");
                    return false;
                }
                else if (chkcount == 0) {
                    ErrorNotifier("please select atleast one record");

                    $(".hdnQuotationId").val("");
                    return false;
                }
                else {

                    var $form = $("<form/>").attr("id", "data_form")
                            .attr("action", "CreateQuotation.aspx")
                            .attr("method", "post");
                    $("body").append($form);

                    //Append the values to be send

                    AddParameter($form, "QuotationId", quotationId);
                    AddParameter($form, "BillMode", isBillMode);
                    AddParameter($form, "RegID", 3);
                    AddParameter($form, "ID", hdnAcIdredirect);

                    //Send the Form
                    $form[0].submit();
                    function AddParameter(form, name, value) {
                        var $input = $("<input />").attr("type", "hidden")
                                                .attr("name", name)
                                                .attr("value", value);
                        form.append($input);
                    }
                    $("input[id=hdnQuotationId]").val("");
                    return false;

                }

                return false;
            });

            function getQuotations() {

                if (dateRange == "This Month") {
                    quotationSearchData.FromDateTime = "2018-02-01";
                    quotationSearchData.FromDateTime = "2018-02-28";
                }
                else {
                    var fromDateT0date = dateRange.split("-");
                    quotationSearchData.FromDateTime = fromDateT0date[0];
                    quotationSearchData.ToDateTime = fromDateT0date[1];
                }
                ordersClient.GetQuotations(quotationSearchData, function (res) {
                    if (res.Success == true) {
                        if (res.Quotations.length > 0) {
                            var quotationsData = renderQuotations(res.Quotations);
                            $("#data").html(quotationsData);
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


            function renderQuotations(Quotations) {
                var quotations = "";
                for (var i = 0; i < Quotations.length; i++) {
                    quotations += "<tr><td><input type='checkbox'  id='" + Quotations[i].Id + "' status='" + Quotations[i].StatusId + "' class='check_tool' value='" + Quotations[i]["Id"] + "' AccountId='" + Quotations[i]["AccountId"] + "' BillMode = '" + Quotations[i]["BillingModeId"] + "' /></td>";
                    quotations += "<td><a class='nameHypClass' id='" + Quotations[i].AccountId + "'>" + Quotations[i].AccountName + "</a></td>";
                    quotations += "<td>" + Quotations[i].AccountName + "</td>";
                    quotations += "<td>" + Quotations[i].OwnerShipName + "</td>";
                    quotations += "<td>" + Quotations[i].Country + "</td>";
                    quotations += "<td>" + Quotations[i].Mobile + "</td>";
                    quotations += "<td class='font-blue-soft'>" + Quotations[i].Email + "</td>";
                    quotations += "<td>" + Quotations[i].Country + "</td>";
                    quotations += "<td>" + Quotations[i].CreatedTime + "</td>";
                    quotations += "<td class='alert-warning'>" + Quotations[i].QuotationNumber + "</td>";
                    var amount = parseFloat(Quotations[i].OrderAmount);
                    var currencyName = Quotations[i].Currency;
                    var taxMessage = ""
                    quotations += "<td><a href='javascript:;' class='font-grey-gallery'><label class='bold' data-toggle='tooltip' title='" + taxMessage + "'>" + amount + " " + currencyName + "</label></a></td>";
                    //quotations += "<td><span class='label label-sm label-warning'>" + Quotations[i].Status + "</span></td></tr>";
                    if (Quotations[i].Status == "Created") {
                        quotations += "<td><span class='label label-sm label-warning'>" + Quotations[i].Status + "</span></td></tr>";
                    }
                    else {
                        quotations += "<td><span class='label label-sm label-info'>" + Quotations[i].Status + "</span></td></tr>";
                    }
                }
                return quotations;

            }
            function AddParameter(form, name, value) {
                var $input = $("<input />").attr("type", "hidden")
                                        .attr("name", name)
                                        .attr("value", value);
                form.append($input);
            }


        });

        $("#btnSubmit").click(function () {
            var productId = $("#ddlProducts option:selected").val();
            getProductRelatedUserInformation(productId, $("#txtUserMobile").val(), 0, 0);

        });

        function getProductRelatedUserInformation(productId, mobileNo, quotationId, billMode) {
            var ordersClient = new OrdersClient();
            ordersClient.GetProductWiseAccountRelatedInformation(productId, mobileNo, function (res) {
                if (res.Success == 1) {

                    var accountId = res.AccountId;

                    var QotationReqType = 1;

                    var $form = $("<form/>").attr("id", "data_form")
                                    .attr("action", "CreateQuotation.aspx")
                                    .attr("method", "post");
                    $("body").append($form);
                    //Append the values to be send
                    //AddParameter($form, "QotationReqType", QotationReqType);
                    AddParameter($form, "ID", accountId);
                    AddParameter($form, "productId", productId);
                    AddParameter($form, "address", res.Address);
                    AddParameter($form, "state", res.State);
                    AddParameter($form, "contactName", res.NickName);
                    AddParameter($form, "country", res.Country);
                    AddParameter($form, "registeredDate", res.RegisteredDate);
                    AddParameter($form, "email", res.EmailID);
                    AddParameter($form, "mobile", res.MobileNumber);
                    AddParameter($form, "company", res.Company);
                    AddParameter($form, "BillMode", billMode);
                    AddParameter($form, "QuotationId", quotationId)
                    $form[0].submit();

                }
            });
        }

        function AddParameter(form, name, value) {
            var $input = $("<input />").attr("type", "hidden")
                                    .attr("name", name)
                                        .attr("value", value);
            form.append($input);
        }
    </script>


</asp:Content>
