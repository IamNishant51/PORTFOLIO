---
name: lighthouse
description: Audits web performance, accessibility, SEO, and best practices using Google Lighthouse CLI, parses audit results, and provides targeted optimizations.
---

# Lighthouse Audit & Optimization Skill

Use this skill when auditing or optimizing web applications for Core Web Vitals, accessibility, SEO, and best practices using Google Lighthouse.

## Execution Workflow

### 1. Build and Start the Target Application
Always run tests against a production build when possible to get realistic bundle size, minification, and caching numbers:
```bash
npm run build
npm run start
```

### 2. Run Lighthouse Audit via CLI
Execute Lighthouse with headless Chrome:
```bash
npx --yes lighthouse <URL> \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --output=json,html \
  --output-path=./lighthouse-report \
  --only-categories=performance,accessibility,best-practices,seo \
  --preset=desktop # or --form-factor=mobile
```

### 3. Parse and Interpret Results
Extract category scores and failing audits from the generated JSON:
- **Performance**: LCP (Largest Contentful Paint), CLS (Cumulative Layout Shift), TBT (Total Blocking Time), Speed Index, FCP (First Contentful Paint).
- **Accessibility**: ARIA attributes, contrast ratios, button names, link descriptions, heading order.
- **Best Practices**: Security headers, HTTPS, console errors, vulnerable dependencies.
- **SEO**: Meta tags, canonical links, structured data (JSON-LD), robots.txt, tap targets.

### 4. Apply Targeted Optimizations
- Address root causes without degrading design or removing intentional animations.
- Re-run Lighthouse to verify score improvements.
