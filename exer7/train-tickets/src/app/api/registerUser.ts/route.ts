import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/server/mongodb/actions/createUser";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await createUser(body);
        
        if (result) {
            return NextResponse.json("Success", { status: 200 });
        } else {
            return NextResponse.json("Failed", { status: 500 });
        }
    } catch (error) {
        return NextResponse.json("Failed", { status: 500 });
    }
}

