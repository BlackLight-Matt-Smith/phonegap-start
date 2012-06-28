// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
    var init = (function () {
		alert('init');
		store.get('data', function(data) {
			if (data) {
				showInfo();
			} else {
				x$('#getinfo_button').css({ 'display':'block' })
			}
		});
    })();
	
	var showInfo = function(){
		store.get('data', function(data) {
			showInfo(data);
			display('#info');
		});
	};
    
    // a little inline controller
    when('#welcome');
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
