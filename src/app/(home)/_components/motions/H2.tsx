"use client";
import { motion } from "motion/react";
import { CustomMotionProps } from "./types";

const H2 = ({ children, ...props }: CustomMotionProps) => {
    return <motion.h2 {...props}> {children} </motion.h2>;
};

export default H2;
