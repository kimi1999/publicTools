/** HTML5  本地图片预览 ****/    
function toShowLocalImg(inputData,calbk){
    /****************** html5 图片本地预览 start *****************/
    var oFReader = new FileReader(), 
        rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
    oFReader.onload = function (oFREvent){
        var p = new Image();
        p.src = oFREvent.target.result;
        if(calbk){
            calbk(p);
        }
        
    };
    var preloadImg = function(inputData){
        var oFile = inputData[0].files[0],
            fileName = oFile.name,
            size = oFile.size,
            type = oFile.type;
        if (!rFilter.test(oFile.type)) { alert("请选择图片文件!"); return; }
        oFReader.readAsDataURL(oFile);
    }
    preloadImg(inputData);
}  

$(function(){
    
    jQuery(".img-btn-wrap>a").on("click",function(){
        jQuery(this).next().trigger("click");
    });
    
    jQuery(".img-cont").on("change",".img-btn-wrap>input",function(){
        var inputHtml = '<input type="file">',
            imgIndex = jQuery(this).parents(".img-cont").attr("img-index");
        toShowLocalImg(jQuery(this),function(img){
            /*img 为返回的图片对象 */
            var nowImgCont = jQuery(".img-cont[img-index="+imgIndex+"]"),
                nowImgDom =  nowImgCont.children("img:first"),
                nowBtnCont = nowImgCont.children(".img-btn-wrap"),
                nowImgShade = nowImgCont.find(".img-shade>img");
            
            nowImgShade.attr("src",img.src);
            nowImgShade[0].onload = function(){
                var imgWidth = nowImgShade.width(),
                    imgHeight = nowImgShade.height(),
                    maxWidth = maxHeight = nowImgCont.width();
                console.log(maxHeight);
                console.log(maxWidth);
                if(!nowBtnCont.hasClass("active")){
                    nowImgCont.css({"height":"auto","width":"auto"});
                    nowBtnCont.addClass("active");
                }
                if(imgWidth>=imgHeight){
                    var dist = (maxHeight-maxWidth*imgHeight/imgWidth)/2+"px";
                    nowImgDom.css({"width":maxWidth+"px","margin-top":dist,"margin-bottom":dist,"margin-left":0});
                }
                else{
                    nowImgDom.css({"width":maxHeight*imgWidth/imgHeight+"px","margin-left":(maxWidth-maxHeight*imgWidth/imgHeight)/2+"px","margin-top":0});
                }
                nowImgDom.attr("src",img.src);
                nowImgDom.show();
                
            }
        });
        jQuery(this).parent().append(inputHtml);
        jQuery(this).remove();
    });
});
