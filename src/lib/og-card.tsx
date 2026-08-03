import { ImageResponse } from "next/og";

/**
 * Shared renderer for the 1200×630 social share cards.
 *
 * Platforms crop raw photos unpredictably, so every share gets a deliberate
 * composition instead: the artwork behind a dark gradient, with the title and
 * details laid over it. If the photo can't be fetched the card still renders,
 * just on the brand colour.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BASE_URL = "https://dreamscaper.art";
const OCEAN_DEEP = "#0a2463";
const ACCENT = "#f77f00";

/** Absolute, and routed through the image optimizer so we fetch ~150 KB, not 5 MB. */
function optimizedUrl(src: string): string {
  const absolute = src.startsWith("http") ? src : `${BASE_URL}${src}`;
  return `${BASE_URL}/_next/image?url=${encodeURIComponent(absolute)}&w=1200&q=70`;
}

/**
 * Fetches the artwork as a data URI. Returns null on any failure — a missing
 * background must never take the whole card down.
 */
async function loadBackground(src?: string): Promise<string | null> {
  if (!src) return null;

  for (const url of [optimizedUrl(src), src.startsWith("http") ? src : `${BASE_URL}${src}`]) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!response.ok) continue;

      const type = response.headers.get("content-type") ?? "image/jpeg";
      const base64 = Buffer.from(await response.arrayBuffer()).toString("base64");
      return `data:${type};base64,${base64}`;
    } catch {
      // Try the next candidate, then fall back to the plain card.
    }
  }

  return null;
}

interface CardOptions {
  title: string;
  /** Small line above the title — location, section name, or the tagline. */
  eyebrow?: string;
  /** Small line below the title — year, category, call to action. */
  footnote?: string;
  imageSrc?: string;
}

export async function renderOgCard({
  title,
  eyebrow,
  footnote,
  imageSrc,
}: CardOptions): Promise<ImageResponse> {
  const background = await loadBackground(imageSrc);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: OCEAN_DEEP,
        }}
      >
        {background && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={background}
            alt=""
            width={OG_SIZE.width}
            height={OG_SIZE.height}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Keeps the text legible whatever the artwork behind it */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: background
              ? "linear-gradient(180deg, rgba(10,36,99,0.25) 0%, rgba(10,36,99,0.72) 55%, rgba(10,36,99,0.95) 100%)"
              : "linear-gradient(135deg, rgba(10,36,99,1) 0%, rgba(30,96,145,1) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: 64,
          }}
        >
          {eyebrow && (
            <div
              style={{
                display: "flex",
                color: ACCENT,
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              {eyebrow}
            </div>
          )}

          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: title.length > 42 ? 62 : 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.82)",
                fontSize: 28,
              }}
            >
              {footnote ?? "dreamscaper.art"}
            </div>
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 26,
                letterSpacing: 6,
                fontWeight: 700,
              }}
            >
              DREAMSCAPER
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
