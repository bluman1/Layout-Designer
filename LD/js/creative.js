/*(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
 
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})(jQuery); // End of use strict
*/

console.log(window.location.pathname)

var containerCount = 1;
var mediaCount = 0;
var playlistCount = 0;
var clockCount = 0;
var rssCount = 0;
var weatherCount = 0;
var selected = null;
var propAdded = false;
var playlistAdded = false;
var clockAdded = false;
var weatherAdded = false;
var rssAdded = false;

var playlistProps = {
    'id': '',
    'background': '',
    'selected': '',
    'top': '',
    'left': '',
    'width': '',
    'height': ''
};
var clockProps = {
    'background': '',
    'type': '',
    'country': '',
    'top': '',
    'left': '',
    'width': '',
    'height': ''
};
var weatherProps = {
    'background': '',
    'unit': '',
    'country': '',
    'top': '',
    'left': '',
    'width': '',
    'height': ''
};
var rssProps = {
    'background': '',
    'url': '',
    'transition': '',
    'time': '',
    'refresh': '',
    'top': '',
    'left': '',
    'width': '',
    'height': ''
};

$(document).ready(setupDesigner); //This calls the function that will setup the designer for editting if need be.

//This sets up the designer for editting.
function setupDesigner() {
    //we look at the path of the url and use it to determine if we are editing or creating a new layout
    if (document.location.pathname == 'edit') {
        //we nned to make an AJAX call here to pick up the XML of the previously designed layout here. we use the path of the url to know which layout needs editting
        var stuff = '<?xml version="1.0" encoding="utf-8"?> <a> <Application backgroundImage="" backgoungColor="#dddddd" title=""> <Container top="10" left="127.125" width="744" height="106" backgroundColor="#408080"> <Playlist> <Video url="https://player.vimeo.com/video/141135097" time="240" expiryDate=""/><Image url="https://pbs.twimg.com/media/CzLJvsLUsAAcDq-.jpg" time="30" expiryDate=""/> <Video url="https://player.vimeo.com/video92827333" time="300" expiryDate=""/> <Website url="http://news.ycombincator.com" time="100" refreshTime="10" expiryDate=""/><Image url="https://pbs.twimg.com/media/CzLJvsLUsAAcDq-.jpg" time="1" expirtyDate=""/> <Image url="https://pbs.twimg.com/media/CzLJvsLUsAAcDq-.jpg" time="100" expirtyDate=""/> <Video url="https://player.vimeo.com/video/141135097" time="300" expiryDate=""/> </Playlist> </Container> <Container top="10" left="127.125" width="748" height="110" backgroundColor="#808080"> <Widget> <Clock type="Digital" country="Nigeria"/> </Widget> </Container> <Container top="10" left="127.125" width="748" height="110" backgroundColor="#808000"> <Widget> <Rss url="link" time="9" transition="Scroll Left" refreshTime="9"/> </Widget> </Container> <Container top="122" left="127.125" width="748" height="48" backgroundColor="#ff8000"> <Widget> <Weather country="Nigeria" type="undefined"/> </Widget> </Container> </Application> </a>';

        var layout = '<Application backgroundImage="" backgoungColor="#ff0080" title="nm"> <Container top="10" left="127.125" width="744" height="44" backgroundColor="#8000ff"> <Widget> <Clock type="Digital" country="Nigeria"/> </Widget> </Container> <Container top="60" left="127.125" width="744" height="44" backgroundColor="#00ff00"> <Widget> <Rss url="bn " time="8" transition="Scroll Left" refreshTime="8"/> </Widget> </Container> <Container top="110" left="127.125" width="744" height="44" backgroundColor="#0080ff"> <Widget> <Weather country="Great Britain" type="F"/> </Widget> </Container> </Application>';

        var xmlDoc = $.parseXML(layout);
        var $xml = $(xmlDoc);

        var appBG = $xml.find("Application").attr("backgoungColor");
        var appTitle = $xml.find("Application").attr("title");

        $("#glitz-container-1").css('background-color', appBG);
        $("#layoutName").val(appTitle);
        $("#color1").val(appBG);

        var allContainers = $xml.find("Container").each(function () {
            var containerTop = $(this).attr("top");
            var containerLeft = $(this).attr("left");
            var containerWidth = $(this).attr("width");
            var containerHeight = $(this).attr("height");
            var containerBackground = $(this).attr("backgroundColor");

            //start searching for each widget type here
            $playlistXML = $(this).find("Playlist");
            if ($playlistXML.length != 0) {
                //set all necessary variables.
                playlistProps.selected = $(this).find("Playlist").attr("id"); //TODO: Remember, id is not part of the schema yet! remind Ridwan about it!
                playlistProps.background = containerBackground;
                playlistAdded = true;
                //append to main glitz-container here.
                $("#glitz-container-1").append("<div id=\"glitz-playlist-" + (++playlistCount) + "\" class=\"text-center draggable xcontainer\" onclick=\"selectContainer(" + playlistCount + ", " + 1 + ")\"> Playlist Here</div > ");
                $("#glitz-playlist-" + playlistCount).css('background-color', containerBackground);
                $("#glitz-playlist-" + playlistCount).parent().css({ position: 'relative' });
                $("#glitz-playlist-" + playlistCount).css({ top: containerTop, left: containerLeft, position: 'absolute' });
                $("#glitz-playlist-" + playlistCount).width(containerWidth).height(containerHeight);
            }
            $clockXML = $(this).find("Clock");
            if ($clockXML.length != 0) {
                //set all necessary variables. 
                clockProps.type = $(this).find("Clock").attr("type");
                clockProps.country = $(this).find("Clock").attr("country");
                clockProps.background = containerBackground;
                clockAdded = true;
                //append to main container here.
                $("#glitz-container-1").append("<div id=\"glitz-clock-" + (++clockCount) + "\" class=\"text-center draggable xcontainer\" onclick=\"selectContainer(" + clockCount + ", " + 2 + ")\">Clock Widget here</div>");
                $("#glitz-clock-" + clockCount).css('background-color', containerBackground);
                $("#glitz-clock-" + clockCount).parent().css({ position: 'relative' });
                $("#glitz-clock-" + clockCount).css({ top: containerTop, left: containerLeft, position: 'absolute' });
                $("#glitz-clock-" + clockCount).width(containerWidth).height(containerHeight);
            }
            $rssXML = $(this).find("Rss");
            if ($rssXML.length != 0) {
                //set all necessary variables.
                rssProps.url = $(this).find("Rss").attr("url");
                rssProps.transition = $(this).find("Rss").attr("transition");
                rssProps.time = $(this).find("Rss").attr("time");
                rssProps.refresh = $(this).find("Rss").attr("refreshTime");
                rssProps.background = containerBackground;
                rssAdded = true;
                //append to main container here.
                $("#glitz-container-1").append("<div id=\"glitz-rss-" + (++rssCount) + "\" class=\"text-center xcontainer draggable\"onclick=\"selectContainer(" + rssCount + ", " + 3 + ")\">RSS Widget here</div>");
                $("#glitz-rss-" + rssCount).css('background-color', containerBackground);
                $("#glitz-rss-" + rssCount).parent().css({ position: 'relative' });
                $("#glitz-rss-" + rssCount).css({ top: containerTop, left: containerLeft, position: 'absolute' });
                $("#glitz-rss-" + rssCount).width(containerWidth).height(containerHeight);
            }
            $weatherXML = $(this).find("Weather");
            if ($weatherXML.length != 0) {
                //set all necessary variables.
                weatherProps.country = $(this).find("Weather").attr("country");
                weatherProps.unit = $(this).find("Weather").attr("type");
                weatherProps.background = containerBackground;
                weatherAdded = true;
                //append to main container here.
                $("#glitz-container-1").append("<div id=\"glitz-weather-" + (++weatherCount) + "\" class=\"text-center xcontainer draggable\"onclick=\"selectContainer(" + weatherCount + ", " + 4 + ")\"> Weather Widget here</div>");
                $("#glitz-weather-" + weatherCount).css('background-color', containerBackground);
                $("#glitz-weather-" + weatherCount).parent().css({ position: 'relative' });
                $("#glitz-weather-" + weatherCount).css({ top: containerTop, left: containerLeft, position: 'absolute' });
                $("#glitz-weather-" + weatherCount).width(containerWidth).height(containerHeight);
            }
        });
    }
}

