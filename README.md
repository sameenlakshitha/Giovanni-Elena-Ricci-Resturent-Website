# Giovanni & Elena Ricci Restaurant Website

A responsive, static restaurant website for Giovanni & Elena Ricci. It is built with plain HTML, CSS, and JavaScript, so it can be opened and edited in VS Code without a build step.

## Run locally

### VS Code Live Server

1. Clone the repository and open its folder in VS Code.
2. Install the **Live Server** extension, if needed.
3. Right-click `index.html` and choose **Open with Live Server**.

### Terminal

Node.js 18 or newer is recommended. From the project folder, run:

```bash
npm start
```

Then visit [http://localhost:3000](http://localhost:3000).

## Verify the project

```bash
npm run check
```

This verifies the page's essential metadata and confirms that every local asset referenced by `index.html` exists. The same check runs on pull requests and pushes to `main` through GitHub Actions.

## Project structure

```text
assets/             Images and background video
index.html          Page structure and content
style.css           Responsive site styles
testi-carousel.js   Testimonial carousel behavior
```

## Important follow-up work

- Replace placeholder contact details, social links, reviews, and the `Sarab` template branding with the restaurant's real information.
- Connect the contact/reservation form to a secure form provider or backend; it currently has no submission endpoint.
- Re-encode `assets/videos/bgvid.mov` as a compressed WebM/MP4 and add a poster image. The current video is large for a website.
- Before deleting stale branches or duplicate images, make a backup and confirm no external link or deployment still depends on them.
