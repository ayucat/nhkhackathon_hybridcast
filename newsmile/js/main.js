var focus = 0;
var capLength = 0;
var currentAnimeList = [];
var currentAnimeIndex = 0;

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
            var $item = $("<div/>").addClass("email-item").addClass("pure-g").attr("id", "cap" + i);
            var $avatar = $("<div/>").addClass("pure-u").css("height", "140px");
            var $img = $("<img/>").addClass("email-avatar").attr("id", "cap" + i + "_image").attr("src", data[i]["image_url"]);

            var $news = $("<div/>").addClass("pure-u").css("height", "80px");
            var $face_icon = $("<div/>").addClass("face_icon");
            var $face_img = $("<img/>").addClass("email-avatar_icon").attr("src", "img/common/face0" + data[i]["emotion"] + ".png");
            
            var $news_set = $("<div/>").addClass("news_set");
            var $news_date = $("<h4/>").addClass("news_date").text(jQuery.timeago(data[i]["time"]));

            var $btn_set = $("<div/>").addClass("btn_set").css("width", "250px");
            var $blue_anchor = $("<a/>").attr("href", "#").html("<img alt=\"\" src=\"img/common/btn_blue.png\">");
            var $red_anchor = $("<a/>").attr("href", "#").html("<img src=\"img/common/btn_red.png\" alt=\"\">");
            var $yellow_anchor = $("<a/>").attr("href", "#").html("<img src=\"img/common/btn_green.png\" alt=\"\">");
            $btn_set.append($blue_anchor).append($red_anchor).append($yellow_anchor);
            
            $avatar.append($img);

            $face_icon.append($face_img);
            $news.append($face_icon);
            
            $news_set.append($news_date).append($btn_set);
            $news.append($news_set);
            
            $item.append($avatar);
            $item.append($news);

            $("#list").append($item);
        }

        focus = 0;
        capLength = data.length;
        $(".email-count").text("(" + capLength +")")
    }

    function startAnimation(cap_id) {
        var image_url = $("#" + cap_id).attr("src");
        var re = /(http:\/\/[^/]+\/[^/]+\/[^/]+\/)([^/]+)/;
        var base = re.exec(image_url)[1];
        var time = re.exec(image_url)[2];
        
        var d = new Date(time);
        currentAnimeList = [];
        currentAnimeIndex = 0;
        for (var i = 0; i < 5; i++) {
            var current = d.getTime() + 1000 * i;
            current = new Data(current);
            var yy = dd.getYear();
            var mm = dd.getMonth() + 1;
            var dd = dd.getDate();
            var hh = dd.getHours();
            var MM = dd.getMinutes();
            var ss = dd.getSeconds();
            if (yy < 2000) { yy += 1900; }
            if (mm < 10) { mm = "0" + mm; }
            if (dd < 10) { dd = "0" + dd; }
            if (hh < 10) { hh = "0" + hh; }
            if (MM < 10) { MM = "0" + MM; }
            if (ss < 10) { ss = "0" + ss; }
            
            var image_name = yy + "-" + mm + "-" + dd + "T" + hh + ":" + MM + ":" + ss;
            var current_image_url = base + image_name;
            currentAnimeList.append(current_image_url);
        }

        var currentIndex = 0;
        setInterval(function() {
            $("#" + cap_id).attr("src", currentAnimeList[currentAnimeIndex]);
            currentAnimeIndex++;
            if (currentAnimeIndex > 5) {
                currentAnimeIndex = 0;
            }
        });
    }

    document.addEventListener("keydown", eventKey, false);
    $("div#cap" + focus).addClass("email-item-selected");

    $.get("http://nhkhackathon.cloudapp.net/api/data", function(d){
        var re = /<p>([^<>]+)<\/p>/;
        var data = re.exec(d["responseText"]);
        data = JSON.parse(data[1]);
        console.log(data);
        /*
        var data = [
            {
                "emotion": "1",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "time": "2014-05-25 15:05:58",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/s1/2014-05-16T22:00:02"
            },
            {
                "emotion": "2",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "time": "2014-05-25 16:10:58",
                "desc": "This is text subject 2",
                "image_url": "http://211.129.73.42:21080/s2ia/s1/2014-05-16T21:00:01"
            },
            {
                "emotion": "3",
                "age": {
                    "1x": "10%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "time": "2014-05-25 16:08:58",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/s1/2014-05-16T21:59:50"
            },
            {
                "emotion": "4",
                "age": {
                    "1x": "20%",
                    "2x": "10%",
                    "3x": "30%"
                },
                "date": "2014-05-25",
                "time": "2014-05-25 16:04:58",
                "desc": "This is text subject 1",
                "image_url": "http://211.129.73.42:21080/s2ia/s1/2014-05-16T21:59:58"
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
                "image_url": "http://211.129.73.42:21080/s2ia/s1/2014-05-16T21:59:39"
            }
        ];
        */
        getCapList(data);
        
//        startAnimation("cap0_image")
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
        } else if(key == VK_ENTER) {
            $("#dialog").dialog();
        }
        $("div#cap" + focus).addClass("email-item-selected");
    }
});
