import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center py-3"
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.2)",
        position: "fixed",
        left: 0,
        bottom: 0,
        fontWeight: 500,
        color: "#334155",
        fontSize: "1rem",
        letterSpacing: "0.5px",
        zIndex: 100
      }}
    >
      by{" "}
      <a
        href="https://portafolio-eta-eight.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#334155", textDecoration: "underline", fontWeight: 600 }}
      >
        Guillermo Cruz
      </a>
    </footer>
  );
}