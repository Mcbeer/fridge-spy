import { AnimatePresence, motion } from "framer-motion";
import React, { FunctionComponent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import "./SlideIn.scss";

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
      className="SlideIn"
    >
      {children}
    </motion.div>
  );
};
