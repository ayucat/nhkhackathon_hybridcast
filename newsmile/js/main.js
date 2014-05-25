var focus = 0;
var capLength = 0;

function debug(str) {
    var o = JSON.stringify(str);
    $("#debug").html(o);
}

function makeAgeString(age) {
    var first = age["1x"];
    var second = age["2x"];
    var third = age["3x"];
    
    return "10代: " + first + ",20代:" + second + ",30代:" + third; 
}


$(function() {
    function getCapList(data) {
        for (var i = 0; i < data.length; i++) {
            var $item = $("<div/>").addClass("email-item").addClass("email-item-selected").addClass("pure-g").attr("id", "cap" + i);
            var $avatar = $("<div/>").addClass("pure-u");
            var $img = $("<img/>").addClass("email-avatar").attr("src", data[i]["image_url"]);

            var $news = $("<div/>").addClass("pure-u");
            var $face_icon = $("<div/>").addClass("face_icon");
            var $face_img = $("<img/>").addClass("email-avatar_icon").attr("src", "img/common/face0" + data[i]["emotion"] + ".png");
            
            var $news_set = $("<div/>").addClass("news_set");
            var $news_date = $("<h4/>").addClass("news_date").text(data[i]["date"] + "国際報道2014");
            var $news_link = $("<p/>").addClass("news_link").html("<a href=\"http://bit.ly/1k4zQ5s\">http://bit.ly/1k4zQ5s</a>");
            var $news_age = $("<p/>").addClass("news_age").text(makeAgeString(data[i]["age"]));

            var $btn_set = $("<div/>").addClass("btn_set");
            var $map_anchor = $("<a/>").attr("href", "#").html("<img alt=\"\" src=\"img/common/map_link.png\">");
            var $delete_anchor = $("<a/>").attr("href", "#").html("<img src=\"img/common/icon_delete.png\" alt=\"\" width=\"40\" height=\"19\">");
            $btn_set.append($map_anchor).append($delete_anchor);
            
            $avatar.append($img);

            $face_icon.append($face_img);
            $news.append($face_icon);
            
            $news_set.append($news_date).append($news_link).append($news_age).append($btn_set);
            $news.append($news_set);
            
            $item.append($avatar);
            $item.append($news);

            $("#list").append($item);
        }

        focus = 0;
        capLength = data.length;
        $(".email-count").text("(" + capLength +")")
    }

    $("#dialog").dialog({position:{my:"left-100 top+200", of: "body"}});
    //$("#dialog").dialog();

    document.addEventListener("keydown", eventKey, false);
    $("div#cap" + focus).addClass("email-item-selected");

    $.get("http://nhkhackathon.cloudapp.net/api/data", function(data){
        debug(data);
        var data = [
            {
                "emotion": "1",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/s1/latest"
            },
            {
                "emotion": "2",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "desc": "This is text subject 2",
                "image_url": "http://211.129.73.42:21080/s2ia/g1/latest"
            },
            {
                "emotion": "3",
                "age": {
                    "1x": "10%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/s3/latest"
            },
            {
                "emotion": "4",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/e1/latest"
            },
            {
                "emotion": "5",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/s1/latest"
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
                $('#list').animate({ scrollTop: 0 }, 'fast');
            }
        }
        $("div#cap" + focus).addClass("email-item-selected");
    }
});