import { Badge } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <Badge key={tag} className="w-fit">{tag}</Badge>
            ))}
        </div>
    )
}