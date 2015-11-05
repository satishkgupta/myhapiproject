var http = createRequestObject();
var areal = Math.random() + "";
var real = areal.substring(2,6);

function createRequestObject() {
  var xmlhttp;
  try { xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); }
  catch(e) {
    try { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
    catch(f) { xmlhttp=null; }
  }
  if(!xmlhttp&&typeof XMLHttpRequest!="undefined") {
    xmlhttp=new XMLHttpRequest();
  }
  return  xmlhttp;
}

function sendRequest() {
  var rnd = Math.random();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;
  var message = document.getElementById("message").value;
  var response =  "<b>Dear ".concat(name).concat(",<br><br>Your message has been sent!<br>We`ll get back to you soon, normally this is within a few hours.<br><br>CarePhysio Team</b>");
  
  try{
  $.ajax({
      type: 'POST',
      url: 'http://www.physioncare.com/schedule',
      data: {"Name":name,"phoneNumber":mobile,"address":message,"email":email},
      dataType: 'application/json',
      //success: function(data) { 
      // alert("POSTED SUCCESSFULLY TO THE SERVER");
      // $('#subscribePage').html('<h1>POSTED</h1>');     
      //} // Success Function
      });   // Ajax Call
  }
  catch(e){}
  finally{}

  alert('Yippee! Your message has been sent. We`ll get back to you soon, normally this is within a few hours.');
    document.getElementById("confirmation").innerHTML = response;
    document.getElementById("confirmation").style.display ="";
    document.getElementById("confirmation").style.color ="white";
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("mobile").value="";
    document.getElementById("message").value="";
    //document.getElementById("submit").disabled=false;
  //document.getElementById("submit").value='SEND MESSAGE';
}

function check_values() {
  var valid = '';
  
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;
  var message = document.getElementById("message").value;
  var regexp = /^\d{10}$/;

    if (!trim(name)) {
        alert('Please enter your Name!')
        document.getElementById("name").focus();
    document.getElementById("name").select();
        return false
    } 

    if (!trim(email)) {
        alert('Please enter your E-Mail address!')
        document.getElementById("email").focus();
    document.getElementById("email").select();
        return false
    }

    if (!isEmail(email)) {
        alert("Entered E-Mail appears to be invalid!")
        document.getElementById("email").focus();
    document.getElementById("email").select();
      return false
    }

    if (!trim(mobile)) {
        alert('Please enter your 10 digit Mobile Number!')
        document.getElementById("mobile").focus();
    document.getElementById("mobile").select();
        return false
    } 

    if (!mobile.match(regexp)){
        alert('Please enter 10 digit Mobile Number. Example - 9876543210. No need to add country code in the beginning.')
        document.getElementById("mobile").focus();
    document.getElementById("mobile").select();
        return false
    }

    if (!trim(message)) {
        alert('Please enter your Message!')
        document.getElementById("message").focus();
    document.getElementById("message").select();
        return false
    } else{
      //document.getElementById("submit").disabled=true;
    //document.getElementById("submit").value='Please Wait..';
    sendRequest();
    }

}

function handleResponse() {
  try{
    if((http.readyState == 4)&&(http.status == 200)){
      var response = http.responseText;
      document.getElementById("confirmation").innerHTML = response;
      document.getElementById("confirmation").style.display ="";
    }
  }
  catch(e){}
  finally{}
}

function isUndefined(a) {
   return typeof a == 'undefined';
}

function trim(a) {
  return a.replace(/^s*(S*(s+S+)*)s*$/, "$1");
}

function isEmail(a) {
   return (a.indexOf(".") > 0) && (a.indexOf("@") > 0);
}