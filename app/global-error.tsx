"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-KE">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#F5F7FB", color: "#101828" }}>
        <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: 28 }}>Something went wrong</h1>
          <p style={{ color: "#475467", marginTop: 8 }}>
            Please try again — or reach us directly on <strong>0715135141</strong>.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={() => reset()}
              style={{
                background: "#0A1C40",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 20px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "#fff",
                color: "#0A1C40",
                border: "1px solid #D0D5DD",
                borderRadius: 10,
                padding: "12px 20px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              ← Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
