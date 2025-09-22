"use client";
import { motion } from "motion/react";
import { CustomMotionProps } from "./types";

const H1 = ({ children, ...props }: CustomMotionProps) => {
    return <motion.h1 {...props}> {children} </motion.h1>;
};

export default H1;
