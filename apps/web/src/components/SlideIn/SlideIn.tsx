import { AnimatePresence, motion } from "framer-motion";
import React, { FunctionComponent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";

export const SlideIn: FunctionComponent = ({ children }) => {
  const navigate = useNavigate();
  const ref = useRef<any>(null);

  useOnClickOutside(ref, () => navigate(-1));

  return (
    <motion.div
      ref={ref}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      exit={{ x: 600 }}
      className="fixed top-0 bottom-0 w-3/5 right-0 bg-white z-2 shadow-lg opacity-100 backdrop-blur-sm px-8 py-4"
    >
      {children}
    </motion.div>
  );
};
