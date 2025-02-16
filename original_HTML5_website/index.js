window.onload = function () {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image()
    img.src='./img/flower.png'
    img.onload=function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
    }
    function Petal(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.update = function () {
            this.y += this.speed;
            this.draw();
        }
    }

    var petals = [];


    for (var i = 0; i < 50; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 5 + 3;
        var color = '#a46f61';
        var speed = Math.random() * 2 + 1;
        petals.push(new Petal(x, y, radius, color, speed));
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function animate() {
        requestAnimationFrame(animate);
        clearCanvas();


        for (var i = 0; i < petals.length; i++) {
            petals[i].update();


            if (petals[i].y - petals[i].radius > canvas.height) {
                petals[i].x = Math.random() * canvas.width;
                petals[i].y = -petals[i].radius;
            }
        }
    }


    animate();



    // 拖拽js
    var draggable = document.getElementById('draggable');
    var offsetX, offsetY;
    draggable.addEventListener('mousedown', function (e) {
        offsetX = e.clientX - draggable.offsetLeft;
        offsetY = e.clientY - draggable.offsetTop;
        document.addEventListener('mousemove', onMouseMove);
    });
    function onMouseMove(e) {
        var newX = e.clientX - offsetX;
        var newY = e.clientY - offsetY;
        draggable.style.left = newX + 'px';
        draggable.style.top = newY + 'px';
    }
    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMouseMove);
    });

};

