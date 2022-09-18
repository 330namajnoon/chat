
function CrateElement(name = "", inerhtml = "", id = "", clas = "", type = "") {
   let element = document.createElement(name);
   if (inerhtml !== "") {
       element.innerHTML = inerhtml;
   }
   if (id !== "") {
       element.id = id;
   }
   if (clas !== "") {
       element.className = clas;
   }
   if (type !== "") {
       element.type = type;
   }
   return element;
}

let body = document.querySelector("body");
let head = document.querySelector("head");

let edit_element = "";
let id;
function SelectElement() {
   this.locations = {
      paszamine: {
         x: 100,
         y: 0,
         w: 80,
         h: 30,
      }
   }
   this.styles = {
      paszamine: `position: absolute;width: ${this.locations.paszamine.w}px;height: auto;left: ${innerWidth-this.locations.paszamine.w}px;top: ${this.locations.paszamine.y}px;background-color: rgb(0, 0, 0);border: solid 1.5px gray;text-align: center;padding-bottom: 1px;z-index: 1`,
      inputs: "width: 44%;height: 70%;border: 0;margin-top: 1%;margin-left: 2.5%;background-color: gray;color: black;font-size: .5px;float: left;",
   }
   this.paszamine = document.createElement("div");
   this.paszamine.style.cssText = this.styles.paszamine;

   this.text = document.createElement("input");
   this.text.type = "text";
   this.text.style.cssText = this.styles.inputs;

   this.button = document.createElement("input");
   this.button.type = "button";
   this.button.value = "Ara";
   this.button.style.cssText = this.styles.inputs
   this.Crate();

   this.button.addEventListener("click", () => {
      let element = document.querySelector(this.text.value);
      if(edit_element !== "") {
        
         edit_element.paszamine.remove();
      }
   
      if(element !== null)edit_element = new EditElement(this.text.value);
   })

}
SelectElement.prototype.Crate = function() {
   head.innerHTML += "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' /><link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0' /><style>.material-symbols-rounded {font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 48}</style>";
   body.appendChild(this.paszamine);
   this.paszamine.appendChild(this.text);
   this.paszamine.appendChild(this.button);
}
let select_element = new SelectElement();
function EditElement(id_ = "") {
   id = id_;
   this.id = id_;
   this.element = document.querySelector(this.id);
   this.element_gb = this.element.getBoundingClientRect();
   this.element_style = this.element.style.cssText;
   this.styles = {
      paszamine: "width: 100%;height: 20vw;overflow-y: auto",
      w: `position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${(this.element_gb.x+this.element_gb.width)}px;top: ${(this.element_gb.y+this.element_gb.height/2)-10}px;`,
      h: `transform: rotate(90deg);position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${((this.element_gb.x+this.element_gb.width/2)-10)}px;top: ${(this.element_gb.y+this.element_gb.height)}px;`,
      
   }
   // /////// location 
   // this.l_durum = {
   //    w: false,
   //    h: false,
   //    m: false,
   // }
   // this.org = {
   //    x: null,
   //    y: null
   // }
   // this.element.addEventListener("mousedown" , (e) => {
   //    if(id == this.id){ 
   //       this.l_durum.m = true;
   //       let location = this.element.getBoundingClientRect();
   //       this.org.x = e.pageX-location.left;
   //       this.org.y = e.pageY-location.top;
         
   //    }
   // })
   // this.element.addEventListener("mouseup" , (e) => {
   //    this.l_durum.m = false;
   //    this.style_cssText();
   // })
   //    //////  w
   //    this.w = CrateElement("span","arrow_forward_ios","","material-symbols-rounded");
   //    this.w.style.cssText = this.styles.w;
   //    this.w.addEventListener("mousedown" , (e) => {
   //       this.l_durum.w = true;
   //    })
   //    this.w.addEventListener("mouseup" , (e) => {
   //       this.l_durum.w = false;
   //       this.style_cssText();
   //    })
   
   //    //////  h
   //    this.h = CrateElement("span","arrow_forward_ios","","material-symbols-rounded");
   //    this.h.style.cssText = this.styles.h;
   //    this.h.addEventListener("mousedown" , (e) => {
   //       this.l_durum.h = true;
      
         
   //    })
   //    this.h.addEventListener("mouseup" , (e) => {
   //       this.l_durum.h = false;
   //       this.style_cssText();
         
   //    }) 

////////// styles 
   this.paszamine = CrateElement("div");
   this.paszamine.style.cssText = this.styles.paszamine;
   this.style_text = CrateElement("div");
   this.style_text.style.cssText = this.styles.paszamine+";height: auto; font-size: 1px;color: aliceblue;";
   function Style_1(data = {name: "",values: []}) {
      this.data = data;
      this.name = data.name;
      this.value;
      this.styles = {
         paszamine: "margin-left: 3%;float: left;margin-top:2px;width: 94%;height: auto;background-color: gray;text-align: center;padding-bottom: 1px",
         kerkere_div: "width: 100%;height: auto;background-color: rgb(90, 87, 87);float: left;margin: 0",
         kerkere_span: "font-size: 2px;color: aliceblue;margin: 0px;padding: 0;float: left;",
         buttons: "border:0;margin-top: 1px;float: left;width: 100%;height: auto;font-size: 2px;background-color: rgb(98, 94, 94);color: black;",
      }
      this.paszamine = CrateElement("div");
      this.paszamine.style.cssText = this.styles.paszamine;

      this.kerkere_div = CrateElement("div");
      this.kerkere_div.style.cssText = this.styles.kerkere_div;

      this.K_s_durum = {
         durum: "chevron_right",
         d1: "chevron_right",
         d2: "expand_more"
      }
      this.kerkere_span = CrateElement("span","chevron_right","","material-symbols-rounded");
      this.kerkere_span.style.cssText = this.styles.kerkere_span;

      this.kerkere_span2 = CrateElement("span","expand_more","","material-symbols-rounded");
      this.kerkere_span2.style.cssText = this.styles.kerkere_span;
      this.kerkere_span2.style.display = "none";

      this.name_h1 = CrateElement("h1",this.name);
      this.name_h1.style.cssText = this.styles.kerkere_span+";margin-left: 5px;font-size: 1px";

      this.paszamine_s = CrateElement("div");
      this.paszamine_s.style.cssText = this.styles.paszamine+";display: none";

      this.values = [];
      this.data.values.forEach(e => {
         let element = CrateElement("input","","","","button");
         element.value = e;
         element.style.cssText = this.styles.buttons;
         element.addEventListener("click",(e) => {
            this.value = e.composedPath()[0].value;
            
            this.values.forEach(e => {
               e.style.backgroundColor = "rgb(98, 94, 94)";
            })
            e.composedPath()[0].style.backgroundColor = "rgb(176, 176, 176)";
            edit_element.style_cssText()
         })
         this.values.push(element);
      })
      this.kerkere_div.addEventListener("click" , (e) => {
         e.stopPropagation();
         if(this.K_s_durum.durum == this.K_s_durum.d1) {
            this.K_s_durum.durum = this.K_s_durum.d2;
            this.kerkere_span.style.display = "none";
            this.kerkere_span2.style.display = "block";
            this.paszamine_s.style.display = "block";
         }else {
            this.K_s_durum.durum = this.K_s_durum.d1;
            this.kerkere_span2.style.display = "none";
            this.kerkere_span.style.display = "block";
            this.paszamine_s.style.display = "none";
         }
         this.kerkere_span.innerHTML = this.K_s_durum.durum;
      })

      this.Crate();
   }  
   Style_1.prototype.Crate = function() {
      this.paszamine.appendChild(this.kerkere_div);
      this.kerkere_div.appendChild(this.kerkere_span);
      this.kerkere_div.appendChild(this.kerkere_span2);
      this.kerkere_div.appendChild(this.name_h1);
      this.paszamine.appendChild(this.paszamine_s);
      this.values.forEach(e => {
         this.paszamine_s.appendChild(e);
      })
   } 


   function Style_2(data = {name: "",values: [],color: "false"}) {
      this.data = data;
      this.name = this.data.name;
      this.alamat = "px";
      this.value_ = {};
      this.data_values_lenghth = Object.keys(this.data.values);
      this.data_values_lenghth.forEach(e => {
         this.value_[this.data.values[Number(e)]] = 0+this.alamat;
      })
      function value_Set(value_,color) {
         
         let lenghth = Object.keys(value_);
         let value = "";
         lenghth.forEach(e => {
           
            value += value_[e]+" ";
         })
         if(color == true) value = "solid " + value;
         return value;
      }
      this.value;
    
      this.styles = {
         paszamine: "margin-left: 3%;float: left;margin-top:2px;width: 94%;height: auto;background-color: gray;text-align: center;padding-bottom: 1px",
         kerkere_div: "width: 100%;height: auto;background-color: rgb(90, 87, 87);float: left;margin: 0",
         kerkere_span: "font-size: 2px;color: aliceblue;margin: 0px;padding: 0;float: left;",
         buttons: "border:0;margin-top: 1px;float: left;width: 30%;height: auto;font-size: 2px;background-color: rgb(98, 94, 94);color: black;margin-left: 2%",
         color: "display: none;padding: 0px;border: solid 0px 0 0 0; width: 40%; height: 10px;margin-left: 5%;float: right",
      }
      this.paszamine = CrateElement("div");
      this.paszamine.style.cssText = this.styles.paszamine;

      this.color_paszamine = CrateElement("div");
      this.color_paszamine.style.cssText = this.styles.paszamine;
      this.color_h1 = CrateElement("h1","color");
      this.color_h1.style.cssText = this.styles.kerkere_span;
      this.color = CrateElement("input","","","","color");
      this.color.style.cssText = this.styles.color;
      this.color_div = CrateElement("div",this.color.value);
      this.color_div.style.cssText = this.styles.buttons+";width: auto;margin-left: 5%;float: right;padding: 1px 1px 1px 1px;color: aliceblue";
      this.color_div.style.backgroundColor = this.color.value;
      this.color_div.addEventListener("click",(e) => {
         e.stopPropagation();
         this.color.click();
      })
      this.color.addEventListener("input",() => {
         this.color_div.style.backgroundColor = this.color.value;
         this.value = value_Set(this.value_,this.data.color)+" "+this.color.value;
         edit_element.style_cssText();
        
      })

      this.kerkere_div = CrateElement("div");
      this.kerkere_div.style.cssText = this.styles.kerkere_div;

      this.K_s_durum = {
         durum: "chevron_right",
         d1: "chevron_right",
         d2: "expand_more"
      }
      this.kerkere_span = CrateElement("span","chevron_right","","material-symbols-rounded");
      this.kerkere_span.style.cssText = this.styles.kerkere_span;

      this.kerkere_span2 = CrateElement("span","expand_more","","material-symbols-rounded");
      this.kerkere_span2.style.cssText = this.styles.kerkere_span;
      this.kerkere_span2.style.display = "none";

      this.name_h1 = CrateElement("h1",this.name);
      this.name_h1.style.cssText = this.styles.kerkere_span+";margin-left: 5px;font-size: 1px";

      this.paszamine_s = CrateElement("div");
      this.paszamine_s.style.cssText = this.styles.paszamine+";display: none";
      
      this.alamatha = ["px","vw","%"];
      this.alamat_values = [];
      this.alamatha.forEach(e => {
         let element = CrateElement("input","","","","button");
         element.value = e;
         element.style.cssText = this.styles.buttons;
         element.addEventListener("click",(e) => {
            this.alamat = e.composedPath()[0].value;
            
            this.alamat_values.forEach(e => {
               e.style.backgroundColor = "rgb(98, 94, 94)";
            })
            e.composedPath()[0].style.backgroundColor = "rgb(176, 176, 176)";
            edit_element.style_cssText()
         })
         this.alamat_values.push(element);
      })

      this.values = [];
      this.data.values.forEach(e => {
         let paszamine = CrateElement("div");
         paszamine.style.cssText = this.styles.paszamine;
         let name = CrateElement("h1",e);
         name.style.cssText = this.styles.kerkere_span;
         let text = CrateElement("input","","","","text");
         text.style.cssText = this.styles.buttons+";width: 40%;margin-left: 5%;float: right";
         text.setAttribute("name",e);

         paszamine.appendChild(name)
         paszamine.appendChild(text)
         text.addEventListener("input",(e) => {
            let name = e.composedPath()[0].name;
            let value = e.composedPath()[0].value;
            let alamat = this.alamat;
            this.value_[name] = value+alamat;
            this.value = value_Set(this.value_,this.data.color);
            edit_element.style_cssText();
           
         })
         this.values.push(paszamine);
      })



      this.kerkere_div.addEventListener("click" , (e) => {
         e.stopPropagation();
         if(this.K_s_durum.durum == this.K_s_durum.d1) {
            this.K_s_durum.durum = this.K_s_durum.d2;
            this.kerkere_span.style.display = "none";
            this.kerkere_span2.style.display = "block";
            this.paszamine_s.style.display = "block";
         }else {
            this.K_s_durum.durum = this.K_s_durum.d1;
            this.kerkere_span2.style.display = "none";
            this.kerkere_span.style.display = "block";
            this.paszamine_s.style.display = "none";
         }
         this.kerkere_span.innerHTML = this.K_s_durum.durum;
      })

      this.Crate();
   }  
   Style_2.prototype.Crate = function() {
      this.paszamine.appendChild(this.kerkere_div);
      this.kerkere_div.appendChild(this.kerkere_span);
      this.kerkere_div.appendChild(this.kerkere_span2);
      this.kerkere_div.appendChild(this.name_h1);
      this.paszamine.appendChild(this.paszamine_s);
      this.alamat_values.forEach(e => {
         this.paszamine_s.appendChild(e);
      })
      this.values.forEach(e => {
         this.paszamine_s.appendChild(e);
      })
      if(this.data.color == true) {
        
         this.color_paszamine.appendChild(this.color_h1);
         this.color_paszamine.appendChild(this.color);
         this.color_paszamine.appendChild(this.color_div);
         this.paszamine_s.appendChild(this.color_paszamine);
      }
   } 

   function Style_3(data = {name: ""}) {
      this.data = data;
      this.name = this.data.name;
      this.value;
    
      this.styles = {
         paszamine: "margin-left: 3%;float: left;margin-top:2px;width: 94%;height: auto;background-color: gray;text-align: center;padding-bottom: 1px",
         kerkere_div: "width: 100%;height: auto;background-color: rgb(90, 87, 87);float: left;margin: 0",
         kerkere_span: "font-size: 2px;color: aliceblue;margin: 0px;padding: 0;float: left;",
         buttons: "border:0;margin-top: 1px;float: left;width: 30%;height: auto;font-size: 2px;background-color: rgb(98, 94, 94);color: black;margin-left: 2%",
         color: "display: none;padding: 0px;border: solid 0px 0 0 0; width: 40%; height: 10px;margin-left: 5%;float: right",
      }
      this.paszamine = CrateElement("div");
      this.paszamine.style.cssText = this.styles.paszamine;

      this.color_paszamine = CrateElement("div");
      this.color_paszamine.style.cssText = this.styles.paszamine;
      this.color_h1 = CrateElement("h1","color");
      this.color_h1.style.cssText = this.styles.kerkere_span;
      this.color = CrateElement("input","","","","color");
      this.color.style.cssText = this.styles.color;
      this.color_div = CrateElement("div",this.color.value);
      this.color_div.style.cssText = this.styles.buttons+";width: auto;margin-left: 5%;float: right;padding: 1px 1px 1px 1px;color: aliceblue";
      this.color_div.style.backgroundColor = this.color.value;
      this.color_div.addEventListener("click",(e) => {
         e.stopPropagation();
         this.color.click();
      })
      this.color.addEventListener("input",() => {
         this.color_div.style.backgroundColor = this.color.value;
         this.value = this.color.value;
         edit_element.style_cssText();
      })

      this.kerkere_div = CrateElement("div");
      this.kerkere_div.style.cssText = this.styles.kerkere_div;

      this.K_s_durum = {
         durum: "chevron_right",
         d1: "chevron_right",
         d2: "expand_more"
      }
      this.kerkere_span = CrateElement("span","chevron_right","","material-symbols-rounded");
      this.kerkere_span.style.cssText = this.styles.kerkere_span;

      this.kerkere_span2 = CrateElement("span","expand_more","","material-symbols-rounded");
      this.kerkere_span2.style.cssText = this.styles.kerkere_span;
      this.kerkere_span2.style.display = "none";

      this.name_h1 = CrateElement("h1",this.name);
      this.name_h1.style.cssText = this.styles.kerkere_span+";margin-left: 5px;font-size: 1px";

      this.paszamine_s = CrateElement("div");
      this.paszamine_s.style.cssText = this.styles.paszamine+";display: none";
      
      this.kerkere_div.addEventListener("click" , (e) => {
         e.stopPropagation();
         if(this.K_s_durum.durum == this.K_s_durum.d1) {
            this.K_s_durum.durum = this.K_s_durum.d2;
            this.kerkere_span.style.display = "none";
            this.kerkere_span2.style.display = "block";
            this.paszamine_s.style.display = "block";
         }else {
            this.K_s_durum.durum = this.K_s_durum.d1;
            this.kerkere_span2.style.display = "none";
            this.kerkere_span.style.display = "block";
            this.paszamine_s.style.display = "none";
         }
         this.kerkere_span.innerHTML = this.K_s_durum.durum;
      })

      this.Crate();
   }  
   Style_3.prototype.Crate = function() {
      this.paszamine.appendChild(this.kerkere_div);
      this.kerkere_div.appendChild(this.kerkere_span);
      this.kerkere_div.appendChild(this.kerkere_span2);
      this.kerkere_div.appendChild(this.name_h1);
      this.paszamine.appendChild(this.paszamine_s);
     
      
        
         this.color_paszamine.appendChild(this.color_h1);
         this.color_paszamine.appendChild(this.color);
         this.color_paszamine.appendChild(this.color_div);
         this.paszamine_s.appendChild(this.color_paszamine);
   
   } 
   this.navar_style = [new Style_1({name: "position",values: ["relative","absolute","fixed","static"]}),
   new Style_3({name: "color"}),
   new Style_3({name: "background-color"}),
   new Style_2({name: "width",values:["value"]}),
   new Style_2({name: "height",values:["value"]}),
   new Style_2({name: "left",values:["value"]}),
   new Style_2({name: "top",values:["value"]}),
   new Style_2({name: "font-size",values:["value"]}),
   new Style_2({name: "margin",values: ["top","right","bottom","left"]}),
   new Style_2({name: "border-radius",values: ["top","right","bottom","left"]}),
   new Style_2({name: "border",values: ["value"],color: true}),
   new Style_2({name: "padding",values:["top","right","bottom","left"]}),
   new Style_1({name: "float",values: ["left","right","none"]}),
   new Style_1({name: "text-align",values: [ "center","left","right"]}),
   new Style_1({name: "display",values: ["block","flex","grid","none"]}),
   new Style_1({name: "overflow-y",values: ["auto","scroll","hidden"]}),
   new Style_1({name: "overflow-x",values: ["auto","scroll","hidden"]}),
   new Style_1({name: "object-fit",values: ["cover","contain","fill","none"]}),
   
   ];
   



   this.Crate();



}
EditElement.prototype.Crate = function() {
   // body.appendChild(this.w);
   // body.appendChild(this.h);
   
   select_element.paszamine.appendChild(this.paszamine);
   this.navar_style.forEach(e => {
      this.paszamine.appendChild(e.paszamine);
   })
   this.paszamine.appendChild(this.style_text);

}

