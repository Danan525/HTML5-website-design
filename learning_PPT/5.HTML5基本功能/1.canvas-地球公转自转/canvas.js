//1 - Get object
//2 - Set Params
//3 - Make Shapes, lines, text, etc

function makeCanvas(){

	/////First Canvas - Text///////
	
	//1 - Get Object
	var canvas1 = document.getElementById('canvas1');
	var ctx1 = canvas1.getContext('2d');
	
	//2 - Set Params
	ctx1.font = '35pt Arial';
	ctx1.fillStyle = '#ff00ff';
	ctx1.strokeStyle = 'DarkSlateGrey';
	
	//3 - Make Shape
	ctx1.fillText("I Love HTML5",45,150);
	ctx1.strokeText("I Love HTML5",45,150);
	
	
	
	///////Second Canvas - Multiple Rectangles//////
	
	//Top Left Rectangle
	var canvas2 = document.getElementById('canvas2');
	var ctx2 = canvas2.getContext('2d');

	ctx2.fillStyle="#FF0000";
	ctx2.strokeStyle = "#000000";
	ctx2.lineWidth = 10;

    ctx2.fillRect(45,5,135,135);
    ctx2.strokeRect(45,5,135,135);
	
	//Top Right Rectangle (no stroke)
	ctx2.fillStyle="#666666";
    ctx2.fillRect(200,0,135,135);
	
	//Bottom Left Rectangle (no stroke)
	ctx2.fillStyle="#666666";
	
    ctx2.fillRect(45,150,135,135);
	
	//Bottom Right Rectangle
	ctx2.fillStyle="#ff0000";
	ctx2.strokeStyle = "#000000";
	ctx2.lineWidth = 10;
	ctx2.fillStyle="#ff0000";
	
    ctx2.fillRect(200,150,135,135);
    ctx2.strokeRect(200,150,135,135);
	
	
	
	//////Third Canvas - Lines//////
	
	var canvas3 = document.getElementById('canvas3');
	var ctx3 = canvas3.getContext('2d');
	
	ctx3.strokeStyle = "#666666";
	ctx3.fillStyle="#ff0000";
	ctx3.lineWidth = 5;
	
	//Start Line Path
	ctx3.beginPath();
	ctx3.moveTo(100,100);
	ctx3.lineTo(150,200);
	ctx3.lineTo(200,200);
	ctx3.lineTo(200,290);
	ctx3.lineTo(290,290);
	ctx3.lineTo(290,100);
	ctx3.lineTo(100,100);
	ctx3.stroke();
	ctx3.fill();
	ctx3.closePath();
	
	
	
	//////Fourth Canvas - Circles/////
	var canvas4 = document.getElementById('canvas4');
	var ctx4 = canvas4.getContext('2d');
	
	//Circle 1
	ctx4.fillStyle = "blue";
	
	ctx4.beginPath();
	ctx4.arc(200,30, 25, 0, Math.PI * 1.5);
	ctx4.fill();
	ctx3.closePath();
	
	//Circle 2
	ctx4.fillStyle = "red";
	
	ctx4.beginPath();
	ctx4.arc(200,100, 45, 0, Math.PI * 2);
	ctx4.fill();
	ctx3.closePath();
	
	//Circle 3
	ctx4.fillStyle = "black";
	
	ctx4.beginPath();
	ctx4.arc(200,220, 75, 0, Math.PI * 2);
	ctx4.fill();
	ctx3.closePath();
	
	
	
	//////Fifth Canvas - Animation/////
	var canvas5 = document.getElementById('canvas5');
	var ctx5 = canvas5.getContext('2d');
	
	var posX = 0;
	var posY = 0;
	setInterval(function(){
		posX += 1;
		posY += 1;
		
		//清屏
		ctx5.fillStyle="black";
	    ctx5.fillRect(0,0,canvas5.width,canvas5.height);
	
		//绘制白色圆形
		ctx5.fillStyle="white";
		ctx5.beginPath();
		ctx5.arc(posX,120, 55, 0, Math.PI * 2);
		ctx5.fill();
		ctx5.closePath();
		//绘制红色圆形
		ctx5.fillStyle="red";
		ctx5.beginPath();
		ctx5.arc(150,posY, 78, 0, Math.PI * 2);
		ctx5.fill();
		ctx5.closePath();
		//绘制蓝色圆形
		ctx5.fillStyle="blue";
		ctx5.beginPath();
		ctx5.arc(350,posY, 38, 0, Math.PI * 2);
		ctx5.fill();
		ctx5.closePath();
	}, 30);
	
}


	
  	


function drawBeauty(beauty){
	var mycv = document.getElementById("canvas6");  
	var myctx = mycv.getContext("2d");
	myctx.drawImage(beauty, 0, 0);
}
function load(){
	var beauty = new Image();  
	beauty.src = "http://images.cnblogs.com/cnblogs_com/html5test/359114/r_test.jpg"; 
	if(beauty.complete){
	   drawBeauty(beauty);
	}else{
	   beauty.onload = function(){
	     drawBeauty(beauty);
	   };
	   beauty.onerror = function(){
	     window.alert('美女加载失败，请重试');
	   };
	};   
}


//load
if (document.all) {
  window.attachEvent('onload', load);  //IE
}else {  
  window.addEventListener('load', load, false); //Chrome,Firefox,Safari
}

