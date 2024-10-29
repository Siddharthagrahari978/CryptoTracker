const express = require("express");
const appRouter = require("./src/app");
const api = express();
const port = process.env.PORT | 3000;


api.use('/',appRouter);
api.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
})