// EditElement.prototype.muve = function(e) {
//    if(this.l_durum.w == true) {
//       let location = this.element.getBoundingClientRect()
//       this.element.style.width = (e.pageX - location.x) +"px";
//       this.w.style.cssText = `position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${(location.x+location.width)}px;top: ${(location.y+location.height/2)-10}px;`;
//       this.h.style.cssText = `transform: rotate(90deg);position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${((location.x+location.width/2)-10)}px;top: ${(location.y+location.height)}px;`;
     
//    }
//    if(this.l_durum.h == true) {
//       let location = this.element.getBoundingClientRect()
//       this.element.style.height = (e.pageY - location.y) +"px";
//       this.w.style.cssText = `position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${(location.x+location.width)}px;top: ${(location.y+location.height/2)-10}px;`;
//       this.h.style.cssText = `transform: rotate(90deg);position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${((location.x+location.width/2)-10)}px;top: ${(location.y+location.height)}px;`;
     
//    }
//    if(this.l_durum.m == true) {
//       let location_1 = e.composedPath()[1].getBoundingClientRect();
//       let location = this.element.getBoundingClientRect();
//       this.element.style.left = ((e.pageX - this.org.x)-location_1.x || 0) +"px";
//       this.element.style.top = ((e.pageY - this.org.y)-location_1.y || 0) +"px";
//       this.w.style.cssText = `position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${(location.x+location.width)}px;top: ${(location.y+location.height/2)-10}px;`;
//       this.h.style.cssText = `transform: rotate(90deg);position: absolute;font-size: 20px;color: rgb(133, 137, 140);left: ${((location.x+location.width/2)-10)}px;top: ${(location.y+location.height)}px;`;
   
//    }
// }




EditElement.prototype.style_cssText = function() {
   let csstext ="";
   // csstext += `width: ${this.element.style.width};`;
   // csstext += `height: ${this.element.style.height};`;
   // csstext += `left: ${this.element.style.left};`;
   // csstext += `top: ${this.element.style.top};`;
   this.navar_style.forEach(e => {
      if(e.value !== undefined ) {
        
         csstext += e.name+": "+e.value+";";
      }
      
   })
   this.style_text.innerHTML = this.element_style+";"+csstext;
   document.querySelectorAll(this.id).forEach(e => {
      e.style.cssText = this.element_style+";"+csstext;
   })
   this.element.style.cssText = this.element_style+";"+csstext;
  
   
  
}









// window.addEventListener("mousemove",(e) => {
//    e.stopPropagation();
//    if(edit_element !== "") edit_element.muve(e);
// })  


// window.addEventListener("load",()=> {
//    if(edit_element !== "") {
//    edit_element.w.remove();
//    edit_element.h.remove();
// }
// edit_element = new EditElement("sina");
// })


