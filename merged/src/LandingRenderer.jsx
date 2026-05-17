import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getLandingConfig } from "@/config/landings";
import { LandingDataProvider } from "@/context/LandingDataContext";
import { useLandingApi } from "@/hooks/useLandingApi";
import SectionSkeleton from "@/components/common/SectionSkeleton";
import { SECTION_MAP as biomedicalSections } from "@/landings/biomedical/sections";
import { SECTION_MAP as lifestyleSections } from "@/landings/lifestyle/sections";

const sectionMaps = {
  biomedical: biomedicalSections,
  lifestyle: lifestyleSections,
};

const LifestyleFooter = lazy(() =>
  import("@/landings/lifestyle/components/Footer").then((m) => ({ default: m.default }))
);
const LifestyleWhatsApp = lazy(() =>
  import("@/landings/lifestyle/components/WhatsAppButton").then((m) => ({ default: m.default }))
);

const layoutComponents = {
  lifestyle: {
    Footer: LifestyleFooter,
    WhatsApp: LifestyleWhatsApp,
  },
};

function DynamicSection({ component: Component }) {
  if (!Component) return null;
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <Component />
    </Suspense>
  );
}

function LandingContent({ config }) {
  const { data, loading } = useLandingApi(config.apiEndpoint, config.apiKey);

  const sectionMap = sectionMaps[config.theme] ?? {};
  const layout = layoutComponents[config.theme];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" dir="rtl">
        <SectionSkeleton />
      </div>
    );
  }

  return (
    <LandingDataProvider value={data ?? {}}>
      {config.sections.map((sectionKey, i) => {
        const Component = sectionMap[sectionKey];
        if (!Component) return null;
        return <DynamicSection key={`${sectionKey}-${i}`} component={Component} />;
      })}
      {config.layout.footer && layout?.Footer && (
        <Suspense fallback={null}>
          <layout.Footer />
        </Suspense>
      )}
      {config.layout.whatsapp && layout?.WhatsApp && (
        <Suspense fallback={null}>
          <layout.WhatsApp />
        </Suspense>
      )}
    </LandingDataProvider>
  );
}

export default function LandingRenderer({ slug }) {
  const config = getLandingConfig(slug);

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4" dir="rtl">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-black text-primary">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة مش موجودة</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            الصفحة اللي بتدور عليها مش موجودة أو اتنقلت.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider themeKey={config.theme}>
      <LandingContent config={config} />
    </ThemeProvider>
  );
}
