//////  server

const path = require("path");

const http = require("http");

const express = require("express");

const app = express();

const port = process.env.PORT || 4000;

const pdp = path.join(__dirname , '/public');

app.use(express.static(pdp));

const server = http.createServer(app);

server.listen(port , () => {
    console.log(`server is up on port ${port}!`);
})

const fs = require("fs");

////// socketio

function ID(data_) {
    let data = data_
    let harf_adad = "abcdefghijklnmopqrstuvwxyz1234567890";
    let harf_adad_araye = harf_adad.split("");
    let shomar = 0;
    let id_;
    while (shomar < 1) {
        let lenght = data.length;
        let durum = 0;
        let id = "";
        for (let index = 0; index < 20; index++) {
            id += harf_adad_araye[Math.floor(Math.random()*harf_adad_araye.length)]
        }
        for (let index = 0; index < lenght; index++) {
            
            if(data[index].id == id) {
                durum = 1;
            }
            
        }
        if(durum == 0) {
            shomar++
            id_ = id;
        }
    }
   
    return id_;
}

const socketio = require("socket.io");

const io = socketio(server);

io.on('connection' , (client) => {
    console.log("new websocket connection");


    client.on("user_add",(dataa) => {
        fs.readFile("./database/users.txt", (err,data) => {
            let data_ = JSON.parse(data.toString());
            let id = ID(JSON.parse(data.toString()));
            let data_push = {name: dataa.name,sifre: data.sifre,img: dataa.img,id: id,dil: "ingilizce",color: 0};
            data_.push(data_push);

            fs.writeFile("./database/users.txt",JSON.stringify(data_), (err)=> {
                if(err) throw err;
                console.log("saved");
                client.emit("user_add",data_push);
            }) 
        })
    })

    client.on("data_load",(databasee) => {
        fs.readFile("./database/users.txt",(err,dataa) => {
            client.emit("data_load",({database: databasee,data: dataa.toString()}))
        })
    })
   
    
    client.on('disconnect', () => {
        console.log("new websocket disconnected")
    })
})

/////// save images

const multer = require("multer");
const { on } = require("events");
 
const storage = multer.diskStorage({
    destination: (req ,file,cd) => {
        cd(null,'./public/images');
    },
    filename: (req,file,cd) => {
        cd(null,file.originalname);
    }
})
const upload = multer({storage: storage});
/////  save data

app.post('/upload_image',upload.single('images'),(req,res) => {
    res.send('image uploaded');
})

