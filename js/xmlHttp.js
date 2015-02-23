function xmlHttpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();

    //open(method,url,async)
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}