//Updates the background color of the main glitz-container.
function updateColor(containerId) {
    var colorCode = $("#color" + containerId).val();
    $("#glitz-container-" + containerId).css('background-color', colorCode);
}

//Updates the background color of the widget containers.
function updateWidgetColor(containerId, containerN) {
    var containerName = '';
    if (containerN == 1) {
        containerName = 'playlist';
    }
    else if (containerN == 2) {
        containerName = 'clock';
    }
    else if (containerN == 3) {
        containerName = 'rss';
    }
    else if (containerN == 4) {
        containerName = 'weather';
    }
    var colorCode = $("#xcolor" + containerId).val();
    $("#glitz-" + containerName + "-" + containerId).css('background-color', colorCode);
}

//Updates the properties of a widget.
function updateProperties(containerN) {
    var containerName = '';
    var count = null;
    if (containerN == 1) {
        containerName = 'playlist';
        count = playlistCount;
        playlistProps.background = $("#xcolor" + count).val();
        playlistProps.selected = $("#playlistList option:selected").text();
        playlistProps.top = $('#topField').val();
        playlistProps.left = $('#leftField').val();
        playlistProps.width = $('#widthField').val();
        playlistProps.height = $('#heightField').val();
        updateWidgetColor(count, containerN);
    }
    else if (containerN == 2) {
        containerName = 'clock';
        count = clockCount;
        clockProps.background = $("#xcolor" + count).val();
        clockProps.country = $("#countryList option:selected").text();
        clockProps.type = $("#clockList option:selected").text();
        clockProps.top = $('#topField').val();
        clockProps.left = $('#leftField').val();
        clockProps.width = $('#widthField').val();
        clockProps.height = $('#heightField').val();
        updateWidgetColor(count, containerN);
    }
    else if (containerN == 3) {
        containerName = 'rss';
        count = rssCount;
        rssProps.background = $("#xcolor" + count).val();
        rssProps.url = $("#urlField").val();
        rssProps.transition = $("#transitionList option:selected").text();
        rssProps.time = $("#timeField").val();
        rssProps.refresh = $("#refreshField").val();
        rssProps.top = $('#topField').val();
        rssProps.left = $('#leftField').val();
        rssProps.width = $('#widthField').val();
        rssProps.height = $('#heightField').val();
        updateWidgetColor(count, containerN);
    }
    else if (containerN == 4) {
        containerName = 'weather'
        count = weatherCount;
        weatherProps.background = $("#xcolor" + count).val();
        weatherProps.country = $("#countryList option:selected").text();
        weatherProps.unit = $("#unitList option:selected").text();
        weatherProps.top = $('#topField').val();
        weatherProps.left = $('#leftField').val();
        weatherProps.width = $('#widthField').val();
        weatherProps.height = $('#heightField').val();
        updateWidgetColor(count, containerN);
    }

}

