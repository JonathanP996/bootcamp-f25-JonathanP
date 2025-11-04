import { NextRequest, NextResponse } from "next/server";
import { updateTicketByUser } from "@/server/mongodb/actions/updateTicketByUser";
import Ticket from "@/server/mongodb/models/Ticket";
import User from "@/server/mongodb/models/User";
import connectDB from "@/server/mongodb/index";
import mongoose from "mongoose";

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { ticketID, userID } = body;
        
        if (!ticketID || !userID) {
            return NextResponse.json("Ticket Not Found", { status: 400 });
        }
        
        // Check if ticket and user exist
        await connectDB();
        const ticket = await Ticket.findById(new mongoose.Types.ObjectId(ticketID));
        const user = await User.findById(new mongoose.Types.ObjectId(userID));
        
        if (!ticket) {
            return NextResponse.json("Ticket Not Found", { status: 400 });
        }
        
        if (!user) {
            return NextResponse.json("User Not Found", { status: 400 });
        }
        
        const result = await updateTicketByUser({ ticketID, userID });
        
        if (result) {
            return NextResponse.json("Success", { status: 200 });
        } else {
            return NextResponse.json("Failed", { status: 500 });
        }
    } catch (error) {
        return NextResponse.json("Failed", { status: 500 });
    }
}

