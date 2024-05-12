"use client";

import { Room } from "@/db/schema";
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteRoomAction } from "./actions";


export function UserRoomCard({ room }: { room: Room }) {
    return (
        <Card>
            <CardHeader className="relative">
                <Button className="absolute top-2 right-2" size={"icon"}>
                    <Link href={`/edit-room/${room.id}`}>
                        <PencilIcon />
                    </Link>
                </Button>
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
            <CardFooter className="flex gap-2">
                <Button asChild>
                    <Link href={`/rooms/${room.id}`}>Join Room</Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant={"destructive"}
                            onClick={() => { }}
                        >
                            <TrashIcon className="w-4 h-4 mr-2" /> Remove Room
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently the room and all data associated with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    deleteRoomAction(room.id);
                                }}
                            >Yes, delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </CardFooter>
        </Card>
    )
}