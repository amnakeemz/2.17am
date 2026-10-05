/* =========================================================
   2:17 AM
   CINEMATIC HORROR ENGINE
   FULL FIXED VERSION
========================================================= */


/* =========================================================
   AUDIO PATH
========================================================= */

const SOUND_PATH = "assets/sounds/";


/* =========================================================
   AUDIO
========================================================= */

const sounds = {

    ambience:
        new Audio(SOUND_PATH + "ambience.mp3"),

    door:
        new Audio(SOUND_PATH + "door-creak.mp3"),

    knock:
        new Audio(SOUND_PATH + "knock.mp3"),

    footsteps:
        new Audio(SOUND_PATH + "footsteps.mp3"),

    phone:
        new Audio(SOUND_PATH + "phone-vibrate.mp3"),

    window:
        new Audio(SOUND_PATH + "window-knock.mp3"),

    breathing:
        new Audio(SOUND_PATH + "breathing.mp3"),

    jumpscare:
        new Audio(SOUND_PATH + "jumpscare.mp3"),

    camera:
        new Audio(SOUND_PATH + "camera.mp3"),

    heartbeat:
        new Audio(SOUND_PATH + "heartbeat.mp3")

};


/* =========================================================
   SOUND SETTINGS
========================================================= */

let soundEnabled = true;

sounds.ambience.loop = true;

sounds.ambience.volume = 0.12;
sounds.door.volume = 0.65;
sounds.knock.volume = 0.65;
sounds.footsteps.volume = 0.55;
sounds.phone.volume = 0.65;
sounds.window.volume = 0.7;
sounds.breathing.volume = 0.45;
sounds.jumpscare.volume = 0.85;
sounds.camera.volume = 0.45;
sounds.heartbeat.volume = 0.65;


/* =========================================================
   DOM
========================================================= */

const startScreen =
    document.getElementById("start-screen");

const storyScreen =
    document.getElementById("story-screen");

const endingScreen =
    document.getElementById("ending-screen");

const startButton =
    document.getElementById("start-button");

const restartButton =
    document.getElementById("restart-button");

const soundButton =
    document.getElementById("sound-button");

const storyText =
    document.getElementById("story-text");

const choicesContainer =
    document.getElementById("choices");

const storyLocation =
    document.getElementById("story-location");

const storyTime =
    document.getElementById("story-time");

const sceneLocation =
    document.getElementById("scene-location");

const sceneTime =
    document.getElementById("scene-time");

const sceneCounter =
    document.getElementById("scene-counter");

const endingID =
    document.getElementById("ending-id");

const endingTitle =
    document.getElementById("ending-title");

const endingText =
    document.getElementById("ending-text");

const transition =
    document.getElementById("transition");

const systemMessage =
    document.getElementById("system-message");

const camera =
    document.getElementById("camera");

const storyContainer =
    document.getElementById("story-container");

const loadingScreen =
    document.getElementById("loading-screen");


/* =========================================================
   SCENE OBJECTS
========================================================= */

const door =
    document.getElementById("door");

const doorHandle =
    document.getElementById("door-handle");

const hallwayShadow =
    document.querySelector(".hall-shadow");

const phone =
    document.getElementById("phone-object");

const phoneScreen =
    document.getElementById("phone-screen");

const windowShadow =
    document.getElementById("window-shadow");

const personShadow =
    document.getElementById("person-shadow");

const mysteryBox =
    document.getElementById("mystery-box");

const bed =
    document.getElementById("bed");


/* =========================================================
   GAME STATE
========================================================= */

let currentScene = "start";

let isAnimating = false;

let typingTimer = null;

let sceneNumber = 0;


/* =========================================================
   UTILITY
========================================================= */

function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* =========================================================
   AUDIO ENGINE
========================================================= */

