const xy = innerWidth/innerHeight;
let colors = {
    c_1: "#F79489",
    c_2: "#F8AFA6",
    c_3: "#FADCD9",
    c_4: "#F9F1F0"
}
function CrateElement(data = {name: "div",inerhtml: "",id: "",clas: "",type: "",attributes: [{name: "",value: ""}],style: "",value: "",src: ""}) {
    let element = document.createElement(data.name);
    if(data.inerhtml !== undefined) element.innerHTML = data.inerhtml;
    if(data.id !== undefined) element.id = data.id;
    if(data.clas !== undefined) element.className = data.clas;
    if(data.type !== undefined) element.type = data.type;
    if(data.value !== undefined) element.value = data.value;
    if(data.src !== undefined) element.src = data.src;
    if(data.attributes !== undefined)data.attributes.forEach(e => {
        if(e.name !== "") {
            element.setAttribute(e.name,e.value);
        }
    })
    if(data.style !== undefined) element.style.cssText = data.style;
    return element;
}

function SearchObject(data = {element: "araye",method: "id-name...",value: "number-string"}) {
    let element = data.element;
    let method = data.method;
    let value = data.value;
    let bulunan = undefined;
    element.forEach(e => {
        if(e[method] == value) {
            bulunan = e;
        }
    })
    return bulunan;
}

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







export {CrateElement,SearchObject,ChengeObject,xy,colors};