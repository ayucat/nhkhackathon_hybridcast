//Hybridcast受信機判定
function isHC() { return navigator.userAgent.indexOf("Hybridcast/") >= 0}
if(!isHC()){
    VK_UP = 38; VK_DOWN = 40; VK_LEFT = 37; VK_RIGHT = 39; VK_ENTER = 13; VK_BACK = 8; 
    VK_BLUE = 66; VK_RED = 82; VK_GREEN = 71; VK_YELLOW = 89; VK_DBUTTON = 68; 
    VK_0 = 96; VK_1 = 97; VK_2 = 98; VK_3 = 99; VK_4 = 100; VK_5 = 101; 
    VK_6 = 102; VK_7 = 103; VK_8 = 104; VK_9 = 105; VK_10 = 96; VK_11 = -1; VK_12 = -1;
}

function syntaxHighlight(json) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}

function playRomSound(n) {
	if(isHC()){
		var e = document.getElementById("sound_rom");
		e.src = "romsound://" + n;
		e.play()
	}
}

function debugN(str1) {
	var debug_line_max = ($("#debug-frame").height() - $("#debug-frame").height()%24)/24;
	var debug_line_bef = ($("#debug").height() - $("#debug").height()%24)/24+1;
	str2 = JSON.stringify(str1, undefined, 2);
	str3 = syntaxHighlight(str2);
    $('<p class="highlight">').html(str3).appendTo("#debug");
	var debug_line_aft = ($("#debug").height() - $("#debug").height()%24)/24+1;
	while ( debug_line_aft  > debug_line_max ) {
		$('#debug p:first').remove();
		var debug_line_aft = ($("#debug").height() - $("#debug").height()%24)/24+1;
	}
}
