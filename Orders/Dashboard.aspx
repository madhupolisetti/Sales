<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="Orders.Dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <link href="JsFiles/DateTimePicker/daterangepicker-bs3.css" rel="stylesheet" />
    <style>
        
        .modal-backdrop{
            z-index:1099999;
        }
        .modal{
            z-index: 100599999;
        }
        #notfound {
  position: relative;
  height: 70vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

.notfound {
  /*max-width: 520px;*/
  width: 100%;
  line-height: 1.4;
  text-align: center;
}

.notfound .notfound-404 {
  position: relative;
  height: 200px;
  margin: 0px auto 0px;
  z-index: -1;
}

.notfound .notfound-404 h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 35px;
  font-weight: 600;
  margin: 0px;
  color: #211b19;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

.notfound .notfound-404 h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 400;
  text-transform: uppercase;
  color: #211b19;
  background: #fff;
  padding: 10px 5px;
  margin: auto;
  display: inline-block;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}

.notfound a {
  font-family: 'Montserrat', sans-serif;
  display: inline-block;
  font-weight: 500;
  text-decoration: none;
  color: #fff;
  text-transform: uppercase;
  padding: 13px 23px;
  background: #ff6300;
  font-size: 18px;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.notfound a:hover {
  color: #ff6300;
  background: #211b19;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 h1 {
    font-size: 148px;
  }
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 {
    height: 148px;
    margin: 0px auto 10px;
  }
  .notfound .notfound-404 h1 {
    font-size: 86px;
  }
  .notfound .notfound-404 h2 {
    font-size: 16px;
  }
  .notfound a {
    padding: 7px 15px;
    font-size: 14px;
  }
}


    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">
            <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h3>Dashboard</h3>
                        <h1>This Page is Under Construction!!</h1>
                    </div>
                    
                    <div id="NavigatePages">
                        <a href="Quotations.aspx" style="margin-right:10px;">Go TO Quotations</a>

                        <a href="Invoices.aspx" style="margin-left:10px;">Go TO Invoices</a>
                    </div>

                </div>
                
            </div>
            

            <div id="MetaData"></div>
        </div>
   
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            $("#lable_href_name").html('Dashboard');
        })
    </script>
</asp:Content>
