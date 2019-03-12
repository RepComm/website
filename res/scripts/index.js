
let content = get("dContent");

let rulerV = get("dRulerV");
let rulerH = get("dRulerH");

let topMenu = get("top_menu");

let bg = get("dBackgroundImage");
let isDraggingScroll = false;
let draggingScrollLastY = 0;

let contextR = get("context_ring");
contextR.style.visibility = "hidden";

on(document, "mousemove", (evt)=>{
    rulerV.style.backgroundPositionY = evt.clientY + "px";
    rulerH.style.backgroundPositionX = evt.clientX + "px";
    contextR.style.visibility = "hidden";

    if (isDraggingScroll) {
        let delta = evt.clientY - draggingScrollLastY;
        scrollBy(0, -delta);
    }
    draggingScrollLastY = evt.clientY;
});

on(document, "contextmenu", (evt)=>{
    evt.preventDefault();
    let b = rect(contextR);
    contextR.style.left = evt.clientX - b.width/2 + "px";
    contextR.style.top = evt.clientY - b.height/2 + "px";
    contextR.style.visibility = "visible";
});

on(bg, "mousedown", (evt)=>{
    if (evt.button === 1) {
        evt.preventDefault();
    }
    isDraggingScroll = true;
});

on(document, "mouseup", (evt)=>{
    isDraggingScroll = false;
});

let scrollNearestPage = (evt)=>{
    let r = rect(content); //Get content element bounds
    //Get the content page percentage we're in, round it to nearest
    let mul = Math.round(
        content.scrollLeft / r.width
    );
    //Tell content to smooth scroll to nearest page offset
    content.scrollBy({
        top:0,
        left:-(content.scrollLeft - (mul * r.width)),
        behavior:"smooth"
    });
}

//Window resize adjust with timeout
let resizeTimeoutId;
on(window, "resize", ()=>{
    if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
    }
    resizeTimeoutId = setTimeout(()=>{
        scrollNearestPage();
        resizeTimeoutId = undefined;
    }, 250);
});

on(content, "touchend", scrollNearestPage);
on(content, "mouseup", scrollNearestPage);

on(document, "click", (evt)=>{
    //Open links in a new tab by default
    if (evt.target.nodeName === "A" || evt.target.parentNode.nodeName === "A") {
        evt.preventDefault();
        window.open( (evt.target.href||evt.target.parentNode.href), '_blank');
    }
});

showdown.setFlavor("github");
let converter = new showdown.Converter();

on(window, "resize", (evt)=>{
    let r = rect(content);
    let pgs = getByClass("content_page");
    for (let i=0; i<pgs.length; i++) {
        pgs[i].style.left = r.width * i + "px";
    }
});

let url = "res/data/pages.json";

fetch(url).then((response)=>{
    response.json().then((json)=>{
        if (json.pages && json.pages.length > 0) {
            for (let i=0; i<json.pages.length; i++) {
                let page = json.pages[i];
                let html;
                let r = rect(content);
                if (page.content) {
                    html = converter.makeHtml(page.content);
                    let div = make("div");
                    div.innerHTML = html;
                    div.className = "content_page";
                    div.style.left = r.width * i + "px";
                    content.appendChild(div);

                    if (page.name && page.name !== "") {
                        let menuItem = make("span");
                        menuItem.textContent = page.name;
                        menuItem.className = "top_menu_button";
                        on(menuItem, "click", (evt)=>{
                            div.scrollIntoView({
                                behavior:"smooth"
                            });
                        });
                        topMenu.appendChild(menuItem);
                    }
                } else if (page.contenturl) {
                    fetch(page.contenturl).then((response0)=>{
                        response0.text().then((text)=>{
                            html = converter.makeHtml(text);

                            let div = make("div");
                            div.innerHTML = html;
                            div.className = "content_page";
                            div.style.left = r.width * i + "px";
                            content.appendChild(div);

                            if (page.name && page.name !== "") {
                                let menuItem = make("span");
                                menuItem.textContent = page.name;
                                menuItem.className = "top_menu_button";
                                on(menuItem, "click", (evt)=>{
                                    div.scrollIntoView({
                                        behavior:"smooth"
                                    });
                                });
                                topMenu.appendChild(menuItem);
                            }
                            return;
                        });
                    });
                } else if (page.url) {
                    if (page.name && page.name !== "") {
                        let menuItem = make("span");
                        menuItem.textContent = page.name;
                        menuItem.className = "top_menu_button";
                        let atag = make("a");
                        atag.style.background = "none";
                        atag.href = page.url;
                        atag.appendChild(menuItem);
                        topMenu.appendChild(atag);
                    }
                }
            }
        }
    });
});