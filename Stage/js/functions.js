function tooltip(event) {
    this.data = event.data;
    this.id = event.data.pointerId;
    console.log(this.data);
    var newPosition = this.data.getLocalPosition(this.parent);
    $('.rightClick').removeClass('showing');
    $('.rightClick').removeClass('.buttons');
    var n = $('.rightClick').clone(false);
    $('.rightClick').fadeOut(350);
    //console.log($('.rightClick').parent().removeClass('showing'));
    setTimeout(function() {
        $('.rightClick').css({
            top: Math.floor(newPosition.y / 50) * 50 - 300 // Y
                ,
            left: Math.floor(newPosition.x / 50) * 50 + 650 // Y
                ,
        }).fadeIn(100).addClass('showing');
    }, 600);
    $('.rightClick .delete').click(function() {

        $('.rightClick').removeClass('showing').fadeOut(400);
        $('.rightClick').removeClass('showing');
    });
    $('.rightClick .rotate').click(function() {

        console.log("done");
        $('.rightClick').removeClass('showing').fadeOut(400);
        $('.rightClick').removeClass('showing');

    });
    setTimeout(function() {
        $('.rightClick').removeClass('showing').fadeOut(400);
        //$('.rightClick').closest().removeChild();
        console.log($('.rightClick').closest());
        console.log($('.rightClick').closest().remove());
        $('.rightClick').removeClass('showing');
        $('.rightClick').removeClass('buttons').fadeOut(400);
        //console.log($('.rightClick').removeClass('rightClick showing'));
    }, 6000);

}

function gameLoop(delta) {
    keysDiv.innerHTML = JSON.stringify(keys);
}

function createMotif(x, y, height, width, string, type, rotation) {
    var bunny = new PIXI.Sprite.from(string);
    bunny.name = string;
    bunny.height = height;
    bunny.width = width;
    bunny.anchor.set(0.5);
    bunny.x = x;
    bunny.type = type;
    bunny.y = y;
    bunny.visibility = true;
    bunny.interactive = true;
    var pivot = rotation * (Math.PI / 180);
    bunny.rotation += pivot;
    window.addEventListener("keyup", keyup);
    window.addEventListener("keydown", keydown);
    window.addEventListener("keydownstart", keydownStart);
    window.addEventListener("keydownend", keydownEnd);
    keysDiv = document.querySelector("#keys");
    bunny
        .on("click", tooltip)
        .on("mouseup", tooltipoff)
        .on("mouseover", bunnyhigh)
        .on('pointerup', onDragEnd)
        .on('pointerdown', onDragStart)
        .on('pointermove', onDragMove)
        .on('pointerdownkey', keydownStart)
        .on('pointerupkey', keydownEnd)
        .on("mousedown", tooltipon)
    return bunny;
}



function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.mousePressPoint = [];
    this.mousePressPoint[0] = this.data.getLocalPosition(this.parent).x;
    this.mousePressPoint[1] = this.data.getLocalPosition(this.parent).y;
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    this.data = null;
}

function tooltipon(event) {
    this.data = event.data;
    this.tooltip = false;
}

function tooltipoff(event) {
    this.data = null;
    this.tooltip = true;
}

function onDragMove() {

    if (this.dragging) {
        var position = this.data.getLocalPosition(this.parent);
        this.position.x = (position.x);
        this.position.y = (position.y);
        var string = getName(this.position.x, this.position.y);
        var offset = getOffset(this.position.x, this.position.y);
        this.position.x = Math.floor(this.position.x / offset) * offset;
        this.position.y = Math.floor(this.position.y / offset) * offset;

        if (!removeDuplicate(this.position.x + offset, this.position.y + offset) && !removeDuplicate(this.position.x + 3 * offset, this.position.y + offset) && !removeDuplicate(this.position.x + offset, this.position.y + 3 * offset) && !removeDuplicate(this.position.x + 3 * offset, this.position.y + 3 * offset)) {
            if (keys["17"] == false) {

            } else {
                this.x = this.position.x;
                this.y = this.position.y;

            }
        }
    }
}



