import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
});

export default mongoose.models?.User || mongoose.model("User", userSchema);

