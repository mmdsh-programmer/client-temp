import { IActionError } from "@interface/app.interface";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { handleRouteError } from "@utils/error";
import { headers } from "next/headers";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";

export async function POST() {
    try {
        const headersList = await headers();
        const Authorization = headersList.get("Authorization");
        if(!Authorization || Authorization.replace("Bearer ", "") !== process.env.API_TOKEN){
            return NextResponse.json({ error: "Client is not authorized" }, { status: 401 });
        }
        // Generate a random secret key and initialization vector
        const secretKey = crypto.randomBytes(32).toString("hex"); // 256-bit key
        const initVector = crypto.randomBytes(16).toString("hex"); // 128-bit IV

        return NextResponse.json({ secretKey, initVector });
    } catch (error) {
        return handleRouteError(error as IActionError);
    }
}


