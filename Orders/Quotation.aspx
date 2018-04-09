<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeFile="Quotation.aspx.cs" Inherits="Orders.Quotation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <input type="hidden" id="hdnQuotationId" value="<%= quotationId %>" />
    <input type="hidden" id="hdnIsPostPaid" value="<%= isPostPaid %>" />
    <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />
    <header>

        <div class="page-content-wrapper">
            <div class="page-content">
                <div class="row" id="QuotaionData">
                </div>
                <div class="row text-center margin-bottom-20">
                    <input type="button" value="Back" id="btnBack" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #3a6a77 !important; background-color: #447583; border: 1px solid transparent;" />
                    <input type="button" value="DownLoad" id="btnDownload" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #79af2d !important; background-color: #8dc73f; border: 1px solid transparent;" />
                    <input type="button" value="Generate Invoice" id="btnGenerateInvoice" class="btn btn-lg green" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #2db5bf !important;" />
                    <input type="button" value="Email To Client" id="btnSendAnEmailToClient" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #f15048 !important; background-color: #fe6555; border: 1px solid transparent;" email="" quotationid="" billmode="" isbillgenerated="" />
                    <input type="button" value="Edit" id="btnEditQuotation" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #f15048 !important; background-color: #fe6555; border: 1px solid transparent;" />
                </div>
            </div>

        </div>



    </header>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="Scripts/OrdersClient.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var quotationId = $("#hdnQuotationId").val();
            var ordersClient = new OrdersClient();
            var webUrl = $("#hdnWebUrl").val();
            var isPostPaid = $("#hdnIsPostPaid").val();
            ordersClient.ViewQuotation(quotationId, isPostPaid, function (res) {
                $("#QuotaionData").html(res);
            });

            $("#btnDownload").click(function () {
                ordersClient.DownloadQuotation(quotationId, false, function (res) {
                    console.log(res);
                    var a = document.createElement('a');
                    a.href = webUrl + res.FilePath;
                    a.download = webUrl + res.FilePath;
                    document.body.appendChild(a);
                    a.click();
                });
            });

            $("#btnGenerateInvoice").click(function () {
                var billingModeId = 1;
                if (isPostPaid == "True") {
                    billingModeId = 2;
                }
                ordersClient.CreateInvoice(quotationId, billingModeId, 1, function (res) {
                    if (res.Success == true) {
                        console.log(res);
                        SuccessNotifier(res.Message);
                        var $form = $("<form/>").attr("id", "data_form")
                                       .attr("action", "Invoice.aspx")
                                       .attr("method", "post");
                        $("body").append($form);
                        AddParameter($form, "QuotationId", quotationId);
                        AddParameter($form, "InvoiceId", res.InvoiceId);
                        $form[0].submit();

                    } else {
                        ErrorNotifier(res.Message);
                    }
                });
            });

            $("#btnBack").click(function () {
                window.location.href = "/Quotations.aspx";
            });

            $("#btnEditQuotation").click(function () {
                var quotationId = $("#hdnQuotationId").val()
                var isBillMode = 1;
                var productId = 1;
                var mobileNo = "9640986555";
                getProductRelatedUserInformation(productId, mobileNo, quotationId, isBillMode);
                return false;

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

        });
    </script>
</asp:Content>
