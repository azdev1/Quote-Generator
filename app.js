let url = "https://dummyjson.com/quotes/random";

let btn = document.getElementById("btn");
let qt = document.querySelector("#quote");
let ath = document.querySelector("#author");
let toggle = document.getElementById("toggleTheme");

// ================= FETCH QUOTE =================
async function getQuote() {
    try {
        let res = await fetch(url);
        let data = await res.json();
        return [data.quote, data.author];
    } catch (e) {
        console.log("error - ", e);
        return null;
    }
}

// ================= ANIMATION =================
function animateQuote() {
    qt.style.opacity = "0";
    ath.style.opacity = "0";

    setTimeout(() => {
        qt.style.opacity = "1";
        ath.style.opacity = "1";
    }, 300);
}

// ================= BUTTON CLICK =================
btn.addEventListener("click", async () => {
    qt.innerText = "Loading...";
    ath.innerText = "";

    animateQuote();

    let quote = await getQuote();

    if (!quote) {
        qt.innerText = "Failed to load 😢";
        return;
    }

    qt.innerText = `"${quote[0]}"`;
    ath.innerText = `- ${quote[1]}`;

    animateQuote();
});

// ================= LOAD FIRST QUOTE =================
window.addEventListener("load", async () => {
    let quote = await getQuote();

    if (quote) {
        qt.innerText = `"${quote[0]}"`;
        ath.innerText = `- ${quote[1]}`;
    }

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggle.innerText = "☀️";
    }
});

// ================= DARK MODE =================
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggle.innerText = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggle.innerText = "🌙";
        localStorage.setItem("theme", "light");
    }
});