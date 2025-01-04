import { getRedisClient } from "cacheHandler.mjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const redisHandler = await getRedisClient();
    const key = req.nextUrl.searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const value = await redisHandler.get(key);
    return NextResponse.json({ key, value });
  } catch (error) {
    console.error("Redis GET Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const redisHandler = await getRedisClient();
    const { key, value } = await req.json();

    if (!key || !value) {
      return NextResponse.json(
        { error: "Key and Value are required" },
        { status: 400 }
      );
    }

    await redisHandler.set(key, value);

    return NextResponse.json({ key, value });
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json({ error: "Failed to set data" }, { status: 500 });
  }
}
