window.onload = function () {
    let messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    document.body.appendChild(messageDiv);

    let messages = [
      'Dear Cori,',
      'I love you dearly and walk with you through each of our journeys.',
      'Please finish reading the following poem, then hold down "c" and move your mouse through the poem until no poem remains,'
    ];

    function fadeOut(element, callback) {
        let op = 1;  // initial opacity
        let timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
                callback && callback();
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    function fadeIn(element, callback) {
        let op = 0.1;  // initial opacity
        element.style.display = 'block';
        let timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
                callback && callback();
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 50);
    }

    function showMessage(index) {
        if (index >= messages.length) {
            window.location.href = '/message.html';
            return;
        }

        let message = document.createElement('p');
        message.textContent = messages[index];
        message.style.opacity = 0; // Start with invisible text
        messageDiv.appendChild(message);

        fadeIn(message, function() {
            setTimeout(function () {
                fadeOut(message, function() {
                    message.remove();
                    showMessage(index + 1);
                });
            }, 3000); // Time the message stays visible
        });
    }

    showMessage(0);
}
