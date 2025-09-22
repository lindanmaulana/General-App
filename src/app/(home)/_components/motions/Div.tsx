"use client";
import { motion } from "motion/react";
import { CustomMotionProps } from "./types";

const Div = ({ children, ...props }: CustomMotionProps) => {
    return <motion.div {...props}> {children} </motion.div>;
};

export default Div;
