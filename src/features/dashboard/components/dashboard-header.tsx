"use client"

import { useUser } from "@clerk/nextjs"

export function DashboardHeader() {
    const { isLoaded, user } = useUser()

    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground/80 tracking-wide uppercase">Nice to see you</p>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
            </h1>
        </div>
    )




}
