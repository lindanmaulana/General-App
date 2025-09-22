"use client"

import {motion} from "motion/react"
import { CustomMotionProps } from "./types"

export const Article = ({children, ...props}: CustomMotionProps) => {
    return <motion.article {...props}>{children}</motion.article>
}