import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
    return (
        <div>
            <WavyBackground
                colors={["#FF9933", "#FF9933", "#FFFFFF", "#138808", "#138808"]}
                backgroundFill="#FFFFFF"
                blur={3}
                speed="slow"
                waveOpacity={0.1}
                waveWidth={60}
                waveYOffset={250}
                containerClassName="h-full"
                className="hidden"
            />
        </div>
    )
}