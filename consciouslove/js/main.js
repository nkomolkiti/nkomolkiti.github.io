

//NAV BAR-----------------------------------
var chapterList = $('.menu');
var exitButton = $('.exitBtn');

chapterList.hide();

$('#selectChapters').click(function(){
	chapterList.slideDown(400);
});

exitButton.click(function(){
	chapterList.slideUp(400);
});

$('#logoImage').append('<img src="image/logowhite.svg" alt="logo" class="left logo" width="80px">');
$('#profileMenu').append('<img src="image/profiletest.jpg" alt="profilc pic">');
$('#selectChapters').append('<div><p class="chaptersBtn buttonText">SELECT CHAPTERS<img src="image/carrot.svg" width="10px" class="carrot"></p></div>');
$('#homepage').append('<p class="buttonText chaptersBtn">ABOUT</p>');

$('#allChapterLinks').append('<div id="chapter1Link"><p class="chapterText">CHAPTER ONE</p><h1 class="menuTitle">intention & meaning</h1><p>It is easy to miscommunicate when talking to children. A normal statement or certain reactions might turn into a quiet form of verbal abuse if used incorrectly and repetitively. Flip the cards to learn about the alternatives!</p></div><div id="chapter2Link"><p class="chapterText">CHAPTER TWO</p><h1 class="menuTitle">verbal abuse</h1><p>Learn more about verbal abuse: how it can be quiet, repetitive, and unintentional. This chapter includes the description, impacts, and examples for each type of verbal absue.</p></div><div id="chapter3Link"><p class="chapterText">CHAPTER THREE</p><h1 class="menuTitle">parenting tips</h1><p>It can be stressful for new parents to take care of children. This chapter includes tips to talking positively, common situations that considered stressful, and how to approach children by age.</p></div>');

$('#homepage').click(function(){
	window.location.href = 'index.html';
  return false;
});

$('#chapter1Link').click(function(){
	window.location.href = 'chapter-1.html';
  return false;
});

$('#chapter2Link').click(function(){
	window.location.href = 'chapter-2.html';
  return false;
});

$('#chapter3Link').click(function(){
	window.location.href = 'chapter-3.html';
  return false;
});

//END NAV BAR-------------------------------

$(document).ready(function(){

//FLIPCARDS ------------------------------
$('.flipButton').click(function() {
    $(this).parent().parent().parent(".flip-container").toggleClass('active');
});
$('.front .flipButton').append('<p>FLIP &#10230;</p>');
$('.back .flipButton').append('<p>&#10229; BACK</p>');


//scroll to top ------------------------------
var scroll_top_duration = 700,
$back_to_top = $('.cd-top');

$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
});

//count percentage on load
$(function() {
    function count($this){
        var current = parseInt($this.html(), 10);
        $this.html(++current);
        if(current !== $this.data('count')){
            setTimeout(function(){count($this)}, 30);
        }
    }
  $(".percentageNumber").each(function() {
      $(this).data('count', parseInt($(this).html(), 10));
      $(this).html('0');
      count($(this));
  });
});

//when scroll>count number
// var a = 0;
// $(window).scroll(function() {
//
//   var oTop = $('#percentageChartdiv').offset().top - window.innerHeight;
//   if (a == 0 && $(window).scrollTop() > oTop) {
//     $('.percentageNumber').each(function() {
//       var $this = $(this),
//         countTo = $this.attr('data-count');
//       $({
//         countNum: $this.text()
//       }).animate({
//           countNum: countTo
//         },
//
//         {
//
//           duration: 2000,
//           easing: 'swing',
//           step: function() {
//             $this.text(Math.floor(this.countNum));
//           },
//           complete: function() {
//             $this.text(this.countNum);
//             //alert('finished');
//           }
//
//         });
//     });
//     a = 1;
//   }
//
// });


//FOOTER ------------------------------
$('footer').append('<div><div class="left"><p class="rights">2017 Degree Project "Conscious Love" all rights reserved.</p></div><div class="right"><p class="rights">Asama Sangiamkittikul and Nisharee "Fah" Komolkiti.</p></div></div>');

});
