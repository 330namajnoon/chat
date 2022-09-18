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




export {CrateElement,xy,colors};