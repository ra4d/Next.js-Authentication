import mongoose from "mongoose";
let initialized = false;
const connect = async () => {
  mongoose.set("strictQuery", true);

  if (initialized) {
    console.log(`mongobd already connected`);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(`mongoDB connect`);
    initialized = true;
  } catch (error) {
    console.log("mongoDB connection error:", error);
  }
};
export default connect;