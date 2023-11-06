var timer = -1;
var timerTop = 9.9;
var timerInterval;
var text = "";

var checker = 0;

function check(el) {
    var curOverf = el.style.overflow;

    if (!curOverf || curOverf === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverf;

    return isOverflowing;
}

function logic(event) {
    var timerDiv = document.getElementById('timer');
    var worder = document.getElementById('worder');
    var spanOld = worder.firstChild;
    var span = worder.lastChild;

    if (timer == -1) {
        timer = timerTop;
        timerDiv.textContent = timer;
        timerInterval = setInterval(() => {
            timer -= 0.1;

            if (timer >= 0 && timer < 0.1) {
                timerDiv.textContent = "Words: " + usedWords.length;

                span.style.color = "red";
                document.removeEventListener('keydown', logic);

                clearInterval(timerInterval);
                return;
            }

            timerDiv.textContent = timer.toString().slice(0, timer.toString().indexOf('.') + 2);
        }, 100);
    }

    if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (text.length == 0 && event.key.toUpperCase() != span.textContent) {
            text += span.textContent+event.key.toUpperCase();
        }else {
            text += event.key.toUpperCase();
        }

        if (span.textContent != text && text.length > 1) {
            span.textContent = text;
        }
    }

    if (event.keyCode == 8 && text.length > 0) {
        text = text.slice(0, text.length - 1);
        
        if (text.length > 0) {
            span.textContent = text;
        }

    }

    console.log(text);

    if (event.keyCode == 13) {
        if (!usedWords.includes(span.textContent.toLowerCase())) {
            if (words.includes(span.textContent.toLowerCase())) {
                usedWords.push(span.textContent.toLowerCase());

                spanOld.textContent += span.textContent.slice(0, span.textContent.length - 1);
                span.textContent = span.textContent[span.textContent.length - 1];
                text = "";

                clearInterval(timerInterval);

                timer = timerTop;
                timerDiv.textContent = timer;
                timerInterval = setInterval(() => {
                    timer -= 0.1;

                    if (timer >= 0 && timer < 0.1) {
                        timerDiv.textContent = "Words: " + usedWords.length;

                        span.style.color = "red";
                        document.removeEventListener('keydown', logic);

                        clearInterval(timerInterval);
                        return;
                    }

                    var cont = timer.toString().slice(0, timer.toString().indexOf('.') + 2);
                    if (cont.length < 3) {
                        cont += ".0";
                    }
                    timerDiv.textContent = cont;
                }, 100);
            }
        } else {
            timerDiv.textContent = "Words: " + usedWords.length;

            span.style.color = "red";
            document.removeEventListener('keydown', logic);

            clearInterval(timerInterval);
        }
    }
}

document.addEventListener('keydown', logic);