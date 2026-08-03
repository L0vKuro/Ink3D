import LegalLayout, { LegalSection } from "../components/LegalLayout";

export const metadata = {
  title: "Cookie Policy — INK3D Studio",
};

export default function CookiePolicy() {
  return (
    <LegalLayout eyebrow="LEGAL" title="COOKIE POLICY" updated="AUGUST 2026">
      <LegalSection heading="1. OVERVIEW">
        <p>
          This policy explains how INK3D Studio (&quot;INK3D&quot;, &quot;we&quot;, &quot;us&quot;) uses cookies,
          browser local storage, and similar technologies on ink3d.lol. We keep this list short — INK3D
          does not run third-party advertising trackers.
        </p>
      </LegalSection>

      <LegalSection heading="2. ESSENTIAL / FUNCTIONAL STORAGE">
        <p>
          <strong className="text-white/70">Shopping cart</strong> — the contents of your cart are saved
          in your browser&apos;s local storage so your cart survives a page refresh. This data stays on
          your device and is only cleared when you complete an order, empty your cart, or clear your
          browser storage.
        </p>
        <p>
          <strong className="text-white/70">Admin &amp; affiliate sessions</strong> — when an admin or
          affiliate logs in, we set a secure, httpOnly session cookie to keep them signed in for up to 8
          hours. This cookie cannot be read by JavaScript and is used only for authentication.
        </p>
      </LegalSection>

      <LegalSection heading="3. AFFILIATE &amp; REFERRAL TRACKING">
        <p>
          If you arrive at ink3d.lol via a creator&apos;s referral link (a URL containing a{" "}
          <code className="text-white/70">?ref=</code> parameter), we store that referral code in your
          browser&apos;s local storage so the correct creator is credited if you complete a purchase. We
          also use GoAffPro, our affiliate tracking provider, to help attribute orders to affiliates. This
          referral code is removed from your device automatically once your order is placed.
        </p>
      </LegalSection>

      <LegalSection heading="4. WHAT WE DON'T DO">
        <p>
          We do not use third-party advertising or cross-site tracking cookies, and we do not sell your
          browsing data.
        </p>
      </LegalSection>

      <LegalSection heading="5. MANAGING STORAGE">
        <p>
          You can clear cookies and local storage for ink3d.lol at any time through your browser
          settings. Doing so will empty your cart and sign you out of any admin or affiliate session.
        </p>
      </LegalSection>

      <LegalSection heading="6. CONTACT">
        <p>
          Questions about this policy? Email us at{" "}
          <a href="mailto:service.ink3dstudio@gmail.com" style={{ color: "#ae1fe3" }}>
            service.ink3dstudio@gmail.com
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
