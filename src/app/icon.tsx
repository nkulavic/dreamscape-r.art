import { ImageResponse } from "next/og";

// Browser tab icon, generated at build time so there's no binary in the repo.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2463",
          color: "#f77f00",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        D
      </div>
    ),
    size
  );
}
