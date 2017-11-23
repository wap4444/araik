// Initialize your app
var myApp = new Framework7({
	modalTitle: 'Lingustan',
		pushState: true,
		modalButtonCancel: 'Отмена',
		fastClicks: true,
		uniqueHistory: true,
modalPreloaderTitle: 'Загрузка...',
		
	onPageInit: function (myApp, page) {
    if (page.name === 'index') {
		var mySwiperSlow = myApp.swiper('.swiper-slow', {
  pagination:'.swiper-slow .swiper-pagination',
          centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
		loop: true
});   
		
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/blogs.php',dataType : "json",
success: function(blogSpSlide){
$.each(blogSpSlide, function(key1, data1) {
mySwiperSlow.appendSlide('  <div class="swiper-slide"><a href="blogpost.html?id='+blogSpSlide[key1].id+'"><img src="http://araik.controlsoft.kz/admin/'+blogSpSlide[key1].img+'"  style="width:100%;" ></a></div>');
});
},
error: function(XMLHttpRequest, textStatus, errorThrown){
myApp.alert("Ошибка");
}
});

if(localStorage.phone){
userUpd();

}else{
$('#lenta').html('Вам необходимо пройти регистрацию');
}}
    if (page.name === 'blogpost') {
var postid = page.query.id;
	  $.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/blogs.php',dataType : "json",data:{	id: postid},
	  success: function(blogSp){
$('#blogname').html(blogSp[1].name);
$('.newspost').html('<div class="card demo-card-header-pic">\
  <div style="background-image:url(http://araik.controlsoft.kz/admin/'+blogSp[1].img+')" valign="bottom" class="card-header color-white no-border">'+blogSp[1].name+'</div>\
  <div class="card-content">\
    <div class="card-content-inner">\
      <p>'+blogSp[1].text+'<br>\
<a id="shara" name="'+blogSp[1].name+'" text="'+blogSp[1].name+'" imgSrc="'+blogSp[1].img+'">Поделиться</a></p>\
    </div>\
  </div>\
</div>');
		  
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
	}
	}
});

// Export selectors engine
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
	myApp.closePanel();
});

function getDZUrok(	dzid ){
$('#dzPageTitle').text('Задание '+dzid);
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/dzOpis.php',dataType : "json",data:{id:dzid},
success: function(dzOpis){
if(dzOpis[1].video){
	dzAct='<a class="external" href="'+dzOpis[1].video+'"><img src="http://ot003.ru/img-q5y5x5n4g4041456w4t4q2x5i5s574a4e4f5o4o494c4g5g4v5e464d474v254u5d4/blog/wp-content/uploads/2013/09/Fotolia_55858492_XS.jpg" width="100%"></a>';
}else{
	dzAct='<img src="http://araik.controlsoft.kz/admin/'+dzOpis[1].photo+'" width="100%">';
}
if(dzOpis[1].status=='0'){
		dzActDone='<a style="text-align:center;"  class="dzDone" dzid="'+dzOpis[1].id+'">Не выполнено</a>';
}else{
	dzActDone='<a style="text-align:center;" dzid="'+dzOpis[1].id+'">Выполнено</a>';
}
$('#dzPageDiv').html('<div class="card demo-card-header-pic">\
  <div class="card-content">\
    <div class="card-content-inner">\
      <p>'+dzOpis[1].text+'<br>\
	  '+dzAct+'\
</p>\
	    <div class="card-footer">\
 '+dzActDone+'\
  </div>\
    </div>\
  </div>\
</div>'); 
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
};


function getRaspis(grId){
	$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/findRaspis.php',data: {grId:grId},dataType : "json",
	success: function(clientGroupSp){
$('#raspisDiv').empty();
		$.each(clientGroupSp, function(key1, data1) {
	timeStart=clientGroupSp[key1].timeStart;
	timeStart=timeStart.substr(0, timeStart.length - 3);
			
$('#raspisDiv').append('<div class="card">\
  <div class="card-content">\
    <div class="card-content-inner" style="text-align:center;">'+clientGroupSp[key1].date+' '+timeStart+'</div>\
  </div>\
</div>');
});
		
	}
	})
};

