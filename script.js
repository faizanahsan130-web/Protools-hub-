// 1. Password Generator Logic
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*!";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("passwordDisplay").innerText = password;
}

// 2. QR Code Generator Logic
function generateQRCode() {
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; // Purana QR clean karne ke liye
    const textValue = document.getElementById("qrText").value;
    
    if (textValue.trim() !== "") {
        new QRCode(qrContainer, {
            text: textValue,
            width: 128,
            height: 128
        });
    } else {
        alert("Please enter some text or URL!");
    }
}

// 3. Text Converter Logic
function convertToUpperCase() {
    const txtArea = document.getElementById("textInput");
    txtArea.value = txtArea.value.toUpperCase();
}

function convertToLowerCase() {
    const txtArea = document.getElementById("textInput");
    txtArea.value = txtArea.value.toLowerCase();
}