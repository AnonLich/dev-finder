import { TagsList } from "@/components/tags-list";
import { getRoom } from "@/services/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { DevFinderVideo } from "./video-player";
import { unstable_noStore } from "next/cache";


export default async function RoomPage(props: { params: { roomId: string } }) {
    unstable_noStore();

    const roomId = props.params.roomId;

    const room = await getRoom(roomId);

    console.log(room)

    if (!room) {
        return <div>Room not found</div>
    }

    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <DevFinderVideo room={room} />
                </div>
            </div>
            <div className="col-span-1 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-base">{room.name}</h1>
                    <p className="text-base text-gray-500">{room.description}</p>
                    <TagsList tags={room.tags} />
                    {room.githubRepo &&
                        <Link
                            href={room.githubRepo}
                            className="flex items-center gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon />
                            Github Repo</Link>}
                </div>
            </div>
        </div>
    )
}