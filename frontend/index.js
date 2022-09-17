// tab views
function firstTabLinks() {
    var tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent')[0];
    tabcontent.style.display = "block";


    tablinks = document.getElementsByClassName("tablinks")[0];
    tablinks.className += " active";
    tablinks.style.display = "block";
}


firstTabLinks();

function opentablinks(evt,tab) {
    var tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');


    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";

        
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active"," ");

        
    }

    document.getElementById(tab).style.display = "block";
    
    evt.currentTarget.className += " active";

}


