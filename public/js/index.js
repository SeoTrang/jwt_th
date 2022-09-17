// tab views
try {
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
} catch (error) {
    console.log(error);
}

// button logout
function logout() {
    // let buttonLogout = document.querySelector('#header .user-action .logout');
    // // console.log(buttonLogout);
    // alert('phien dang nhap cua ban da het hang');
    // var txt;
    // if()
    var txt;
  if (confirm("Bạn chắc chắn muốn đăng xuất!")) {
    // location.reload();

    window.location = 'http://localhost:3000/logout';
  } else {
    
  }
}


// ajax get admin info
function getAdmin() {
    console.log("da bam vao button")
    const xhttp = new XMLHttpRequest();
    let tam = document.getElementById('tam');
    
    xhttp.open("GET","http://localhost:3000/getadmin");

    xhttp.onreadystatechange =async function(){

        if(this.readyState == 4 && this.status == 200){
            console.log(this.getAllResponseHeaders);
            tam.innerHTML = await this.response;
        }else{
            
        }
        
    }
    xhttp.send()
}


// block - hiden item menu drop down user

async function block_hiden_item_menu_user(){
    let menu_users = document.querySelectorAll('.my-user .user .avatar img');
    let action = document.querySelectorAll('.my-user .user .action');
    let menu = document.querySelectorAll('.my-user .user .action img');
    let user = document.querySelectorAll('.my-user .user');
    // console.log(user);
    
    // let drop_down_content = document.querySelectorAll
    let drop_down_content = document.createElement('div');
    drop_down_content.className = "drop-down-content";
    // console.log(drop_down_content);
    let content = `
                        <div class="following item-menu">
                            <i class="fa-solid fa-user-plus"></i>
                            <span>Theo dõi</span>
                        </div>
                        <div class="block item-menu">
                            <i class="fa-solid fa-thumbtack"></i>
                            <span>Chặn</span>
                        </div>

                        <div class="chat item-menu">
                            <i class="fa-solid fa-comment"></i>
                            <span>Nhắn tin</span>
                        </div>
                    `;

    let post_form = `<form action="" method="">
                        <button class="submit-user-menu-dropdown">submit</button>
                    </form>`;
    // console.log(menu_users);
    drop_down_content.innerHTML = content;

    for (let index = 0; index < menu.length; index+=1) {
        let count = 0;
        menu[index].addEventListener('click',function(){
 
            count+=1;
            if(count%2==0){
                drop_down_content.className += " hiden";
            }else {
                drop_down_content.className = "drop-down-content"
            }
            // console.log(menu_users[index]);
            // action
  
            action[index].appendChild(drop_down_content);


            // item menu dropdown
            let item_menu = document.querySelectorAll('.my-user .user .action .item-menu');

            for (let index2 = 0; index2 < item_menu.length; index2++) {
                item_menu[index2].addEventListener('click',async function(){
                    let user_id = user[index];
                    // console.log(user[index]);
                    let data = await user_id.getAttribute("data-userid");
                    // console.log(data);
                    alert(data);
                    // let container_form = document.createElement('div');
                    // container_form.className = "container-form";
                    // container_form.innerHTML = post_form;

                    // action[index].appendChild(container_form);



                })
                
            }

        })

        
    }


}
block_hiden_item_menu_user();


// 

// set time accetoken
function calculation_accetoken(){
    // while(true){

    // }
    const time = new Date();
    console.log("tam")
    console.log(time.getSeconds());
}
