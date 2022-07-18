/*
填充題生成按鈕

@author: Ivan
*/

//----------填充題----------
function addFilling(question = '問題', choose = '選項', ans = '答案') {
    var parent = document.getElementById('question');
    var title = createTitle(countTopic, "填充題");
    var killbottom = createBottom("Ｘ", "btn btn-danger", "killTopic('topic" + countTopic + "')") //新增刪除題目 bottom
    var thediv = createOuterLayer(countTopic) //新增1層的 div
    var thelabel = createLabel('題目：'); //新增題目 label
    var thelabel2 = createLabel('答案：'); //新增答案 label
    var thetextarea = creatTextarea(theID = "question" + countTopic); //新增題目 textarea
    var thebottom = createBottom("挖空", "btn back-green text-white", "creatChoose('div" + countTopic + "','topic" + countTopic + "',openCheckbox = false ,insertQ_ID='question"+countTopic+"')"); //新增選項 bottom
    //新增2層的 div
    var thediv2 = creatDivCalss("form-group");
    thediv2.setAttribute("id", "div" + countTopic);
    //新增左右邊的 div
    var leftdiv = creatDiv6();
    var rightdiv = creatDiv6();
    //新增row的 div
    var rowdiv = creatDivRow();
    leftdiv.appendChild(thelabel);
    leftdiv.appendChild(thetextarea);
    rightdiv.appendChild(thelabel2);
    rightdiv.appendChild(thediv2);
    rightdiv.appendChild(thebottom);
    rowdiv.appendChild(leftdiv);
    rowdiv.appendChild(rightdiv);

    thediv.appendChild(killbottom);
    thediv.appendChild(title);
    thediv.appendChild(rowdiv);
    parent.appendChild(thediv);
    thetype[countTopic] = '填充題';
    thechooseNumber[countTopic] = 0;

    if (question != '問題') {
        document.getElementById('question' + countTopic).value = question;
    }
    // 紀錄還沒計算前的countOption
    memCountOption = countOption - 1;
    if (choose != '選項') {
        var allchoose = choose.split("&");
        var creatOP = countOption - 1;
        for (i = 0; i < allchoose.length; i++) {
            creatChoose('div' + countTopic, 'topic' + countTopic);
            creatOP = countOption - 1
            document.getElementById('topic' + countTopic + '_Option' + creatOP).value = allchoose[i]
        }
    }
    countTopic++;
    resetTitle() //重設標題
}
