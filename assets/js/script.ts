$(function () {
    let $body: any = $('body'),
        $rocket: any = $body.find('#sl-rocket'),
        $bottomFlame: any = $('#sl-flame-bottom'),
        height: number = Number($rocket.css('top').replace('px', '')),
        angle: number = 10;

    //falling simulator function
    const fallingSimulator = () => {
        if (Number($rocket.css('bottom').replace('px', '')) > 0) {
            $rocket.css({top: `${height}px`, transform: `translateY(17px) rotate(${angle}deg)`});
        } else {
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
        clearInterval(controllingInterval);
        $rocket.css({transition: 'all 1s'});

        switch (direction) {
            case 'top':
                height -= 5;
                break;
            case 'right':
                angle -= 1;
                break;
            default:
                angle += 1;
        }

        controllingTimer = setTimeout(() => {
            $bottomFlame.css({height: '0'});
            controllingInterval = setInterval(() => {
                if (dampedValue > 0.025) {
                    dampedValue -= 0.025;
                    $rocket.css({transition: `all ${dampedValue}s`});
                } else {
                    clearInterval(controllingInterval);
                }
            }, 150);
        }, 350);
    }

    //activating rocket controllers
    $body.on('keydown', function (e) {
        let key = e.key;

        if (key.charCodeAt(0) === 65 && key !== 'ArrowDown') {
            switch (key) {
                case 'ArrowUp':
                    rocketController('top');
                    $bottomFlame.css({height: `${Math.random() * 11 + 15}px`});
                    dampedValue = 1;
                    break;
                case 'ArrowRight':
                    rocketController('right');
                    dampedValue = 1;
                    break;
                case 'ArrowLeft':
                    rocketController('left');
                    dampedValue = 1;
                    break;
            }
        }
    })
})