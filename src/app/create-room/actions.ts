'use server';

import { getSession } from "@/auth";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();

    if (!session) {
        throw new Error("you must be logged in to create room")
    }

    await db.insert(room).values({ ...roomData, userId: session?.user.id });

    revalidatePath("/")
}