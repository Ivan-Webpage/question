// 所有考題區塊的頭部
function blockhead(num, thequestion, painter){
    theimg = ''
    if (painter){
        theimg = ` onclick="cleanImg${num}()" `;
    }
    thestr =`
        <form class="p-1 border" style="background-color: #FFFFF0; margin-bottom: 5px; border: 2px solid #ff0000!important;">
            <div class="row" style="margin: 0;">
                <div class="col-sm-12">
                    <div class="row">
                        <h3>第${num}題</h3>
                        <div class="btn-group">
                            <button type="button" class="btn btn-success"  onclick="showans${num}()">解答</button>
                            <button type="reset" class="btn" `+ theimg +` style="background-color: #ffb6c1;">清除</button>
                        </div>
                    <div id="showans${num}" style="color:#EA0000;"></div>
                </div>
            <div class="row">
                <h4>${thequestion}</h4>
            </div>
        `
    return thestr
}

// 一般考題的尾部
function blockfoot(container){
    var thestr = `
                </div>
                </div>
                <hr style="filter: alpha(opacity=100,finishopacity=0,style=3);margin-top: 1px; margin-bottom: 1px; border: 1;
            " width="80%" color="#6f5499" size="3" />
                    <div class="col-sm-12">
                        <h5>答案：</h5>
                        ${container}
                    </div>
            </form>
            `;
    return thestr
}

// 畫圖題的尾部
function blockfoot_img(num, theanswer, thechoose){
    var thestr = `
                <hr style="filter: alpha(opacity=100,finishopacity=0,style=3);margin-top: 1px; margin-bottom: 1px; border: 1;
            " width="80%" color="#6f5499" size="3" />
                <div class="row">
                <div class='outbox'>
                    <div id = 'containerbox' class="col-sm-12">
                        <img id="ans_img${num}" width="200" height="300"> <!-- 答案圖片 -->
                        <img id="backtest${num}" width="200" height="300"> <!-- 考試圖片 -->
                        <!-- 繪圖板 -->
                        <canvas id="membrane${num}" width="200" height="300">
                            Sorry, your browser doesn't support the &lt;canvas&gt; element.
                        </canvas>
                        <!-- 繪圖板 end -->
                    </div>
                </div>

                </div>
            </div>


            </div>


            </form>
            <style>
            #ans_img${num}{
            background-image: url("img/${theanswer}");
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            }

            #backtest${num} {
            background-image: url("img/${thechoose}");
            background-size: contain;
            background-repeat: no-repeat;
            position: absolute;
            }

            #membrane${num} {
            position: absolute;
            }
            </style>
            <script>
            //繪圖板的設置
            w = 200,
            h = 300;
            var _membrane${num} = document.getElementById('membrane${num}'); //抓到繪圖板
            var ctx${num} = _membrane${num}.getContext('2d');
            _membrane${num}.width = w;
            _membrane${num}.height = h;

            //繪圖動作
            function mouseMove${num}(evt) {
            var mousePos = getMousePos(_membrane${num}, evt);
            ctx${num}.lineTo(mousePos.x, mousePos.y);//利用取回的值畫線
            ctx${num}.stroke();//畫!
            };

            membrane${num}.addEventListener(eventContorler.star, function (evt) {
            var mousePos = getMousePos(_membrane${num}, evt);//從按下去就會執行第一次的座標取得
            evt.preventDefault();
            ctx${num}.beginPath();//建立path物件
            ctx${num}.moveTo(mousePos.x, mousePos.y);//每次的點用moveTo去區別開，如果用lineTo會連在一起
            membrane${num}.addEventListener(eventContorler.move, mouseMove${num}, false);//mousemove的偵聽也在按下去的同時開啟
            });

            //如果滑鼠放開，將會停止mouseup的偵聽
            membrane${num}.addEventListener(eventContorler.end, function () {
            membrane${num}.removeEventListener(eventContorler.move, mouseMove${num}, false);
            }, false);

            // 對答案按鈕
            function get_ans${num}() {
            document.getElementById('backtest${num}').style.visibility = 'hidden';
            }

            // 刪除繪圖
            function cleanImg${num}() {
                ctx${num}.clearRect(0, 0,_membrane${num}.width, _membrane${num}.height);
            }
            </script>`;
    return thestr
}

function changeColor(i, ans, cho, filllin){
    var thestr = '';

    if (filllin){ // 判斷是否為填充題使用
        for (js = 0; js < ans.length; js++) { //設定答案的JS，改考卷
                thestr = thestr + `
                                document.getElementById('Q` + i + `_Ans` + js + `').style.color = '#EA0000';
                                document.getElementById('Q` + i + `_Ans` + js + `').style.border = '1px solid #EA0000';
                                document.getElementById('Q` + i + `_Ans` + js + `').value =  '` + ans[js] + `';
                                `;
            }
    }else{
        for (js = 0; js < cho.length; js++) { //設定答案的JS，改考卷
            if (ans.indexOf(js.toString()) != -1) { // 這不是答案
                thestr = thestr + "document.getElementById('Q" + i + '_Ans' + js + "').parentNode.style.color = '#EA0000';"
            }
        }
    }
    theq = parseInt(i)+1;
    thestr = thestr + `showans`+theq+`();`
    return thestr
}

// 這邊需要判斷是否有圖片，有圖片則要加上圖片的html程式碼
function addImg(theimg) {
    var thestr =""
    if (!(String(theimg).includes('題沒有附加圖片'))){
        thestr = thestr +
        `<img class="img-fluid" id="vice_img" src="img/${theimg}"> <!-- 答案圖片 --> `
    }
    return thestr
}

function showAns_btn(num, theanswer, painter) {
    if (painter){
        var thestr = `
        function showans${num}() {
            document.getElementById('backtest${num}').style.visibility = 'hidden';
        }
        `;
    }else{
        var thestr = `
        function showans${num}() {
            document.getElementById("showans${num}").textContent="解答："+"${theanswer}";
        }
        `;
    }

    return thestr
}