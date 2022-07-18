var htmltextFooter = `</div>
<div class="row jumbotron text-center">
<div class="col-sm-12">
  <p>昊德推拿 02-2394-9918</p>
  <p>台北市中正區羅斯福路二段44號7樓之1</p>
</div>

</div>
<div class="row text-center">
<div class="col-sm-12">
    <p>Copyright © 2022 昊德對應經絡推拿館 All rights reserved</p>
  </div>
</div>
<bottom class="btn btn-success full_container" style="position: fixed; bottom: 0; font-size: 30px;" onclick='ans()' id="showAll">送出</bottom>
<div class="btn-group full_container" style="display: none; bottom: 0; position: fixed;" id="playAgain">
    <button type="button" style="font-size: 30px;" class="btn btn-warning" onclick="history.back()">回網頁</button>
    <button type="button" style="font-size: 30px;" class="btn btn-primary" onclick="reloadPage()">再測試一次</button>
</div>
</body>

<style>
    body {
        font-family: Microsoft JhengHei, DFKai-sb, Arial, '新細明體', sans-serif;
    }

    .full_container {
        width: 100%;
        text-align: center;
    }
    .input_control{
        border-radius:10px;
        height:30px;
    }
    .outbox{
        height: 300px;
    }
    canvas {
        background-image: url("img/membrane.png");
    }

    .containerbox{
        position: relative;
    }
    #containerbox canvas{
        height: 300px;
    }
    #vice_img{
        max-width: 200px;
        width: 100%;
        height: auto;
    }
    div{
        font-size:18px;
    }
</style>
`;