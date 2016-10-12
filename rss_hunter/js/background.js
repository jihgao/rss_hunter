!function(){
	var tabCache = {};

		chrome.tabs.query({}, function(tabs) {
			tabs.forEach(function(tab) {
				if ( tab.url.match(/^https?:\/\//) ) {
					chrome.tabs.executeScript(tab.id, { file: 'js/content.js' });
				}
			})
		});
		var	_uniq = function(oldArray, newArray){
			var result = [], isInArray = {}, n = Math.max(oldArray.length, newArray.length);
			while(--n > -1){
				if(oldArray[n] && oldArray[n].url && !isInArray[oldArray[n].url]){
					result.push(oldArray[n]);
					isInArray[oldArray[n].url] = true;
				}
				if(newArray[n] && newArray[n].url && !isInArray[newArray[n].url]){
					result.push(newArray[n]);
					isInArray[newArray[n].url] = true;
				}
			}
			return result;
		};
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			var hostname,
				a = document.createElement('a');
			if ( typeof request.id != 'undefined' ) {
				switch ( request.id ) {
					case 'add_list':
						a.href = sender.url;
						if(!tabCache[a.hostname]){
							tabCache[a.hostname] = [];
						}
						tabCache[a.hostname] = _uniq(tabCache[a.hostname], request.subject.message);
						break;
					case 'get_list':
						a.href = request.tab.url;
						sendResponse({
							tabCache:   tabCache[a.hostname]
						});
						break;
				}
			}
		});

		chrome.tabs.query({}, function(tabs) {
			tabs.forEach(function(tab) {
				if ( tab.url.match(/^https?:\/\//) ) {
					chrome.tabs.executeScript(tab.id, { file: 'js/content.js' });
				}
			})
		});
}();
