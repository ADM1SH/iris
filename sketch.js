// ==================================================
//      INTERACTIVE VISUAL ART - MAIN SCRIPT
// ==================================================

// --- GLOBAL VARIABLES ---
let petals = [];
let bellFlowers = [];
let character;
let gravity;

// --- STATE MANAGEMENT ---
// We use 'scene' to control the flow of the story.
// Scenes: 'intro', 'narrative', 'so', 'question', 'celebration'
let scene = 'intro';

// --- DOM Elements ---
let modal, yesButton, noButton, question, finalMessage, buttonContainer;
let introText, narrativeText, soText;

// ==================================================
//      P5.JS SETUP FUNCTION
// ==================================================
function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 0.03);

    // --- Initialize Art & Character ---
    for (let i = 0; i < 200; i++) {
        petals.push(new Petal(random(width), random(height)));
    }
    for (let i = 0; i < 25; i++) {
        bellFlowers.push(new BellFlower(random(width), random(height)));
    }
    // Create our placeholder character off-screen to the left
    character = new Character(-100, height / 1.5);

    // --- Link to HTML Elements ---
    modal = select('#modal');
    yesButton = select('#yes-button');
    noButton = select('#no-button');
    question = select('#question');
    finalMessage = select('#final-message');
    buttonContainer = select('#button-container');
    introText = select('#intro-text');
    narrativeText = select('#narrative-text');
    soText = select('#so-text');

    // --- Attach Event Listeners ---
    yesButton.mousePressed(handleYes);
    noButton.mouseOver(moveNoButton);

    // --- Start the Story ---
    runStorySequence();
}

// ==================================================
//      P5.JS DRAW FUNCTION
// ==================================================
function draw() {
    background('#f4f8f0');

    // --- Animate and Display Particles ---
    for (let p of petals) {
        p.applyForce(gravity);
        p.update();
        p.display();
        p.checkEdges();
    }
    for (let f of bellFlowers) {
        f.update();
        f.display();
        f.checkEdges();
    }

    // --- Scene-based Animations ---
    if (scene === 'question' || scene === 'celebration') {
        character.update();
        character.display();
    }

    if (scene === 'celebration' && frameCount % 2 === 0) {
        petals.push(new Petal(width / 2, height / 2));
    }
}

// ==================================================
//      STORY SEQUENCE LOGIC
// ==================================================

// Helper function to create a delay
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runStorySequence() {
    // Scene 1: Intro
    scene = 'intro';
    introText.addClass('visible');
    await wait(3000);
    introText.removeClass('visible');
    await wait(1500);

    // Scene 2: Narrative
    scene = 'narrative';
    narrativeText.addClass('visible');
    await wait(3000);
    narrativeText.removeClass('visible');
    await wait(1500);

    // Scene 3: "So..."
    scene = 'so';
    soText.addClass('visible');
    await wait(1500);
    soText.removeClass('visible');
    await wait(1000);

    // Scene 4: The Question
    scene = 'question';
    modal.removeClass('hidden');
    modal.style('opacity', '1');
    character.enter(); // Trigger the character's entrance
}

// ==================================================
//      UI INTERACTION LOGIC
// ==================================================

function handleYes() {
    scene = 'celebration';
    character.celebrate();

    question.addClass('hidden');
    buttonContainer.addClass('hidden');
    finalMessage.removeClass('hidden');

    modal.style('opacity', '0');
    setTimeout(() => modal.addClass('hidden'), 500);

    for (let i = 0; i < 300; i++) {
        let p = new Petal(width / 2, height / 2);
        p.applyForce(p5.Vector.random2D().mult(random(2, 5)));
        petals.push(p);
    }
}

function moveNoButton() {
    const modalContent = select('.modal-content').elt;
    const button = noButton.elt;
    const modalRect = modalContent.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxTop = modalRect.height - buttonRect.height - 80;
    const maxLeft = modalRect.width - buttonRect.width - 40;

    let newTop = random(20, maxTop);
    let newLeft = random(20, maxLeft);

    noButton.style('top', `${newTop}px`);
    noButton.style('left', `${newLeft}px`);
}

