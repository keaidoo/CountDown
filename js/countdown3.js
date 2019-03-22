var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 60;
var RADIUS = 8;

//限制： 小时二位数 不超过4天
var endTime = new Date(2019, 2, 23, 18, 15, 26); // 注意！！！：data中的参数第二个表示月份，是由0-11表示的。0 - 一月；11- 十二月
var curShowTimeSecond = 0; // 现在倒计时需要多少毫秒

window.onload = function() {
        var canvas = document.getElementById("canvas")
        var context = canvas.getContext("2d")
        canvas.width = WINDOW_WIDTH
        canvas.height = WINDOW_HEIGHT
 curShowTimeSecond = getCurShowTimeSecond();   //curShowTimeSecond：当前总共的毫秒数
    
    // 动画效果

        curShowTimeSecond = getCurShowTimeSecond()
        setInterval(
            function() {
                render(context);
                update();
            },
            50 //单位ms，每50ms变化一次
        );
    }
    
function getCurShowTimeSecond() {
    var curTime = new Date(); // 获取当前的时间是多少
    var ret = endTime.getTime() - curTime.getTime(); //ret 获取截止时间与当前时间相差的毫秒数
    ret = Math.round(ret / 1000); // 将毫秒转换成秒
    return ret >= 0 ? ret : 0; // 判断 ret，倒计时结束，函数返回0.
}

function update() {
    var nextShowTimeSeconds = getCurShowTimeSecond();
    var nextHours = parseInt(nextShowTimeSeconds / 3600); // 一共需要多少个小时
    var nextMinute = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSecond = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSecond / 3600); // 一共需要多少个小时
    var curMinute = parseInt((curShowTimeSecond - curHours * 3600) / 60);
    var curSecond = curShowTimeSecond % 60;

    if (nextSecond != curSecond) {
        curShowTimeSecond = nextShowTimeSeconds
    }
}

// 时间更新函数

function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
    var hours = parseInt(curShowTimeSecond / 3600); // 一共需要多少个小时
    var minute = parseInt((curShowTimeSecond - hours * 3600) / 60);
    var second = curShowTimeSecond % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt); // 小时   
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt); // 每个字水平位置直径7,7*2 = 14半径+1 = 15          
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt); // 冒号 （4*2+1）= 9  digit.js中 10代表 ：    
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), cxt); // 分钟 
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt); // 冒号 （4*2+1）= 9  digit.js中 10代表 ：
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), cxt); // 秒
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), cxt);
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "#005588";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                // 圆心位置公式
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}