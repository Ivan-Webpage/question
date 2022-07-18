/*
圖片填充題生成按鈕

@author: Ivan
*/

//----------圖片填充題----------
function addImgFilling(question = '問題', choose = '選項', img = '圖片') {
    var parent = document.getElementById('question');
    var title = createTitle(countTopic, "圖片填充題");

    var thediv = createOuterLayer(countTopic); //新增1層的 div
    var killbottom = createBottom("Ｘ", "btn btn-danger", "killTopic('topic" + countTopic + "')"); //新增刪除題目 bottom

    //新增2層的 div
    var thediv2 = creatDivCalss("form-group");
    thediv2.setAttribute("id", "fill_div" + countTopic);

    var thelabel = createLabel('題目（打勾為正解）'); //新增題目 label
    var theinput = creatTopic(topicNum = countTopic, question = question); //新增題目 input
    var thelabel2 = createLabel('答案'); //新增選項 label
    var thebottom = createBottom("新增答案", "btn back-green text-white", "creatChoose('fill_div" + countTopic + "','topic" + countTopic + "')"); //新增選項 bottom
    var thediv3 = document.createElement("div");//新增3層的 div
    var theImgLabel = createLabel('題目圖片：');//新增上傳圖片的 label
    var theimg = creatImgBox("view_img" + countTopic, img); // 新增img
    var theinputQ = creatImgInupt(imgbox = "view_img" + countTopic, input = "vice_img" + countTopic, wd='上傳參考圖片');//新增圖片上傳按鈕 input

    //新增左右邊的 div
    var leftdiv = creatDiv6();
    var rightdiv = creatDiv6();
    //新增row的 div
    var rowdiv = creatDivRow();

    thediv3.appendChild(theImgLabel);
    thediv3.appendChild(theimg);
    thediv3.appendChild(theinputQ);

    thediv2.appendChild(thelabel);
    thediv2.appendChild(theinput);
    thediv2.appendChild(thelabel2);

    leftdiv.appendChild(thediv2);
    leftdiv.appendChild(thebottom);
    rightdiv.appendChild(thediv3);
    rowdiv.appendChild(leftdiv);
    rowdiv.appendChild(rightdiv);


    thediv.appendChild(killbottom);
    thediv.appendChild(title);
    thediv.appendChild(rowdiv);
    
    parent.appendChild(thediv);
    creatChoose('fill_div' + countTopic, thediv.id);
    thetype[countTopic] = '圖片填充題';
    thechooseNumber[countTopic] = 1;
    
    // 紀錄還沒計算前的countOption
    memCountOption = countOption - 1;
    if (choose != '選項') {
        var allchoose = choose.split("&");
        var creatOP = countOption - 1
        document.getElementById('topic' + countTopic + '_Option' + creatOP).value = allchoose[0]
        for (i = 1; i < allchoose.length; i++) {
            creatChoose('fill_div' + countTopic, 'topic' + countTopic);
            creatOP = countOption - 1
            document.getElementById('topic' + countTopic + '_Option' + creatOP).value = allchoose[i]
        }
    }
    countTopic++;
    resetTitle() //重設標題
}