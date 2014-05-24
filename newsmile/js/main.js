var focus = 1;

function debug(str) {
    var o = JSON.stringify(str);
    $("#debug").html(o);
}

$(function() {
    document.addEventListener("keydown", eventKey, false);
    $("div#cap" + focus).addClass("email-item-selected");

    function eventKey(e) {
        var key = e.keyCode;
        debug(key);
        
        $("div#cap" + focus).removeClass("email-item-selected");
        if(key == VK_DBUTTON) {
            //alert("VK_DBUTTON");
            navigator.applicationManager.launchDataBroadcastingBrowser({});
        } else if (key == VK_UP) {
            focus--;
        } else if(key == VK_DOWN) {
            focus++;
        }
        $("div#cap" + focus).addClass("email-item-selected");
    }
});