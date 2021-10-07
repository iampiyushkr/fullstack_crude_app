const express = require("express");

const res = require("express/lib/response");
const connect=require("./src/config/db")
const cors=require("cors")

const app = express();

app.use(cors())
app.use(express.json());
const userController=require("./src/controllers/user.contoller")


app.use("/users",userController)





app.listen(2345, async () => {
  await connect();
  console.log("listening to port 2345");
});
