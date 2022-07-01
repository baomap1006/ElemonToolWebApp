import { createServer } from "http";
import { Server } from "socket.io";
import express, { Express, Request, Response } from 'express';


const cors = require('cors');
const app = express();
app.use(cors({origin:'*'}))
app.use(express.json());


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ 

cors: {
    origin: "*"
  }
});

app.get('/newRecord',(req:Request,res:Response)=>{
  res.send("Hello !")
    io.emit("received-clicked","newRecord")
})

app.get('/',(req:Request,res:Response)=>{
    console.log("Requested on /")
    res.send("Hello !")
    io.emit("received-clicked","received clicked event 2")
})


io.on("connection", (socket) => {
    // ...
    console.log("a new user just connected !",socket.id); 
    socket.emit("connected",{data:"welcome to "+socket.id})

    socket.on("clicked", (socket) => {
        console.log(socket)
        console.log(socket.data)
       

    })

    socket.conn.on("close", (reason) => {
        // called when the underlying connection is closed
      });
      socket.on("disconnect", (reason) => {
        console.log("user was disconnected")
      });
  });
  


  httpServer.listen(3001,()=>{console.log("listening to port 3001")});