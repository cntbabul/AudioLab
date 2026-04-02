"use client"

import { TEXT_MAX_LENGTH } from "@/features/text-to-speech/data/constant"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Coins } from "lucide-react"
import { Button } from "./ui/button"

export function TextInputPanel() {
    const [text, seText] = useState("")
    const router = useRouter()

    const handleGenerate = () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`)
    }

    return (
        <div className="rounded-[22px] bg-linear-185 from-[#ff8ee3] from-15% viia-[#57d7e0] via-39% to-[#dbf1f2] to-85% p-0.5 shadow-[0_0_0_4px-white]">
            <div className="rounded-[20px] bg-[#f9f9f9] p-1">
                <div className="space-y-4 rouned-2xl bg-white p-4 drop-shadow-xs">
                    <Textarea
                        placeholder="start typing or paste your text here ..."
                        className="min-h-35 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                        value={text}
                        onChange={(e) => seText(e.target.value)}
                        maxLength={TEXT_MAX_LENGTH}
                    />
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1.5 border-dashed" >

                            <Coins className="size-3 text-chart-5" />
                            <span className="text-xs">
                                {text.length === 0 ? (
                                    "Start typing to estimate"
                                ) : (
                                    <>
                                        <span className="tabular-nums">
                                            ${(text.length * 0.0003).toFixed(4)}
                                        </span>{" "}
                                        estimated cost
                                    </>

                                )}
                            </span>
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {text.length.toLocaleString()}/{TEXT_MAX_LENGTH.toLocaleString()} characters
                        </span>
                        <div className="flex items-center justify-end p-3">
                            <Button
                                size="sm"
                                disabled={!text.trim()}
                                onClick={handleGenerate}
                                className="w-full lg:w-auto"
                            >
                                Generate speech
                            </Button>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )

}