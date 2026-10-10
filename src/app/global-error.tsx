"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#eceae6",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          color: "#1a1517",
        }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 20px",
          }}
        >
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <div
              style={{
                height: 4,
                width: 160,
                margin: "0 auto 40px",
                borderRadius: 999,
                background: "linear-gradient(90deg,#c4552d,#d9a066,#f2c240)",
              }}
            />
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#a8431f",
                margin: "0 0 8px",
              }}
            >
              500
            </p>
            <h1 style={{ fontSize: 32, margin: "0 0 12px", fontWeight: 700 }}>
              Something broke on our side.
            </h1>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "#3b3436",
                margin: "0 0 28px",
              }}
            >
              The site hit an error we did not expect. Your booking requests
              and data are safe. Try again, or come back in a few minutes.
            </p>
            <button
              onClick={reset}
              style={{
                height: 48,
                padding: "0 24px",
                border: "none",
                borderRadius: 8,
                background: "#c4552d",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <p style={{ marginTop: 40, fontSize: 13, color: "#6a6560" }}>
              <a href="/" style={{ color: "#a8431f" }}>
                Back to the home page
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
