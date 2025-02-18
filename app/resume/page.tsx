import PDFViewer from "../_components/PDFViewer";
export default async function Page() {
    return (
        <PDFViewer pdfUrl="/resume.pdf" />
    );
  }