import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Modal = (props) => {
  const { openModal, width, children } = props;
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);
  return (
    <AnimatePresence>
      {openModal && (
        <div className="fixed z-20 top-0 bottom-0 right-0 left-0 bg-zinc-600 bg-opacity-60 flex justify-center items-center">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${width}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
const Header = (props) => {
  const { headerText, className, icon } = props;
  return (
    <div
      className={`${className} px-4 py-3 flex items-center gap-4 rounded-t-lg text-3xl text-white`}
    >
      {icon}
      <div className="text-2xl">{headerText}</div>
    </div>
  );
};
const Body = (props) => {
  const { children, ...rest } = props;
  return (
    <div className="bg-white px-5 py-3 overflow-y-auto max-h-[65vh]" {...rest}>
      {children}
    </div>
  );
};
const Footer = (props) => {
  const { children, ...rest } = props;
  return (
    <div
      className="border-t-2 border-slate-200 bg-white px-3 py-4 rounded-b-lg flex justify-end gap-2"
      {...rest}
    >
      {children}
    </div>
  );
};
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
