
$(function(){
    var aa = function(v,flag){
        var chartArr = [],
            splitArr = [],
            _date = null,
            reV = "";
        var addZero = function(n){
            return n<10 ? "0"+n : n;
        }
        var joinStr = function(i){
            switch(chartArr[i]){
                case "YYYY":
                    reV += addZero(_date.getFullYear());
                    break;
                case "MM":
                    reV += addZero(_date.getMonth()+1);
                    break;
                case "DD":
                    reV += addZero(_date.getDate());
                    break;
                case "hh":
                    reV += addZero(_date.getHours());
                    break;
                case "mm":
                    reV += addZero(_date.getMinutes());
                    break;
                case "ss":
                    reV += addZero(_date.getSeconds());
                    break;
            }
            if(splitArr[i]){
                reV += splitArr[i];
            }
        }
        if(typeof flag=="string" && flag.length>0){
            flag = flag.replace(/^[ ]+/g,"");
            flag = flag.replace(/[ ]+$/g,"");
            var t = 0;
            if(!v)return "param error";
            t = parseInt(v);

            console.log(t.toString());
            console.log(typeof 10);
            if(t.toString() != "NaN"){
                _date = new Date(t);
                chartArr = flag.split(/[^a-z]+/i);
                splitArr = flag.split(/[a-z]+/i);

                if(splitArr[0]==""){splitArr.shift();}
                if(splitArr[splitArr.length-1]==""){splitArr.pop();}

                for(var i=0; i<chartArr.length; i++){
                    joinStr(i);
                }
                // console.log(_date);
                console.log(chartArr);
                console.log(splitArr);
                console.log("格式化后的时间为： "+reV);
                return reV;
            }
            else{
                console.log("time param is not a number");
                return "param error";
            }

        }
        else{
            if(v){
                console.log("format param is needed");
                return v;
            }
            else{
                console.log("time param is needed");
                return "param error";
            }
        }
    }

    aa("1471512075155","YYYY-MM-DD hh:mm:ss");
});