// ---------------------
// Request Data
// ---------------------

var json = (function () {
    var json = null;
    // JQuery Ajax Request Documentation: https://api.jquery.com/jquery.ajax/
    $.ajax({
        'async': false,
        'global': false,
        'url': 'http://mysafeinfo.com/api/data?list=htmlcolors&format=json',
        'dataType': 'json',
        'success': function (data) {
          json = data
        },
        'error': function(jqXHR, textStatus, errorThrown) {
          // debugger
          return $("#colors").text('no colors can accommodate your feelings at the moment')
        }
    });
    return json
})();




// customize the display of json and assign class to each set of colors
for(var i = 0; i < json.length; i++) {
    var hexCode = json[i].cd;
    var colorName = json[i].nm;

    $('#allcolors').append("<div id='"+ i + "' class='colorBox hide'" + "style='background-color:" + colorName + ";'" + "'>" + "<p>" + hexCode + "</p>" + "</div>");

};



//------------BUTTONS------------

var button = ['happiness', 'sadness', 'fear', 'anger', 'calm', 'distaste'];

//on desktop
$.each(button, function(index,value){
   $('#buttons').append("<button id='" + value + "'>" + value + "</button>");
});


//on mobile for the dropdown
$.each(button, function(index,value){
   $('#buttonsMobile').append("<option id='" + value + "'>" + value);
});



//buttons
var showHappyButton = $('#happiness');
var showSadButton = $('#sadness');
var showFearButton = $('#fear');
var showAngerButton = $('#anger');
var showCalmButton = $('#calm');
var showDistasteButton = $('#distaste');

//selected colors for emotion
var happyColor = $("#2, #3, #6, #8, #14, #20, #36, #37, #38, #45, #48, #49, #51, #52, #54, #61, #65, #69, #76, #77, #82, #87, #103, #104, #109, #110, #115, #127, #120, #133, #138");
var sadColor = $("#7, #13, #15, #17, #21, #24, #34, #35, #39, #41, #56, #59, #63, #71, #72, #73, #74, #84, #86, #88, #90, #95, #111, #123, #124, #125, #128");
var fearColor = $("#5, #9, #11, #25, #44, #55, #58, #62, #70, #75, #85, #97, #98, #119, #135, #139");
var angerColor = $("#16, #19, #29, #42, #60, #64, #80, #92, #93, #94, #99, #100, #107, #108, #113, #116, #117, #118, #121, #132");
var calmColor = $("#0, #1, #4, #18, #32, #33, #43, #47, #53, #57, #66, #67, #68, #81, #91, #96, #102, #120, #126, #129, #136, #137");
var distasteColor = $("#10, #12, #22, #23, #26, #27, #28, #30, #31, #40, #46, #50, #78, #79, #83, #89, #101, #105, #106, #112, #114, #122, #131, #134");




//------------FUNCTIONS--------------

var anyButtonClicked = function(){
    $("#allcolors").removeClass('hide')
}

var showHappyFunction = function() {
  happyColor.addClass('show')
  happyColor.removeClass('hide')
}

var hideHappyFunction = function() {
  happyColor.addClass('hide')
  happyColor.removeClass('show')
}

var showSadFunction = function() {
  sadColor.addClass('show')
  sadColor.removeClass('hide')
}

var hideSadFunction = function() {
  sadColor.addClass('hide')
  sadColor.removeClass('show')
}

var showFearFunction = function() {
  fearColor.addClass('show')
  fearColor.removeClass('hide')
}

var hideFearFunction = function() {
  fearColor.addClass('hide')
  fearColor.removeClass('show')
}

var showAngerFunction = function() {
  angerColor.addClass('show')
  angerColor.removeClass('hide')
}

var hideAngerFunction = function() {
  angerColor.addClass('hide')
  angerColor.removeClass('show')
}

var showCalmFunction = function() {
  calmColor.addClass('show')
  calmColor.removeClass('hide')
}

var hideCalmFunction = function() {
  calmColor.addClass('hide')
  calmColor.removeClass('show')
}

var showDistasteFunction = function() {
  distasteColor.addClass('show')
  distasteColor.removeClass('hide')
}

var hideDistasteFunction = function() {
  distasteColor.addClass('hide')
  distasteColor.removeClass('show')
}



//Mobile event listen to the moodDidChange
function moodDidChange(mood) {
  anyButtonClicked()
  if (mood === "happiness") {
    showHappyFunction()
  } else if (mood === "sadness") {
    showSadFunction()
  } else if(mood === "fear"){
    showFearFunction()
  } else if(mood === "calm"){
    showCalmFunction()
  } else if(mood === "distaste"){
    showDistasteFunction()
  }
}



// to shuffle the lists
var shuffle = function(){
    var ul = document.querySelector('ul');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}



//-------------EVENTS----------------

//if any buttons are clicked
// $([showHappyButton, showSadButton, showFearButton, showCalmFunction, showDistasteButton]).each(function(){
//   $(this).click(function(){
//     shuffle();
//     anyButtonClicked();
//   })
// });


showHappyButton.click(function() {
    shuffle();
    anyButtonClicked();
    showHappyFunction();
    hideSadFunction();
    hideFearFunction();
    hideAngerFunction();
    hideCalmFunction();
    hideDistasteFunction();
});

showSadButton.click(function() {
    shuffle();
    anyButtonClicked();
    showSadFunction();
    hideHappyFunction();
    hideFearFunction();
    hideAngerFunction();
    hideCalmFunction();
    hideDistasteFunction();
});

showFearButton.click(function() {
    shuffle();
    anyButtonClicked();
    showFearFunction();
    hideSadFunction();
    hideHappyFunction();
    hideAngerFunction();
    hideCalmFunction();
    hideDistasteFunction();
});

showAngerButton.click(function() {
    shuffle();
    anyButtonClicked();
    showAngerFunction();
    hideFearFunction();
    hideSadFunction();
    hideHappyFunction();
    hideCalmFunction();
    hideDistasteFunction();
});


showCalmButton.click(function() {
    shuffle();
    anyButtonClicked();
    showCalmFunction();
    hideFearFunction();
    hideSadFunction();
    hideHappyFunction();
    hideAngerFunction();
    hideDistasteFunction();
});

showDistasteButton.click(function() {
    shuffle();
    anyButtonClicked();
    showDistasteFunction();
    hideFearFunction();
    hideSadFunction();
    hideHappyFunction();
    hideAngerFunction();
    hideCalmFunction();
});







// for(var i = 0; i < colorIndex.length; i++){
//     $(document).load(function(){
//         $('.colorBox').addClass(colorIndex[i]);
//     });
// }




// customize the display of json and assign class to each set of colors
// for(var i = 0; i < json.length; i++) {
//     var hexCode = json[i].cd;
//     var colorName = json[i].nm;  
//     $('#allcolors').append("<div id='"+ i + "' class='colorBox'" + "style='background-color:" + colorName + ";'" + "'>" + "<p>" + i + " " + hexCode + "</p>" + "</div>");
// };