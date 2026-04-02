"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceCreateForm } from "./voice-create-form";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/features/billing/hooks/use-checkout";
import { useCallback } from "react";
import { toast } from "sonner";

interface VoiceCreateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function VoiceCreateDialog({ open, onOpenChange }: VoiceCreateDialogProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Clone a voice</DrawerTitle>
                        <DrawerDescription>
                            Record or upload a high-quality audio sample to create a digital clone of your voice.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                        <VoiceCreateForm onSuccess={() => onOpenChange(false)} />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl overflow-hidden p-0">
                <div className="flex flex-col h-[640px]">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle>Clone a voice</DialogTitle>
                        <DialogDescription>
                            Record or upload a high-quality audio sample to create a digital clone of your voice.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6 scrollbar-hide">
                        <VoiceCreateForm onSuccess={() => onOpenChange(false)} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}