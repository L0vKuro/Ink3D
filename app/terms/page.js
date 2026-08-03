import LegalLayout, { LegalSection } from "../components/LegalLayout";

export const metadata = {
  title: "Terms of Service — INK3D Studio",
};

export default function Terms() {
  return (
    <LegalLayout eyebrow="LEGAL" title="TERMS OF SERVICE" updated="AUGUST 2026">
      <LegalSection heading="1. ACCEPTANCE OF TERMS">
        <p>
          By accessing or purchasing from ink3d.lol, you agree to these Terms of Service. If you do not
          agree, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection heading="2. PRODUCTS &amp; ORDERS">
        <p>
          INK3D Studio designs and 3D-prints accessories and apparel for gaming teams, creators, and fans.
          All orders are subject to acceptance and availability. We reserve the right to limit quantities,
          refuse or cancel any order at our discretion, including in cases of suspected fraud or pricing
          errors.
        </p>
      </LegalSection>

      <LegalSection heading="3. PAYMENT">
        <p>
          All payments are processed securely through PayPal. By placing an order you authorize the
          charge for the full amount shown at checkout, including any applicable discounts.
        </p>
      </LegalSection>

      <LegalSection heading="4. SHIPPING &amp; RETURNS">
        <p>
          Shipping timelines are described in our{" "}
          <a href="/shipping" style={{ color: "#ae1fe3" }}>Shipping Policy</a>, and return eligibility is
          described in our <a href="/returns" style={{ color: "#ae1fe3" }}>Returns Policy</a>. Both are
          part of these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="5. AFFILIATE PROGRAM">
        <p>
          Creators and partners participating in the INK3D affiliate program are additionally bound by
          the program terms described on our{" "}
          <a href="/program" style={{ color: "#ae1fe3" }}>Affiliate Program</a> page, including tier
          structure, commission rates, and payout terms.
        </p>
      </LegalSection>

      <LegalSection heading="6. INTELLECTUAL PROPERTY">
        <p>
          All site content, designs, and the INK3D name and logo are the property of INK3D Studio unless
          otherwise noted. Team and creator logos used on partner products remain the property of their
          respective owners and are used under license or partnership agreement.
        </p>
      </LegalSection>

      <LegalSection heading="7. LIMITATION OF LIABILITY">
        <p>
          INK3D Studio is not liable for indirect, incidental, or consequential damages arising from your
          use of the site or products, to the fullest extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection heading="8. CHANGES">
        <p>
          We may update these Terms from time to time. Continued use of the site after changes are posted
          constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="9. CONTACT">
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:service.ink3dstudio@gmail.com" style={{ color: "#ae1fe3" }}>
            service.ink3dstudio@gmail.com
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
