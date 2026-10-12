# Sharing Workforce Capability & Development

## What the media represents

The short showcase is a demonstration of a **fictional management exercise**, not a product implementation at an actual employer. Captured screens come from actual Chromium interactions with the application. The headings and captions are editorial material outside those screens.

The theme is practical: when one person develops into a new responsibility, the business needs to account for their existing work, mentoring time, succession risk and accountable management decisions.

## LinkedIn assets

| File | Purpose |
| --- | --- |
| [leadership-studio-linkedin.gif](media/leadership-studio-linkedin.gif) | Main LinkedIn image upload; 12 seconds, 760 × 760, 60 frames |
| [leadership-studio-linkedin.mp4](media/leadership-studio-linkedin.mp4) | Higher-resolution native-video alternative; 1080 × 1080, 15 fps |
| [leadership-studio-linkedin-cover.png](media/leadership-studio-linkedin-cover.png) | Static cover or fallback |
| [leadership-studio-social.png](media/leadership-studio-social.png) | Website/GitHub Open Graph preview (1200 × 630) |
| [leadership-studio-walkthrough.gif](media/leadership-studio-walkthrough.gif) | Longer repository walkthrough without LinkedIn editorial titles |

Only select **one** of GIF or MP4 for the initial LinkedIn post. They are alternatives; uploading both in one launch is not needed.

## Publishing checklist

1. Open the [live application](https://nathantaylorops.github.io/workforce-capability-development/) and inspect the captured scenario for accuracy.
2. Upload the GIF to LinkedIn as an **image**, not a video. If the preview is static, use the MP4 as a **video** instead. LinkedIn may change how animation is rendered.
3. Check the first frame, readable titles, and final frame in the mobile post preview. Review that no caption is cropped by the platform's UI.
4. Keep the first-person post about managing organisational capability. Explain that systems help leaders make decisions; do not imply any automated approval, staff ranking, real workforce measurements or proven ROI.
5. Link to the live public exercise. Treat the GitHub source as optional context for a follow-up or the profile's Featured section.
6. After posting, review the people and conversations reached, profile visits and actual demo interest alongside raw impression counts.

## Reproduce the demo

[Script](../scripts/capture-linkedin.mjs) and [GitHub Actions workflow](../.github/workflows/showcase-capture.yml) capture the real browser journey. The encoder's automated checks enforce the 760 × 760 / 60-frame GIF cap (34,656,000 total pixels), the 1080 × 1080 MP4 output and both files' presence.

The educational boundary is intentional: being trained, having observed competence and holding delegated authority are different facts. The simulation does not grant permissions or replace a qualified manager's judgement.