function playSound(name) {

    if (!soundEnabled)
        return;

    const sound =
        sounds[name];

    if (!sound)
        return;

    try {

        sound.currentTime = 0;

        const promise =
            sound.play();

        if (promise) {

            promise.catch(() => {});

        }

    } catch (error) {

        console.log(
            "Sound error:",
            name
        );

    }

}


function stopSound(name) {

    const sound =
        sounds[name];

    if (!sound)
        return;

    try {

        sound.pause();

        sound.currentTime = 0;

    } catch (error) {}

}


function stopAllSounds() {

    Object.keys(sounds)
        .forEach(name => {

            try {

                sounds[name].pause();

                sounds[name].currentTime = 0;

            } catch (error) {}

        });

}


function startAmbience() {

    if (!soundEnabled)
        return;

    try {

        const promise =
            sounds.ambience.play();

        if (promise) {

            promise.catch(() => {});

        }

    } catch (error) {}

}


/* =========================================================
   SOUND BUTTON
========================================================= */

soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;

        soundButton.textContent =
            soundEnabled
                ? "🔊"
                : "🔇";

        if (soundEnabled) {

            startAmbience();

        } else {

            stopAllSounds();

        }

    }
);


/* =========================================================
   STORY SCENES
========================================================= */

const scenes = {


    /* =====================================================
       START
    ===================================================== */

    start: {

        location:
            "BEDROOM",

        time:
            "2:17 AM",

        camera:
            "normal",

        text:
            "You wake up suddenly. The room is completely dark. Your phone says 2:17 AM.",

        choices: [

            {
                text:
                    "Look at the door.",

                next:
                    "door"
            },

            {
                text:
                    "Check your phone.",

                next:
                    "phone"
            },

            {
                text:
                    "Look toward the window.",

                next:
                    "window"
            }

        ]

    },


    /* =====================================================
       DOOR
    ===================================================== */

    door: {

        location:
            "BEDROOM — DOOR",

        time:
            "2:18 AM",

        camera:
            "door",

        cinematic:
            "door",

        text:
            "You stare at the bedroom door. You suddenly notice that it is slightly open.",

        choices: [

            {
                text:
                    "Walk toward the door.",

                next:
                    "footsteps"
            },

            {
                text:
                    "Stay where you are.",

                next:
                    "listen"
            }

        ]

    },


    /* =====================================================
       WINDOW
    ===================================================== */

    window: {

        location:
            "BEDROOM — WINDOW",

        time:
            "2:18 AM",

        camera:
            "window",

        cinematic:
            "window",

        text:
            "The window is closed. Then you hear three slow knocks from the other side.",

        choices: [

            {
                text:
                    "Look outside.",

                next:
                    "wave"
            },

            {
                text:
                    "Ignore the knocking.",

                next:
                    "bed"
            }

        ]

    },


    /* =====================================================
       PHONE
    ===================================================== */

    phone: {

        location:
            "BEDROOM — PHONE",

        time:
            "2:17 AM",

        camera:
            "phone",

        cinematic:
            "phone",

        text:
            "Your phone suddenly vibrates on the table. The screen turns on by itself.",

        choices: [

            {
                text:
                    "Answer the call.",

                next:
                    "call"
            },

            {
                text:
                    "Read the message.",

                next:
                    "message"
            },

            {
                text:
                    "Turn the phone off.",

                next:
                    "phoneOff"
            }

        ]

    },


    /* =====================================================
       BED
    ===================================================== */

    bed: {

        location:
            "BEDROOM — BED",

        time:
            "2:19 AM",

        camera:
            "bed",

        cinematic:
            "bed",

        text:
            "You slowly look at your bed. Something beneath the blanket seems to move.",

        choices: [

            {
                text:
                    "Pull the blanket.",

                next:
                    "openBox"
            },

            {
                text:
                    "Get back into bed.",

                next:
                    "sleep"
            }

        ]

    },


    /* =====================================================
       FOOTSTEPS
    ===================================================== */

    footsteps: {

        location:
            "HALLWAY",

        time:
            "2:19 AM",

        camera:
            "door",

        text:
            "You step into the hallway. Behind you, the bedroom door slowly closes.",

        choices: [

            {
                text:
                    "Keep walking.",

                next:
                    "runHallway"
            },

            {
                text:
                    "Turn around.",

                next:
                    "turnAround"
            }

        ]

    },


    /* =====================================================
       WAVE
    ===================================================== */

    wave: {

        location:
            "WINDOW",

        time:
            "2:20 AM",

        camera:
            "window",

        text:
            "You look through the glass. Across the street, someone is standing perfectly still.",

        choices: [

            {
                text:
                    "Wave at them.",

                next:
                    "lookBackWindow"
            },

            {
                text:
                    "Close the curtains.",

                next:
                    "windowAgain"
            }

        ]

    },


    /* =====================================================
       CALL
    ===================================================== */

    call: {

        location:
            "PHONE",

        time:
            "2:21 AM",

        camera:
            "phone",

        text:
            "You answer the call. There is no voice. Only slow breathing.",

        choices: [

            {
                text:
                    "Say hello.",

                next:
                    "behindYou"
            },

            {
                text:
                    "Hang up.",

                next:
                    "hangUp"
            }

        ]

    },


    /* =====================================================
       MESSAGE
    ===================================================== */

    message: {

        location:
            "PHONE",

        time:
            "2:21 AM",

        camera:
            "phone",

        text:
            "A message appears: \"Don't turn around.\"", 

        choices: [

            {
                text:
                    "Turn around.",

                next:
                    "turnAround"
            },

            {
                text:
                    "Reply: Who are you?",

                next:
                    "reply"
            }

        ]

    },


    /* =====================================================
       PHONE OFF
    ===================================================== */

    phoneOff: {

        location:
            "BEDROOM",

        time:
            "2:22 AM",

        camera:
            "normal",

        text:
            "You turn the phone off. The room becomes completely silent.",

        choices: [

            {
                text:
                    "Go back to sleep.",

                next:
                    "sleep"
            },

            {
                text:
                    "Look for the phone again.",

                next:
                    "findPhone"
            }

        ]

    },


    /* =====================================================
       LISTEN
    ===================================================== */

    listen: {

        location:
            "BEDROOM — DOOR",

        time:
            "2:19 AM",

        camera:
            "door",

        cinematic:
            "shadow",

        text:
            "You listen carefully. Someone whispers your name from the other side.",

        choices: [

            {
                text:
                    "Open the door.",

                next:
                    "escapeRoom"
            },

            {
                text:
                    "Stay silent.",

                next:
                    "familiarFace"
            }

        ]

    }

};


