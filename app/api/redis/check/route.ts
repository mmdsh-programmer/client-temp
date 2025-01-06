import { NextResponse } from "next/server";
import { getRedisClient } from "cacheHandler.mjs";

export async function GET() {
  try {
    const client = await getRedisClient();
    if(!client || !client.isOpen){
      return NextResponse.json({ error: "Failed to retrieve data" }, { status: 500 });
    }
  
    
    if(client && client.isOpen){
      await client.set("ping", "pong");
      const value = await client.get("ping");
      return NextResponse.json({ data : value });
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
