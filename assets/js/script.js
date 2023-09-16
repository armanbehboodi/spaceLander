$(function () {
    var $body = $('body'), $rocket = $body.find('#sl-rocket'), $mainFlame = $('#sl-flame-bottom'), $sideFlames = $('.sl-side-flames'), $engineSoundEffect = $('#sl-audio-effect-engine'), $explosionSoundEffect = $('#sl-audio-effect-explosion'), $velocity = $('.sl-control-velocity p:last-child'), $deviation = $('.sl-control-deviation p:last-child'), $finalMessage = $('#sl-final-message'), deviceWidth = $body.width(), deviceHeight = $body.height(), height = Number($rocket.css('top').replace('px', '')), deviation = 10, velocity = 0, angle = 0, numberOfStars = 1, missionDone = false;
    $finalMessage.find('a').attr('href', window.location.href);
    // background handler (blinking stars)
    while (numberOfStars < 155) {
        var $star = $("<span class=\"sl-star\" id=\"star-no-" + numberOfStars + "\">"), dimension = Math.round(Math.random() * 5), top_1 = Math.round(Math.random() * deviceHeight), left = Math.round(Math.random() * deviceWidth);
        $star.css({
            width: dimension + "px",
            height: dimension + "px",
            top: top_1 + "px",
            left: left + "px",
            animationDuration: Math.floor(Math.random() * 8) + 3 + "s"
        });
        $body.find(".sl-stars").append($star);
        numberOfStars++;
    }
    // falling simulator function
    var fallingSimulator = function () {
        var correctedDeviation = deviation % 360;
        if (correctedDeviation > 180)
            correctedDeviation -= 360;
        $velocity.html(Math.abs((velocity * 36)).toFixed(0) + " km/h")
            .css({ color: "" + (Math.abs(velocity) > 1 ? '#c51212' : '#00db32') });
        $deviation.html(correctedDeviation.toFixed(0) + " deg")
            .css({ color: "" + (Math.abs(correctedDeviation) > 5 ? '#c51212' : '#00db32') });
        if (Number($rocket.css('bottom').replace('px', '')) > 0) {
            $rocket.css({ top: (height += velocity) + "px", transform: "rotate(" + (deviation += angle) + "deg)" });
        }
        else {
            if (Math.abs(correctedDeviation) > 5 || velocity > 1) {
                var explosionTimer_1 = 0, explosionInterval_1 = setInterval(function () {
                    if (explosionTimer_1 < 50) {
                        explosionTimer_1++;
                        $rocket.css({ filter: "blur(" + explosionTimer_1 + "px)" });
                    }
                    else {
                        clearInterval(explosionInterval_1);
                        $rocket.remove();
                    }
                }, 15);
                $explosionSoundEffect[0].play();
            }
            clearInterval(fallingInterval);
            missionDone = true;
            $finalMessage.css({ left: '0' });
        }
    };
    // falling simulation timer
    var fallingInterval = setInterval(function () {
        velocity += 0.005;
        if (deviation > 0 && deviation % 360 < 180) {
            angle += 0.001;
        }
        else {
            angle -= 0.001;
        }
        fallingSimulator();
    }, 25);
    // activating rocket controllers
    $body.on('keydown touchstart', function (e) {
        var isTouchEvent = e.type === "touchstart", absDeviation = Math.abs(deviation % 360), key = !isTouchEvent ? e.key : $(e.target).attr("id");
        if (((key.charCodeAt(0) == 65 && key !== 'ArrowDown') || (isTouchEvent && key)) && !missionDone) {
            $engineSoundEffect[0].play();
            if (isTouchEvent)
                $("#" + $(e.target).attr("id")).css({ background: "rgba(255, 255, 255, 0.1)" });
            switch (key) {
                case 'ArrowUp':
                    $mainFlame.css({ height: Math.random() * 11 + 15 + "px" });
                    if (absDeviation > 90 && absDeviation < 270) {
                        velocity += 0.025;
                    }
                    else {
                        velocity -= 0.025;
                    }
                    break;
                case 'ArrowRight':
                    $('#sl-flame-right').css({ width: Math.random() * 6 + 10 + "px" });
                    angle -= 0.01;
                    break;
                case 'ArrowLeft':
                    $('#sl-flame-left').css({ width: Math.random() * 6 + 10 + "px" });
                    angle += 0.01;
                    break;
            }
        }
        // reload game with alt key
        if (key === "Alt" && missionDone)
            location.reload();
    })
        .on('keyup touchend', function () {
        $mainFlame.css({ height: '0' });
        $sideFlames.css({ width: '0' });
        $engineSoundEffect[0].pause();
    });
});
