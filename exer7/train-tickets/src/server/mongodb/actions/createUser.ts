import connectDB from "../index";
import User from "../models/User";

export async function createUser(props: { name: string; age: number }) {
    try {
        await connectDB();
        const user = new User({
            name: props.name,
            age: props.age,
        });
        await user.save();
        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        return false;
    }
}

