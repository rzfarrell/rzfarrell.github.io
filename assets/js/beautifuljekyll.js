// Dean Attali / Beautiful Jekyll 2020

var BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      var imgInfo = BeautifulJekyllJS.getImgInfo();
      var src = imgInfo.src;
      var desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      var getNextImg = function() {
        var imgInfo = BeautifulJekyllJS.getImgInfo();
        var src = imgInfo.src;
        var desc = imgInfo.desc;

        var prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            BeautifulJekyllJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    var randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    var src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    var desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  initSearch : function() {
    if (!document.getElementById("beautifuljekyll-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
    });
    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").hide();
      $("body").removeClass("overflow-hidden");
    });
    $(document).on('keyup', function(e) {
      if (e.key == "Escape") {
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      }
    });
  }
};

// 2fc73a3a967e97599c9763d05e564189

// Menu Dropdown Toggle
if ($(".menu-trigger").length) {
  $(".menu-trigger").on("click", function() {
    $(this).toggleClass("active");
    $(".header-area .nav").slideToggle(200);
  });
}

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);
