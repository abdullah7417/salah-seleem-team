# Golden Reference Architecture — v1.0.0

> **What is this file?**
> This document serves **two purposes simultaneously**:
> 1. **Team Reference** — Fixed rules, standards, and explanations that never change across the project.
> 2. **AI Template** — Placeholders (`<like_this>`) that the AI fills per landing page.
>
> **How to read it:**
> - Blocks marked with **fixed team knowledge** — read and understand them.
> - Blocks marked with **project-specific decisions** — filled by AI or Tech Lead.
> - Never remove a block. Only fill or update blocks.

---

## 0. Project Identity

| Property | Value |
|---|---|
| **Project Name** | SST Landings |
| **Version** | `1.0.0` |
| **Primary Stack** | React 19 + Vite 7 + TanStack Router |
| **UI Framework** | Tailwind CSS 4 + Framer Motion + Swiper |
| **Default Locale** | Arabic (RTL) |
| **API Style** | RESTful (external backend) |
| **Auth Driver** | Bearer token per landing (API key) |
| **Last Updated** | `2026-05-18` |
| **Owner / Tech Lead** | SST Team |

---

## 1. Core System Principles

---

### Rule 1.1 — Single Source of Truth

**What it means:**
Every landing page is defined in exactly one config entry in `src/config/landings.js`. This config drives route resolution, section ordering, theme selection, meta tags, and API data fetching. No landing-specific logic should exist outside its config entry and its `src/landings/<key>/` directory.

**Why it matters:**
Prevents drift between routes, themes, and sections. Makes AI-assisted landing creation reliable and repeatable.

**How it works:**
```
src/config/landings.js                     ← the one truth (config registry)
src/landings/<landing-key>/sections.js     ← section-to-component map
src/landings/<landing-key>/sections/       ← section components
src/landings/<landing-key>/data/           ← static fallback data
src/landings/<landing-key>/components/     ← landing-specific shared components
```

**Override Policy:** Only Tech Lead may add/remove entries from `landings.js`. New sections must be approved before adding to the section map.

---

### Rule 1.2 — Landing Isolation

**What it means:**
Each landing owns its own sections, static data, theme, and optional layout components (Footer, WhatsApp). A landing must not import sections or components from another landing's directory. Shared components live in `src/components/`.

**Exceptions allowed:**
- `src/components/common/` — shared components (Container, CTAButton, SectionTitle, SectionSkeleton)
- `src/components/ui/` — shared UI primitives (Button)
- `src/themes/` — theme definitions referenced by key

**Shared Core Components:**
- `Container` — max-width wrapper
- `CTAButton` — reusable CTA with variants (primary, dark, outline, white)
- `SectionTitle` — section header with eyebrow, title, subtitle
- `SectionSkeleton` — loading placeholder

---

### Rule 1.3 — RTL and Arabic by Default

**What it means:**
All user-facing text is in Arabic. The entire app is RTL (`dir="rtl"` on `<html>`). All Tailwind utility classes must account for RTL layout (use `start`/`end` over `left`/`right` where applicable).

**Implementation:**
- Global `direction: rtl` set in `styles.css`
- Font: `Cairo` (Google Fonts) as fallback, custom `DIN Next LT Arabic` as primary
- Custom font families: `regular`, `medium`, `bold` (via `@font-face`)
- Tailwind classes: `.regular`, `.medium`, `.bold` for font-weight
- Theme CSS variables applied to `<html>` via `ThemeProvider`

**Default Locale:** `ar`
**Fallback Font:** `"Cairo", "Tajawal", system-ui, sans-serif`

---

## 2. Landing Architecture Rules

---

### Rule 2.1 — Config-Driven Rendering

**Every landing follows this exact rendering pipeline:**

```
URL /$slug
  → TanStack Router (routes/$slug.tsx)
    → head() → meta tags from config
    → LandingRenderer.jsx
      → getLandingConfig(slug)
      → ThemeProvider(themeKey) → sets CSS variables
      → LandingDataProvider → fetches API data
      → For each section in config.sections[]:
          → Look up component in sectionMaps[config.theme]
          → Render via DynamicSection (Suspense + lazy)
      → Optional: layoutComponents (Footer, WhatsApp)
```

