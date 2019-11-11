var ordersClient = new OrdersClient();
$(document).ready(function () {
    bindProducts();
   
})
$("#btnAddNewQuotation,#btncreate").click(function () {
    $("#createQuotation").modal("show");
});

$("#ddlProducts").change(function () {
    var IsShowInvoiceTypes = $("#ddlProducts option:selected").attr("istestinvoiceavailable");
    if (IsShowInvoiceTypes == "true") {
        $('#ddlQuotationTypes').prop('selectedIndex', 0);
        $('#ddlQuotationTypes').attr("disabled", false);
    }
    else if (IsShowInvoiceTypes == "false")
    {

        $('#ddlQuotationTypes').prop('selectedIndex', 1);
        $('#ddlQuotationTypes').attr("disabled", true);
    }
});
$("#btnSubmit").click(function () {
    var productId = $("#ddlProducts option:selected").val();
    var accountUrl = $("#ddlProducts option:selected").attr("accountUrl");
    var quotationType = $("#ddlQuotationTypes option:selected").val();
    if (quotationType == "" || quotationType == "0")
    {
        alert("Please select quotation type");
        return true;
    }
    getProductRelatedUserInformation(productId, accountUrl, $("#txtUserMobile").val(), 0, 0, quotationType);

});

function getProductRelatedUserInformation(productId, accountUrl, mobileNo, quotationId, billMode, quotationType) {

    ordersClient.GetProductWiseAccountRelatedInformation(productId, accountUrl, mobileNo, function (res) {
        if (res.Success == true) {

            var accountId = res.UserDetails.AccountId;
            if (accountId == 0) {
                accountId = res.AccountId;
            }
            var QotationReqType = 1;
            billMode = res.UserDetails.BillingModeId;
            var $form = $("<form/>").attr("id", "data_form")
                            .attr("action", "CreateQuotation.aspx")
                            .attr("method", "post");
            $("body").append($form);
            //Append the values to be send
            //AddParameter($form, "QotationReqType", QotationReqType);

            AddParameter($form, "ID", accountId);
            AddParameter($form, "productId", productId);
            AddParameter($form, "AccountproductId", res.UserDetails.ProductAccountId);
            AddParameter($form, "address", res.UserDetails.Address);
            AddParameter($form, "state", res.UserDetails.StateId);
            AddParameter($form, "contactName", res.UserDetails.NickName);
            AddParameter($form, "company", res.UserDetails.Company);
            
            AddParameter($form, "registeredDate", res.UserDetails.RegisteredDate);
            AddParameter($form, "email", res.UserDetails.EmailID);
            AddParameter($form, "mobile", res.UserDetails.MobileNumber);
            AddParameter($form, "gstin", res.UserDetails.GSTIN);
            if (typeof res.UserDetails.Country === 'undefined' || res.UserDetails.Country == "") {
                AddParameter($form, "country", res.UserDetails.CountryId);
            }
            else if (typeof res.UserDetails.CountryId === 'undefined' || res.UserDetails.CountryId == "")
            {
                AddParameter($form, "country", res.UserDetails.Country);
            }
            AddParameter($form, "isFirstTime", res.IsFirstTime);
            AddParameter($form, "BillMode", billMode);
            AddParameter($form, "QuotationId", quotationId);
            AddParameter($form, "QuotationType", quotationType);
            AddParameter($form, "AccountTypeId", res.UserDetails.AccountTypeId);
            AddParameter($form, "AccountOwner", res.UserDetails.OwnerShip);
            $form[0].submit();

        }
    });
}

function bindProducts() {
    var productsData = "<option value='0'>--- All ---</option>";
    var quotationTypesData = "<option value='0'>Select One</option>";
    ordersClient.GetProducts(true, function (res) {

        if (res.Success == true) {
            if (res.Products.length > 0) {

                for (var i = 0; i < res.Products.length; i++) {
                    productsData += "<option value='" + res.Products[i].Id + "' accountUrl='" + res.Products[i].AccountInformationUrl + "' isTestInvoiceAvailable='" + res.Products[i].IsTestInvoicesAvailable + "'>" + res.Products[i].Name + "</option>"
                }
            }
            if (res.QuotationTypes.length > 0) {

                for (var i = 0; i < res.QuotationTypes.length; i++) {
                    quotationTypesData += "<option value='" + res.QuotationTypes[i].Id + "' >" + res.QuotationTypes[i].Type + "</option>"
                }
            }
            else if (typeof (res.QuotationTypes.length)== "undefined") {
                quotationTypesData += "<option value='" + res.QuotationTypes.Id + "' >" + res.QuotationTypes.Type + "</option>"
            }
        }
        else {
            ErrorNotifier(res.Message);
        }
        $("#ddlProduct,#ddlProducts").html(productsData);
        $("#ddlQuotationTypes").html(quotationTypesData);
    });

}


function AddParameter(form, name, value) {
    var $input = $("<input />").attr("type", "hidden")
                            .attr("name", name)
                                .attr("value", value);
    form.append($input);
}

function UpdateUserDetails(registeredDate, company, productAccountName, mobile, GSTIN, countryId, stateId, emailId, address, ownerShipId, planId, productAccountId, ProductId, AccountId) {
    $.ajax({
        url: this.options.accountHandler,
        async: false,
        dataType: "JSON",
        traditional: true,
        data:
            {
                action: "UpdateAccountDetails",
                registeredDate: registeredDate,
                company: company,
                productAccountName: productAccountName,
                mobileNumber: mobile,
                GSTIN: GSTIN,
                countryId: countryId,
                stateId: stateId,
                emailId: emailId,
                address: address,
                ownerShipId: ownerShipId,
                planId: planId,
                productAccountId: productAccountId,
                productId: ProductId,
                accountId: AccountId
            },
        success: function (response) {
            actionResponse = response;
            if (CanCallBack(callBackFunction))
                callBackFunction(actionResponse);
        },
        error: function (response) {
            failedActionResponse.Response = response;
            failedActionResponse.Message = response.responseJSON.Message;
            actionResponse = failedActionResponse;
            if (CanCallBack(callBackFunction))
                callBackFunction(actionResponse);
        }
    })
}
