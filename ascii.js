document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const bgCanvas = document.getElementById('background-canvas');
    const fgCanvas = document.getElementById('foreground-canvas');
    const container = document.getElementById('canvas-container');
    const giftBoxElement = document.getElementById('gift-box');


    // --- CONFIGURATION ---
    const RENDER_INTERVAL = 50;
    const SCENE_WIDTH = 125;
    const SCENE_HEIGHT = 42;
    const BG_PETAL_COUNT = 200;

    // --- ASSETS (Cleaned & Updated) ---
    const ASSETS = {
        backgroundArt: '',
        petal: ['*', '`', '.']
    };

    const GIFT_BOX_ART = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡠⢄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠉⠀⠀⠙⢦⠀⠀⠀⠀⠀⠀⠀⢠⠎⠁⠀⠀⠈⠱⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠂⠀⠀⠀⠀⠈⣧⠖⠚⠉⠓⠲⢤⠇⠐⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⣠⡀⠀⠀⠀⠸⡄⢀⣄⣠⢀⡼⠀⠀⠀⣀⣤⠿⡄⣼⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣠⠤⠖⠚⠙⠹⣼⡏⡙⠳⢤⣀⠀⢹⠏⠉⠉⣾⠀⣀⣠⡶⠟⠉⣰⡿⠛⠒⠲⢤⣀⣀⠀⠀⠀
