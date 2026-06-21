
/* =========================================================
   APP CONFIG
   EDIT EVERYTHING HERE
========================================================= */

const APP_CONFIG = {

    /* AUDIO */

    musicSource: "assets/music.mp3",
    ambientSource: "assets/castle-ambience.mp3",
    owlWingSource: "assets/owl-wing.mp3",
    sealBreakSource: "assets/seal-break.mp3",
    paperOpenSource: "assets/paper-open.mp3",

    /* TYPEWRITER */

    typewriterSpeed: 50,

    /* OWL FLAP */

    flapFrames: [
        "assets/owl-frame-1.png",
        "assets/owl-frame-2.png",
        "assets/owl-frame-3.png",
        "assets/owl-frame-2.png"
    ],

    flapSpeed: 140,

    /* LETTER */

    letterText: `

There was a time when solitude felt natural to me.

I was content walking my own path, spending my days in my own company, carrying my own thoughts without needing anyone to share them with.
I thought I had mastered being alone.

Not until I found you.

And suddenly, I became someone I had never met before.
Someone who longs for your affection in the smallest moments.
Someone who rereads conversations and overthinks tiny details, wondering if I said the wrong thing, did the wrong thing, or loved you in the wrong way.
Someone whose heart quietly searches for reassurance in your voice, your words, and your presence.

Before you, love was only an idea to me.

A beautiful concept I could understand with my mind, but never truly with my heart.
I knew what people said about it.
I knew what stories wrote about it.
But I never really knew what it felt like.

Not until I found you—

and almost lost you.

Because it was then that everything became clear.
I realized that the mere thought of losing you carried a pain so deep that I could hardly explain it.
A pain that sat heavily in my chest.
A pain that brought tears I couldn't stop.
A pain that made me realize how much of my world had quietly become you.

And in that moment, I understood something I had spent my whole life trying to define.

Love is not always knowing why.
Love is not having every answer.

Sometimes, love is simply knowing that the thought of a life without someone feels unbearable.
Sometimes, love is finding a person whose absence hurts more than any loneliness ever could.

And if the thought of losing you could break my heart before I even understood all the reasons I loved you,

then perhaps that was the answer all along.

Perhaps that was love.

So if there is one thing I know with certainty now, it is this:

I could spend a thousand lifetimes searching for what I found in you and still never find its equal.
And if I ever fall in love again,
it will only be because it is you I am falling into.

Always.
`
};

/* =========================================================
   DOM
========================================================= */

const owlWrapper =
document.getElementById("owl-wrapper");

const owl =
document.getElementById("owl");

const owlScene =
document.getElementById("owl-scene");

const envelope =
document.getElementById("delivery-envelope");

const letterScene =
document.getElementById("letter-scene");

const letterContainer =
document.getElementById("letter-container");

const seal =
document.getElementById("seal-container");

const letterContent =
document.getElementById("letter-content");

const cursor =
document.getElementById("quill-cursor");

const letterContentArea =
document.getElementById("letter-content-area");

const endingScene =
document.getElementById("ending-scene");

const dustContainer =
document.getElementById("dust-container");

const sparkContainer =
document.getElementById("spark-container");

const bg =
document.getElementById("hogwarts-bg");

const musicControlText =
document.getElementById("music-control-text");

const musicToggleButton =
document.getElementById("music-toggle-button");

/* AUDIO */

const music =
document.getElementById("music");

const ambient =
document.getElementById("ambient");

const owlWing =
document.getElementById("owl-wing");

const sealBreak =
document.getElementById("seal-break");

const paperOpen =
document.getElementById("paper-open");

/* =========================================================
   AUDIO SETUP
========================================================= */

music.src =
APP_CONFIG.musicSource;

ambient.src =
APP_CONFIG.ambientSource;

owlWing.src =
APP_CONFIG.owlWingSource;

sealBreak.src =
APP_CONFIG.sealBreakSource;

paperOpen.src =
APP_CONFIG.paperOpenSource;

music.loop = true;
ambient.loop = true;

music.volume = 0.75;
ambient.volume = 0.22;

/* =========================================================
   STATE
========================================================= */

let started = false;
let frameIndex = 0;
let flapInterval = null;
let themeMusicActive = false;
let autoScrollEnabled = false;
let userIsScrolling = false;
let scrollPauseTimeout = null;

