var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 60;
var RADIUS = 8;//半径

window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    render(context);
}

function render(cxt) {

    var hours = 12;
    var minutes = 36;
    var seconds = 59;
    
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);// 小时   
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);// 每个字水平位置7直径,7*2 = 14半径+1 = 15         
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);// 冒号 （4*2+1）= 9  digit.js中 10代表 ：    
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);// 分钟 
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);  
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);// 冒号 （4*2+1）= 9  digit.js中 10代表 ：    
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);// 秒
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);
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