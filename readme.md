# 🌸 A Story in ASCII — Hachiware's Proposal  

An interactive, single-page ASCII art story told entirely with **layered text animations**. The project combines drifting ASCII petals, a foreground character, and playful interaction to create a heartfelt digital experience.  

---

## 🎯 Project Vision  

This project is about pushing the boundaries of what can be done with just **text characters**. It combines background animations, character ASCII art, and an evolving narrative to deliver an emotional, game-like story experience — without using any images or external libraries.  

---

## 🧩 Features  

- **ASCII Animation Engine**  
  - Two `<pre>` canvases: background and foreground  
  - Background: drifting ASCII petals (`*`, `'`, `` ` ``) with smooth movement  
  - Foreground: narrative text, later extensible to character art  

- **Interactive Narrative**  
  - Text scenes drawn from `STORY_TEXT` in `ascii.js`  
  - Story can be customized easily  

- **Responsive Scaling**  
  - Dynamically adjusts font size based on viewport  
  - Works on desktop and mobile  

- **Customizable Engine**  
  - Constants (`SCENE_WIDTH`, `SCENE_HEIGHT`, `BG_PETAL_COUNT`, etc.) control density, speed, and pacing  
  - ASCII art and narrative are stored in `ASSETS` and `STORY_TEXT` for easy editing  

---

## 🔧 Tech Stack  

| Component             | Technology / Library | Purpose |
|-----------------------|----------------------|---------|
| Rendering & Visuals   | **HTML `<pre>` + JavaScript** | ASCII art rendering, animation loop |
| Styling               | **CSS**              | Layout, font control, atmosphere |
| Hosting               | **Static** (GitHub Pages, Netlify, local server) | Simple deployment |

---

## 📁 File Structure  

```
/iris
│
├── index.html     # Main HTML structure with layered <pre> canvases
├── styles.css     # Styling for background, layout, and font
├── ascii.js       # Core rendering engine, animation, and story logic
└── readme.md      # Project documentation
```

---

## 🚀 Setup & Run  

No installation or build steps are required. Just open in a browser, or run a quick local server.  

**Method 1: Open directly**  
- Double-click `index.html` to run in your browser.  

**Method 2: Run a local server**  
```sh
cd /Users/adamanwar/Desktop/iris
python3 -m http.server
```
Then visit:  
👉 [http://localhost:8000](http://localhost:8000)  

---

## 🎨 Customization  

All creative content lives in `ascii.js`.  

- **Narrative Text**  
  - Edit `STORY_TEXT` to change story messages.  
  ```js
  const STORY_TEXT = {
      intro: 'Oh my — can you believe it’s been a month already?'
  };
  ```

- **ASCII Art**  
  - Modify `ASSETS.backgroundArt` or add new art frames.  
  ```js
  const ASSETS = {
      backgroundArt: [ " ", " ", " " ],
      petal: ['*', "'", '`']
  };
  ```

- **Animation Behavior**  
  - Change constants like `BG_PETAL_COUNT`, `RENDER_INTERVAL`, `SCENE_WIDTH`, and `SCENE_HEIGHT` to tweak performance and density.  

- **Scaling**  
  - The `handleResize()` function dynamically adjusts ASCII size. Edit scaling factors there for different visual styles.  

---

## 🛠 How It Works  

1. **Initialization (`init()`)**  
   - Creates ASCII buffers for background & foreground  
   - Handles resizing for responsiveness  

2. **Animation Loop**  
   - Runs every `RENDER_INTERVAL` (default 50ms)  
   - `renderBackground()` updates drifting petals  
   - `renderForeground()` places story text  

3. **Rendering**  
   - Each buffer is converted into a string with `renderToCanvas()`  
   - Displayed inside `<pre>` tags (`background-canvas` and `foreground-canvas`)  

---

## 📌 Future Improvements  

- Multi-scene story progression with timing (`runStorySequence`)  
- ASCII-based interactive modal with “Yes/No” options  
- Character art frames for walking animations  
- Celebration scene with falling ASCII hearts  

---

## 📜 License  

MIT License — free to use, modify, and share.  