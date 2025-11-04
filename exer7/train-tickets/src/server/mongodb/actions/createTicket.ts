import connectDB from "../index";
import Ticket from "../models/Ticket";
import mongoose from "mongoose";

export async function createTicket(props: {
    lineColor: string;
    station: string;
    userID: string;
}) {
    try {
        await connectDB();
        const ticket = new Ticket({
            lineColor: props.lineColor,
            station: props.station,
            userId: new mongoose.Types.ObjectId(props.userID),
        });
        await ticket.save();
        return true;
    } catch (error) {
        console.error("Error creating ticket:", error);
        return false;
    }
}

