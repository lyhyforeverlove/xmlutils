function getDate(tm) {
    var tt = new Date(parseInt(tm) * 1000).toLocaleString()
    return tt;
}

function getDate(tm) {
    var now = new Date(tm);
    var year = 1900 + now.getYear();
    //console.log(year);
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();


return year + "年" + month + "月" + date + "日" + hour + ":" + minute + ":" + second;
}

