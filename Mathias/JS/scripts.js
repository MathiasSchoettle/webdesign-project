 document.addEventListener("DOMContentLoaded", function() {

   //window.scrollTo(0,document.body.scrollHeight); // temporary 

   var children = document.getElementById('user-review-star-container').children
   var backup = [];

   for(let i = 0; i < children.length; i++){
     backup.push(children[i].innerText);
   }

   for (let i = 0; i < children.length; i++) {
     children[i].addEventListener('mouseover', function() {
       var check = false;
       for (let i = 0; i < children.length; i++) {
         if (!check) {
           if (children[i] != this) {
             children[i].innerText = 'star';
           } else {
             check = true;
             this.innerText = 'star';
           }
         } else {
           children[i].innerText = 'star_border';
         }
       }
     });

     children[i].addEventListener('mouseleave', function() {
       for(let i = 0; i < children.length; i++){
         children[i].innerText = backup[i];
       }
     });

     children[i].addEventListener('click', function() {
      for(let i = 0; i < children.length; i++){
        backup[i] = children[i].innerText;
      }
     });
   }
 });

 function openOrCloseMenu() {
   var dropdownMenu = document.getElementById('mainMenuDropDownItems');
   var icon = document.getElementById('menubtnico');

   if (dropdownMenu.style.visibility == 'hidden' || dropdownMenu.style.visibility == 0) {
     dropdownMenu.style.visibility = 'visible'
     dropdownMenu.style.height = "200px";
     icon.innerText = "close";
   } else {
     dropdownMenu.style.visibility = 'hidden';
     dropdownMenu.style.height = "0px";
     icon.innerText = "menu";
   }
 }
