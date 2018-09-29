
let rulerV = document.getElementById("dRulerV");
let rulerH = document.getElementById("dRulerH");

document.addEventListener("mousemove", (evt)=>{
    rulerV.style.backgroundPositionY = evt.clientY + "px";
    rulerH.style.backgroundPositionX = evt.clientX + "px";
});
