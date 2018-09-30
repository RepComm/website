
let content = document.getElementById("dContent");

let rulerV = document.getElementById("dRulerV");
let rulerH = document.getElementById("dRulerH");

let topMenu = document.getElementById("top_menu");

let bg = document.getElementById("dBackgroundImage");
let isDraggingScroll = false;
let draggingScrollLastY = 0;

let contextR = document.getElementById("context_ring");
contextR.style.visibility = "hidden";

document.addEventListener("mousemove", (evt)=>{
    rulerV.style.backgroundPositionY = evt.clientY + "px";
    rulerH.style.backgroundPositionX = evt.clientX + "px";
    contextR.style.visibility = "hidden";

    if (isDraggingScroll) {
        let delta = evt.clientY - draggingScrollLastY;
        scrollBy(0, -delta);
    }
    draggingScrollLastY = evt.clientY;
});

document.addEventListener("contextmenu", (evt)=>{
    evt.preventDefault();
    let b = contextR.getBoundingClientRect();
    contextR.style.left = evt.clientX - b.width/2 + "px";
    contextR.style.top = evt.clientY - b.height/2 + "px";
    contextR.style.visibility = "visible";
});

bg.addEventListener("mousedown", (evt)=>{
    if (evt.button === 1) {
        evt.preventDefault();
    }
    isDraggingScroll = true;
});

document.addEventListener("mouseup", (evt)=>{
    isDraggingScroll = false;
});

showdown.setFlavor("github");
let converter = new showdown.Converter();

let url = "https://www.jonathancrowder.com/res/php/content.php";

fetch(url).then((response)=>{
    response.json().then((json)=>{
        if (json.pages && json.pages.length > 0) {
            for (let i=0; i<json.pages.length; i++) {
                let page = json.pages[i];
                let html = converter.makeHtml(page.content);
                let div = document.createElement("div");
                //div.style["margin-left"] = "25px";
                div.innerHTML = html;
                div.className = "content_page";
                content.appendChild(div);

                if (page.name && page.name !== "") {
                    let menuItem = document.createElement("span");
                    menuItem.textContent = page.name;
                    menuItem.className = "top_menu_button";
                    menuItem.addEventListener("click", (evt)=>{
                        div.scrollIntoView();
                    });
                    topMenu.appendChild(menuItem);
                }
            }
        }
    });
});