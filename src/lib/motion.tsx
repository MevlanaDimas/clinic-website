"use client";

import { motion, Variants } from "framer-motion";
import * as React from "react";

export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionInput = motion.input;
export const MotionTextarea = motion.textarea;
export const MotionAnchor = motion.a;
export const MotionSpan = motion.span;
export const MotionForm = motion.form;
export const MotionImg = motion.img;
export const MotionSection = motion.section;
export const MotionArticle = motion.article;
export const MotionNav = motion.nav;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.995 },
};

export const subtleHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.985 },
  transition: { type: "spring", stiffness: 520, damping: 40 },
} as const;

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
