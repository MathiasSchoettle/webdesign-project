document.addEventListener("DOMContentLoaded", function(event) { // add event listeners when all elements have been loaded to avoid NPEs

  var score = 0; // user review score variable
  var db = firebase.firestore(); // init the db
  var reviews = []; // the reviews stored as objects

  db.collection("reviewSection").get().then(function(querySnapshot) { // get review list from database
    querySnapshot.forEach(function(doc) {
      var name = doc.data().name;
      var cite = doc.data().text;
      var stars = doc.data().stars;
      reviews.push({
        cite: cite,
        name: name,
        stars: stars
      });
    });
    reviews = randomize(reviews);
    typeWrite(reviews)
  });

  showWindowSize();
  window.addEventListener("resize", showWindowSize);

  function setStarsWidth() { // changes the witdth of the full stars on hover
    stars.onmousemove = function(e) {
      var rect = document.getElementById('border-stars').getBoundingClientRect();
      var x = e.pageX - parseInt(rect.left);
      document.getElementById('full-stars').style.width = x + 'px';
    }
  }

  var stars = document.getElementById('border-stars');
  setStarsWidth(); // initial adding of listener

  stars.addEventListener('mouseleave', function() { // if the user leaves the section without clicking reset the value to the last saved one
    document.getElementById('full-stars').style.transition = '0.6s';
    document.getElementById('full-stars').style.width = score + 'px';
    setStarsWidth();
  });

  stars.addEventListener('mouseenter', function() { // change transition time to make things snappier
    document.getElementById('full-stars').style.transition = '0.1s';
  });

  stars.addEventListener('click', function() { // when clicked remove the hover funtion as it feels better
    stars.onmousemove = null;
    setTimeout(() => {
      score = document.getElementById('full-stars').offsetWidth;
    }, 100);
  })

  stars.addEventListener('touchstart', function() { // if the click was from a touch device add the listener again so multiple taps are accepted
    setTimeout(() => {
      score = document.getElementById('full-stars').offsetWidth;
    }, 100);
    setStarsWidth();
  })

  if (localStorage.getItem('hasWrittenReview') == 'true') { // check if localstorage contains the stored bool value and if true, disabe the review section
    var cont = document.getElementById('user-review-container').remove();
    var thanks = document.getElementById('user-review-success').remove();
  }
});

function openOrCloseMenu() { // closes the dropdown menu in mobile and vice versa
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

 function openTrailerPlayer() { // does what it says :D
   document.getElementById('trailer-overlay').style.display = 'block';
   document.getElementById('trailer-video').play();
 }

 function closeTrailerPlayer() { // this too
   document.getElementById('trailer-overlay').style.display = 'none';
   document.getElementById('trailer-video').pause();
   document.getElementById('trailer-video').currentTime = 0;
 }

 function galleryScroll(isRight, id) { // fires when the user scolls through gallery
   document.getElementById(id).style = "pointer-events: none"; // disable button

   let gallery = document.getElementById('gallery').querySelectorAll('.gallery-container');
   let classes = [];

   for (let i = 0; i < gallery.length; i++) {
     classes.push(gallery[i].classList[1]); //store classes of images in order
   }

   isRight ? classes.unshift(classes.pop()) : classes.push(classes.shift()); // left or right shift classes

   for (let i = 0; i < gallery.length; i++) {
     gallery[i].classList.remove(gallery[i].classList[1]); // replace classses with shifted ones
     gallery[i].classList.add(classes[i]);
   }

   setTimeout(() => {
     document.getElementById(id).style = "pointer-events: auto";
   }, 1000); // enable button after the transition has ended
 }

 function submitForm() { // checks if the form is completed, sends the data to the database, stores a boolean value in the localStorage
   //  to prevent multiple reviews and closes the user-review section
   if (checkReviewText() & checkReviewName() & checkReviewScore()) {
     var cont = document.getElementById('user-review-container')
     cont.style.maxHeight = '0';
     cont.style.padding = '0';
     var thanks = document.getElementById('user-review-success');
     thanks.style.maxHeight = '1000px';
     thanks.style.paddingTop = '100px';
     scrollToElement(cont);
     localStorage.setItem('hasWrittenReview', true);
     writeReview(document.getElementById('review-text').value.trim().toUpperCase(), document.getElementById('review-name').value.trim().toUpperCase(), (document.getElementById('full-stars').offsetWidth / 70));
   }
 }

 function scrollToElement(element) { // use this instead of the standard scrolling of a tags as we have a sticky header and need a offset
   window.scrollTo(0, element.offsetTop - 140);
 }

 function checkReviewScore() { // check if the user has entered a review score
   let score = document.getElementById('full-stars').offsetWidth;
   let star = document.getElementById('review-hover-container');

   if (score <= 0) {
     star.style.color = '#ff4242';
     return false;
   } else {
     star.style.color = '#ededed';
     return true;
   }
 }

 function checkReviewName() { // check if the user has entered a name
   let name = document.getElementById('review-name');

   if (name.value.trim() == '') {
     name.style.borderColor = '#ff4242';
     return false;
   } else {
     name.style.borderColor = '#ededed';
     return true;
   }
 }

 function checkReviewText() { // check if the user has entered a review text
   let text = document.getElementById('review-text');

   if (text.value.trim() == '') {
     text.style.borderColor = '#ff4242';
     return false;
   } else {
     text.style.borderColor = '#ededed';
     return true;
   }
 }

 function writeReview(text, name, stars) { // writes a review to our database
   var db = firebase.firestore();
   db.collection("reviewSection").add({
     text: text,
     name: name,
     stars: stars
   });
 }