**LandingRenderer rules:**
- Loads section map per theme
- Passes API data via context (`LandingDataContext`)
- Uses `Suspense` with `SectionSkeleton` fallback for each section
- 404 page shown if slug is not in config

**Section rules:**
- Each section is lazy-loaded via `React.lazy()`
- Sections receive data via `useLandingData()` hook, not props
- Sections must handle loading/empty states internally
- Sections must be self-contained (own styles, own logic)

---

### Rule 2.2 — Section Map Contract

**What it means:**
Every landing must export a `SECTION_MAP` from `src/landings/<key>/sections.js`. This map connects section keys (strings from config) to React components.

**Why:**
Enables config-driven ordering. Sections can be reordered, added, or removed by editing `landings.js` config only — no code changes needed.

**Section map format:**
```js
import { lazy } from "react";

export const SECTION_MAP = {
  sectionKey: lazy(() => import("./sections/ComponentName").then(m => ({ default: m.ExportName }))),
};
```

**Naming convention:**
- Section key: `camelCase` (e.g., `hero`, `beforeAfter`, `videoTestimonials`)
- Component file: `PascalCase` (e.g., `Hero.jsx`, `BeforeAfter.tsx`)
- Named export: `PascalCase` matching filename

---

### Rule 2.3 — Route and URL Structure

**All landing routes follow this pattern:**
```
/<slug>     → Landing page (e.g., /biomedical, /lifestyle)
/           → Redirects to default landing (/lifestyle)
```

**Route file:** `src/routes/$slug.tsx` (TanStack Router file-based routing)
**Default redirect:** `src/routes/index.tsx` → `redirect({ to: "/lifestyle" })`

**Adding a new slug:**
1. Add entry to `landings` object in `src/config/landings.js`
2. Create `src/landings/<slug>/` directory with `sections.js` and sections
3. Register section map in `LandingRenderer.jsx` → `sectionMaps`
4. (If needed) Register layout components in `LandingRenderer.jsx` → `layoutComponents`

**Current Slugs:** `biomedical`, `lifestyle`

---

## 3. UI & UX Standards

---

### Rule 3.1 — Section Layout Standards

**All sections follow these layout patterns:**

| Pattern | Use case |
|---|---|
| Full-width with `Container` | Default — section spans viewport, content constrained to `max-w-7xl` |
| Full-width no container | Hero, dark backgrounds, edge-to-edge designs |
| Split layout (2-col) | Desktop: content + image/video side by side |
| Stacked on mobile | All 2-col layouts must stack vertically on `< lg` |

**Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Responsive breakpoints (Tailwind defaults):**
| Breakpoint | Min Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

**Mobile-first:** Always write mobile styles first, then add `md:` / `lg:` / `xl:` overrides.

---

### Rule 3.2 — Section Visual Hierarchy

**Every section should have:**
- Clear visual separation from adjacent sections (background color change, spacing, or divider)
- A heading (`SectionTitle` component or custom `<h2>`)
- Maximum content width for readability
- Adequate vertical padding (`py-16 md:py-20 lg:py-24`)

**Background color alternation:**
Sections should alternate between light (`bg-background`, `bg-cream`) and dark (`bg-dark`, `bg-primary`) backgrounds to create visual rhythm.

**Spacing standard:**
- Section padding: `py-16 md:py-20 lg:py-24`
- Content gap: `gap-6 md:gap-8 lg:gap-10`
- Between sections: handled by section's own padding, not external margins

---

### Rule 3.3 — CTA (Call-to-Action) Standards

**All CTAs must have:**
1. **Clear action text** — Arabic, first-person or imperative ("يلا نعمل فورمة", "اشترك دلوقتي")
2. **Distinct visual treatment** — `bg-primary` or `bg-white` with high contrast
3. **Hover/active states** — `hover:scale-[1.03] active:scale-[0.98]` or `hover:bg-primary-deep`
4. **Link target** — `href="#pricing"` or external payment URL

**CTA Button component:** Use `<CTAButton>` from `src/components/common/CTAButton.jsx`

