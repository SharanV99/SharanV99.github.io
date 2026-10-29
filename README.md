# Sharan Venkatesh · Data Analyst Portfolio

**Live site → [sharanvenkatesh.github.io](https://sharanvenkatesh.github.io)**

Personal portfolio of Sharan Venkatesh, a data analyst in Seattle with a Master's in Analytics (Applied Machine Intelligence) from Northeastern University. The site collects my analytics projects, experience and certifications, plus some photography.

## Featured projects

| # | Project | What it shows | Code |
|---|---|---|---|
| 01 | **Predicting Hospitalization Intensity** | Three-class risk model on 50,733 U.S. adults (MEPS), including catching and removing a data leak that inflated performance | [meps-hospitalization-risk](https://github.com/SharanVenkatesh/meps-hospitalization-risk) |
| 02 | **Last.fm Churn Propensity** | Churn pipeline on real Last.fm listening data with a leakage-safe model and expected-value targeting | [lastfm-churn](https://github.com/SharanVenkatesh/lastfm-churn) |
| 03 | **AI Travel Concierge** | RAG travel planner for 2026 World Cup fans, with a schedule check that blocks answers about matches that don't exist | [ai-travel-concierge](https://github.com/SharanVenkatesh/ai-travel-concierge) |
| 04 | **Boston 311 Service Requests** | 1.3M city service requests in R: the average response time fell, but the typical request didn't get faster | [boston-311-analysis](https://github.com/SharanVenkatesh/boston-311-analysis) |

Each project card opens a short case study on the site: the question, approach, findings, limitations and charts.

## Built with

Plain **HTML, CSS and JavaScript**, with no frameworks or build step, hosted on **GitHub Pages**.

A few details:
- Case-study pop-ups use the native `<dialog>` element
- The hero dot grid is drawn on a `<canvas>` and reacts to the mouse
- The photo strip recycles cards as they move, so it stays smooth on every browser
- Layout and spacing are responsive from phones to large monitors, and motion respects the system's Reduce Motion setting

## Structure

```
index.html          all page content
styles.css          styles
script.js           interactions (menu, pop-ups, dot grid, photo strip)
projects/           project banners and case-study charts
photos/             Behind the Lens photography
badges/             certification badges
certificates/       certificate images
resume.pdf          latest resume
```

## Run locally

No setup needed. Clone the repo and open `index.html` in a browser.

```bash
git clone https://github.com/SharanVenkatesh/sharanvenkatesh.github.io.git
cd sharanvenkatesh.github.io
open index.html
```

## Contact

- Email: sharanv05@gmail.com
- LinkedIn: [linkedin.com/in/sharanv05](https://www.linkedin.com/in/sharanv05)

## Usage

The code is free to read and learn from. The photographs in `/photos`, the project write-ups and the resume are © Sharan Venkatesh, all rights reserved. Please don't reuse them without permission.