//Removes a widget from the designer.
function xremoveWidget(containerId, containerN) {
    var containerName = '';
    if (containerN == 1) {
        containerName = 'playlist';
        playlistAdded = false;
        playlistProps.background = '';
        playlistProps.selected = '';
        playlistProps.top = '';
        playlistProps.left = '';
        playlistProps.width = '';
        playlistProps.height = '';
    }
    else if (containerN == 2) {
        containerName = 'clock';
        clockAdded = false;
        clockProps.background = '';
        clockProps.country = '';
        clockProps.type = '';
        clockProps.top = '';
        clockProps.left = '';
        clockProps.width = '';
        clockProps.height = '';
    }
    else if (containerN == 3) {
        containerName = 'rss';
        rssAdded = false;
        rssProps.background = '';
        rssProps.url = '';
        rssProps.transition = '';
        rssProps.time = '';
        rssProps.refresh = '';
        rssProps.top = '';
        rssProps.left = '';
        rssProps.width = '';
        rssProps.height = '';
    }
    else if (containerN == 4) {
        containerName = 'weather';
        weatherAdded = false;
        weatherProps.background = '';
        weatherProps.country = '';
        weatherProps.unit = '';
        weatherProps.top = '';
        weatherProps.left = '';
        weatherProps.width = '';
        weatherProps.height = '';
    }
    $("#glitz-" + containerName + "-" + containerId).remove();
    if (propAdded == true) {
        $("#properties").remove();
    }
    propAdded = false;
    selected = null;
}

//Deselects a widget and removes its properties from the sidebar.
function deselectContainer(containerN) {
    var containerName = '';
    var count = null;
    if (containerN == 1) {
        containerName = 'playlist';
        count = playlistCount;
        playlistProps.background = $("#xcolor" + count).val();
        playlistProps.selected = $("#playlistList option:selected").text();
        playlistProps.top = $('#topField').val();
        playlistProps.left = $('#leftField').val();
        playlistProps.width = $('#widthField').val();
        playlistProps.height = $('#heightField').val();
    }
    else if (containerN == 2) {
        containerName = 'clock';
        count = clockCount;
        clockProps.background = $("#xcolor" + count).val();
        clockProps.country = $("#countryList option:selected").text();
        clockProps.type = $("#clockList option:selected").text();
        clockProps.top = $('#topField').val();
        clockProps.left = $('#leftField').val();
        clockProps.width = $('#widthField').val();
        clockProps.height = $('#heightField').val();
    }
    else if (containerN == 3) {
        containerName = 'rss';
        count = rssCount;
        rssProps.background = $("#xcolor" + count).val();
        rssProps.url = $("#urlField").val();
        rssProps.transition = $("#transitionList option:selected").text();
        rssProps.time = $("#timeField").val();
        rssProps.refresh = $("#refreshField").val();
        rssProps.top = $('#topField').val();
        rssProps.left = $('#leftField').val();
        rssProps.width = $('#widthField').val();
        rssProps.height = $('#heightField').val();
    }
    else if (containerN == 4) {
        containerName = 'weather'
        count = weatherCount;
        weatherProps.background = $("#xcolor" + count).val();
        weatherProps.country = $("#countryList option:selected").text();
        weatherProps.unit = $("#unitList option:selected").text();
        weatherProps.top = $('#topField').val();
        weatherProps.left = $('#leftField').val();
        weatherProps.width = $('#widthField').val();
        weatherProps.height = $('#heightField').val();
    }
    else {
        return;
    }
    $("#glitz-" + containerName + "-" + count).css('border', "");
    $("#glitz-" + containerName + "-" + count).css('border', "dashed 1px");
    $("#glitz-" + containerName + "-" + count).css('border-color', "black");
    selected = null;
    if (propAdded == true) {
        $("#properties").remove();
        propAdded = false;
    }
}

