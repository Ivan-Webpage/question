var reader;
var progress = document.querySelector('.percent');


function errorHandler(evt) {
    switch (evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert('找不到檔案!');
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert('此檔案不可讀取');
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        default:
            alert('讀取此文件時發生錯誤');
    };
}

function updateProgress(evt) {
    // 載入的動畫條.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        // 增加進度條的長度。
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}

function handleFileSelect(evt) {
    // 在選擇新文件時重置進度指示器。
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function (e) {
        alert('File read cancelled');
    };
    reader.onloadstart = function (e) {
        document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function (e) {
        // 確保進度條最後顯示100％。
        progress.style.width = '100%';
        progress.textContent = '100%';
        setTimeout("document.getElementById('progress_bar').className='';", 2000);
    }

    // 以二進製字符串形式讀取圖像文件。
    reader.readAsText(evt.target.files[0], "utf-8");
}


function startRead(number, thetype) { //匯入檔案
    var files = document.getElementById('files').files;
    if (!files.length) {
        alert('請匯入檔案！');
        return;
    }

    var file = files[0];

    var reader = new FileReader();

    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            data = evt.target.result;
            var row = data.split("\n");

            for (var i = 1; i < row.length-1; i++) {
                var column = row[i].split(",");
                switch (column[1]) {
                    
                    case '填充題':
                        addFilling(question = column[2], ans = column[4]);
                        break;

                    case '是非題':
                        addYesNo(question = column[2], ans = column[4], img=column[5]);
                        break;

                    case '選擇題':
                        addchoose(question = column[2], choose = column[3], ans = column[4], img=column[5]);
                        break;
                    
                    case '畫圖題':
                        addImage(question = column[2], imgQ = column[3], imgA = column[4])
                        break;

                    case '圖片填充題':
                        addImgFilling(question = column[2], choose = column[4], img = column[5])
                        break;

                    default:
                        alert('資料有誤')
                        alert(column)
                }
            } 
            
        }
    };

    var blob = file.slice();
    reader.readAsText(blob, "utf-8");
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);