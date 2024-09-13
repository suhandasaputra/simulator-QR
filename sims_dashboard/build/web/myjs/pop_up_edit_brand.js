//open popup provide password
$('#table_brand').on('click', 'td', function () {
    var $row = $(this).closest("tr");
    var brand_id = $row.find(".brand_id").text();
//    var brand_name = $row.find(".brand_name").text();

    var datjson = new Object();
    datjson.brand_id = brand_id;
//    datjson.brand_name = brand_name;
    datjson.user_id = window.localStorage.getItem('user_id');
    $.ajax({
        dataType: "json",
        url: "GetDetailBrand",
        data: JSON.stringify(datjson),
        type: 'POST',
        success: function (resp) {
            if (resp.resp_code == 0000) {
                document.getElementById("brand_id_edit_brand").value = resp.brand_id;
                document.getElementById("brand_name_edit_brand").value = resp.brand_name;
                $('.cd-popup-edit-brand').addClass('is-visible');
            } else {
                alert('Failed get Detail Brand : ' + resp.resp_desc);
            }
        }
    });
});

jQuery(document).ready(function ($) {
    //close popup provide password
    $('.cd-popup-edit-brand').on('click', function (event) {
        if ($(event.target).is('.cd-popup-edit-brand-close') || $(event.target).is('.cd-popup-edit-brand')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-edit-brand').removeClass('is-visible');
        }
    });
});



function sub_edt_brand() {
    var brand_id = document.getElementById("brand_id_edit_brand").value;
    var brand_name = document.getElementById("brand_name_edit_brand").value;

    var modal = document.getElementById("myModal_add_brand");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_brand");


    if (brand_id == "") {
        push.innerHTML = "<p>email must be filled</p>";
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
        if (brand_name == "") {
            push.innerHTML = "<p>brand name must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (brand_name != "") {


            var datjson = new Object();

            datjson.user_id = window.localStorage.getItem('user_id');
            datjson.brand_id = brand_id;
            datjson.brand_name = brand_name;

            $.ajax({
                dataType: "json",
                url: "EditBrand",
                data: JSON.stringify(datjson),
                type: 'post',
                success: function (response) {
                    if (response.resp_code == 0000) {
                        loaddata();
                        alert('success edit brand');
                        $('.cd-popup-edit-brand').removeClass('is-visible');
                        $("#form_box4")[0].reset();
                    } else {
                        alert('Failed edit brand : ' + response.resp_desc);
                    }
                }
            });
        }
    }
}

function sub_del_brand() {
    var brand_id = document.getElementById("brand_id_edit_brand").value;

    if (brand_id == "") {
        push.innerHTML = "<p>brand must be fill</p>";
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

        var datjson = new Object();
        datjson.brand_id = brand_id;
        datjson.user_id = window.localStorage.getItem('user_id');

        $.ajax({
            dataType: "json",
            url: "DeleteBrand",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Delete Brand');
                    location.reload();
                } else {
                    alert('Failed Delete Brand');
                }
            }
        });
    }
}