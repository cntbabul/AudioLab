import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Headphones, ThumbsUp } from "lucide-react";

export function PageHeader({ title, className }: { title: string, className?: string }) {
    return (
        <header className={cn(
            "sticky top-0 z-40 w-full",
            "border-b border-border/40 bg-background/80",
            "backdrop-blur-md supports-backdrop-filter:bg-background/60",
            className
        )}>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-16">
                <div className="flex items-center gap-2 lg:gap-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-6 w-px bg-border/60 hidden lg:block" />
                    <h1 className="text-lg font-bold text-emerald-500/90 tracking-tight lg:text-xl">{title}</h1>
                </div>
                <div className="flex items-center gap-2 lg:gap-3">
                    <Button variant="ghost" size="icon" className="lg:hidden" asChild>
                        <a href="mailto:cntbabul@gmail.com">
                            <Headphones className="h-4 w-4" />
                        </a>
                    </Button>
                    <div className="hidden lg:flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors">
                            <a href="mailto:cntbabul@gmail.com" className="flex items-center gap-2">
                                <ThumbsUp className="h-4 w-4" />
                                <span>Feedback</span>
                            </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors">
                            <a href="mailto:cntbabul@gmail.com" className="flex items-center gap-2">
                                <Headphones className="h-4 w-4" />
                                <span>Need Help?</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}