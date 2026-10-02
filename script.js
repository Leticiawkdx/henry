/* ==========================================================================
   1. CONTADOR DE TEMPO
   ========================================================================== */
// Início do namoro: 06/09/2024
const startDate = new Date(2024, 8, 6, 0, 0, 0);

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateTimer, 1000);
updateTimer();

/* ==========================================================================
   2. TELA DE INTRODUÇÃO
   ========================================================================== */
const introScreen = document.getElementById("intro-screen");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  introScreen.style.opacity = "0";
  setTimeout(() => { introScreen.style.display = "none"; }, 700);

  if (typeof confetti === "function") {
    confetti({ particleCount: 100, spread: 70, colors: ["#b8142f", "#e8344f", "#f4e9e4"], origin: { y: 0.6 } });
  }
});

/* ==========================================================================
   3. CHUVA DE PÉTALAS
   ========================================================================== */
const petalsBtn = document.getElementById("petalsToggleBtn");
let petalsInterval = null;

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.innerHTML = "🌹";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = Math.random() * 3 + 3 + "s";
  petal.style.fontSize = Math.random() * 10 + 15 + "px";
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 6000);
}

petalsBtn.addEventListener("click", () => {
  const active = petalsInterval !== null;
  if (active) {
    clearInterval(petalsInterval);
    petalsInterval = null;
    petalsBtn.setAttribute("aria-pressed", "false");
  } else {
    petalsInterval = setInterval(createPetal, 300);
    petalsBtn.setAttribute("aria-pressed", "true");
  }
});

/* ==========================================================================
   4. COFRE SECRETO
   ========================================================================== */
const VAULT_PASS = "6767";
let currentCode = "";

function pressKey(num) {
  if (currentCode.length < 4) {
    currentCode += num;
    updateVaultDisplay();
  }
}

function clearVault() {
  currentCode = "";
  updateVaultDisplay();
  document.getElementById("vaultMessage").textContent = "";
}

function updateVaultDisplay() {
  const display = document.getElementById("vaultDisplay");
  const filled = currentCode.split("").join(" ");
  const remaining = "‒ ".repeat(4 - currentCode.length).trim();
  display.textContent = [filled, remaining].filter(Boolean).join(" ");
}

function unlockVault() {
  const msg = document.getElementById("vaultMessage");
  if (currentCode === VAULT_PASS) {
    document.getElementById("vaultLocked").style.display = "none";
    document.getElementById("vaultUnlocked").style.display = "block";
    if (typeof confetti === "function") {
      confetti({ particleCount: 150, spread: 80, colors: ["#b8142f", "#e8344f", "#f4e9e4"] });
    }
  } else {
    msg.textContent = "senha incorreta, tente de novo.";
    clearVault();
  }
}

/* ==========================================================================
   5. CUPONS
   ========================================================================== */
const coupons = [
  "🌆 Vale um rolê surpresa, escolhido por mim.",
  "🥟 Vale um pastel e um caldo de cana na feira, só nós dois.",
  "💋 Vale um beijo demorado, na hora e no lugar que você escolher.",
  "🔥 Vale uma noite só nossa, sem pressa e sem hora pra acabar.",
  "🥩 Vale escolher o próximo jantar na Tábua sem discussão.",
  "🛋️ Vale um dia inteiro de preguiça e carinho, sem compromisso nenhum."
];

function generateCoupon() {
  const display = document.getElementById("couponDisplay");
  const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];

  display.style.opacity = 0;
  setTimeout(() => {
    display.textContent = randomCoupon;
    display.style.opacity = 1;
  }, 200);

  if (typeof confetti === "function") {
    confetti({ particleCount: 50, spread: 50, colors: ["#b8142f", "#e8344f", "#f4e9e4"] });
  }
}

/* ==========================================================================
   6. GALERIA / CARROSSEL
   ========================================================================== */
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (dots[i]) dots[i].classList.remove("active");
  });
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
  nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
}

dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

/* ==========================================================================
   7. ENVELOPE / CARTA
   ========================================================================== */
const envelopeWrapper = document.getElementById("envelopeWrapper");
if (envelopeWrapper) {
  envelopeWrapper.addEventListener("click", () => {
    envelopeWrapper.classList.toggle("open");
  });
}

/* ==========================================================================
   8. QUIZ
   ========================================================================== */
const quizData = [
  {
    question: "Onde foi o nosso primeiro encontro?",
    options: ["No shopping", "No parque", "Em um restaurante", "No cinema"],
    correct: 0
  },
  {
    question: "Quem disse \"eu te amo\" primeiro?",
    options: ["Letícia", "Henry", "Os dois juntos", "Ainda não dissemos"],
    correct: 1
  },
  {
    question: "Qual é a comida favorita do casal?",
    options: ["Pizza", "Comida japonesa", "Lanche", "Churrasco"],
    correct: 2
  },
  {
    question: "Onde vocês dormiram na última virada de ano?",
    options: ["Em casa", "Na praia", "Na chácara", "Em um hotel"],
    correct: 1
  },
  {
    question: "Onde é o jantar de picanha inesquecível?",
    options: ["Na Tábua", "No Outback", "Em casa", "Num rodízio qualquer"],
    correct: 0
  }
];

let currentQuizIndex = 0;
let quizScore = 0;

function loadQuizQuestion() {
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const feedbackEl = document.getElementById("quiz-feedback");

  if (!questionEl || !optionsEl) return;

  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";

  if (currentQuizIndex < quizData.length) {
    const q = quizData[currentQuizIndex];
    questionEl.textContent = q.question;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.classList.add("quiz-opt-btn");
      btn.textContent = opt;
      btn.onclick = () => selectQuizAnswer(idx);
      optionsEl.appendChild(btn);
    });
  } else {
    questionEl.textContent = `fim do teste — ${quizScore} de ${quizData.length} certas.`;
    optionsEl.innerHTML = `
      <p style="margin-top: 1rem; color: var(--muted); grid-column: 1 / -1;">
        pontuação nenhuma muda o quanto a gente se ama. ❤️
      </p>
      <button class="btn-primary" onclick="restartQuiz()" style="margin-top: 1.2rem; grid-column: 1 / -1; justify-self: center;">refazer</button>
    `;
    if (typeof confetti === "function") {
      confetti({ particleCount: 100, spread: 70, colors: ["#b8142f", "#e8344f", "#f4e9e4"] });
    }
  }
}

function selectQuizAnswer(selectedIdx) {
  const q = quizData[currentQuizIndex];
  const feedbackEl = document.getElementById("quiz-feedback");
  const btns = document.querySelectorAll(".quiz-opt-btn");

  btns.forEach(btn => btn.disabled = true);

  if (selectedIdx === q.correct) {
    quizScore++;
    btns[selectedIdx].style.background = "rgba(46, 204, 113, 0.35)";
    btns[selectedIdx].style.borderColor = "#2ecc71";
    feedbackEl.textContent = "certa resposta.";
    feedbackEl.style.color = "#2ecc71";
  } else {
    btns[selectedIdx].style.background = "rgba(232, 52, 79, 0.35)";
    btns[selectedIdx].style.borderColor = "var(--red-bright)";
    btns[q.correct].style.background = "rgba(46, 204, 113, 0.35)";
    feedbackEl.textContent = `quase — era "${q.options[q.correct]}".`;
    feedbackEl.style.color = "var(--red-bright)";
  }

  setTimeout(() => {
    currentQuizIndex++;
    loadQuizQuestion();
  }, 1800);
}

function restartQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  loadQuizQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuizQuestion();
});