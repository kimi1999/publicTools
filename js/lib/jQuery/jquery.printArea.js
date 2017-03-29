(function ($) {
    var printAreaCount = 0;
    $.fn.printArea = function () {
        var ele = $(this);
        var idPrefix = "printArea_";
        removePrintArea(idPrefix + printAreaCount);
        printAreaCount++;
        var iframeId = idPrefix + printAreaCount;
        //var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
        var iframeStyle = 'position:absolute; width:auto;height:auto;left:-500px;';
        iframe = document.createElement('IFRAME');
        $(iframe).attr({
            style: iframeStyle,
            id: iframeId
        });
        document.body.appendChild(iframe);
        var doc = iframe.contentWindow.document;
        $(document).find("link").filter(function () {
            return $(this).attr("rel").toLowerCase() == "stylesheet";
        }).each(
                function () {
                    doc.write('<link type="text/css" rel="stylesheet" href="'
                            + $(this).attr("href") + '" >');
                });
        console.log($(ele).html());
        doc.write('<div class="' + $(ele).attr("class") + '" style="font-size:13px;margin-left:5px;">' + $(ele).html()
                + '</div>');
        doc.close();
        //var frameWindow = iframe.contentWindow;
        var frameWindow = document.getElementById(iframeId).contentWindow;
        frameWindow.close();
        frameWindow.focus();
        frameWindow.print();
    }
    var removePrintArea = function (id) {
        $("iframe#" + id).remove();
    };
})(jQuery);