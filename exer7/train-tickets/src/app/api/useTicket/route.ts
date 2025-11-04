import { NextRequest, NextResponse } from "next/server";
import { deleteTicket } from "@/server/mongodb/actions/deleteTicket";
import Ticket from "@/server/mongodb/models/Ticket";
import connectDB from "@/server/mongodb/index";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest) {
    try {
        const ticketID = request.nextUrl.searchParams.get("ticketID");
        
        if (!ticketID) {
            return NextResponse.json("Ticket Not Found", { status: 400 });
        }
        
        // Check if ticket exists
        await connectDB();
        const ticket = await Ticket.findById(new mongoose.Types.ObjectId(ticketID));
        
        if (!ticket) {
            return NextResponse.json("Ticket Not Found", { status: 400 });
        }
        
        const result = await deleteTicket({ ticketID });
        
        if (result) {
            return NextResponse.json("Success", { status: 200 });
        } else {
            return NextResponse.json("Failed", { status: 500 });
        }
    } catch (error) {
        return NextResponse.json("Failed", { status: 500 });
    }
}

