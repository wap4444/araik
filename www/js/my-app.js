// Initialize your app
var myApp = new Framework7({
	modalTitle: 'Lingustan',
		pushState: true
});

// Export selectors engine
var $$ = Dom7;

var mySwiperSlow = myApp.swiper('.swiper-slow', {
  pagination:'.swiper-slow .swiper-pagination',
          centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
		loop: true
});   


	  $.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/blogs.php',dataType : "json",
success: function(blogSp){
		  $('#postss').empty();
$.each(blogSp, function(key1, data1) {
	mySwiperSlow.appendSlide('  <div class="swiper-slide"><a href="blogpost.html?id='+blogSp[key1].id+'"><img src="http://araik.controlsoft.kz/admin/'+blogSp[key1].img+'"  style="width:100%;" ></a></div>');
});
	
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});





// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
	      myApp.closePanel();
});


myApp.onPageInit('blogs', function (page) {
      myApp.closePanel();

	  $.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/blogs.php',dataType : "json",
success: function(blogSp){
		  $('#postss').empty();
$.each(blogSp, function(key1, data1) {
$('#postss').append('\
<div class="card demo-card-header-pic">\
  <div style="background-image:url(http://araik.controlsoft.kz/admin/'+blogSp[key1].img+')" valign="bottom" class="card-header color-white no-border">'+blogSp[key1].name+'</div>\
  <div class="card-content">\
    <div class="card-content-inner">\
      <p>'+blogSp[key1].text+'</p>\
    </div>\
  </div>\
  <div class="card-footer">\
    <a href="blogpost.html?id='+blogSp[key1].id+'" class="link">Читать полностью</a>\
  </div>\
</div>');
});
	
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
});


 // Страница с записью
myApp.onPageInit('blogpost', function (page) {
var postid = page.query.id;
	  $.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/blogs.php',dataType : "json",data:{	id: postid},
	  success: function(blogSp){
$('#blogname').html(blogSp[1].name);
$('.newspost').html('<div class="card demo-card-header-pic">\
  <div style="background-image:url(http://araik.controlsoft.kz/admin/'+blogSp[1].img+')" valign="bottom" class="card-header color-white no-border">'+blogSp[1].name+'</div>\
  <div class="card-content">\
    <div class="card-content-inner">\
      <p>'+blogSp[1].text+'<br>\
<a id="shara" name="'+blogSp[1].name+'" text="'+blogSp[1].name+'">Расшарить</a></p>\
    </div>\
  </div>\
</div>');
		  
},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
});
});

$(document).on("click","#shara", function() {
myApp.alert("Шара");
	nameShara=$(this).attr(name);
	textShara=$(this).attr(text);
window.plugins.socialsharing.share(nameShara,textShara);		
});


$(document).on("click","#cam", function() {
navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
destinationType: Camera.DestinationType.DATA_URL ,
targetWidth:100,
targetHeight:50				       });

function onSuccess(imageURI) {
var image = document.getElementById('myImage');
image.src = "data:image/jpeg;base64,"+imageURI;
alert("data:image/jpeg;base64,"+imageURI);
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/admin/api/appPhoto.php',data: {image:imageURI},
success: function(data){
alert(data);},
error: function(XMLHttpRequest, textStatus, errorThrown){
	myApp.alert("Ошибка");
}
       });
}

function onFail(message) {
    alert('Failed because: ' + message);
}		
});

if(localStorage.phone){
$('#login').hide();	
$('#clientPhoto').html('<img src="http://araik.controlsoft.kz/admin/'+localStorage.clientPhoto+'"  width="100%" style="border-radius:50%">');
$('#clientInfoArea').html(localStorage.secondName);


//Вывод групп клиента
function GetUserProg(ClientId){
$('#allProfUser').empty();
$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/admin/api/findClientProg.php',data: {ClientId:ClientId},dataType : "json",
success: function(clientGroupSp){
$.each(clientGroupSp, function(key1, data1) {
$('#clientInfoArea').append('<hr><span style="font-size: 12px;" class="userProg" progId="'+clientGroupSp[key1].id+'">'+clientGroupSp[key1].price_name+' (Осталось занятий: '+clientGroupSp[key1].count+' / Истекает: '+clientGroupSp[key1].data_end+') - <b>'+clientGroupSp[key1].grName+'</b> | Средняя оценка - '+clientGroupSp[key1].sr+'</span><br>');
});

}
});
};
GetUserProg(localStorage.ClientId)
}


/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////РЕГИСТРАЦИЯ
$$('#login').on('click', function () {
$('#clientPhoneReg').inputmask("79999999999");
myApp.loginScreen();
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
myApp.alert(localStorage.pass);
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

$.ajax({type: 'POST',url: 'http://araik.controlsoft.kz/fr7/api/regFinal.php',data: {clientPhoneReg:clientPhoneReg,clientPhonePass:clientPhonePass},
success: function(data){
if(data.charAt(0)=='E'){myApp.alert('Неверный пароль');}
else{
clientData = JSON.parse(data);
localStorage.pass=clientData[0].pass;
localStorage.ClientId=clientData[0].id;
localStorage.phone=clientData[0].phone;
localStorage.secondName=clientData[0].secondName;
localStorage.clientPhoto=clientData[0].photo;
$('#login').hide();
$('#clientPhoto').html('<img src="http://araik.controlsoft.kz/'+localStorage.clientPhoto+'"  width="100%" style="border-radius:50%">');
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
