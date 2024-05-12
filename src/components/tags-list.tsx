'use client';

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
    const router = useRouter();

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <button
                    onClick={() => router.push(`/?search=${tag}`)}
                    key={tag}
                    className={cn(badgeVariants())}
                >
                    {tag}
                </button>
            ))}
        </div >
    )
}