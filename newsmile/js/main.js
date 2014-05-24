function debug(str) {
    var o = JSON.stringify(str);
    $("#debug").html(o);
}

$(function() {
    document.addEventListener("keydown", eventKey, false);

    function eventKey(e) {
        var key = e.keyCode;
        debug(key);
        
        if(key == VK_DBUTTON) {
            //alert("VK_DBUTTON");
            navigator.applicationManager.launchDataBroadcastingBrowser({});
        }
    }
});