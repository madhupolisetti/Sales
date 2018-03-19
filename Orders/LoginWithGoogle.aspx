<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginWithGoogle.aspx.cs" Inherits="AdminUI.LoginWithGoogle" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Login</title>    
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,sales600,700&subset=all" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link href="CssFiles/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/global/css/custom.css" rel="stylesheet" />
    <link href="CssFiles/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/CssFiles/simple-line-icons.min.css" rel="stylesheet" />
    <style type="text/css">
        body
        {
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #f5f5f5;
            background:url(images/bg3.jpg);
            background-size:cover;
        }
        
        .form-signin
        {
            max-width: 300px;
            padding: 19px 29px 29px;
            margin: 0 auto 20px;
            background-color: #fff;
            border: 1px solid #e5e5e5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
            -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
            box-shadow: 0 1px 2px rgba(0,0,0,.05);
        }
        .form-signin .form-signin-heading, .form-signin .checkbox
        {

            margin-bottom: 10px;
        }
        .form-signin input[type="text"], .form-signin input[type="password"]
        {
            font-size: 16px;
            height: auto;
            margin-bottom: 15px;
            padding: 7px 9px;
        }
       
    </style>
</head>
<body class="login">
   
            
            <div class="content text-center">
                <img src="images/sms-logo.png" alt="logo" style="margin-top:20px;" />
        <form id="Form2" class="login-form" method="POST" runat="server">
        <h4 class="form-signin-heading margin-top-25 text-center" style="margin-bottom:30px;">
            Sign in using smscountry gmail account</h4>
            <asp:HiddenField runat="server" id="hdnRedirectUrl" value='<%# RedirectUrl %>'/>
        <asp:HyperLink runat="server" ID="LoginNavigator" class="btn btn-primary" Width="100%"> <i class="glyphicon glyphicon-log-in margin-right-5"></i> Login</asp:HyperLink>
        <asp:Label ID="Label1" runat="server"></asp:Label>
            <br /><br />
        </form>
                </div>
            
   
    <div>
    </div>
</body>
</html>