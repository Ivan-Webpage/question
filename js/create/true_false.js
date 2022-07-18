/*
是非題生成按鈕

@author: Ivan
*/

//----------是非題----------
function addYesNo(question = '問題', ans = '答案', img = '圖片') {
    var parent = document.getElementById('question');
    var title = createTitle(countTopic, "是非題");

    var thediv = createOuterLayer(countTopic); //新增1層的 div
    var killbottom = createBottom("Ｘ", "btn btn-danger", "killTopic('topic" + countTopic + "')"); //新增刪除題目 bottom
    var thelabel = createLabel('題目（打勾就是O，沒勾就是X）'); //新增題目 label

    var thediv_input_group_mb_3 = creatDivCalss("input-group mb-3");//新增1層的 div
    var thediv_input_group_prepend = creatDivCalss("input-group-prepend");//新增2層的 div
    var thediv_input_group_text = creatDivCalss("input-group-text");//新增3層的 div

    var checkbox_theanswer = creatCheckbox(checkboxID =  "ans_" + countTopic, ans=ans); //新增 checkbox
    var theinput2 = creatTopic(topicNum = countTopic, question = question); //新增題目 input
    var theimg = creatImgBox("view_img" + countTopic, img); // 新增img
    var theImgLabel = createLabel('題目圖片（若沒圖片請忽略此按鈕）：'); //新增上傳圖片的 label
    var theinputQ = creatImgInupt(imgbox = "view_img" + countTopic, input = "vice_img" + countTopic, wd='上傳參考圖片'); //新增圖片上傳按鈕 input
    
    //新增左右邊的 div
    var leftdiv = creatDiv6();
    var rightdiv = creatDiv6();
    //新增row的 div
    var rowdiv = creatDivRow();

    thediv_input_group_text.appendChild(checkbox_theanswer);
    thediv_input_group_prepend.appendChild(thediv_input_group_text);
    
    thediv_input_group_mb_3.appendChild(thediv_input_group_prepend);
    thediv_input_group_mb_3.appendChild(theinput2);

    leftdiv.appendChild(thelabel);
    leftdiv.appendChild(thediv_input_group_mb_3);
    rightdiv.appendChild(theImgLabel);
    rightdiv.appendChild(theimg);
    rightdiv.appendChild(theinputQ);
    rowdiv.appendChild(leftdiv);
    rowdiv.appendChild(rightdiv);

    thediv.appendChild(killbottom);
    thediv.appendChild(title);
    thediv.appendChild(rowdiv);
    parent.appendChild(thediv);

    thetype[countTopic] = '是非題';
    thechooseNumber[countTopic] = 0;
    countTopic++;
    resetTitle() //重設標題
}
