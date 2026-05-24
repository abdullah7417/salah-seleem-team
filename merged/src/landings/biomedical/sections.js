import { lazy } from "react";

export const SECTION_MAP = {
  navbar: lazy(() => import("./sections/Navbar").then((m) => ({ default: m.Navbar }))),
  hero: lazy(() => import("./sections/Hero").then((m) => ({ default: m.Hero }))),
  beforeAfter: lazy(() => import("./sections/BeforeAfter").then((m) => ({ default: m.BeforeAfter }))),
  whoFor: lazy(() => import("./sections/WhoFor").then((m) => ({ default: m.WhoFor }))),
  videoTestimonials: lazy(() =>
    import("./sections/VideoTestimonials").then((m) => ({ default: m.VideoTestimonials }))
  ),
  ctaBanner: lazy(() => import("./sections/CTABanner").then((m) => ({ default: m.CTABanner }))),
  howItWorks: lazy(() => import("./sections/HowItWorks").then((m) => ({ default: m.HowItWorks }))),
  guarantee: lazy(() => import("./sections/Guarantee").then((m) => ({ default: m.Guarantee }))),
  pricing: lazy(() => import("./sections/new-pricing").then((m) => ({ default: m.NewPricing }))),
  faq: lazy(() => import("./sections/FAQ").then((m) => ({ default: m.FAQ }))),
  stickyCta: lazy(() => import("./sections/StickyCTA").then((m) => ({ default: m.StickyCTA }))),
  finalCta: lazy(() => import("./sections/FinalCTA").then((m) => ({ default: m.FinalCTA }))),
};
