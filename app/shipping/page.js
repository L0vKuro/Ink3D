import LegalLayout, { LegalSection } from "../components/LegalLayout";
export const metadata = {
  title: "Shipping Policy — INK3D Studio",
};
export default function Shipping() {
  return (
    <LegalLayout eyebrow="LEGAL" title="SHIPPING POLICY" updated="AUGUST 2026">
      <LegalSection heading="1. PROCESSING TIME">
        <p>
          Most items are 3D-printed and packed to order. Orders are processed and handed off to our
          shipping carrier within 3–5 business days of purchase. You&apos;ll receive a tracking link by
          email as soon as your order ships.
        </p>
      </LegalSection>
      <LegalSection heading="2. SHIPPING RATES">
        <p>
          We offer free shipping on orders over $50. Orders below that threshold are charged a flat
          shipping rate shown at checkout before you complete payment.
        </p>
      </LegalSection>
      <LegalSection heading="3. WHERE WE SHIP">
        <p>
          We currently ship within the United States, Canada, the United Kingdom, and Australia, with
          limited international shipping available at checkout. If your country isn&apos;t listed at
          checkout, email us and we&apos;ll do our best to accommodate you.
        </p>
      </LegalSection>
      <LegalSection heading="4. TRACKING">
        <p>
          Once your order ships, we&apos;ll email your tracking link to the address you provided at
          checkout. If you haven&apos;t received tracking within 5 business days of ordering, contact us.
        </p>
      </LegalSection>
      <LegalSection heading="5. DELAYS">
        <p>
          Because each item is made to order, high-demand periods (drops, restocks, holidays) may extend
          processing time. We&apos;ll always aim to keep you updated if your order is running behind.
        </p>
      </LegalSection>
      <LegalSection heading="6. LOST OR MISSING PACKAGES">
        <p>
          If tracking shows your package as delivered but you haven&apos;t received it, or your package
          appears lost in transit, contact us within 14 days so we can help track it down or arrange a
          resolution.
        </p>
      </LegalSection>
      <LegalSection heading="7. CONTACT">
        <p>
          Questions about your shipment? Email{" "}
          <a href="mailto:orders@ink3dshop.com" style={{ color: "#ae1fe3" }}>orders@ink3dshop.com</a> or{" "}
          <a href="mailto:service.ink3dstudio@gmail.com" style={{ color: "#ae1fe3" }}>
            service.ink3dstudio@gmail.com
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
