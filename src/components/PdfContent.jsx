import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { base_url } from "../services/api";
import companyLogo from "./../assets/logo.png";
import coverImage from "../assets/templateBackground.png";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
  },

  bgImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  section: {
    margin: 10,
    padding: 10,
  },

  container: {
    margin: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  pageContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    textAlign: "left",
    marginBottom: 10,
    color: "#333",
    fontWeight: "900",
  },
  pageHeadText: {
    fontSize: 16,
    color: "#fff",
  },

  text: {
    fontSize: 12,
  },

  texth6: {
    fontSize: 10,
    marginVertical: 15,
  },

  prop: {
    borderBottom: 1,
    borderColor: "#eee",
    paddingTop: 10,
    paddingBottom: 5,
  },

  propTittle: {
    fontWeight: 900,
    paddingVertical: 5,
    fontSize: 10,
  },

  propData: {
    fontSize: 10,
    color: "#333",
    paddingVertical: 5,
  },
});

const PdfContent = ({ inspectionData }) => {
  const [primaryColor, setprimaryColor] = useState(
    inspectionData?.coverPage?.primaryThemeColor || "#B49373"
  );
  const [secondaryColor, setsecondaryColor] = useState(
    inspectionData?.coverPage?.secondaryThemeColor || "#B49373"
  );
  const [logoPosition, setlogoPosition] = useState({});
  const invoice = inspectionData?.invoice;

  console.log(inspectionData);

  useEffect(() => {
    switch (inspectionData?.coverPage?.companyLogoPositon) {
      case "Top-left":
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        });
        break;
      case "Top-center":
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        });
        break;
      case "Top-right":
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        });
        break;
      case "Mid-left":
        setlogoPosition({
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        });
        break;
      case "Mid-center":
        setlogoPosition({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        });
        break;
      case "Mid-right":
        setlogoPosition({
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        });
        break;
      case "Bottom-left":
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          bottom: "100px",
        });
        break;
      case "Bottom-center":
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          bottom: "100px",
        });
        break;
      case "Bottom-right":
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          bottom: "100px",
        });
        break;
      default:
        setlogoPosition({
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          bottom: "100px",
        });
    }
  }, [inspectionData]);

  function convertToTitleCase(text) {
    const words = text.split(/(?=[A-Z])/);
    const convertedString = words.join(" ");
    return convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
  }
  function convertToPaymentMethodTitleCase(paymentMethod) {
    return convertToTitleCase(paymentMethod);
  }
  function toCapitalize(str) {
    const string = str;
    const capitalize = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalize;
  }
  const PageNumber = () => {
    return (
      <Text
        style={Pdfs.pageNumber}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber}`}
        fixed
      />
    );
  };
  const PageFixedHeader = () => {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 45,
          position: "absolute",
          top: 0,
          paddingVertical: 10,
          backgroundColor: "#000",
        }}
        fixed
      >
        <View>
          <Text style={{ fontSize: 10, color: "white" }}>
            {inspectionData?.coverPage?.companyName}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 10, color: "white" }}>
            {inspectionData?.coverPage?.propertyAddress?.street},{" "}
            {inspectionData?.coverPage?.propertyAddress?.city}{" "}
            {inspectionData?.coverPage?.propertyAddress?.state}
          </Text>
        </View>
      </View>
    );
  };
  const Pdfs = StyleSheet.create({
    page: {
      paddingVertical: 30,
    },

    pageHeader: {
      paddingVertical: 30,
      paddingHorizontal: 45,
      backgroundColor: primaryColor,
      marginBottom: 20,
      marginTop: 0,
      zIndex: -10,
    },

    pageHeadText: {
      color: "#fff",
      fontSize: 18,
      fontFamily: "Open Sans",
      fontWeight: 600,
    },

    pageContentContainer: {
      paddingHorizontal: 45,
      marginBottom: 30,
    },

    backgroundImage: {
      marginTop: 60,
      maxWidth: "100%",
      height: "100%",
      objectFit: "cover",
    },

    coverTitleSection: {
      width: "100%",
      backgroundColor: primaryColor,
      padding: 10,
      position: "absolute",
      top: 0,
      marginHorizontal: "auto",
      textAlign: "center",
      justifyContent: "center",
    },

    coverOptionalText: {
      fontSize: 10,
      color: "#fff",
    },

    coverTitle: {
      fontSize: 32,
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "#fff",
    },

    coverTextSection: {
      width: "100%",
      height: "100%",
      padding: 30,
      position: "absolute",
      textAlign: "right",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      transform: "translateY(70px)",
    },

    coverText: {
      marginTop: 10,
      // color: "#333",
      fontSize: 16,
      color: "#957a5f",
      fontFamily: "Open Sans",
      fontWeight: 600,
    },

    companyLogoContainer: {
      width: "100%",
      height: "100%",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "flex-start",
      position: "absolute",
      transform: "translate(0px,70px)",
      padding: 10,
      paddingHorizontal: 30,
      borderRadius: 100,
    },

    companyLogo: {
      width: "150",
      height: "150",
      objectFit: "cover",
      borderRadius: 100,
      backgroundColor: "white",
      padding: 10,
    },

    coverFooterSection: {
      width: "100%",
      backgroundColor: primaryColor,
      padding: 5,
      position: "absolute",
      bottom: 0,
      marginHorizontal: "auto",
      textAlign: "center",
      justifyContent: "center",
    },

    footerText: {
      fontSize: 12,
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "#fff",
    },

    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 0,
      borderColor: "#999",
    },

    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },

    tableCol: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRight: 0,
      borderTopWidth: 0,
      borderColor: "#999",
    },

    tableCell: {
      margin: 5,
      fontSize: 10,
      paddingVertical: 15,
      textAlign: "center",
    },

    primaryBg: {
      backgroundColor: primaryColor,
    },

    borderLessCell: {
      fontSize: 14,
      marginBottom: 20,
    },

    container: {
      margin: 10,
      padding: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },

    title: {
      fontSize: 30,
      textAlign: "left",
      marginBottom: 10,
      color: "#333",
      fontWeight: "900",
    },

    text: {
      fontSize: 12,
    },

    texth6: {
      fontSize: 10,
      marginVertical: 15,
    },

    prop: {
      borderBottom: 1,
      borderColor: "#eee",
      paddingTop: 10,
      paddingBottom: 5,
    },

    propHeadText: {
      // backgroundColor: primaryColor,
      paddingVertical: 5,
      // paddingHorizontal: 15,
      color: secondaryColor,
      textAlign: "left",
      borderBottom: "5px solid black",
      borderBottomColor: secondaryColor,
      marginVertical: 15,
      fontFamily: "Open Sans",
      fontWeight: 600,
    },

    propTittle: {
      paddingVertical: 5,
      fontSize: 16,
      color: primaryColor,
      fontFamily: "Open Sans",
    },

    propData: {
      fontSize: 10,
      color: "#333",
      paddingVertical: 5,
    },

    html: {
      fontSize: 14,
    },

    tocContainer: {
      paddingHorizontal: 30,
      paddingVertical: 20,
    },

    PdfsItems: {
      fontSize: 12,
      paddingVertical: 5,
      display: "flex",
      flexDirection: "row",
    },

    bullet: {
      fontSize: 14,
      marginRight: 10,
    },
    pageNumber: {
      fontSize: 12,
      color: "#333",
      position: "absolute",
      bottom: 15,
      right: 20,
    },
  });

  return (
    <Document>
      {/* Cover Page start*/}
      <Page size="A4" wrap={false}>
        <Image
          src={
            inspectionData?.coverPage?.coverImage
              ? `${base_url}/uploads/${inspectionData?.coverPage?.coverImage}`
              : coverImage
          }
          style={Pdfs.backgroundImage}
        />

        <View style={Pdfs.coverTitleSection}>
          <Text style={Pdfs.coverTitle}>PROPERTY INSPECTION REPORT</Text>
          {inspectionData?.coverPage?.clientName && (
            <Text style={Pdfs.coverOptionalText}>
              This confidential report is prepared exclusively for{" "}
              {inspectionData?.coverPage?.clientName}
            </Text>
          )}
        </View>

        <View style={{ ...Pdfs.companyLogoContainer, ...logoPosition }}>
          <Image
            src={
              inspectionData?.coverPage?.companyLogo
                ? `${base_url}/uploads/${inspectionData?.coverPage?.companyLogo}`
                : companyLogo
            }
            style={Pdfs.companyLogo}
          />
        </View>

        <View style={Pdfs.coverTextSection}>
          <Text style={Pdfs.coverText}>
            Client : {inspectionData?.coverPage?.clientName}
          </Text>
          <Text style={{ ...Pdfs.coverText, width: 300 }}>
            Property : {inspectionData?.coverPage?.propertyAddress?.street},{" "}
            {inspectionData?.coverPage?.propertyAddress?.city}{" "}
            {inspectionData?.coverPage?.propertyAddress?.state},{" "}
            {inspectionData?.coverPage?.propertyAddress?.zipCode}
          </Text>
          <Text style={Pdfs.coverText}>
            Date : {inspectionData?.coverPage?.date}
          </Text>
          {inspectionData?.coverPage?.inspectorName &&
            inspectionData?.coverPage?.licenseNumber && (
              <Text style={Pdfs.coverText}>
                Inspector : {inspectionData?.coverPage?.inspectorName} | #
                {inspectionData?.coverPage?.licenseNumber}
              </Text>
            )}
        </View>

        <View style={Pdfs.coverFooterSection}>
          <Text style={Pdfs.footerText}>
            {inspectionData?.coverPage?.coverFooterText ? (
              <Text>{inspectionData?.coverPage?.coverFooterText}</Text>
            ) : inspectionData?.coverPage?.companyPhoneNumber &&
              inspectionData?.coverPage?.companyWebsite ? (
              <Text>
                {inspectionData?.coverPage?.companyPhoneNumber} |{" "}
                {inspectionData?.coverPage?.companyWebsite}
              </Text>
            ) : (
              ""
            )}
          </Text>
        </View>
      </Page>
      {/* Cover Page end */}

      {/* Invoice Page Start */}
      {invoice?.fee && <Page style={Pdfs.page}>
        <PageFixedHeader />
        <PageNumber />
        <View style={Pdfs.pageHeader}>
          <Text style={Pdfs.pageHeadText} id="invoice">
            Invoice
          </Text>
        </View>

        <View style={Pdfs.pageContentContainer}>
          <View style={{ ...Pdfs.table, marginVertical: 50, border: 0 }}>
            <View style={Pdfs.tableRow}>
              <View style={{ ...Pdfs.tableCol, border: 0, paddingRight: 15 }}>
                <Text style={Pdfs.borderLessCell}>
                  Date :{" "}
                  <Text style={{ color: "#555" }}>
                    {inspectionData?.invoice?.date}
                  </Text>
                </Text>
                <Text style={Pdfs.borderLessCell}>
                  Inspected By :{" "}
                  {inspectionData?.invoice?.inspectorName && (
                    <Text style={{ color: "#555" }}>
                      {inspectionData?.invoice?.inspectorName}
                    </Text>
                  )}
                </Text>
                <Text style={Pdfs.borderLessCell}>
                  Client Name :{" "}
                  <Text style={{ color: "#555" }}>
                    {inspectionData?.invoice?.clientName}
                  </Text>
                </Text>
              </View>
              <View style={{ ...Pdfs.tableCol, border: 0 }}>
                <Text style={Pdfs.borderLessCell}>
                  Property Address :{" "}
                  <Text style={{ color: "#555" }}>
                    {inspectionData?.invoice?.propertyAddress?.street} ,
                    {inspectionData?.invoice?.propertyAddress?.city}{" "}
                    {inspectionData?.invoice?.propertyAddress?.state},{" "}
                    {inspectionData?.invoice?.propertyAddress?.zipCode}
                  </Text>
                </Text>
                <Text style={Pdfs.borderLessCell}>
                  Inspection Number:{" "}
                  <Text style={{ color: "#555" }}>
                    {inspectionData?.invoice?.inspectionNumber}
                  </Text>
                </Text>
                <Text style={Pdfs.borderLessCell}>
                  Payment Method:{" "}
                  <Text style={{ color: "#555" }}>
                    {inspectionData?.invoice?.paymentMethod}
                  </Text>
                </Text>
                {inspectionData?.invoice?.checkNumber && (
                  <Text style={Pdfs.borderLessCell}>
                    Check Number:{" "}
                    <Text style={{ color: "#555" }}>
                      {inspectionData?.invoice?.checkNumber}
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          </View>

          {invoice !== undefined && (
            <View style={Pdfs.table}>
              <View style={Pdfs.tableRow}>
                <View style={Pdfs.tableCol}>
                  <Text
                    style={{
                      ...Pdfs.tableCell,
                      ...Pdfs.primaryBg,
                      fontSize: 20,
                      fontWeight: 600,
                      border: 0,
                      margin: 0,
                      padding: 15,
                      color: "#fff",
                    }}
                  >
                    Inspection
                  </Text>
                </View>
                <View style={Pdfs.tableCol}>
                  <Text
                    style={{
                      ...Pdfs.tableCell,
                      ...Pdfs.primaryBg,
                      fontSize: 20,
                      fontWeight: 600,
                      border: 0,
                      margin: 0,
                      padding: 15,
                      color: "#fff",
                    }}
                  >
                    Fee
                  </Text>
                </View>
              </View>

              <View style={Pdfs.tableRow}>
                <View style={Pdfs.tableCol}>
                  <Text style={Pdfs.tableCell}>Home Inspection</Text>
                </View>
                <View style={Pdfs.tableCol}>
                  <Text style={Pdfs.tableCell}>
                    $ {inspectionData?.invoice?.fee}
                  </Text>
                </View>
              </View>
              {inspectionData?.invoice?.discount && <View style={Pdfs.tableRow}>
                <View style={Pdfs.tableCol}>
                  <Text style={Pdfs.tableCell}>Home Inspection discount</Text>
                </View>
                <View style={Pdfs.tableCol}>
                  <Text style={Pdfs.tableCell}>
                    $ {inspectionData?.invoice?.discount}
                  </Text>
                </View>
              </View>}
              <View style={Pdfs.tableRow}>
                <View style={Pdfs.tableCol}>
                  <Text
                    style={{
                      ...Pdfs.tableCell,
                      fontSize: 12,
                      fontFamily: "Open Sans",
                      fontWeight: 600,
                    }}
                  >
                    Total
                  </Text>
                </View>
                <View style={Pdfs.tableCol}>
                  <Text
                    style={{
                      ...Pdfs.tableCell,
                      fontSize: 12,
                      fontFamily: "Open Sans",
                      fontWeight: 600,
                    }}
                  >
                    $ {inspectionData?.invoice?.total}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </Page>}
      {/* Invoice Page End */}

      {/* T&Cs Start */}
      {inspectionData?.coverPage?.thankYouPage && (
        <Page style={Pdfs.page} size="A4">
          <PageFixedHeader />
          <PageNumber />
          <View>
            <View style={Pdfs.pageHeader}></View>
            <View style={Pdfs.pageContentContainer}>
              <View style={{ marginTop: 20 }}></View>
              <Text style={Pdfs.texth6}>
                Thank you for the opportunity to conduct a home inspection of
                the property listed above. We understand that the function of
                this report is to assist you in understanding the condition of
                the property to assist in making an informed purchase decision.
              </Text>
              <Text style={Pdfs.texth6}>
                The report contains a review of components in the following
                basic categories: site, exterior, roofing, structure,
                electrical, HVAC, plumbing, and interior. Additional categories
                may or may not be included. The report is designed to be easy to
                read and comprehend however it is important to read the entire
                report to obtain a full understanding of the scope, limitations
                and exclusions of the inspection.
              </Text>
              <Text style={Pdfs.texth6}>
                In addition to the checklist items of the report there are
                several comments which are meant to help you further understand
                certain conditions observed. Please read them all.
              </Text>
              <Text style={Pdfs.texth6}>DEFINITION OF CONDITION TERMS</Text>
              <Text style={Pdfs.texth6}>
                Satisfactory: At the time of inspection the component is
                functional without observed signs of a substantial defect.
                Marginal: At the time of inspection the component is functioning
                but is estimated to be nearing end of useful life. Operational
                maintenance recommended. Replacement anticipated.
              </Text>
              <Text style={Pdfs.texth6}>
                Marginal: The component requires further technical or invasive
                evaluation by qualified professional tradesman or service
                technician to determine the nature of any potential defect, the
                corrective action and any associated cost.
              </Text>
              <Text style={Pdfs.texth6}>
                Poor: At the time of inspection the component does not function
                as intended or presents a Safety Hazard. Repair or replacement
                is recommended.
              </Text>
            </View>
          </View>
        </Page>
      )}
      {/* T&Cs End */}

      {/* {Table of content} */}
      {inspectionData?.tableOfContents && Object.keys(inspectionData?.tableOfContents).length && <Page style={Pdfs.page}>
        <PageFixedHeader />
        <PageNumber />
        <View key={"tableOfContents"}>
          <View style={Pdfs.pageHeader}>
            <Text style={Pdfs.pageHeadText}>Table of Contents</Text>
          </View>
          <View style={Pdfs.pageContentContainer}>
            <View style={{ marginTop: 20 }}>
              <View style={Pdfs.tableRow}>
                <View style={Pdfs.tableCol}>
                  <Text
                    style={{
                      ...Pdfs.tableCell,
                      ...Pdfs.primaryBg,
                      fontSize: 20,
                      fontWeight: 600,
                      border: 0,
                      margin: 0,
                      padding: 15,
                      color: "#fff",
                    }}
                  >
                    Serial Number
                  </Text>
                </View>
                <View style={Pdfs.tableCol}>
                  <Text
                    style={{
                      ...Pdfs.tableCell,
                      ...Pdfs.primaryBg,
                      fontSize: 20,
                      fontWeight: 600,
                      border: 0,
                      margin: 0,
                      padding: 15,
                      color: "#fff",
                    }}
                  >
                    Topics
                  </Text>
                </View>
              </View>
              {inspectionData?.tableOfContents &&
                Object.entries(inspectionData?.tableOfContents).map(
                  ([key, value], index) => (
                    <>
                      <View
                        style={{
                          borderLeft: "1px solid #3B855F",
                          borderRight: "1px solid #3B855F",
                          borderBottom: "1px solid #3B855F",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          padding: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#000",
                            textAlign: "center",
                            width: "50%",
                          }}
                        >
                          {index + 1}
                        </Text>
                        <Link
                          href={`#${key}`}
                          style={{
                            fontSize: 14,
                            color: "#000",
                            textAlign: "center",
                            width: "50%",
                          }}
                        >
                          {value}
                        </Link>
                      </View>
                      {/* <View style={Pdfs.tableCol}>
                      <Text
                        style={{
                          fontSize: 14,
                          margin: 5,
                          color: "#000",
                          paddingVertical: 5,
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </Text>
                    </View> */}
                    </>
                  )
                )}
            </View>
          </View>
        </View>
      </Page>}
      {/* {Table of Ends} */}

      {/* Report Summary Page Starts */}
      {inspectionData?.summary && (
        <Page id="summary" style={Pdfs.page}>
          <PageFixedHeader />
          <PageNumber />

          <View style={Pdfs.pageHeader}>
            <Text style={Pdfs.pageHeadText}>Report Summary</Text>
          </View>

          <View style={Pdfs.pageContentContainer}>
            {inspectionData?.summary?.itemNotOperating && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Items Not Operating </Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.summary?.itemNotOperating
                    ? inspectionData?.summary?.itemNotOperating
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.summary?.majorConcerns && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Major Concerns </Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.summary?.majorConcerns
                    ? inspectionData?.summary?.majorConcerns
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.summary?.potentialSafetyHazards && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Potential Safety Hazards </Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.summary?.potentialSafetyHazards
                    ? inspectionData?.summary?.potentialSafetyHazards
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.summary?.defferedCostItems && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Deffered Cost Items </Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.summary?.defferedCostItems
                    ? inspectionData?.summary?.defferedCostItems
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.summary?.improvementItems && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Improvement Items </Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.summary?.improvementItems
                    ? inspectionData?.summary?.improvementItems
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.summary?.itemsToMonitor && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Items To Monitor </Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.summary?.itemsToMonitor
                    ? inspectionData?.summary?.itemsToMonitor
                    : ""}
                </Html>
              </View>
            )}
          </View>
        </Page>
      )}
      {/* Report Summary Page End */}

      {/* Report Overview Page Starts */}
      {inspectionData?.overview && (
        <Page id="overview" style={Pdfs.page}>
          <PageFixedHeader />
          <PageNumber />
          <View style={Pdfs.pageHeader}>
            <Text style={Pdfs.pageHeadText}>Report Overview</Text>
          </View>
          <View style={Pdfs.pageContentContainer}>
            {inspectionData?.overview?.scopeOfInspection && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Scope of Inspection</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.scopeOfInspection
                    ? inspectionData?.overview?.scopeOfInspection
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.overview?.mainEntranceFaces && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Main Entrance Faces</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.mainEntranceFaces
                    ? inspectionData?.overview?.mainEntranceFaces
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.overview?.stateOfOccupancy && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>State of Occupancy</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.stateOfOccupancy
                    ? inspectionData?.overview?.stateOfOccupancy
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.overview?.weatherConditions && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Weather Condition</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.weatherConditions
                    ? inspectionData?.overview?.weatherConditions
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.overview?.recentRain && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Recent Rain</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.recentRain
                    ? inspectionData?.overview?.recentRain
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.overview?.groundCover && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Ground Cover</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.groundCover
                    ? inspectionData?.overview?.groundCover
                    : ""}
                </Html>
              </View>
            )}
            {inspectionData?.overview?.approximateAge && (
              <View style={Pdfs.prop}>
                <Text style={Pdfs.propTittle}>Approximate Age</Text>
                <Html style={Pdfs.html}>
                  {inspectionData?.overview?.approximateAge
                    ? inspectionData?.overview?.approximateAge
                    : ""}
                </Html>
              </View>
            )}
          </View>
        </Page>
      )}
      {/* Report Overview Page Ends */}

      {inspectionData &&
        Object.entries(inspectionData).map(([page, value]) => {
          if (
            inspectionData[page] !== undefined &&
            page != "coverPage" &&
            page != "invoice" &&
            page != "overview" &&
            page != "summary" &&
            page != "tableOfContents"
          ) {
            return (
              inspectionData[page] &&
              inspectionData[page]?.map((subpage, index) => {
                return (
                  <Page key={index} style={Pdfs.page}>
                    <PageFixedHeader />
                    <PageNumber />

                    {/* page heading */}
                    <View id={page} style={Pdfs.pageHeader}>
                      <Text style={Pdfs.pageHeadText}>
                        {convertToPaymentMethodTitleCase(page)}{" "}
                        {Number(index) + 1}
                      </Text>
                    </View>
                    {/* page heading end */}

                    {/* page content */}
                    <View style={Pdfs.pageContentContainer}>
                      {Object.entries(subpage || {}).map(
                        ([groundItem, value]) =>
                          groundItem !== "_id" && (
                            <View key={groundItem}>
                              <View wrap={false}>
                                <Text style={Pdfs.propHeadText}>
                                  {convertToPaymentMethodTitleCase(groundItem)}
                                </Text>
                              </View>
                              {value &&
                                Object.entries(value).map(
                                  ([key, val]) =>
                                    key !== "_id" &&
                                    val.length > 0 && (
                                      <View
                                        wrap={false}
                                        key={key}
                                        style={Pdfs.prop}
                                      >
                                        <Text style={Pdfs.propTittle}>
                                          {key !== "extra" &&
                                            convertToPaymentMethodTitleCase(
                                              key
                                            )}
                                        </Text>
                                        {Array.isArray(val) &&
                                        val.length > 1 &&
                                        key !== "photos" &&
                                        key !== "extra" ? (
                                          <Text
                                            key={key + val}
                                            style={Pdfs.propData}
                                          >
                                            {val.map((text, idx) => {
                                              let comma =
                                                idx + 1 == val.length
                                                  ? false
                                                  : true;
                                              if (text == "Satisfactory") {
                                                return (
                                                  <View>
                                                    <Text
                                                      style={{
                                                        backgroundColor:
                                                          "green",
                                                        color: "white",
                                                        paddingHorizontal:
                                                          "5px",
                                                      }}
                                                    >
                                                      {text}
                                                    </Text>
                                                    <Text>
                                                      {comma && " , "}
                                                    </Text>
                                                  </View>
                                                );
                                              } else if (text == "Marginal")
                                                return (
                                                  <View>
                                                    <Text
                                                      style={{
                                                        backgroundColor:
                                                          "orange",
                                                        color: "white",
                                                        paddingHorizontal: 5,
                                                      }}
                                                    >
                                                      {text}
                                                    </Text>
                                                    <Text>
                                                      {comma && " , "}
                                                    </Text>
                                                  </View>
                                                );
                                              else if (text == "Poor")
                                                return (
                                                  <View>
                                                    <Text
                                                      style={{
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        paddingHorizontal: 5,
                                                      }}
                                                    >
                                                      {text}
                                                    </Text>
                                                    <Text>
                                                      {comma && " , "}
                                                    </Text>
                                                  </View>
                                                );
                                              else
                                                return comma
                                                  ? text + " , "
                                                  : text;
                                            })}
                                          </Text>
                                        ) : Array.isArray(val) &&
                                          val.length === 1 &&
                                          key !== "extra" && key !== "photos" ? (
                                          <Text style={Pdfs.propData}>
                                            {val[0] == "Satisfactory" ? (
                                              <Text
                                                style={{
                                                  backgroundColor: "green",
                                                  color: "white",
                                                  paddingHorizontal: 5,
                                                }}
                                              >
                                                {val[0]}
                                              </Text>
                                            ) : val[0] == "Marginal" ? (
                                              <Text
                                                style={{
                                                  backgroundColor: "orange",
                                                  color: "white",
                                                  paddingHorizontal: 5,
                                                }}
                                              >
                                                {val[0]}
                                              </Text>
                                            ) : val[0] == "Poor" ? (
                                              <Text
                                                style={{
                                                  backgroundColor: "red",
                                                  color: "white",
                                                  paddingHorizontal: 5,
                                                }}
                                              >
                                                {val[0]}
                                              </Text>
                                            ) : (
                                              val[0]
                                            )}
                                          </Text>
                                        ) : key === "comments" ? (
                                          <Html style={Pdfs.propData}>
                                            {val}
                                          </Html>
                                        ) : key === "photos" &&
                                          Array.isArray(val) ? (
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              flexWrap: "wrap",
                                            }}
                                          >
                                            {val.map(
                                              (photoFilename, photoIndex) => (
                                                <View
                                                  key={photoIndex}
                                                  style={{ marginRight: 5 }}
                                                >
                                                  <Image
                                                    style={{
                                                      width: 160,
                                                      height: 160,
                                                      marginBottom: 5,
                                                    }}
                                                    source={{
                                                      uri: `${base_url}/uploads/${photoFilename}`,
                                                    }}
                                                  />
                                                </View>
                                              )
                                            )}
                                          </View>
                                        ) : key === "extra" ? (
                                          val.map((item) => {
                                            let data = JSON.parse(item);
                                            if (Array.isArray(data?.value)) {
                                              return (
                                                <View>
                                                  <Text style={Pdfs.propTittle}>
                                                    {data.label}
                                                  </Text>
                                                  <View>
                                                    {
                                                      <Text
                                                        style={Pdfs.propData}
                                                      >
                                                        {data.value.join(" , ")}
                                                      </Text>
                                                    }
                                                  </View>
                                                </View>
                                              );
                                            } else if (data.value) {
                                              return (
                                                <View>
                                                  <Text style={Pdfs.propTittle}>
                                                    {data.label}
                                                  </Text>
                                                  <View>
                                                    {
                                                      <Text
                                                        style={Pdfs.propData}
                                                      >
                                                        {data.value}
                                                      </Text>
                                                    }
                                                  </View>
                                                </View>
                                              );
                                            }
                                          })
                                        ) : (
                                          <Text style={Pdfs.propData}>
                                            {val}
                                          </Text>
                                        )}
                                      </View>
                                    )
                                )}
                            </View>
                          )
                      )}
                    </View>
                  </Page>
                );
              })
            );
          }
        })}
    </Document>
  );
};

export default PdfContent;
