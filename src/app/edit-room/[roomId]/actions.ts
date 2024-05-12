'use server';

import { getSession } from "@/auth";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { editRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
    const session = await getSession();

    if (!session) {
        throw new Error("you must be logged in to create room")
    }


    const room = await getRoom(roomData.id);
    if (room?.userId !== session.user.id) {
        throw new Error("User not authorized to delete this room");
    }

    await editRoom({ ...roomData, userId: room.userId });

    revalidatePath("/your-rooms")
    revalidatePath(`/edit-room/${roomData.id}`)
    redirect("/your-rooms")
}