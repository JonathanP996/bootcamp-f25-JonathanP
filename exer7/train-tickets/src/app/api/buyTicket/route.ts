import { NextRequest, NextResponse } from "next/server";
import { createTicket } from "@/server/mongodb/actions/createTicket";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await createTicket(body);
        
        if (result) {
            return NextResponse.json("Success", { status: 200 });
        } else {
            return NextResponse.json("Failed", { status: 500 });
        }
    } catch (error) {
        return NextResponse.json("Failed", { status: 500 });
    }
}

