import { notFound } from "next/navigation";
import { getEffectiveDoc } from "@/lib/docsStore";
import { getAdjacentPages } from "@/lib/docsNav";
import { extractHeadings } from "@/components/docs/Markdown";
import Breadcrumb from "@/components/docs/Breadcrumb";
import AnchorNav from "@/components/docs/AnchorNav";
import Callout from "@/components/docs/Callout";
import StepList from "@/components/docs/StepList";
import PlatformTabs from "@/components/docs/PlatformTabs";
import FaqAccordion from "@/components/docs/FaqAccordion";
import FooterNav from "@/components/docs/FooterNav";
import PricingTiers from "@/components/docs/PricingTiers";
import Markdown from "@/components/docs/Markdown";

export const dynamic = "force-dynamic";

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/guide/${slug.join("/")}`;
  const doc = getEffectiveDoc(href);

  if (!doc) notFound();

  const { prev, next } = getAdjacentPages(href);
  const autoAnchors = doc.body ? extractHeadings(doc.body).filter((h) => h.level === 2) : [];

  return (
    <div className="mx-auto max-w-3xl px-8 py-12">
      <Breadcrumb trail={doc.breadcrumb} />
      <h1 className="mt-3 font-display text-3xl font-bold text-ink">{doc.title}</h1>

      {doc.anchors && (
        <div className="mt-6">
          <AnchorNav anchors={doc.anchors} />
        </div>
      )}
      {!doc.anchors && autoAnchors.length > 1 && (
        <div className="mt-6">
          <AnchorNav anchors={autoAnchors} />
        </div>
      )}

      {doc.intro && <p className="mt-6 text-ink-muted">{doc.intro}</p>}

      {doc.callout && (
        <div className="mt-6">
          <Callout tone={doc.callout.tone} text={doc.callout.text} />
        </div>
      )}

      {doc.placeholderNote && (
        <div className="mt-6 rounded-xl border border-dashed border-hairline px-4 py-8 text-center text-sm text-ink-faint">
          {doc.placeholderNote}
        </div>
      )}

      {doc.pricingTiers && (
        <div className="mt-8">
          <PricingTiers tiers={doc.pricingTiers} />
        </div>
      )}

      {doc.steps && (
        <section id={doc.steps.anchorId} className="mt-10 scroll-mt-8">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">
            {doc.steps.heading}
          </h2>
          <StepList items={doc.steps.items} />
        </section>
      )}

      {doc.platformTabs && (
        <section id={doc.platformTabs.anchorId} className="mt-10 scroll-mt-8">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">
            {doc.platformTabs.heading}
          </h2>
          <PlatformTabs tabs={doc.platformTabs.tabs} />
        </section>
      )}

      {doc.faqBlock && (
        <section id={doc.faqBlock.anchorId} className="mt-10 scroll-mt-8">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">
            {doc.faqBlock.heading}
          </h2>
          <FaqAccordion items={doc.faqBlock.items} />
        </section>
      )}

      {doc.body && (
        <div className="mt-8">
          <Markdown content={doc.body} />
        </div>
      )}

      {doc.closingQuote && (
        <blockquote className="mt-12 border-l-2 border-signal pl-4 text-ink-muted">
          {doc.closingQuote}
        </blockquote>
      )}

      <div className="mt-14">
        <FooterNav prev={prev} next={next} />
      </div>
    </div>
  );
}
