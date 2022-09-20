
///////  imports 
const socket = io();
import {CrateElement,xy,colors} from "./acharfaranse.js";

console.log("sila")
//////   load datas
socket.on("user_add",(data) => {
    localStorage.setItem("chat_user",JSON.stringify(data));
    document.querySelector("form").submit();
})
//////  sigin
let colors_ = colors;


function Sigin(data = {apendchild_element: null}) {
    this.data = data;
    this.styles = {
        paszamine: "float: left;background-color: "+colors_.c_4+";width: 100% ;height: 100% ;",
        paszamine_s: "text-align: center;position: absolute; background-color: "+colors_.c_4+"; width: 70%; height: 80%; margin: 10% 0px 0px 15%;;position: absolute;left: 15% ;top: 10% ;margin: 0% 0px 0px 0% ;",
        img_div: "margin: 0% 0px 0px 23% ;height: 262.626px;;background-color: "+colors_.c_4+";width: 50% ;border-radius: 100vw 100vw 100vw 100vw ;border: solid .3vw "+colors_.c_2+";overflow-y: hidden;overflow-x: hidden;",
        img: "width: 101%;;height: 100% ;object-fit: cover;",
        input_text: ";color: "+colors_.c_1+";background-color: "+colors_.c_3+";width: 50% ;height: 5% ;margin: 7% 0px 0px 0% ;border-radius: 5px 5px 5px 5px ;border: solid 1px "+colors_.c_2+";padding: 3px 3px 3px 3px ;text-align: center;",
        input_save: ";color: "+colors_.c_3+";background-color: "+colors_.c_1+";width: 50% ;height: 8% ;margin: 10% 0px 0px 0% ;border-radius: 5px 5px 5px 5px ;border: solid 1px "+colors_.c_2+";padding: 3px 3px 3px 3px ;text-align: center;",
    }
    this.form = CrateElement({name: "form"});
    this.paszamine = CrateElement({name: "div",style: this.styles.paszamine});
    this.paszamine_s = CrateElement({name: "div",style: this.styles.paszamine_s});
    this.img_paszamine = CrateElement({name: "div",style: this.styles.img_div});
    this.img = CrateElement({name: "img",style: this.styles.img,src: "../images/profil.png"});
    this.name_text = CrateElement({name: "input",type: "text",attributes: [{name: "placeholder",value: "User Name.."}],style: this.styles.input_text});
    this.sifre_text = CrateElement({name: "input",type: "password",attributes: [{name: "placeholder",value: "Password.."}],style: this.styles.input_text});
    this.tekrarsifre_text = CrateElement({name: "input",type: "password",attributes: [{name: "placeholder",value: "Repeat Password.."}],style: this.styles.input_text});
    this.save = CrateElement({name: "input",value: "SIGIN",type: "button",style: this.styles.input_save});
    this.file = CrateElement({name: "input",type: "file",style: "display: none"});
    this.Crate();

    function resize(paszamine_s,img_paszamine) {
        if (innerWidth < innerHeight) {
            paszamine_s.style.cssText = "text-align: center;position: absolute; background-color: "+colors_.c_4+"; width: 70%; height: 80%; margin: 10% 0px 0px 15%;;position: absolute;left: 15% ;top: 10% ;margin: 0% 0px 0px 0% ;"
          
        }else {
            paszamine_s.style.marginLeft = (innerWidth/5)+"px";
            paszamine_s.style.width = (innerWidth/3)+"px";
        }

        img_paszamine.style.height = img_paszamine.getBoundingClientRect().width+"px";

    }
    resize(this.paszamine_s,this.img_paszamine);

    // window.addEventListener("resize",() => {
    //     resize(this.paszamine_s,this.img_paszamine);
    // })

    this.img.addEventListener("click",() => {
        this.file.click();
    })
    this.file.addEventListener("change",() => {
        let filereder = new FileReader();
        filereder.addEventListener("load" , () => {
            this.img.src = filereder.result;
        })
        filereder.readAsDataURL(this.file.files[0]);
        
    })
    this.save.addEventListener("click",(e) => {
        e.stopPropagation();
        if(this.name_text.value !== "" && this.file.files.length > 0 && this.sifre_text.value == this.tekrarsifre_text.value) {
            let data = {
                name: this.name_text.value,
                img: this.file.files[0].name,
                sifre: this.sifre_text.value
            }
            let formdata = new FormData();
            formdata.append("images",this.file.files[0]);
            let http = new XMLHttpRequest();
            http.open("POST","/upload_image",true);
            http.send(formdata);
            socket.emit("user_add",data);
    
        }
    })
}
Sigin.prototype.Crate = function() {
    this.data.apendchild_element.appendChild(this.paszamine);
    this.paszamine.appendChild(this.paszamine_s);
    this.paszamine_s.appendChild(this.img_paszamine);
    this.img_paszamine.appendChild(this.img);
    this.paszamine_s.appendChild(this.name_text);
    this.paszamine_s.appendChild(this.sifre_text);
    this.paszamine_s.appendChild(this.tekrarsifre_text);
    this.paszamine_s.appendChild(this.save);
    this.paszamine_s.appendChild(this.file);
}

export {Sigin};