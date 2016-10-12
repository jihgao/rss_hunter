document.addEventListener('DOMContentLoaded', function() {
	var feed_list_container = document.getElementById('feed-container');
	var popup = {
		init: function(){
			chrome.tabs.getSelected(null, function(tab) {
				feed_list_container.previousElementSibling.style.display = 'none';
				if ( tab.url.match(/https?:\/\//) ) {
					feed_list_container.innerHTML = '<tr><td colspan="3">Not found any rss feed</td></tr>';
				} else {
					feed_list_container.innerHTML = '<tr><td colspan="3">Not found any rss feed</td></tr>';
				}
			});
			popup.displayFeedList();
		},
		displayFeedList: function(){
			chrome.tabs.getSelected(null, function(tab) {
				chrome.extension.sendRequest({ id: 'get_list', tab: tab }, function(response) {
					if ( Array.isArray(response.tabCache) ) {
						popup.renderFeedList(response.tabCache);
					}
				});
			});
		},
		renderFeedList: function (feedsArr){
			var n = feedsArr.length;
			var html = '', i=0;
			while(--n > -1){
				i++;
				html += ['<tr> ', '<th scope="row">', i ,'</th> ', '<td><a href="', feedsArr[n].url, '">', feedsArr[n].title, '</a>','</td> ', '<td><a class="target-app" href=""><img src="images/feedly-full-black.png"/></a></td></tr>'].join("");
			}
			feed_list_container.previousElementSibling.style.display = 'table-header-group';
			feed_list_container.innerHTML = html;
		}
	};

	popup.init();
});
