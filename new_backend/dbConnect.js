import mongoose from "mongoose";

const dbConnect = () => {
    const connectionsParams = { useNewUrlParser: true };
    mongoose.connect(process.env.DB, connectionsParams);

    mongoose.connection.on("connected", () => {
        console.log("connected to database successfully");
    });

    mongoose.connection.on("error", (error) => {
        console.log("Error connecting to database :" + error)
    })

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB connection disconnected")
    })
}


export default dbConnect;