⡶⢾⣉⡁⠀⡀⠠⠀⢂⠀⠈⠙⢳⣶⠦⠭⠽⠿⣦⣀⡠⠿⠿⠿⢶⣶⡞⠛⠉⠀⡀⠄⠠⠀⢀⢈⣩⣶⡆
⣇⠠⡈⠉⠳⠦⣤⣂⡤⠼⠚⠋⠉⠀⣀⡤⠴⠞⠋⠉⠙⠲⠤⣄⣀⠀⠉⠙⠲⠦⣤⣐⣤⠾⡛⠫⢑⢸⡇
⠙⡦⢥⣐⠀⡀⠀⣽⠐⠀⢠⣶⡞⠉⠡⠐⠀⠄⠂⠁⡐⠀⡀⢀⠈⢉⣒⣦⣄⠀⠠⣟⢈⡐⣡⣸⡴⣾⠃
⠈⡇⠀⠈⠙⠳⠦⣾⠀⠀⢸⢬⠉⠛⠶⣤⣈⡀⠄⠁⡀⣐⣠⡴⠾⡛⠍⢃⡇⡈⢔⣯⢶⠻⠍⢃⠱⣻⠀
⠈⡇⠀⠁⠂⡀⠄⢻⠩⠓⢾⢦⣀⡄⠀⡀⠈⠙⠲⣶⠻⠍⢃⡉⠔⣀⣣⡾⡷⡞⠯⣏⠐⡌⠰⢁⠪⣽⠀
⠈⡇⠀⠁⠄⠀⠄⣻⠀⠀⢸⠀⠈⠙⠓⠦⣌⣀⠄⡿⢐⣨⣴⠶⡛⢋⠱⢈⡇⡐⠠⡗⢠⠂⢅⠢⢑⣿⠀
⠈⡇⠀⡈⠀⠌⠀⢾⠀⠀⢸⠀⢈⠠⠐⠀⡀⠉⠛⣿⠛⠱⠈⠤⠑⡨⠐⠌⡇⠄⠡⡟⠠⠌⢂⠔⡡⢾⠀
⠈⡇⠀⡀⠌⠀⠄⣻⠀⠀⢸⠀⠠⠀⡐⠀⠄⠂⠀⣿⠈⠔⡉⠄⣃⠐⡉⢌⡗⡈⠐⣯⠐⣁⠊⡐⢌⣿⠀
⠐⡇⠀⠀⠄⠈⠀⢾⠀⠀⢸⠀⠄⠁⡀⠐⢀⠈⠄⣿⠈⡰⠈⠔⡀⠎⡐⢂⡧⢀⠡⡗⢠⠂⡘⡀⢎⣾⠀
⠐⡇⠀⢁⠠⠁⠈⢾⠀⠀⢸⠀⡀⠂⠀⠌⠀⠠⠀⣿⠐⢠⠉⡰⠈⠔⡠⢃⡇⢂⠐⣯⠀⠆⢡⠐⢢⢿⠀
⠠⡇⠀⠠⠀⠂⠁⢾⠀⠀⢸⠀⠀⠄⠁⠠⠈⠀⠄⣿⠠⢁⠢⢁⠜⠠⣁⠢⡏⠠⢈⡧⠘⡈⢄⠊⡔⣻⠀
⠠⡇⠀⡁⠐⠈⠀⣻⠀⠀⢸⠀⠁⠠⠈⡀⠄⠁⡀⣿⢀⠊⡐⠌⡠⠃⢄⠒⡏⡐⠠⡟⢠⠁⠆⢌⠰⣻⠀
⠐⡇⢁⠀⠄⠁⠠⣹⠀⠀⢸⠀⠈⠄⠐⠀⡀⠂⠀⣿⠀⠜⢠⠘⠠⠑⡂⡘⡇⠄⠡⣟⠠⠌⡈⢄⢣⣿⠀
⠀⠉⠚⠣⢤⣈⠀⣽⠀⠀⢸⠀⠁⠠⠈⠀⠄⠠⠁⣿⠈⡐⢂⠡⢃⡁⠆⢡⡏⠠⢁⡷⢀⣣⡼⠖⠋⠁⠀
⠀⠀⠀⠀⠀⠈⠉⢻⠀⠀⢸⠀⠈⡄⢠⠁⠀⠂⡄⣿⠀⡁⠊⢰⠀⡆⠘⢠⡇⠁⣦⡟⠉⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠉⠒⠾⠲⢤⣀⠄⠀⡁⠠⠀⣿⠐⠤⢁⠢⢁⣔⡥⠾⠷⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠓⠦⣤⣀⡿⢠⣼⠴⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

    // --- SCENES ---
    const SCENES = [
        { text: 'Oh my — can you believe it’s been a month already?' },
        { text: 'Happy Montaversary! ❤️💕💖' }
    ];
    let currentSceneIndex = 0;

    // --- STATE (Cleaned) ---
    let frame = 0;
    let bgParticles = [];
    let bgBuffer, fgBuffer; // Buffers for rendering

    // --- RENDERING LOGIC ---
    const createBuffer = () => Array.from({ length: SCENE_HEIGHT }, () => Array(SCENE_WIDTH).fill(' '));

    function clearBuffer(buffer) {
        for (let i = 0; i < SCENE_HEIGHT; i++) {
            buffer[i].fill(' ');
        }
    }

    function draw(buffer, content, x, y, centered = false) {
        const lines = typeof content === 'string' ? content.split('\n') : content;
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
        clearBuffer(bgBuffer);
        draw(bgBuffer, ASSETS.backgroundArt, 0, 0, true);
        renderToCanvas(bgCanvas, bgBuffer);
    }

    function renderForeground() {
        clearBuffer(fgBuffer);

        // Petal animation
        if (bgParticles.length < BG_PETAL_COUNT && frame % 2 === 0) {
            const petalType = ASSETS.petal[Math.floor(Math.random() * ASSETS.petal.length)];
            bgParticles.push({
                x: Math.random() * SCENE_WIDTH,
                y: 0,
                type: petalType,
                vy: 0.1 + Math.random() * 0.3,
                vx: (Math.random() - 0.5) * 0.2
            });
        }
        bgParticles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            if (p.y >= SCENE_HEIGHT) p.y = 0;
            if (p.x < 0) p.x = SCENE_WIDTH - 1;
            if (p.x >= SCENE_WIDTH) p.x = 0;
            draw(fgBuffer, p.type, Math.floor(p.x), Math.floor(p.y));
        });

        frame++;
        const midY = Math.floor(SCENE_HEIGHT / 2);
        draw(fgBuffer, SCENES[currentSceneIndex].text, 0, midY - 2, true);
        giftBoxElement.textContent = GIFT_BOX_ART; // Display gift box
        renderToCanvas(fgCanvas, fgBuffer);
    }

    function nextScene() {
        currentSceneIndex = (currentSceneIndex + 1) % SCENES.length;
    }

    // --- INITIALIZATION ---
    function handleResize() {
        const charWidth = window.innerWidth / SCENE_WIDTH;
        const charHeight = window.innerHeight / SCENE_HEIGHT;
        const fontSize = Math.min(charWidth * 4.0, charHeight * 4.0, 40);
        container.style.fontSize = `${fontSize}px`;
    }

    function init() {
        handleResize();
        bgBuffer = createBuffer();
        fgBuffer = createBuffer();
        window.addEventListener('resize', handleResize);

        fetch('background.txt')
            .then(response => response.text())
            .then(text => {
                ASSETS.backgroundArt = text;
                setInterval(() => {
                    renderBackground();
                    renderForeground();
                }, RENDER_INTERVAL);
                renderForeground(); // Render initial scene
            });

        // Add event listener for scene transition
        document.addEventListener('click', nextScene); // Click anywhere to advance scene
    }

    init();
});