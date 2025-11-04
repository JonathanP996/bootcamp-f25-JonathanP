import { NextRequest, NextResponse } from "next/server";
import { readTicketsByUser } from "@/server/mongodb/actions/readTicketsByUser";
import User from "@/server/mongodb/models/User";
import connectDB from "@/server/mongodb/index";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {
        const userID = request.nextUrl.searchParams.get("userID");
        
        if (!userID) {
            return NextResponse.json("User Not Found", { status: 400 });
        }
        
        // Check if user exists
        await connectDB();
        const user = await User.findById(new mongoose.Types.ObjectId(userID));
        
        if (!user) {
            return NextResponse.json("User Not Found", { status: 400 });
        }
        
        const result = await readTicketsByUser({ userID });
        
        if (result !== false) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json("Failed", { status: 500 });
        }
    } catch (error) {
        return NextResponse.json("Failed", { status: 500 });
    }
}

