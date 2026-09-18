// 1. Password Generator Logic
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!_";
    let password = "";
    const length = 14;
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("passwordOutput").value = password;
}

// Copy Password with Toast
document.getElementById("copyPasswordBtn").addEventListener("click", () => {
    const pwdInput = document.getElementById("passwordOutput");
    if (!pwdInput.value) return;
    navigator.clipboard.writeText(pwdInput.value);
    showToast("Password copied to clipboard!");
});

// 2. QR Code Generator Logic
function generateQRCode() {
    const qrContainer = document.getElementById("qrcode");
    const textValue = document.getElementById("qrInput").value;
    
    qrContainer.innerHTML = "";
    
    if (textValue.trim() !== "") {
        new QRCode(qrContainer, {
            text: textValue,
            width: 100,
            height: 100,
            colorDark: "#0b0f19",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        qrContainer.innerHTML = `<span style="color:#6b7280; font-size:0.8rem;">Preview will appear here</span>`;
    }
}

// Set initial placeholder state for QR
document.getElementById("qrcode").innerHTML = `<span style="color:#6b7280; font-size:0.8rem;">Preview will appear here</span>`;

// 3. Text Converter Logic
function convertToUpperCase() {
    const txtArea = document.getElementById("textInput");
    if(!txtArea.value) return;
    txtArea.value = txtArea.value.toUpperCase();
    showToast("Converted to UPPERCASE");
}

function convertToLowerCase() {
    const txtArea = document.getElementById("textInput");
    if(!txtArea.value) return;
    txtArea.value = txtArea.value.toLowerCase();
    showToast("Converted to lowercase");
}

// Toast Notification Helper
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}