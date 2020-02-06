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

function galleryScroll(isRight, id) {
   document.getElementById(id).style = "pointer-events: none"; // disable button

   let gallery = document.getElementById('gallery').querySelectorAll('.gallery-container');
   let classes = [];

   for(let i = 0; i < gallery.length; i++){
     classes.push(gallery[i].classList[1]); //store classes of images in order
   }

   isRight ? classes.unshift(classes.pop()) : classes.push(classes.shift()); // left or right shift classes

   for(let i = 0; i < gallery.length; i++){
     gallery[i].classList.remove(gallery[i].classList[1]);// replace classses with shifted ones
     gallery[i].classList.add(classes[i]);
   }

   setTimeout(() => {document.getElementById(id).style = "pointer-events: auto";}, 1000); // enable button after the transition has ended
}

function submitForm() {
  if(checkReviewText() & checkReviewName() & checkReviewScore()){
    document.getElementById('user-review-container').style.maxHeight = '0';
    document.getElementById('user-review-container').style.padding = '0';
  }
}

function checkReviewScore(){
  let score = document.getElementById('full-stars').offsetWidth;
  let star = document.getElementById('review-hover-container');

  if(score <= 0){
    star.style.color = '#ff4242';
    return false;
  } else {
    star.style.color = '#ededed';
    return true;
  }
}

function checkReviewName() {
  let name = document.getElementById('review-name');

  if(name.value.trim() == ''){
    name.style.borderColor = '#ff4242';
    return false;
  } else {
    name.style.borderColor = '#ededed';
    return true;
  }
}

function checkReviewText() {
  let text = document.getElementById('review-text');

  if(text.value.trim() == ''){
    text.style.borderColor = '#ff4242';
    return false;
  }
  else {
    text.style.borderColor = '#ededed';
    return true;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {

  var score = 0;

  var stars = document.getElementById('border-stars');
  stars.onmousemove = function(e) {
      var rect = document.getElementById('border-stars').getBoundingClientRect();
      var x = e.pageX - parseInt(rect.left);
      document.getElementById('full-stars').style.width = x + 'px';
  }

  stars.addEventListener('mouseleave', function() {
    document.getElementById('full-stars').style.transition = '0.6s';
    document.getElementById('full-stars').style.width = score + 'px';
  });

  stars.addEventListener('mouseenter', function() {
    document.getElementById('full-stars').style.transition = '0.1s';
  });

  stars.addEventListener('click', function() {
    score = document.getElementById('full-stars').offsetWidth;
  })
});
