!(function() {
	var c = {
		feed_list: [],
		feed_pattern: ['application/atom+xml', 'application/rss+xml'],
		init: function() {
			c.sendMessage();
		},
		sendMessage: function (){
			var pattern_count = c.feed_pattern.length,
					message = {};
			for(var i=0; i<pattern_count; i++){
				c.findCertainRss(c.feed_pattern[i]);
			}
			chrome.extension.sendRequest({ id: 'add_list', subject: { message: c.feed_list } });
		},
		findCertainRss: function(pattern){
			var rss_feeds = document.querySelectorAll('[type="' + pattern + '"]'), 
					n = rss_feeds.length;
			for(var i=0;i<n;i++){
				c.feed_list.push({url: rss_feeds[i].href, title: rss_feeds[i].title});
			}
		}
	}
	document.addEventListener('DOMContentLoaded', c.init);
	c.init();
}());
