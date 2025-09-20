import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChartColumn, LucideIcon, TrendingUp, Wallet } from "lucide-react";

interface MainFeatures {
    id: number
    icon: LucideIcon
    label: string
    description: string
    bgColor: string
    iconColor: string
}

const mainFeatures: MainFeatures[] = [
    {
        id: 1,
        icon: TrendingUp,
        label: "Pemasukan",
        description: "Kelola dan catat semua pemasukan",
        bgColor: "bg-gnrGreen/10 ",
        iconColor: "text-gnrGreen"
    },
    {
        id: 2,
        icon: ChartColumn,
        label: "Pengeluaran",
        description: "Pantau dan kontrol pengeluaran",
        bgColor: "bg-gnrRed/10",
        iconColor: "text-gnrRed"
    },
    {
        id: 3,
        icon: Wallet,
        label: "Kas dan Bank",
        description: "Monitor saldo kas dan bank",
        bgColor: "bg-gnrPrimary/10",
        iconColor: "text-gnrPrimary"
    },
    {
        id: 4,
        icon: Calendar,
        label: "Event",
        description: "Kelola event dan dokumentasi",
        bgColor: "bg-gnrOrange/10",
        iconColor: "text-gnrOrange"
    }
]

export const MainFeaturesList = () => {
    return (
        <>
            {mainFeatures?.map(feature => (
                <Card key={feature.id} className="dark:bg-gnrDarkBlueMate dark:border-white/10 shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
                    <CardContent>
                        <article className="flex flex-col items-center justify-center text-center gap-2">
                            <div className={`${feature.bgColor} rounded-full p-3`}>
                                <feature.icon className={`${feature.iconColor} size-6`} />
                            </div>
                            <h3 className="dark:text-gnrWhite text-lg font-semibold"> {feature.label} </h3>
                            <p className="text-gnrGray text-sm"> {feature.description} </p>
                        </article>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

{
    /* <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
                        <CardContent className="">
                            <article className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="bg-gnrGreen/10 rounded-full p-3">
                                    <TrendingUp className="text-gnrGreen size-6" />
                                </div>
                                <h3 className="text-lg font-semibold"> Pemasukan </h3>
                                <p className="text-gnrGray text-sm">Kelola dan catat semua pemasukan</p>
                            </article>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
                        <CardContent className="">
                            <article className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="bg-gnrRed/10 rounded-full p-3">
                                    <ChartColumn className="text-gnrRed size-6" />
                                </div>
                                <h3 className="text-lg font-semibold"> Pengeluaran </h3>
                                <p className="text-gnrGray text-sm">Pantau dan kontrol pengeluaran</p>
                            </article>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
                        <CardContent className="">
                            <article className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="bg-gnrPrimary/10 rounded-full p-3">
                                    <Wallet className="text-gnrPrimary size-6" />
                                </div>
                                <h3 className="text-lg font-semibold"> Kas dan Bank </h3>
                                <p className="text-gnrGray text-sm">Monitor saldo kas dan bank</p>
                            </article>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none hover:shadow-xl hover:-translate-y-3 transition-global duration-500">
                        <CardContent className="">
                            <article className="flex flex-col items-center justify-center text-center gap-2">
                                <div className="bg-gnrOrange/10 rounded-full p-3">
                                    <Calendar className="text-gnrOrange size-6" />
                                </div>
                                <h3 className="text-lg font-semibold"> Events </h3>
                                <p className="text-gnrGray text-sm">Kelola event dan dokumentasi</p>
                            </article>
                        </CardContent>
                    </Card> */
}