/* =========================================================
   ENDINGS
========================================================= */

const endings = {


    openBox: {

        id:
            "ENDING 01",

        title:
            "YOU DIED",

        text:
            "Something grabs your hand from beneath the blanket. The room goes completely dark.",

        death:
            true

    },


    sleep: {

        id:
            "ENDING 02",

        title:
            "JUST A DREAM",

        text:
            "You close your eyes. When you wake up, it is morning. Everything feels normal.",

        death:
            false

    },


    listen: {

        id:
            "ENDING 03",

        title:
            "SOMEONE IS HOME",

        text:
            "The whisper comes again. This time, it comes from directly behind you.",

        death:
            true

    },


    turnAround: {

        id:
            "ENDING 04",

        title:
            "YOU DIED",

        text:
            "You turn around. There is nothing there. Then something breathes directly beside your ear.",

        death:
            true

    },


    runHallway: {

        id:
            "ENDING 05",

        title:
            "YOU DIED",

        text:
            "You run through the hallway, but every door leads back to the same bedroom.",

        death:
            true

    },


    behindYou: {

        id:
            "ENDING 06",

        title:
            "YOU DIED",

        text:
            "A second voice answers your hello. It is standing behind you.",

        death:
            true

    },


    lookBackWindow: {

        id:
            "ENDING 07",

        title:
            "THE WAVE",

        text:
            "You wave. The person across the street slowly raises their hand. Then you realize they are standing inside your room.",

        death:
            true

    },


    windowAgain: {

        id:
            "ENDING 08",

        title:
            "DON'T LOOK",

        text:
            "You close the curtains. Three seconds later, something knocks from inside the room.",

        death:
            true

    },


    escapeRoom: {

        id:
            "ENDING 09",

        title:
            "WRONG DOOR",

        text:
            "You open the door. The hallway is gone. There is only another bedroom... and someone sleeping in your bed.",

        death:
            true

    },


    familiarFace: {

        id:
            "ENDING 10",

        title:
            "YOU",

        text:
            "The person behind the door looks exactly like you.",

        death:
            true

    },


    reply: {

        id:
            "ENDING 11",

        title:
            "SEEN",

        text:
            "You send the message. A reply appears immediately: \"I can see you.\"", 

        death:
            true

    },


    findPhone: {

        id:
            "ENDING 12",

        title:
            "THE SECOND PHONE",

        text:
            "Your phone is no longer on the table. It is ringing from underneath your bed.",

        death:
            true

    },


    hangUp: {

        id:
            "ENDING 13",

        title:
            "MISSED CALL",

        text:
            "You hang up. The phone immediately rings again. This time, the caller ID shows your own number.",

        death:
            true

    }

};


