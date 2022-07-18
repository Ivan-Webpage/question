/*
此檔案用於各題目的配件準備

標籤ID名稱的命名方式：
    題目總題標籤ID： topic1
    題目ID： question1
    選項ID（選擇題）： topic5_Option1
    答案選項(選擇題、是非題)： topic5_Option1_checkbox

@author: Ivan
*/
var thetype = []; //放置該題是什麼類型
var thechooseNumber = []; //若是選擇題的話，有幾個選項
countTopic = 0 //計算題目數量
countOption = 0 //計算選項數量
var member_title_number = []; //放置標題id
var show = [] // 是否顯示該題目 T:顯示 F:已經被刪除


//----------準備標籤----------
function createTitle(number) { //建立 標題
    var title = document.createElement("h2");
    title.setAttribute("id", "theType" + number);
    member_title_number.push("theType" + number);
    show[number] = true;
    number++;
    return title
}

function creatTopic(topicNum, question) {//新增題目 input
    var theinput = document.createElement("input");
    theinput.setAttribute("type", "text");
    theinput.setAttribute("class", "form-control");
    theinput.setAttribute("id", "question" + topicNum);
    if (question != '問題') {
        theinput.setAttribute("value", question);
    }
    return theinput
}

function creatTextarea(theID) {
    var thetextarea = document.createElement("textarea");
    thetextarea.setAttribute("type", "text");
    thetextarea.setAttribute("class", "form-control");
    thetextarea.setAttribute("rows", "5");
    thetextarea.setAttribute("id", theID);
    return thetextarea
}

function creatCheckbox(checkboxID, ans) {//新增 checkbox
    var theCheckbox = document.createElement("input");
    theCheckbox.setAttribute("type", "checkbox");
    theCheckbox.setAttribute("id", checkboxID);
    if (ans != '答案' && ans == 1) {
        theCheckbox.setAttribute("checked", true);
    }
    return theCheckbox
}

function creatDivCalss(theclass) {//建立1層的 div input-group mb-3
    var div = document.createElement("div");
    div.setAttribute("class", theclass);
    return div
}

function creatDiv6() {//建立一個只有佔畫面一伴的Div
    var div = document.createElement("div");
    div.setAttribute("class", "col-sm-6");
    return div
}

function creatDivRow() {//建立一個row的Div
    var div = document.createElement("div");
    div.setAttribute("class", "row");
    return div
}

function creatImgBox(idName, img) {//建立一個圖片箱子，當Input圖片時就會直接顯示該圖片
    var theimg = document.createElement("img");
    

    theimg.setAttribute("id", idName);
    theimg.setAttribute("style", "width: 60%;");
    if (img != '圖片') {
        theimg.setAttribute("src", 'img/'+img);
        theimg.setAttribute("name", img);
    }else{
        theimg.setAttribute("src", "/");
    }
    return theimg
}

function creatInput(theClass, theID) {
    var theinput = document.createElement("input");
    theinput.setAttribute("type", "text");
    theinput.setAttribute("class", theClass);
    theinput.setAttribute("id", theID);
    return theinput
}

function creatImgInupt(imgbox, input, wd) {//上傳圖片按鈕
    var theinput = document.createElement("input");
    theinput.setAttribute("type", "file");
    theinput.setAttribute("id", input);

    var theA = document.createElement("a");
    theA.setAttribute("class", "file");
    theA.setAttribute("href", "javascript:;");
    theA.setAttribute("onchange", "previewFile('" + input + "', '" + imgbox + "')");
    theA.textContent = wd;
    theA.appendChild(theinput)
    return theA
}

function resetTitle() { //重設題目標題
    newN = 1
    for (i = 0; i < member_title_number.length; i++) {
        if (show[i]){ //需要判斷這題是否被刪除了
            document.getElementById(member_title_number[i]).innerHTML = "第" + newN + "題 " + thetype[i];
            newN = newN + 1
        }
    }
}

function createOuterLayer(number) { //建立 最外層的form
    var thediv = document.createElement("div");
    thediv.setAttribute("class", "form-group p-5 back-light-orange");
    thediv.setAttribute("id", "topic" + number);
    return thediv
}

function createLabel(word) { //建立 Label
    var thelabel = document.createElement("label");
    thelabel.innerHTML = word;
    return thelabel
}

function createBottom(word, theClass, beClick) { //建立 bottom
    var thebottom = document.createElement("bottom");
    thebottom.setAttribute("type", "bottom");
    thebottom.setAttribute("class", theClass);
    thebottom.setAttribute("onclick", beClick);
    thebottom.innerHTML = word;
    return thebottom
}

//選擇題 新增選項
function creatChoose(objID, topicID, openCheckbox = false, insertQ_ID = '填充題專用') {
    var parent = document.getElementById(objID);
    var thediv = creatDivCalss("input-group mb-3");//新增1層的 div
    thediv.setAttribute("id", topicID + "_Option" + countOption);
    var thediv_input_group_prepend = creatDivCalss("input-group-prepend"); //新增2層的 div
    var thediv_input_group_text = creatDivCalss("input-group-text");//新增3層的 div
    var theinput2 = creatInput(theClass = "form-control", theID = topicID + "_Option_input" + countOption); //新增選項 input
    var thediv_input_group_append = creatDivCalss("input-group-prepend"); //新增2層的 div
    var thebottom_delete = createBottom("刪除選項", "btn btn-danger", "killTopic('" + topicID + "_Option" + countOption + "')"); //新增選項 bottom

    if (openCheckbox) { // 判定是否開啟 Checkbox
        var checkbox_theanswer = creatCheckbox(checkboxID =  topicID + "_Option" + countOption + "_checkbox", ans='答案'); //新增 checkbox
        thediv_input_group_text.appendChild(checkbox_theanswer);
    }
    if (insertQ_ID != '填充題專用') {
        var getdiv = document.getElementById(insertQ_ID).value
        document.getElementById(insertQ_ID).value = getdiv + '&'
    }

    thediv_input_group_prepend.appendChild(thediv_input_group_text);
    thediv_input_group_append.appendChild(thebottom_delete);

    thediv.appendChild(thediv_input_group_prepend);
    thediv.appendChild(theinput2);
    thediv.appendChild(thediv_input_group_append);

    parent.appendChild(thediv);
    countOption++
    thechooseNumber[topicID.substring(5)]++;
}

function killTopic(objID) { //殺掉題目 or 選項
    var deathMan = document.getElementById(objID);
    var parentObj = deathMan.parentNode;//獲取div的父對象
    parentObj.removeChild(deathMan);//通過div的父對象把他删除
    show[objID.replace('topic', '')] = false;

    resetTitle()
}

// 若上傳圖片的話，這張圖就會show出來
function previewFile(inputID, imgID) {
    var preview = document.getElementById(imgID);
    var file    = document.getElementById(inputID).files[0];
    var reader  = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
      preview.name = file.name;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
}