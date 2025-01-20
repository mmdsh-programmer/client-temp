import { NextResponse } from "next/server";

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";
export async function GET() {
    return NextResponse.json({ message: "DMS IS UP AND RUNNING" });
}