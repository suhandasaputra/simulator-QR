jQuery(document).ready(function ($) {
    //open popup provide password
    $('#add_terminal').on('click', function () {
        var user_id = window.localStorage.getItem('user_id');
        var datjson = new Object();
        datjson.user_id = user_id;


        $.ajax({
            dataType: "json",
            url: "OptionDeviceType",
            data: JSON.stringify(datjson),
            type: 'POST',
            success: function (response) {
                if (response.resp_code == 0000) {
                    
                    var aa = new Object();
                    aa = response.list;
                    var options = '<option selected disabled value="">Select Merchant</option>';
                    for (var i = 0; i < aa.length; i++) {
                        options += '<option value="' + aa[i].tipe_id + '">' + aa[i].device_type + '</option>';
                    }
                    $("select#device_type").html(options);
                    $('.cd-popup-add-terminal').addClass('is-visible');
                    
                    
                    
                    
                    
                    
                    
                    

                } else {
                    alert('Failed get account level : ' + response.resp_desc);
                }
            }
        });
    });

    //close popup provide password
    $('.cd-popup-add-terminal').on('click', function (event) {
        if ($(event.target).is('.cd-popup-add-terminal-close') || $(event.target).is('.cd-popup-add-terminal') || $(event.target).is('#btn_cancel')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-add-terminal').removeClass('is-visible');
        }
    });
});


function sub_out() {
    var merchant_id = document.getElementById("merchant_id").value;
    var account_email = document.getElementById("account_email").value;
    var account_name = document.getElementById("account_name").value;
    var account_level = document.getElementById("account_level").value;
    var password = document.getElementById("password").value;

    var modal = document.getElementById("myModal_add_terminal");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_terminal");


    if (merchant_id == "") {
        push.innerHTML = "<p>merchant_id must be filled</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (merchant_id != "") {
        if (account_email == "") {
            push.innerHTML = "<p>terminal email must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (account_email != "") {
            if (account_name == "") {
                push.innerHTML = "<p>terminal name must be filled</p>";
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            } else if (account_name != "") {
                if (account_level == "") {
                    push.innerHTML = "<p>account level must be filled</p>";
                    modal.style.display = "block";
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                } else if (account_level != "") {
                    if (password == "") {
                        push.innerHTML = "<p>password must be filled</p>";
                        modal.style.display = "block";
                        span.onclick = function () {
                            modal.style.display = "none";
                        }
                        window.onclick = function (event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                    } else if (password != "") {
                        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        if (account_email.match(mailformat)) {
                            var datjson = new Object();
                            datjson.merchant_id = merchant_id;
                            datjson.terminal_id = window.localStorage.getItem('terminal_id');
                            datjson.account_email = account_email;
                            datjson.account_name = account_name;
                            datjson.account_level = account_level;
                            datjson.password = password;
                            $.ajax({
                                dataType: "json",
                                url: "AddTerminal",
                                data: JSON.stringify(datjson),
                                type: 'post',
                                success: function (response) {
                                    if (response.resp_code == 0000) {
                                        loaddata();
                                        alert('success add terminal');
                                        $('.cd-popup-add-terminal').removeClass('is-visible');
                                        $("#form_box4")[0].reset();
                                    } else {
                                        alert('Failed add terminal : ' + response.resp_desc);
                                    }
                                }
                            });
                        } else {
                            push.innerHTML = "<p>Email not valid</p>";
                            modal.style.display = "block";
                            span.onclick = function () {
                                modal.style.display = "none";
                            };
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

