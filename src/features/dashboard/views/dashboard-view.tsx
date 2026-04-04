import { PageHeader } from "@/components/page-header";
import { HeroPattern } from "../components/hero-pattern";
import { DashboardHeader } from "../components/dashboard-header";
import { TextInputPanel } from "@/components/text-input-panel";
import { QuickActionsPanel } from "../components/quick-actions-panel";

export function DashboardView() {
    return (
        <div className="relative flex flex-col min-h-full bg-background/50">
            <PageHeader title="Dashboard" />
            <div className="relative flex-1">
                <HeroPattern />
                <div className="relative mx-auto max-w-7xl space-y-12 p-4 lg:p-16" >
                    <DashboardHeader />
                    <TextInputPanel />
                    <QuickActionsPanel />
                </div>
            </div>
        </div>
    )
}