// Scrolling thanks to http://www.denisechandler.com/

// var didScroll;
// var lastScrollTop = 0;
// var delta = 2;
// var navbar;
// var navbarHeight;
// $(function() {
//   navbar = $('#NavBar');
//   navbarHeight = navbar.outerHeight();

//   $(window).scroll(function(event){
//     didScroll = true;
//   });

// });


// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// function hasScrolled() {
//     var st = $(this).scrollTop();
//     console.log(st)
    
//     // Make sure they scroll more than delta
//     if (Math.abs(lastScrollTop - st) <= delta)
//         return;
    
//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop) { // && st > navbarHeight idk why she had this condition
//       // Scroll Down
//       navbar.removeClass('nav-down').addClass('nav-up');
//       console.log('nav up');
//     } 
//     else {
//       // Scroll Up
//       if (st + $(window).height() < $(document).height()) {
//           navbar.removeClass('nav-up').addClass('nav-down');
//           console.log(' nav down ');
//       }
//     }
    
//     lastScrollTop = st;
// }


// Highlight menu item when scrolling: http://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section

// http://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll
// Cache selectors
$(document).ready(function() {
  var homePageFlag = false;
  if($("#homepage-flag").length > 0) {
      var stickyMenu = $("#NavBar")
      homePageFlag = true;
  }
  else {
    var stickyMenu = $("#SubNav")
  }
  var lastId,
      topMenu = stickyMenu,
      topMenuHeight = topMenu.outerHeight(),

      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var temp = $(this).attr("href");
        console.log('temp', temp );
        var ID = temp.split('#').pop();
        console.log('ID', ID );
        if(!ID){
          console.log('ID undefined');
          var item = $('body');
        } else {
          var item = $('#'+ID);
        }
        
        console.log('item', item );
        if (item.length) { return item; }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  // console.log(menuItems);
  menuItems.click(function(e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop() + topMenuHeight;
     
     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";
     console.log(id);
     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         console.log(menuItems.filter("[href='#"+id+"']")[0])
         menuItems
           .parent().removeClass("active")
           .end().filter("[href='#"+id+"']").parent().addClass("active");
     } 

// Sorry about the magic numbers XD     

// Main page nav
    if ($(window).scrollTop() > 40) {
      $('#NavBar').addClass('navbar-fixed-top');
      $('#NavBar').removeClass('nav-default');
    }
    if ($(window).scrollTop() < 41 ) { 
      $('#NavBar').removeClass('navbar-fixed-top');
      $('#NavBar').addClass('nav-default');
    }
     
// Projects page sub-nav
    if (!homePageFlag) {
        if ($(window).scrollTop() > $('#SubNav').offset().top) {
          $('#SubNav').addClass('navbar-fixed-top');
        }
        if ($(window).scrollTop() < $('#overview').offset().top - $('#SubNav').height()) {
          $('#SubNav').removeClass('navbar-fixed-top');
        }
    }
  }); 


// https://www.w3schools.com/w3css/w3css_slideshow.asp
  var slideIndex = 0;
  carousel();

  function carousel() {
      var i;
      var x = document.getElementsByClassName("story");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1} 
      x[slideIndex-1].style.display = "block"; 
      setTimeout(carousel, 2500); // Change image every 2 seconds
  } 

                 
  });