myApp.onPageInit('dz', function (page) {
			var dzid = page.query.id;
getDZUrok(dzid);
});


myApp.onPageInit('raspis', function (page) {
getRaspis(localStorage.groupaUser);

});




myApp.onPageInit('prof', function (page) {
userUpd();
});

$(document).on("click","#admGo", function() {
var ref = cordova.InAppBrowser.open('http://araik.controlsoft.kz/admin/pages/examples/sign-in.html?ipush='+localStorage.ipush, '_blank', 'location=yes','closebuttoncaption=Закрыть');
});
$(document).on("click",".dzDone", function() {
	    myApp.showIndicator();
	dzId=$(this).attr('dzid');
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/dzDone.php',data:{dzId:dzId},
success: function(dzDoneJson){
	getDZUrok(dzId);
	   myApp.hideIndicator();
	   myApp.alert('Вы выполнили задание');
},
error: function(XMLHttpRequest, textStatus, errorThrown){		   myApp.hideIndicator();myApp.alert("Ошибка");}
});
});

myApp.onPageInit('blogs', function (page) {

	$('#postss').empty();
 $.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/blogs.php',dataType : "json",
success: function(blogSp3){

$.each(blogSp3, function(key1, data1) {
$('#postss').append('\
<div class="card demo-card-header-pic">\
  <div style="background-image:url(http://araik.controlsoft.kz/admin/'+blogSp3[key1].img+')" valign="bottom" class="card-header color-white no-border">'+blogSp3[key1].name+'</div>\
  <div class="card-content">\
    <div class="card-content-inner">\
      <p>'+blogSp3[key1].text+'</p>\
    </div>\
  </div>\
  <div class="card-footer">\
    <a href="blogpost.html?id='+blogSp3[key1].id+'" class="link">Читать полностью</a>\
  </div>\
</div>');
});
	
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
});


$(document).on("click","#shara", function() {
	nameShara=$(this).attr('name');
	textShara=$(this).attr('text');	
	imgSrc=$(this).attr('imgSrc');	
	window.plugins.socialsharing.share(null, null, 'http://araik.controlsoft.kz/admin/'+imgSrc, null);
});


$(document).on("click","#cam", function() {
navigator.camera.getPicture(onSuccess, onFail, { quality: 80,
destinationType: Camera.DestinationType.DATA_URL ,
correctOrientation:true,
sourceType: Camera.PictureSourceType.CAMERA,
allowEdit: true,
encodingType: Camera.EncodingType.JPEG,
targetWidth:400,
targetHeight:400 });

function onSuccess(imageURI) {
	$("#cam").attr("src","data:image/jpeg;base64," + imageURI);
clid1=localStorage.ClientId;
fotoUpload(imageURI, clid1);
}

function onFail(message) {
    alert('Failed because: ' + message);
}		
});

function fotoUpload(imageData, ClientId){
$.ajax({
      		type: "POST",
      		url: "http://araik.controlsoft.kz/admin/api/appPhoto.php",
      		data: { image:imageData, ClientId:ClientId},
      		cache: false,
      		contentType: "application/x-www-form-urlencoded",
success: function (result) {
userUpd();
}
});
};

//Вывод групп клиента
function GetUserProg(ClientId){
$('#lenta').empty();
$('#allProfUser').empty();
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/admin/api/findClientProg.php',data: {ClientId:ClientId},dataType : "json",
success: function(clientGroupSp){
$.each(clientGroupSp, function(key1, data1) {
	groupaUser=clientGroupSp[key1].groupa;
	localStorage.groupaUser=clientGroupSp[key1].groupa;
$('#clientInfoArea').append('<hr><span style="font-size: 12px;" class="userProg" progId="'+clientGroupSp[key1].id+'">'+clientGroupSp[key1].price_name+' (Осталось занятий: '+clientGroupSp[key1].count+' / Истекает: '+clientGroupSp[key1].data_end+') - <b>'+clientGroupSp[key1].grName+'</b> | Средняя оценка - '+clientGroupSp[key1].sr+'</span><br>');
});
getDZ();
}
});
};