//Selects a widget and adds its properties to the sidebar.
function selectContainer(containerId, containerN) {
    var containerName = '';
    var propsDict;
    if (containerN == 1) {
        containerName = 'playlist';
        propsDict = playlistProps;
    }
    else if (containerN == 2) {
        containerName = 'clock';
        propsDict = clockProps;
    }
    else if (containerN == 3) {
        containerName = 'rss';
        propsDict = rssProps;
    }
    else if (containerN == 4) {
        containerName = 'weather';
        propsDict = weatherProps;
    }
    if ($("#glitz-" + containerName + "-" + containerId).length == 0) {
        return;
    }
    if (selected != containerN) {
        deselectContainer(selected)
    }
    selected = containerN;
    $("#glitz-" + containerName + "-" + containerId).css('border', "");
    $("#glitz-" + containerName + "-" + containerId).css('border', "solid");
    $("#glitz-" + containerName + "-" + containerId).css('border-color', "blue");

    $("#glitz-" + containerName + "-" + containerId).mousemove(function () {
        if(propsDict.left == '' || propsDict.width == '') {
            var coord = $(this).position();
            var parentCoord = $("#glitz-container-1").position();
            var width = $(this).width();
            var height = $(this).height();
            $("#leftField").val(coord.left - parentCoord.left);
            $("#topField").val(coord.top - parentCoord.top);
            $("#widthField").val(width);
            $("#heightField").val(height);
        }
        else {
            $("#leftField").val(propsDict.left);
            $("#topField").val(propsDict.top);
            $("#widthField").val(propsDict.width);
            $("#heightField").val(propsDict.height);
        }
        
    }).mouseup(function () {
        //pass
    });

    if (propAdded == false) {

        if (containerN == 1) {
            containerName = 'playlist'
            var HEADER = "<div class=\"row row-l propheader\"><div class=\"col-lg-6\" style=\"width:50%;\">Playlist Properties</div><div class=\"col-lg-6\" style=\"width:50%;\"></div> </div>";
            var colorCode = '#dddddd';
            if (playlistProps.background != '') {
                colorCode = playlistProps.background;
            }
            var DIMENSIONS = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\">Top:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"topField\" onchange=\"updateProperties(1)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Left:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"leftField\" onchange=\"updateProperties(1)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div><div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Width:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"widthField\" onchange=\"updateProperties(1)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Height:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"heightField\" onchange=\"updateProperties(1)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div>";

            var CONTAINER_BG = "<div class=\"row row-l\"><div class=\"col-lg-6 proplabel\" style=\"width:50%;\">Container Background:</div><div class=\"col-lg-6\" style=\"width:50%;\"><input onchange=\"updateProperties(1)\" type=\"color\" id=\"xcolor" + containerId + "\" value=\"" + colorCode + "\"  class=\"inputStyle colorselector\" /></div></div>";
            /*TODO:  Do AJAX call here to fetch names and IDs of playlists created previously by the user. 
            You should probably create a funtion for that and have it populate a dictionary that is accessible globally*/

            var SELECT_PLAYLIST = "<div class=\"row row-l\"><div class=\"col-lg-6 proplabel\" style=\"width:50%;\">Select Playlist:</div><div class=\"col-lg-6\" style=\"width:50%;\"><select onchange=\"updateProperties(1)\" id=\"playlistList\" class=\"inputStyle\"><option default value=\"0\">Select a Playlist</option><option value=\"1\">Gulder Playlist</option><option value=\"2\">Tecno Playlist</option> <option value=\"3\">Yudala Playlist</option></select></div> </div>";
            var DELETE_BTN = "<div class=\"row row-l\"><div class=\"proplabel text-center\"><button class=\"btn-no-outline\" onclick=\"xremoveWidget(" + containerId + "," + containerN + ")\">DELETE</button></div></div>";

            $(".sidebar").append("<div id=\"properties\">" + HEADER + DIMENSIONS + CONTAINER_BG + SELECT_PLAYLIST + DELETE_BTN + "</div>");
            propAdded = true;
            if (playlistProps.selected != '') {
                $('select[id="playlistList"]').find('option:contains(' + playlistProps.selected + ')').attr("selected", true);
            }
        }
        else if (containerN == 2) {
            containerName = 'clock'
            var HEADER = "<div class=\"row row-l propheader\"><div class=\"col-lg-6\" style=\"width:50%;\">Clock Properties</div><div class=\"col-lg-6\" style=\"width:50%;\"></div> </div>";
            var colorCode = '#dddddd';
            if (clockProps.background != '') {
                colorCode = clockProps.background;
            }
            var DIMENSIONS = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\">Top:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"topField\" onchange=\"updateProperties(2)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Left:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"leftField\" onchange=\"updateProperties(2)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div><div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Width:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"widthField\" onchange=\"updateProperties(2)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Height:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"heightField\" onchange=\"updateProperties(2)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div>";

            var CONTAINER_BG = "<div class=\"row row-l\"><div class=\"col-lg-6 proplabel\" style=\"width:50%;\">Container Background:</div><div class=\"col-lg-6\" style=\"width:50%;\"><input onchange=\"updateProperties(2)\" type=\"color\" id=\"xcolor" + containerId + "\" value=\"" + colorCode + "\"  class=\"inputStyle colorselector\" /></div></div>";
            var CLOCK_TYPE = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Clock Type:</div><div class=\"col-lg-3\" style=\"width:25%;\"><select onchange=\"updateProperties(2)\" id=\"clockList\" class=\"inputStyle\"><option default value=\"0\">Select</option><option value=\"1\">Digital</option><option value=\"2\">Analog</option></select></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Country:</div><div class=\"col-lg-3\" style=\"width:25%;\"><select onchange=\"updateProperties(2)\" id=\"countryList\" class=\"inputStyle\">                        <option default value=\"0\">Select</option><option value=\"1\">Nigeria</option><option value=\"2\">Great Britain</option><option value=\"3\">United States.</option></select></div></div>";
            var DELETE_BTN = "<div class=\"row row-l\"><div class=\"proplabel text-center\"><button class=\"btn-no-outline\" onclick=\"xremoveWidget(" + containerId + "," + containerN + ")\">DELETE</button></div></div>";

            $(".sidebar").append("<div id=\"properties\">" + HEADER + DIMENSIONS + CONTAINER_BG + CLOCK_TYPE + DELETE_BTN + "</div>");
            propAdded = true;
            if (clockProps.type != '') {
                $('select[id="clockList"]').find('option:contains(' + clockProps.type + ')').attr("selected", true);
            }
            if (clockProps.country != '') {
                $('select[id="countryList"]').find('option:contains(' + clockProps.country + ')').attr("selected", true);
            }
        }
        else if (containerN == 3) {
            containerName = 'rss'
            var HEADER = "<div class=\"row row-l propheader\"><div class=\"col-lg-6\" style=\"width:50%;\">RSS Properties</div><div class=\"col-lg-6\" style=\"width:50%;\"></div> </div>";
            var colorCode = '#dddddd';
            if (rssProps.background != '') {
                colorCode = rssProps.background;
            }
            var urlTyped = '';
            if (rssProps.url != '') {
                urlTyped = rssProps.url;
            }
            var refreshTyped = '';
            if (rssProps.refresh != '') {
                refreshTyped = rssProps.refresh;
            }
            var timeTyped = '';
            if (rssProps.time != '') {
                timeTyped = rssProps.time;
            }
            var DIMENSIONS = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\">Top:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"topField\" onchange=\"updateProperties(3)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Left:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"leftField\" onchange=\"updateProperties(3)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div><div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Width:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"widthField\" onchange=\"updateProperties(3)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Height:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"heightField\" onchange=\"updateProperties(3)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div>";

            var CONTAINER_BG = "<div class=\"row row-l\"><div class=\"col-lg-6 proplabel\" style=\"width:50%;\">Container Background:</div><div class=\"col-lg-6\" style=\"width:50%;\"><input onchange=\"updateProperties(3)\" type=\"color\" id=\"xcolor" + containerId + "\" value=\"" + colorCode + "\"  class=\"inputStyle colorselector\" /></div></div>";
            var RSS_FEED = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">URL:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input onchange=\"updateProperties(3)\" type=\"text\" id=\"urlField\" style=\"width:75px;\" class=\"inputStyle\" placeholder=\"http://feeds.example.com\" value=\"" + urlTyped + "\"/></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Transition:</div><div class=\"col-lg-3\" style=\"width:25%;\"><select onchange=\"updateProperties(3)\" id=\"transitionList\" class=\"inputStyle\"><option default value=\"0\">Select</option><option value=\"1\">Scroll Left</option><option value=\"2\">Scroll Right</option></select></div></div><div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Time:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input onchange=\"updateProperties(3)\" type=\"text\" id=\"timeField\" style=\"width:75px;\" class=\"inputStyle\" placeholder=\"in seconds\" value=\"" + timeTyped + "\"/></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Refresh Time: </div><div class=\"col-lg-3\" style=\"width:25%;\"><input onchange=\"updateProperties(3)\" type=\"text\" id=\"refreshField\" style=\"width:75px;\" class=\"inputStyle\" placeholder=\"in seconds\" value=\"" + refreshTyped + "\"/></div></div>";
            var DELETE_BTN = "<div class=\"row row-l\"><div class=\"proplabel text-center\"><button class=\"btn-no-outline\" onclick=\"xremoveWidget(" + containerId + "," + containerN + ")\">DELETE</button></div></div>";

            $(".sidebar").append("<div id=\"properties\">" + HEADER + DIMENSIONS + CONTAINER_BG + RSS_FEED + DELETE_BTN + "</div>");
            propAdded = true;
            if (rssProps.transition != '') {
                $('select[id="transitionList"]').find('option:contains(' + rssProps.transition + ')').attr("selected", true);
            }
        }
        else if (containerN == 4) {
            containerName = 'weather'
            var HEADER = "<div class=\"row row-l propheader\"><div class=\"col-lg-6\" style=\"width:50%;\">Weather Properties</div><div class=\"col-lg-6\" style=\"width:50%;\"></div> </div>";
            var colorCode = '#dddddd';
            if (weatherProps.background != '') {
                colorCode = weatherProps.background;
            }
            var DIMENSIONS = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\">Top:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"topField\" onchange=\"updateProperties(4)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Left:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"leftField\" onchange=\"updateProperties(4)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div><div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Width:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"widthField\" onchange=\"updateProperties(4)\" style=\"width:75px;\" class=\"inputStyle\" /></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Height:</div><div class=\"col-lg-3\" style=\"width:25%;\"><input type=\"text\" id=\"heightField\" onchange=\"updateProperties(4)\" style=\"width:75px;\" class=\"inputStyle\" /></div></div>";

            var CONTAINER_BG = "<div class=\"row row-l\"><div class=\"col-lg-6 proplabel\" style=\"width:50%;\">Container Background:</div><div class=\"col-lg-6\" style=\"width:50%;\"><input onchange=\"updateProperties(4)\" type=\"color\" id=\"xcolor" + containerId + "\" value=\"" + colorCode + "\"  class=\"inputStyle colorselector\" /></div></div>";
            var WEATHER = "<div class=\"row row-l\"><div class=\"col-lg-3 proplabel\" style=\"width:25%;\" class=\"inputStyle\">Temp Unit:</div><div class=\"col-lg-3\" style=\"width:25%;\"><select onchange=\"updateProperties(4)\" id=\"unitList\" class=\"inputStyle\"><option default value=\"0\">Select</option><option value=\"1\">C</option><option value=\"2\">F</option></select></div><div class=\"col-lg-3 proplabel\" style=\"width:15%;\">Country:</div><div class=\"col-lg-3\" style=\"width:25%;\"><select onchange=\"updateProperties(4)\" id=\"countryList\" class=\"inputStyle\"><option default value=\"0\">Select</option><option value=\"1\">Nigeria</option><option value=\"2\">Great Britain</option><option value=\"3\">United States.</option></select></div></div>";
            var DELETE_BTN = "<div class=\"row row-l\"><div class=\"proplabel text-center\"><button class=\"btn-no-outline\" onclick=\"xremoveWidget(" + containerId + "," + containerN + ")\">DELETE</button></div></div>";

            $(".sidebar").append("<div id=\"properties\">" + HEADER + DIMENSIONS + CONTAINER_BG + WEATHER + DELETE_BTN + "</div>");
            propAdded = true;
            if (weatherProps.country != '') {
                $('select[id="countryList"]').find('option:contains(' + weatherProps.country + ')').attr("selected", true);
            }
            if (weatherProps.unit != '') {
                $('select[id="unitList"]').find('option:contains(' + weatherProps.unit + ')').attr("selected", true);
            }
        }

    }
}

