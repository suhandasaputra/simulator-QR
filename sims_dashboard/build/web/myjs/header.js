/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


jQuery(document).ready(function ($) {

//        var brand_id = window.localStorage.getItem('brand_id');
    var account_id = window.localStorage.getItem('account_id');
    var account_level = window.localStorage.getItem('account_level');
    var account_name = window.localStorage.getItem('account_name');
    var level_desc = window.localStorage.getItem('level_desc');

    document.getElementById("role").innerHTML = 'Role : ' + level_desc;
    document.getElementById("name_of_user").innerHTML = account_name;

    //open popup
    $('.cd-popup-trigger').on('click', function (event) {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });

    //close popup
    $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('#no')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup').removeClass('is-visible');
        }
    });
    //action logout
    $('#yes').on('click', function (event) {
        window.localStorage.removeItem('user_id');
        window.localStorage.removeItem('merchant_id');
        window.localStorage.removeItem('account_name');
        window.localStorage.removeItem('side');
        window.localStorage.removeItem('account_level');
        window.localStorage.removeItem('level_desc');

        window.location.href = "ho";
    });

//    updateNotificationsFromDatabase();



////// DARK MODE//////
    function toggleDarkMode() {
        var checkBox = document.getElementById("cekk");
        var isChecked = checkBox.checked;
        if (isChecked) {
//                console.log("nyala");
            DarkReader.setFetchMethod(window.fetch)
            DarkReader.enable({
                brightness: 100,
                contrast: 100,

            });
        } else {
//                console.log("mati");
            DarkReader.disable();
        }
        // Save the toggle state to localStorage
        localStorage.setItem("dark-mode", isChecked);
    }

// Load the toggle state from localStorage on page load
    var darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "true") {
        var checkBox = document.getElementById("cekk");
        checkBox.checked = true;
        toggleDarkMode();
    }

// Add a change event listener to the checkbox
    var checkBox = document.getElementById("cekk");
    checkBox.addEventListener("change", toggleDarkMode);


//NOTIFIKASI
//    function addNotificationToDropdown(notification) {
//        var notificationContainer = $("#useryabes");
//        var maxLength = 50; // Batasi panjang teks notifikasi menjadi 50 karakter
//
//        // Membuat elemen baru untuk notifikasi
//        var notificationItem = $("<a>").addClass("dropdown-item notification-item");
//
//        var title = notification.title;
//        var employeeId = notification.email;
//        var createDate = notification.date_create.substring(0, 19);
//        var notificationId = notification.notification_id;
//        var notificationStatus = notification.notification_status;
//        var company_id = notification.company_id;
//
//        if (notificationStatus === '1') {
//            notificationItem.addClass("unread");
//        } else {
//            notificationItem.addClass("read");
//        }
//
//        var message = employeeId + "\n" + title;
//
//        if (message.length > maxLength) {
//            var truncatedMessage = message.substring(0, maxLength) + "..."; // Potong teks notifikasi yang terlalu panjang
//            notificationItem.text(truncatedMessage).attr("title", message); // Tambahkan title berisi teks notifikasi lengkap
//        } else {
//            notificationItem.text(message);
//        }

        // Tambahkan kelas CSS untuk ukuran font yang lebih kecil
//        var createDateElement = $("<span>").addClass("notification-date").text("\n" + createDate);
//        notificationItem.append(createDateElement);

        // Menambahkan notifikasi ke dalam daftar
//        notificationContainer.prepend(notificationItem);

        // Tambahkan event handler click pada elemen notifikasi
//        notificationItem.on('click', function (event) {
//            event.preventDefault();

            // Mengambil data notifikasi yang diklik
//            var clickedNotification = {
//                title: title,
//                notification_id: notificationId,
//                company_id: company_id
//            };

            // Kirim data notifikasi ke server melalui AJAX
//            $.ajax({
//                url: "EditNotification",
//                type: 'POST',
//                data: JSON.stringify(clickedNotification),
//                contentType: 'application/json',
//                success: function (response) {
//                    // Tindakan setelah berhasil mengirim data notifikasi ke server
//                    // ...
//                    console.log(response.resp_desc);
//                    if (response.resp_code === "0000") {
//                        
//
//                        // Arahkan pengguna ke halaman tujuan sesuai kondisi
//                        if (title === "Request Timeoff") {
//                            localStorage.setItem("selectedDate", response.date_create);
//                            window.location.href = "requesttimeoff";
//                        } else if (title === "Request Attendance") {
//                            localStorage.setItem("selectedDate", response.date_create);
//                            window.location.href = "request";
//                        } else if (title === "Request Overtime") {
//                            localStorage.setItem("selectedDate", response.date_create);
//                            window.location.href = "requestovertime";
//                        } else if (title === "Request Reimbursement") {
//                            localStorage.setItem("selectedDate", response.date_create);
//                            window.location.href = "requestreimbursement";
//                        }
//
//
//                    } else {
//                        console.log(response.resp_desc);
//                    }
//                },
//                error: function (xhr, status, error) {
//                    console.error("Error: " + error);
//                }
//            });
//        });
//    }

//    function updateNotificationsFromDatabase() {
//        var companyId = window.localStorage.getItem('company_id');
//
//        var requestData = {
//            company_id: companyId
//        };
//
//        $.ajax({
//            url: "Notification",
//            type: 'POST',
//            data: JSON.stringify(requestData),
//            contentType: 'application/json',
//            dataType: 'json',
//            success: function (response) {
//                if (response.resp_code === "0000") {
//                    var notificationList = response.list;
//                    var unreadCount = 0;
//
//                    // Urutkan notifikasi berdasarkan waktu terbaru
//                    notificationList.sort(function (a, b) {
//                        var dateA = new Date(a.date_create);
//                        var dateB = new Date(b.date_create);
//                        return dateA - dateB; // Urutkan secara ascending
//                    });
//
//                    // Tampilkan notifikasi di sisi web
//                    for (var i = 0; i < notificationList.length; i++) {
//                        var notification = notificationList[i];
//                        addNotificationToDropdown(notification);
//                        if (notification.notification_status === '1') {
//                            unreadCount++;
//                        }
//                    }
//
//                    // Update jumlah notifikasi yang belum dibaca
//                    $("#useryabessum").text(unreadCount);
//                }
//            },
//            error: function (xhr, status, error) {
//                console.error("Error: " + error);
//            }
//        });
//    }

// Menerima web socket
//    var socket = new WebSocket("ws://localhost:8080/PayrollServer/notification");
//
//    socket.onopen = function () {
//        console.log("Koneksi WebSocket berhasil dibuka");
//    };
//
//    socket.onmessage = function (event) {
//        var message = event.data;
//        console.log("Menerima pesan notifikasi: " + message);
//        // Ubah pesan JSON menjadi objek JavaScript
//        var notification = JSON.parse(message);
//
//        // Tampilkan notifikasi ke pengguna di sisi web
//        addNotificationToDropdown(notification);
//
//        // Perbarui jumlah notifikasi yang belum dibaca jika notification_status === '1'
//        if (notification.notification_status === '1') {
//            var currentCount = parseInt($("#useryabessum").text());
//            $("#useryabessum").text(currentCount + 1);
//        }
//    };
//
//    socket.onclose = function (event) {
//        console.log("Koneksi WebSocket ditutup: " + event.code);
//    };






});