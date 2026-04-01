import { ImageResponse } from "next/og";
import { siteConfig } from "@/modules/site/configs/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title")?.slice(0, 120) ?? siteConfig.title;
  const subtitle =
    searchParams.get("subtitle")?.slice(0, 220) ?? siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 45%, #0a0a0a 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            color: "#a3a3a3",
            lineHeight: 1.45,
            maxWidth: 920,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 48,
            fontSize: 18,
            color: "#737373",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.name}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
