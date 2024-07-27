const express = require("express");
const { connectToDB } = require("./config/config");

const app = express();
const cors = require("cors");
const noteRouter = require("./routes/notes.routes");

app.use(cors());

app.use(express.json());

app.use("/notes", noteRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

const PORT = 3000;





app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on PORT ${PORT}`);
});
