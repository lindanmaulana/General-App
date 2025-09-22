import { MotionProps } from "motion/react";
import { ReactNode } from "react";

export interface CustomMotionProps extends MotionProps {
    children: ReactNode
    className?: string
}