import Div from "../../motions/Div";
import { Span } from "../../motions/Span";
import { variantsChildrenFadeUp, variantsContainerFadeUp, variantsFadeUp } from "../../motions/variants";

const title = "Kelola Keuangan dengan";
const wordsTitle = title.split(" ");

export const TitleHeroBanner = () => {
    return (
        <h1 className="dark:text-white md:flex flex-col items-center justify-center text-4xl lg:text-6xl font-bold text-center">
            <Div
                key={"container-title-herobanner"}
                initial="initial"
                animate="animate"
                variants={variantsContainerFadeUp}
                className="space-y-1"
            >
                {wordsTitle.map((word, index: number) => (
                    <Span key={`${word}-${index}`} variants={variantsChildrenFadeUp} className="inline-block mr-1">
                        {word}
                    </Span>
                ))}
            </Div>
            <Span
                key={"title-herobanner-second"}
                initial="initial"
                animate="animate"
                variants={variantsFadeUp}
                transition={{ duration: 1 }}
                className="dark:from-white dark:to-gnrDarkBlue bg-gradient-to-r from-blue-600 to-gray-100 text-transparent bg-clip-text"
            >
                CashFlow
            </Span>
        </h1>
    );
};