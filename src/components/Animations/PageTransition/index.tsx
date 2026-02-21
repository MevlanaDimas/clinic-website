"use client"

import { AnimatePresence } from "framer-motion";
import { MotionDiv } from '@/lib/motion';
import { usePathname } from "next/navigation";
import React from "react";

const pageVariants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.995 }
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait"> 
      <MotionDiv
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen"
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  );
}
