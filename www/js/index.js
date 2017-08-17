var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        
document.addEventListener("offline", onOffline, false);
 
function onOffline() {
myApp.alert('Отсутствует подклюение к Интернет!');
}
document.addEventListener("online", onOnline, false);
 
function onOnline() {
}
        
        rr=1;
function didReceiveRemoteNotificationCallBack(jsonData) {   
rr=2;
var ref = cordova.InAppBrowser.open(jsonData.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
}

function didOpenRemoteNotificationCallBack(jsonData) {
rr=2;
//ref.close();
// Для Andori
//var newdata = JSON.parse ( jsonData.notification.payload.additionalData );
//alert(newdata.ssylka);
//var ref = cordova.InAppBrowser.open(newdata.ssylka , '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
//  Для Iphone
 var ref = cordova.InAppBrowser.open(jsonData.notification.payload.additionalData.ssylka, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
}
 
        
        
        //Настройка ПУШЕЙ ДЛЯ АЙФОНА
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = true;

        //ПОДКЛЮЧЕНИЕ ПУШЕЙ
           window.plugins.OneSignal
          .startInit("e1beb418-934b-4e48-b6df-4664b8b5a967")
          .handleNotificationReceived(didReceiveRemoteNotificationCallBack)
          .handleNotificationOpened(didOpenRemoteNotificationCallBack)
              .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
          .iOSSettings(iosSettings)
          .endInit();
        
        window.plugins.OneSignal.getIds(function(ids) {
                    ipush = ids.userId;
localStorage.ipush=ipush;
            });
        

    }
};

app.initialize();
