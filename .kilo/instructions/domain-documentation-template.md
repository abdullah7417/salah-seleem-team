# Domain Documentation — <Landing Page Name>

<!--
════════════════════════════════════════════════════════
 HOW TO USE THIS FILE
════════════════════════════════════════════════════════
  ✏️ Fill this — landing-page specific content
  📖 Read this — fixed guidance, do not remove
  🔗 Cross-reference to another file in the ecosystem
  [OPTIONAL] = Include only if applicable to this landing

  RULES:
   1. Write business/marketing rules in plain language here.
      The master-template.yaml carries the technical version.
   2. Never copy-paste field values from the YAML here.
      Reference the YAML file instead.
   3. Never copy-paste Golden Reference rules here.
      Reference by rule number: "follows Rule 3.1".
   4. Section ordering must match the config sections[] array exactly.
   5. All open questions must have an owner + due date.
   6. Update the changelog every time this file changes.

  FILE POSITION IN ECOSYSTEM:
   golden-reference.md  <- rules this file must follow
   domain-doc.md        <- YOU ARE HERE
   master-template.yaml <- technical version of this doc
   design-doc.md        <- uses this doc as input
   ui-registry.yaml     <- components used in this landing
════════════════════════════════════════════════════════
-->

---

## Document Header

| Property | Value |
|---|---|
| **Landing Name** | `<landing_name>` |
| **Landing Key** | `<landing_key>` |
| **Slug (URL)** | `/<landing_key>` |
| **Theme** | `<theme_key>` |
| **Status** | `<draft | approved | live>` |
| **Owner** | `<owner_or_team>` |
| **Config File** | `src/config/landings.js` (entry: `<landing_key>`) |
| **Sections Map** | `src/landings/<landing_key>/sections.js` |
| **Theme File** | `src/themes/<theme_key>.js` |
| **Golden Reference Version** | `1.0.0` |
| **Doc Version** | `<1.0.0>` |
| **Last Updated** | `<YYYY-MM-DD>` |
| **Approved By** | `<tech_lead_name | pending>` |

### Changelog

| Version | Date | Author | Summary |
|---|---|---|---|
| `1.0.0` | `<YYYY-MM-DD>` | `<author>` | Initial draft |

---

## 1. Overview

**Summary** *(2–3 sentences max)*
> <one_paragraph_describing_this_landing_page>

**Purpose** *(Why does this landing page exist?)*
> <conversion_goal — what action should the visitor take?>

**In Scope**
- <what_this_landing_handles_1>
- <what_this_landing_handles_2>

**Out of Scope**
- <what_this_landing_does_NOT_handle_1>
- <what_this_landing_does_NOT_handle_2>

> *Landing isolation rules → Golden Reference Rule 1.2*
> *Technical config → `master-template.yaml` → module block*

---

## 2. Business Context

**Target Audience**
> <who_is_this_landing_for — demographics, pain points, fitness level>

**Conversion Goal**
| Goal | Description |
|---|---|
| Primary | `<e.g. click payment CTA → redirect to payment gateway>` |
| Secondary | `<e.g. watch video testimonial → build trust>` |
| Tertiary | `<e.g. scroll to pricing → see value>` |

**Key Value Propositions**
| Value | How It's Communicated |
|---|---|
| `<value_1>` | <which_section_conveys_this> |
| `<value_2>` | <which_section_conveys_this> |
| `<value_3>` | <which_section_conveys_this> |

**Differentiation from Other Landings**
> <how_this_landing_differs_from_others_in_the_project — e.g. biomedical targets injury/medical conditions while lifestyle targets general fitness>

> *Section design → `design-doc.md` → Section 6 (Functional Design)*

---

## 3. Core Concepts

**Landing Theme**
> <describe_the_visual_identity — colors, mood, imagery style>

**Brand Elements**
| Element | Description |
|---|---|
| Logo | `<SVG logo used in navbar/hero>` |
| Primary Color | `<theme --brand-red value and meaning>` |
| Dark Color | `<theme --brand-dark value and usage>` |
| Accent Color | `<theme --brand-teal or other accent>` |

**Marketing Terminology**
| Term | Definition |
|---|---|
| **<term_1>** | <plain_language_definition> |
| **<term_2>** | <plain_language_definition> |

