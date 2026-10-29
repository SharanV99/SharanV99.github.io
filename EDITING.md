# Sharan Venkatesh — Portfolio

A single-page static portfolio website. No frameworks, no build step — just
HTML, CSS, and JavaScript. Hosts free on GitHub Pages.

## Files

| File          | What it holds                                                        |
| ------------- | -------------------------------------------------------------------- |
| `index.html`  | All the page content (your text, projects, certs, links)             |
| `styles.css`  | All the styling (colors, fonts, layout, mobile behavior)             |
| `script.js`   | All the animations and interactivity (you rarely need to touch this) |
| `favicon.svg` | The little icon in the browser tab                                   |
| `resume.pdf`  | **You add this** — your resume, so the "RESUME" button works         |

## To preview the site

Double-click `index.html` — it opens in your browser. That's the real site.

---

## How to make common edits

All content edits happen in **`index.html`**. Each section is marked with a
big comment like `<!-- ===== 6. PROJECTS ===== -->` so you can find it fast.

### Change any text
Find the words in `index.html` and type over them. Save, refresh the browser.

### Add your photo
1. Put your photo in the folder, named e.g. `photo.jpg`.
2. In `index.html`, find `<!-- PHOTO PLACEHOLDER -->`.
3. Replace the `<div class="photo-frame">…</div>` contents with:
   `<div class="photo-frame"><img src="photo.jpg" alt="Sharan Venkatesh" /></div>`

### Add your resume (makes the RESUME button work)
Put your resume in the folder named exactly `resume.pdf`. Done.

### Set your GitHub and project links
- Find each `<a href="#" class="project-card"` and replace `#` with the repo URL.
- Find `VIEW ALL ON GITHUB` and set its `href` to your GitHub profile.
- Find the GitHub social link (`data-icon="github"`) and set its `href`.

### Add a project preview image
1. Put the image in the folder (e.g. `project1.png`).
2. In the matching card, replace the `<div class="project-preview">…</div>`
   contents with: `<div class="project-preview"><img src="project1.png" alt="…"/></div>`

### Add a new certificate
In the `7. CERTIFICATIONS` section, copy one whole `<div class="cert-card">…</div>`
block, paste it, and change the category, title, issuer, and the `YEAR —` slot.

### Add a new project or timeline entry
Same idea: copy one `<article class="project-card">` or `<div class="tl-item">`
block, paste it, edit the text.

### Fill in certificate years
In each cert card, replace `YEAR —` with the real year (e.g. `2025 —`).

---

## How to put it online (GitHub Pages)

You'll do this with **Claude Code** so you also learn Git along the way.

### One-time setup
1. Install Node.js (https://nodejs.org).
2. Install Claude Code — see https://docs.claude.com for current steps.
3. Make a free GitHub account at https://github.com.

### Deploy with Claude Code
1. Open a terminal in this folder and run `claude`.
2. Tell it: *"Initialize a git repo here, create a new GitHub repo named
   `<your-username>.github.io`, push these files, and enable GitHub Pages."*
3. Claude Code will run the Git commands and explain each one as it goes.
4. Your site goes live at `https://<your-username>.github.io`.

### Updating the site later
1. Edit your files.
2. In the folder, run `claude` and say: *"Commit my changes and push them."*
3. The live site updates in a minute or two.

*(Prefer no terminal? You can instead create a repo on github.com and use
"Add file → Upload files" to drag these in, then turn on Pages under
Settings → Pages. Same result.)*

---

## Notes
- Keep this site and your resume consistent — don't let them contradict.
- Only put real, verifiable work here. Repos should be public and clean.
- The site is fully responsive; resize the browser to see the mobile layout.
