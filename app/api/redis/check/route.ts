import { NextResponse } from "next/server";
import { createCluster } from "redis";
import { getRedisClient } from "cacheHandler.mjs";

export async function GET() {
  try {
   
      const client = createCluster({
        rootNodes: [
          { url: "redis://10.248.34.142:6382" },
          { url: "redis://10.248.34.142:6380" },
          { url: "redis://10.248.34.142:6381" },
        ],
        defaults: {
          username: "clasorclient",
          password: "YYhi16j",
          socket: {
            reconnectStrategy: (retries) => {
              console.log("---------------------------- retries --------------------------", retries);
              return 1000;
            },
          },
        },
      });
      await client.connect();
      
      client.on("connect", () => {
        console.log("Redis client connected");
      });
      
      client.on("error", (err) => {
        console.error("Redis Client Error:", err);
      });
      
      if(client && client.isOpen){
        const result = await client.get("test");
        console.log("---------------------------- result --------------------------", result); 
      }

  

    return NextResponse.json({ "message" : "ok" });
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
