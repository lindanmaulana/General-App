"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useShow } from "@/lib/zustand/useShow";
import { CreditCard, Wallet } from "lucide-react";

export const OverviewCard = () => {
    const isShow = useShow((state) => state.isShow)
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="w-full bg-gnrPrimary/10 border border-gnrGreen/30">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrPrimary font-semibold">Total Saldo</h4>
            <Wallet className="size-4 text-gnrPrimary" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrPrimary">{isShow ? "Rp 19.000.000" : "........"}</strong>
            <span className="block text-xs text-gnrGray">
              Dari 5 akun yang aktif
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border border-gnrGreen/30">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Akun Bank</h4>
            <CreditCard className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">3</strong>
            <span className="block text-xs text-gnrGray">
                akun bank aktif
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border border-gnrGreen/30">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Kas Tunai</h4>
            <Wallet className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{isShow ? "Rp 19.000.000" : "........"}</strong>
            <span className="block text-xs text-gnrGray">
              Saldo kas tersedia
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
