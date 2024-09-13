/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


jQuery(document).ready(function ($) {
//                $.getJSON('OptionUsaha', function (data) {
//                    var options = '<option disabled="" selected="" value="">Business Sector</option>';
//                    for (var i = 0; i < data.length; i++) {
//                        options += '<option value="' + data[i].id_usaha + '">' + data[i].usaha_desc + '</option>';
//                    }
//                    $("select#bidang_usaha").html(options);
//                });

    $.ajax({
        dataType: "json",
        url: "OptionUsaha",
        type: 'POST',
        success: function (response) {
            if (response.resp_code == 0000) {
                var ff = new Object();
                ff = response.list;
                var options = '<option disabled="" selected="" value="">Business Sector</option>';
                for (var i = 0; i < ff.length; i++) {
                    options += '<option value="' + ff[i].id_usaha + '">' + ff[i].usaha_desc + '</option>';
                }
                $("select#bidang_usaha").html(options);
            } else {
                alert('Failed get bidang usaha : ' + response.resp_desc);
            }
        }
    });

});

function signup() {
    var bidang_usaha = document.getElementById("bidang_usaha").value;
    var username = document.getElementById("username").value;
//                var position = document.getElementById("position").value;
    var jumlah = document.getElementById("jumlah").value;
    var companyname = document.getElementById("companyname").value;
    var phonenumber = document.getElementById("phonenumber").value;
    var email = document.getElementById("email").value;

    var pass = document.getElementById("pass").value;
    var cpas = document.getElementById("cpass").value;
//                var agree = document.getElementById("cb").checked;

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text");
    ;
    if (bidang_usaha == "") {
        push.innerHTML = "<p>Select Category Please</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (bidang_usaha != "") {
        if (username == "") {
            push.innerHTML = "<p>Username must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (username != "") {
//                        if (position == "") {
//                            push.innerHTML = "<p>Position must be filled</p>";
//                            modal.style.display = "block";
//                            span.onclick = function () {
//                                modal.style.display = "none";
//                            }
//                            window.onclick = function (event) {
//                                if (event.target == modal) {
//                                    modal.style.display = "none";
//                                }
//                            }
//                        } else if (position != "") {
            if (jumlah == "") {
                push.innerHTML = "<p>Number of employee must be filled</p>";
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            } else if (jumlah != "") {
                if (companyname == "") {
                    push.innerHTML = "<p>Company name must be filled</p>";
                    modal.style.display = "block";
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                } else if (companyname != "") {
                    if (phonenumber == "") {
                        push.innerHTML = "<p>Phonenumber must be fill</p>";
                        modal.style.display = "block";
                        span.onclick = function () {
                            modal.style.display = "none";
                        }
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                    } else if (phonenumber != "") {
                        if (email == "") {
                            push.innerHTML = "<p>Email must be fill</p>";
                            modal.style.display = "block";
                            span.onclick = function () {
                                modal.style.display = "none";
                            }
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }
                        } else if (email != "") {
                            if (pass == "") {
                                push.innerHTML = "<p>Password must be fill</p>";
                                modal.style.display = "block";
                                span.onclick = function () {
                                    modal.style.display = "none";
                                }
                                window.onclick = function (event) {
                                    if (event.target == modal) {
                                        modal.style.display = "none";
                                    }
                                }
                            } else if (pass != "") {
                                if (cpas == "") {
                                    push.innerHTML = "<p>Confirm Password must be fill</p>";
                                    modal.style.display = "block";
                                    span.onclick = function () {
                                        modal.style.display = "none";
                                    }
                                    window.onclick = function (event) {
                                        if (event.target == modal) {
                                            modal.style.display = "none";
                                        }
                                    }
                                } else if (cpas != "") {
                                    if (pass != cpas) {
                                        push.innerHTML = "<p>Password Not Match</p>";
                                        modal.style.display = "block";
                                        span.onclick = function () {
                                            modal.style.display = "none";
                                        }
                                        window.onclick = function (event) {
                                            if (event.target == modal) {
                                                modal.style.display = "none";
                                            }
                                        }
                                    } else if (pass == cpas) {
//                                                        if (agree == false) {
//                                                            push.innerHTML = "<p>term and condition must be checked</p>";
//                                                            modal.style.display = "block";
//                                                            span.onclick = function () {
//                                                                modal.style.display = "none";
//                                                            }
//                                                            window.onclick = function (event) {
//                                                                if (event.target == modal) {
//                                                                    modal.style.display = "none";
//                                                                }
//                                                            }
//                                                        } else if (agree == true) {
                                        var datjson = new Object();

                                        datjson.bidang_usaha = bidang_usaha;
                                        datjson.username = username;
//                                                        datjson.position = position;
                                        datjson.jumlah = jumlah;
                                        datjson.companyname = companyname;
                                        datjson.phonenumber = phonenumber;
                                        datjson.email = email;
                                        datjson.pass = pass;
                                        $.ajax({
                                            contentType: 'application/json',
                                            dataType: "json",
                                            url: "SignUp",
                                            data: JSON.stringify(datjson),
                                            type: 'post',
                                            success: function (response) {
                                                if (response.resp_code == 0000) {
                                                    window.location.href = "ho";
                                                    alert('Success Create Account ' + email);
                                                } else if (response.resp_code == 0002) {
                                                    alert('Duplicate User ID ' + email);
                                                } else {
                                                    alert('Failed Create User ID ' + email);
                                                }
                                            }
                                        });
//                                                        }
//                                                    }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}