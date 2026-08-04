import LegalLayout, { LegalSection } from "../components/LegalLayout";
export const metadata = {
  title: "Returns Policy — INK3D Studio",
};
export default function Returns() {
  return (
    <LegalLayout eyebrow="LEGAL" title="RETURNS POLICY" updated="AUGUST 2026">
      <LegalSection heading="1. RETURN WINDOW">
        <p>
          You may request a return or exchange within 14 days of delivery. To start a return, email{" "}
          <a href="mailto:orders@ink3dshop.com" style={{ color: "#ae1fe3" }}>orders@ink3dshop.com</a> with your
          order ID and the reason for the return.
        </p>
      </LegalSection>
      <LegalSection heading="2. ELIGIBILITY">
        <p>
          Items must be unused, unworn, and in their original condition/packaging to qualify for a
          return. Apparel (hoodies, tees) is eligible for size exchanges within the return window.
        </p>
      </LegalSection>
      <LegalSection heading="3. NON-RETURNABLE ITEMS">
        <p>
          Because our keychains, coasters, and lightboxes are 3D-printed to order, custom or
          personalized items are final sale unless they arrive damaged or defective.
        </p>
      </LegalSection>
      <LegalSection heading="4. DAMAGED OR DEFECTIVE ITEMS">
        <p>
          If your order arrives damaged or defective, contact us within 7 days of delivery with photos of
          the item and packaging, and we&apos;ll arrange a replacement or refund at no cost to you.
        </p>
      </LegalSection>
      <LegalSection heading="5. REFUNDS">
        <p>
          Approved refunds are issued to your original PayPal payment method. Please allow 5–10 business
          days for the refund to appear, depending on PayPal processing times.
        </p>
      </LegalSection>
      <LegalSection heading="6. RETURN SHIPPING">
        <p>
          Unless the return is due to our error (wrong item, damage, or defect), the customer is
          responsible for return shipping costs.
        </p>
      </LegalSection>
      <LegalSection heading="7. CONTACT">
        <p>
          Questions about a return? Email{" "}
          <a href="mailto:orders@ink3dshop.com" style={{ color: "#ae1fe3" }}>orders@ink3dshop.com</a> or{" "}
          <a href="mailto:service.ink3dstudio@gmail.com" style={{ color: "#ae1fe3" }}>
            service.ink3dstudio@gmail.com
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