function getDZ(){

	$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/dz.php',data: {groupaUser:groupaUser},dataType : "json",
success: function(groupaUserSp){
$.each(groupaUserSp, function(key1, data1) {
if(groupaUserSp[key1].status=='1'){
	color='#777';
}else{
	color='#007aff';
}
$('#lenta').append('<a style="color:'+color+';" href="dz.html?id='+groupaUserSp[key1].id+'">Домашнее задание №'+groupaUserSp[key1].id+'</a><hr>');
});
}
});
}

function userUpd(){
$('#lenta').empty();
$('#login').hide();
$('#profile').show();
$('#raspisMenu').show();


$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/userInfo.php',data: {clid:localStorage.ClientId},
success: function(data){
clientData = JSON.parse(data);
localStorage.pass=clientData[0].pass;
localStorage.ClientId=clientData[0].id;
ClientId=clientData[0].id;
localStorage.phone=clientData[0].phone;
localStorage.secondName=clientData[0].secondName;
localStorage.firstName=clientData[0].firstName;
localStorage.clientPhoto=clientData[0].photo;
	$('#clientPhoto').html('<img id="cam" src="http://araik.controlsoft.kz/admin/'+localStorage.clientPhoto+'"  width="100%" style="border-radius:50%">');
	$('#clientInfoArea').html(localStorage.secondName+' '+localStorage.firstName);	
	
	
	$('#allProfUser').empty();
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/admin/api/findClientProg.php',data: {ClientId:ClientId},dataType : "json",
success: function(clientGroupSp){
$.each(clientGroupSp, function(key1, data1) {
		localStorage.groupaUser=clientGroupSp[key1].groupa;
		groupaUser=clientGroupSp[key1].groupa;
$('#clientInfoArea').append('<hr><span style="font-size: 12px;" class="userProg" progId="'+clientGroupSp[key1].id+'">'+clientGroupSp[key1].price_name+' (Осталось занятий: '+clientGroupSp[key1].count+' / Истекает: '+clientGroupSp[key1].data_end+') - <b>'+clientGroupSp[key1].grName+'</b> | Средняя оценка - '+clientGroupSp[key1].sr+'</span><br>');
});
getDZ();
}
});
	
	
}
});

};


$$('#bestUser').on('click', function () {
	myApp.alert('Нет данных. Повторите попытку позже');
});

/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////РЕГИСТРАЦИЯ
$$('#login').on('click', function () {
$('#clientPhoneReg').inputmask("79999999999");
myApp.loginScreen();
});

$(document).on("click","#regClose", function() {
	console.log('111');
	myApp.closeModal();
});

$(document).on("click","#GoReg", function() {
	clientPhoneReg=$('#clientPhoneReg').val();
	if(clientPhoneReg.length<11){
		myApp.alert('Неверный номер телефона');
	}else{
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/reg.php',data: {clientPhoneReg:clientPhoneReg},
success: function(data){
if(data.charAt(0)=='E'){myApp.alert('Клиент с таким номером телефона не найден');}
else{
clientData = JSON.parse(data);
localStorage.pass=clientData[0].pass;
myApp.alert('Мы отправили Вам СМС сообщение с проверочным кодом');
$('#passArea').slideDown(500);$('#GoReg').hide();$('#GoReg1').show();
}
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
	}
});


$(document).on("click","#GoReg1", function() {
clientPhonePass=$('#clientPhonePass').val();
myApp.alert('1111'+localStorage.ipush);
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/regFinal.php',data: {clientPhoneReg:clientPhoneReg,clientPhonePass:clientPhonePass,ipush:localStorage.ipush},
success: function(data){
if(data.charAt(0)=='E'){myApp.alert('Неверный пароль');}
else{
clientData = JSON.parse(data);
localStorage.ClientId=clientData[0].id;
localStorage.secondName=clientData[0].secondName;
	userUpd();
	myApp.closeModal();
myApp.alert(localStorage.secondName+', спасибо за регистрацию!');
}
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
	
});
//////////////////////////////

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
