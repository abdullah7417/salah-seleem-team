# Design Document — <Section or Feature Name>

<!--
═════════════════════════════════════════════════════════
 HOW TO USE THIS FILE
═════════════════════════════════════════════════════════
  ✏️ Fill this — section/feature specific content
  📖 Read this — fixed guidance, do not remove
  🔗 Cross-reference to another file in the ecosystem
  [OPTIONAL] = Include only if applicable

  RULES:
   1. This doc is for ONE section or feature at a time.
   2. Never repeat Golden Reference rules — reference them.
   3. Never copy config from the YAML — link to it.
   4. User Flows must be numbered steps, not prose.
   5. Alternatives Considered must always be filled.
   6. All open questions must have an owner + due date.
   7. Update the changelog every time this file changes.

  FILE POSITION IN ECOSYSTEM:
   golden-reference.md  <- project-wide rules
   domain-doc.md        <- business context input
   design-doc.md        <- YOU ARE HERE
   master-template.yaml <- technical output of this doc
   ui-registry.yaml     <- component contracts to follow
═════════════════════════════════════════════════════════
-->

---

## Document Control

| Property | Value |
|---|---|
| **Document Key** | `<document_key>` |
| **Section / Feature** | `<section_or_feature_name>` |
| **Landing Page** | `<landing_key>` |
| **Version** | `<version>` |
| **Status** | `<draft | review | approved | implemented>` |
| **Owner** | `<owner_or_team>` |
| **Last Updated** | `<YYYY-MM-DD>` |
| **Golden Reference Version** | `1.0.0` |
| **Related Domain Doc** | `domain-doc/<landing_key>.md` |
| **Related Config** | `src/config/landings.js` → `<landing_key>` entry |
| **Related UI Registry** | `ui-registry.yaml` |

### Changelog

| Version | Date | Author | Summary |
|---|---|---|---|
| `1.0.0` | `<YYYY-MM-DD>` | `<author>` | Initial draft |

---

## 1. Purpose

### 1.1 Objective
`<clear_design_objective — one sentence, e.g. "Design a Hero section that communicates the biomedical program's value proposition and drives CTA clicks">`

### 1.2 Problem Statement
`<what_problem_this_section_solves — e.g. "Visitors with medical conditions don't believe they can get fit">`

### 1.3 Expected Outcome
`<what_the_section_will_do_after_it_is_built — e.g. "Visitors understand SST handles injuries and medical conditions">`

### 1.4 Success Criteria

- `<measurable_criterion_1 — e.g. CTA click-through rate > 15%>`
- `<measurable_criterion_2 — e.g. Lighthouse Accessibility score > 90>`

> *Business context → `domain-doc.md` → Section 2*

---

## 2. Scope Definition

### 2.1 In Scope

- `<in_scope_1>`
- `<in_scope_2>`

### 2.2 Out of Scope

- `<out_of_scope_1>`
- `<out_of_scope_2>`

### 2.3 Assumptions

- `<assumption_1>`
- `<assumption_2>`

### 2.4 Dependencies

| Dependency | Type | Notes |
|---|---|---|
| `<component_or_api>` | `<hard | soft>` | `<why_needed>` |

> *Landing isolation rules → Golden Reference Rule 1.2*

---

## 3. Context and References

### 3.1 Business Context
`<why_this_section_matters_for_conversion>`

### 3.2 Architectural Context
`<how_this_section_fits_into_the_landing — e.g. "Second section after Hero, dark background to create visual rhythm">`

### 3.3 Reference Documents

| File | What to Read |
|---|---|
| `golden-reference.md` | Rules that govern this design |
| `domain-doc/<landing_key>.md` | Business rules and user flows |
| `master-template.yaml` | Technical config for this landing |
| `ui-registry.yaml` | Components to use in design |
| `<figma_or_reference_url>` | Visual mockups / reference |

---

## 4. Design Goals and Non-Goals

### 4.1 Goals

- `<goal_1>`
- `<goal_2>`

### 4.2 Non-Goals

- `<non_goal_1 — what this section deliberately does NOT solve>`
- `<non_goal_2>`

---

## 5. Solution Overview

### 5.1 High-Level Design
`<2–3 sentences describing the approach — e.g. "Full-width dark section with a 2-column grid. Left: headline + description + CTA. Right: video thumbnail with play overlay. On mobile: stacked layout with background video.">`

### 5.2 Key Design Decisions

| Decision | Reason |
|---|---|
| `<decision_1>` | `<why>` |
| `<decision_2>` | `<why>` |

### 5.3 Alternatives Considered

| Alternative | Why Rejected |
|---|---|
| `<alternative_1>` | `<reason>` |
| `<alternative_2>` | `<reason>` |

---

## 6. Section Design

### 6.1 Component Structure

```
<SectionName>                    ← main section wrapper
  ├── <SubComponentA>            ← e.g. ReviewCard, PricingCard
  ├── <SubComponentB>            ← e.g. PlayButton, AccordionItem
  └── <LayoutWrapper>            ← Container, grid, etc.
```

### 6.2 Responsive Behavior

| Breakpoint | Layout | Notes |
|---|---|---|
| Mobile (`< lg`) | `<e.g. single column stacked>` | `<mobile_specific_behavior>` |
| Desktop (`lg+`) | `<e.g. 2-column grid>` | `<desktop_specific_behavior>` |

### 6.3 Props / Data Contract

**Data consumed from context (`useLandingData()`):**
| Field | Type | Required | Description |
|---|---|---|---|
| `<field_key>` | `<type>` | `Yes | No` | <what_it_contains> |

**Static fallback data:**
| Variable | File | Description |
|---|---|---|
| `<variable_name>` | `data/<file>.js` | <what_it_contains> |

