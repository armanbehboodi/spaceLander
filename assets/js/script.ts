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
        angle: number = 10,
        numberOfStars: number = 1;

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
            $rocket.css({top: `${height}px`, transform: `translateY(17px) rotate(${angle}deg)`});
        } else {
            if (Math.abs(angle) > 2) {
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
            clearInterval(fallingInterval);
        }
    }

    //falling simulation timer
    let fallingInterval: number = setInterval((): void => {
        height += 1;
        angle += 0.1;
        fallingSimulator();
    }, 25);


    //rocket controlling function
    let controllingInterval,
        counter: number = 0.5;

    //activating rocket controllers
    $body.on('keydown', function (e): void {
        let key = e.key,
            bottom: number = Math.abs(Number($rocket.css('bottom').replace('px', '')));

        if (key.charCodeAt(0) == 65 && key !== 'ArrowDown' && bottom > 1) {
            $engineSoundEffect[0].play();
            switch (key) {
                case 'ArrowUp':
                    $mainFlame.css({height: `${Math.random() * 11 + 15}px`});
                    clearInterval(controllingInterval);
                    $rocket.css({transition: 'all 0.5s'});
                    height -= 5;
                    break;
                case 'ArrowRight':
                    $('#sl-flame-right').css({width: `${Math.random() * 6 + 10}px`});
                    angle -= 0.5;
                    break;
                case 'ArrowLeft':
                    $('#sl-flame-left').css({width: `${Math.random() * 6 + 10}px`});
                    angle += 0.5;
                    break;
            }
        }
    })
        .on('keyup', function (e): void {
            let isBoosterOn: boolean = $rocket.css('transition').indexOf('0.5') !== -1;
            $mainFlame.css({height: '0'});
            $sideFlames.css({width: '0'});

            if (e.key == 'ArrowUp' && isBoosterOn) {
                controllingInterval = setInterval((): void => {
                    if (counter > 0.025) {
                        counter -= 0.025;
                        $rocket.css({transition: `all ${counter}s`});
                    } else {
                        counter = 0.5;
                        clearInterval(controllingInterval);
                    }
                }, 250);
            }

            $engineSoundEffect[0].pause();
        })
})