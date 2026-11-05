import InView from "../fx/InView";
import Magnetic from "../fx/Magnetic";

export default function DiscordCTA() {
  return (
    <section className="px-6 md:px-12 pb-24">
      <InView>
        <div
          className="fx-border max-w-4xl mx-auto text-center px-8 py-14"
          style={{ background: "linear-gradient(180deg,#0d0714,#050505)", borderRadius: 6 }}
        >
          <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4" style={{ color: "#ae1fe388" }}>
            SYS://COMMUNITY
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-none">JOIN THE LAB</h2>
          <p className="font-mono-custom text-white/35 text-sm mb-8">// early drops, custom requests, and the crew.</p>
          <Magnetic>
            <a
              href="https://discordapp.com/invite/rv99duMaW6"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black px-12 py-4 text-xs tracking-[0.25em] inline-block"
              style={{ background: "#fff", color: "#050505" }}
            >
              JOIN DISCORD →
            </a>
          </Magnetic>
        </div>
      </InView>
    </section>
  );
}