//Adds a Playlist widget to the designer.
function addPlaylist(containerId) {
    if (playlistAdded == true) {
        alert("Your layout can only contain one Playlist!");
        return;
    }
    $("#glitz-container-" + containerId).append("<div id=\"glitz-playlist-" + (++playlistCount) + "\" class=\"text-center draggable xcontainer\" onclick=\"selectContainer(" + playlistCount + ", " + 1 + ")\"> Playlist Here</div > ");
    playlistAdded = true;
}

//Adds a widget to the designer.
function addWidget(containerId) {
    var selectedWidget = $('#widgetList').val();
    if (selectedWidget == 0) {
        return;
    }
    else if (selectedWidget == 1) {
        if (clockAdded == true) {
            alert("Your layout can only contain one Clock Widget!");
            return;
        }
        $("#glitz-container-" + containerId).append("<div id=\"glitz-clock-" + (++clockCount) + "\" class=\"text-center draggable xcontainer\" onclick=\"selectContainer(" + clockCount + ", " + 2 + ")\">Clock Widget here</div>");
        clockAdded = true;
    }
    else if (selectedWidget == 2) {
        if (rssAdded == true) {
            alert("Your layout can only contain one RSS Widget!");
            return;
        }
        $("#glitz-container-" + containerId).append("<div id=\"glitz-rss-" + (++rssCount) + "\" class=\"text-center xcontainer draggable\"onclick=\"selectContainer(" + rssCount + ", " + 3 + ")\">RSS Widget here</div>");
        rssAdded = true;
    }
    else if (selectedWidget == 3) {
        if (weatherAdded == true) {
            alert("Your layout can only contain one Weather Widget!");
            return;
        }
        $("#glitz-container-" + containerId).append("<div id=\"glitz-weather-" + (++weatherCount) + "\" class=\"text-center xcontainer draggable\"onclick=\"selectContainer(" + weatherCount + ", " + 4 + ")\"> Weather Widget here</div>");
        weatherAdded = true;
    }


}

