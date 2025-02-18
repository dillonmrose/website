import PDFViewer from "../_components/PDFViewer";
export default function Page({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
        <PDFViewer pdfUrl="/resume.pdf" />
    );
  }