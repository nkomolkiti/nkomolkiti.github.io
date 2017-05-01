window.onload = function(){

//examples of videos (four buttons)
    var a = document.getElementsByTagName("a");
    for(var i=0; i<a.length; i++){
         var vidId1 = 'W0LHTWG-UmQ'; //world
         var vidId2 = 'dGLgZ8htLI4'; //plane
         var vidId3 = 'vRTMCDFxQYE'; //waterfalls
         var vidId4 = 'SIGTHZrEGmY'; //city
         var vidId5 = 'bvWDfQsnx0s'; //LA at night
         var vidId6 = '9Vj_O4Kz2CY'; //stars
         var vidId7 = 'NZlfxWMr7nc'; //aurora
         var vidId8 = '4RUGmBxe65U'; //under the sea

            a[0].onclick = function(){
                player1.loadVideoById(vidId1);
                player2.loadVideoById(vidId2);
            };

            a[1].onclick = function(){
                player1.loadVideoById(vidId7);
                player2.loadVideoById(vidId8);
            };

            a[2].onclick = function(){
                player1.loadVideoById(vidId3);
                player2.loadVideoById(vidId4);
            };


            a[3].onclick = function(){
                player1.loadVideoById(vidId5);
                player2.loadVideoById(vidId6);
            };


      }

};  //end window on load


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//VIDEOS
var player1;
var player2;

//set time out
var restart_before = 500;//milisecenods
var code_overhead=10;
var total_video_time1;
var total_video_time2;

//function that play videos
function onYouTubeIframeAPIReady(){
  createIframe1();
  createIframe2();
};


//iframe creation
function createIframe1() {
  player1 = new YT.Player('video1', {
    height: '390',
    width: '640',
    videoId:'W0LHTWG-UmQ',
    events: {
      'onReady': onPlayer1Ready
      // 'onStateChange': onPlayer1StateChange
    },
    playerVars: {
      autoplay: 1,        // Auto-play the video on load
      controls: 0,        // Hide pause/play buttons in player
      showinfo: 0,        // Hide the video title
      modestbranding: 1,  // Hide the Youtube Logo
      // loop: 1,            // Run the video in a loop
      // playlist: 'W0LHTWG-UmQ', //so that loop function works
      fs: 0,              // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3,  // Hide the Video Annotations
      autohide: 0         // Hide video controls when playing
    }
  });
};

function createIframe2() {
  player2 = new YT.Player('video2', {
    height: '390',
    width: '640',
    videoId: 'dGLgZ8htLI4',
    events: {
      'onReady': onPlayer2Ready
      // 'onStateChange': onPlayer2StateChange
    },
    playerVars: {
      autoplay: 1,        // Auto-play the video on load
      controls: 0,        // Hide pause/play buttons in player
      showinfo: 0,        // Hide the video title
      modestbranding: 1,  // Hide the Youtube Logo
      // loop: 1,            // Run the video in a loop
      // playlist: 'dGLgZ8htLI4', //so that loop function works
      fs: 0,              // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3,  // Hide the Video Annotations
      autohide: 0,        // Hide video controls when playing
    }
  });
};

//play on ready --------
function onPlayer1Ready(event) {
  event.target.playVideo();
  player1.mute();

  total_video_time1 = (player1.getDuration()*1000)-restart_before;
  setTimeout(checkvideopos1, total_video_time1);
};

function onPlayer2Ready(event) {
  event.target.playVideo();
  player2.mute();

  total_video_time2 = (player2.getDuration()*1000)-restart_before;
  setTimeout(checkvideopos2, total_video_time2);


};


//check current time and restart when end -------------------
function checkvideopos1(){
  var curr_time1 = player1.getCurrentTime();
  curr_time1 = curr_time1 * 1000;

  if(curr_time1>=total_video_time1){
      player1.seekTo(0);
      setTimeout(checkvideopos1, total_video_time1);
    }
  else{
      var new_time1 = (total_video_time1 - curr_time1) - code_overhead;
      setTimeout(checkvideopos1, new_time1);
    }
};

function checkvideopos2(){
  var curr_time2 = player2.getCurrentTime();
  curr_time2 = curr_time2 * 1000;

  if(curr_time2>=total_video_time2){
      player2.seekTo(0);
      setTimeout(checkvideopos2, total_video_time2);
    }
  else{
      var new_time2 =  (total_video_time2 -  curr_time2) - code_overhead;
      setTimeout(checkvideopos2, new_time2);
    }
}; //end video loop



// //-----------------------------On STATE CHANGE
// // 5. The API calls this function when the player's state changes.
// // var done = false;

// // function onPlayerStateChange(event) {
// //   if (event.data == YT.PlayerState.PLAYING && !done) {

// //     done = false;
// //   }
// //   console.log(event.data)
// // }
// //-----------------------------


