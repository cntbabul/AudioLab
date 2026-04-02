import { cn } from "@/utils/cn";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Headphones, ThumbsUp } from "lucide-react";

export function PageHeader({ title, className }: { title: string, className?: string }) {
    return (
        <div className={cn("flex items-center justify-between border-b px-4 py-4", className)}>
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold text-emerald-500 tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                    <a href="mailto:cntbabul@gmail.com" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="hidden lg:block">Feedback</span>
                    </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <a href="mailto:cntbabul@gmail.com" className="flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        <span className="hidden lg:block">Need Help?</span>
                    </a>
                </Button>
            </div>
        </div>
    )




}