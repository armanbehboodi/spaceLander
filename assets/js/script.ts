$(document).ready(function () {
    let $body: any = $('body'),
        $rocket: any = $body.find('#sl-rocket');

    $body.on('keydown', function (e) {
        let key = e.key,
            rocketTop: number = Number($rocket.css('top').replace('px', '')),
            rocketRight: number = Number($rocket.css('right').replace('px', ''));

        if (key.charCodeAt(0) === 65) {
            switch (key) {
                case 'ArrowUp':
                    $rocket.css({top: `${rocketTop - 1}px`});
                    break;
                case 'ArrowRight':
                    $rocket.css({right: `${rocketRight + 1}px`});
                    break;
                case 'ArrowLeft':
                    $rocket.css({right: `${rocketRight - 1}px`});
                    break;
            }
        }
    })
})