/*Validates all fields before generating XML. Every possible situation must be checked here. Every. Possible. Situation. 
These include checks for valid URLs, valid time (datatype=number) etc */
function validateAll() {
    if (playlistAdded == true) {
        if (playlistProps.selected == '' || playlistProps.selected == 'Select a Playlist') {
            alert('You have to select a Playlist!');
            document.getElementById("playlistList").focus();
            return false;
        }
    }
    if (clockAdded == true) {
        if (clockProps.country == '' || clockProps.country == 'Select') {
            alert('You have to select a Country!');
            document.getElementById("countryList").focus();
            return false;
        }
        if (clockProps.type == 'Select' || clockProps.type == '') {
            alert('You have to select a Clock Type!');
            document.getElementById("clockList").focus();
            return false;
        }
    }
    if (rssAdded == true) {
        if (rssProps.transition == '' || rssProps.transition == 'Select') {
            alert('You have to select a Transition!');
            document.getElementById("transitionList").focus();
            return false;
        }
        if (rssProps.refresh == '') {
            alert('You have to enter a Refresh time in seconds! e.g 3600');
            document.getElementById("refreshField").focus();
            return false;
        }
        if (rssProps.time == '') {
            alert('You have to enter a Time in seconds! e.g 120');
            document.getElementById("timeField").focus();
            return false;
        }
        if (rssProps.url == '') {
            //try to validate URL entered here
            alert('You have to enter a valid URL!');
            document.getElementById("urlField").focus();
            return false;
        }
    }
    if (weatherAdded == true) {
        if (weatherProps.country == '' || weatherProps.country == 'Select') {
            alert('You have to select a Country!');
            document.getElementById("countryList").focus();
            return false;
        }
        if (weatherProps.unit == 'Select' || weatherProps.unit == '') {
            alert('You have to select a Temperature Unit!');
            document.getElementById("unitList").focus();
            return false;
        }
    }
    if ($("#layoutName").val() == '') {
        alert('You have to enter a Layout Name!');
        document.getElementById("layoutName").focus();
        return false;
    }
    return true;
}

