///////  imports
import {CrateElement,SearchObject,ChengeObject} from "./acharfaranse.js";
import {Sigin} from "./sigin.js";

/////// elements
let user = JSON.parse(localStorage.getItem("chat_user"));
let body,sigin,dil,color,rabetkarbari;

///////  data load
let colors = [
    {
        c_1: "#F79489",
        c_2: "#F8AFA6",
        c_3: "#FADCD9",
        c_4: "#F9F1F0"
    },
    {
        c_1: "#F79489",
        c_2: "#F8AFA6",
        c_3: "#FADCD9",
        c_4: "#F9F1F0"
    },
]
let diller = {
    ingilizce: {
        isim: "Name",
        sifre: "Password",
        sifre_tekrar: "Repeat Password",
        arkadaslar: "Friends",
        mesajlar: "Messages",
    }
}

let socket = io();

let datas = {
    secilenler: [],
    users_data: [],
    chat_data: [],
}

// socket.emit("data_load","users")
socket.on("data_load",(database,data,note) => {
    if(database == "users" && data !== "" ) {
        datas[database+"_data"] = JSON.parse(data);
        rabetkarbari.navar_abzar.namayesh_profilha();
    
    }

})
socket.on("user_like",(database,data,users) => {
    if(data != "") {
        datas.users_data = JSON.parse(data);
        user = SearchObject({element: datas.users_data,method: "id",value: user.id});
        localStorage.setItem("chat_user",JSON.stringify(user));
        rabetkarbari.navar_abzar.namayesh_profilha();
    }
    let durum = SearchObject({element: users.room_users,method: "id",value: user.id});        
})



// window.addEventListener("click",() => {
//     rabetkarbari.navar_abzar.namayesh_profilha();
// })



