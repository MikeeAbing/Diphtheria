import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button.tsx";
import React from "react";

export default function TableNoSortHeader({ title, ...props }) {
    return (
        <div className={cn("flex items-center space-x-2")}>
            <Button
                variant="ghost"
                size="sm"
                className="flex items-center -ml-0.5 h-8 hover:bg-gray-200 border-none"
                {...props}
            >
                <span>{title}</span>
            </Button>
        </div>
    );
}