/* =========================================================
   RESET VISUALS
========================================================= */

function resetVisuals() {

    camera.className = "";

    door.classList.remove(
        "open"
    );

    doorHandle.classList.remove(
        "move"
    );

    hallwayShadow.classList.remove(
        "show"
    );

    phone.classList.remove(
        "on",
        "ringing"
    );

    phoneScreen.classList.remove(
        "on"
    );

    windowShadow.classList.remove(
        "appear"
    );

    personShadow.classList.remove(
        "show"
    );

    mysteryBox.style.transform =
        "scale(.9)";

    mysteryBox.style.opacity =
        ".8";

    bed.style.transform =
        "translateY(0)";

}


/* =========================================================
   CAMERA
========================================================= */

function setCamera(type) {

    camera.className = "";

    if (!type)
        return;


    if (type === "door") {

        camera.classList.add(
            "camera-door"
        );

    }


    if (type === "phone") {

        camera.classList.add(
            "camera-phone"
        );

    }


    if (type === "window") {

        camera.classList.add(
            "camera-window"
        );

    }


    if (type === "bed") {

        camera.classList.add(
            "camera-bed"
        );

    }


    if (type === "shadow") {

        camera.classList.add(
            "camera-shadow"
        );

    }


    if (type === "box") {

        camera.classList.add(
            "camera-box"
        );

    }

}


/* =========================================================
   TRANSITION
========================================================= */

async function cinematicTransition() {

    transition.classList.remove(
        "active"
    );

    void transition.offsetWidth;

    transition.classList.add(
        "active"
    );

    await sleep(450);

}


/* =========================================================
   TYPING
========================================================= */

async function typeText(text) {

    clearInterval(
        typingTimer
    );

    storyText.textContent = "";

    let index = 0;

    return new Promise(resolve => {

        typingTimer =
            setInterval(() => {

                storyText.textContent +=
                    text[index];

                index++;

                if (
                    index >= text.length
                ) {

                    clearInterval(
                        typingTimer
                    );

                    resolve();

                }

            }, 20);

    });

}


/* =========================================================
   UPDATE SCENE INFO
========================================================= */

function updateSceneInfo(scene) {

    storyLocation.textContent =
        scene.location;

    storyTime.textContent =
        scene.time;

    sceneLocation.textContent =
        scene.location;

    sceneTime.textContent =
        scene.time;

    sceneCounter.textContent =
        "SCENE " +
        String(sceneNumber)
            .padStart(2, "0");

}


/* =========================================================
   SHOW CHOICES
========================================================= */