| Variant | Use Case |
|---|---|
| `primary` | Main CTA — `bg-primary text-white shadow-glow` |
| `dark` | Secondary CTA on light backgrounds |
| `outline` | Tertiary action |
| `white` | CTA on dark/colored backgrounds |

**CTA placement rules:**
- Hero section: always has at least one CTA
- Pricing section: each plan card has a CTA
- Sticky CTA: optional, appears after scrolling past hero
- Final CTA: optional, last section before footer

---

## 4. Data Architecture

---

### Rule 4.1 — API Data Flow

**Every landing fetches data from the backend API on mount:**

```
LandingRenderer
  → useLandingApi(apiEndpoint, apiKey)
    → createClient(apiKey)
      → fetch(`${VITE_API_BASE_URL}/${apiEndpoint}`, { headers: { Authorization: Bearer ${apiKey} } })
    → Returns { data, loading, error }
  → LandingDataProvider value={data}
    → Sections access data via useLandingData()
```

**API client:** `src/api/client.js`
- Base URL: `VITE_API_BASE_URL` env var (fallback: `http://salah-seleem-team.test/api/`)
- Auth: Bearer token (API key per landing)
- Methods: `get(endpoint)`, `post(endpoint, body)`

**Data hook:** `src/hooks/useLandingApi.js`
- Returns `{ data, loading, error }`
- Prevents duplicate fetches for same endpoint
- Handles cancellation on unmount

**Fallback pattern:**
- Static data files in `src/landings/<key>/data/` serve as fallback when API data is unavailable
- Sections should use `useMemo` to merge API data with static fallbacks:
  ```js
  const apiData = useLandingData();
  const items = apiData?.some_field ?? staticItems;
  ```

---

### Rule 4.2 — Static Data Files

**Static data files** live in `src/landings/<key>/data/` and contain:
- Section content (text, reviews, FAQs, pricing plans)
- Image references (imported via Vite)
- YouTube video IDs
- Any content needed when API is unavailable

**File naming:** `camelCase.js` — e.g., `index.js`, `transformations.js`, `features.js`

**Export pattern:** Named exports for each data set
```js
export const heroReviews = [...];
export const pricingOptions = [...];
export const faqs = [...];
```

---

## 5. Theme System

---

### Rule 5.1 — Theme Definition Contract

**Every landing has a theme** defined in `src/themes/<key>.js`. A theme is an object of CSS custom properties that gets applied to `<html>` via `ThemeProvider`.

**Theme object structure:**
```js
export const landingTheme = {
  "--brand-red": "#e63312",
  "--brand-dark": "#172120",
  "--primary": "#e63312",
  "--primary-foreground": "#ffffff",
  "--background": "#ffffff",
  "--foreground": "#172120",
  // ... all CSS variables from styles.css @theme block
};
```

**Required CSS variables per theme:**
- Brand colors: `--brand-red`, `--brand-dark`, `--brand-offwhite`, `--brand-teal`
- Text colors: `--text-primary`, `--text-secondary`, `--text-muted`
- Semantic colors: `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- Component colors: `--background`, `--foreground`, `--card`, `--border`, `--input`, `--ring`
- Gradients: `--gradient-hero`, `--gradient-primary`, `--gradient-guarantee`
- Shadows: `--shadow-glow`, `--shadow-card`
- Derived: `--primary-glow`, `--primary-deep`, `--dark`, `--dark-soft`, `--cream`, `--success`

**ThemeProvider:** `src/providers/ThemeProvider.jsx`
- Accepts `themeKey` prop → looks up theme from internal map
- Sets CSS variables on `document.documentElement`
- Cleans up variables on unmount/switch

---

## 6. Media & Asset Rules

---

### Rule 6.1 — Asset Management

**All images and fonts** are managed by Vite's asset pipeline.

**Image locations:**
- `src/assets/` — shared images (logos, placeholders, transformation photos)
- Section-specific images: import directly in section component or data file

**Import pattern:**
```js
import logoSrc from "@/assets/logo.png";
import trans1 from "@/assets/trans-1.jpg";
```

**Font files:**
- `src/assets/fonts/` — custom web fonts (DIN Next LT Arabic)
- Loaded via `@font-face` in `styles.css`
- Font families: `regular`, `medium`, `bold` (not weight-based, separate families)

**Video embeds:**
- YouTube videos via iframe embed (no local video files)
- YouTube video IDs stored as constants or in data files
- Thumbnails loaded from `img.youtube.com`
- Desktop: inline play via YouTube IFrame API
- Mobile: Fancybox modal or autoplay background

---

## 7. Animation Standards

---

### Rule 7.1 — Framer Motion Patterns

**All entry animations** use Framer Motion with `whileInView` for scroll-triggered reveals:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6 }}
>
```

