var currentTab = 0; // Current tab is set to be the first tab (0)

jQuery(document).ready(function ($) {


    var level_desc = window.localStorage.getItem('level_desc');
    if (level_desc !== 'admin') {
        document.getElementById('add_employee').style.visibility = 'hidden';
        document.getElementById('add_employee').style.display = 'none';
    }
    //open popup add employee
    $('#add_employee').on('click', function () {

        $.ajax({
            dataType: "json",
            url: "OptionUsaha",
            type: 'POST',
            success: function (response) {
                if (response.resp_code == 0000) {
                    var ff = new Object();
                    ff = response.list;
                    var options = '<option disabled="" selected="" value="">Bidang Usaha</option>';
                    for (var i = 0; i < ff.length; i++) {
                        options += '<option value="' + ff[i].id_usaha + '">' + ff[i].usaha_desc + '</option>';
                    }
                    $("select#bidang_usaha").html(options);
                    $('.cd-popup-add-user').addClass('is-visible');
                } else {
                    alert('Failed get bidang usaha : ' + response.resp_desc);
                }
            }
        });



        //close popup provide password
        $('.cd-popup-add-user').on('click', function (event) {
            if ($(event.target).is('.cd-popup-add-user-close') || $(event.target).is('.cd-popup-add-user') || $(event.target).is('#btn_cancel')) {
                event.preventDefault();
                $(this).removeClass('is-visible');
            }
        });
        //close popup when clicking the esc keyboard button provide password
        $(document).keyup(function (event) {
            if (event.which == '27') {
                $('.cd-popup-add-user').removeClass('is-visible');
            }
        });
    });

});

function validateEmail(email) {
    // A simple email validation function using a regular expression
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function sub_out() {
    var merchant_id = document.getElementById("merchant_id").value;
    var merchant_name = document.getElementById("merchant_name").value;
    var bidang_usaha = document.getElementById("bidang_usaha").value;
    var phone_number = document.getElementById("phone_number").value;

    var modal = document.getElementById("myModal_add_user");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_user");


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
        if (merchant_name == "") {
            push.innerHTML = "<p>merchant_name must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (merchant_name != "") {
            if (bidang_usaha == "") {
                push.innerHTML = "<p>bidang usaha must be filled</p>";
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
                if (phone_number == "") {
                    push.innerHTML = "<p>phone numebr must be filled</p>";
                    modal.style.display = "block";
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                } else if (phone_number != "") {
                    var datjson = new Object();
                    datjson.merchant_id = merchant_id;
                    datjson.user_id = window.localStorage.getItem('user_id');
                    datjson.merchant_name = merchant_name;
                    datjson.bidang_usaha = bidang_usaha;
                    datjson.phone_number = phone_number;
                    $.ajax({
                        dataType: "json",
                        url: "AddEmployee",
                        data: JSON.stringify(datjson),
                        type: 'post',
                        success: function (response) {
                            if (response.resp_code == 0000) {
                                loaddata();
                                alert('success add merchant');
                                $('.cd-popup-add-user').removeClass('is-visible');
                                $("#form_box4")[0].reset();
                            } else {
                                alert('Failed add user : ' + response.resp_desc);
                            }
                        }
                    });


                }
            }
        }
    }
}