*Define terms as the marketing team uses them, not as the code uses them.*

---

## 4. Section Composition

**Sections in Order** *(must match `config.sections[]` in `landings.js`)*

| # | Section Key | Component | Purpose |
|---|---|---|---|
| 1 | `navbar` | `Navbar` | `<navigation_and_cta>` |
| 2 | `hero` | `Hero` | `<main_headline_video_cta>` |
| 3 | `<section_key>` | `<ComponentName>` | `<section_purpose>` |
| 4 | `<section_key>` | `<ComponentName>` | `<section_purpose>` |
| 5 | `pricing` | `Pricing` | `<pricing_plans_and_cta>` |
| 6 | `faq` | `FAQ` | `<objection_handling>` |

**Layout Components**
| Component | Enabled | Notes |
|---|---|---|
| Footer | `<true | false>` | `<which_footer_component>` |
| WhatsApp Button | `<true | false>` | `<floating_whatsapp_button>` |
| Sticky CTA | `<true | false>` | `<appears_after_scrolling>` |

> *Section map technical config → `master-template.yaml` → sections block*
> *Component contracts → `ui-registry.yaml` → section_registry*

---

## 5. Data Definition

**Static Data Files**
| File | Contents | Used By |
|---|---|---|
| `data/index.js` | `<main data exports>` | `<which_sections>` |
| `data/<file>.js` | `<data_description>` | `<which_sections>` |

**API Data Shape**
*Describe the expected API response in business terms.*

| Field | Type | Description |
|---|---|---|
| `<field_key>` | `<type>` | <what_this_field_means_to_marketing> |
| `<field_key>` | `<type>` | <what_this_field_means_to_marketing> |

**Fallback Strategy**
> <how_sections_behave_when_API_data_is_unavailable — e.g. "sections fall back to static data from data/ directory">

> *Full field technical spec → `master-template.yaml` → api block*
> *API client config → `master-template.yaml` → api block*

---

## 6. Content Rules

*Write rules in plain marketing language.
Technical enforcement lives in the component code.
Each rule here should guide content writers and designers.*

**Rules**

**CR-01 — <rule_title>**
> <plain_language_rule_description>
- **Applies to:** `<which_section | all>`
- **Enforcement:** `<must | recommended>`

**CR-02 — <rule_title>**
> <plain_language_rule_description>
- **Applies to:** `<which_section | all>`
- **Enforcement:** `<must | recommended>`

> *CTA standards → Golden Reference Rule 3.3*

---

## 7. User Flow

*Flows must be numbered steps — not prose.
Standard loading behavior follows Golden Reference Rule 4.1 — do not repeat it here.*

**Flow 1 — Visitor arrives at landing**
1. Visitor navigates to `/<slug>` via ad link / social share / direct URL
2. Browser loads page → meta tags set from config (Golden Reference Rule 2.3)
3. Theme CSS variables applied → background, colors, fonts rendered
4. API data fetch begins in background
5. Sections render in order — lazy-loaded with skeleton fallbacks
6. Hero section visible immediately with headline + CTA

**Flow 2 — Visitor engages with content**
1. Visitor scrolls through sections
2. Animations trigger on scroll (Golden Reference Rule 7.1)
3. Sections display content from API (or static fallback)
4. Video testimonials open in Fancybox modal on click (Golden Reference Rule 7.2)

**Flow 3 — Visitor converts**
1. Visitor clicks CTA button in any section
2. CTA scrolls to `#pricing` section (or opens external payment URL)
3. Visitor selects a pricing plan
4. Payment CTA redirects to payment gateway

**Flow 4 — Mobile-specific behavior** [OPTIONAL]
1. <mobile_specific_interaction>
2. <e.g. background video autoplay muted in hero>

> *Section loading states → Golden Reference Rule 4.1*
> *CTA component → `ui-registry.yaml` → common_components*

---

## 8. UI Notes

*Document exceptions and special behavior ONLY.
Standard patterns → Golden Reference Rules 3.1–3.3.
Standard components → `ui-registry.yaml`.
Do NOT repeat what is already covered there.*

