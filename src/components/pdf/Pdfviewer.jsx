import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getPdfDataReq } from "../../services/api";
import { PDFViewer } from "@react-pdf/renderer";
import PdfContent from "../PdfContent";

export default function Pdfviewer() {
  const { inspectionId } = useParams();
  const userId = localStorage.getItem("userId");
  const [pdfData, setPdfData] = useState();

  useEffect(() => {
    getPdfDataReq(userId, inspectionId)
      .then((res) => {
        setPdfData(res);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="bg-slate-800">
      {pdfData ? (
        <>
          <PDFViewer width={"100%"} height={800}>
            <PdfContent inspectionData={pdfData} />
          </PDFViewer>
        </>
      ) : (
        <div className="h-[100vh] w-full flex justify-center items-center bg-slate-800">
          <div class="ld-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
