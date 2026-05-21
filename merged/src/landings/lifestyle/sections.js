import { lazy } from "react";

export const SECTION_MAP = {
  // navbar: lazy(() => import("./sections/Navbar")),
  hero: lazy(() => import("./sections/Hero")),
  transformationVideos: lazy(() => import("./sections/TransformationVideos")),
  guarantee: lazy(() => import("./sections/Guarantee")),
  transformations: lazy(() => import("./sections/Transformations")),
  pricing: lazy(() => import("./sections/Pricing")),
  partners: lazy(() => import("./sections/Partners")),
  faq: lazy(() => import("./sections/FAQ")),
  whyJoin: lazy(() => import("./sections/WhyJoin")),
  challengeComparison: lazy(() => import("./sections/ChallengeComparisonSection")),
};
