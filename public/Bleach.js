// Function to listen for the play event and request fullscreen
function onPlayerStateChange(event) {
    var iframe = document.getElementById('youtube-player');
    if (event.data == YT.PlayerState.PLAYING && !isFullScreen()) {
      // Send a message to the iframe to request fullscreen
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      
      // Delay the fullscreen request slightly to allow the player to respond to the play event
      setTimeout(() => {
        if (!isFullScreen()) {
          requestFullScreen(iframe);
        }
      }, 500);
    }
  }
  
  // Function to make the iframe go fullscreen
  function requestFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  }
  
  // Function to detect if the document is in fullscreen mode
  function isFullScreen() {
    return document.fullscreenElement ||
           document.mozFullScreenElement ||
           document.webkitFullscreenElement ||
           document.msFullscreenElement;
  }
  
  // YouTube API setup
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

function scrollToSection(sectionId) {
  // Scroll where you want to with provided ID.
  var target = document.getElementById(sectionId);

  // Scroll smoothly <(＿　＿)>
  target.scrollIntoView({ behavior: "smooth" });
}