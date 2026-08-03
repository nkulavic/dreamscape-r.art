import { ImageResponse } from "next/og";

// Home-screen icon for iOS. Same monogram, rendered at Apple's preferred size.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2463",
          color: "#f77f00",
          fontSize: 110,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        D
      </div>
    ),
    size
  );
}