/* =========================================================
   INIT
========================================================= */

window.addEventListener("load", () => {

    animateBackground();

    createDust();

    startOwlFlapping();

    startOwlHover();

    animateTapHint();

    flyInOwl();

});

/* =========================================================
   BACKGROUND MOTION
========================================================= */

function animateBackground(){

    gsap.to(bg,{

        scale:1.12,

        duration:55,

        ease:"none"
    });
}

/* =========================================================
   OWL FLAP
========================================================= */

function startOwlFlapping(){

    flapInterval =
    setInterval(() => {

        frameIndex =
        (frameIndex + 1)
        %
        APP_CONFIG.flapFrames.length;

        owl.src =
        APP_CONFIG.flapFrames[
            frameIndex
        ];

    }, APP_CONFIG.flapSpeed);
}

/* =========================================================
   OWL HOVER
========================================================= */

function startOwlHover(){

    gsap.to(owlWrapper,{

        y:-10,

        repeat:-1,

        yoyo:true,

        duration:2.2,

        ease:"sine.inOut"
    });
}

/* =========================================================
   OWL ARRIVAL
========================================================= */

function flyInOwl(){

    gsap.set(owlWrapper,{

        scale:.18,

        y:-400,

        opacity:0
    });

    gsap.to(owlWrapper,{

        scale:1,

        y:0,

        opacity:1,

        duration:4.5,

        ease:"power2.out"
    });
}

/* =========================================================
   TAP GLOW
========================================================= */

function animateTapHint(){

    gsap.to(".hint-glow",{

        scale:1.5,

        opacity:.4,

        repeat:-1,

        yoyo:true,

        duration:1.2
    });
}

/* =========================================================
   DUST
========================================================= */

function createDust(){

    for(let i=0;i<45;i++){

        const particle =
        document.createElement("div");

        particle.className =
        "dust";

        dustContainer.appendChild(
            particle
        );

        gsap.set(particle,{

            x:
            Math.random() *
            window.innerWidth,

            y:
            Math.random() *
            window.innerHeight,

            scale:
            .5 + Math.random()
        });

        gsap.to(particle,{

            y:
            `-=${200 + Math.random()*300}`,

            x:
            `+=${Math.random()*80-40}`,

            opacity:0,

            repeat:-1,

            duration:
            10 + Math.random()*8,

            delay:
            Math.random()*5,

            ease:"none"
        });
    }
}

/* =========================================================
   SPARKS
========================================================= */

function createSpark(){

    // Sparks were causing unwanted visuals and interfering with touch
    // interactions on some mobile in-app browsers. Disable by making
    // this function a no-op.
    return;
}

/* =========================================================
   AUDIO START
========================================================= */

async function startAudio(){

    try{

        if(themeMusicActive){

            ambient.pause();

            await music.play();

        }else{

            await ambient.play();
        }

    }catch(e){

        console.log(e);
    }
}

function updateMusicControl(){

    if(themeMusicActive){

        musicControlText.textContent =
        "This week's music is playing";

        musicToggleButton.textContent =
        "Pause";

    }else{

        musicControlText.textContent =
        "Play this week's music?";

        musicToggleButton.textContent =
        "Play";
    }
}

async function playThemeMusic(){

    themeMusicActive = true;

    ambient.pause();

    try{

        await music.play();

    }catch(e){

        console.log(e);
    }

    updateMusicControl();
}

async function pauseThemeMusic(){

    themeMusicActive = false;

    music.pause();

    if(started){

        ambient.play().catch(() => {});
    }

    updateMusicControl();
}

musicToggleButton.addEventListener(
    "click",
    () => {
        if(music.paused){
            playThemeMusic();
        } else {
            pauseThemeMusic();
        }
    }
);

/* =========================================================
   MAIN CINEMATIC
========================================================= */

