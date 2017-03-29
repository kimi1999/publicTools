KindEditor.ready(function(K) {

    K.create('textarea[id="myEditor"]', {
        autoHeightMode : true,
        afterCreate : function() {
            this.loadPlugin('autoheight');
        }
    });
});