function showChoices(scene) {

    choicesContainer.innerHTML = "";

    scene.choices.forEach(
        (choice, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "choice";

            button.textContent =
                choice.text;

            button.style.opacity =
                "0";

            button.style.transform =
                "translateY(10px)";

            button.disabled =
                true;


            button.addEventListener(
                "click",
                () => {

                    if (isAnimating)
                        return;

                    selectChoice(
                        choice.next
                    );

                }
            );


            choicesContainer.appendChild(
                button
            );


            setTimeout(() => {

                button.style.transition =
                    "all .5s ease";

                button.style.opacity =
                    "1";

                button.style.transform =
                    "translateY(0)";

                button.disabled =
                    false;

            }, 120 + index * 120);

        }
    );

}


/* =========================================================
   DOOR CINEMATIC
========================================================= */

async function doorAnimation() {

    isAnimating = true;

    storyContainer.classList.add(
        "hidden"
    );


    /*
       Camera arrives at door
    */

    await sleep(900);


    /*
       Knock ONLY HERE
    */

    playSound(
        "knock"
    );


    await sleep(1100);


    /*
       Handle moves
    */

    doorHandle.classList.add(
        "move"
    );


    await sleep(350);


    /*
       Door opens
    */

    playSound(
        "door"
    );

    door.classList.add(
        "open"
    );


    await sleep(1400);


    /*
       Shadow appears
    */

    hallwayShadow.classList.add(
        "show"
    );


    await sleep(900);


    storyContainer.classList.remove(
        "hidden"
    );

    isAnimating = false;

}


/* =========================================================
   PHONE CINEMATIC
========================================================= */

async function phoneAnimation() {

    isAnimating = true;

    storyContainer.classList.add(
        "hidden"
    );


    /*
       Camera moves to phone
    */

    await sleep(900);


    /*
       Phone vibrates
       NO knock sound
    */

    playSound(
        "phone"
    );

    phone.classList.add(
        "ringing"
    );


    await sleep(1200);


    /*
       Phone stops vibrating
    */

    phone.classList.remove(
        "ringing"
    );


    /*
       Screen turns ON
    */

    phone.classList.add(
        "on"
    );

    phoneScreen.classList.add(
        "on"
    );


    await sleep(1100);


    /*
       Optional camera sound
    */

    playSound(
        "camera"
    );


    await sleep(500);


    storyContainer.classList.remove(
        "hidden"
    );

    isAnimating = false;

}


/* =========================================================
   WINDOW CINEMATIC
========================================================= */

async function windowAnimation() {

    isAnimating = true;

    storyContainer.classList.add(
        "hidden"
    );


    /*
       Camera moves toward window
    */

    await sleep(900);


    /*
       Window knock ONLY HERE
    */

    playSound(
        "window"
    );


    await sleep(1000);


    /*
       Shadow appears
    */

    windowShadow.classList.add(
        "appear"
    );


    await sleep(1000);


    /*
       Second window knock
    */

    playSound(
        "window"
    );


    await sleep(900);


    storyContainer.classList.remove(
        "hidden"
    );

    isAnimating = false;

}


/* =========================================================
   BED CINEMATIC
========================================================= */

async function bedAnimation() {

    isAnimating = true;

    storyContainer.classList.add(
        "hidden"
    );


    await sleep(900);


    /*
       Breathing ONLY in bed scene
    */

    playSound(
        "breathing"
    );


    await sleep(1000);


    /*
       Bed moves
    */

    bed.style.transform =
        "translateY(-8px)";


    await sleep(350);


    bed.style.transform =
        "translateY(0)";


    await sleep(700);


    storyContainer.classList.remove(
        "hidden"
    );

    isAnimating = false;

}


/* =========================================================
   SHADOW CINEMATIC
========================================================= */

