import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQ (How it works)",
  rows: [
    {
      title: "How do I log in to the Home Inspection App?",
      content: `To log in to the Home Inspection App, simply click on the 'Log In' button on the main screen. 
                 Enter your registered email address and password, then click 'Submit' to access your account.`,
    },
    {
      title: "What is the process for signing up?",
      content: `Signing up for the Home Inspection App is easy! Click on the 'Sign Up' button, fill in the required 
                 information such as your name, email, and create a secure password. Once completed, click 'Sign Up' 
                 to create your account.`,
    },
    {
      title: "How can I schedule a home inspection?",
      content: `Scheduling a home inspection is a breeze. After logging in, navigate to the 'Schedule Inspection' 
                 section. Choose your preferred date and time, provide the property details, and confirm your 
                 appointment. Our team will take care of the rest!`,
    },
    {
      title: "What should I expect during a home inspection?",
      content: `During a home inspection, our certified inspectors will thoroughly examine your property's 
                 structure, systems, and components. You'll receive a detailed report highlighting any issues 
                 found and recommendations for maintenance or repairs.`,
    },
    {
      title: "Is the Home Inspection App available on mobile devices?",
      content: `Yes, the Home Inspection App is available on both iOS and Android devices. You can download 
                 the app from the App Store or Google Play Store and enjoy convenient access to your home inspection 
                 information on the go.`,
    },
    {
      title: "How do I update my account information?",
      content: `To update your account information, go to the 'Profile' section after logging in. Here, you can 
                 edit your personal details, change your password, or update any other relevant information.`,
    },
    {
      title: "What payment methods are accepted for inspection services?",
      content: `We accept various payment methods, including credit cards, debit cards, and online transfers. 
                 You can securely make payments through the app or contact our support team for assistance.`,
    },
    {
      title: "Can I reschedule or cancel a home inspection?",
      content: `Certainly! If you need to reschedule or cancel your home inspection, go to the 'My Appointments' 
                 section and follow the provided options. Please note that there may be a rescheduling or cancellation 
                 policy in place.`,
    },
    {
      title: "How do I download my inspection report?",
      content: `After your home inspection is complete, you can download the detailed report from the 'My Inspections' 
                 section. Simply select the completed inspection and choose the 'Download Report' option.`,
    },
    {
      title: "What should I do if I encounter technical issues with the app?",
      content: `If you experience any technical issues, reach out to our support team via the 'Help Center' or 
                 'Contact Us' section. We'll promptly assist you in resolving any problems you may encounter.`,
    },
    {
      title: "What is the current version of the Home Inspection App?",
      content: `The current version of the Home Inspection App is 1.2.1. We regularly update the app to provide 
                 you with the best features and security enhancements.`,
    },
    {
      title:
        "Can I request a specialized inspection, such as for pests or mold?",
      content: `Yes, we offer specialized inspections for various concerns, including pests, mold, or other specific 
                   issues. During the scheduling process, you can specify your requirements, and we'll ensure the 
                   appropriate inspection is conducted.`,
    },
    {
      title: "What safety measures are in place during the inspection process?",
      content: `Our inspectors follow strict safety protocols during inspections. They use necessary personal 
                   protective equipment, maintain social distancing where possible, and adhere to local health guidelines 
                   to ensure a safe and secure inspection process.`,
    },
    {
      title: "Are the inspection reports easy to understand for homeowners?",
      content: `Absolutely! We strive to make our inspection reports clear and comprehensible. Each report is 
                   accompanied by detailed explanations and, if needed, our team is available to walk you through the 
                   findings.`,
    },
    {
      title:
        "Can I share my inspection report with real estate agents or other parties?",
      content: `Yes, you can easily share your inspection report with relevant parties. In the 'My Inspections' 
                   section, select the desired report and use the 'Share' option to send it to real estate agents, 
                   contractors, or other individuals involved.`,
    },
    {
      title: "What types of properties do you inspect?",
      content: `We inspect various types of properties, including single-family homes, apartments, condos, and 
                   commercial buildings. Our inspectors are trained to assess a wide range of structures.`,
    },
    {
      title: "How far in advance should I schedule a home inspection?",
      content: `It's recommended to schedule a home inspection as soon as possible, especially if you're in the 
                   process of buying or selling a property. This ensures ample time for any necessary follow-up inspections 
                   or repairs.`,
    },
    {
      title: "What happens if the inspection reveals issues with the property?",
      content: `If the inspection uncovers issues, our report will detail the findings and recommended actions. 
                   You can use this information to negotiate repairs with the seller or make informed decisions about the 
                   property.`,
    },
    {
      title: "Do I need to be present during the home inspection?",
      content: `While it's not mandatory, we encourage homeowners to be present during the inspection. This allows 
                   you to ask questions, gain insights into the property's condition, and discuss any concerns directly 
                   with the inspector.`,
    },
    {
      title: "How do I provide feedback on my inspection experience?",
      content: `We value your feedback! You can submit your thoughts and suggestions through the 'Feedback' section 
                   in the app. Your input helps us enhance our services and provide an even better experience for our users.`,
    },
    {
      title: "Is there a warranty or guarantee for the inspection services?",
      content: `Yes, we stand by the quality of our inspection services. We offer a satisfaction guarantee, and if 
                   you encounter any issues, please contact our support team to discuss your concerns.`,
    },
    {
      title: "What if I forget my password?",
      content: `If you forget your password, simply click on the 'Forgot Password' option on the login screen. 
                   Follow the instructions to reset your password and regain access to your account.`,
    },
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: "#FA6500",
  rowTitleColor: "#333",
  // rowContentColor: "grey",
  arrowColor: "#FA6500",
  bgColor: "white",
  // titleTextColor: "#48482a",
  // rowTitleColor: "#78789a",
  rowTitleTextSize: "18px",
  rowContentColor: "#78789a",
  rowContentTextSize: "14px",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

export default function FaqPage() {
  return (
    <div className="editForm mt-10 !px-10">
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
}
