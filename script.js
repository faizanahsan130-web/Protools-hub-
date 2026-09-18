let currentQRText = "";

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
    const downloadBtn = document.getElementById("downloadQrBtn");
    
    qrContainer.innerHTML = "";
    
    if (textValue.trim() !== "") {
        currentQRText = textValue;
        new QRCode(qrContainer, {
            text: textValue,
            width: 100,
            height: 100,
            colorDark: "#0b0f19",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        if(downloadBtn) downloadBtn.style.display = "flex";
    } else {
        qrContainer.innerHTML = `<span style="color:#6b7280; font-size:0.8rem;">Preview will appear here</span>`;
        if(downloadBtn) downloadBtn.style.display = "none";
        currentQRText = "";
    }
}

// Download QR Code with Text Labeling using Canvas
function downloadQRCode() {
    const qrImg = document.querySelector("#qrcode img");
    if (!qrImg || !currentQRText) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 360;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = qrImg.src;
    img.onload = function() {
        ctx.drawImage(img, 50, 40, 200, 200);

        ctx.fillStyle = "#0b0f19";
        ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = "center";
        
        let displayText = currentQRText;
        if (displayText.length > 28) {
            displayText = displayText.substring(0, 25) + "...";
        }
        
        ctx.fillText("Data: " + displayText, canvas.width / 2, 270);

        ctx.fillStyle = "#6b7280";
        ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Generated via ProTools Hub", canvas.width / 2, 300);

        const link = document.createElement("a");
        link.download = "qrcode-protools.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        showToast("QR Code downloaded successfully!");
    };
}

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