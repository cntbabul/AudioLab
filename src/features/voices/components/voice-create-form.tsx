"use client";

import { Button } from "@/components/ui/button";

interface VoiceCreateFormProps {
    onSuccess?: () => void;
}

export function VoiceCreateForm({ onSuccess }: VoiceCreateFormProps) {
    return (
        <div className="flex flex-col gap-4">
            <p>Voice Create Form Placeholder</p>
            <Button onClick={onSuccess}>Close (Success)</Button>
        </div>
    );
}
