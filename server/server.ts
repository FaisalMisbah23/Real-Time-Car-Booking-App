import http from "http";
import { app } from "./app";
const server = http.createServer(app);

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`server is connected on port ${process.env.PORT}`);
});