### 6.4 Animations

| Element | Animation | Trigger | Duration |
|---|---|---|---|
| `<e.g. heading>` | `fadeInUp (opacity: 0→1, y: 20→0)` | `whileInView` | `0.6s` |
| `<e.g. cards>` | `staggered fadeInUp` | `whileInView` | `0.1s delay each` |

> *Animation standards → Golden Reference Rule 7.1*

### 6.5 User Flows

**Flow 1 — Visitor interacts with `<section_name>`**
1. Section becomes visible in viewport
2. Entry animations play (Golden Reference Rule 7.1)
3. Content renders from API data (or static fallback)
4. `<interaction_step_1>`
5. `<interaction_step_2>`
- **Diagram:** `<figma_link | N/A>`

> *Loading behavior → Golden Reference Rule 4.1*
> *CTA standards → Golden Reference Rule 3.3*

---

## 7. UI Design

*Document exceptions only.
Standard patterns are in Golden Reference Rules 3.1–3.3.
Standard components are in `ui-registry.yaml`.
Do NOT repeat what is already covered there.*

### 7.1 Layout

| Property | Value |
|---|---|
| **Background** | `<e.g. bg-dark, bg-cream, bg-gradient-hero>` |
| **Container** | `<e.g. max-w-7xl centered, full-width>` |
| **Grid** | `<e.g. 2-col on desktop, 1-col mobile>` |
| **Padding** | `<e.g. py-16 md:py-20 lg:py-24>` |

### 7.2 Shared Components Used

| Component | From | Usage |
|---|---|---|
| `Container` | `src/components/common/` | `<how_used>` |
| `CTAButton` | `src/components/common/` | `<how_used>` |
| `SectionTitle` | `src/components/common/` | `<how_used>` |

> *Component contracts → `ui-registry.yaml` → common_components*

### 7.3 Typography

| Element | Font Class | Size | Color |
|---|---|---|---|
| Heading | `bold` | `<e.g. text-3xl md:text-5xl>` | `<e.g. text-white>` |
| Body | `regular` | `<e.g. text-base>` | `<e.g. text-white/70>` |
| Label | `medium` | `<e.g. text-sm>` | `<e.g. text-primary>` |

### 7.4 States

- **Loading:** `<skeleton | SectionSkeleton | custom>`
- **Empty (no data):** `<hide_section | show_message | use_fallback>`
- **Error:** `<hide_section | show_error_message>`

> *Feedback state components → `ui-registry.yaml` → feedback_states*
> *Feedback standards → Golden Reference Rule 4.1*

---

## 8. Integration

### 8.1 Section Map Entry

```js
// src/landings/<landing_key>/sections.js
<sectionKey>: lazy(() => import("./sections/<ComponentName>").then(m => ({ default: m.<ExportName> }))),
```

### 8.2 Config Entry Update

```js
// src/config/landings.js → <landing_key>.sections array
sections: [
  // ...existing sections
  "<sectionKey>",  // ← ADD in the correct position
],
```

### 8.3 Data File (if needed)

```js
// src/landings/<landing_key>/data/<file>.js
export const <variableName> = [ ... ];
```

### 8.4 File Location

```
src/landings/<landing_key>/sections/<ComponentName>.jsx
```

---

## 9. Risks, Constraints, and Edge Cases

### 9.1 Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `<risk_1>` | `<high | medium | low>` | `<high | medium | low>` | `<mitigation>` |

### 9.2 Constraints

- `<technical_constraint_1>`
- `<business_constraint_1>`

### 9.3 Edge Cases

- `<e.g. what happens when API returns empty array for testimonials>`
- `<e.g. what happens on very small screens (320px width)>`

---

## 10. Testing Strategy

*Follows Golden Reference Rule 10.1.*

### 10.1 Manual Test Checklist

- [ ] Section renders correctly on mobile (< 640px)
- [ ] Section renders correctly on tablet (640px – 1023px)
- [ ] Section renders correctly on desktop (1024px+)
- [ ] All animations trigger on scroll
- [ ] CTA buttons are clickable and navigate correctly
- [ ] Video play buttons work (Fancybox / inline)
- [ ] Section handles missing API data gracefully
- [ ] RTL layout is correct
- [ ] Lighthouse Accessibility score > 90
- [ ] No console errors

---

## 11. Implementation Sequence

*Order matters — dependencies must be built first.*

1. `<step_1 — e.g. Create data file with static content>`
2. `<step_2 — e.g. Create section component with mobile layout>`
3. `<step_3 — e.g. Add desktop responsive layout>`
4. `<step_4 — e.g. Add animations>`
5. `<step_5 — e.g. Add API data integration>`
6. `<step_6 — e.g. Register in section map and config>`
7. `<step_7 — e.g. Test responsive + cross-browser>`
8. `<step_8 — e.g. PR approved and merged>`

> *Full delivery checklist → Golden Reference Rule 11.1*

---

## 12. Open Questions

| # | Question | Owner | Due Date | Status |
|---|---|---|---|---|
| 1 | `<question>` | `<name>` | `<YYYY-MM-DD>` | `<open | resolved>` |

---

## 13. Decisions Log

| # | Decision | Rationale | Date | Decided By |
|---|---|---|---|---|
| 1 | `<what_was_decided>` | `<why>` | `<YYYY-MM-DD>` | `<name>` |

---

*End of Design Document — `<Section or Feature Name>` v`<version>`*

> This document follows Golden Reference Architecture v`1.0.0`.
> Any deviation from standard patterns must be justified in Section 5.2 (Key Design Decisions).
> Questions? Contact: `<owner_or_team>`
