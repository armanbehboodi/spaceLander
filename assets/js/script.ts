$(function () {
    let $body: any = $('body'),
        $rocket: any = $body.find('#sl-rocket'),
        height: number = Number($rocket.css('top').replace('px', '')),
        angle: number = 10;

    //falling simulator function
    const fallingSimulator = () => {
        console.log(height)
        if (Number($rocket.css('bottom').replace('px', '')) > 0) {
            $rocket.css({top: `${height}px`});
        } else {
            clearInterval(timer);
        }
    }

    //controlling the rocket
    $body.on('keydown', function (e) {
        let key = e.key;

        if (key.charCodeAt(0) === 65 && key !== 'ArrowDown') {
            switch (key) {
                case 'ArrowUp':
                    height -= 5;
                    break;
                case 'ArrowRight':
                    angle -= 1;
                    $rocket.css({transform: `translateY(15px) rotate(${angle}deg)`});
                    break;
                case 'ArrowLeft':
                    angle += 1;
                    $rocket.css({transform: `translateY(15px) rotate(${angle}deg)`});
                    break
            }
        }
    })

    let timer = setInterval(() => {
        height += 1;
        fallingSimulator();
    }, 150)
})