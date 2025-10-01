document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const bgCanvas = document.getElementById('background-canvas');
    const fgCanvas = document.getElementById('foreground-canvas');
    const container = document.getElementById('canvas-container');
    const yesButtonOverlay = document.getElementById('yes-button-overlay');
    const noButtonOverlay = document.getElementById('no-button-overlay');

    // --- CONFIGURATION ---
    const RENDER_INTERVAL = 50;
    const SCENE_WIDTH = 120;      // characters
    const SCENE_HEIGHT = 40;     // characters
    const BG_PETAL_COUNT = 600;

    // --- ULTRA-SAFE, ERROR-PROOF ASSETS ---
    const ASSETS = {
        hachiwareIdle: [
            "  /\_/\  ",
            " ( o.o ) ",
            "  > ^ <  "
        ],
        hachiwareWalk: [
            "  /\_/\  ",
            " ( >.> ) ",
            "  > ^ <  "
        ],
        hachiwareSmile: [
            "  /\_/\  ",
            " ( ^.^ ) ",
            "  > v <  "
        ],
        flower: [
            "   *   ",
            "--_|_--",
            "   |   "
        ],
        backgroundArt: [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " "
        ],
        heart: '<3',
        petal: '.'
    };

    const STORY_TEXT = {
        intro: 'Oh my — can you believe it’s been a month already?',
        narrative: 'We haven’t really made it official yet, right?',
        so: 'So...',
        question: 'Will you be my girlfriend?',
        celebration: 'I’m the happiest person right now,\nthank you for saying yes. <3'
    };

    let scene = 'intro';
    let frame = 0;
    let characterX = -20;
    let bgParticles = [];
    let fgParticles = [];
    let yesButtonPos = { x: 28, y: 16 };
    let noButtonPos = { x: 48, y: 16 };

    const createBuffer = () => Array.from({ length: SCENE_HEIGHT }, () => Array(SCENE_WIDTH).fill(' '));

    function draw(buffer, content, x, y, centered = false) {
        const lines = Array.isArray(content) ? content : [content];
        lines.forEach((line, i) => {
            const startX = centered ? Math.floor((SCENE_WIDTH - line.length) / 2) : x;
            if (y + i < 0 || y + i >= SCENE_HEIGHT) return;
            for (let j = 0; j < line.length; j++) {
                if (startX + j >= 0 && startX + j < SCENE_WIDTH) {
                    buffer[y + i][startX + j] = line[j];
                }
            }
        });
    }

    function renderToCanvas(canvas, buffer) {
        canvas.textContent = buffer.map(row => row.join('')).join('\n');
    }

    function renderBackground() {
        const buffer = createBuffer();
        draw(buffer, ASSETS.backgroundArt, 0, 0);
        if (bgParticles.length < BG_PETAL_COUNT && frame % 10 === 0) {
            bgParticles.push({ x: Math.random() * SCENE_WIDTH, y: 0, type: ASSETS.petal });
        }
        bgParticles.forEach(p => {
            p.y += 0.2;
            p.x += (Math.random() - 0.5) * 0.5;
            if (p.y >= SCENE_HEIGHT) p.y = 0;
            draw(buffer, p.type, Math.floor(p.x), Math.floor(p.y));
        });
        renderToCanvas(bgCanvas, buffer);
    }

    function renderForeground() {
        const buffer = createBuffer();
        frame++;
        const midX = Math.floor(SCENE_WIDTH / 2);
        const midY = Math.floor(SCENE_HEIGHT / 2);

        switch (scene) {
            case 'intro':
                draw(buffer, STORY_TEXT.intro, 0, midY - 2, true);
                break;
            case 'narrative':
                draw(buffer, STORY_TEXT.narrative, 0, midY - 2, true);
                break;
            case 'so':
                draw(buffer, STORY_TEXT.so, 0, midY - 1, true);
                break;
            case 'walk':
            case 'question':
                const walkTarget = midX - 10;
                if (characterX < walkTarget) characterX += 1;
                const hachiwareAsset = (frame % 4 < 2) ? ASSETS.hachiwareWalk : ASSETS.hachiwareIdle;
                draw(buffer, hachiwareAsset, characterX, midY);
                draw(buffer, ASSETS.flower, characterX + 12, midY + 2);

                if (scene === 'question') {
                    const modalWidth = 54;
                    const modalX = Math.floor((SCENE_WIDTH - modalWidth) / 2);
                    draw(buffer, `+${'-'.repeat(modalWidth - 2)}+`, modalX, midY - 5);
                    draw(buffer, `|${' '.repeat(modalWidth - 2)}|`, modalX, midY - 4);
                    draw(buffer, `|${' '.repeat(modalWidth - 2)}|`, modalX, midY - 3);
                    draw(buffer, `+${'-'.repeat(modalWidth - 2)}+`, modalX, midY + 5);
                    
                    draw(buffer, STORY_TEXT.question, 0, midY - 3, true);
                    yesButtonPos = { x: midX - 10, y: midY + 2 };
                    noButtonPos = { x: midX + 10, y: midY + 2 };
                    draw(buffer, `[ Yes ]`, yesButtonPos.x, yesButtonPos.y);
                    draw(buffer, `[ No ]`, noButtonPos.x, noButtonPos.y);
                    positionButtons();
                }
                break;
            case 'celebration':
                if (frame % 2 === 0) fgParticles.push({ x: Math.random() * SCENE_WIDTH, y: 0, type: ASSETS.heart });
                
                fgParticles.forEach(p => p.y += 1);
                fgParticles = fgParticles.filter(p => p.y < SCENE_HEIGHT);
                fgParticles.forEach(p => draw(buffer, p.type, Math.floor(p.x), Math.floor(p.y)));

                draw(buffer, ASSETS.hachiwareSmile, midX - 20, midY);
                draw(buffer, ASSETS.flower, midX + 5, midY + 2);
                draw(buffer, STORY_TEXT.celebration.split('\n'), 0, midY - 2, true);
                break;
        }
        renderToCanvas(fgCanvas, buffer);
    }

    function positionButtons() {
        const canvasRect = container.getBoundingClientRect();
        if (canvasRect.width === 0) return;
        const charWidth = (canvasRect.width - 32) / SCENE_WIDTH;
        const charHeight = (canvasRect.height - 32) / SCENE_HEIGHT;
        yesButtonOverlay.style.display = 'block';
        noButtonOverlay.style.display = 'block';
        Object.assign(yesButtonOverlay.style, {
            left: `${canvasRect.left + 16 + yesButtonPos.x * charWidth}px`,
            top: `${canvasRect.top + 16 + yesButtonPos.y * charHeight}px`,
            width: `${7 * charWidth}px`, height: `${1.5 * charHeight}px`
        });
        Object.assign(noButtonOverlay.style, {
            left: `${canvasRect.left + 16 + noButtonPos.x * charWidth}px`,
            top: `${canvasRect.top + 16 + noButtonPos.y * charHeight}px`,
            width: `${6 * charWidth}px`, height: `${1.5 * charHeight}px`
        });
    }

    function handleYesClick() {
        scene = 'celebration';
        yesButtonOverlay.style.display = 'none';
        noButtonOverlay.style.display = 'none';
    }

    function handleNoHover() {
        noButtonPos.x = 15 + Math.floor(Math.random() * (SCENE_WIDTH - 30));
        noButtonPos.y = 14 + Math.floor(Math.random() * 4);
    }

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function runStorySequence() {
        // Story sequence will be added in the next step
    }

    function init() {
        const charWidth = window.innerWidth / SCENE_WIDTH;
        const charHeight = window.innerHeight / SCENE_HEIGHT;
        const fontSize = Math.min(charWidth * 1.4, charHeight * 1.4, 18);
        container.style.fontSize = `${fontSize}px`;

        // Event listeners will be added in a later step

        setInterval(() => {
            renderBackground();
            renderForeground();
        }, RENDER_INTERVAL);
        
        runStorySequence();
    }

    init();
});