"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPie, DollarSign, TrendingDown, TrendingUp, Wallet, Wrench } from "lucide-react";

export const DashboardDemo = () => {
    return (
        <section className="space-y-4">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Card className="dark:bg-black dark:border-white/20">
                    <CardContent className="space-y-2">
                        <h3 className="text-gnrGray text-sm font-medium">Total Akun (active)</h3>
                        <div className="flex items-center justify-between">
                            <h4 className="dark:text-gnrWhite font-semibold">4</h4>
                            <div className="bg-gnrPrimary/20 p-1 rounded">
                                <Wallet className="size-4 text-gnrPrimary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-black dark:border-white/20">
                    <CardContent className="space-y-2">
                        <h3 className="text-sm text-gnrGray font-medium">Pemasukan Bulan Ini</h3>
                        <div className="flex items-center justify-between">
                            <h4 className="dark:text-gnrWhite font-semibold">Rp 3.000.000</h4>
                            <div className="bg-gnrGreen/20 p-1 rounded">
                                <TrendingUp className="size-4 text-gnrGreen" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-black dark:border-white/20">
                    <CardContent className="space-y-2">
                        <h3 className="text-sm text-gnrGray font-medium">Pengeluaran Bulan Ini</h3>
                        <div className="flex items-center justify-between">
                            <h4 className="dark:text-gnrWhite font-semibold">Rp 100.000</h4>
                            <div className="bg-gnrRed/20 p-1 rounded">
                                <TrendingDown className="size-4 text-gnrRed" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="dark:bg-black dark:border-white/20">
                    <CardContent className="space-y-2">
                        <h3 className="text-sm text-gnrGray font-medium">Saldo Bersih</h3>
                        <div className="flex items-center justify-between">
                            <h4 className="dark:text-gnrWhite font-semibold">Rp 2.000.000</h4>
                            <div className="bg-gnrPrimary/20 p-1 rounded">
                                <DollarSign className="size-4 text-gnrPrimary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className=" dark:bg-black dark:border-white/20">
                    <CardContent className=" space-y-4">
                        <h3 className="dark:text-gnrWhite text-lg font-medium">Grafik Keuangan</h3>

                        <div className="dark:from-gnrDarkBlue flex flex-col items-center justify-center gap-4 p-10 bg-gradient-to-br from-blue-100 rounded-xl">
                            <ChartPie className="dark:text-gnrWhite size-14 text-gnrPrimary" />
                            <h3 className=" text-gnrGray text-base text-center">
                                Visualisasi data keuangan <br /> Grafik interaktif dengan Recharts
                            </h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="dark:bg-black dark:border-white/20">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">Aksi Cepat</CardTitle>
                        <CardDescription>Tindakan yang sering di gunakan</CardDescription>
                    </CardHeader>
                    <CardContent className="h-full space-y-3">
                        <div className="dark:from-gnrDarkBlue h-full flex flex-col items-center justify-center gap-4 p-10 bg-gradient-to-br from-blue-100 rounded-xl">
                            <Wrench className="dark:text-gnrWhite size-14 text-gnrPrimary" />
                        </div>
                    </CardContent>
                </Card>
            </section>
        </section>
    );
};
