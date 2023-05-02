$(document).ready(function () {
    let $body: any = $('body'),
        $rocket: any = $body.find('#sl-rocket'),
        angle: number = 10;

    //falling simulator function
    const fallingSimulator = () => {
        if (Number($rocket.css('bottom').replace('px', '')) > 0) {
            $rocket.css({top: `${Number($rocket.css('top').replace('px', '')) + 5}px`});
        } else {
            clearInterval(timer);
        }
    }

    //this function controls direction of rocket based on user choice
    const rocketController = (direction: string) => {
        switch (direction) {
            case 'ArrowUp':
                $rocket.css({top: `${Number($rocket.css('top').replace('px', '')) - 5}px`});
                break;
            default:
                $rocket.css({transform: `rotate(${angle}deg)`});
        }
    }

    $body.on('keydown', function (e) {
        let key = e.key;

        if (key.charCodeAt(0) === 65 && key !== 'ArrowDown') {
            switch (key) {
                case 'ArrowRight':
                    angle--;
                    break;
                case 'ArrowLeft':
                    angle++;
                    break
            }
            rocketController(key);
        }
    })

    let timer = setInterval(() => {
        fallingSimulator();
    }, 500)
})