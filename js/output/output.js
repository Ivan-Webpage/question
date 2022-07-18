/*
輸出檔案按鈕

@author: Ivan
*/

// 附加圖片另外處理（只有是非題、選擇題，會有附加圖片問題）
function vice_img_process(i_num){
    checkImg = document.getElementById("view_img" + i_num).name
    if (checkImg.length != 0){
        return checkImg; // 取得附加圖片的名稱
    } else {
        return '這一題沒有附加圖片'
    }
}


//----------匯出檔案----------
function output() {
    if (confirm('你確定要送出嗎？')) {
        if (countTopic <= 0) {
            confirm('請至少輸入一個題目');
        } else {
            var thetype2 = []; // 放置題目類型，因為之前可能有刪掉題目，導致順序亂掉，因此這裡要重新排列
            var thequestion = []; // 放置問題
            var theanswer = []; // 放置答案
            var thechoose = []; // 放置選項
            var theimg = []; // 放置附加圖片
            for (i = 0; i < countTopic; i++) { //進行題目與答案的整理
                if (show[i]){
                    switch (thetype[i]) {
                        case '填充題':
                            thetype2[i] = '填充題'
                            thequestion[i] = document.getElementById('question' + i).value;
                            // 選項的處理
                            var container = ''
                            var containerAns = ''
                            var count = 0
                            for (j = 0; j < countOption; j++) { // 所有選項下去搜，看看能否抓到
                                if (document.getElementById('topic' + i + "_Option_input" + j)) {
                                    container = container + document.getElementById('topic' + i + "_Option_input" + j).value + '&'

                                    count++; // 不管有沒有打勾，count都需要加一
                                }
                            }
                            thechoose[i] = '圖片填充題沒有選項'
                            theanswer[i] = container.substr(0, container.length - 1)
                            theimg[i] = '填充題沒有附加圖片'; // 沒有附加圖片
                            break;

                        case '是非題':
                            thetype2[i] = '是非題'
                            thequestion[i] = document.getElementById('question' + i).value;
                            thechoose[i] = '是非題沒有選項'; // 沒有選項
                            if (document.getElementById('ans_' + i).checked == true) {
                                theanswer[i] = 1
                            } else {
                                theanswer[i] = 0
                            }

                            // 附加圖片需要另外處理
                            theimg[i] = vice_img_process(i)

                            break;

                        case '畫圖題':
                            thetype2[i] = '畫圖題'
                            thequestion[i] = document.getElementById('question' + i).value;

                            thechoose[i] = document.getElementById("Qview_img" + i).name; // 選項是圖片檔案的名稱
                            theanswer[i] = document.getElementById("Aview_img" + i).name; // 答案是圖片檔案的名稱
                            theimg[i] = '畫圖題沒有附加圖片'; // 沒有附加圖片
                            break;

                        case '選擇題':
                            thetype2[i] = '選擇題'
                            thequestion[i] = document.getElementById('question' + i).value;
                            // 選項的處理
                            var container = ''
                            var containerAns = ''
                            var count = 0
                            for (j = 0; j < countOption; j++) { // 所有選項下去搜，看看能否抓到
                                if (document.getElementById('topic' + i + "_Option_input" + j)) {
                                    container = container + document.getElementById('topic' + i + "_Option_input" + j).value + '&'
                                    if (document.getElementById('topic' + i + "_Option" + j + '_checkbox').checked == true) {
                                        containerAns = containerAns + count + '&'
                                    }
                                    count++; // 不管有沒有打勾，count都需要加一
                                }
                            }
                            thechoose[i] = container.substr(0, container.length - 1)
                            theanswer[i] = containerAns.substr(0, containerAns.length - 1)

                            // 附加圖片需要另外處理
                            theimg[i] = vice_img_process(i)

                            break;

                        case '圖片填充題':
                            thetype2[i] = '圖片填充題'
                            thequestion[i] = document.getElementById('question' + i).value;
                            // 選項的處理
                            var container = ''
                            var containerAns = ''
                            var count = 0
                            for (j = 0; j < countOption; j++) { // 所有選項下去搜，看看能否抓到
                                if (document.getElementById('topic' + i + "_Option_input" + j)) {
                                    container = container + document.getElementById('topic' + i + "_Option_input" + j).value + '&'

                                    count++; // 不管有沒有打勾，count都需要加一
                                }
                            }
                            thechoose[i] = '圖片填充題沒有選項'
                            theanswer[i] = container.substr(0, container.length - 1)

                            // 附加圖片需要另外處理
                            theimg[i] = vice_img_process(i)
                            break;

                        default: //被刪除的，不要理他
                            continue;
                    }
                }
            }

            // 準備文字輸出
            var makeHtml = htmltextHead; // 加上html頭
            var js_anser_green = `
<script>
    function ans()
        {
            if (confirm('你確定要送出嗎？')) { // 等等準備拿來裝JS，對答案用
                                `
            var js_showAns = ''
            var content = '題號,類型,題目,選項,答案,附加圖片\n';
            var count = 0;
            var num = 1;
            for (i = 0; i < thetype.length; i++) {
                if (show[i]){
                    //---------- 輸出csv使用 ----------
                    content = content +
                    count + ',' + // 題號
                    thetype[i] + ',' + //類型
                    thequestion[i] + ',' + //題目
                    thechoose[i] + ',' + //選項
                    theanswer[i] + ','+ //答案
                    theimg[i] + '\n'; // 附加圖片

                    //---------- 輸出Html使用 ----------
                    // var JSonclick = 'Q' + i;
                    switch (thetype[i]) {
                        case '填充題':
                            //設定html部分
                            var qua = thequestion[i].split("&");
                            var ans = theanswer[i].split("&");
                            var container = ''
                            for (q = 0; q < qua.length; q++) { //設定題目
                                container = container + qua[q]
                                if (q + 1 < qua.length) {
                                    container = container + "<input type='text' style='height: 50px;margin: 5px;' class='input_control' placeholder='請輸入...' id='" + 'Q' + i + '_Ans' + q + "'>"
                                }
                            }
                            var FillingHtml = `
                                                        </div>
                                                    </div>
                                                </form>`;
                            makeHtml = makeHtml + blockhead(num, container, false) + FillingHtml;
                            //設定js部分
                            js_anser_green = js_anser_green+ changeColor(i, ans, 0, true)
                            js_showAns = js_showAns + showAns_btn(num, theanswer[i].replace('&', '、'), false)
                            num = num + 1
                            break;

                        case '畫圖題':
                            js_anser_green = js_anser_green + `document.getElementById('backtest${num}').style.visibility = 'hidden';`;
                            makeHtml = makeHtml + blockhead(num, thequestion[i], true) + blockfoot_img(num, theanswer[i], thechoose[i]);
                            js_showAns = js_showAns + showAns_btn(num, 0, true)
                            num = num + 1
                            break;

                        case '是非題':
                            // 接上後面的部分
                            container = `
                                        <input type="radio" name="optradio" id="Q${i}_Ans1"><strong id="A${i}_Ans1">Ｏ</strong>
                                        <input type="radio" name="optradio" id="Q${i}_Ans0"><strong id="A${i}_Ans0">X</strong>
                                        `
                            makeHtml = makeHtml + blockhead(num, thequestion[i], false) + addImg(theimg[i]) + blockfoot(container);

                            //設定js部分
                            theq = i+1
                            js_anser_green = js_anser_green + `document.getElementById('A${i}_Ans${theanswer[i]}').style.color = '#EA0000';showans${theq}();`;
                            theans = theanswer[i].toString().replace(0, 'X')
                            theans = theans.replace(1, 'O')
                            js_showAns = js_showAns + showAns_btn(num, theans, false)
                            num = num + 1
                            break;

                        case '選擇題':
                            var cho = thechoose[i].split("&");
                            var ans = theanswer[i].split("&");
                            var container = ''
                            for (c = 0; c < cho.length; c++) { //設定選項
                                container = container + "<div><label><input type='checkbox' id='Q" + i + "_Ans" + c + "'>" + cho[c] + "</label></div>"
                            }

                            makeHtml = makeHtml + blockhead(num, thequestion[i], false) + addImg(theimg[i]) + blockfoot(container);

                            //設定js部分
                            js_anser_green = js_anser_green + changeColor(i, ans, cho, false);

                            theans = ''
                            for (a=0; a < ans.length; a++) {
                                theans = theans + cho[ans[a]] + '、'
                            }
                            js_showAns = js_showAns + showAns_btn(num, theans.slice(0, -1), false)
                            num = num + 1
                            break;

                        case '圖片填充題':
                            var ans = theanswer[i].split("&");
                            var container = ''
                            for (c = 0; c < ans.length; c++) { //設定選項
                                container = container + "<div><label>"+ (c+1) +" .<input type='input' id='Q" + i + "_Ans" + c + "'></label></div>"
                            }

                            makeHtml = makeHtml + blockhead(num, thequestion[i], false) + addImg(theimg[i]) + blockfoot(container);

                            //設定js部分
                            js_anser_green = js_anser_green + changeColor(i, ans, 0, true);
                            js_showAns = js_showAns + showAns_btn(num, theanswer[i].replace('&', '、'), false)
                            num = num + 1
                            break;
                    }

                    count++
                }
            }
            // 加上html尾 與 JS
            makeHtml = makeHtml + htmltextFooter + js_anser_green + `
                    document.getElementById('showAll').style.display = 'none';
                    document.getElementById('playAgain').style.display = 'inline-flex';
                }
            window.scrollBy(0,screen.height*-1); // 回到最上面
        }`

        makeHtml = makeHtml + js_showAns+`
    </script>
</html>`
            // saveTextAsFile('test', '.csv', content)
            saveTextAsFile('test', '.html', makeHtml)
        }
    }
}

// 儲存檔案
function saveTextAsFile(_fileName, _type, _text) {
    var textFileAsBlob = new Blob([_text], { type: 'text/plain' });

    var downloadLink = document.createElement("a");
    downloadLink.download = _fileName + _type;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}




