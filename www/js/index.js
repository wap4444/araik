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
        //Настройка ПУШЕЙ ДЛЯ АЙФОНА
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = false;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = true;
        
        //ПОДКЛЮЧЕНИЕ ПУШЕЙ
           window.plugins.OneSignal
          .startInit("82b9c889-5c3a-4526-abaf-271d6d269892")
          .handleNotificationReceived(didReceiveRemoteNotificationCallBack)
          .handleNotificationOpened(didOpenRemoteNotificationCallBack)
              .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
          .iOSSettings(iosSettings)
          .endInit();
        
        window.plugins.OneSignal.getIds(function(ids) {
        ipush = ids.userId;
            var ref = cordova.InAppBrowser.open('http://mirada.kz/project_ksk/index.html?push='+ipush, '_blank', 'location=no,toolbar=no,disallowoverscroll=yes');
        });
        

    }
};

app.initialize();
