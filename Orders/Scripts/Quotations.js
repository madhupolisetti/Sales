var TPPV = 0.0;
var PPPV = 0.0;
var PPPS = 0.0;
var TPPS = 0.0;
var isEmailGenerated = false;
function ViewQuotation(quotationId, isPostPaidQuotation) {
    var quotationData = "";
    var Email = "";
    var ordersClient = new OrdersClient();
    ordersClient.GetQuotationDetails(quotationId, false, function (res) {
        if(res.Success == true)
        {
            quotationData += "<div class='col-md-12'><div class='body-wrapper'><div class='top-header'>";
            quotationData += "<div class='col-md-2 col-sm-2 col-xs-12'>";
            quotationData += "<img src='/images/TelebuLogo.png' class='img-responsive' width='125' style='padding-top:12px;'></div>";
            quotationData += "<div class='col-md-4 col-sm-5 col-xs-12'><h2 style='margin:5px 0px 10px; font-size:1.1em'>";
            quotationData += "<b>SISRB TECHNOLOGIES PVT LTD</b></h2><p>Ektha towers, white fields,</p><p>kondapur, Hyderabad, Telangana, 500082.</p>";
            quotationData += "<p style='color: #08aeea;'>Hello@smscountry.com</p><p style='color: #08aeea;'>040-21265458</p>";
            if (res.QuotationDetails[0].CountryId == 108) {
                quotationData += "<p>GSTIN:36AAHCS9759A1Z2</p><p>State:Telangana</p><p>State Code:36</p><p>Pan No:AAHCS9759A</p>";
            }
            quotationData += "</div>";
            quotationData += "<div class='col-md-6 col-sm-5 col-xs-12'><div class='right-col'>";
            quotationData += "<h1>Quotation: <label>#" + res.QuotationDetails[0].QuotationNumber + "</label></h1>";
            quotationData += "<p><label  style=' width: 100%;'>Issued On: <span>" + res.QuotationDetails[0].CreatedTime + "</span></label>";
            quotationData += "</p></div></div></div><div class='top-header'><div class='col-md-2 col-sm-2 col-xs-12'>";
            quotationData += "<img  height='125' src='/images/ClientLogo.png' style='padding-top:12px;'></div>";
            quotationData += "<div class='col-md-4 col-sm-5 col-xs-12'><h2 style='margin-top:25px; font-size:1.1em'>";
            if (res.QuotationDetails[0].FullName == "") {
                quotationData += "<b>" + res.QuotationDetails[0].ContactName + "</b>";
            } else {
                quotationData += "<b>" + res.QuotationDetails[0].FullName + "</b>";

            }
            quotationData += "</h2><p>" + res.QuotationDetails[0].Company + "</p>";
            quotationData += "<p style='width:64%;'>" + res.QuotationDetails[0].ContactAddress + "</p>";
            quotationData += "<p style='color: #08aeea;'>" + res.QuotationDetails[0].BusinessMailId + "</p>";
            Email = res.QuotationDetails[0].BusinessMailId;
            $("#btnSendAnEmailToClient").attr("email", Email);
            quotationData += "<p style='color: #08aeea;'>" + res.QuotationDetails[0].Mobile + "</p>";
            quotationData += "</div>";
            quotationData += "<div class='col-md-6 col-sm-5 col-xs-12'>";

            quotationData += "</p></div></div>";
            quotationData += "<div class='col-md-12 col-sm-12' style=' padding:10px 15px 10px;'>";
            quotationData += "<h1>Billing Address</h1><p>YGOY INC, 310 GreenFields Road Bridge Water, Bridge Water, NJ 08807, US</p>";
            quotationData += "</div></div><div class='top-header'><div class='col-md-12'><div class='table-cont table-responsive'>";
            quotationData += MetadataProcessing(res.QuotationDetails[0].Metadata, billMode, isBillGenerated, res.ServiceProperties);
            quotationData += "</div></div></div>";
            quotationData += "<div class='top-header' ><div class='col-md-6 col-sm-6 col-xs-12 hidden-lg hidden-md hidden-sm'>";
            quotationData += "<div class='right-col'><p><label style=' width: 100%;'>Sub - Total amount : ";
            quotationData += "<span>" + res.QuotationDetails[0].Amount + "</span></label>";
            quotationData += "<label  style=' width: 100%;'> CGST : <span>" + res.QuotationDetails[0].Vat + "</span></label>";
            quotationData += "<label  style=' width: 100%;'> SGST : <span>" + res.QuotationDetails[0].Sbc + "</span></label>";
            quotationData += "<label  style=' width: 100%;'> IGST : <span>" + res.QuotationDetails[0].KrishiKalyanTax + "</span></label>";
            quotationData += "<label> Grand Total : <span>" + res.QuotationDetails[0].Amount + "</span></label></p></div></div>";
            quotationData += "<div class='col-md-6 col-sm-6 col-xs-12'><h1>Account Manager Details</h1>";
            quotationData += "<p><label  style=' width: 100%;'>Name : <span>" + res.QuotationDetails[0].AccountManagerName + "</span></label>";
            quotationData += "<label  style=' width: 100%;'> Number : <span>" + res.QuotationDetails[0].AccountManagerMobile + "</span></label>";
            quotationData += "<label  style=' width: 100%;'>Email : <span>" + res.QuotationDetails[0].AccountManagerEmail + "</span></label> </p></div>";
            quotationData += "<div class='col-md-6 col-sm-6 col-xs-12 hidden-xs'><div class='right-col'>";
            var CurrencyName = res.QuotationDetails[0].CurrencyName;
            quotationData += "<p><label style=' width: 100%;'>Sub - Total amount : <span>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</span></label>";

            if (res.QuotationDetails[0].CountryId == 108) {
                quotationData += "<label  style=' width: 100%;'> CGST : <span>" + res.QuotationDetails[0].CGST + '(' + CurrencyName + ')' + "</span></label>";
                quotationData += "<label  style=' width: 100%;'> SGST : <span>" + res.QuotationDetails[0].SGST + '(' + CurrencyName + ')' + "</span></label>";
                quotationData += "<label  style=' width: 100%;'> IGST : <span>" + res.QuotationDetails[0].IGST + '(' + CurrencyName + ')' + "</span></label>";
                quotationData += "<label> Grand Total : <span>" + (parseFloat(res.QuotationDetails[0].Amount) + parseFloat(res.QuotationDetails[0].Tax)) + '(' + CurrencyName + ')' + "</span></label></p>";

                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td width='500px'> <span><b>Kotak Mahindra Bank Ltd</b></span></td><td><span>	<b>ICICI Bank Ltd</b></span></td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Current Account No:</b></td><td width='500px'>  <span>05522000002309</span></td><td><span>004005017615</span></label></td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Name :</b></td><td width='500px'>  <span>Somajiguda Branch (Hyderabad, India)</span></td><td> <span>Madhapur Branch (Hyderabad, India)</span></label></td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Address:</b></td><td width='500px'>  <span>6-3-110-9/1, Block A, Jewel Pavani Towers,<br/> Somajiguda, Hyderabad, India -500082</span></td><td><span>ICICI Bank Ltd, Stone Ridge Center, Opp: Google,<br/>Main Road, Kondapur, Hyderabad – 500033, Telangana, India</span></label></td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>IFSC CODE :</b> </td><td width='500px'> <span>KKBK0000552</span></td><td><span>ICIC0000040</span></label></td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Name : </b></td><td width='500px'>SISRB TECHNOLOGIES PVT LTD</td><td>	SISRB TECHNOLOGIES PVT LTD</td></table>";

            }
            else if (res.QuotationDetails[0].CountryId == 241) {
                quotationData += "<label> Grand Total : <span>" + (res.QuotationDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";

                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'>";
                quotationData += " <tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>Bank OF AMERICA</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Current Account No:</b></td><td>381028090258</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Name :</b></td><td>South Plainfield Bank</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Ultimate Beneficiary :</b> </td><td>YGOY INC</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>YGOY address :</b> </td><td>310 Greenfield road,Bridge water, NJ 08807, US</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>For Direct Deposit And Automatic :</b> </td><td>021200339 (paper & electronic)</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number  :</b> </td><td>026009593</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift Code :</b> </td><td>BOFAUS3N</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Name : </b></td></tr></table>";

            }
            else if (res.QuotationDetails[0].CountryId == 105) {
                quotationData += "<label> Grand Total : <span>" + (res.QuotationDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>HSBC Bank</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>400-477170-838</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Code :</b></td><td>400</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Drawn in favour of : </b></td><td>SMSCountry Networks (HK) Ltd.</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Bank Code: Swift code</b> </td><td>HSBCHKHHHKH</td></tr></table>";

            }
            else if (res.QuotationDetails[0].CountryId == 239) {
                quotationData += "<label> Grand Total : <span>" + (res.QuotationDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>RAK Bank</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>0332014346001</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Addres:</b></td><td>1531, UMM Hurair Branch, Dubai, UAE.</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift code :</b> </td><td>NRAKAEAK</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> IBAN NO :</b></td><td>AE530400000332014346001</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Title : </b></td><td>SMS Country Network LLC.</td></tr></table>";

            }
            else if (res.QuotationDetails[0].CountryId == 19) {
                quotationData += "<label> Grand Total : <span>" + (res.QuotationDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>BBK</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>100000355338</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Branch Name:</b></td><td>BBK Bank,Qudhaibiya,Bahrain</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Addres:</b></td><td>43 Government Avenue, P.O Box:597,Manama,Kingdom of Bahrain</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift code :</b> </td><td>BBKUBHBM</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> IBAN NO :</b></td><td>BH78BBKU00100000355338</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Title : </b></td><td>SMS Country Networks Co. W.L.L</td></tr></table>";

            }
            else if (res.QuotationDetails[0].CountryId == 199) {
                quotationData += "<label> Grand Total : <span>" + (res.QuotationDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>National Commercial Bank</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>08665479000100</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Branch Name:</b></td><td>Saihat-086</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Addres:</b></td><td>Gulf Road, Saihat, KSA</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift code :</b> </td><td>NCBKSAJE</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> IBAN NO :</b></td><td>SA7610000008665479000100</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Title : </b></td><td>Muassasat Balad Alrrasayil Alttijaria</td></tr></table>";

            }
            else {

                quotationData += "<label> Grand Total : <span>" + (res.QuotationDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";

                quotationData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                quotationData += "</div>";
                quotationData += "<div align='center' width='100%'>";
                quotationData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                quotationData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'>";
                quotationData += " <tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>Bank OF AMERICA</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Current Account No:</b></td><td>381028090258</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Name :</b></td><td>South Plainfield Bank</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Ultimate Beneficiary :</b> </td><td>YGOY INC</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>YGOY address :</b> </td><td>310 Greenfield road,Bridge water, NJ 08807, US</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>For Direct Deposit And Automatic :</b> </td><td>021200339 (paper & electronic)</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number  :</b> </td><td>026009593</td></tr>";
                quotationData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift Code :</b> </td><td>BOFAUS3N</td></tr>";
                quotationData += "</table>";
            }

            quotationData += "</div>";
            quotationData += "</div></div>";
            quotationData += "<p style=' color:#000; font-size: 15px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note: Validity 6 Months only.</p>";
            quotationData += "</div>";
            quotationData += "";
        }
    });

    $.ajax({
        url: "/AjaxHandlers/Invoices.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            type: 5,
            QuotationId: quotationId,
            BillMode: billMode,
            IsBillGenerated: isBillGenerated
        },
        success: function (res) {

            if (res.Success == "True") {
                
                


            }
            else {
                if (res.Message == "Session Expired") {
                    window.location.href = "LoginWithGoogle.aspx";
                }
            }
        },
        error: function (res) {
            ErrorNotifier(res.Message);
        }
    });
    return quotationData;
    //region

}

function ViewInvoice(invoiceId, billMode, isBillGenerated) {
    var invoiceData = "";
    var Email = "";
    $("#btnSendAnEmailToClient").attr("isBillGenerated", isBillGenerated);
    $.ajax({
        url: "/AjaxHandlers/Invoices.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            type: 3,
            InvoiceId: invoiceId,
            BillMode: billMode,
            IsBillGenerated: isBillGenerated
        },
        success: function (res) {

            if (res.Success == "True") {

                invoiceData += "<div class='col-md-12'><div class='body-wrapper'><div class='top-header'>";
                invoiceData += "<div class='col-md-2 col-sm-2 col-xs-12'>";
                invoiceData += "<img src='/Images/TelebuLogo.png' class='img-responsive' width='125' style='padding-top:12px;'></div>";
                invoiceData += "<div class='col-md-4 col-sm-5 col-xs-12'><h2 style='margin:5px 0px 10px; font-size:1.1em'>";
                invoiceData += "<b>SISRB TECHNOLOGIES PVT LTD</b></h2><p>Ektha towers, white fields,</p><p>kondapur, Hyderabad, Telangana, 500082.</p>";
                invoiceData += "<p style='color: #08aeea;'>Hello@smscountry.com</p><p style='color: #08aeea;'>040-21265458</p>";
                if (res.InvoiceDetails[0].CountryId == 108) {
                    invoiceData += "<p>GSTIN:36AAHCS9759A1Z2</p><p>State:Telangana</p><p>State Code:36</p><p>Pan No:AAHCS9759A</p>";
                }
                invoiceData += "</div>";
                invoiceData += "<div class='col-md-6 col-sm-5 col-xs-12'><div class='right-col'>";
                invoiceData += "<h1>Invoice <label>#" + res.InvoiceDetails[0].InvoiceNumber + "</label></h1>";
                invoiceData += "<p><label  style=' width: 100%;'>Issued On: <span>" + res.InvoiceDetails[0].CreatedTime + "</span></label>";
                //invoiceData += "<label  style=' width: 100%;'>Payment Due : <span>June 27, 2015</span></label>";
                invoiceData += "</p></div></div></div><div class='top-header'><div class='col-md-2 col-sm-2 col-xs-12'>";
                invoiceData += "<img src='/Images/ClientLogo.png' height='125' style='padding-top:5px;'></div>";
                invoiceData += "<div class='col-md-4 col-sm-5 col-xs-12'><h2 style='margin-top:25px; font-size:1.1em'>";
                // if (res.InvoiceDetails[0].FullName == "") {
                invoiceData += "<b>" + res.InvoiceDetails[0].ContactName + "</b>";
                //} else {
                //     invoiceData += "<b>" + res.InvoiceDetails[0].FullName + "</b>";
                // }
                invoiceData += "</h2><p>" + res.InvoiceDetails[0].Company + "</p>";
                invoiceData += "<p style='width:64%; word-wrap: break-word;'>" + res.InvoiceDetails[0].ContactAddress + "</p>";
                invoiceData += "<p style='color: #08aeea;'>" + res.InvoiceDetails[0].BusinessMailId + "</p>";
                Email = res.InvoiceDetails[0].BusinessMailId;
                $("#btnSendAnEmailToClient").attr("email", Email);
                invoiceData += "<p style='color: #08aeea;'>" + res.InvoiceDetails[0].Mobile + "</p>";
                //invoiceData += "<p><label  style=' width: 100%;'>PAN Number : <span>" + res.InvoiceDetails[0].PAN + "</span>";
                //invoiceData += "</label><label  style=' width: 100%;'> GSTIN : ";
                //invoiceData += "<span>AYJP1234B </span></label> <br></p>";
                invoiceData += "</div>";
                invoiceData += "<div class='col-md-6 col-sm-5 col-xs-12'>";

                //var dataArray = jQuery.parseJSON(res.InvoiceDetails[0].Metadata);
                //for (var balanceData in dataArray) {
                //    var name = balanceData;
                //    var balProperties = dataArray[balanceData];
                //    if (name.toString().toLowerCase().trim() == "balance" || name.toString().toLowerCase().trim() == "rechargeamount") {
                //        if (balProperties.length > 0) {
                //            invoiceData += "<div class='right-col'><h1><label>Pricing Details : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h1><p>";
                //            for (var i = 0; i < balProperties.length; i++) {
                //                var dataArray = balProperties[i];
                //                for (var data in dataArray) {
                //                    var name1 = data;
                //                    var value = dataArray[data];
                //                    if (name1.toString().toLowerCase().trim() == "tpps" || name1.toString().toLowerCase().trim() == "transactionalprice/sms") {
                //                        if (value != "")
                //                            invoiceData += "<label  style=' width: 100%;'>Promotional Price Per SMS : <span>" + value + "</span></label>";
                //                    }
                //                    if (name1.toString().toLowerCase().trim() == "ppps" || name1.toString().toLowerCase().trim() == "promotionalprice/sms") {
                //                        if (value != "")
                //                            invoiceData += "<label  style=' width: 100%;'>Transactional Price Per SMS : <span>" + value + "</span></label>";
                //                    }
                //                    if (name1.toString().toLowerCase().trim() == "transactionalpulse/voice") {
                //                        if (value != "")
                //                            invoiceData += "<label  style=' width: 100%;'>Promotional Price Per Voice : <span>" + value + "</span></label>";
                //                    }
                //                    if (name1.toString().toLowerCase().trim() == "promotionalpulse/voice") {
                //                        if (value != "")
                //                            invoiceData += "<label  style=' width: 100%;'>Transactional Price Per Voice : <span>" + value + "</span></label>";
                //                    }
                //                }
                //            }
                //        }
                //    }
                //}

                invoiceData += "</p></div></div>";
                invoiceData += "<div class='col-md-12 col-sm-12' style=' padding:10px 15px 10px;'>";
                invoiceData += "<h1>Billing Address</h1><p>YGOY INC, 310 GreenFields Road Bridge Water, Bridge Water, NJ 08807, US</p>";
                invoiceData += "</div></div><div class='top-header'><div class='col-md-12'><div class='table-cont table-responsive'>";
                invoiceData += MetadataProcessing(res.InvoiceDetails[0].Metadata, billMode, isBillGenerated, res.ServiceProperties);
                invoiceData += "</div></div></div>";
                invoiceData += "<div class='top-header' ><div class='col-md-6 col-sm-6 col-xs-12 hidden-lg hidden-md hidden-sm'>";
                invoiceData += "<div class='right-col'><p><label style=' width: 100%;'>Sub - Total amount : ";
                invoiceData += "<span>" + res.InvoiceDetails[0].Amount + "</span></label>";
                invoiceData += "<label  style=' width: 100%;'> CGST : <span>" + res.InvoiceDetails[0].Vat + "</span></label>";
                invoiceData += "<label  style=' width: 100%;'> SGST : <span>" + res.InvoiceDetails[0].Sbc + "</span></label>";
                invoiceData += "<label  style=' width: 100%;'> IGST : <span>" + res.InvoiceDetails[0].KrishiKalyanTax + "</span></label>";
                invoiceData += "<label> Grand Total : <span>" + res.InvoiceDetails[0].Amount + "</span></label></p></div></div>";
                invoiceData += "<div class='col-md-6 col-sm-6 col-xs-12'><h1>Account Manager Details</h1>";
                invoiceData += "<p><label  style=' width: 100%;'>Name : <span>" + res.InvoiceDetails[0].AccountManagerName + "</span></label>";
                invoiceData += "<label  style=' width: 100%;'> Number : <span>" + res.InvoiceDetails[0].AccountManagerMobile + "</span></label>";
                invoiceData += "<label  style=' width: 100%;'>Email : <span>" + res.InvoiceDetails[0].AccountManagerEmail + "</span></label> </p></div>";
                invoiceData += "<div class='col-md-6 col-sm-6 col-xs-12 hidden-xs'><div class='right-col'>";
                var CurrencyName = res.InvoiceDetails[0].CurrencyName;
                invoiceData += "<p><label style=' width: 100%;'>Sub - Total amount : <span>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</span></label>";
                if (res.InvoiceDetails[0].CountryId == 108) {
                    invoiceData += "<label  style=' width: 100%;'> CGST : <span>" + res.InvoiceDetails[0].CGST + '(' + CurrencyName + ')' + "</span></label>";
                    invoiceData += "<label  style=' width: 100%;'> SGST : <span>" + res.InvoiceDetails[0].SGST + '(' + CurrencyName + ')' + "</span></label>";
                    invoiceData += "<label  style=' width: 100%;'> IGST : <span>" + res.InvoiceDetails[0].IGST + '(' + CurrencyName + ')' + "</span></label>";
                    invoiceData += "<label> Grand Total : <span>" + (parseFloat(res.InvoiceDetails[0].Amount) + parseFloat(res.InvoiceDetails[0].Tax)) + '(' + CurrencyName + ')' + "</span></label></p>";
                invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                invoiceData += "</div>";
                invoiceData += "<div align='center' width='100%'>";
                invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td width='500px'> <span><b>Kotak Mahindra Bank Ltd</b></span></td><td><span>	<b>ICICI Bank Ltd</b></span></td></tr>";
                invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Current Account No:</b></td><td width='500px'>  <span>05522000002309</span></td><td><span>004005017615</span></label></td></tr>";
                invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Name :</b></td><td width='500px'>  <span>Somajiguda Branch (Hyderabad, India)</span></td><td> <span>Madhapur Branch (Hyderabad, India)</span></label></td></tr>";
                invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Address:</b></td><td width='500px'>  <span>6-3-110-9/1, Block A, Jewel Pavani Towers,<br/> Somajiguda, Hyderabad, India -500082</span></td><td><span>ICICI Bank Ltd, Stone Ridge Center, Opp: Google,<br/>Main Road, Kondapur, Hyderabad – 500033, Telangana, India</span></label></td></tr>";
                invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>IFSC CODE :</b> </td><td width='500px'> <span>KKBK0000552</span></td><td><span>ICIC0000040</span></label></td></tr>";
                invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Name : </b></td><td width='500px'>SISRB TECHNOLOGIES PVT LTD</td><td>	SISRB TECHNOLOGIES PVT LTD</td></table>";
                invoiceData += "</div>";
                invoiceData += "</div></div>";
                }
                else if (res.InvoiceDetails[0].CountryId == 241) {
                    invoiceData += "<label> Grand Total : <span>" + (res.InvoiceDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                    invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                    invoiceData += "</div>";
                    invoiceData += "<div align='center' width='100%'>";
                    invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                    invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'>";
                    invoiceData += " <tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>Bank OF AMERICA</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Current Account No:</b></td><td>381028090258</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Name :</b></td><td>South Plainfield Bank</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Ultimate Beneficiary :</b> </td><td>YGOY INC</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>YGOY address :</b> </td><td>310 Greenfield road,Bridge water, NJ 08807, US</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>For Direct Deposit And Automatic :</b> </td><td>021200339 (paper & electronic)</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number  :</b> </td><td>026009593</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift Code :</b> </td><td>BOFAUS3N</td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "</div>";
                    invoiceData += "</div></div>";
                }
                else if (res.InvoiceDetails[0].CountryId == 105) {
                    invoiceData += "<label> Grand Total : <span>" + (res.InvoiceDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                    invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                    invoiceData += "</div>";
                    invoiceData += "<div align='center' width='100%'>";
                    invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                    invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>HSBC Bank</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>400-477170-838</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Code :</b></td><td>400</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Drawn in favour of : </b></td><td>SMSCountry Networks (HK) Ltd.</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Bank Code: Swift code</b> </td><td>HSBCHKHHHKH</td></tr></table>";
                    invoiceData += "</div>";
                    invoiceData += "</div></div>";
                }
                else if (res.InvoiceDetails[0].CountryId == 239) {
                    invoiceData += "<label> Grand Total : <span>" + (res.InvoiceDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                    invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                    invoiceData += "</div>";
                    invoiceData += "<div align='center' width='100%'>";
                    invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                    invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>RAK Bank</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>0332014346001</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Addres:</b></td><td>1531, UMM Hurair Branch, Dubai, UAE.</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift code :</b> </td><td>NRAKAEAK</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> IBAN NO :</b></td><td>AE530400000332014346001</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Title : </b></td><td>SMS Country Network LLC.</td></tr></table>";
                    invoiceData += "</div>";
                    invoiceData += "</div></div>";
                }
                else if (res.InvoiceDetails[0].CountryId == 19) {
                    invoiceData += "<label> Grand Total : <span>" + (res.InvoiceDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                    invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                    invoiceData += "</div>";
                    invoiceData += "<div align='center' width='100%'>";
                    invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                    invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>BBK</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>100000355338</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Branch Name:</b></td><td>BBK Bank,Qudhaibiya,Bahrain</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Addres:</b></td><td>43 Government Avenue, P.O Box:597,Manama,Kingdom of Bahrain</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift code :</b> </td><td>BBKUBHBM</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> IBAN NO :</b></td><td>BH78BBKU00100000355338</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Title : </b></td><td>SMS Country Networks Co. W.L.L</td></tr></table>";
                    invoiceData += "</div>";
                    invoiceData += "</div></div>";
                }
                else if (res.InvoiceDetails[0].CountryId == 199) {
                    invoiceData += "<label> Grand Total : <span>" + (res.InvoiceDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                    invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                    invoiceData += "</div>";
                    invoiceData += "<div align='center' width='100%'>";
                    invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                    invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'><tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>National Commercial Bank</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Number:</b></td><td>08665479000100</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Branch Name:</b></td><td>Saihat-086</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Addres:</b></td><td>Gulf Road, Saihat, KSA</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift code :</b> </td><td>NCBKSAJE</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> IBAN NO :</b></td><td>SA7610000008665479000100</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Account Title : </b></td><td>Muassasat Balad Alrrasayil Alttijaria</td></tr></table>";
                    invoiceData += "</div>";
                    invoiceData += "</div></div>";
                }
                else {
                    invoiceData += "<label> Grand Total : <span>" + (res.InvoiceDetails[0].Amount) + '(' + CurrencyName + ')' + "</span></label></p>";
                    invoiceData += "</div></div></div><div class='top-header' id='effect'><div class='col-md-12' style='padding:20px 15px;'>";
                    invoiceData += "</div>";
                    invoiceData += "<div align='center' width='100%'>";
                    invoiceData += "<div width='100%' align='left'><font style='font-weight:bold;font-size:17px;margin-left: 13px;'>Bank Account Details: </font></div>";
                    invoiceData += "<table width='100%'  style='margin-left:17px;border-collapse: collapse; border-bottom: 1px solid black;border-top: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'>";
                    invoiceData += " <tr style='border-bottom: 1px solid black;' heght='40px'><td width='350px'><b>Bank Name:</b></td><td>Bank OF AMERICA</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Current Account No:</b></td><td>381028090258</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b> Branch Name :</b></td><td>South Plainfield Bank</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Ultimate Beneficiary :</b> </td><td>YGOY INC</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>YGOY address :</b> </td><td>310 Greenfield road,Bridge water, NJ 08807, US</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>For Direct Deposit And Automatic :</b> </td><td>021200339 (paper & electronic)</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number  :</b> </td><td>026009593</td></tr>";
                    invoiceData += "<tr heght='40px' style='border-bottom: 1px solid black;'><td width='350px'><b>Swift Code :</b> </td><td>BOFAUS3N</td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "</div>";
                    invoiceData += "</div></div>";
                }

                invoiceData += "<p style=' color:#000; font-size: 15px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note: Validity 6 Months only.</p>";
                invoiceData += "</div>";
                invoiceData += "";

            }
            else {
                if (res.Message == "Session Expired") {
                    window.location.href = "LoginWithGoogle.aspx";
                }
            }
        },
        error: function (res) {
            ErrorNotifier(res.Message);
        }
    });
    return invoiceData;

}

function MetadataProcessing(metaData, billMode, isBillGenerated, servicePropertiesMetaData) {
    var servicesData = "";
    servicesData += "<table class='table table-bordered'>";
    servicesData += "<thead><tr><th>#</th><th>Service</th><th>Valid Till</th><th>SAC No</th><th>Amount</th><th>Total</th></tr</thead>";
    servicesData += "<tbody>";
    var servicesArray = jQuery.parseJSON(metaData);
    var serviceCount = 0;
    for (var service in servicesArray) {
        serviceCount = serviceCount + 1;
        var serviceName = service
        var serviceProperties = servicesArray[service];
        var keywordOrCode = " (";
        if (serviceProperties.length > 0) {
            var serviceAmount = 0;
            var unitCost = 0;
            var additionalCost = 0;
            var sacNo = "";
            var extraChargesRow = ""
            for (var i = 0; i < serviceProperties.length; i++) {

                var validityInDays = 0;
                var createdDate = mm + "/" + dd + "/" + yy;
                var servicePropertiesArray = [];
                servicePropertiesArray = serviceProperties[i];
                var propertyName = "";
                var propertyValue;
                
                
                var value = "";
                for (var serviceProperty in servicePropertiesArray) {
                    value = servicePropertiesArray[serviceProperty];
                    propertyName = serviceProperty;
                    propertyValue = servicePropertiesArray[serviceProperty];
                    if (propertyName.toString().toLowerCase().trim() == 'code' || propertyName.toString().toLowerCase().trim() == 'codenumber') {
                        keywordOrCode += value + ',';
                    }
                    else if (propertyName.toString().toLowerCase().trim() == 'keyword') {
                        keywordOrCode += value + ',';
                    }
                    else if (propertyName.toString().toLowerCase().trim() == "refundamount") {
                        keywordOrCode += value + ',';
                    }
                    else if (propertyName.toString().toLowerCase().trim() == "number")
                    {
                        keywordOrCode += value + ',';
                    }

                    if ((serviceName.toString().trim().toLowerCase() == 'sendername' || serviceName.toString().trim().toLowerCase() == 'sender name') && propertyName.toString().toLowerCase().trim() == 'name') {
                         keywordOrCode += value + ',';
                    }
                    if (propertyName.toString().trim().toLocaleLowerCase() == 'sacno')
                    {
                        sacNo = value;
                    }

                    if (propertyName.toString().toLowerCase().trim() != "createdtime"
                        && propertyName.toString().toLowerCase().trim() != "smscount"
                        && propertyName.toString().toLowerCase().trim() != "smscost"
                        && propertyName.toString().toLowerCase().trim() != "voicecount"
                        && propertyName.toString().toLowerCase().trim() != "voicecallscount"
                        && propertyName.toString().toLowerCase().trim() != "voicecost"
                        && propertyName.toString().toLowerCase().trim() != "voicecallscost"
                        && propertyName.toString().toLowerCase().trim() != "extracharges"
                        && propertyName.toString().toLowerCase().trim() != "isbalancevalidity")
                    {
                        var servicePropertiesObject = find_in_object(servicePropertiesMetaData, { ServiceCode: service, PropertyCode: propertyName });
                        var servicePropertyDataType = servicePropertiesObject[0].DataTypeName;

                        if (servicePropertyDataType.toString().toLowerCase() == 'money' || propertyName.toString().toLowerCase().trim() == 'price') {
                            serviceAmount += parseFloat(value);
                            if (propertyName.toString().toLowerCase().trim() == "amount" || propertyName.toString().toLowerCase().trim() == "price") {
                                unitCost += parseFloat(value);
                            }
                            else {
                                additionalCost += parseFloat(value);
                            }
                        }
                        if (propertyName.toString().toLowerCase().trim() == "validityindays") {
                            validityInDays += parseInt(value);
                        }
                    }
                    else {
                        if (propertyName.toString().toLowerCase().trim() == "createdtime") {
                            createdDate = value;
                        }
                        else if (propertyName.toString().toLowerCase().trim() == "extracharges") {
                            var extraChargesArray = [];
                            
                            extraChargesArray = value;
                            for (var obj in extraChargesArray) {
                                var extraChargeObj = extraChargesArray[obj];
                                serviceAmount += parseFloat(extraChargeObj.Amount);
                                extraChargesRow += "<tr><td> " + extraChargeObj.Description + " </td><td>" + extraChargeObj.Amount + "</td></tr>"
                            }
                        }
                        else if (propertyName.toString().toLowerCase().trim() == "smscost" || propertyName.toString().toLowerCase().trim() == "voicecost" || propertyName.toString().toLowerCase().trim() == "voicecallscount") {
                            unitCost += parseFloat(value);
                            //eachServicePropertyObjectTotalAmount = value;
                        }

                    }
                }
                

                var ExpiryDate = new Date();
                ExpiryDate.setDate(ExpiryDate.getDate() + validityInDays); //number  of days to add, e.x. 15 days
                var dd = ExpiryDate.getDate();
                var mm = ExpiryDate.getMonth() + 1;
                var yy = ExpiryDate.getFullYear();
                var newdate = mm + "/" + dd + "/" + yy;

               
            }
            
            if (keywordOrCode.length == 2) {
                keywordOrCode = "";
            }
            else {
                keywordOrCode = keywordOrCode.substring(0, keywordOrCode.length - 1);
                keywordOrCode += ' )';
            }
            
            
        }
        servicesData += "<tr><th scope='row'>" + serviceCount + "</th>";
        servicesData += "<td>" + service + keywordOrCode + "</td>";
        servicesData += "<td>" + newdate + "</td>";
        servicesData += "<td>" + sacNo + "</td>";
        servicesData += "<td><table class='table' width='100%'><thead>";
        servicesData += "<tr><td> Amount </td>";
        servicesData += "<td>" + unitCost + "</td></tr>";
        servicesData += "<tr><td> Additional cost</td>";
        servicesData += "<td>" + additionalCost + "</td></tr>"
        servicesData += extraChargesRow;
        servicesData += "</thead></table></td>";
        servicesData += "<td>" + serviceAmount + "</td></tr>";
        
    }

    servicesData += "</tbody></table>";
    servicesData += "";
    servicesData += "";


    return servicesData;
}

function MetadataProcessingForPdfDownload(metaData, billMode, isBillGenerated, servicePropertiesMetaData) {

    var servicesData = "";
    servicesData += "<table valign='top' cellpadding='0' cellspacing='0' border='1' width='100%' style=' margin-bottom:20px;margin-left:-10px; ";
    servicesData += "margin-top:20px; text-align:center;'><thead><tr><th>#</th><th>Service</th><th>Valid Till</th><th>SAC NO</th><th>Amount</th><th>Total</th></tr></thead><tbody>";
    var servicesArray = jQuery.parseJSON(metaData);
    var serviceCount = 0;
    for (var service in servicesArray) {
        serviceCount = serviceCount + 1;
        var serviceName = service
        var serviceProperties = servicesArray[service];
        var keywordOrCode = " (";
        if (serviceProperties.length > 0) {
            var serviceAmount = 0;
            var unitCost = 0;
            var additionalCost = 0;
            var extraChargesRow = ""
            var sacNo = "";
            for (var i = 0; i < serviceProperties.length; i++) {

                var validityInDays = 0;
                var createdDate = mm + "/" + dd + "/" + yy;
                var servicePropertiesArray = [];
                servicePropertiesArray = serviceProperties[i];
                var propertyName = "";
                var propertyValue;
                


                var value = "";
                for (var serviceProperty in servicePropertiesArray) {
                    value = servicePropertiesArray[serviceProperty];
                    propertyName = serviceProperty;
                    propertyValue = servicePropertiesArray[serviceProperty];
                    if (propertyName.toString().toLowerCase().trim() == 'code' || propertyName.toString().toLowerCase().trim() == 'codenumber') {
                        keywordOrCode += value + ',';
                    }
                    else if (propertyName.toString().toLowerCase().trim() == 'keyword') {
                        keywordOrCode += value + ',';
                    }
                    else if (propertyName.toString().toLowerCase().trim() == "refundamount") {
                        keywordOrCode += value + ',';
                    }
                    else if (propertyName.toString().toLowerCase().trim() == "number") {
                        keywordOrCode += value + ',';
                    }
                    if ((serviceName.toString().trim().toLowerCase() == 'sendername' || serviceName.toString().trim().toLowerCase() == 'sender name') && propertyName.toString().toLowerCase().trim() == 'name') {
                        keywordOrCode += value + ',';
                    }
                    if (propertyName.toString().trim().toLocaleLowerCase() == 'sacno') {
                        sacNo = value;
                    }
                    if (propertyName.toString().toLowerCase().trim() != "createdtime"
                        && propertyName.toString().toLowerCase().trim() != "smscount"
                        && propertyName.toString().toLowerCase().trim() != "smscost"
                        && propertyName.toString().toLowerCase().trim() != "voicecount"
                        && propertyName.toString().toLowerCase().trim() != "voicecallscount"
                        && propertyName.toString().toLowerCase().trim() != "voicecost"
                        && propertyName.toString().toLowerCase().trim() != "voicecallscost"
                        && propertyName.toString().toLowerCase().trim() != "extracharges"
                        && propertyName.toString().toLowerCase().trim() != "isbalancevalidity") {
                        var servicePropertiesObject = find_in_object(servicePropertiesMetaData, { ServiceCode: service, PropertyCode: propertyName });
                        var servicePropertyDataType = servicePropertiesObject[0].DataTypeName;

                        if (servicePropertyDataType.toString().toLowerCase() == 'money') {
                            serviceAmount += parseFloat(value);
                            if (propertyName.toString().toLowerCase().trim() == "amount" || propertyName.toString().toLowerCase().trim() == "price") {
                                unitCost += parseFloat(value);
                            }
                            else {
                                additionalCost += parseFloat(value);
                            }
                        }
                        if (propertyName.toString().toLowerCase().trim() == "validityindays") {
                            validityInDays += parseInt(value);
                        }
                    }
                    else {
                        if (propertyName.toString().toLowerCase().trim() == "createdtime") {
                            createdDate = value;
                        }
                        else if (propertyName.toString().toLowerCase().trim() == "extracharges") {
                            var extraChargesArray = [];

                            extraChargesArray = value;
                            for (var obj in extraChargesArray) {
                                var extraChargeObj = extraChargesArray[obj];
                                serviceAmount += parseFloat(extraChargeObj.Amount);
                                extraChargesRow += "<tr><td> " + extraChargeObj.Description + " </td><td>" + extraChargeObj.Amount + "</td></tr>"
                            }
                        }
                        else if (propertyName.toString().toLowerCase().trim() == "smscost" || propertyName.toString().toLowerCase().trim() == "voicecost" || propertyName.toString().toLowerCase().trim() == "voicecallscount") {
                            unitCost += parseFloat(value);
                            //eachServicePropertyObjectTotalAmount = value;
                        }

                    }
                }


                var ExpiryDate = new Date();
                ExpiryDate.setDate(ExpiryDate.getDate() + validityInDays); //number  of days to add, e.x. 15 days
                var dd = ExpiryDate.getDate();
                var mm = ExpiryDate.getMonth() + 1;
                var yy = ExpiryDate.getFullYear();
                var newdate = mm + "/" + dd + "/" + yy;


            }

            if (keywordOrCode.length == 2) {
                keywordOrCode = "";
            }
            else {
                keywordOrCode = keywordOrCode.substring(0, keywordOrCode.length - 1);
                keywordOrCode += ' )';
            }

        }

        servicesData += "<tr><th scope='row'>" + serviceCount + "</th>";
        servicesData += "<td>" + service + keywordOrCode + "</td>";
        servicesData += "<td>" + newdate + "</td>";
        servicesData += "<td>" + sacNo + "</td>";
        servicesData += "<td><table class='table' width='100%'><thead>";
        servicesData += "<tr><td> Amount </td>";
        servicesData += "<td>" + unitCost + "</td></tr>";
        servicesData += "<tr><td> Additional cost</td>";
        servicesData += "<td>" + additionalCost + "</td></tr>"
        servicesData += extraChargesRow;
        servicesData += "</thead></table></td>";
        servicesData += "<td>" + serviceAmount + "</td></tr>";

    }

    servicesData += "</tbody></table>";
    servicesData += "";
    servicesData += "";

    return servicesData;
}

function CreateInvoice(QuotationId, BillMode) {
    $.ajax({
        url: "/AjaxHandlers/Invoices.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            type: 1,
            BillMode: BillMode,
            QuotationId: QuotationId
        },
        success: function (res) {
            
            if (res.Success == "True") {
                SuccessNotifier("Invoice Raised Successfully");
                var $form = $("<form/>").attr("id", "data_form")
                                           .attr("action", "InVoice.aspx")
                                           .attr("method", "post");
                $("body").append($form);
                AddParameter($form, "InvoiceId", res.InvoiceId);
                AddParameter($form, "BillMode", BillMode);
                AddParameter($form, "IsBillGenerated", 0);

                $form[0].submit();
            }
            else {
                if (res.Message == "Session Expired") {
                    window.location.href = "LoginWithGoogle.aspx";
                }
                ErrorNotifier(res.Message);
            }
        },
        error: function (res) {
            ErrorNotifier(res.Message);
        }
    });

    return false;
}

function DownloadQuotation(QuotationId, billMode, isBillGenerated, isEmailGenerated, floderPath) {
    var FilePath = "";
    var quotationData = "";
    $.ajax({
        url: "/AjaxHandlers/Invoices.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            type: 5,
            QuotationId: QuotationId,
            BillMode: billMode,
            IsBillGenerated: isBillGenerated
        },
        success: function (res) {
            if (res.Success == "True") {
                quotationData += "<html><head><meta charset='utf-8'><title></title></head>";
                quotationData += "<body style='font-family:Roboto,sans-serif;background-image: url('');background-repeat: repeat-y;'>";
                quotationData += "<div class='body-wrap' style='width:100%; height:auto; padding:0px; margin-top:30px; float:left;'>";
                quotationData += "<div class='body-wrap-01' style='width:1000px; height:1240px; margin:0px auto; padding:20px; background:#fff; margin-bottom:20px;'>";
                quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' width='900' height='150'>";
                quotationData += "<tr><td align='center' valign='top' height='150'>";
                quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' width='900' height='150' style=' border-bottom: 1px solid #EEE;'>";
                quotationData += "<tr><td valign='middle' width='200px' > <img src='" + $("#hdnWebUrl").val() + "Images/TelebuLogo.png' width='125' height='125' style='padding-top:12px;'> </td>";
                quotationData += "<td align='center' valign='middle' height='150' style='color: #000; font-size:13px; text-align:left; padding-top:18px;padding-left:20px;line-height:23px;'><font style='font-weight:bold; font-size:16px;'>SISRB TECHNOLOGIES PVT LTD</font><br/>Ektha towers, white fields,<br/>kondapur, Hyderabad, Telangana, 500082.<br/><a href='#' style='color:black;text-decoration:none;'>Hello@smscountry.com</a><br/> <a href='#' style='color:black;text-decoration:none;'>040-21265458</a><br/>";
                if (res.QuotationDetails[0].CountryId == 108) {
                    quotationData += "<font>GSTIN:36AAHCS9759A1Z2</font><br/><font>State: Telangana</font><br/><font>State Code: 36</font><br/><font>Pan No:AAHCS9759A</font>";
                }
                quotationData += "</td>";
                quotationData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px;";
                quotationData += "text-align:right; padding-top:17px; line-height:23px;'>";
                quotationData += "<font style='font-weight:bold; font-size:16px;'>Quotation Id:# <font style='font-weight:bold; font-size:16px;'>" + res.QuotationDetails[0].QuotationNumber + "</font></font><br/> ";
                quotationData += "<font style='font-weight:bold;font-size:16px;'>Issued On: <font style='font-weight:normal;font-size:16px;'>" + res.QuotationDetails[0].CreatedTime + "</font></font><br/>";
                //quotationData += "<font style='font-weight:bold'>Payment Due: <font style='font-weight:normal'>June 07-06-17</font></font>";
                quotationData += "</td></tr></table></td></tr>  ";
                quotationData += "<tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0' cellspacing='0'";
                quotationData += "border='0' width='900' height='150' style=' padding-bottom:20px; padding-top:20px;   border-bottom: 1px solid #EEE;'>";
                quotationData += "<tr><td valign='middle' width='200px'> <img  src='" + $("#hdnWebUrl").val() + "images/ClientLogo.png' height='125' style='padding-top:12px;'> </td>";
                quotationData += "<td align='center' valign='middle' height='150' style='color: #000; font-size:13px;padding-left:20px; text-align:left;line-height:23px;'>";
                if (res.QuotationDetails[0].FullName == "") {
                    quotationData += "<font style='font-weight:bold; font-size:17px;'>" + res.QuotationDetails[0].ContactName;
                } else {
                    quotationData += "<font style='font-weight:bold; font-size:17px;'>" + res.QuotationDetails[0].FullName;
                }
                quotationData += "</font><br/>" + res.QuotationDetails[0].Company + " <br/>";
                quotationData += "<div style='width: 50%;'>" + res.QuotationDetails[0].ContactAddress + "</div>";
                quotationData += "<a href='#' style='color:black; text-decoration:none;'>" + res.QuotationDetails[0].BusinessMailId + "</a>";
                quotationData += "<br/> <a href='#' style='color:black;text-decoration:none;'>" + res.QuotationDetails[0].Mobile + "</a><br/>";

                //quotationData += "<font style='font-weight:bold;'>Pan number: <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].PAN;
                //quotationData += "</font></font><br/><font style='font-weight:bold;'>Tan number: <font style='color: #000; font-weight:normal'>";
                //quotationData += "AYJP1234B</font></font>";
                quotationData += "</td>";
                quotationData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
                quotationData += "padding-right:20px; padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";

                //var dataArray = jQuery.parseJSON(res.QuotationDetails[0].Metadata);
                //for (var balanceData in dataArray) {
                //    var name = balanceData;
                //    var balProperties = dataArray[balanceData];
                //    if (name.toString().toLowerCase().trim() == "balance" || name.toString().toLowerCase().trim() == "rechargeamount") {
                //        if (balProperties.length > 0) {
                //            quotationData += "Price Details:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><br/> ";
                //            for (var i = 0; i < balProperties.length; i++) {
                //                var dataArray = balProperties[i];
                //                for (var data in dataArray) {
                //                    var name1 = data;
                //                    var value = dataArray[data];
                //                    if (name1.toString().toLowerCase().trim() == "tpps" || name1.toString().toLowerCase().trim() == "transactionalprice/sms") {
                //                        if (value != "")
                //                            quotationData += "<font>Promotional Price Per SMS : <span>" + value + "</font><br/>";
                //                    }
                //                    if (name1.toString().toLowerCase().trim() == "ppps" || name1.toString().toLowerCase().trim() == "promotionalprice/sms") {
                //                        if (value != "")
                //                            quotationData += "<font>Transactional Price Per SMS : <span>" + value + "</font><br/>";
                //                    }
                //                    if (name1.toString().toLowerCase().trim() == "transactionalpulse/voice") {
                //                        if (value != "")
                //                            quotationData += "<font>Transactional Price Per Voice : <span>" + value + "</font><br/>";
                //                    }
                //                    if (name1.toString().toLowerCase().trim() == "promotionalpulse/voice") {
                //                        if (value != "")
                //                            quotationData += "<font>Promotional Price Per Voice : <span>" + value + "</font>";
                //                    }

                //                }
                //            }
                //        }
                //        else {
                //            quotationData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
                //            quotationData += "padding-right:20px; padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";
                //            quotationData += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><br/> ";
                //        }
                //    }
                //}
                            quotationData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
                quotationData += "padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";
                            quotationData += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><br/> ";
                quotationData += "</td></tr></table></td></tr>";

                quotationData += "<tr><td align='center' valign='top' height='120' style='color: #000; font-size:13px;";
                quotationData += "text-align:left; padding-top:20px; padding-left:5px; line-height:23px;   ";
                quotationData += "border-bottom: 1px solid #EEE;'><font style='font-weight:bold; font-size:17px;'>";
                quotationData += "Shipping Details</font><br/><br/> YGOY INC, 310 GreenFields Road Bridge Water, Bridge Water, NJ 08807, US</td></tr>";
                quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:center; padding-top:20px;";
                quotationData += "padding-left:20px; line-height:23px; '> ";

                quotationData += MetadataProcessingForPdfDownload(res.QuotationDetails[0].Metadata, billMode, isBillGenerated, res.ServiceProperties);

                quotationData += "</td></tr><tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0'";
                quotationData += "cellspacing='0' border='0' width='900' height='150' style=' padding-bottom:0px; padding-top:40px;";
                quotationData += "border-bottom: 1px solid #EEE;'><tr><td align='center' valign='top' height='150' style='color: #000;";
                quotationData += "font-size:13px; text-align:left; line-height:23px;'><font style='font-weight:bold;";
                quotationData += "font-size:17px;'>Account Manager Details</font><br/>";
                
                quotationData += "<font style='font-weight:bold;'>Name : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].AccountManagerName + "</font>";
                quotationData += "</font><br/><font style='font-weight:bold;'>Number : <font style='color: #000; font-weight:normal'>";
                quotationData += res.QuotationDetails[0].AccountManagerMobile + "</font></font><br/><font style='font-weight:bold;'>Email : ";
                quotationData += "<font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].AccountManagerEmail + "</font></font></td>";
                var CurrencyName = res.QuotationDetails[0].CurrencyName;    
                quotationData += "<td valign='top' height='150' style='color: #000; font-size:13px;line-height:23px;text-align:right'>";
                quotationData += "<font style='font-weight:bold;'>Sub - Total amount : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font><br/>";
                if (res.QuotationDetails[0].CountryId == 108) {
                    quotationData += "<font style='font-weight:bold;'>CGST : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].CGST + '(' + CurrencyName + ')' + "</font></font><br/>";
                    quotationData += "<font style='font-weight:bold;'>SGST : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].SGST + '(' + CurrencyName + ')' + "</font></font><br/><font style='font-weight:bold;'>IGST : ";
                    quotationData += "<font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].IGST + '(' + CurrencyName + ')' + "</font></font><br/><font style='font-weight:bold;'>Grand Total : ";
                    quotationData += "<font style='color: #000; font-weight:normal'>" + (parseFloat(res.QuotationDetails[0].Amount) + parseFloat(res.QuotationDetails[0].Tax)) + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td><b>Kotak Mahindra Bank Ltd</b></td><td><b>ICICI Bank Ltd</b></td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>05522000002309</td><td>004005017615</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>Somajiguda Branch (Hyderabad, India)</td><td>Madhapur Branch (Hyderabad, India)</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>6-3-110-9/1, Block A, Jewel Pavani Towers,<br/>Somajiguda, Hyderabad, India -500082</td><td>ICICI Bank Ltd, Stone Ridge Center, Opp: Google,<br/>Main Road, Kondapur, Hyderabad – 500033, Telangana, India</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>RTGS/NEFT/IFSC CODE:</b></td><td>KKBK0000552</td><td>ICIC0000040</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>MICR CODE:</b></td><td>500485003</td><td></td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Name: </b></td><td>SISRB TECHNOLOGIES PVT LTD</td><td>	SISRB TECHNOLOGIES PVT LTD</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-18px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.QuotationDetails[0].CountryId == 241) {
                    quotationData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>Bank OF AMERICA</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td></td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>South Plainfield Bank</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Ultimate Beneficiary:</b></td><td>YGOY INC</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>YGOY address: </b></td><td>310 Greenfield road,Bridge water, NJ 08807, US</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Operating Business Account No: </b></td><td>381028090258</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>For Direct Deposit And Automatic : </b></td><td>021200339 (paper & electronic)</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number : </b></td><td>026009593</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BOFAUS3N</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.QuotationDetails[0].CountryId == 105) {
                    quotationData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>HSBC Bank</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>400-477170-838</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Code:</b></td><td>400</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Code: Swift code:</b></td><td>HSBCHKHHHKH</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Drawn in favour of:</b></td><td>SMSCountry Networks (HK) Ltd.</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.QuotationDetails[0].CountryId == 239) {
                    quotationData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>RAK Bank</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>0332014346001</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>RAK Bank</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>1531, UMM Hurair Branch, Dubai, UAE.</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>NRAKAEAK</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>AE530400000332014346001</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>SMS Country Network LLC</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.QuotationDetails[0].CountryId == 19) {
                    quotationData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>BBK</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>100000355338</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>BBK Bank,Qudhaibiya,Bahrain</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>43 Government Avenue, P.O Box:597,Manama,Kingdom of Bahrain</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BBKUBHBM</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>BH78BBKU00100000355338</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>SMS Country Networks Co. W.L.L</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.QuotationDetails[0].CountryId == 199) {
                    quotationData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>National Commercial Bank</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>08665479000100</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>Saihat-086</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>Gulf Road, Saihat, KSA</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>NCBKSAJE</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>SA7610000008665479000100</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>Muassasat Balad Alrrasayil Alttijaria</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
                else {
                    quotationData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.QuotationDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    quotationData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    quotationData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    quotationData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    quotationData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>Bank OF AMERICA</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td></td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>South Plainfield Bank</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Ultimate Beneficiary:</b></td><td>YGOY INC</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>YGOY address: </b></td><td>310 Greenfield road,Bridge water, NJ 08807, US</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Operating Business Account No: </b></td><td>381028090258</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>For Direct Deposit And Automatic : </b></td><td>021200339 (paper & electronic)</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number : </b></td><td>026009593</td></tr>";
                    quotationData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BOFAUS3N</td></tr>";
                    quotationData += "</table>";
                    quotationData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
               
                quotationData += "</div></body></html>";

               // quotationData =  "<html><head><meta><title></title></head><body ><div class='body-wrap' style='padding:0px; margin:0px; float:left;'><div class='body-wrap-01' style='margin:0px auto; padding:20px; background:#fff; margin-bottom:20px;'><table align='center' valign='top' cellpadding='0' cellspacing='0' border='0'  height='150'><tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' height='150' style='    border-bottom: 1px solid #EEE;'><tr><td align='center' valign='middle'> Logo </td><td align='center' valign='middle'  style='color: #000; text-align:left; padding-left:20px; line-height:23px;'><font style='font-weight:bold; '>SISRB Technologies</font><br/>Ektha towers, white fields,<br/>kondapur, Hyderabad, Telangana, 500082.<br/><a href='#' style='color: #08aeea; text-decoration:none;'>Hello@smscountry.com</a><br/> <a href='#' style='color: #08aeea; text-decoration:none;'>040-21265458</a></td><td align='center' valign='top' height='150' style='color: #000; font-size:13px;text-align:right; padding-right:20px; padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>Invoice <font style='color: #08aeea;'>#000</font></font><br/> <font style='font-weight:bold'>Issued: <font style='font-weight:normal'>07-06-17</font></font><br/><font style='font-weight:bold'>Payment Due: <font style='font-weight:normal'>June 07-06-17</font></font></td></tr></table></td></tr>  <tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0' cellspacing='0'border='0'  style=' padding-bottom:20px; padding-top:20px;   border-bottom: 1px solid #EEE;'><tr><td align='center' valign='middle'  > Client Iocn </td><td align='center' valign='middle'  style='color: #000; text-align:left; padding-left:20px; line-height:23px;'><font style='font-weight:bold; '>Madhu Sambasivarao Polisetti</font><br/>SmsCountry Networks Pvt.Ltd <br/><a href='#' style='color: #08aeea; text-decoration:none;'>madhu.polisetti@smscountry.com</a><br/> <a href='#' style='color: #08aeea; text-decoration:none;'>919966226645</a><br/><font style='font-weight:bold;'>Pan number: <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>Tan number: <font style='color: #000; font-weight:normal'>AYJP1234B</font></font></td><td align='center' valign='top' style='color: #000; text-align:right;padding-right:20px; padding-top:17px; line-height:23px;'><font style='font-weight:bold; '>Invoice <font style='color: #08aeea;'>#000</font></font><br/> <font style='font-weight:bold'>Issued: <font style='font-weight:normal'>07-06-17</font></font><br/><font style='font-weight:bold'>Payment Due: <font style='font-weight:normal'>June 07-06-17</font></font></td></tr></table></td></tr><tr><td align='center' valign='top' height='120' style='color: #000; text-align:left; padding-top:20px; padding-left:20px; line-height:23px;   border-bottom: 1px solid #EEE;'><font style='font-weight:bold;'>Shipping Details</font><br/><br/> YGOY INC, 310 GreenFields Road Bridge Water, Bridge Water, NJ 08807, US</td></tr><tr><td align='left' valign='top' style='color: #000; text-align:center; padding-top:20px;padding-left:20px; line-height:23px; '> </td></tr><tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0'cellspacing='0' border='0' height='150' style=' padding-bottom:0px; padding-top:40px;border-bottom: 1px solid #EEE;'><tr><td align='center' valign='top' height='150' style='color: #000; text-align:left; padding-left:20px; line-height:23px;'><font style='font-weight:bold;'>Account Manager Details</font><br/><font style='font-weight:bold;'>Name : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>Number : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>Email : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font></td><td align='center' valign='top' height='150' style='color: #000;  text-align:right;padding-right:20px; line-height:23px;'><font style='font-weight:bold;'>Sub - Total amount : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>CGST : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>SGST : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>IGST : <font style='color: #000; font-weight:normal'>AYJP1234B</font></font><br/><font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>$00.00</font></font></td></tr></table></td></tr><tr><td align='left' valign='top' style='color: #000; text-align:left\t; padding-top:20px; padding-left:20px; line-height:23px; '><font style='text-align:left'>Note:</font><table align='center' valign='top' cellpadding='0' cellspacing='0' border='1' style=' margin-bottom:20px;margin-top:20px; text-align:left;'><tbody style=''><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;Bank Name</th><td>&nbsp;&nbsp;&nbsp;&nbsp;RAK Bank</td></tr><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;Current Account No</th><td>&nbsp;&nbsp;&nbsp;&nbsp;0332014346001</td></tr><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;Branch Name</th><td>&nbsp;&nbsp;&nbsp;&nbsp;RAK Bank</td></tr><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;Address</th><td>&nbsp;&nbsp;&nbsp;&nbsp;PO BOX:1531, UMM Hurair Branch, Dubai, UAE.</td></tr><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;SWIFT CODE</th><td>&nbsp;&nbsp;&nbsp;&nbsp;NRAKAEAK</td></tr><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;IBAN NO</th><td>&nbsp;&nbsp;&nbsp;&nbsp;BH78BBKU00100000355338</td></tr><tr><th scope='row'>&nbsp;&nbsp;&nbsp;&nbsp;Account Name </th><td>&nbsp;&nbsp;&nbsp;&nbsp;SMS Country Network LLC</td></tr></tbody></table></td></tr></table></div></body></html>"
            }
        }, error: function (res) {

        }

    });
    var webURL = $("#hdnWebUrl").val();
    var fileName = "Quotation_" + QuotationId;
    $.ajax({
        url: "/AjaxHandlers/Html2Pdf.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            Html: encodeURIComponent(quotationData),
            FileName: fileName,
            FilePath: floderPath
        },
        success: function (res) {
            if (res.Success == true) {
                var pdfLocation = $("#hdnWebUrl").val() + "/Attachments/" + res.FilePath;
                var a = document.createElement('a');
                a.href = pdfLocation;
                a.download = res.FilePath;
                FilePath = res.FilePath;
                if (isEmailGenerated != true) {
                document.body.appendChild(a);
                a.click();
                }
                
                
            }

        }, error: function (res) {

        }
    });
    if (isEmailGenerated == true) {
        return FilePath;
}
}

//function DownloadInvoice(invoiceId, billMode, isBillGenerated, isEmailGenerated, folderPath) {
//    var invoiceData = "";
//    var FilePath = "";
//    $.ajax({
//        url: "/AjaxHandlers/Invoices.ashx",
//        async: false,
//        dataType: "json",
//        type: "post",
//        data: {
//            type: 3,
//            InvoiceId: invoiceId,
//            BillMode: billMode,
//            IsBillGenerated: isBillGenerated
//        },
//        success: function (res) {
//            if (res.Success == "True") {
//                invoiceData += "<html><head><meta charset='utf-8'><title></title></head>";
//                invoiceData += "<body style='font-family:Roboto,sans-serif;background-image: url('');background-repeat: repeat-y;'>";
//                invoiceData += "<div class='body-wrap' style='width:100%; height:auto; padding:0px; margin-top:30px; float:left;'>";
//                invoiceData += "<div class='body-wrap-01' style='width:1000px; height:1240px; margin:0px auto; padding:20px; background:#fff; margin-bottom:20px;'>";
//                invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' width='900' height='150'>";
//                invoiceData += "<tr><td align='center' valign='top' height='150'>";
//                invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' width='900' height='150' style=' border-bottom: 1px solid #EEE;'>";
//                invoiceData += "<tr><td valign='middle' width='200px' > <img src='" + $("#hdnWebUrl").val() + "Images/TelebuLogo.png' width='125' height='125' style='padding-top:12px;'> </td>";
//                invoiceData += "<td align='center' valign='middle' height='150' style='color: #000; font-size:13px; text-align:left; padding-top:18px;padding-left:20px;line-height:23px;'><font style='font-weight:bold; font-size:16px;'>SISRB TECHNOLOGIES PVT LTD</font><br/>Ektha towers, white fields,<br/>kondapur, Hyderabad, Telangana, 500082.<br/><a href='#' style='color:black;text-decoration:none;'>Hello@smscountry.com</a><br/> <a href='#' style='color:black;text-decoration:none;'>040-21265458</a><br/>";
//                if (res.InvoiceDetails[0].CountryId == 108) {
//                    invoiceData += "<font>GSTIN:36AAHCS9759A1Z2</font><br/><font>State: Telangana</font><br/><font>State Code: 36</font><br/><font>Pan No:AAHCS9759A</font>";
//                }
//                invoiceData += "</td>";
//                invoiceData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px;";
//                invoiceData += "text-align:right; padding-top:17px; line-height:23px;'>";
//                invoiceData += "<font style='font-weight:bold; font-size:16px;'>Invoice # <font style='font-weight:bold; font-size:16px;'>" + res.InvoiceDetails[0].InvoiceNumber + "</font></font><br/> ";
//                invoiceData += "<font style='font-weight:bold;font-size:16px;'>Issued On: <font style='font-weight:normal;font-size:16px;'>" + res.InvoiceDetails[0].CreatedTime + "</font></font><br/>";
//                //quotationData += "<font style='font-weight:bold'>Payment Due: <font style='font-weight:normal'>June 07-06-17</font></font>";
//                invoiceData += "</td></tr></table></td></tr>  ";
//                invoiceData += "<tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0' cellspacing='0'";
//                invoiceData += "border='0' width='900' height='150' style=' padding-bottom:20px; padding-top:20px;   border-bottom: 1px solid #EEE;'>";
//                invoiceData += "<tr><td valign='middle' width='200px'> <img  src='" + $("#hdnWebUrl").val() + "images/ClientLogo.png' height='125' style='padding-top:12px;'> </td>";
//                invoiceData += "<td align='center' valign='middle' height='150' style='color: #000; font-size:13px;padding-left:20px; text-align:left;line-height:23px;'>";
//                if (res.InvoiceDetails[0].FullName == "") {
//                    invoiceData += "<font style='font-weight:bold; font-size:17px;'>" + res.InvoiceDetails[0].ContactName;
//                } else {
//                    invoiceData += "<font style='font-weight:bold; font-size:17px;'>" + res.InvoiceDetails[0].FullName;
//                }
//                invoiceData += "</font><br/>" + res.InvoiceDetails[0].Company + " <br/>";
//                invoiceData += "<a href='#' style='color:black; text-decoration:none;'>" + res.InvoiceDetails[0].BusinessMailId + "</a>";
//                invoiceData += "<br/> <a href='#' style='color:black;text-decoration:none;'>" + res.InvoiceDetails[0].Mobile + "</a><br/>";
//                invoiceData += "</td>";
//                invoiceData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
//                invoiceData += "padding-right:20px; padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";
//                invoiceData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
//                invoiceData += "padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";
//                invoiceData += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><br/> ";
//                invoiceData += "</td></tr></table></td></tr>";
//                invoiceData += "<tr><td valign='top' height='120' style='color: #000; font-size:13px;";
//                invoiceData += "text-align:left; padding-top:20px; line-height:23px;   ";
//                invoiceData += "border-bottom: 1px solid #EEE;'><font style='font-weight:bold; font-size:17px;'>";
//                invoiceData += "Shipping Details</font><br/><br/> YGOY INC, 310 GreenFields Road Bridge Water, Bridge Water, NJ 08807, US</td></tr>";
//                invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:center; padding-top:20px;";
//                invoiceData += "padding-left:20px; line-height:23px; '> ";
//                invoiceData
//                invoiceData += MetadataProcessingForPdfDownload(res.InvoiceDetails[0].Metadata, billMode, isBillGenerated, res.ServiceProperties);
//                invoiceData += "</td></tr><tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0'";
//                invoiceData += "cellspacing='0' border='0' width='900' height='150' style=' padding-bottom:0px; padding-top:40px;";
//                invoiceData += "border-bottom: 1px solid #EEE;'><tr><td align='center' valign='top' height='150' style='color: #000;";
//                invoiceData += "font-size:13px; text-align:left; line-height:23px;'><font style='font-weight:bold;";
//                invoiceData += "font-size:17px;'>Account Manager Details</font><br/>";
//                invoiceData += "<font style='font-weight:bold;'>Name : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].AccountManagerName + "</font>";
//                invoiceData += "</font><br/><font style='font-weight:bold;'>Number : <font style='color: #000; font-weight:normal'>";
//                invoiceData += res.InvoiceDetails[0].AccountManagerMobile + "</font></font><br/><font style='font-weight:bold;'>Email : ";
//                invoiceData += "<font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].AccountManagerEmail + "</font></font></td>";
//                var CurrencyName = res.InvoiceDetails[0].CurrencyName;
//                invoiceData += "<td valign='top' height='150' style='color: #000; font-size:13px;line-height:23px;text-align:right'>";
//                invoiceData += "<font style='font-weight:bold;'>Sub - Total amount : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font><br/>";
//                if (res.InvoiceDetails[0].CountryId == 108) {
//                    invoiceData += "<font style='font-weight:bold;'>CGST : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].CGST + '(' + CurrencyName + ')' + "</font></font><br/>";
//                    invoiceData += "<font style='font-weight:bold;'>SGST : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].SGST + '(' + CurrencyName + ')' + "</font></font><br/><font style='font-weight:bold;'>IGST : ";
//                    invoiceData += "<font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].IGST + '(' + CurrencyName + ')' + "</font></font><br/><font style='font-weight:bold;'>Grand Total : ";
//                    invoiceData += "<font style='color: #000; font-weight:normal'>" + (parseFloat(res.InvoiceDetails[0].Amount) + parseFloat(res.InvoiceDetails[0].Tax)) + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left; padding-top:20px;padding-left:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td><b>Kotak Mahindra Bank Ltd</b></td><td><b>ICICI Bank Ltd</b></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>05522000002309</td><td>004005017615</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>Somajiguda Branch (Hyderabad, India)</td><td>Begumpet Branch (Hyderabad, India)</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>6-3-110-9/1, Block A, Jewel Pavani Towers,<br/>Somajiguda, Hyderabad, India -500082</td><td>ICICI Bank Ltd, 1st Floor, East Wing,1-11-256,<br/>Street No.1, Begumpet, Hyderabad, India -500016</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>RTGS/NEFT/IFSC CODE:</b></td><td>KKBK0000552</td><td>ICIC0000040</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>MICR CODE:</b></td><td>500485003</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Name: </b></td><td>SISRB TECHNOLOGIES PVT LTD</td><td>	SISRB TECHNOLOGIES PVT LTD</td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
//                }
//                else if (res.InvoiceDetails[0].CountryId == 241) {
//                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>Bank OF AMERICA</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>South Plainfield Bank</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Ultimate Beneficiary:</b></td><td>YGOY INC</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>YGOY address: </b></td><td>310 Greenfield road,Bridge water, NJ 08807, US</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Operating Business Account No: </b></td><td>381028090258</td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>For Direct Deposit And Automatic : </b></td><td>021200339 (paper & electronic)</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number : </b></td><td>026009593</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BOFAUS3N</td><td></td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
//                }
//                else if (res.InvoiceDetails[0].CountryId == 105) {
//                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>HSBC Bank</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>400-477170-838</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Code:</b></td><td>400</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Code: Swift code:</b></td><td>HSBCHKHHHKH</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Drawn in favour of:</b></td><td>SMSCountry Networks (HK) Ltd.</td><td></td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
//                }
//                else if (res.InvoiceDetails[0].CountryId == 239) {
//                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>RAK Bank</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>0332014346001</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>RAK Bank</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>1531, UMM Hurair Branch, Dubai, UAE.</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>NRAKAEAK</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>AE530400000332014346001</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>SMS Country Network LLC</td><td></td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
//                }
//                else if (res.InvoiceDetails[0].CountryId == 19) {
//                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>BBK</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>100000355338</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>BBK Bank,Qudhaibiya,Bahrain</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>43 Government Avenue, P.O Box:597,Manama,Kingdom of Bahrain</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BBKUBHBM</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>BH78BBKU00100000355338</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>SMS Country Networks Co. W.L.L</td><td></td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
//                }
//                else if (res.InvoiceDetails[0].CountryId == 199) {
//                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>National Commercial Bank</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>08665479000100</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>Saihat-086</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>Gulf Road, Saihat, KSA</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>NCBKSAJE</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>SA7610000008665479000100</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>Muassasat Balad Alrrasayil Alttijaria</td><td></td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
//                }
//                else {
//                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
//                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left; padding-top:20px; line-height:23px;'> ";
//                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
//                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
//                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>Bank OF AMERICA</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td></td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>South Plainfield Bank</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Ultimate Beneficiary:</b></td><td>YGOY INC</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>YGOY address: </b></td><td>310 Greenfield road,Bridge water, NJ 08807, US</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Operating Business Account No: </b></td><td>381028090258</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>For Direct Deposit And Automatic : </b></td><td>021200339 (paper & electronic)</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number : </b></td><td>026009593</td><td></td></tr>";
//                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BOFAUS3N</td><td></td></tr>";
//                    invoiceData += "</table>";
//                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";

//                }
//                invoiceData += "</td></tr></table>";
//                invoiceData += "</div></body></html>";
//            }
//        },
//        error: function (res) {
//            alert("error");
//        }
//    });


//    var fileName = "Invoice_" + invoiceId;
//    $.ajax({
//        url: "/AjaxHandlers/Html2Pdf.ashx",
//        async: false,
//        dataType: "json",
//        type: "post",
//        data: {
//            Html: encodeURIComponent(invoiceData),
//            FileName: fileName,
//            FilePath: folderPath
//        },
//        success: function (res) {
//            if (res.Success == true) {
//                var pdfLocation = $("#hdnWebUrl").val() + "/Attachments/" + res.FilePath;
//                var a = document.createElement('a');
//                a.href = pdfLocation;
//                a.download = res.FilePath;
//                if (isEmailGenerated == true) {
//                    FilePath = res.FilePath;
//                } else { 
//                document.body.appendChild(a);
//                a.click();
//            }
//            }
//        }, error: function (res) {
//        }
//    });
//    if (isEmailGenerated == true)
//        return FilePath;
//}

function DownloadInvoice(invoiceId, billMode, isBillGenerated, isEmailGenerated, folderPath) {
    var invoiceData = "";
    var FilePath = "";
    $.ajax({
        url: "/AjaxHandlers/Invoices.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            type: 3,
            InvoiceId: invoiceId,
            BillMode: billMode,
            IsBillGenerated: isBillGenerated
        },
        success: function (res) {
            if (res.Success == "True") {
                invoiceData += "<html><head><meta charset='utf-8'><title></title></head>";
                invoiceData += "<body style='font-family:Roboto,sans-serif;background-image: url('');background-repeat: repeat-y;'>";
                invoiceData += "<div class='body-wrap' style='width:100%; height:auto; padding:0px; margin-top:60px; float:left;'>";
                invoiceData += "<div class='body-wrap-01' style='width:1000px; height:1240px; margin:0px auto; padding:20px; background:#fff; margin-bottom:20px;'>";
                invoiceData += "<h4 style='text-align:center;'>INVOICE</h4>"
                invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' width='900' height='150'>";
                invoiceData += "<tr><td align='center' valign='top' height='150'>";
                invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' border='0' width='900' height='150' style=' border-bottom: 1px solid #EEE;'>";
                invoiceData += "<tr>";
                invoiceData += "<td align='center' valign='middle' height='150' style='color: #000; font-size:13px; text-align:left; padding-top:18px;padding-left:20px;line-height:23px;'><font style='font-weight:bold; font-size:16px;'>SISRB TECHNOLOGIES PVT LTD</font><br/>Ektha towers, white fields,<br/>kondapur, Hyderabad, Telangana, 500082.<br/><a href='#' style='color:black;text-decoration:none;'>Email Id : Hello@smscountry.com</a><br/> <a href='#' style='color:black;text-decoration:none;'>Phone : 040-21265458</a><br/>";
                if (res.InvoiceDetails[0].CountryId == 108) {
                    invoiceData += "<font>GSTIN : 36AAHCS9759A1Z2</font><br/><font>State : Telangana</font><br/><font>State Code : 36</font></br><font>Pan No : AAHCS9759A</font>";
                }
                invoiceData += "</td>";
                invoiceData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px;";
                invoiceData += "text-align:right; padding-top:17px; line-height:23px;'>";
                invoiceData += "<font style='font-weight:bold; font-size:16px;'>Invoice # <font style='font-weight:bold; font-size:16px;'>" + res.InvoiceDetails[0].InvoiceNumber + "</font></font><br/> ";
                invoiceData += "<font style='font-weight:bold;font-size:16px;'>Issued On: <font style='font-weight:normal;font-size:16px;'>" + res.InvoiceDetails[0].CreatedTime + "</font></font><br/>";
                //quotationData += "<font style='font-weight:bold'>Payment Due: <font style='font-weight:normal'>June 07-06-17</font></font>";
                invoiceData += "</td></tr></table></td></tr>  ";
                invoiceData += "<tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0' cellspacing='0'";
                invoiceData += "border='0' width='900' height='150' style=' padding-bottom:20px; padding-top:20px;   border-bottom: 1px solid #EEE;'>";
                invoiceData += "<tr>";
                invoiceData += "<td align='center' valign='middle' height='150' style='color: #000; font-size:13px;padding-left:20px; text-align:left;line-height:23px;'>";
                invoiceData += "<font style='font-weight:bold; font-size:17px;'>Billing Address </font></br>";
                if (res.InvoiceDetails[0].FullName == "") {
                    invoiceData += "<font>" + res.InvoiceDetails[0].ContactName;
                } else {
                    invoiceData += "<font>" + res.InvoiceDetails[0].FullName;
                }
                invoiceData += "</font><br/>" + res.InvoiceDetails[0].Company + " <br/>";
                invoiceData += "<div style='width: 50%;'> Address : " + res.InvoiceDetails[0].ContactAddress + "</div>";
                invoiceData += "Email Id : <a href='#' style='color:black; text-decoration:none;'>" + res.InvoiceDetails[0].BusinessMailId + "</a>";
                invoiceData += "<br/> Mobile : <a href='#' style='color:black;text-decoration:none;'>" + res.InvoiceDetails[0].Mobile + "</a><br/>";
                invoiceData += "<font>GSTIN : " + res.InvoiceDetails[0].GSTIN + " </font><br/><font>PO Number : </font><br/><font>State : " + res.InvoiceDetails[0].State + "</font></br><font>State Code : " + res.InvoiceDetails[0].StateId + "</font></br><font>Place of supply : Same as Billing Address</font></td>";
                invoiceData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
                invoiceData += "padding-right:20px; padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";
                invoiceData += "<td align='center' valign='top' height='150' style='color: #000; font-size:13px; text-align:right;";
                invoiceData += "padding-top:17px; line-height:23px;'><font style='font-weight:bold; font-size:17px;'>";
                invoiceData += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font><br/> ";
                invoiceData += "</td></tr></table></td></tr>";
                //invoiceData += "<tr><td valign='top' height='120' style='color: #000; font-size:13px;";
                //invoiceData += "text-align:left; padding-top:20px; line-height:23px;   ";
                //invoiceData += "border-bottom: 1px solid #EEE;'><font style='font-weight:bold; font-size:17px;'>";
                //invoiceData += "Shipping Details</font><br/><br/> YGOY INC, 310 GreenFields Road Bridge Water, Bridge Water, NJ 08807, US</td></tr>";
                invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:center; padding-top:20px;";
                invoiceData += "padding-left:20px; line-height:23px; '> ";
                invoiceData
                invoiceData += MetadataProcessingForPdfDownload(res.InvoiceDetails[0].Metadata, billMode, isBillGenerated, res.ServiceProperties);
                invoiceData += "</td></tr><tr><td align='center' valign='top' ><table align='center' valign='top' cellpadding='0'";
                invoiceData += "cellspacing='0' border='0' width='900' height='150' style=' padding-bottom:0px; padding-top:40px;";
                invoiceData += "border-bottom: 1px solid #EEE;'><tr><td align='center' valign='top' height='150' style='color: #000;";
                invoiceData += "font-size:13px; text-align:left; line-height:23px;'><font style='font-weight:bold;";
                invoiceData += "font-size:17px;'>Account Manager Details</font><br/>";
                invoiceData += "<font style='font-weight:bold;'>Name : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].AccountManagerName + "</font>";
                invoiceData += "</font><br/><font style='font-weight:bold;'>Number : <font style='color: #000; font-weight:normal'>";
                invoiceData += res.InvoiceDetails[0].AccountManagerMobile + "</font></font><br/><font style='font-weight:bold;'>Email : ";
                invoiceData += "<font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].AccountManagerEmail + "</font></font></td>";
                var CurrencyName = res.InvoiceDetails[0].CurrencyName;
                invoiceData += "<td valign='top' height='150' style='color: #000; font-size:13px;line-height:23px;text-align:right'>";
                invoiceData += "<font style='font-weight:bold;'>Sub - Total amount : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font><br/>";
                
                if (res.InvoiceDetails[0].CountryId == 108) {
                    invoiceData += "<font style='font-weight:bold;'>CGST : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].CGST + '(' + CurrencyName + ')' + "</font></font><br/>";
                    invoiceData += "<font style='font-weight:bold;'>SGST : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].SGST + '(' + CurrencyName + ')' + "</font></font><br/><font style='font-weight:bold;'>IGST : ";
                    invoiceData += "<font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].IGST + '(' + CurrencyName + ')' + "</font></font><br/><font style='font-weight:bold;'>Grand Total : ";
                    invoiceData += "<font style='color: #000; font-weight:normal'>" + (parseFloat(res.InvoiceDetails[0].Amount) + parseFloat(res.InvoiceDetails[0].Tax)) + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-20px;'>Bank Account Details: </font>";
                    invoiceData += '</br><font align="left"  style="margin-left:-20px;">Please make your payments In Favour of "SISRB TECHNOLOGIES PVT LTD"</font></br>';
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='900' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-20px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td><b>Kotak Mahindra Bank Ltd</b></td><td><b>ICICI Bank Ltd</b></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>05522000002309</td><td>004005017615</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>Somajiguda Branch (Hyderabad, India)</td><td>Madhapur Branch (Hyderabad, India)</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>6-3-110-9/1, Block A, Jewel Pavani Towers,<br/>Somajiguda, Hyderabad, India -500082</td><td>ICICI Bank Ltd, Stone Ridge Center, Opp: Google,<br/>Main Road, Kondapur, Hyderabad – 500033, Telangana, India</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>RTGS/NEFT/IFSC CODE:</b></td><td>KKBK0000552</td><td>ICIC0000040</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>MICR CODE:</b></td><td>500485003</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Name: </b></td><td>SISRB TECHNOLOGIES PVT LTD</td><td>	SISRB TECHNOLOGIES PVT LTD</td></tr>";
                    invoiceData += "</table>";
                    //invoiceData += "<font style='margin-left:-20px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.InvoiceDetails[0].CountryId == 241) {
                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>Bank OF AMERICA</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>South Plainfield Bank</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Ultimate Beneficiary:</b></td><td>YGOY INC</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>YGOY address: </b></td><td>310 Greenfield road,Bridge water, NJ 08807, US</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Operating Business Account No: </b></td><td>381028090258</td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>For Direct Deposit And Automatic : </b></td><td>021200339 (paper & electronic)</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number : </b></td><td>026009593</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BOFAUS3N</td><td></td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.InvoiceDetails[0].CountryId == 105) {
                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>HSBC Bank</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>400-477170-838</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Code:</b></td><td>400</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Code: Swift code:</b></td><td>HSBCHKHHHKH</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Drawn in favour of:</b></td><td>SMSCountry Networks (HK) Ltd.</td><td></td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.InvoiceDetails[0].CountryId == 239) {
                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>RAK Bank</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>0332014346001</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>RAK Bank</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>1531, UMM Hurair Branch, Dubai, UAE.</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>NRAKAEAK</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>AE530400000332014346001</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>SMS Country Network LLC</td><td></td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.InvoiceDetails[0].CountryId == 19) {
                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>BBK</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>100000355338</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>BBK Bank,Qudhaibiya,Bahrain</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>43 Government Avenue, P.O Box:597,Manama,Kingdom of Bahrain</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BBKUBHBM</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>BH78BBKU00100000355338</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>SMS Country Networks Co. W.L.L</td><td></td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
                }
                else if (res.InvoiceDetails[0].CountryId == 199) {
                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left	; padding-top:20px;padding-left:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>National Commercial Bank</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td>08665479000100</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>Saihat-086</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Address:</b></td><td>Gulf Road, Saihat, KSA</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>NCBKSAJE</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>IBAN NO: </b></td><td>SA7610000008665479000100</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Account Title: </b></td><td>Muassasat Balad Alrrasayil Alttijaria</td><td></td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";
                }
                else {
                    invoiceData += "<font style='font-weight:bold;'>Grand Total : <font style='color: #000; font-weight:normal'>" + res.InvoiceDetails[0].Amount + '(' + CurrencyName + ')' + "</font></font></td></tr></table></td></tr>";
                    invoiceData += "<tr><td align='left' valign='top' style='color: #000; font-size:13px; text-align:left; padding-top:20px; line-height:23px;'> ";
                    invoiceData += "<font align='left'  style='font-weight:bold;font-size:17px;margin-left:-5px;'>Bank Account Details: </font>";
                    invoiceData += "<table align='center' valign='top' cellpadding='0' cellspacing='0' width='100%' style=' margin-bottom:20px;border-collapse: collapse;border-left: 1px solid black;border-right: 1px solid black; border-bottom: 1px solid black;border-top: 1px solid black;";
                    invoiceData += "margin-top:20px; text-align:left;margin-left:-5px;'>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td width='180px;'><b>Bank Name:</b></td><td>Bank OF AMERICA</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Current Account No:</b></td><td></td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Branch Name:</b></td><td>South Plainfield Bank</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Bank Address:</b></td><td>900 Oak Tree Ave, South Plainfield NJ 07080</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Ultimate Beneficiary:</b></td><td>YGOY INC</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>YGOY address: </b></td><td>310 Greenfield road,Bridge water, NJ 08807, US</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Operating Business Account No: </b></td><td>381028090258</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>For Direct Deposit And Automatic : </b></td><td>021200339 (paper & electronic)</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>Payments Use Routing Number (RTN)<br/>FOR Wire Transfer Use routing number : </b></td><td>026009593</td><td></td></tr>";
                    invoiceData += "<tr style='border-bottom: 1px solid black;'><td><b>SWIFT CODE:</b></td><td>BOFAUS3N</td><td></td></tr>";
                    invoiceData += "</table>";
                    invoiceData += "<font style='margin-left:-7px;'>Note: Validity 6 Months only.</font>";

                }
                invoiceData += "</td></tr></table>";
                invoiceData += "</div></body></html>";
            }
        },
        error: function (res) {
            alert("error");
        }
    });


    var fileName = "Invoice_" + invoiceId;
    $.ajax({
        url: "/AjaxHandlers/Html2Pdf.ashx",
        async: false,
        dataType: "json",
        type: "post",
        data: {
            Html: encodeURIComponent(invoiceData),
            FileName: fileName,
            FilePath: folderPath
        },
        success: function (res) {
            if (res.Success == true) {
                var pdfLocation = $("#hdnWebUrl").val() + "/Attachments/" + res.FilePath;
                var a = document.createElement('a');
                a.href = pdfLocation;
                a.download = res.FilePath;
                if (isEmailGenerated == true) {
                    FilePath = res.FilePath;
                } else {
                    document.body.appendChild(a);
                    a.click();
                }
            }
        }, error: function (res) {
        }
    });
    if (isEmailGenerated == true)
        return FilePath;
}

function AddParameter(form, name, value) {
    var $input = $("<input />").attr("type", "hidden")
                            .attr("name", name)
                            .attr("value", value);
    form.append($input);
}

function find_in_object(my_object, my_criteria) {

    return my_object.filter(function (obj) {
        return Object.keys(my_criteria).every(function (c) {
            return obj[c] == my_criteria[c];
        });
    });

}