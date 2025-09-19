import { NextResponse } from "next/server";
import { headers } from "next/headers";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const headersList = await headers();
    const Authorization = headersList.get("Authorization");
    if (
      !Authorization ||
      Authorization.replace("Bearer ", "") !== process.env.API_TOKEN
    ) {
      return NextResponse.json(
        { message: "Client is not authorized" },
        { status: 401 }
      );
    }
    const redisHandler = await global.redisClientPromise;
    if(!redisHandler || !redisHandler.isReady){
      return NextResponse.json({ error: "Redis is not ready" }, { status: 400 });
    }
    const key = req.nextUrl.searchParams?.get("key");

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const keyType = await redisHandler?.get(key);

    let value;
    switch (keyType) {
      case "string":
        
        break;

      case "hash":
        value = await redisHandler?.get(key);
        break;

      case "list":
        value = await redisHandler?.get(key); // Get all elements in the list
        break;

      case "set":
        value = await redisHandler?.get(key); // Get all members of the set
        break;

      case "zset": // Sorted set
        value = await redisHandler?.get(key); // Get all elements with scores
        break;

      case "stream":
        value = await redisHandler?.get(key); // Get all entries in the stream
        break;

      case "none": // Key doesn't exist
        return NextResponse.json(
          { error: `Key "${key}" does not exist` },
          { status: 404 }
        );

      default:
        return NextResponse.json(
          { error: `Unsupported key type: ${keyType}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ key, type: keyType, value });
  } catch (error) {
    console.error("Redis GET Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
