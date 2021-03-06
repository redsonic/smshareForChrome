/*PRE
//BACKGROUND
var CHECK_CLIENT_STATUS_SERVICE_URL = "http://192.168.14.14:8084/service/checkstatus";

//POPUP
var SHARE_SERVICE_URL = "http://192.168.14.14:8084/service/sharelink";
var CONTACTS_MENU_CONTENT_URL = "http://192.168.14.14:8084/service/contacts-menu-content";

//OPTIONS
var GMAIL_CREDENTIALS_URL = "http://192.168.14.14:8084/service/gmail_credentials"; 

//smshare
var CONTACTS_US_PAGE_URL = "http://localhost:8084/contact.html#signin_menu";


var CHECK_STATUS_DELAY = 500000;// 20 seconds
var logger = true;
 */
 



/*PROD*/
//BACKGROUND
var CHECK_CLIENT_STATUS_SERVICE_URL = "http://www.smshare.fr/service/checkstatus";  

//POPUP
var SHARE_SERVICE_URL = "http://www.smshare.fr/service/sharelink"; 
var CONTACTS_MENU_CONTENT_URL = "http://www.smshare.fr/service/contacts-menu-content";

//OPTIONS
var GMAIL_CREDENTIALS_URL = "http://www.smshare.fr/service/gmail_credentials";

//SMSHARE
var CONTACTS_US_PAGE_URL = "http://www.smshare.fr/contact.html#signin_menu";


var CHECK_STATUS_DELAY = 300000; //5 minutes a diminuer

var logger = false;




// COMMON

var CLOSE_DELAY = 2000;

var constant = {
		status:{
			CONNECTED 	 : '200',
			DISCONNECTED : '480',
			UNAUTHORIZED : '401',
			NOT_FOUND 	 : '404',
			PROXY_AUTHENTICATION_REQUIRED : '407',
			BAD_GATEWAY	 : '502'
		},
		CLIENT_DISCONNECTED_BADGE : '!',
		CLIENT_DISCONNECTED_TOOLTIP : chrome.i18n.getMessage("clientDisconnected"),
		CLIENT_NOT_FOUND_TOOLTIP : chrome.i18n.getMessage("clientNotFound"),
		NORMAL_TOOLTIP : 'Smshare',
		
		ACTION_SHARE : 'share',
		ACTION_COMPOSE : 'compose'
};



/**
 * Handy log function
 * http://smshare.blogspot.com/2010/08/gestion-des-logs-en-javascript.html
 */
function log(message) {
	if (logger) {
		console.log(message);
	}
}


function enableTooltip(){ 
	// select all desired input fields and attach tooltips to them
	$(".img4validation").tooltip({
	
		// place tooltip on the right edge
		position : "center right",
	
		// a little tweaking of the position : vertical , horizontal
		offset : [ 0, 10 ],
	
		// use the built-in fadeIn/fadeOut effect
		effect : "fade",
	
		// custom opacity setting
		opacity : 0.7,
	
		// use this single tooltip element
		tip : '.tooltip'
	
	});

}


/**
 * N O T   U S E D 
 * insert user row in db if table exists otherwise create new table and insert row.
 */
function testdb() {
	// http://openbit.co.uk/?p=135
	db = openDatabase("smsharedb", "0.1", "user credentials", 200000);
	if (!db) {
		log("Failed to connect to database.");
		return false;
	}

	db.transaction(function(tx) {
				tx.executeSql(
								"SELECT COUNT(*) FROM user",
								[],
								function(tx) {
									log("yes db ok, on va faire insertion");
									// alert("yes db ok, on va faire insertion");
									tx.executeSql('INSERT INTO user (login, passwd, email) values ("reda", "bere14", "reda@technovergence.fr")');
								},
								function(tx, error) {
									tx.executeSql(
													"CREATE TABLE user (login TEXT, passwd TEXT, email TEXT)",
													[], null, null);
								});
			});
}


//DEBUG PURPOSE
/**
 * Use it as follows: 
 * call timeDiff.setStartTime() at the start of your script 
 * and call timeDiff.getDiff() at the end. 
 * The timeDiff.getDiff() function will return the script execution time.
 * 
 * http://jdev.blogsome.com/2006/08/18/compact-script-to-calculate-script-execution-time/
 */
var timeDiff  =  {
	    setStartTime:function (){
	        d = new Date();
	        time  = d.getTime();
	    },

	    getDiff:function (){
	        d = new Date();
	        return (d.getTime()-time);
	    }
}
