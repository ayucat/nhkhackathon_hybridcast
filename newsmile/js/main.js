var focus = 0;
var capLength = 0;

function debug(str) {
    var o = JSON.stringify(str);
    $("#debug").html(o);
}


$(function() {
    function getCapList(data) {
        for (var i = 0; i < data.length; i++) {
            var $item = $("<div/>").addClass("email-item").addClass("pure-g").attr("id", "cap" + i);
            var $avatar = $("<div/>").addClass("pure-u");
            var $img = $("<img/>").addClass("email-avator").attr("height", "100").attr("width", "160").attr("src", data[i]["image_src"]);
            var $text = $("<div/>").addClass("pure-u-3-4");
            var $name = $("<h5/>").addClass("email-name").text(data[i]["name"]);
            var $subject = $("<h4/>").addClass("email-subject").text(data[i]["subject"]);
            var $desc = $("<p/>").addClass("email-desc").text(data[i]["desc"]);
            
            $avatar.append($img);
            $text.append($name);
            $text.append($subject);
            $text.append($desc);
            
            $item.append($avatar);
            $item.append($text);

            $("#list").append($item);
        }

        focus = 0;
        capLength = data.length;
    }

    document.addEventListener("keydown", eventKey, false);
    $("div#cap" + focus).addClass("email-item-selected");

    $.get("http://nhkhackathon.cloudapp.net/api/data", function(data){
        debug(data);
        var data = [
            {
                "name": "test1",
                "subject": "This is text1",
                "desc": "This is text subject 1",
                "image_src": "http://211.129.73.42:21080/s2ia/s1/latest"
            }, 

            {
                "name": "test2",
                "subject": "This is text2",
                "desc": "This is text subject 2",
                "image_src": "http://211.129.73.42:21080/s2ia/g1/latest"
            }
        ];
        getCapList(data);
    });

    function eventKey(e) {
        var key = e.keyCode;
        debug(key);
        
        $("div#cap" + focus).removeClass("email-item-selected");
        if(key == VK_DBUTTON) {
            //alert("VK_DBUTTON");
            navigator.applicationManager.launchDataBroadcastingBrowser({});
        } else if (key == VK_UP) {
            focus--;
            if (focus < 0) {
                focus = capLength - 1;
            }
        } else if(key == VK_DOWN) {
            focus++;
            if (focus >= capLength) {
                focus = 0;
            }
        }
        $("div#cap" + focus).addClass("email-item-selected");
    }
});