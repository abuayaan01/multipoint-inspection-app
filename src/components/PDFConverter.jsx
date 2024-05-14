import React, { useEffect } from "react";
import { PDFDownloadLink ,PDFViewer } from "@react-pdf/renderer";
import PdfContent from "./PdfContent";
import { FaFilePdf } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { Spinner } from "@chakra-ui/react";
function PDFConverter({pdfData,inspectionId}) {
  
  return (
    <div>
      <PDFViewer width={"100%"} height={800} >
        <PdfContent inspectionData={pdfData} />
      </PDFViewer>
      <div className="inline-block">
      {/* <PDFDownloadLink document={<PdfContent inspectionData={pdfData} inspectionId={inspectionId}/>} fileName="converted.pdf">
        {({ blob, url, loading, error }) =>
          loading ? <Spinner size={'sm'} /> : <FaDownload size={20}/>
        }
      </PDFDownloadLink> */}
      </div>
    </div>
  );
}

export default PDFConverter;