async function shadowAnimation() {

    isAnimating = true;

    storyContainer.classList.add(
        "hidden"
    );


    await sleep(800);


    playSound(
        "breathing"
    );


    personShadow.classList.add(
        "show"
    );


    await sleep(1800);


    storyContainer.classList.remove(
        "hidden"
    );

    isAnimating = false;

}


/* =========================================================
   BOX CINEMATIC
========================================================= */

async function boxAnimation() {

    isAnimating = true;

    storyContainer.classList.add(
        "hidden"
    );


    await sleep(700);


    /*
       Box knock only here
    */

    playSound(
        "knock"
    );


    await sleep(600);


    mysteryBox.style.transform =
        "scale(1.05)";


    await sleep(300);


    mysteryBox.style.transform =
        "scale(.95)";


    await sleep(700);


    storyContainer.classList.remove(
        "hidden"
    );

    isAnimating = false;

}


/* =========================================================
   SCENE ANIMATION ROUTER
========================================================= */

async function runSceneAnimation(scene) {

    resetVisuals();

    setCamera(
        scene.camera
    );


    /*
       NORMAL SCENE
    */

    if (!scene.cinematic) {

        await sleep(650);

        return;

    }


    /*
       DOOR
    */

    if (
        scene.cinematic ===
        "door"
    ) {

        await doorAnimation();

        return;

    }


    /*
       PHONE
    */

    if (
        scene.cinematic ===
        "phone"
    ) {

        await phoneAnimation();

        return;

    }


    /*
       WINDOW
    */

    if (
        scene.cinematic ===
        "window"
    ) {

        await windowAnimation();

        return;

    }


    /*
       BED
    */

    if (
        scene.cinematic ===
        "bed"
    ) {

        await bedAnimation();

        return;

    }


    /*
       SHADOW
    */

    if (
        scene.cinematic ===
        "shadow"
    ) {

        await shadowAnimation();

        return;

    }


    /*
       BOX
    */

    if (
        scene.cinematic ===
        "box"
    ) {

        await boxAnimation();

        return;

    }

}


/* =========================================================
   LOAD SCENE
========================================================= */

async function loadScene(sceneID) {

    if (isAnimating)
        return;


    const scene =
        scenes[sceneID];


    if (!scene) {

        showEnding(
            sceneID
        );

        return;

    }


    currentScene =
        sceneID;

    sceneNumber++;


    isAnimating = true;


    choicesContainer.innerHTML =
        "";


    await cinematicTransition();


    resetVisuals();


    updateSceneInfo(
        scene
    );


    storyScreen.classList.add(
        "active"
    );


    await sleep(250);


    isAnimating = false;


    /*
       RUN CINEMATIC
    */

    await runSceneAnimation(
        scene
    );


    /*
       SHOW STORY
    */

    await typeText(
        scene.text
    );


    /*
       SHOW CHOICES
    */

    showChoices(
        scene
    );

}


/* =========================================================
   SELECT CHOICE
   IMPORTANT:
   NO HORROR SOUND HERE
========================================================= */

async function selectChoice(nextScene) {

    if (isAnimating)
        return;


    isAnimating = true;


    /*
       Disable buttons
    */

    choicesContainer
        .querySelectorAll(".choice")
        .forEach(button => {

            button.disabled =
                true;

        });


    /*
       IMPORTANT:
       DO NOT PUT:

       playSound("knock");

       HERE.

       This function is used by
       EVERY choice in the game.

       Horror sounds are controlled
       by their own scene.
    */


    await sleep(250);


    /*
       ENDING
    */

    if (
        endings[nextScene]
    ) {

        await showEnding(
            nextScene
        );

        return;

    }


    /*
       NEXT SCENE
    */

    isAnimating = false;


    await loadScene(
        nextScene
    );

}


/* =========================================================
   ENDING
========================================================= */