//parsing ID from url -------------------

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.getYouTubeID = factory();
  }
}(this, function (exports) {

  return function (url, opts) {
    if (opts == undefined) {
      opts = {fuzzy: true};
    }

    if (/youtu\.?be/.test(url)) {

      // Look first for known patterns
      var i;
      var patterns = [
        /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
        /\?v=([^#\&\?]{11})/,         // ?v=<id>
        /\&v=([^#\&\?]{11})/,         // &v=<id>
        /embed\/([^#\&\?]{11})/,      // embed/<id>
        /\/v\/([^#\&\?]{11})/         // /v/<id>
      ];

      // If any pattern matches, return the ID
      for (i = 0; i < patterns.length; ++i) {
        if (patterns[i].test(url)) {
          return patterns[i].exec(url)[1];
        }
      }

      if (opts.fuzzy) {
        // If that fails, break it apart by certain characters and look
        // for the 11 character key
        var tokens = url.split(/[\/\&\?=#\.\s]/g);
        for (i = 0; i < tokens.length; ++i) {
          if (/^[^#\&\?]{11}$/.test(tokens[i])) {
            return tokens[i];
          }
        }
      }
    }

    return null;
  };

}));


//play videos from extracted IDs -------------------

var getYouTubeID;
// var id = getYouTubeID("http://www.youtube.com/watch?v=9bZkp7q19f0");

function playFromId(getId1, getId2, event){

  var id = getYouTubeID(getId1);
  var id2 = getYouTubeID(getId2);
  console.log(id); // "youtube id"
  console.log(id2); // "youtube id"

      if((id === null)&& (getId1.length == 0)){ //if there's undefined url in 1
        alert("enter both urls and make sure it's Youtube");
        showClearButton();

      } else if((id2 === null )&& (getId2.length == 0)){ //if there's undefined url in 2
        alert("enter both urls and make sure it's Youtube");
        showClearButton();

      } else if((getId1.length == 0) && (getId2.length == 0)){ //if there's no text in both
        removeClearButton();
        alert("enter both urls and make sure it's Youtube");

      } else { //everything is good
        player1.loadVideoById(id);
        player2.loadVideoById(id2);
        // onPlayer1Ready(event);
        // onPlayer2Ready(event);
        showClearButton();

      }

};


$('form').submit(function clickSubmit( event) {

      event.preventDefault();
      var fields = $( ":input" ).serializeArray();
      // $( "#results" ).empty();

      jQuery.each(fields, function( i, field ) { //this is for loop
              // results.append( field.value + " " +"<br>");
              var getId1 = fields[0].value;
              var getId2 = fields[1].value;

              playFromId(getId1, getId2); //get the IDs from url

              // if((getId1.length !== 0) && (getId2.length !== 0)){
              //   var results = $( "#results" );
              //   results.append('<!DOCTYPE html><html lang="en"><header><style>#noTouch{width:100vw;height:100vh;position:fixed;z-index:-50;}#backgroundVideo1, #backgroundVideo2{position: fixed;top: 0;right: 0;bottom: 0;left: 0;overflow: hidden;}#backgroundVideo1{z-index: -100;opacity: 0.6;}#backgroundVideo2{z-index: -101;opacity: 0.4;} .fullscreen-bg__video {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}@media (min-aspect-ratio: 16/9) {.fullscreen-bg__video {height: 300%;top: -100%;}}@media (max-aspect-ratio: 16/9) {.fullscreen-bg__video {width: 300%;left: -100%;}}</style></header><body><div id="noTouch"></div><div id="backgroundVideo1" ><iframe id="video1" class="fullscreen-bg__video" frameboder="0" allowfullscreen="1" title="YouTube video player" width="640" height="390" src="'+fields[0].value+ '?autoplay=1&controls=0&showinfo=0&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=0&enablejsapi=1&widgetid=1"></iframe></div><div id="backgroundVideo2" ><iframe id="video2" class="fullscreen-bg__video" frameboder="0" allowfullscreen="1" title="YouTube video player" width="640" height="390" src="'+fields[1].value+'?autoplay=1&controls=0&showinfo=0&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=0&enablejsapi=1&widgetid=2"></iframe></div></body></html>');
              //
              // }


      });
      // console.log (fields);

});

function showClearButton(){
  $(".clear").addClass('show');
  $(".clear").removeClass('hide');
}

function removeClearButton(){
  $(".clear").addClass('hide');
  $(".clear").removeClass('show');
}

$('.clear1').click(function() {
  $('input:text[name="url1"]').val('');
});

$('.clear2').click(function() {
  $('input:text[name="url2"]').val('');
});


// //-----------------------------

// //get youtube ID from various URL
// //https://github.com/jmorrell/get-youtube-id

//check if it's youtube + alert if only 1 video / none -------------------
