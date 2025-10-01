# A Story in ASCII — Hachiware's Proposal

A from-scratch, single-page interactive story told entirely through layered ASCII art. This project features a detailed, animated background, a foreground character animation, and a playful interactive narrative.

---

## 🎯 Project Vision

This project aims to create a rich, heartfelt experience using only text characters. It leverages layered animations to create a sense of depth, with a slow-moving, atmospheric background behind a more dynamic foreground character. The narrative guides the user through a short, sweet story culminating in a question with a unique interactive twist.

---

## 🧩 Features

-   **Layered ASCII Animation:** A detailed background with drifting petals and growing vines animates independently from the foreground character, creating depth.
-   **Character Animation:** A multi-frame Hachiware character walks across the screen to present a lily-of-the-valley flower.
-   **Full Narrative Sequence:** The story progresses through timed scenes, from an introductory message to a final celebration.
-   **Evasive ASCII Button:** The `[ No ]` button is rendered in ASCII but is attached to an invisible HTML overlay. When hovered, it triggers JavaScript to redraw the button in a new location, making it playfully difficult to click.
-   **ASCII Modal & Celebration:** The proposal is presented in a stylized ASCII modal. A "Yes" click triggers a celebratory scene with falling hearts and a smiling character.
-   **Responsive Design:** The layout and font size adapt to different screen widths to ensure the art is always readable.

---

## 🔧 Tech Stack

| Component             | Technology / Library | Purpose                                                 |
| --------------------- | -------------------- | ------------------------------------------------------- |
| Rendering & Visuals   | **HTML `<pre>` & JS**  | Two layered `<pre>` tags are updated by JavaScript to create the animations. |
| UI & Interaction      | **HTML, CSS, JS**    | Invisible overlays handle button clicks; CSS manages layout and fonts. |
| Hosting               | Any static site host | Can be run locally or on services like GitHub Pages, Netlify, etc. |

---

## 📁 File Structure

```
/
│
├── index.html          # Main HTML with layered <pre> canvases
├── styles.css          # All styles for layout, font, and colors
├── ascii.js            # Core script for rendering, animation, and all logic
└── README.md           # This file
```

---

## 🚀 Setup & Run Instructions

This project requires no installation or build steps. Simply serve the files with a local web server.

1.  **Navigate to the project directory** in your terminal:
    ```sh
    cd /Users/adamanwar/Desktop/iris
    ```

2.  **Start a local server**. The simplest method is using Python:
    ```sh
    # For Python 3
    python3 -m http.server
    ```

3.  **Open in browser**: Open your web browser and go to the URL provided, which is typically:
    `http://localhost:8000`

---

## 🎨 Customization

All creative content can be modified in `ascii.js`.

-   **Change Text & Messages**: Edit the `STORY_TEXT` object to change the narrative.
-   **Edit ASCII Art**: The `ASSETS` object contains all ASCII art for the background, character, and effects. You can edit these multi-line strings directly.
-   **Adjust Timings**: The `runStorySequence` function controls the delays between scenes. Modify the `wait()` values to change the story's pacing.
-   **Animation Behavior**: Constants at the top of the script like `BG_PETAL_COUNT` or `RENDER_INTERVAL` can be tweaked to change animation density and speed.
