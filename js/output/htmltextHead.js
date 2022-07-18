//匯出HTML需要用到的固定程式碼
var htmltextHead = `<!DOCTYPE html>
<html lang='en'>

<head>
    <title>考試</title>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js'></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js'></script>
    <script>
        //判斷裝置為PC或者移動裝置，兩者觸發的繪圖事件不同
        var eventContorler = {//準備一個控制器，不同裝置的話以下條件會不一樣
            'device':'', //紀錄裝置是啥
            'star':'', //紀錄動作開始時的方法
            'move':'', //紀錄動作移動中的方法
            'end':'' //紀錄動作結束時的方法
        }
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) {

            // 式移動裝置
            eventContorler.device = 'mobile'
            eventContorler.star = 'touchstart'
            eventContorler.move = 'touchmove'
            eventContorler.end = 'touchend'
        } else {
            //是PC
            eventContorler.device = 'pc'
            eventContorler.star = 'mousedown'
            eventContorler.move = 'mousemove'
            eventContorler.end = 'mouseup'
        }
        //取得滑鼠座標，mousePos 是一個物件，包含x和y的值
        function getMousePos(membrane, evt) {
            var rect = membrane.getBoundingClientRect();//getBoundingClientRect 取得物件完整座標資訊，包含寬高等
            if (eventContorler.device == 'pc'){//電腦版
                return {//這個function將會傳回滑鼠在 _membrane上的座標
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }else{//手機板
                return {//這個function將會傳回滑鼠在 _membrane上的座標
                    x: evt.touches[0].clientX - rect.left,
                    y: evt.touches[0].clientY - rect.top
                };
            }
        };
        //重整頁面
        function reloadPage(){
            window.location.reload();
        }
    </script>
</head>

<body>

    <div class='container'>`;