///////  body
body = document.querySelector("body");
body.style.width = innerWidth+"px";
body.style.height = innerHeight+"px";
function body_size() {
    body.style.width = innerWidth+"px";
}
body_size()
window.addEventListener("resize",() => {
    body_size();
})
//////  rabet karbari
function RabetKarbari () {
    function NavarAbzar () {
        this.styles = {
            paszamine: "float: left;position: absolute;background-color: #d07c7c;width: 100% ;height: 100% ;float: none;text-align: center;",
            sartitr: `float: left;background-color: ${color.c_1};width: 100% ;height: 6% ;`,
            paszamine_s: `overflow-y: auto;float:left;background-color: ${color.c_4};width: 100% ;height: 94% ;`,
            dosyalar: `padding: 1% 0px 1% 0px ;color: ${color.c_3};position: absolute;background-color: ${color.c_2};width: 40% ;height: auto% ;font-size: 15px;top: 6%;margin: 0% 0px 0px 7% ;border-radius: 0px 0px 2vw 2vw ;float: left;display: block;`,
            spans: `color: ${color.c_4};font-size: 20px; float: left;font-size: 25px ;margin: 1% 0px 0px 2% ;`,
        }
        this.paszamine = CrateElement({name: "div",style: this.styles.paszamine});
        this.sartitr = CrateElement({name: "div",style: this.styles.sartitr});
        this.meno_span = CrateElement({name: "span",inerhtml: "menu",clas: "material-symbols-outlined",style: this.styles.spans});
        this.search_span = CrateElement({name: "span",inerhtml: "search",clas: "material-symbols-outlined",style: this.styles.spans+";float: right;margin-right: 2%;display: none"});
        this.appname = CrateElement({name: "h1",inerhtml: "Sinagram",style: this.styles.spans+";font-size: 20px;margin-left: 4%"});
        this.paszamine_s = CrateElement({name: "div",style: this.styles.paszamine_s});
        this.profiller_dosyasi = CrateElement({name: "div",inerhtml: dil.mesajlar,style: this.styles.dosyalar});
        this.chat_dosyasi = CrateElement({name: "div",inerhtml: dil.arkadaslar,style: this.styles.dosyalar+";left: 45%; background-color: "+color.c_1+""});
        ////// apendchilds
        this.paszamine.appendChild(this.sartitr);
        this.paszamine.appendChild(this.paszamine_s);
        this.paszamine.appendChild(this.profiller_dosyasi);
        this.paszamine.appendChild(this.chat_dosyasi);
        this.sartitr.appendChild(this.meno_span);
        this.sartitr.appendChild(this.appname);
        this.sartitr.appendChild(this.search_span);
        /////// events
        this.chat_dosyasi.addEventListener("click", (e) => {
            e.stopPropagation();
            
            this.chat_dosyasi.style.backgroundColor = color.c_1;
            this.profiller_dosyasi.style.backgroundColor = color.c_2;
            this.search_span.style.display = "none";
            this.namayesh_profilha();

        })
        this.profiller_dosyasi.addEventListener("click", (e) => {
            e.stopPropagation();
            this.chat_dosyasi.style.backgroundColor = color.c_2;
            this.profiller_dosyasi.style.backgroundColor = color.c_1;
            this.search_span.style.display = "block";
            this.namayesh_payamha();
        })
        ///////  resize
        
        function resize(paszamine) {
            
            if (innerWidth < innerHeight) {
                paszamine.style.cssText = "position: absolute;background-color: #d07c7c;width: 100% ;height: 100% ;float: none;text-align: center;";
              
            }else {
                paszamine.style.marginLeft = (body.getBoundingClientRect().width/3)+"px";
                paszamine.style.width = (body.getBoundingClientRect().width/3)+"px";
                
            }
        }
        resize(this.paszamine);
    
        // window.addEventListener("resize",() => {
        //     resize(this.paszamine);
        // })
      
    }
    NavarAbzar.prototype.namayesh_profilha = function() {
        this.paszamine_s.innerHTML = "";
        let no;
        let shomar = 0;
        if(datas.secilenler.length < datas.users_data.length-1 && user.chats.length < datas.users_data.length-1) {
            while(shomar < 1) {
                let durum = true;
                let no_random = Math.floor(Math.random()*datas.users_data.length);
                let no_e = datas.users_data[no_random];
                let no_s = SearchObject({element: datas.secilenler,method: "id",value: no_e.id});
                let user_chats = SearchObject({element: user.chats,method: "id",value: no_e.id});
               
                if(no_e.id != user.id && user_chats == undefined) {
                    if(no_s == undefined ||  datas.secilenler.length < 1) {
                        shomar++;
                        no = no_random;
                    }
                }
            }
        
        function User(user_data) {
            this.data = user_data;
           
            this.styles = {
                paszamine: `position: absolute;width: 100%; height: 100%`,
                paszamine_span: `float:left;position: absolute;width: 100%; height: auto;top:70%`,
                img: `width: 100%; height: 100%;object-fit: cover;position: absolute;left: 0px`,
                spans: `margin-left: 10%;float: left; font-size: 50px;color: ${color.c_4};background-color: ${color.c_1};border-radius: 20vw 20vw 20vw 20vw;padding: 3px 3px 3px 3px`,
                h1: `position: absolute; width: 100% ;text-align: center; color: ${color.c_1};background-color: ${color.c_1+"40"};top:5%`,
            }
            this.paszamine = CrateElement({name: "div",id: "paszamine",style: this.styles.paszamine});
            this.paszamine_spans = CrateElement({name: "div",style: this.styles.paszamine_span})
            this.img = CrateElement({name: "img",src: "../images/"+this.data.img,id: "img",style: this.styles.img});
            this.profil_name = CrateElement({name:"h1",inerhtml:this.data.name,style: this.styles.h1})
            this.tick = CrateElement({name:"sapn",inerhtml:"done_outline",clas: "material-symbols-outlined",style: this.styles.spans+";float: right;margin-right: 10%"})
            this.sil = CrateElement({name:"sapn",inerhtml:"close",clas: "material-symbols-outlined",style: this.styles.spans})
            //////  events
            this.durum = false;
            this.org = {
                x: 0,
                y: 0
            };
            this.paszamine.addEventListener("touchstart",(e) => {
                this.org.x = e.touches[0].pageX-this.paszamine.getBoundingClientRect().x;
                this.org.y = this.paszamine.getBoundingClientRect().y;
                this.durum = true;

            })
            this.paszamine.addEventListener("touchmove",(e) => {
                if(this.durum == true){
                    let x = e.touches[0].pageX;
                    this.paszamine.style.left = (x-this.org.x)+"px";
                    this.paszamine.style.top = this.org.y+"px";
                }
            })
            this.paszamine.addEventListener("touchend",(e) => {
                this.durum = false;
                if(this.paszamine.getBoundingClientRect().x < this.org.x) {
                    this.unlike();
                    rabetkarbari.navar_abzar.namayesh_profilha();
                }else{
                    this.like();
                }
                rabetkarbari.navar_abzar.namayesh_profilha();

            })
            this.sil.addEventListener("click",(e) => {
                e.stopPropagation();
                this.unlike();
                rabetkarbari.navar_abzar.namayesh_profilha();
            })
            this.tick.addEventListener("click",(e) => {
                e.stopPropagation();
                this.like();
                
            })
            
        }
        User.prototype.like = function() {
            

            socket.emit("user_like","users",{room_name: user.id+this.data.id,room_users: [{name: user.name,id: user.id,img: user.img},{name: this.data.name,id:this.data.id,img:this.data.img}]});
        }
        User.prototype.unlike = function() {
            datas.secilenler.push(this.data);
        }
        User.prototype.Crate = function(element) {
            element.appendChild(this.paszamine);
            this.paszamine.appendChild(this.img);
            this.paszamine.appendChild(this.paszamine_spans);
            this.paszamine.appendChild(this.profil_name);
            this.paszamine_spans.appendChild(this.sil);
            this.paszamine_spans.appendChild(this.tick);
          
        }
    
        let profil = new User(datas.users_data[no]);
        profil.Crate(this.paszamine_s);
        }
       
    }
    NavarAbzar.prototype.namayesh_payamha = function() {
        this.paszamine_s.innerHTML = "";
        function Profiles(data) {
            this.data = data;
            this.styles = {
                paszamine: `border: solid 2px ${color.c_1};border-radius:10vw 10vw 10vw 10vw;float:left;margin-top: 5px;margin-left: 3%;width: 90%;height: auto;background-color: ${color.c_2};padding: 3px 3px 3px 3px`,
                name: `margin: 9px 0 0 5%;float: left; font-size: 20px; color: ${color.c_4};`,
                img: `margin-left: 0%;float: left;object-fit: cover;width: 40px;height: 40px;border-radius: 10vw 10vw 10vw 10vw`,
            }
            this.paszamine = CrateElement({name: "div",style: this.styles.paszamine})
            this.img = CrateElement({name: "img",src: "../images/"+this.data.user.img,style: this.styles.img})
            this.name = CrateElement({name: "div",inerhtml: this.data.user.name,style: this.styles.name});
            
            this.Crate();
            this.paszamine.addEventListener("click", () => {
                rabetkarbari.chat_room = new Chat_Room(this.data);
            })
        }
        Profiles.prototype.Crate = function() {
            this.paszamine.appendChild(this.img);
            this.paszamine.appendChild(this.name);
        }
        
        let profiles = [];
        let fasele = CrateElement({name: "div",style: "height: 5%"});
        user.chats.forEach(e => {
            profiles.push(new Profiles(e));
        });
        this.paszamine_s.appendChild(fasele);
        profiles.forEach(e => {
            this.paszamine_s.appendChild(e.paszamine);
        })
        console.log(profiles)

    }
    this.navar_abzar = new NavarAbzar();
    /////////  chat room
    function Chat_Room(data) {
        this.data = data;
        rabetkarbari.navar_abzar.paszamine_s.innerHTML = "";
        this.styles = {
            paszamine: `;position: relative;background-color: ${color.c_4};width: 100% ;height: 100% ;left: 0% ;top: 0% ;float: left;text-align: center;`,
            sar: `position: relative; background-color:${color.c_2}; width: 100%; height: 10%; float: left;;margin: 10% 0px 0px 0px ;`,
            img: `;width: 50px ;height: 50px ;margin: 0px 0px 0px 3% ;border-radius: 20vw 20vw 20vw 20vw ;float: left;object-fit: cover;`,
            name: `;color: ${color.c_3};font-size: 20px ;margin: 7px 0px 0px 20% ;float: left;`,
            input_text: `;color: ${color.c_1};background-color: ${color.c_3};width: 80% ;font-size: 15px ;border: solid 2px #c95e5e;padding: 4px 0px 4px 0px `,
            input_ersal: `;color: ${color.c_3};background-color: ${color.c_1};width: 18% ;font-size: 15px ;border: solid 2px ${color.c_1};padding: 4px 0px 4px 0px ;`,
            paszamine_s: `;position: relative;background-color: ${color.c_4};width: 100% ;height: 80% ;float: left;overflow-y: auto;`,
            paszamine_inputs: `;position: absolute;width: 100% ;height: auto ;top: 90% ;`,
        }
        this.paszamine = CrateElement({name: "div",style: this.styles.paszamine,id: "ch_paszamine"});
        this.paszamine_s = CrateElement({name: "div",style: this.styles.paszamine_s,id: "ch_paszamine_s"});
        this.paszamine_inputs = CrateElement({name: "div",style: this.styles.paszamine_inputs,id: "ch_paszamine_inputs"});
        this.sar = CrateElement({name: "div",style: this.styles.sar,id: "ch_sar"});
        this.img = CrateElement({name: "img",src: "../images/"+this.data.user.img,style: this.styles.img,id: "ch_img"});
        this.name = CrateElement({name: "div",inerhtml: this.data.user.name,style: this.styles.name,id: "ch_name"});
        // this.durum = CrateElement({name: "div",style: this.styles.name+";font-size: 4px;"})
        this.input_text = CrateElement({name: "input",type: "text",style: this.styles.input_text,id: "ch_text"});
        this.input_ersal = CrateElement({name: "input",type: "button",value: "Send",style: this.styles.input_ersal,id: "ch_ersal"});
        this.Crate();

        //////////  styles
        function resize(element,paszamine) {
            element.style.top = (innerHeight-element.getBoundingClientRect().height-paszamine.getBoundingClientRect().y)+"px";
        }
        resize(this.paszamine_inputs,this.paszamine);
        window.addEventListener("resize",()=> {
            resize(this.paszamine_inputs,this.paszamine);
        })
        console.log(this.paszamine_inputs.getBoundingClientRect().height)
    }
    Chat_Room.prototype.Crate = function() {
        rabetkarbari.navar_abzar.paszamine_s.appendChild(this.paszamine);
        this.paszamine.appendChild(this.sar);
        this.paszamine.appendChild(this.paszamine_s);
        this.paszamine.appendChild(this.paszamine_inputs);
        this.sar.appendChild(this.img);
        this.sar.appendChild(this.name);
        this.paszamine_inputs.appendChild(this.input_text);
        this.paszamine_inputs.appendChild(this.input_ersal);
    }

    this.chat_room;


    this.Crate();
   
    ////// style
    function style(element,stylename,value) {
        element.style[stylename] = value;
    }
    style(this.navar_abzar.meno_span,"fontSize",(this.navar_abzar.sartitr.getBoundingClientRect().height/1.2)+"px");
    style(this.navar_abzar.appname,"fontSize",(this.navar_abzar.sartitr.getBoundingClientRect().height/1.6)+"px");
    style(this.navar_abzar.search_span,"fontSize",(this.navar_abzar.sartitr.getBoundingClientRect().height/1.2)+"px");
  
}
RabetKarbari.prototype.Crate = function() {
    body.appendChild(this.navar_abzar.paszamine)
    socket.emit("data_load","users")
}



if (user == null) {
    sigin = new Sigin({apendchild_element: body});
    
}else {
    dil = diller[user.dil];
    color = colors[user.color];
    rabetkarbari = new RabetKarbari();
   
}



export {colors,diller};




 