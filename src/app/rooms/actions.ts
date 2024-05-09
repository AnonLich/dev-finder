'use server'

import { getSession } from "@/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
    const session = await getSession();

    if (!session) {
        throw new Error("you must be logged in to create room")
    }

    const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!
    const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_SECRET!

    // Initialize a Server Client
    const serverClient = StreamChat.getInstance(api_key, api_secret);

    // Create User Token
    const token = serverClient.createToken(session.user.id);
    return token;
}