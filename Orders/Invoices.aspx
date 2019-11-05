<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Invoices.aspx.cs" Inherits="Orders.Invoices" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <link href="JsFiles/DateTimePicker/daterangepicker-bs3.css" rel="stylesheet" />
    <style>
        
        .modal-backdrop{
            z-index:1099999;
        }
        .modal{
            z-index: 100599999;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">
            <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />
            <div class="portlet light">
                <div class="portlet-body pad-top-0">
                    <div id="tbl">
                        <div class="text-right font-blue">
                            <a href="#" id="FilterByMore" class="btn-link margin-right-5">Search by more</a> <i class="fa fa-caret-down" id="filterIcn"></i>
                        </div>
                        <div class="row margin-bottom-15" id="firstRow">
                            <div class="col-sm-3">
                                <label class="table-head">Date</label>
                                <div class="input-group input-icon right" style="width: 100%;">
                                    <i class="fa fa-calendar"></i>
                                    <input type="text" class="form-control form-filter input-sm" id="txtDateRange" value='This Month' />
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Product</label>
                                <select id="ddlProduct" name="BillingMode" class="form-control form-filter input-sm">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Billing Mode</label>
                                <select id="ddlBillingMode" name="BillingMode" class="form-control form-filter input-sm">
                                    <option value="1">Prepaid</option>
                                    <option value="2">Postpaid</option>
                                    <option value="3">Unlimited</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Account Name</label>
                                <input type="text" id="txtAccountName" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div class="row margin-bottom-15" id="secondRow" style="display: none;">
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
                                <select id="ddlInvoiceStatus" name="PInvoiceStatus" class="form-control form-filter input-sm">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label class="table-head">Search By ID</label>
                                <input type="text" id="txtSearchById" class="form-control form-filter input-sm" />
                            </div>
                        </div>
                        <div>
                            <label class="pull-left"><a id="btnAddNewQuotation" style="display:none;" class="btn margin-right-10 color-green"><i class="fa fa-plus"></i>Create New Quotation</a></label>
                            <label class="pull-right">
                                <input type="button" value="Search" id="btnSearch" class="btn btn-success" style="width: 66px; margin-left: 10px;" />
                                <input type="button" value="Download" id="btn_download" class="btn btn-success" style="width: 90px; margin-left: 10px;" />
                                <input type="button" value="Cancel" id="btnCancel" class="btn btn-default" style="width: 66px; margin-left: 11px;" />
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
                                        <option value="10">10</option>                                        <option value="20">20</option>
										<option value="20">20</option>                                        <option value="50">50</option>
                                    </select>

                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <ul class="results-icns pull-right">
                                <li>
                                    <label class="btncreate" title="Create" id="btncreate"><i class="icon icon-plus" style="display:none;"></i></label>
                                </li>
                                <li>
                                    <label class="btnview" title="View" id="btnView"><i class="icon icon-eye"></i></label>
                                </li>
                                <li>
                                    <label class="btnedit"  id="btnEdit"><i class="icon icon-pencil"></i></label>
                                </li>
                                <li>
                                    <label class="btndownload" title="Download" id="btnDownload"><i class="glyphicon glyphicon-download"></i></label>
                                </li>
                                <li>
                                    <label class="btnpayment"  id="btnPayment"><i class="glyphicon glyphicon-credit-card"></i></label>
                                </li>
                                <li>
                                    <label class="btndelete" title="Delete" id="btndelete"><i class="icon icon-trash"></i></label>
                                </li>
                                <li>
                                    <label class="btnCancel" title="Cancel" id="btnCancelInvoice"><i class="fa fa-ban" aria-hidden="true"></i></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id='invoicesearch' role='grid' class='table table-advance table-bordered'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Account Name</th>
                                    <th>Company Name</th>
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
    <div class="modal fade in" id="createQuotation" tabindex="-1" aria-hidden="true" style="position: absolute;">
        <div class="modal-dialog" >
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
                                </select>

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

         <div class="modal fade in" id="editInvoice" tabindex="-1" aria-hidden="true" style="position: absolute;">
        <div class="modal-dialog modal-lg"> 
            <div class="modal-content">
                
                <div class="modal-header">
                    <h4 class="modal-title"><b>Update Invoice : <span id="InvoiceNumber"></span></b></h4>
    </div>
                <div class="modal-body">
        <div class="table-responsive">

                        <table class="table no-border table-head">
                            <tr>
                               <%-- <td class="col-sm-4">
                                    <label>Registered Date</label>
                                    <input type="text" id="txtRegisteredDate" name ="RegisteredDate" class="txtRegisteredDate form-control updateValues"  />
                                </td>--%>

                                <td class="col-sm-4">
                                    <label>Company/Business Name</label>
                                    <input type="text" id="txtCompanyNameEdit" name="CompanyName" class="txtCompanyName form-control updateValues"  />
                                </td>
                                  <td>
                                    <label>Business Mail ID</label>
                                    <input type="text" id="txtBusinessMailIDEdit" name ="BusinessMailID" class="txtBusinessMailID form-control updateValues" />
                                </td>

                                <td>
                                    <label>Mobile</label>
                                    <input type="text" id="txtMobileEdit" name ="Mobile" class="txtMobile form-control updateValues" />
                                </td>
                                <%--<td class="col-sm-4">
                                    <label>Contact Name</label>
                                    <input type="text" id="txtContactName" name ="ContactName" class="txtContactName form-control updateValues" />
                                </td>--%>
                            </tr>

                            <tr>


                              
                                <td>
                                    <%--<label>Alternate Mobile / Landline</label>
                                    <input type="text" id="txtAlternateMobile" class="txtAlternateMobile form-control" />--%>
                                    <label>GSTIN</label>
                                    <input type="text" id="txtGSTINEdit"  name ="GSTIN" class="updateValues txtGSTIN form-control" />
                                </td>
                                <td colspan="2">
                                    <label>Address</label>
                                    <textarea id="txtContactAddressEdit" name ="ContactAddress" class="txtContactAddress form-control updateValues" rows="3" cols="5"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <%--<label>Country</label>
                                    <select id="ddlCountry" class="ddlCountry form-control updateValues" name="Country">
                                    </select><br />--%>
                                    <label id="lblstate" >State</label>
                                    <select id="stateEdit" class="form-control updateValues" name="States">
                                    </select>
                                </td>
                                

                            </tr>
                         <%--   <tr>
                                <td>
                                    <label>Account Owner</label>
                                    <select id="ddlAccountOwner" name ="AccountOwner" class="ddlCountry form-control updateValues" name="AccountOwner">
                                    </select><br />

                                </td>
                                <td style ="display:none;">
                                    <label>Plans</label>
                                    <select id="ddlRechargeType" name ="RechargeType" class="ddlCountry form-control updateValues" name="RechargeType"></select><br />
                                </td>
                                

                            </tr>--%>
                        </table>
                    </div>
                    </div>

                <div class="modal-footer">
                    <input type="button" value="Update Details"  id="btnUpdateEdit" class="btn btn-primary"/>&nbsp;
                    <button id="btnCloseEdit" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>

                </div>
                </div>
            </div>
             </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/DateTimePicker/moment.min.js"></script>
    <script src="JsFiles/DateTimePicker/daterangepicker.js"></script>
    <script src="JsFiles/jquery.bootpag.min.js"></script>
    <script src="Scripts/OrdersClient.js?type=v3" type="text/javascript"></script>
    <script src="Scripts/getUserDetailsForCreateQuotation.js?type=5"></script>
    <link href="CommonClasses/css/font-awesome.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/momentjs/2.14.1/moment-with-locales.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#lable_href_name").html('Invoices');
            var accessRole;
            accessRole ="<%=Session["AccessRole"].ToString()%>";
            
            var dateRange = "";
            var invoiceSearchData =  {};
            var webUrl = $("#hdnWebUrl").val();
            var ordersClient = new OrdersClient();
            globalPageNumber = 1;
            globalPageSize = 10;
            $("#txtDateRange").daterangepicker();
            dateRange = $("#txtDateRange").val();
            if(accessRole == "SUPER_USER" | accessRole == "ACCOUNTS" | accessRole == "ACCOUNTS_MANAGER")
            {
                $('#btnCancelInvoice,#btnEdit').addClass("enable-icn");
                
            }
            else
                $('#btnCancelInvoice').attr("class", "disable-icn");

            $("#btnDownload,#btnView,#btnCreate,#btnPayment").attr("class", "enable-icn");
            $("#btndelete").attr("class", "disable-icn");
            bindProducts();
            bindInvoiceStatuses();
            invoiceSearchData.PageNumber = globalPageNumber;
            invoiceSearchData.Limit = globalPageSize;
           

            getInvoices(false);
            globalFunction = function () {
                //invoiceSearchData.PageNumber = globalPageNumber;
                //invoiceSearchData.Limit = globalPageSize;
                AddSearchData();
                getInvoices(false);
            };

            

            ordersClient.GetStates(true, function (res) {
                if (res.Success == true) {
                    var states = "";
                    if (res.States.length > 0) {
                        states = "<option value=0>Select</option>";
                        for (var i = 0; i < res.States.length; i++) {
                            states += "<option value='" + res.States[i].Id + "' >" + res.States[i].State + "</option>";
                        }
                        $("#stateEdit").html(states);
                        //$("#state option[value='" + $("#hdnStateId").val() + "']").prop('selected', true);
                    }
                }
            })

            

            $("#btnAddNewQuotation,#btncreate").click(function () {
                $("#createQuotation").modal("show");
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
                if ($(this).attr("status") == 2) {
                    $("#btnPayment").attr("class", "disable-icn");
                }
                else {
                    $("#btnPayment").attr("class", "enable-icn");
                }
            });
            // View Invoice
            $("#btnView").click(function () {
                var quotationId = $('.check_tool.Checked').attr("QuotationId");
                var invoiceId = $('.check_tool.Checked').attr("InvoiceId");
                var billMode = $('.check_tool.Checked').attr("BillMode");
                var employeeId =$('.check_tool.Checked').attr("EmployeeId");
                if(quotationId){
                    var $form = $("<form/>").attr("id", "data_form")
                                            .attr("action", "Invoice.aspx")
                                            .attr("target","_blank")
                                            .attr("method", "post");
                    $("body").append($form);
                    AddParameter($form, "QuotationId", quotationId);
                    AddParameter($form, "InvoiceId", invoiceId);
                    AddParameter($form, "BillMode", billMode);
                    AddParameter($form, "EmployeeId", employeeId);
                    $form[0].submit();
                }
                else
                {
                    alert("Select an Invoice to view!");
                    return ;
                }
            });
            //Edit Invoice
            $("#btnEdit").click(function () {
                var quotationId = $('.check_tool.Checked').attr("QuotationId");
                var invoiceId = $('.check_tool.Checked').attr("InvoiceId");
                var billMode = $('.check_tool.Checked').attr("BillMode");
                clearEditInvoiceDetails();
                $('#InvoiceNumber').text($('.check_tool.Checked').attr("InvoiceNo"));
                
                if(quotationId){
                    //getProductRelatedUserInformation(productId, accountUrl, $("#txtUserMobile").val(), 0, 0, quotationType);
                    ordersClient.getInvoiceAccountDetails(invoiceId, function (res) {
                        if(res.Success==true){
                            $('#txtCompanyNameEdit').val(res.InvoiceAccountDetails.CompanyName);
                            $('#txtBusinessMailIDEdit').val(res.InvoiceAccountDetails.EmailID);
                            $('#txtMobileEdit').val(res.InvoiceAccountDetails.MobileNumber);
                            $('#txtGSTINEdit').val(res.InvoiceAccountDetails.GSTIN);
                            $('#txtContactAddressEdit').val(res.InvoiceAccountDetails.Address);
                            $("#stateEdit option[value='" + res.InvoiceAccountDetails.StateId + "']").prop('selected', true);
                            $("#btnUpdateEdit").attr('invoiceId',invoiceId);
                            $('#editInvoice').modal('show');
                        }
                        else
                        {
                            ErrorNotifier(res.Message);
                        }
                    });
                    
                }
                else
                {
                    alert("Select an Invoice to edit!");
                    return ;
                }
            });

            $("#btnUpdateEdit").click(function (res) {
                var invoiceId=$(this).attr('invoiceId');
                var userDetails = {};
        
                $(".updateValues").each(function () {
                    console.log($(this));
                    if ($(this)[0].nodeName == "SELECT" || $(this)[0].nodeName == "TEXTAREA") {
              
                        userDetails[$(this).attr("name")] = $(this)[0].value;
                    }
                    else
                    {
                        userDetails[$(this).attr("name")] = $(this).val();

                    }
              
                });
                userDetails["InvoiceId"] = invoiceId;
                
                ordersClient.UpdateInvoice(userDetails, function (res) {
                    if (res.Success == true) {
                        alert("Invoice Updated Successfully.");
                        window.location.reload();

                    }
                });
            });
            // Download Invoice
            $("#btnDownload").click(function () {
                var quotationId = $('.check_tool.Checked').attr("QuotationId");
                var isPostPaidInvoice = ( $('.check_tool.Checked').attr("BillMode") == "2" ? true : false );
                if(quotationId){
                    ordersClient.DownloadInvoice(quotationId, isPostPaidInvoice, function (res) {
                        var a = document.createElement('a');
                        a.href = webUrl + res.FilePath;
                        a.download = webUrl + res.FilePath;
                        document.body.appendChild(a);
                        a.click();
                    });
                }
                else{
                    alert("Select an Invoice to Download!");
                    return ;
                }
            });
            // Search Invoices
            $("#btnSearch").click(function () {
                //invoiceSearchData.ProductId = $("#ddlProduct").val();
                //invoiceSearchData.QuotationNumber = $("#txtSearchById").val();
                //invoiceSearchData.BillingModeId = $("#ddlBillingMode").val();
               // invoiceSearchData.PageNumber = globalPageNumber;
                //invoiceSearchData.Mobile = $("#txtMobile").val();
                //invoiceSearchData.Email = $("#txtEmail").val();
                //invoiceSearchData.Limit = globalPageSize;
                //invoiceSearchData.StatusId = $("#ddlInvoiceStatus").val();
                //invoiceSearchData.AccountName = $("#txtAccountName").val();
                globalPageNumber=1;
                AddSearchData();
                getInvoices(false);
            });

            //download searched invoices
            $('#btn_download').click(function () {
                AddSearchData();                
                getInvoices(true);
            })

            //cancel Invoice
            $('#btnCancelInvoice').click(function () {
                var adminId
                adminId =<%=Session["AdminId"].ToString()%>;
                var quotationId = $('.check_tool.Checked').attr("QuotationId");
                var status =$('.check_tool.Checked').attr("Status");
                var invoiceNo=$('.check_tool.Checked').attr("InvoiceNo");

                if(status==4)
                {alert('The Invoice "'+invoiceNo+'" is already cancelled');
                return false;
                }
                if(quotationId){
                    ordersClient.CancelInvoice(quotationId,adminId, function (res) {
                        alert('The Invoice "'+invoiceNo+'" is cancelled');
                        
                    });
                    getInvoices(false);}
                else
                    alert('Select an Invoice to Cancel!');
            })

            function AddSearchData() {
                invoiceSearchData.ProductId = $("#ddlProduct").val();
                invoiceSearchData.QuotationNumber = $("#txtSearchById").val();
                invoiceSearchData.BillingModeId = $("#ddlBillingMode").val();
                invoiceSearchData.Mobile = $("#txtMobile").val();
                invoiceSearchData.Email = $("#txtEmail").val();
                invoiceSearchData.StatusId = $("#ddlInvoiceStatus").val();
                invoiceSearchData.AccountName = $("#txtAccountName").val();
                invoiceSearchData.PageNumber = globalPageNumber;
                invoiceSearchData.Limit = $("#dropPages :selected").val();
                dateRange = $("#txtDateRange").val();
            }

            function bindProducts() {
                var productsData = "<option value='0'>--- All ---</option>";
                ordersClient.GetProducts(true, function (res) {

                    if (res.Success == true) {
                        if (res.Products.length > 0) {

                            for (var i = 0; i < res.Products.length; i++) {
                                productsData += "<option value='" + res.Products[i].Id + "'>" + res.Products[i].Name + "</option>"
                            }
                        }

                    }
                    else {
                        ErrorNotifier(res.Message);
                    }
                    $("#ddlProduct").html(productsData);
                });

            }

            function clearEditInvoiceDetails(){
                $('#txtCompanyNameEdit').val('');
                $('#txtBusinessMailIDEdit').val('');
                $('#txtMobileEdit').val('');
                $('#txtGSTINEdit').val('');
                $('#txtContactAddressEdit').val('');
                $("#stateEdit option[value='" + 0 + "']").prop('selected', true);
                $("#btnUpdateEdit").attr('invoiceId','');
                $('#InvoiceNumber').text('');
            }

            function bindInvoiceStatuses() {
                var invoiceStatusesData = "<option value='0'>--- All ---</option>";
                ordersClient.GetInvoiceStatuses(true, function (res) {

                    if (res.Success == true) {
                        if (res.InvoiceStatuses.length > 0) {

                            for (var i = 0; i < res.InvoiceStatuses.length; i++) {
                                invoiceStatusesData += "<option value='" + res.InvoiceStatuses[i].Id + "'>" + res.InvoiceStatuses[i].Status + "</option>"
                            }
                        }

                    }
                    else {
                        ErrorNotifier(res.Message);
                    }
                    $("#ddlInvoiceStatus").html(invoiceStatusesData);
                });

            }
            
            function getInvoices(isdownload) {
                if (dateRange == "This Month") {
                    var date = new Date();
                    var from = new Date(date.getFullYear(), date.getMonth(), 1);
                    from.setMinutes(from.getMinutes() - from.getTimezoneOffset());

                    var to = new Date(date.getFullYear(), date.getMonth() + 1, 1);
                    to.setMinutes(to.getMinutes() + to.getTimezoneOffset());

                    invoiceSearchData.FromDateTime = from;
                    invoiceSearchData.ToDateTime = to;
                }
                else {
                    var fromDateT0date = dateRange.split("-");
                    invoiceSearchData.FromDateTime = fromDateT0date[0];
                    invoiceSearchData.ToDateTime = fromDateT0date[1];
                }
                invoiceSearchData.isdownload = isdownload;
                ordersClient.GetInvoices(invoiceSearchData, function (res) {
                    if (res.Success == true) {
                        if (res.Invoices.length > 0) {
                            var invoicesData = renderInvoices(res.Invoices);
                            pagination(res.Count, globalPageSize);
                            $("#data").html(invoicesData);
                        }
                        else {
                            $("#data").html("<tr ><td align='center' colspan='14'> No records Found</td></tr>");
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
                    invoicesData += "<tr><td><input type='checkbox' InvoiceId='" + Invoices[i].InvoiceId + "'  QuotationId='" + Invoices[i].QuotationId + "' status='" + Invoices[i].StatusId + "' class='check_tool' value='" + Invoices[i]["QuotationId"] + "' InvoiceNo='"+Invoices[i].InvoiceNumber+"' AccountName='"+Invoices[i].AccountName+"' AccountGSTIN='"+Invoices[i].GSTIN+"' AccountMobile='"+Invoices[i].Mobile+"' AccountEmail='"+Invoices[i].Email+"' AccountId='" + Invoices[i]["AccountId"] + "' BillMode = '" + Invoices[i]["BillingModeId"] + "'  EmployeeId='"+Invoices[i].EmployeeId+"'  /></td>";
                    invoicesData += "<td>" + Invoices[i].ProductName + "</td>";
                    invoicesData += "<td><a class='nameHypClass' id='" + Invoices[i].AccountId + "'>" + Invoices[i].AccountName + "</a></td>";
                    invoicesData += "<td>" + Invoices[i].CompanyName + "</td>";
                    invoicesData += "<td>" + Invoices[i].OwnerShipName + "</td>";
                    invoicesData += "<td>" + Invoices[i].Mobile + "</td>";
                    invoicesData += "<td class='font-blue-soft'>" + Invoices[i].Email + "</td>";
                    invoicesData += "<td>" + Invoices[i].Country + "</td>";
                    invoicesData += "<td>" + Invoices[i].QuotationCreatedTime + "</td>";
                    invoicesData += "<td>" + Invoices[i].InvoiceGeneratedTime + "</td>";
                    invoicesData += "<td class='alert-warning'>" + Invoices[i].QuotationNumber + "</td>";
                    invoicesData += "<td class='alert-warning'>" + Invoices[i].InvoiceNumber + "</td>";
                    var amount = parseFloat(Invoices[i].TotalAmount);
                    var currencyName = Invoices[i].Currency;
                    var taxMessage = "Order Amount: "+parseFloat(Invoices[i].OrderAmount)+" TAX: "+Invoices[i].TaxDetails;
                    invoicesData += "<td><a href='javascript:;' class='font-grey-gallery'><label class='bold' data-toggle='tooltip' title='" + taxMessage + "'>" + amount + " " + currencyName + "</label></a></td>";
                    //Invoices += "<td><span class='label label-sm label-warning'>" + Invoices[i].Status + "</span></td></tr>";
                    if (Invoices[i].Status == "Cancelled") {
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

            //function pagination(totalCount, globalPageSize) {

            //    $('#page-selection').bootpag({
            //        total: Math.ceil(totalCount / globalPageSize),
            //        maxVisible: 6,
            //        next: 'Next',
            //        prev: 'Prev'

            //    }).on("page", function (event, num) {

            //        if (globalPageNumber != num) {
            //            globalPageNumber = num;
            //            globalPageSize = $("#dropPages").val();
            //            //getInvoices();
            //        }
            //    });

            //}
        });
    </script>
</asp:Content>
