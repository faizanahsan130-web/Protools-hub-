/* =========================================
   ProToolsHub - Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       Helpers
    ========================================= */

    const $ = (id) => document.getElementById(id);

    function showToast(message = "Done!") {
        const toast = $("toast");
        const toastMessage = $("toastMessage");

        if (!toast) return;

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    async function copyText(text) {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            showToast("Copied!");
        } catch {
            const temp = document.createElement("textarea");
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            temp.remove();
            showToast("Copied!");
        }
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =========================================
       Mobile Menu
    ========================================= */

    const mobileMenuBtn = $("mobileMenuBtn");
    const mobileMenu = $("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            const icon = mobileMenuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");

                const icon = mobileMenuBtn.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    /* =========================================
       Tool Search
    ========================================= */

    const toolSearch = $("toolSearch");
    const toolCards = document.querySelectorAll(".tool-card");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const noResults = $("noResults");

    let activeCategory = "all";

    function filterTools() {

        const searchTerm = (toolSearch?.value || "")
            .toLowerCase()
            .trim();

        let visibleCount = 0;

        toolCards.forEach(card => {

            const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const description = card.querySelector("p")?.textContent.toLowerCase() || "";
            const categories = (card.dataset.category || "").toLowerCase();

            const matchesSearch =
                !searchTerm ||
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                categories.includes(searchTerm);

            const matchesCategory =
                activeCategory === "all" ||
                categories.includes(activeCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    if (toolSearch) {
        toolSearch.addEventListener("input", filterTools);
    }

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            activeCategory = button.dataset.category || "all";

            filterTools();
        });

    });

    /* =========================================
       Password Generator
    ========================================= */

    const passwordOutput = $("passwordOutput");
    const copyPassword = $("copyPassword");
    const passwordLength = $("passwordLength");
    const lengthValue = $("lengthValue");

    const uppercase = $("includeUppercase");
    const lowercase = $("includeLowercase");
    const numbers = $("includeNumbers");
    const symbols = $("includeSymbols");

    const generatePassword = $("generatePassword");

    if (passwordLength && lengthValue) {

        passwordLength.addEventListener("input", () => {
            lengthValue.textContent = passwordLength.value;
        });

    }

    function createPassword() {

        if (!passwordOutput) return;

        const length = Number(passwordLength?.value || 16);

        let chars = "";

        if (uppercase?.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase?.checked) chars += "abcdefghijklmnopqrstuvwxyz";
        if (numbers?.checked) chars += "0123456789";
        if (symbols?.checked) chars += "!@#$%^&*()_+-=[]{}<>?";

        if (!chars) {
            passwordOutput.value = "Select at least one option";
            return;
        }

        let password = "";

        const randomArray = new Uint32Array(length);

        if (window.crypto?.getRandomValues) {
            crypto.getRandomValues(randomArray);
        } else {
            for (let i = 0; i < length; i++) {
                randomArray[i] = Math.floor(Math.random() * 100000);
            }
        }

        for (let i = 0; i < length; i++) {
            password += chars[randomArray[i] % chars.length];
        }

        passwordOutput.value = password;
    }

    if (generatePassword) {
        generatePassword.addEventListener("click", () => {
            createPassword();
            showToast("Password generated!");
        });
    }

    if (copyPassword) {
        copyPassword.addEventListener("click", () => {
            copyText(passwordOutput?.value || "");
        });
    }

    createPassword();

    /* =========================================
       QR Code Generator
       Uses QRCode library if available
    ========================================= */

    const qrInput = $("qrInput");
    const qrPreview = $("qrPreview");
    const generateQR = $("generateQR");

    function createQR() {

        if (!qrPreview) return;

        const value = qrInput?.value.trim();

        if (!value) {
            qrPreview.innerHTML = `
                <span style="color:#71869e">
                    Enter text or URL
                </span>
            `;
            return;
        }

        if (typeof QRCode !== "undefined") {

            qrPreview.innerHTML = "";

            new QRCode(qrPreview, {
                text: value,
                width: 150,
                height: 150,
                colorDark: "#ffffff",
                colorLight: "#081522"
            });

        } else {

            const img = document.createElement("img");

            img.alt = "QR Code";
            img.width = 180;
            img.height = 180;

            img.src =
                "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +
                encodeURIComponent(value);

            qrPreview.innerHTML = "";
            qrPreview.appendChild(img);
        }
    }

    if (generateQR) {
        generateQR.addEventListener("click", () => {
            createQR();
            showToast("QR code generated!");
        });
    }

    /* =========================================
       Text Converter
    ========================================= */

    const textInput = $("textInput");
    const uppercaseBtn = $("uppercaseBtn");
    const lowercaseBtn = $("lowercaseBtn");
    const titlecaseBtn = $("titlecaseBtn");
    const clearTextBtn = $("clearTextBtn");

    const charCount = $("charCount");
    const wordCount = $("wordCount");
    const lineCount = $("lineCount");

    function updateTextStats() {

        if (!textInput) return;

        const text = textInput.value;

        if (charCount) {
            charCount.textContent = text.length;
        }

        if (wordCount) {
            const words = text.trim()
                ? text.trim().split(/\s+/).length
                : 0;

            wordCount.textContent = words;
        }

        if (lineCount) {
            const lines = text
                ? text.split(/\r?\n/).length
                : 0;

            lineCount.textContent = lines;
        }
    }

    if (textInput) {
        textInput.addEventListener("input", updateTextStats);
    }

    if (uppercaseBtn) {
        uppercaseBtn.addEventListener("click", () => {
            textInput.value = textInput.value.toUpperCase();
            updateTextStats();
        });
    }

    if (lowercaseBtn) {
        lowercaseBtn.addEventListener("click", () => {
            textInput.value = textInput.value.toLowerCase();
            updateTextStats();
        });
    }

    if (titlecaseBtn) {
        titlecaseBtn.addEventListener("click", () => {

            textInput.value = textInput.value
                .toLowerCase()
                .replace(/\b\w/g, letter => letter.toUpperCase());

            updateTextStats();
        });
    }

    if (clearTextBtn) {
        clearTextBtn.addEventListener("click", () => {
            textInput.value = "";
            updateTextStats();
        });
    }

    updateTextStats();

    /* =========================================
       JSON Formatter
    ========================================= */

    const jsonInput = $("jsonInput");
    const formatJSON = $("formatJSON");

    if (formatJSON) {

        formatJSON.addEventListener("click", () => {

            try {

                const parsed = JSON.parse(jsonInput.value);

                jsonInput.value =
                    JSON.stringify(parsed, null, 2);

                showToast("JSON formatted!");

            } catch (error) {

                showToast("Invalid JSON");

            }

        });

    }

    /* =========================================
       Base64
    ========================================= */

    const base64Input = $("base64Input");
    const encodeBase64 = $("encodeBase64");
    const decodeBase64 = $("decodeBase64");

    if (encodeBase64) {

        encodeBase64.addEventListener("click", () => {

            try {

                base64Input.value =
                    btoa(unescape(encodeURIComponent(base64Input.value)));

                showToast("Encoded!");

            } catch {
                showToast("Encoding failed");
            }

        });

    }

    if (decodeBase64) {

        decodeBase64.addEventListener("click", () => {

            try {

                base64Input.value =
                    decodeURIComponent(
                        escape(atob(base64Input.value))
                    );

                showToast("Decoded!");

            } catch {
                showToast("Invalid Base64");
            }

        });

    }

    /* =========================================
       URL Encoder / Decoder
    ========================================= */

    const urlInput = $("urlInput");
    const encodeURL = $("encodeURL");
    const decodeURL = $("decodeURL");

    if (encodeURL) {

        encodeURL.addEventListener("click", () => {

            try {
                urlInput.value = encodeURIComponent(urlInput.value);
                showToast("URL encoded!");
            } catch {
                showToast("Encoding failed");
            }

        });

    }

    if (decodeURL) {

        decodeURL.addEventListener("click", () => {

            try {
                urlInput.value = decodeURIComponent(urlInput.value);
                showToast("URL decoded!");
            } catch {
                showToast("Invalid URL encoding");
            }

        });

    }

    /* =========================================
       UUID Generator
    ========================================= */

    const uuidOutput = $("uuidOutput");
    const copyUUID = $("copyUUID");
    const generateUUID = $("generateUUID");

    function generateUUIDValue() {

        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }

        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
            .replace(/[xy]/g, char => {

                const random = Math.random() * 16 | 0;
                const value =
                    char === "x"
                        ? random
                        : (random & 0x3 | 0x8);

                return value.toString(16);
            });
    }

    if (generateUUID) {

        generateUUID.addEventListener("click", () => {

            uuidOutput.value = generateUUIDValue();

            showToast("UUID generated!");

        });

    }

    if (copyUUID) {

        copyUUID.addEventListener("click", () => {
            copyText(uuidOutput?.value || "");
        });

    }

    if (uuidOutput && !uuidOutput.value) {
        uuidOutput.value = generateUUIDValue();
    }

    /* =========================================
       Timestamp Converter
    ========================================= */

    const timestampInput = $("timestampInput");
    const convertTimestamp = $("convertTimestamp");
    const timestampResult = $("timestampResult");

    if (convertTimestamp) {

        convertTimestamp.addEventListener("click", () => {

            const raw = timestampInput.value.trim();

            if (!raw) {
                timestampResult.textContent = "Enter a timestamp";
                return;
            }

            const timestamp = Number(raw);

            if (!Number.isFinite(timestamp)) {
                timestampResult.textContent = "Invalid timestamp";
                return;
            }

            const milliseconds =
                raw.length <= 10
                    ? timestamp * 1000
                    : timestamp;

            const date = new Date(milliseconds);

            if (Number.isNaN(date.getTime())) {
                timestampResult.textContent = "Invalid timestamp";
                return;
            }

            timestampResult.textContent =
                date.toLocaleString();

            showToast("Timestamp converted!");

        });

    }

    /* =========================================
       Color Converter
    ========================================= */

    const colorPicker = $("colorPicker");
    const hexColor = $("hexColor");
    const colorResult = $("colorResult");

    function updateColor(color) {

        if (!color) return;

        color = color.toUpperCase();

        if (hexColor) {
            hexColor.value = color;
        }

        if (colorResult) {

            const r = parseInt(color.substring(1, 3), 16);
            const g = parseInt(color.substring(3, 5), 16);
            const b = parseInt(color.substring(5, 7), 16);

            colorResult.textContent =
                `RGB: rgb(${r}, ${g}, ${b})`;

        }
    }

    if (colorPicker) {
        colorPicker.addEventListener("input", () => {
            updateColor(colorPicker.value);
        });

        updateColor(colorPicker.value);
    }

    if (hexColor) {

        hexColor.addEventListener("input", () => {

            let value = hexColor.value.trim();

            if (!value.startsWith("#")) {
                value = "#" + value;
            }

            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {

                colorPicker.value = value;
                updateColor(value);

            }

        });

    }

    /* =========================================
       Hash Generator
    ========================================= */

    const hashInput = $("hashInput");
    const generateHash = $("generateHash");
    const hashResult = $("hashResult");

    async function createHash(text) {

        const data =
            new TextEncoder().encode(text);

        const hashBuffer =
            await crypto.subtle.digest("SHA-256", data);

        return [...new Uint8Array(hashBuffer)]
            .map(byte =>
                byte.toString(16).padStart(2, "0")
            )
            .join("");
    }

    if (generateHash) {

        generateHash.addEventListener("click", async () => {

            if (!hashInput.value.trim()) {
                hashResult.textContent = "Enter text first";
                return;
            }

            hashResult.textContent = "Generating...";

            try {

                const hash =
                    await createHash(hashInput.value);

                hashResult.textContent = hash;

                showToast("SHA-256 generated!");

            } catch {

                hashResult.textContent =
                    "Hash generation failed";

            }

        });

    }

    /* =========================================
       Regex Tester
    ========================================= */

    const regexPattern = $("regexPattern");
    const regexText = $("regexText");
    const testRegex = $("testRegex");
    const regexResult = $("regexResult");

    if (testRegex) {

        testRegex.addEventListener("click", () => {

            try {

                const pattern =
                    new RegExp(regexPattern.value, "g");

                const matches =
                    regexText.value.match(pattern);

                if (matches) {

                    regexResult.innerHTML =
                        `<span class="success">
                            ${matches.length} match(es):
                        </span><br>${matches
                            .map(escapeHTML)
                            .join(", ")}`;

                } else {

                    regexResult.innerHTML =
                        `<span class="error">
                            No matches found.
                        </span>`;
                }

            } catch {

                regexResult.innerHTML =
                    `<span class="error">
                        Invalid regular expression.
                    </span>`;

            }

        });

    }

    /* =========================================
       Word / Character Counter
    ========================================= */

    const counterInput = $("counterInput");
    const counterWords = $("counterWords");
    const counterCharacters = $("counterCharacters");
    const counterSentences = $("counterSentences");

    function updateCounter() {

        if (!counterInput) return;

        const text = counterInput.value.trim();

        const words = text
            ? text.split(/\s+/).length
            : 0;

        const characters =
            counterInput.value.length;

        const sentences = text
            ? text.split(/[.!?]+/)
                .filter(sentence => sentence.trim()).length
            : 0;

        if (counterWords) {
            counterWords.textContent = words;
        }

        if (counterCharacters) {
            counterCharacters.textContent = characters;
        }

        if (counterSentences) {
            counterSentences.textContent = sentences;
        }
    }

    if (counterInput) {
        counterInput.addEventListener("input", updateCounter);
    }

    updateCounter();

    /* =========================================
       Lorem Ipsum
    ========================================= */

    const loremCount = $("loremCount");
    const generateLorem = $("generateLorem");

    const loremWords = [