//This generates the XML that we will be saved.
function generateXML() {
    /*var baseContainerHTML = $("#container-wrapper").html();
    console.log(baseContainerHTML);
    return baseContainerHTML*/

    var PLAYLIST_XML = '';
    var CLOCK_XML = '';
    var RSS_XML = '';
    var WEATHER_XML = '';

    if (playlistAdded == true) {
        /* Remember that previously created playlists were gotten via an AJAX call above (selectContainer).
        The properties of the final selected Playlist will then be used here for the PLAYLIST_XML var*/
        PLAYLIST_XML = "<Container top=\"" + playlistProps.top + "\" left=\"" + playlistProps.left + "\" width=\"" + playlistProps.width + "\" height=\"" + playlistProps.height + "\" backgroundColor=\"" + playlistProps.background + "\"> <Playlist> <Video url=\"https://player.vimeo.com/video/141135097\" time=\"240\" expiryDate=\"\"/><Image url=\"https://pbs.twimg.com/media/CzLJvsLUsAAcDq-.jpg\" time=\"30\" expiryDate=\"\"/> <Video  url=\"https://player.vimeo.com/video\192827333\" time=\"300\" expiryDate=\"\"/> <Website url=\"http://news.ycombincator.com\"   time=\"100\" refreshTime=\"10\" expiryDate=\"\"/><Image url=\"https://pbs.twimg.com/media/CzLJvsLUsAAcDq-.jpg\" time=\"1\" expirtyDate=\"\"/> <Image url=\"https://pbs.twimg.com/media/CzLJvsLUsAAcDq-.jpg\" time=\"100\" expirtyDate=\"\"/> <Video   url=\"https://player.vimeo.com/video/141135097\" time=\"300\" expiryDate=\"\"/> </Playlist> </Container> ";
    }
    if (clockAdded == true) {
        CLOCK_XML = "<Container top=\"" + clockProps.top + "\" left=\"" + clockProps.left + "\" width=\"" + clockProps.width + "\" height=\"" + clockProps.height + "\" backgroundColor=\"" + clockProps.background + "\"> <Widget> <Clock type=\"" + clockProps.type + "\" country=\"" + clockProps.country + "\"/> </Widget> </Container> ";
    }
    if (rssAdded == true) {
        RSS_XML = "<Container top=\"" + rssProps.top + "\" left=\"" + rssProps.left + "\" width=\"" + rssProps.width + "\" height=\"" + rssProps.height + "\" backgroundColor=\"" + rssProps.background + "\"> <Widget> <Rss url=\"" + rssProps.url + "\" time=\"" + rssProps.time + "\" transition=\"" + rssProps.transition + "\" refreshTime=\"" + rssProps.refresh + "\"/> </Widget> </Container> ";
    }
    if (weatherAdded == true) {
        WEATHER_XML = "<Container top=\"" + weatherProps.top + "\" left=\"" + weatherProps.left + "\" width=\"" + weatherProps.width + "\" height=\"" + weatherProps.height + "\" backgroundColor=\"" + weatherProps.background + "\"> <Widget> <Weather country=\"" + weatherProps.country + "\" type=\"" + weatherProps.unit + "\"/> </Widget> </Container> ";
    }
    PAYLOAD = "<Application backgroundImage=\"\" backgoungColor=\"" + $("#color1").val() + "\" title=\"" + $("#layoutName").val() + "\"> " + PLAYLIST_XML + CLOCK_XML + RSS_XML + WEATHER_XML + " </Application>";
    return PAYLOAD;
}

