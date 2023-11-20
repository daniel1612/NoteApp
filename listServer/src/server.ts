import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION)
  .then(() => {
    console.log("mongoose connected");
    app.listen(port, () => {
      console.log("Start Server On Port : " + port);
    });
  })
  .catch(console.error);