**Standard animation values:**
| Property | Value |
|---|---|
| `initial.opacity` | `0` |
| `initial.y` | `20` |
| `transition.duration` | `0.5` – `0.7` |
| `viewport.once` | `true` (animate only once) |
| `viewport.margin` | `"-80px"` (trigger before fully visible) |

**Staggered children:**
Use `transition.delay` in increments of `0.1` for sequential elements within a section.

**Hover animations:**
- Buttons: `whileHover={{ y: -2 }}` or `hover:scale-[1.03] active:scale-[0.98]`
- Cards: subtle scale or shadow increase

**Custom CSS animations (in `styles.css`):**
- `animate-float-slow` — 4s ease-in-out vertical float
- `animate-pulse-ring` — pulsing ring effect for play buttons

---

### Rule 7.2 — Fancybox Integration

**All video modals** use Fancybox (`@fancyapps/ui`):

**Lazy loading pattern:**
```js
import("@fancyapps/ui").then(({ Fancybox }) => {
  Fancybox.bind("[data-fancybox='group-name']", { Toolbar: false, animated: true, ... });
});
import("@fancyapps/ui/dist/fancybox/fancybox.css");
```

**Lazy trigger:** Load Fancybox only when the section enters viewport via `IntersectionObserver`.

**Custom hook:** `useFancybox(selector, options)` in `src/hooks/useFancybox.ts`

---

## 8. Component Standards

---

### Rule 8.1 — File Naming Convention

| Type | Convention | Example |
|---|---|---|
| Section component | `PascalCase.jsx` or `.tsx` | `Hero.jsx`, `FAQ.tsx` |
| Shared component | `PascalCase.jsx` | `CTAButton.jsx`, `Container.jsx` |
| Hook | `camelCase.js` or `.ts` | `useLandingApi.js`, `useFancybox.ts` |
| Data file | `camelCase.js` | `transformations.js`, `index.js` |
| Theme file | `camelCase.js` | `biomedical.js`, `lifestyle.js` |
| Config file | `camelCase.js` | `landings.js` |
| Utility | `camelCase.ts` | `utils.ts` |

**Export convention:**
- Section components: **default export** for lifestyle, **named export** for biomedical
- Shared components: **default export**
- Data: **named exports**
- Hooks: **named exports**

---

### Rule 8.2 — Import Aliases

**All imports use `@/` alias** mapped to `src/`:
```js
import { cn } from "@/lib/utils";
import { useLandingData } from "@/context/LandingDataContext";
import Container from "@/components/common/Container";
```

**Configuration:** `vite-tsconfig-paths` plugin resolves `@/` in `vite.config.ts`

---

## 9. Build & Deployment

---

### Rule 9.1 — Build Configuration

**Vite config** (`vite.config.ts`) includes:
- `TanStackRouterVite()` — file-based route generation
- `tailwindcss()` — Tailwind CSS 4 processing
- `tsconfigPaths()` — path alias resolution
- `react()` — React Fast Refresh
- `compression()` — Brotli + Gzip compression for assets > 1KB

**Build output structure:**
```
dist/
  assets/
    js/     ← [name]-[hash].js
    css/    ← [name]-[hash].css
    img/    ← [name]-[hash].{jpg,png,svg,...}
    fonts/  ← [name]-[hash].{woff2,ttf,...}
```

**Code splitting (manual chunks):**
| Chunk | Contents |
|---|---|
| `react-vendor` | React, ReactDOM |
| `tanstack` | TanStack Router |
| `swiper` | Swiper carousel |
| `fancybox` | Fancybox modal |
| `framer-motion` | Framer Motion |

---

## 10. Testing & Quality Standards

