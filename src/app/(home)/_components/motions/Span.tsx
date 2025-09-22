"use client"
import { motion } from "motion/react";
import { CustomMotionProps } from "./types";


export const Span = ({children, ...props}: CustomMotionProps) => {
    return (
        <motion.span {...props}>{children}</motion.span>
    )
}