import { createFileRoute } from "@tanstack/react-router";
import LandingRenderer from "@/LandingRenderer";
import { getLandingConfig } from "@/config/landings";

export const Route = createFileRoute("/$slug")({
  head: ({ params }) => {
    const config = getLandingConfig(params.slug);
    if (!config) {
      return {
        meta: [{ title: "404 — الصفحة مش موجودة" }],
      };
    }
    return {
      meta: [
        { title: config.meta.title },
        { name: "description", content: config.meta.description },
        { property: "og:title", content: config.meta.ogTitle },
        { property: "og:description", content: config.meta.ogDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: SlugRoute,
});

function SlugRoute() {
  const { slug } = Route.useParams();
  return <LandingRenderer slug={slug} />;
}