async function showEnding(endingKey) {

    const ending =
        endings[endingKey];


    if (!ending) {

        isAnimating = false;

        return;

    }


    isAnimating = true;


    /*
       Stop ambience
    */

    stopSound(
        "ambience"
    );


    /*
       Transition
    */

    await cinematicTransition();


    storyScreen.classList.remove(
        "active"
    );


    resetVisuals();


    /*
       Ending information
    */

    endingID.textContent =
        ending.id;

    endingTitle.textContent =
        ending.death
            ? "YOU DIED"
            : ending.title;

    endingText.textContent =
        ending.text;


    endingScreen.classList.remove(
        "dead"
    );


    await sleep(400);


    endingScreen.classList.add(
        "active"
    );


    /*
       DEATH
    */

    if (ending.death) {

        await sleep(500);


        endingScreen.classList.add(
            "dead"
        );


        /*
           Heartbeat
        */

        playSound(
            "heartbeat"
        );


        await sleep(900);


        /*
           Jumpscare
        */

        playSound(
            "jumpscare"
        );


        /*
           SIGNAL LOST
        */

        systemMessage.classList.add(
            "show"
        );


        await sleep(1800);


        systemMessage.classList.remove(
            "show"
        );

    }


    isAnimating = false;

}


/* =========================================================
   START GAME
========================================================= */

startButton.addEventListener(
    "click",
    async () => {

        startAmbience();


        startScreen.classList.remove(
            "active"
        );


        storyScreen.classList.add(
            "active"
        );


        sceneNumber = 0;


        await sleep(500);


        await loadScene(
            "start"
        );

    }
);


/* =========================================================
   RESTART GAME
========================================================= */

restartButton.addEventListener(
    "click",
    async () => {

        stopAllSounds();


        endingScreen.classList.remove(
            "active",
            "dead"
        );


        resetVisuals();


        storyText.textContent =
            "";


        choicesContainer.innerHTML =
            "";


        sceneNumber = 0;


        currentScene =
            "start";


        isAnimating = false;


        startScreen.classList.add(
            "active"
        );

    }
);


/* =========================================================
   RANDOM HORROR EVENTS
   DISABLED DURING CINEMATIC
========================================================= */

let horrorTimer = null;


function startRandomHorror() {

    clearInterval(
        horrorTimer
    );


    horrorTimer =
        setInterval(() => {


            /*
               Don't play random sounds
               during animation.
            */

            if (
                !storyScreen.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (isAnimating)
                return;


            /*
               Random horror is intentionally
               very rare.
            */

            if (
                Math.random() > 0.25
            ) {

                return;

            }


            const events = [
                "breathing",
                "footsteps"
            ];


            const random =
                events[
                    Math.floor(
                        Math.random() *
                        events.length
                    )
                ];


            playSound(
                random
            );


        }, 30000);

}


/* =========================================================
   CAMERA SHAKE
========================================================= */

function cameraShake(
    amount = 5,
    duration = 400
) {

    const original =
        camera.style.transform;


    const start =
        performance.now();


    function shake(time) {

        const elapsed =
            time - start;


        if (
            elapsed >= duration
        ) {

            camera.style.transform =
                original;

            return;

        }


        const progress =
            elapsed / duration;


        const strength =
            amount *
            (1 - progress);


        const x =
            (Math.random() * 2 - 1)
            * strength;


        const y =
            (Math.random() * 2 - 1)
            * strength;


        camera.style.transform =
            `translate(${x}px, ${y}px)`;


        requestAnimationFrame(
            shake
        );

    }


    requestAnimationFrame(
        shake
    );

}


/* =========================================================
   AUDIO PRELOAD
========================================================= */

Object.values(
    sounds
).forEach(sound => {

    try {

        sound.preload =
            "auto";

    } catch (error) {}

});


/* =========================================================
   INITIALIZATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            loadingScreen.classList.add(
                "hide"
            );

        }, 1600);


        startRandomHorror();

    }
);


/* =========================================================
   DEBUG API
========================================================= */

window.Game = {

    loadScene,

    showEnding,

    playSound,

    stopSound,

    stopAllSounds,

    cameraShake

};