// ==================================================
//      PLACEHOLDER CHARACTER CLASS
// ==================================================
// You can replace this with your own image/animation.
class Character {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.targetX = x;
        this.size = 80;
        this.isJumping = false;
    }

    enter() {
        this.targetX = width / 2; // Target the center of the screen
    }

    celebrate() {
        this.isJumping = true;
        this.vel.y = -6; // Jump up!
    }

    update() {
        // Animate the character's entrance
        this.pos.x = lerp(this.pos.x, this.targetX, 0.05);

        // Handle celebration jump
        if (this.isJumping) {
            this.pos.y += this.vel.y;
            this.vel.y += 0.2; // Gravity for the jump
            if (this.pos.y > height / 1.5) {
                this.pos.y = height / 1.5;
                this.isJumping = false;
            }
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        
        // *** EDIT OR REPLACE THIS PART WITH YOUR IMAGE ***
        // To use an image (e.g., 'chikawa.png'), first declare a variable:
        // let img;
        // Then load it in setup(): img = loadImage('assets/images/chikawa.png');
        // Then display it here: image(img, -this.size/2, -this.size/2, this.size, this.size);

        // Placeholder drawing:
        fill(255, 240, 245); // Cute pinkish color
        stroke(200, 180, 190);
        strokeWeight(3);
        ellipse(0, 0, this.size, this.size); // Body
        fill(0);
        noStroke();
        ellipse(-15, -5, 8, 8); // Eye 1
        ellipse(15, -5, 8, 8);  // Eye 2
        // Smile
        noFill();
        stroke(0);
        strokeWeight(2);
        arc(0, 5, 20, 10, 0, PI);
        // *** END OF EDITABLE/REPLACEABLE PART ***

        pop();
    }
}

// --- Other classes (Petal, BellFlower) remain the same as before ---

class Petal { constructor(x, y) { this.pos = createVector(x, y); this.vel = createVector(random(-0.5, 0.5), random(-1, -2)); this.acc = createVector(0, 0); this.size = random(8, 15); this.color = color(255, 255, 240, random(150, 200)); this.mass = this.size / 5; } applyForce(force) { let f = p5.Vector.div(force, this.mass); this.acc.add(f); } update() { this.vel.add(this.acc); this.pos.add(this.vel); this.acc.mult(0); this.pos.x += sin(this.pos.y / 50) * 0.3; } display() { noStroke(); fill(this.color); ellipse(this.pos.x, this.pos.y, this.size, this.size * 0.6); } checkEdges() { if (this.pos.y > height + this.size) { this.pos.y = -this.size; this.pos.x = random(width); } } }
class BellFlower { constructor(x, y) { this.pos = createVector(x, y); this.vel = createVector(random(-0.2, 0.2), random(-0.5, -1)); this.size = random(15, 25); this.angle = 0; } update() { this.pos.add(this.vel); this.angle = sin(frameCount * 0.02 + this.pos.x) * 0.2; let mouseDist = dist(mouseX, mouseY, this.pos.x, this.pos.y); if (mouseDist < 100) { let push = p5.Vector.sub(this.pos, createVector(mouseX, mouseY)); push.setMag(0.5); this.pos.add(push); } } display() { push(); translate(this.pos.x, this.pos.y); rotate(this.angle); noStroke(); fill(250, 255, 250, 180); arc(0, 0, this.size, this.size, 0, PI, CHORD); fill('#8cb38c'); ellipse(0, this.size * 0.5, 4, 4); pop(); } checkEdges() { if (this.pos.y < -this.size) { this.pos.y = height + this.size; this.pos.x = random(width); } if (this.pos.y > height + this.size) { this.pos.y = -this.size; this.pos.x = random(width); } if (this.pos.x < -this.size || this.pos.x > width + this.size) { this.vel.x *= -1; } } }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
