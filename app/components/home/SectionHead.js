import InView from "../fx/InView";

export default function SectionHead({ label, line1, line2 }) {
  return (
    <InView className="mb-14">
      <div className="font-mono-custom text-[10px] tracking-[0.4em] mb-4 flex items-center gap-3" style={{ color: "#ae1fe366" }}>
        <span>◆</span> {label}
      </div>
      <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
        {line1}
        {line2 && (
          <>
            <br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>{line2}</span>
          </>
        )}
      </h2>
    </InView>
  );
}
