import { StyleSheet } from "@react-pdf/renderer";

// const primarycolor = primaryColor;
const primaryColor = "#333";
// const secondaryColor = " #E34A27";
const secondaryColor = "#4E6E81";

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

  coverOptionalText:{
    fontSize: 10,
    color:"#fff",
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
    transform: "translateY(20px)",
  },

  coverText: {
    marginTop: 10,
    color: "#333",
    fontSize: 16,
    color: "white",
    fontFamily: "Open Sans",
    fontWeight: 600,
  },

  companyLogoContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "absolute",
    transform: "translate(0px,100px)",
    padding: 10,
    borderRadius: 100,
  },

  companyLogo: {
    width: "150",
    height: "150",
    objectFit: "cover",
    borderRadius: 100,
    backgroundColor: 'white',
    padding: 10
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

  primaryBg : {
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

export default Pdfs;
