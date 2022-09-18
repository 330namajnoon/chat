///////  imports
import {CrateElement} from "./acharfaranse.js";
import {Sigin} from "./sigin.js";

/////// elements

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
socket.on("data_load",(database,data) => {
    if(database == "users" && data !== "" ) {
        datas[database+"_data"] = JSON.parse(data);
        rabetkarbari.navar_abzar.namayesh_profilha();
        console.log(datas)
    }

})

window.addEventListener("click",() => {
    rabetkarbari.navar_abzar.namayesh_profilha();
})



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
            paszamine_s: `float:left;background-color: ${color.c_4};width: 100% ;height: 94% ;`,
            dosyalar: `padding: 1% 0px 1% 0px ;color: ${color.c_3};position: absolute;background-color: ${color.c_2};width: 40% ;height: auto% ;font-size: 15px;top: 6%;margin: 0% 0px 0px 7% ;border-radius: 0px 0px 2vw 2vw ;float: left;display: block;`,
            spans: `color: ${color.c_4};font-size: 20px; float: left;font-size: 25px ;margin: 1% 0px 0px 2% ;`,
        }
        this.paszamine = CrateElement({name: "div",style: this.styles.paszamine});
        this.sartitr = CrateElement({name: "div",style: this.styles.sartitr});
        this.meno_span = CrateElement({name: "span",inerhtml: "menu",clas: "material-symbols-outlined",style: this.styles.spans});
        this.search_span = CrateElement({name: "span",inerhtml: "search",clas: "material-symbols-outlined",style: this.styles.spans+";float: right;margin-right: 2%"});
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
            this.chat_dosyasi.style.backgroundColor = color.c_1;
            this.profiller_dosyasi.style.backgroundColor = color.c_2;
            this.search_span.style.display = "block";
        })
        this.profiller_dosyasi.addEventListener("click", (e) => {
            this.chat_dosyasi.style.backgroundColor = color.c_2;
            this.profiller_dosyasi.style.backgroundColor = color.c_1;
            this.search_span.style.display = "none";
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
    
        window.addEventListener("resize",() => {
            resize(this.paszamine);
        })
      
    }
    NavarAbzar.prototype.namayesh_profilha = function() {
        
        let id;
        let shomar = 0;
        while(shomar < 1) {
            let durum = true;
            let number = Math.floor(Math.random()*datas.users_data.length);
            
            let id_ = datas.users_data[number].id;
            datas.secilenler.forEach(e => {
                if(e.id !== id_) {
                    durum = false;
                }
            })
            if(durum == false ||  datas.secilenler.length < 1) {
                shomar++;
                id = number;
            }
        }

        function Profil(user_data) {
            this.data = user_data;
            console.log(this.data)
            this.styles = {
                paszamine: `position: absolute;width: 100%; height: 100%`,
                img: `width: 100%; height: 100%;object-fit: cover`,
                spans: ``
            }
            this.paszamine = CrateElement({name: "div",id: "paszamine",style: this.styles.paszamine});
            this.img = CrateElement({name: "img",src: "../images/"+this.data.img,id: "img",style: this.styles.img});
            
            //////  apendchild

        }
        Profil.prototype.Crate = function(element) {
            element.innerHTML = "";
            element.appendChild(this.paszamine);
            this.paszamine.appendChild(this.img);
            console.log(this.paszamine_s);
        }
        let profil = new Profil(datas.users_data[id]);
        profil.Crate(this.paszamine_s);
    }
    this.navar_abzar = new NavarAbzar();


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

const user = JSON.parse(localStorage.getItem("chat_user"));

if (user == null) {
    sigin = new Sigin({apendchild_element: body});
    
}else {
    dil = diller[user.dil];
    color = colors[user.color];
    rabetkarbari = new RabetKarbari();
   
}



export {colors,diller};




 