import { ImageResponse } from "next/og";

export const alt = "THRAIZE — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#11110f", color: "#e8e2d6", padding: "64px", fontFamily: "monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21 }}><strong style={{ color: "#f05a28", fontSize: 34 }}>THRAIZE</strong><span>7HR4IZ3 / AGENT WORKBENCH</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div style={{ width: 390, height: 240, border: "12px solid #34342c", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, padding: 32, transform: "rotate(-7deg)" }}>
          {[0,1,2,3,4,5].map((item) => <div key={item} style={{ width: 130, height: 38, display: "flex", border: `2px solid ${item === 0 ? "#f05a28" : "#777963"}`, background: "#171713" }} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 54, lineHeight: 1.02, letterSpacing: "-3px", maxWidth: 570 }}>I build software for ideas that do not fit a template.</div>
      </div>
      <div style={{ display: "flex", gap: 28, fontSize: 18, color: "#aaa594" }}><span>MOBILE AI</span><span>AGENT TOOLS</span><span>NATIVE</span><span>SPATIAL</span><span>CLOUD</span></div>
    </div>, size,
  );
}
