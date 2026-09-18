<!-- Primary SEO Meta Tags -->
<title>ProTools Hub — Free Online Developer & PDF Utilities</title>
<meta name="title" content="ProTools Hub — Free Online Developer & PDF Utilities">
<meta name="description" content="Lightning-fast, secure, and free online developer tools including Password Generator, QR Code Generator, Text Converter, and PDF Creator.">
<meta name="keywords" content="developer tools, free utilities, password generator, qr code generator, pdf generator, protools hub">
<link rel="canonical" href="https://protools-hub-sepia.vercel.app/">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<!-- FontAwesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<!-- Custom CSS -->
<link rel="stylesheet" href="style.css">
<!-- QR Code Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<!-- jsPDF Library for PDF Generation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>


<header class="header">
    <div class="logo">
        <i class="fa-solid fa-layer-group"></i>
        <span>ProTools<span class="highlight">Hub</span></span>
    </div>
    <p class="tagline">Lightning-fast, secure, and professional developer utilities.</p>
</header>

<main class="container">
    <!-- Tool 1: Password Generator -->
    <div class="card">
        <div class="card-header">
            <i class="fa-solid fa-key"></i>
            <h2>Password Generator</h2>
        </div>
        <p class="card-desc">Generate secure, randomized cryptographic passwords instantly.</p>
        <div class="output-box">
            <input type="text" id="passwordOutput" readonly placeholder="Click generate...">
            <button id="copyPasswordBtn" title="Copy to Clipboard"><i class="fa-regular fa-copy"></i></button>
        </div>
        <button class="btn primary-btn" onclick="generatePassword()">
            <i class="fa-solid fa-bolt"></i> Generate Password
        </button>
    </div>

    <!-- Tool 2: QR Code Generator -->
    <div class="card">
        <div class="card-header">
            <i class="fa-solid fa-qrcode"></i>
            <h2>QR Code Generator</h2>
        </div>
        <p class="card-desc">Convert any link or text into a scannable high-res QR code with text labels.</p>
        <div class="input-group">
            <input type="text" id="qrInput" placeholder="Enter text or URL...">
        </div>
        <div id="qrcode" class="qr-preview"></div>
        <div class="btn-grid">
            <button class="btn primary-btn" onclick="generateQRCode()">
                <i class="fa-solid fa-wand-magic-sparkles"></i> Generate
            </button>
            <button class="btn action-btn" id="downloadQrBtn" onclick="downloadQRCode()" style="display:none;">
                <i class="fa-solid fa-download"></i> Download
            </button>
        </div>
    </div>

    <!-- Tool 3: Text Converter -->
    <div class="card">
        <div class="card-header">
            <i class="fa-solid fa-file-pen"></i>
            <h2>Text Converter</h2>
        </div>
        <p class="card-desc">Manipulate casing, format text, and check character metrics.</p>
        <div class="input-group">
            <textarea id="textInput" placeholder="Type or paste your text here..."></textarea>
        </div>
        <div class="btn-grid">
            <button class="btn action-btn uppercase" onclick="convertToUpperCase()">
                <i class="fa-solid fa-arrow-up"></i> UPPER
            </button>
            <button class="btn action-btn lowercase" onclick="convertToLowerCase()">
                <i class="fa-solid fa-arrow-down"></i> lower
            </button>
        </div>
    </div>

    <!-- Tool 4: PDF Generator -->
    <div class="card">
        <div class="card-header">
            <i class="fa-solid fa-file-pdf"></i>
            <h2>PDF Generator</h2>
        </div>
        <p class="card-desc">Type your notes or document text and export directly as a clean PDF file.</p>
        <div class="input-group">
            <textarea id="pdfInput" placeholder="Enter document content to export as PDF..."></textarea>
        </div>
        <button class="btn primary-btn" onclick="generatePDF()">
            <i class="fa-solid fa-file-arrow-down"></i> Download PDF
        </button>
    </div>
</main>

<footer class="footer">
    <p>© 2026 ProTools Hub. Crafted for peak efficiency.</p>
</footer>

<!-- Toast Notification -->
<div id="toast" class="toast">Copied to clipboard!</div>

<script src="script.js"></script>