**Hero Section**
- Layout: `<full_width | split_2_col | video_background>`
- Mobile behavior: `<e.g. video autoplay muted, CTA opens Fancybox>`
- Desktop behavior: `<e.g. inline YouTube player, split layout>`
- Special: `<e.g. rotating reviews carousel, countdown timer>`

**Pricing Section**
- Plans: <number_of_plans>
- Highlighted plan: `<which_one — e.g. middle plan "الأكتر مبيعاً">`
- CTA target: `<#pricing | external_URL>`

**FAQ Section**
- Accordion style: `<Radix UI Accordion | custom>`
- Number of questions: <count>

> *Section layout standards → Golden Reference Rule 3.1*
> *Component contracts → `ui-registry.yaml` → section_registry*

---

## 9. Theme Notes

*Describe the visual identity of this landing page.*

**Color Palette**
| Role | CSS Variable | Hex Value | Usage |
|---|---|---|---|
| Primary | `--primary` | `<hex>` | CTAs, highlights |
| Dark | `--dark` | `<hex>` | Hero backgrounds, dark sections |
| Cream/Light | `--cream` | `<hex>` | Light section backgrounds |
| Accent | `--brand-teal` | `<hex>` | Tags, badges, secondary accents |

**Typography**
| Style | Font Family | Usage |
|---|---|---|
| `regular` | DIN Next LT Arabic Regular | Body text |
| `medium` | DIN Next LT Arabic Medium | Subheadings |
| `bold` | DIN Next LT Arabic Bold | Headlines, CTAs |

**Imagery Style**
> <describe_photography_style — e.g. "dark gym photos with dramatic lighting", "bright lifestyle photos">

> *Full theme variable list → `master-template.yaml` → theme block*
> *Theme application → Golden Reference Rule 5.1*

---

## 10. SEO & Meta

**Meta Tags**
| Tag | Value |
|---|---|
| `title` | `<page_title_in_arabic>` |
| `description` | `<meta_description_in_arabic>` |
| `og:title` | `<open_graph_title>` |
| `og:description` | `<open_graph_description>` |
| `og:type` | `website` |
| `twitter:card` | `summary` |

**Heading Hierarchy**
| Level | Usage |
|---|---|
| `<h1>` | Hero headline (one per page) |
| `<h2>` | Section titles |
| `<h3>` | Card titles, sub-sections |

> *Meta tag technical config → `master-template.yaml` → meta block*
> *Route meta implementation → `src/routes/$slug.tsx`*

---

## 11. API Notes

**Base Path:** `${VITE_API_BASE_URL}/${apiEndpoint}`

**Expected Response Shape**
```json
{
  "status": true,
  "data": {
    "field_key_1": "<value>",
    "field_key_2": ["<array>"]
  }
}
```

**Special Behaviors**
| Endpoint | Special Behavior |
|---|---|
| `GET /<endpoint>` | `<returns_all_landing_data_in_one_call>` |

**Authentication:** Bearer token via `apiKey` in config

> *API client config → `master-template.yaml` → api block*
> *API client implementation → Golden Reference Rule 4.1*

---

## 12. Open Questions

*Every question must have an owner and a due date.
Unowned questions don't get answered.
Resolved questions must be moved to Section 13.*

| # | Question | Owner | Due Date | Status |
|---|---|---|---|---|
| 1 | `<question>` | `<name>` | `<YYYY-MM-DD>` | `<open | resolved>` |
| 2 | `<question>` | `<name>` | `<YYYY-MM-DD>` | `<open | resolved>` |

---

## 13. Decisions Log [OPTIONAL]

*Record important decisions and why they were made.
Prevents re-litigating resolved discussions.
Move resolved Open Questions here.*

| # | Decision | Rationale | Date | Decided By |
|---|---|---|---|---|
| 1 | `<what_was_decided>` | `<why>` | `<YYYY-MM-DD>` | `<name>` |

---

*End of Domain Documentation — `<Landing Page Name>` v`<doc_version>`*

> This document follows Golden Reference Architecture v`1.0.0`.
> Any deviation from standard patterns must be noted in Section 8 (UI Notes)
> or Section 6 (Content Rules) with a clear rationale.
> Questions? Contact: `<owner_or_team>`
