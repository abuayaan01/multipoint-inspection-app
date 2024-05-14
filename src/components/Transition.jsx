import React from "react";
import { motion } from "framer-motion";

function Transition({ children , uid}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      key={uid}
    >
      {children}
    </motion.div>
  );
}

export default Transition;
