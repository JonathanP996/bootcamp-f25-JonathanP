import connectDB from "../index";
import Ticket from "../models/Ticket";
import mongoose from "mongoose";

export async function deleteTicket(props: { ticketID: string }) {
    try {
        await connectDB();
        await Ticket.findByIdAndDelete(new mongoose.Types.ObjectId(props.ticketID));
        return true;
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return false;
    }
}

