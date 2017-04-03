// ---------------------
// Request Data for Lead Level
// ---------------------

var json = (function () {
    var json = null;
    // JQuery Ajax Request Documentation: https://api.jquery.com/jquery.ajax/
    $.ajax({
        'async': false,
        'global': false,
        'url': 'https://nkomolkiti.github.io/bmoreleadlevel/leadlevel.json',
        'dataType': 'json',
        'success': function (data) {
          json = data
        },
        'error': function(jqXHR, textStatus, errorThrown) {
          // debugger
          // return $("#colors").text('no colors can accommodate your feelings at the moment')
        }
    });
    return json
})();


// Google Map ------------------------

//create the map
var initMap = function(){
    var centerPosition = {lat: 39.5, lng: -76.73};
    var style = [{
        "elementType": "geometry",
        "stylers": [ { "saturation": -100 }]
    }];

    var mapOptions = {
      zoom: 10,
      scrollwheel: false,
      center: centerPosition,

      styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"saturation":"0"},{"lightness":"0"},{"color":"#c2c2c2"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"color":"#f15a27"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.icon","stylers":[{"visibility":"on"},{"color":"#f15a27"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#f15a27"},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":"0.95"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#636363"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":"75"},{"saturation":"-100"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"lightness":"100"},{"weight":"0.01"},{"saturation":"-57"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"},{"lightness":"0"},{"gamma":"1"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":"0"},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":"50"},{"saturation":"-100"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"color":"#151515"},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"weight":"6.31"},{"invert_lightness":true},{"hue":"#00ffff"}]}],

    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 140
    });
    var marker;

    google.maps.event.addDomListener(window, "resize", function() {
        // var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(centerPosition);
    });
    //customize infowindow
    google.maps.event.addListener(infowindow, 'domready', function() {
        infowindowCustom();
     });

    setMarkers(map, infowindow, marker); // pass in 'map' into setMarkers function
};


var redMarker = 'image/redmarker.png';
var blueMarker = 'image/bluemarker.png';
var idleTime = 0;




//set markers-----------------------

function setMarkers(map, infowindow, marker){

    for(var i = 0; i < json.length; i++) {

    var content = '<div class="infowindow '+i+'"><h3>'+json[i].place+'</h3><h5 class="mapContent">LEAD LEVEL<br><font style="font-weight:600; font-size:12px;">'+json[i].lead+' PPB</font></h5></div>';
    var positionPlace = {lat: json[i].latitude, lng: json[i].longtitude};

    // markers
    if(json[i].lead <15){
        marker = new google.maps.Marker({
          position: positionPlace,
          map: map,
          icon: blueMarker,
          content:content,

        });

    } else {
        marker = new google.maps.Marker({
          position: positionPlace,
          map: map,
          icon: redMarker,
          content:content

        });
    }

    //reuse the same infowindow with new content
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(this.content);
        infowindow.open(map, this);

        if(this.icon == redMarker){
          $('.gm-style-iw').css({'background-color':'#C72D00'});
        } else {
          $('.gm-style-iw').css({'background-color':'#0D56AE'});
        }

        //close the infowindow when click the marker again -------
            // var map1 = infowindow.getMap();
            // if (map1 !== null && typeof map1 !== "undefined"){
            //     infowindow.close(map,this);
            // } else {
            //     infowindow.setContent(this.content);
            //     infowindow.open(map, this);
            // }
            // setTimeout(function () { infowindow.close(); }, 8000);
    });

    // close infowindow when not use
    google.maps.event.addListener(map, 'mouseout', function() {
        setTimeout(function () { infowindow.close(map, this); }, 4000);
    });

    }; //end of for loop
};


// End Set Marker -----------------------------


//customize the infowindow ---------------------
//https://codepen.io/Marnoto/pen/xboPmG

var infowindowCustom = function() {

   // Reference to the DIV that wraps the bottom of infowindow
   var iwOuter = $('.gm-style-iw');
   var iwBackground = iwOuter.prev();
  //  var iwCloseBtn = iwOuter.after();

   // Removes background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});
   // Removes white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

   // Moves the shadow of the arrow 76px to the left margin.
   iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'display:none !important;'});

   // Moves the arrow 76px to the left margin.
   iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display:none !important;'});

   // Changes the desired tail shadow color.
  //iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

   // Reference to the div that groups the close button elements.
   var iwCloseBtn = iwOuter.next();

   // Apply the desired effect to the close button
   iwCloseBtn.addClass('closeButton');
  //  iwCloseBtn.css({content:url("../image/closebtn.png")});

  //  The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
  //  iwCloseBtn.mouseout(function(){
  //    $(this).css({opacity: '1'});
  //  });
 };


//-----------------------LIGHT BOX-------------------------------------

var methodButton = $('.btnMethodTarget');
var lightBox = $('#lightBox');
var exitMethodButton = $('.exitButton');

var openLightBox = function(){
  lightBox.addClass('show');
  lightBox.removeClass('hide');
}

var closeLightBox = function(){
  lightBox.addClass('hide');
  lightBox.removeClass('show');
}

methodButton.click(function(){
   openLightBox();
});

exitMethodButton.click(function(){
  closeLightBox();
});
