"use client"; // Required for Next.js App Router

import { useEffect, useRef } from "react";
import PDFObject from "pdfobject";

export default function PDFViewer({ pdfUrl }) {
  const pdfRef = useRef(null);

  useEffect(() => {
    if (pdfRef.current) {
      PDFObject.embed(pdfUrl, pdfRef.current, {
        height: "100vh",
        pdfOpenParams: { view: "FitV" },
      });
    }
  }, [pdfUrl]);

  return <div ref={pdfRef} className="w-full" />;
}