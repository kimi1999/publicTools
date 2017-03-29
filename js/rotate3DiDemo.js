$(function(){    
    function mySideChange(front) {
        if (front) {
            $(this).parent().find('.front').show();
            $(this).parent().find('.back').hide();
            
        } else {
            $(this).parent().find('.front').hide();
            $(this).parent().find('.back').show();
        }
    }    
    
    $('#rotate-cont li').hover(
        function () {
            $(this).find('div').stop().rotate3Di('flip', 1000, {direction: 'clockwise', sideChange: mySideChange});
        },
        function () {
            $(this).find('div').stop().rotate3Di('unflip', 500, {sideChange: mySideChange});
        }
    );
    
});