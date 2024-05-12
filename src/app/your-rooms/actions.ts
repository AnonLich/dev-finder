'use server';

import { getSession } from "@/auth";
import { deleteRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
    const session = await getSession();
    if (!session) {
        throw new Error("User not authenticated");
    }

    const room = await getRoom(roomId);
    if (room?.userId !== session.user.id) {
        throw new Error("User not authorized to delete this room");
    }

    await deleteRoom(roomId);

    revalidatePath("/your-rooms");
}