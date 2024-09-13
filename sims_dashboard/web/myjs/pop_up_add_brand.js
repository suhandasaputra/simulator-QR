jQuery(document).ready(function ($) {
    //open popup provide password
    $('#add_brand').on('click', function () {
        $('.cd-popup-add-brand').addClass('is-visible');
    });

    //close popup provide password
    $('.cd-popup-add-brand').on('click', function (event) {
        if ($(event.target).is('.cd-popup-add-brand-close') || $(event.target).is('.cd-popup-add-brand') || $(event.target).is('#btn_cancel')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-add-brand').removeClass('is-visible');
        }
    });
});


function sub_out() {
    var brand_id = document.getElementById("brand_id").value;
    var brand_name = document.getElementById("brand_name").value;

    var modal = document.getElementById("myModal_add_brand");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_brand");


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
                url: "AddBrand",
                data: JSON.stringify(datjson),
                type: 'post',
                success: function (response) {
                    if (response.resp_code == 0000) {
                        loaddata();
                        alert('success add brand');
                        $('.cd-popup-add-brand').removeClass('is-visible');
                        $("#form_box4")[0].reset();
                    } else {
                        alert('Failed add brand : ' + response.resp_desc);
                    }
                }
            });
        }
    }
}






