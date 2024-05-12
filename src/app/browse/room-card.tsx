import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { TagsList } from "../../components/tags-list";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

export function RoomCard({ room }: { room: Room }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <TagsList tags={room.tags} />
                {room.githubRepo &&
                    <Link
                        href={room.githubRepo}
                        className="flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GithubIcon />
                        Github Repo
                    </Link>
                }
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href={`/rooms/${room.id}`}>Join Room</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}