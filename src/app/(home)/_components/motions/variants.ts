import { animate, Variants } from "motion/react";

export const varianstSwitchIcon: Variants = {
    initial: {
        rotate: 180,
        scale: 0.4,
        y: 0,
    },

    animate: {
        rotate: 0,
        scale: 1,
        y: 1,
    },

    exit: {
        rotate: 180,
        scale: 0.4,
        y: 0,
    },
};

export const variantsContainerFadeUp: Variants = {
    initial: { opacity: 0},
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, 
        },
    },
};

export const variantsContainerFadeUpComponents: Variants = {
    initial: {opacity: 0},
    animate:  {
        opacity: 1,
        transition: {
            staggerChildren: 0.4
        }
    }
}

export const variantsChildrenFadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 30,
    },

    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 70,
        },
    },
};

export const variantsFadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 30,
    },

    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 70,
        },
    },
};