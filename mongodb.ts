import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
	ethAddress: String,
	discordId: Number,
});

export const User = mongoose.model("User", userSchema);
