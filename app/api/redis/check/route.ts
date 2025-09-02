import { NextResponse } from "next/server";
import { getRedisClient } from "@utils/redis";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await getRedisClient();

    if (!client || !client.isReady) {
      return NextResponse.json(
        { error: "Redis is not connected" },
        { status: 500 }
      );
    }

    const pong = await client.ping();

    return NextResponse.json({ data: pong });
  } catch (error) {
    console.error("Redis GET Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Redis" },
      { status: 500 }
    );
  }
}