function removeDuplicate(x, y) {

    for (const element of bunnies) {


        if (x == element.x && y == element.y) {




            return false;
        }
    }
    return true;
}

function getName(x, y) {

    for (const element of bunnies) {
        if (x == element.x && y == element.y) {
            return element.name;
        }
    }
}

function getRecentItem() {
    let last = 0;
    for (let index = 0; index < bunnies.length; index++) {
        last = bunnies[index].type;

    }
    return last;
}

function getsizetype(type) {
    for (let index = 0; index < bunnies.length; index++) {
        if (bunnies[index].type === type) {
            return bunnies[index].width;
        }
    }
}

function getOffset(x, y) {

    for (const element of bunnies) {
        if (x == element.x && y == element.y) {
            return Math.ceil(element.width / 2);
        }
    }
}

function getcarresize() {
    for (let index = 0; index < bunnies.length; index++) {
        if (bunnies[index].type === 'carre') {
            return bunnies[index].size;
        }
    }
}

function getanglesize() {
    for (let index = 0; index < bunnies.length; index++) {
        if (bunnies[index].type === 'Angle') {
            return bunnies[index].width;
        }
    }
}

function DeleteStuff(type) {

    for (var step = 0; step < app.stage.children.length; step++) {
        if (app.stage.children[step].type === type) {
            app.stage.removeChild(app.stage.children[1 + step]);
            bunnies.splice(step, bunnies.length - step);
            console.log(bunnies);
            console.log(step);
            console.log(app.stage.children.length);

        }


        //app.stage.removeChild(bunnies[i])





    }




    return true;
}

function keyup(e) {
    keys[e.keyCode] = true;
}




function rotateMotif(x, y, angle) {

    var radian = angle * (Math.PI / 180);

    for (var step = 0; step < bunnies.length; step++) {

        if (bunnies[step].x == x && bunnies[step].y == y) {
            bunnies[step].rotation += radian;
        }
    }

}

function keydownStart(event) {
    this.data = event.dataset;
}

function keydownEnd(event) {
    this.data = event.data;
}

function bunnyhigh(event) {
    this.data = event.data;
    var colorMatrix = new PIXI.filters.ColorMatrixFilter();
    event.target.filters = [colorMatrix];
    colorMatrix.blackAndWhite(0);
    timer = setTimeout(function() {
        colorMatrix.reset();
    }, 300);
}




function keydown(e) {
    keys[e.keyCode] = false;
    //if (!keys["17"]) {
    //onDragMove()
}







function generateGetBoundingClientRect(x = 0, y = 0) {
    return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
    });
}




function folderclick() {

    var targList = document.getElementsByClassName("mine");
    if (targList) {
        for (var x = 0; x < targList.length; x++) {
            if (targList[x].style.visibility == "hidden") {
                targList[x].style.visibility = "visible";
            } else {
                targList[x].style.visibility = 'hidden';
            }
        }
    }
}

function loadpic() {
    var mylist = document.getElementsByClassName('mine2');
    var mylist2 = document.getElementsByClassName('mine');
    var id = 0;
    try {
        if (id == 3) {
            id = 0;
            let string = list[Math.floor(id)].img_src;
            //bunnies.push(createMotif(25, 25, string));
            //app.stage.addChild(bunnies[bunnies.length - 1]);
            id++;
        }
        if (id < 3) {
            //let string = list[Math.floor(id)].img_src;
            //bunnies.push(createMotif(25, 25, string));
            //app.stage.addChild(bunnies[bunnies.length - 1]);
            id++;
        }
    } catch (e) {
        console.log("YO", e);
    }
}







function start() {

    window.onload = load;
    if (window.addEventListener) {
        window.addEventListener('load', load);
    } else if (window.attachEvent) { window.attachEvent('onload', load); }

    //window.addEventListener('load', load);
}

function loadimage() {
    var ctx = document.getElementById('painting');
    console.log(ctx);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img1 = new Image();
        img1.src = 'modeles/echoppe.png';
        img1.onload = function() {
            //draw background image
            ctx.drawimage(img1, 0, 0);
            //draw a box over the top
            ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            ctx.fillRect(0, 0, 500, 500);
        };
    }
}