//Saves the generated layout to the DB after performing all sanity chcecks.
function saveLayout() {
    var bool = validateAll()
    if (bool == true) {
        console.log('All data valid.');
    }
    else {
        console.log('Some data are invalid.');
        return;
    }
    var generatedXML = generateXML();
    /*POST generatedXML here via AJAX and notify user in appropriate way.*/

    /* The next three lines displays the generatedXML on a new tab. This is only for testing purposes.*/
    var prettyprint = String(generatedXML).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    var w = window.open();
    $(w.document.body).html("<p>" + prettyprint + "</p");

}

/* Target elements with the "draggable" class*/
interact('.draggable')
    .draggable({
        snap: {
            targets: [
                interact.createSnapGrid({ x: 30, y: 30 })
            ],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
        },
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            /*if (playlistAdded) {
                playlistProps.top = Math.round(y);
                playlistProps.left = Math.round(x);
                playlistProps.width = Math.round(event.rect.width);
                playlistProps.height = Math.round(event.rect.height);
            }
            else if (clockAdded) {
                clockProps.top = Math.round(y);
                clockProps.left = Math.round(x);
                clockProps.width = Math.round(event.rect.width);
                clockProps.height = Math.round(event.rect.height);
            }
            else if (rssAdded) {
                rssProps.top = Math.round(y);
                rssProps.left = Math.round(x);
                rssProps.width = Math.round(event.rect.width);
                rssProps.height = Math.round(event.rect.height);
            }
            else if (weatherAdded) {
                weatherProps.top = Math.round(y);
                weatherProps.left = Math.round(x);
                weatherProps.width = Math.round(event.rect.width);
                weatherProps.height = Math.round(event.rect.height);
        }*/
        }
    })
    .resizable({
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
    })
    .on(['resizemove'], function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
        //console.log('on resizemove wxh: ' + Math.round(event.rect.width) + '×' + Math.round(event.rect.height));
        if (playlistAdded) {
            playlistProps.top = Math.round(y);
            playlistProps.left = Math.round(x);
            playlistProps.width = Math.round(event.rect.width);
            playlistProps.height = Math.round(event.rect.height);
        }
        else if (clockAdded) {
            clockProps.top = Math.round(y);
            clockProps.left = Math.round(x);
            clockProps.width = Math.round(event.rect.width);
            clockProps.height = Math.round(event.rect.height);
        }
        else if (rssAdded) {
            rssProps.top = Math.round(y);
            rssProps.left = Math.round(x);
            rssProps.width = Math.round(event.rect.width);
            rssProps.height = Math.round(event.rect.height);
        }
        else if (weatherAdded) {
            weatherProps.top = Math.round(y);
            weatherProps.left = Math.round(x);
            weatherProps.width = Math.round(event.rect.width);
            weatherProps.height = Math.round(event.rect.height);
        }
    });


//Function that gets called at the end of every drag event. Sets the properties of the dragged container.
function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //console.log('position left and top: ' + x + '  ' + y)

}

// this is used later in the resizing and gesture 
window.dragMoveListener = dragMoveListener;
