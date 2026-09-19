import { ImageResponse } from "next/og";
export const alt = "Tejas Das — AI-native product engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#08090b", color: "#f2eee7", padding: "55px 70px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 23 }}><span style={{ width: 15, height: 15, background: "#df503e" }} />TD</div>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 124, fontWeight: 700, letterSpacing: -7 }}>TEJAS DAS.</span><span style={{ fontSize: 32, color: "#c4a46a", marginTop: 12 }}>AI-native product engineer.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #3b2a25", paddingTop: 23, fontSize: 21, color: "#a4a4a8" }}><span>Ideas. Engineered.</span><span>github.com/itej13</span></div>
    </div>, size,
  );
}
