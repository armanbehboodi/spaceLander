$(function () {
    let $body: any = $('body'),
        $rocket: any = $body.find('#sl-rocket'),
        $mainFlame: any = $('#sl-flame-bottom'),
        $sideFlames: any = $('.sl-side-flames'),
        $engineSoundEffect: any = $('#sl-audio-effect-engine'),
        $explosionSoundEffect: any = $('#sl-audio-effect-explosion'),
        height: number = Number($rocket.css('top').replace('px', '')),
        angle: number = 10;

    //falling simulator function
    const fallingSimulator = () => {
        if (Number($rocket.css('bottom').replace('px', '')) > 0) {
            $rocket.css({top: `${height}px`, transform: `translateY(17px) rotate(${angle}deg)`});
        } else {
            if (Math.abs(angle) > 2) {
                let explosionTimer: number = 0,
                    explosionInterval = setInterval(() => {
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
    let fallingInterval: number = setInterval(() => {
        height += 1;
        angle += 0.1;
        fallingSimulator();
    }, 25);


    //rocket controlling function
    let controllingTimer,
        controllingInterval,
        dampedValue;

    const rocketController = (direction: string) => {
        clearTimeout(controllingTimer);
        if (direction == 'up') {
            $rocket.css({transition: 'all 0.5s'});
        }

        controllingTimer = setTimeout(() => {
            if (direction == 'top') {
                $mainFlame.css({height: '0'});
                clearInterval(controllingInterval);

                controllingInterval = setInterval(() => {
                    if (dampedValue > 0.025) {
                        dampedValue -= 0.025;
                        $rocket.css({transition: `all ${dampedValue}s`});
                    } else {
                        clearInterval(controllingInterval);
                    }
                }, 150);
            } else {
                $sideFlames.css({width: '0'});
            }
        }, 50);
    }

    //activating rocket controllers
    $body.on('keydown', function (e) {
        let key = e.key;

        if (key.charCodeAt(0) === 65 && key !== 'ArrowDown') {
            dampedValue = 1;
            $engineSoundEffect[0].play();
            switch (key) {
                case 'ArrowUp':
                    rocketController('top');
                    $('#sl-flame-bottom').css({height: `${Math.random() * 11 + 15}px`});
                    height -= 5;
                    break;
                case 'ArrowRight':
                    rocketController('right');
                    $('#sl-flame-right').css({width: `${Math.random() * 6 + 10}px`});
                    angle -= 0.35;
                    break;
                case 'ArrowLeft':
                    rocketController('left');
                    $('#sl-flame-left').css({width: `${Math.random() * 6 + 10}px`});
                    angle += 0.35;
                    break;
            }
        }
    })
        .on('keyup', function () {
            $engineSoundEffect[0].pause();
        })
})