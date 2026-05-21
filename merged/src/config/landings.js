export const landings = {
  "biomedical": {
    apiKey: "biomedical",
    apiEndpoint: "biomedical",
    theme: "biomedical",
    meta: {
      title: "SST Men — اعمل فورمة مع فريق طبي رياضي كامل",
      description:
        "أول فريق طبي رياضي في مصر — دكاترة علاج طبيعي، أخصائيين تغذية، ومدربين Fitness بيصمموا برنامجك على حسب إصابتك أو مرضك. متابعة يومية على واتس-آب وضمان استرداد.",
      ogTitle: "SST Men — اعمل فورمة مع فريق طبي رياضي كامل",
      ogDescription:
        "برامج طبية رياضية مُخصصة لإصابتك أو مرضك. متابعة يومية وضمان استرداد كامل.",
    },
    sections: [
      "navbar",
      "hero",
      "beforeAfter",
      "whoFor",
      "videoTestimonials",
      "ctaBanner",
      "howItWorks",
      "guarantee",
      "pricing",
      "faq",
      "stickyCta",
    ],
    layout: {
      footer: false,
      whatsapp: false,
    },
    fonts: "custom",
  },
  lifestyle: {
    apiKey: "lifestyle",
    apiEndpoint: "lifestyle",
    theme: "lifestyle",
    meta: {
      title: "SST — تحدي الـ 90 يوم | هتوصل للفورمة بدون مكملات",
      description:
        "برنامج SST لتحدي الـ 90 يوم: متابعة يومية من فريق طبي ورياضي، بدون مكملات وبأكل عادي من البيت. ضمان استرجاع الاشتراك كامل.",
      ogTitle: "SST — تحدي الـ 90 يوم",
      ogDescription:
        "هتوصل للفورمة في 90 يوم بس من غير مكملات وبأكل عادي من البيت.",
    },
    sections: [
      "navbar",
      "hero",
      "transformationVideos",
      "challengeComparison",
      "guarantee",
      "transformations",
      "pricing",
      "guarantee",
      "partners",
      "faq",
    ],
    layout: {
      footer: true,
      whatsapp: true,
    },
    fonts: "google",
  },
};

export function getLandingConfig(slug) {
  return landings[slug] ?? null;
}

export function getLandingSlugs() {
  return Object.keys(landings);
}
