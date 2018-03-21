<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GoogleLoginCallBack.aspx.cs" Inherits="Orders.GoogleLoginCallBack" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
     <script type="text/javascript" language="javascript">
            try {
                // First, parse the query string
                var params = {}, queryString = location.hash.substring(1),
                regex = /([^&=]+)=([^&]*)/g, m;
                while (m = regex.exec(queryString)) {
                    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                }
                var ss = queryString.split("&")
                console.log(ss);
                if (localStorage.getItem('AbsolutePath') != null || localStorage.getItem('AbsolutePath') != "")
                {
                    var url = "LoginWithGoogle.aspx?" + ss[1] + "&AbsolutePath=" + localStorage.getItem('AbsolutePath');
                }
                else {
                    var url = "LoginWithGoogle.aspx?" + ss[1] + "&AbsolutePath='' ";
                }
              
                window.location = url


            } catch (exp) {
                alert(exp.message + " here 1");
            }
        </script>
   
    </div>
    </form>
</body>
</html>
