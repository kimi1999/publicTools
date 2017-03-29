$(function(){
    var options = {
        autoPlay: false,
        nextButton: ".next",
        prevButton: ".prev",
        preloader: "#sequence-preloader",
        prependPreloader: false,
        prependPreloadingComplete: "#sequence-preloader, #slideshow",
        prependNextButton: false,
        prependPrevButton: false,
        pauseIcon: false,
        animateStartingFrameIn: false, 
        delayDuringOutInTransitions: false,
        afterPreload: function(){
            $(".prev, .next").fadeIn(500);
            if(!slideShow.transitionsSupported){
                $("#slideshow").animate({"opacity": "1"}, 1000);
            }
        }
    };
    var slideShow = $("#slideshow").sequence(options).data("sequence");
    if(!slideShow.transitionsSupported || slideShow.prefix == "-o-"){
        $("#slideshow").animate({"opacity": "1"}, 1000);
        slideShow.preloaderFallback();
    }

  

    
});