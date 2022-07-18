/*
畫圖題生成按鈕

@author: Ivan
*/

//----------畫圖題----------
function addImage(question = '問題', imgQ = '圖片', imgA = '圖片') {
    var parent = document.getElementById('question');

    var title = createTitle(countTopic, "畫圖題");

    var thediv = createOuterLayer(countTopic); //新增1層的 div
    var killbottom = createBottom("Ｘ", "btn btn-danger", "killTopic('topic" + countTopic + "')"); //新增刪除題目 bottom
    var thelabel = createLabel('請匯入已下圖片，題目（左）答案（右）'); //新增題目 label

    //新增題目 input
    var theinput = creatTopic(topicNum = countTopic, question = question);

    //新增圖片上傳按鈕 input
    var theinputQ = creatImgInupt(imgbox = "Qview_img" + countTopic, input = "Qvice_img" + countTopic, wd='題目');
    var theinputA = creatImgInupt(imgbox = "Aview_img" + countTopic, input = "Avice_img" + countTopic, wd='答案');

    // 新增img
    var theimgQ = creatImgBox("Qview_img" + countTopic, imgQ);
    var theimgA = creatImgBox("Aview_img" + countTopic, imgA);

    //新增左右邊的 div
    var leftdiv = creatDiv6();
    // leftdiv.setAttribute("style", "background-color:#FF0000;");
    var rightdiv = creatDiv6();
    // rightdiv.setAttribute("style", "background-color:#00FF00;");
    //新增row的 div
    var rowdiv = creatDivRow();

    leftdiv.appendChild(theimgQ)
    leftdiv.appendChild(theinputQ)
    rightdiv.appendChild(theimgA)
    rightdiv.appendChild(theinputA)
    rowdiv.appendChild(leftdiv)
    rowdiv.appendChild(rightdiv)

    thediv.appendChild(killbottom);
    thediv.appendChild(title);
    thediv.appendChild(theinput);
    thediv.appendChild(thelabel);
    thediv.appendChild(rowdiv);
    parent.appendChild(thediv);
    thetype[countTopic] = '畫圖題';
    thechooseNumber[countTopic] = 0;
    countTopic++;
    resetTitle() //重設標題
}