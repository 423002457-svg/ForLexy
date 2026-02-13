const landing = document.getElementById("landing");
const slideshow = document.getElementById("slideshow");
const question = document.getElementById("question");
const startBtn = document.getElementById("startBtn");
const toQuestionBtn = document.getElementById("toQuestionBtn");
const loveLevel = document.getElementById("loveLevel");
const progressFill = document.getElementById("progressFill");
const bgMusic = document.getElementById("bgMusic");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const popup = document.getElementById("challengePopup");
const submitAnswer = document.getElementById("submitAnswer");
const answerInput = document.getElementById("answerInput");
const challengeMessage = document.getElementById("challengeMessage");

const celebration = document.getElementById("celebration");
const modeStatus = document.getElementById("modeStatus");

let noClickCount = 0;
let currentLove = 10;

/* Utility */
function updateLove(level) {
    currentLove = level;
    loveLevel.textContent = level + "%";
    progressFill.style.width = level + "%";
}

/* Start Button */
startBtn.addEventListener("click", async () => {
    try {
        bgMusic.currentTime = 0;
        await bgMusic.play();
    } catch (err) {
        console.log("Music play blocked:", err);
    }

    landing.classList.remove("active");
    slideshow.classList.add("active");
    updateLove(60);
});


/* Slideshow */
const slides = [
    { img: "images/photo1.jpg", text: "The day I realized you’re special." },
    { img: "images/photo2.jpg", text: "The smile that changed my world." },
    { img: "images/photo3.jpg", text: "My favorite human." }
];

let slideIndex = 0;
const slideImage = document.getElementById("slideImage");
const slideCaption = document.getElementById("slideCaption");

function showSlide() {
    slideImage.src = slides[slideIndex].img;
    slideCaption.textContent = slides[slideIndex].text;
}


showSlide();

/* Go to Question */
toQuestionBtn.addEventListener("click", () => {
    slideshow.classList.remove("active");
    question.classList.add("active");
    updateLove(99);
    typeWriter("Will you be my Valentine?", "typedQuestion", 80);
});


/* NO Button - Challenge Mode */
noBtn.addEventListener("click", () => {

    noClickCount++;

    if (noClickCount < 3) {
        moveNoButton();
    } else {
        showChallenge();
    }
});

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}


submitAnswer.addEventListener("click", () => {
    const userAnswer = answerInput.value.toLowerCase().trim();

const validAnswers = [
    "august 12, 2022",
    "august 12 2022",
    "8/12/22",
    "08/12/22",
    "8/12/2022",
    "08/12/2022"
];

if (validAnswers.includes(userAnswer)) {

    challengeMessage.textContent =
    "That means you care… so that’s basically a yes.";

    setTimeout(() => {
        popup.style.display = "none";

        // Reveal YES button
        yesBtn.style.display = "inline-block";
        yesBtn.classList.add("highlight-yes");

        // Move NO button back to normal position
        noBtn.style.position = "relative";
        noBtn.style.left = "";
        noBtn.style.top = "";

    }, 2000);

} else {

    challengeMessage.textContent = "See? You can’t say no.";

    popup.querySelector(".popup-content").classList.add("shake");

    setTimeout(() => {
        popup.querySelector(".popup-content").classList.remove("shake");
    }, 400);
}
});

/* YES Button */
yesBtn.addEventListener("click", triggerYes);

function triggerYes() {
    popup.style.display = "none";
    question.style.display = "none";
    celebration.style.display = "flex";
    updateLove(100);
    modeStatus.textContent = "Valentine Mode: UNLOCKED ❤️";
    document.body.style.background = "linear-gradient(135deg, #ff1493, #ff69b4)";


    launchConfetti();
    startHearts();
    startFireworks();
}

function launchConfetti() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });
}

function startHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 20) + "px";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function startFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: x,
                y: y,
                radius: 2,
                color: `hsl(${Math.random() * 360},100%,60%)`,
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 4 + 2,
                life: 100
            });
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            if (p.life <= 0) particles.splice(index, 1);
        });

        requestAnimationFrame(animate);
    }

    setInterval(createFirework, 800);
    animate();
}

function typeWriter(text, elementId, speed = 70) {
    const element = document.getElementById(elementId);
    element.textContent = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

function createBackgroundHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "💕";
        heart.style.position = "fixed";
        heart.style.top = Math.random() * 100 + "vh";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.opacity = "0.2";
        heart.style.fontSize = "15px";
        heart.style.pointerEvents = "none";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 1000);
}

createBackgroundHearts();

const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

prevSlide.addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide();
});

nextSlide.addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
});

let touchStartX = 0;
let touchEndX = 0;

slideImage.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

slideImage.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide();
    }

    if (touchEndX > touchStartX + 50) {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide();
    }
}

function showChallenge() {
    popup.style.display = "flex";
    challengeMessage.textContent = "";
    answerInput.value = "";

    popup.querySelector("h2").textContent =
    "Since you really wanna choose No…";

    popup.querySelector("p").textContent =
    "To say No… you must answer this correctly.";

    setTimeout(() => {
        popup.querySelector("p").textContent =
        "When did we first have a date?";
    }, 2000);
}
