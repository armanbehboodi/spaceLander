$(function () {
    let $body: any = $('body'),
        $rocket: any = $body.find('#sl-rocket'),
        $mainFlame: any = $('#sl-flame-bottom'),
        $sideFlames: any = $('.sl-side-flames'),
        $engineSoundEffect: any = $('#sl-audio-effect-engine'),
        $explosionSoundEffect: any = $('#sl-audio-effect-explosion'),
        deviceWidth: number = $body.width(),
        deviceHeight: number = $body.height(),
        height: number = Number($rocket.css('top').replace('px', '')),
        deviation: number = 10,
        velocity: number = 0,
        angle: number = 0,
        numberOfStars: number = 1,
        missionDone: boolean = false;

    //background handler (blinking stars)
    while (numberOfStars < 155) {
        let $star: JQuery = $(`<span class="sl-star" id="star-no-${numberOfStars}">`),
            demintion: number = Math.round(Math.random() * 5),
            top: number = Math.round(Math.random() * deviceHeight),
            left: number = Math.round(Math.random() * deviceWidth);

        $star.css({
            width: `${demintion}px`,
            height: `${demintion}px`,
            top: `${top}px`,
            left: `${left}px`,
            animationDuration: `${Math.floor(Math.random() * 8) + 3}s`
        });

        $body.find(".sl-stars").append($star);
        numberOfStars++;
    }

    //falling simulator function
    const fallingSimulator = (): void => {
        if (Number($rocket.css('bottom').replace('px', '')) > 0) {
            $rocket.css({top: `${height += velocity}px`, transform: `rotate(${deviation += angle}deg)`});
        } else {
            if (Math.abs(deviation) > 5 || velocity > 1) {
                let explosionTimer: number = 0,
                    explosionInterval: number = setInterval(() => {
                        if (explosionTimer < 50) {
                            explosionTimer++;
                            $rocket.css({filter: `blur(${explosionTimer}px)`});
                        } else {
                            clearInterval(explosionInterval);
                            $rocket.remove();
                        }
                    }, 15);
                $explosionSoundEffect[0].play();
            }
            missionDone = true;
            clearInterval(fallingInterval);
        }
    }

    //falling simulation timer
    let fallingInterval: number = setInterval((): void => {
        velocity += 0.005;
        if (deviation > 0 && deviation < 180) {
            angle += 0.001;
        } else {
            angle -= 0.001;
        }
        fallingSimulator();
    }, 25);

    //activating rocket controllers
    $body.on('keydown', function (e): void {
        let key = e.key;

        if (key.charCodeAt(0) == 65 && key !== 'ArrowDown' && !missionDone) {
            $engineSoundEffect[0].play();
            switch (key) {
                case 'ArrowUp':
                    $mainFlame.css({height: `${Math.random() * 11 + 15}px`});
                    if (Math.abs(deviation) > 90) {
                        velocity += 0.025;
                    } else {
                        velocity -= 0.025;
                    }
                    break;
                case 'ArrowRight':
                    $('#sl-flame-right').css({width: `${Math.random() * 6 + 10}px`});
                    angle -= 0.01;
                    break;
                case 'ArrowLeft':
                    $('#sl-flame-left').css({width: `${Math.random() * 6 + 10}px`});
                    angle += 0.01;
                    break;
            }
        }
    })
        .on('keyup', function (): void {
            $mainFlame.css({height: '0'});
            $sideFlames.css({width: '0'});
            $engineSoundEffect[0].pause();
        })
})