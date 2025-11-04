import connectDB from "../index";
import Ticket from "../models/Ticket";
import mongoose from "mongoose";

export async function updateTicketByUser(props: {
    ticketID: string;
    userID: string;
}) {
    try {
        await connectDB();
        await Ticket.findByIdAndUpdate(
            new mongoose.Types.ObjectId(props.ticketID),
            { userId: new mongoose.Types.ObjectId(props.userID) }
        );
        return true;
    } catch (error) {
        console.error("Error updating ticket by user:", error);
        return false;
    }
}

