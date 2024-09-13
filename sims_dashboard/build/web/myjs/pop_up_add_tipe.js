jQuery(document).ready(function ($) {
    //open popup provide password
    $('#add_tipe').on('click', function () {
        console.log('viji');
        var user_id = window.localStorage.getItem('user_id');
        var datjson = new Object();
        datjson.user_id = user_id;
        $.ajax({
            dataType: "json",
            url: "OptionBrand",
            data: JSON.stringify(datjson),
            type: 'POST',
            success: function (response) {
                if (response.resp_code == 0000) {
                    var aa = new Object();
                    aa = response.list;
                    var options = '<option selected disabled value="">Select Brand</option>';
                    for (var i = 0; i < aa.length; i++) {
                        options += '<option value="' + aa[i].brand_id + '">' + aa[i].brand_name + '</option>';
                    }
                    $("select#brand_id").html(options);
                    $('.cd-popup-add-tipe').addClass('is-visible');
                } else {
                    alert('Failed get Brand : ' + response.resp_desc);
                }
            }
        });
    });

    //close popup provide password
    $('.cd-popup-add-tipe').on('click', function (event) {
        if ($(event.target).is('.cd-popup-add-tipe-close') || $(event.target).is('.cd-popup-add-tipe') || $(event.target).is('#btn_cancel')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-add-tipe').removeClass('is-visible');
        }
    });
});


function sub_out() {
    var brand_id = document.getElementById("brand_id").value;
    var device_type = document.getElementById("device_type").value;

    var modal = document.getElementById("myModal_add_tipe");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_tipe");


    if (brand_id == "") {
        push.innerHTML = "<p>brand id must be filled</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (brand_id != "") {
        if (device_type == "") {
            push.innerHTML = "<p>tipe must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (device_type != "") {
            var datjson = new Object();
            datjson.user_id = window.localStorage.getItem('user_id');
            datjson.brand_id = brand_id;
            datjson.device_type = device_type;
            $.ajax({
                dataType: "json",
                url: "AddTipe",
                data: JSON.stringify(datjson),
                type: 'post',
                success: function (response) {
                    if (response.resp_code == 0000) {
                        loaddata();
                        alert('success add tipe');
                        $('.cd-popup-add-tipe').removeClass('is-visible');
                        $("#form_box4")[0].reset();
                    } else {
                        alert('Failed add tipe : ' + response.resp_desc);
                    }
                }
            });
        }
    }
}






