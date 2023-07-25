 // Hide all panels
export default function HideAllPanels (){
    document.querySelectorAll("[data-popup]").forEach(popup => {
        popup.style.display = "none";
    })
    document.querySelector("[data-popups]").style.display = "none";
    document.querySelector("[data-fader]").style.display = "none";
}