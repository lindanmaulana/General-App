import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface TabsCardProps {
    children: ReactNode
    title: string
    description: string
    icon: LucideIcon
}

export const TabsCard = (props: TabsCardProps) => {
    const {children, title, description} = props

    return (
        <Card className="dark:bg-gnrDark dark:border-white/20">
            <CardHeader>
                <CardTitle className="dark:text-gnrWhite flex items-center gap-2 text-2xl">
                    {" "}
                    <props.icon /> {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {children}
            </CardContent>
        </Card>
    );
};