async function beginExperience(){

    if(started) return;

    started = true;

    await startAudio();

    owlWing.currentTime = 0;

    owlWing.play();

    const tl =
    gsap.timeline();

    /* Hide hint */

    tl.to("#tap-hint",{

        opacity:0,

        duration:.4
    });

    /* Envelope appears */

    tl.set(envelope,{

        opacity:1,

        scale:.25,

        y:10
    });

    /* Owl rises */

    tl.to(owlWrapper,{

        y:-120,

        duration:.9,

        ease:"power2.out"
    });

    /* Letter detached */

    tl.to(envelope,{

        scale:1,

        opacity:1,

        y:0,

        duration:1.1,

        ease:"back.out(1.8)"
    },"<");

    /* Owl leaves */

    tl.to(owlWrapper,{

        y:-700,

        scale:.5,

        opacity:0,

        duration:2,

        ease:"power3.in"
    });

    /* Envelope zoom */

    tl.to(envelope,{

        scale:4.5,

        rotation:6,

        duration:2,

        ease:"power2.inOut"
    });

    /* Switch scenes */

    tl.set(owlScene,{
        display:"none"
    });

    tl.set(letterScene,{
        visibility:"visible"
    });

    tl.to(letterScene,{

        opacity:1,

        duration:.6
    });

    /* Seal */

    tl.set(seal,{

        scale:.5,

        opacity:0
    });

    tl.to(seal,{

        opacity:1,

        scale:1,

        duration:.8
    });

    /* Break */

    tl.add(() => {

        sealBreak.play();

    });

    tl.to(seal,{

        rotation:180,

        scale:1.8,

        opacity:0,

        duration:1
    });

    /* Letter */

    tl.set(letterContainer,{

        opacity:1
    });

    tl.fromTo(
        letterContainer,
        {
            scale:.4
        },
        {
            scale:1,
            duration:1.2,
            ease:"back.out(1.4)"
        }
    );

    tl.add(() => {

        paperOpen.play();

        startCandleFlicker();

        startTypewriter();

    });
}

/* =========================================================
   CANDLELIGHT
========================================================= */

function startCandleFlicker(){

    gsap.to("#candle-glow",{

        opacity:.8,

        scale:1.15,

        repeat:-1,

        yoyo:true,

        duration:1.6,

        ease:"sine.inOut"
    });
}

/* =========================================================
   TYPEWRITER
========================================================= */

function startTypewriter(){

    const text =
    APP_CONFIG.letterText;

    let index = 0;

    letterContent.textContent = "";
    letterContentArea.scrollTop = 0;
    autoScrollEnabled = true;

    function scheduleAutoScroll(){

        if(!autoScrollEnabled || userIsScrolling) return;

        letterContentArea.scrollTop =
        letterContentArea.scrollHeight;
    }

    function write(){

        if(index < text.length){

            letterContent.textContent +=
            text[index];

            if(index % 4 === 0){

                createSpark();
            }

            scheduleAutoScroll();

            index++;

            setTimeout(
                write,
                APP_CONFIG.typewriterSpeed
            );

        }else{

            cursor.style.display =
            "none";

            autoScrollEnabled = false;
            userIsScrolling = false;
            clearTimeout(scrollPauseTimeout);

            showEnding();
        }
    }

    write();
}

/* =========================================================
   ENDING
========================================================= */

function showEnding(){

    gsap.set(
        endingScene,
        {
            visibility:"visible"
        }
    );

    gsap.to(
        endingScene,
        {
            opacity:1,
            duration:2,
            delay:2
        }
    );

    gsap.to(
        "#ending-content",
        {
            scale:1.05,
            repeat:-1,
            yoyo:true,
            duration:2.5
        }
    );
}

/* =========================================================
   EVENT
========================================================= */

owlWrapper.addEventListener(
    "click",
    beginExperience
);

owlWrapper.addEventListener(
    "touchstart",
    beginExperience,
    {
        passive:true
    }
);

function pauseAutoScroll(){

    if(!autoScrollEnabled) return;

    userIsScrolling = true;

    clearTimeout(scrollPauseTimeout);

    scrollPauseTimeout = setTimeout(() => {
        userIsScrolling = false;
    }, 1200);
}

letterContentArea.addEventListener("wheel", pauseAutoScroll, { passive:true });
letterContentArea.addEventListener("touchstart", pauseAutoScroll, { passive:true });
letterContentArea.addEventListener("touchmove", pauseAutoScroll, { passive:true });
letterContentArea.addEventListener("scroll", pauseAutoScroll, { passive:true });

