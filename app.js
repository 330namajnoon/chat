////////  abzar
function ChengeObject(data = {element: "araye",method: "id-name-?",value: "string-number",method_s: "id-name-",value_s: "string-number",value_method: "push-string-number"}) {
    let element = data.element;
    let method = data.method;
    let value = data.value;
    let method_s = data.method_s;
    let value_s = data.value_s;
    let value_method = data.value_method;
    for (let index = 0; index < element.length; index++) {
        let element_s = element[index];
        if (element_s[method] == value) {
            if(value_method == "push") {
                element_s[method_s].push(value_s);
            }else {
                element_s[method_s] = value_s;
            }
        }
        
    }
    return element;
}


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
            let data_push = {name: dataa.name,sifre: data.sifre,img: dataa.img,id: id,dil: "ingilizce",color: 0,chats: []};
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
            client.emit("data_load",databasee,dataa.toString())
        })
    })

    
    client.on("user_like",(database = "",users = {room_name: "",room_users: []}) => {
        let users_ = users;
        fs.readFile(`./database/${database}.txt`,(err,data) => {
            let data_users = JSON.parse(data.toString());
           
            ChengeObject({element: data_users,method: "id",value: users_.room_users[0].id,method_s: "chats",value_s: {id: users_.room_users[1].id,room_name: users_.room_name,user: users_.room_users[1]},value_method: "push"});
            ChengeObject({element: data_users,method: "id",value: users_.room_users[1].id,method_s: "chats",value_s: {id: users_.room_users[0].id,room_name: users_.room_name,user: users_.room_users[0]},value_method: "push"});
        
            fs.writeFile(`./database/${database}.txt`,JSON.stringify(data_users),(err) => {
                if(err)throw err;
                console.log("saved");
                let arayee = []
                fs.writeFile(`./database/${users_.room_name}.txt`,JSON.stringify(arayee),(err) => {
                    if(err) throw err;
                    console.log("saved");
                    io.emit("user_like",database,JSON.stringify(data_users),users);
                })
            })
            
           
        })
    })
    
    client.on("msg_load",(data) => {
        fs.readFile(`./database/${data}.txt`,(err,data_) => {
            client.emit("msg_load",data_.toString());
        })
    })
    client.on("msg_send",(room_name,data) => {
        fs.readFile(`./database/${room_name}.txt`,(err,data1) => {
            let data2 = JSON.parse(data1.toString());
            data2.push(data);
            fs.writeFile(`./database/${room_name}.txt`,JSON.stringify(data2),(err) => {
                if(err)throw err;
                console.log("saved");
                io.emit("msg_send",room_name,data);
            })
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

