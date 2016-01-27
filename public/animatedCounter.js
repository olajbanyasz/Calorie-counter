'use strict'

function animatedCounter(id, start, end, speed) {
    var current = start;
    var increment;
    var obj = document.getElementById(id);
    obj.innerText = current + ' kcal';
    var timer = setInterval(function() {
        increment = Math.floor(Math.pow(end-current, 0.80));
        var size = Math.floor(current/end);
        current += increment;
        var size = (end - current)/end;
        obj.style.fontSize = (1-size)*100 + '%';
        obj.innerText = current + ' kcal';
        if (current === end) {
          obj.style.fontSize = (1-size)*150 + '%';
          clearInterval(timer);
        }
    }, speed);
}
