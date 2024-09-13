<%-- 
    Document   : signup
    Created on : 20-Feb-2020, 20:57:35
    Author     : suhanda
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file='defaultextend.jsp'%>

<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            #scanButtonContainer {
                margin-bottom: 20px;
            }
            button {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
            }
            button:hover {
                background-color: #0056b3;
            }
            div.container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                margin-bottom: 20px;
            }
            input[type="number"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-sizing: border-box;
                margin-bottom: 10px;
            }
            input[type="text"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-sizing: border-box;
                margin-bottom: 10px;

            }
            #reader {
                width: 300px;
                margin-top: 20px;
            }
        </style>

        <!--<script type="text/javascript" src="myjs/index.js"></script>-->        
        <script src="https://cdn.jsdelivr.net/npm/html5-qrcode/minified/html5-qrcode.min.js"></script>

        <title>login</title>
    </head>

    <body>
        <!-- Tambahkan div untuk QR code reader -->
        <div id="reader"></div>
        <!-- Container untuk tombol Scan QR Code -->
        <div id="scanButtonContainer">
            <button id="scanQRButton">Scan QR Code</button>
        </div>

        <!-- Container utama -->
        <div class="container">
            <input type="text" id="terminal_id" placeholder="terminal id" disabled="" value="00001504QR75A000134">
            <input type="number" id="amount" placeholder="Enter Amount"><br>
            <button id="payButton">Pay</button>
        </div>
        <script>
            document.getElementById('payButton').addEventListener('click', function () {
                const amount = document.getElementById('amount').value;
                const terminal_id = document.getElementById('terminal_id').value;

                if (terminal_id != "") {
                    if (amount != "") {
                        const data = {
                        "trade_id": "12345678",
                        "terminal_id": terminal_id,
                        "result": "Success",
                        "amount": amount,
                        "time": "20240822140000",
                        "vendor_id": "qr75"
                        };

                        fetch('Login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                                .then(response => response.json())
                                .then(data => {
                                    console.log('data', data);
                                    if (data.responseCode == '2005200') {
                                        console.log(data.responseMessage);
                                        alert(data.responseMessage);
                                        document.getElementById('terminal_id').value = "";
                                        document.getElementById('amount').value = "";
                                    } else {
                                        console.log(data.responseDesc);
                                        alert(data.responseDesc);
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                    } else {
                        alert('input amount');
                    }

                } else {
                    alert('please scan QR');
                }
            });

            document.getElementById('scanQRButton').addEventListener('click', function () {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        {facingMode: "environment"}, // Kamera belakang
        {
            fps: 10, // Frame per second
            qrbox: {width: 250, height: 250}  // Kotak pemindaian QR
        },
        (decodedText, decodedResult) => {
            console.log('QR Code detected:' + decodedText);
            alert('QR Code detected:' + decodedText);
            
            // Menyimpan decodedText ke dalam elemen terminal_id
            const terminal_id_input = document.getElementById('terminal_id');
            if (terminal_id_input) {
                terminal_id_input.value = decodedText; // Pastikan elemen ditemukan
            } else {
                console.error('Element with ID "terminal_id" not found');
            }

            // Tunggu beberapa saat sebelum menghentikan kamera
            setTimeout(() => {
                html5QrCode.stop().then(ignore => {
                    console.log("Camera stopped.");
                }).catch(err => {
                    console.error("Failed to stop camera", err);
                });
            }, 1000); // Tambahkan delay 1 detik agar tidak terburu-buru
        },
        (errorMessage) => {
            console.error(`QR Code no longer in front of camera. Error: ${errorMessage}`);
        }
    ).catch(err => {
        console.error(`Unable to start scanning, error: ${err}`);
    });
});

        </script>
    </body>
</html>
