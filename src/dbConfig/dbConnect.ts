import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connect", () => {
      console.log("MongoDB is Connected Successfully.");
    });
    connection.on("error", (err) => {
      console.log("MongoDB is Not Connected.", err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong", error);
  }
}
