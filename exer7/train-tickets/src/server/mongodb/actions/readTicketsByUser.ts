import connectDB from "../index";
import Ticket from "../models/Ticket";
import mongoose from "mongoose";

export async function readTicketsByUser(props: { userID: string }) {
    try {
        await connectDB();
        const tickets = await Ticket.find({
            userId: new mongoose.Types.ObjectId(props.userID),
        });
        return tickets;
    } catch (error) {
        console.error("Error reading tickets by user:", error);
        return false;
    }
}

