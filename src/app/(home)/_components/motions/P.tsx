"use client"

import {motion} from "motion/react"
import { CustomMotionProps } from "./types"

export const P = ({children, ...props}: CustomMotionProps) => {
    return (
        <motion.p {...props}>{children}</motion.p>
    )
}