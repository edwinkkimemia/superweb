import Link from "next/link";

export default function CtaBand({
  title,
  text,
  btnLabel = "Get Free Quote →",
  btnHref = "/contact",
}: {
  title: string;
  text: string;
  btnLabel?: string;
  btnHref?: string;
}) {
  return (
    <div className="cta-band">
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <Link href={btnHref} className="btn" style={{ background: "#fff" }}>
          {btnLabel}
        </Link>
      </div>
    </div>
  );
}