---

### Rule 10.1 — Code Quality Contract

**Every section/component must:**
- Pass ESLint (`npm run lint`)
- Be properly formatted (`npm run format`)
- Handle loading state (skeleton or null return)
- Handle empty data gracefully
- Be responsive (mobile + tablet + desktop)

**Linting:** ESLint with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
**Formatting:** Prettier

---

## 11. Delivery Workflow

---

### Rule 11.1 — Landing Delivery Checklist

**A landing page is considered "delivered" only when ALL of the following are true:**

```
[ ] Landing config entry added to src/config/landings.js
[ ] Theme file created in src/themes/<key>.js
[ ] Section map created in src/landings/<key>/sections.js
[ ] All sections implemented and rendering correctly
[ ] API integration working (data fetched and displayed)
[ ] Static fallback data in place for offline/API-down scenario
[ ] Responsive design verified (mobile, tablet, desktop)
[ ] RTL layout verified
[ ] All animations working and performant
[ ] Lighthouse audit: Performance > 80, Accessibility > 90
[ ] Meta tags (title, description, OG) set correctly
[ ] SEO: proper heading hierarchy, alt texts, aria-labels
[ ] PR reviewed and approved
```

**PR review required approvals:** `1`
**Branch naming convention:** `feature/<landing-key>` or `feature/<landing-key>-<section>`

---

### Rule 11.2 — Config Change Policy

**Once a landing config is merged to main, changes follow this process:**

| Change Type | Process |
|---|---|
| New section added | Create section component + add to section map + update config sections array |
| Section removed | Remove from config sections array + clean up unused component |
| Section reordered | Edit `sections[]` array in `landings.js` config |
| Theme change | Update theme file + verify all sections render correctly |
| API endpoint change | Update config + update `useLandingApi` calls |

---

## 12. Performance Standards

---

### Rule 12.1 — Performance Contract

**Every landing page must meet:**
- **Lazy loading:** All sections loaded via `React.lazy()` + `Suspense`
- **Image optimization:** Use WebP where possible, proper `width`/`height` attributes
- **Font loading:** `font-display: swap` on all `@font-face` declarations
- **No layout shifts:** Reserve space for images/iframes with proper dimensions
- **Minimal bundle:** Each section is a separate chunk, loaded only when needed

**Performance monitoring:**
- Vite build reports compressed sizes
- Manual chunks isolate heavy libraries
- CSS code-split per component

---

*End of Golden Reference — v1.0.0*

---

> **This file is the law.**
> Any deviation from these rules must be documented as an exception in the relevant landing's documentation and approved by the Tech Lead.
> Last reviewed: `2026-05-18` · Owner: SST Team

---

## Document Ecosystem

*This file does not work alone. It is the root of a five-file system.
Every file in this ecosystem has a single responsibility. Do not duplicate content across files.*

| File | Responsibility | Created | Changes |
|---|---|---|---|
| `golden-reference.md` ← **you are here** | Project-wide rules & standards | Once per project | Rarely — Tech Lead only |
| `domain-doc.md` | Business description of a landing page | Once per landing | When landing scope changes |
| `design-doc.md` | Technical design of a new section or feature | Once per section | During design phase only |
| `master-template.yaml` | Technical definition of a landing page config | Once per landing | With every config change |
| `ui-registry.yaml` | All UI components & their contracts | Once per project | When a new component is added |

**Reading order for a new team member:**
```
1. golden-reference.md   ← understand the rules
2. ui-registry.yaml      ← understand the UI system
3. domain-doc.md         ← understand the landing page
4. master-template.yaml  ← understand the config spec
5. design-doc.md         ← understand the section being built
```

**Who owns what:**
```
Tech Lead / Architect  → golden-reference.md, ui-registry.yaml
Product / Marketing    → domain-doc.md
Developer / AI         → master-template.yaml, design-doc.md
```

**Cross-file reference rules:**
- `domain-doc` must reference the Golden Reference rule number for every standard it follows
- `design-doc` must reference both the relevant `domain-doc` and `master-template.yaml`
- `master-template.yaml` must reference the `ui-registry` component key for every section
- Never copy content from one file to another — always reference by rule number or file path
