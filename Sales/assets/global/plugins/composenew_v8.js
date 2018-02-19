var dtCh = "/";
var now = new Date;
var month = now.getMonth() + 1;
var day = now.getDate();
var year = now.getFullYear();
var currmonth = now.getMonth() + 1;
var currday = now.getDate() - 1;
var curryear = now.getFullYear();
var dtCh = "/";
var minYear = year;
var maxYear = 2020;
var preferred_languge = $('#preferred_Lang').val();
console.log(preferred_languge);
var groups, invalidgroups, scheduled = 0, pagesize = 20, cur_gid = 0, isuploaded = 0; sms = 0; phbook1 = 0; phbook2 = 0; repeat_duration = 0; repeat: 0; reminderid = 0;

var transliterationControl;
google.load("elements", "1", { packages: "transliteration" });

function onLoad() {
    var a = {
        sourceLanguage: "en",
        destinationLanguage: ["te", "hi", "kn", "ml", "ta", "ar", "ur", "ti", "sr", "si", "ru", "sa", "pa", "fa", "or", "ne", "mr", "gu", "el", "zh", "bn", "am"],
        transliterationEnabled: false,
        shortcutKey: "ctrl+g"
    };
    transliterationControl = new google.elements.transliteration.TransliterationControl(a);
    transliterationControl.makeTransliteratable(["txtmessage", "custxtmsg"]);
    transliterationControl.addEventListener(google.elements.transliteration.TransliterationControl.EventType.SERVER_UNREACHABLE, serverUnreachableHandler);
    transliterationControl.addEventListener(google.elements.transliteration.TransliterationControl.EventType.SERVER_REACHABLE, serverReachableHandler)
}
function serverUnreachableHandler(a) { document.getElementById("errorDiv").innerHTML = "Transliteration Server unreachable"; }
function serverReachableHandler(a) { document.getElementById("errorDiv").innerHTML = ""; }
google.setOnLoadCallback(onLoad);

$(document).ready(function () {

    $('#msgtype_list').change(function () {
        var t = $(this).val();       
        var str = "";
        $("#msgtype_list option:selected").each(function () {
            str += $(this).text() + " ";
        });
        if ((t == 1) || (t == 32)) {
            $('#note').html("");
            $('#MsgType').val(t); transliterationControl.disableTransliteration();
        }
        else if (t == 0) { $('#MsgType').val("2"); transliterationControl.disableTransliteration(); }
        else {
            $('#MsgType').val("2");
            $('#note').html("Please write in English it will be automatically converted into " + str);
            transliterationControl.enableTransliteration();
            transliterationControl.setLanguagePair(google.elements.transliteration.LanguageCode.ENGLISH, t)
        }
    });

    $('#txtmessage,#custxtmsg').bind('focusin', function () {
        var t = $('#msgtype_list').val();
        var t1 = $('#Select2 option:selected').val();
        if (t1 == 32) {
            t = 32;
            $("#msgtype_list").prop("disabled", true);
        }
        else {
            $("#msgtype_list").prop("disabled", false);
        }
        if ((t == 1) || (t == 32)) {
            $('#MsgType').val(t);
            transliterationControl.setLanguagePair(google.elements.transliteration.LanguageCode.ENGLISH, 'te');
            transliterationControl.disableTransliteration();
        }
        else if (t == 0) { $('#MsgType').val("2"); transliterationControl.disableTransliteration(); }
        else {
            $('#MsgType').val("2");
            transliterationControl.makeTransliteratable(["txtmessage", "custxtmsg"]);
            transliterationControl.enableTransliteration();
            transliterationControl.setLanguagePair(google.elements.transliteration.LanguageCode.ENGLISH, t)
        }
    });
});
  
 
  
   
 
   
	
	
	
	