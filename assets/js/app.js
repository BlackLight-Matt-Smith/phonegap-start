// 
//  --- our app behavior logic ---
//
run(function () {
	var showInfo = function(){
		store.get('data', function(data) {
			showInfo(data);
			display('#info');
		});
	};
	
    var init = (function () {
		alert('init 15:04');
		store.get('data', function(data) {
			if (data) {
				showInfo();
			} else {
				x$('#getinfo_button').css({ 'display':'block' })
			}
		});
    })();
    
    // a little inline controller
	alert('about to call when(welcome)');
    when('#welcome');
	alert('about to call when(getinfo)');
    when('#getinfo', function() {
		alert('Trying to get info now');
		if (navigator.network.connection.type == Connection.NONE) {
            alert("No internet connection - we can't fetch the data");
			return;
        }
		
		x$('#welcome').xhr('http://www.nanonull.com/TimeService/TimeService.asmx/getUTCTime', function(){
			store.save(this.responseText.replace(/<.*?>/g, ''));
			showInfo();
		});
	});
});
