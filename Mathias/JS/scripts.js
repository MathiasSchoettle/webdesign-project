 document.addEventListener("DOMContentLoaded", function() {

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

 function openTrailerPlayer() {
   document.getElementById('trailer-overlay').style.display = 'block';
   document.getElementById('trailer-video').play();
 }

 function closeTrailerPlayer() {
   document.getElementById('trailer-overlay').style.display = 'none';
   document.getElementById('trailer-video').pause();
   document.getElementById('trailer-video').currentTime = 0;
 }

 function galleryScrollRight() {

   document.getElementById('scrollRight').style = "pointer-events: none";

   let gallery = document.getElementById('gallery').querySelectorAll('.gallery-container');
   let classes = [];

   for(let i = 0; i < gallery.length; i++){
     classes.push(gallery[i].classList[1]);
   }

   classes.unshift(classes.pop());

   for(let i = 0; i < gallery.length; i++){
     gallery[i].classList.remove(gallery[i].classList[1]);
     gallery[i].classList.add(classes[i]);
   }

   setTimeout(() => {document.getElementById('scrollRight').style = "pointer-events: auto";}, 1000);
 }

 function galleryScrollLeft() {

   document.getElementById('scrollLeft').style = "pointer-events: none";

   let gallery = document.getElementById('gallery').querySelectorAll('.gallery-container');
   let classes = [];

   for(let i = 0; i < gallery.length; i++){
     classes.push(gallery[i].classList[1]);
   }

   classes.push(classes.shift());

   for(let i = 0; i < gallery.length; i++){
     gallery[i].classList.remove(gallery[i].classList[1]);
     gallery[i].classList.add(classes[i]);
   }

   setTimeout(() => {document.getElementById('scrollLeft').style = "pointer-events: auto";}, 1000);
 }
