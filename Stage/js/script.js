let app;
let container;
let player;
var grid;
var bunny;
var bunnies = [];
var pi = 0;
var keys = {};
let keysDiv;

window.onload = function() {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x303030,
        forceCanvas: false,
        resolution: window.devicePixelRatio || 1,
        antialiasing: true,
        transparent: false,
        preserveDrawingBuffer: true, // This is very important for us !
        autoDensity: true
    });
    document.body.appendChild(app.view);
    var grid = new PixiJSGrid(800).drawGrid();
    grid.drawBoundaries = false;
    container = new PIXI.Container();
    //app.stage.addChild(container);
    app.stage.addChild(grid);
    //container.addChild(grid);


}





// PAINTING THE MODELS : 
//var mug = document.getElementsByClassName("canvas");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.id = "Paint";
var originalPixels = null;
var currentPixels = null;

function HexToRGB(Hex) {
    var Long = parseInt(Hex.replace(/^#/, ""), 16);
    return {
        R: (Long >>> 16) & 0xff,
        G: (Long >>> 8) & 0xff,
        B: Long & 0xff
    };
}

function changeToWhite(data) {
    for (var i = 0; i < data.length; i++) {

        data[i] = data[i] ^ 255; // Invert Red
        data[i + 1] = data[i + 1] ^ 255; // Invert Green
        data[i + 2] = data[i + 2] ^ 255; // Invert Blue
    }
}

function changeMugsColor() {
    for (var ii = 0; ii < mug.length; ii++) {
        changeColor(mug[ii]);
    }
}

function changeColor(amug) {
    if (!originalPixels) return; // Check if image has loaded
    var newColor = HexToRGB(document.getElementById("color").value);

    for (var I = 0, L = originalPixels.data.length; I < L; I += 4) {
        if (currentPixels.data[I + 3] > 0) {
            currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
            currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
            currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
        }
    }

    ctx.putImageData(currentPixels, 0, 0);
    amug.src = canvas.toDataURL("image/png");

}

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
    }
    throw new Error('Bad Hex');
}



function imgChange(imagePath) {
    var c = document.getElementById("painting");
    var ctx = c.getContext("2d");
    var img = new Image();
    var imageData = ctx.getImageData(0, 0, c.width, c.height);
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };
    img.src = imagePath;
}

function isClose(color1, color2) {
    var threshold = 14;
    var distance = Math.abs(color1 - color2);

    if (distance < threshold) return true;
    return false;
}



function replacecol(ev, color) {
    var col = getpixelcolour(ev);
    var pixels = tempctx.getImageData(
        0, 0, img1.width, img1.height
    );
    var truth = hexToRgbA(document.getElementById("primary_color").value);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
        if (isClose(data[i], col[0]) && isClose(data[i + 1], col[1]) && isClose(data[i + 2], col[2]) && isClose(data[i + 3], col[3])) {

            data[i] = truth[0];
            data[i + 1] = truth[1];
            data[i + 2] = truth[2];
            //data[i + 3] = truth[3];

        }
    }
    tempctx.putImageData(pixels, 0, 0);
}

function takeshot() {
    html2canvas(document.getElementById('My3D'), {
        onrendered: function(temp) {
            return Canvas2Image.saveAsPNG(temp);
        }
    });

}

function changeImage(path) {
    var img = new Image();
    img.onload = function() {
        tempctx.drawImage(img, 0, 0, 250, 250, 0, 0, 250, 250);
    };
    //document.getElementById("painting").style.cursor = "url(/modeles/pixels/styledbrush.png)";

    img.src = path;
}

function draw() {
    // draw image
    tempctx.drawImage(this, 0, 0);
    tempctx.globalCompositeOperation = "source-out";
    var imageData = tempctx.getImageData(0, 0, temp.width, temp.height);
}



function getPixel(img, x, y) {

    let canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    let pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;
    return pixelData;
}

function To3D() {
    var dataURLstring = temp.toDataURL();

    return dataURLstring;
}


function PaintonGrid(i) {
    if (both[Math.floor(i)].type === 'Angle') {
        let string = both[Math.floor(i)].img_src;
        let size = both[Math.floor(i)].img_width;
        let type = both[Math.floor(i)].type;
        let secondstring = both[Math.floor(i + 5)].img_src
        let secondtype = both[Math.floor(i + 5)].type;
        let secondwidth = both[Math.floor(i + 5)].img_width;
        let secondheight = both[Math.floor(i + 5)].img_height;
        console.log(secondtype + " eyy " + secondwidth);
        let secondoffset = Math.ceil(secondwidth / 2);
        let offset = Math.ceil(both[Math.floor(i)].img_width / 2);
        changeImage(both[Math.floor(i)].img_src);
        console.log(type);
        let bool = DeleteStuff(type);

        if (bool == true) {
            bunnies.push(createMotif(offset, offset, size, size, string, type, 0));
            bunnies.push(createMotif(3 * offset + 4 * secondoffset, offset, size, size, string, type, 90));
            bunnies.push(createMotif(3 * offset + 4 * secondoffset, 3 * offset + 4 * secondoffset, size, size, string, type, 180));
            bunnies.push(createMotif(offset, 3 * offset + 4 * secondoffset, size, size, string, type, 270));
            console.log(bunnies);
            for (let index = 0; index < 4; index++) {
                app.stage.addChild(bunnies[bunnies.length - index - 1]);
                app.stage.children[app.stage.children.length - index - 1].type = type;

            }

        }
        return string;

    }
    if (both[Math.floor(i)].type === 'Frise') {
        let string = both[Math.floor(i)].img_src;
        let size = both[Math.floor(i)].img_width;
        let type = both[Math.floor(i)].type;
        let secondstring = both[Math.floor(i - 5)].img_src
        let secondtype = both[Math.floor(i - 5)].type;
        let secondwidth = both[Math.floor(i - 5)].img_width;
        let secondheight = both[Math.floor(i - 5)].img_height;

        let secondoffset = Math.ceil(secondwidth / 2);
        //console.log(offset + 2 * secondoffset);
        let offset = Math.ceil(both[Math.floor(i)].img_width / 2);
        changeImage(both[Math.floor(i)].img_src);

        let bool = DeleteStuff(type);
        if (bool == true) {
            bunnies.push(createMotif(offset + 2 * secondoffset, offset, size, size, string, type, 0));
            bunnies.push(createMotif(3 * offset + 2 * secondoffset, offset, size, size, string, type, 0));
            bunnies.push(createMotif(3 * offset + 4 * secondoffset, offset + 2 * secondoffset, size, size, string, type, 90));
            bunnies.push(createMotif(3 * offset + 4 * secondoffset, offset + 4 * secondoffset, size, size, string, type, 90));
            bunnies.push(createMotif(3 * offset + 2 * secondoffset, 3 * offset + 4 * secondoffset, size, size, string, type, 180));
            bunnies.push(createMotif(offset + 2 * secondoffset, 3 * offset + 4 * secondoffset, size, size, string, type, 180));
            bunnies.push(createMotif(offset, 3 * offset + 2 * secondoffset, size, size, string, type, 270));
            bunnies.push(createMotif(offset, offset + 2 * secondoffset, size, size, string, type, 270));
            console.log(bunnies);
            for (let index = 0; index < 8; index++) {
                app.stage.addChild(bunnies[bunnies.length - index - 1]);
                console.log(type);
                app.stage.children[app.stage.children.length - index - 1].type = type;

            }

        }
        return string;

    } else {
        changeImage(both[Math.floor(i)].img_src);
        changeTexture(both[Math.floor(i)].img_src);
        let string = both[Math.floor(i)].img_src;
        let size = both[Math.floor(i)].img_width;
        var type = both[Math.floor(i)].type;
        let secondoffset = getanglesize();
        let offset = Math.ceil(both[Math.floor(i)].img_width / 2);
        if (secondoffset === undefined) {
            secondoffset = 100;
        }
        secondoffset = Math.ceil(secondoffset / 2);
        let bool = DeleteStuff(type);
        console.log(offset);
        if (bool == true) {
            bunnies.push(createMotif(offset + 2 * secondoffset, 2 * secondoffset + offset, size, size, string, type, 0));
            bunnies.push(createMotif(3 * offset + 2 * secondoffset, 2 * secondoffset + offset, size, size, string, type, 90));
            bunnies.push(createMotif(3 * offset + 2 * secondoffset, 2 * secondoffset + 3 * offset, size, size, string, type, 180));
            bunnies.push(createMotif(offset + 2 * secondoffset, 3 * offset + 2 * secondoffset, size, size, string, type, 270));
            console.log(bunnies);
            for (let index = 0; index < 4; index++) {
                app.stage.addChild(bunnies[bunnies.length - index - 1]);
                app.stage.children[app.stage.children.length - index - 1].type = type;
            }

        }
        return string;

    }

}

function tothegrid() {
    var c = document.getElementById("painting");
    console.log(c);
    let type = getRecentItem();
    console.log(type);

    let offset = getsizetype(type);
    let size = offset;
    offset = Math.ceil(offset / 2);
    console.log(offset);
    var ctx = c.getContext("2d");


    var img = new Image();
    var imageData = ctx.getImageData(0, 0, 250, 250);
    var url = To3D();
    let string = c.toDataURL("images/png");
    let secondtype = getanglesize();
    if (secondtype === undefined) {
        secondtype = 100;
    }
    let secondoffset = Math.ceil(secondtype / 2);
    console.log(type);
    console.log(secondoffset);
    let bool = DeleteStuff(type);
    switch (type) {

        case "carre":
            let bool = DeleteStuff(type);
            let angleoffset = Math.ceil(getanglesize() / 2);
            console.log(type);
            if (bool === true) {

                bunnies.push(createMotif(offset + 2 * secondoffset, 2 * secondoffset + offset, size, size, string, type, 0));
                bunnies.push(createMotif(3 * offset + 2 * secondoffset, 2 * secondoffset + offset, size, size, string, type, 90));
                bunnies.push(createMotif(3 * offset + 2 * secondoffset, 2 * secondoffset + 3 * offset, size, size, string, type, 180));
                bunnies.push(createMotif(offset + 2 * secondoffset, 3 * offset + 2 * secondoffset, size, size, string, type, 270));
                console.log(bunnies);
                for (let index = 0; index < 4; index++) {
                    app.stage.addChild(bunnies[bunnies.length - index - 1]);
                    app.stage.children[app.stage.children.length - index - 1].type = type;

                }

            }

            break;

        case "Frise":




            bunnies.push(createMotif(offset + 2 * secondoffset, offset, size, size, string, type, 0));
            bunnies.push(createMotif(3 * offset + 2 * secondoffset, offset, size, size, string, type, 0));
            bunnies.push(createMotif(3 * offset + 4 * secondoffset, offset + 2 * secondoffset, size, size, string, type, 90));
            bunnies.push(createMotif(3 * offset + 4 * secondoffset, offset + 4 * secondoffset, size, size, string, type, 90));
            bunnies.push(createMotif(3 * offset + 2 * secondoffset, 3 * offset + 4 * secondoffset, size, size, string, type, 180));
            bunnies.push(createMotif(offset + 2 * secondoffset, 3 * offset + 4 * secondoffset, size, size, string, type, 180));
            bunnies.push(createMotif(offset, 3 * offset + 2 * secondoffset, size, size, string, type, 270));
            bunnies.push(createMotif(offset, offset + 2 * secondoffset, size, size, string, type, 270));
            console.log(bunnies);
            for (let index = 0; index < 8; index++) {
                app.stage.addChild(bunnies[bunnies.length - index - 1]);
                console.log(type);
                app.stage.children[app.stage.children.length - index - 1].type = type;

            }

            break;
    }


    //changeImage(c.toDataURL("images/png"));

    //console.log("check this " + c.width + " and this " + 3 * c.width);

}


function getPixels(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
    originalPixels = ctx.getImageData(0, 0, img.width, img.height);
    currentPixels = ctx.getImageData(0, 0, img.width, img.height);

    img.onload = null;
}

function copy() {
    var imgwidth = img1.width;
    var imgheight = img1.height;
    temp.width = imgwidth;
    temp.height = imgheight;
    tempctx.drawImage(img1, 0, 0);
}

function getpixelcolour(ev) {
    var x = ev.layerX;
    var y = ev.layerY;
    var pixeldata = tempctx.getImageData(x, y, 1, 1);
    return pixeldata.data;
}

function readcol(ev) {
    var col = getpixelcolour(ev);
}




//document.getElementById("primarycolor").setAttribute('value', getAverageRGB(To3D));
const findPixel = (() => {
    var can, ctx;

    function createCanvas(w, h) {
        if (can === undefined) {
            can = document.createElement("canvas");
            ctx = can.getContext("2d");
        }
        can.width = w;
        can.height = h;
    }

    function getPixels(img) {
        const w = img.naturalWidth || img.width,
            h = img.naturalHeight || img.height;
        createCanvas(w, h);
        ctx.drawImage(img, 0, 0);
        try {
            const imgData = ctx.getImageData(0, 0, w, h);
            can.width = can.height = 1; // make canvas as small as possible so it wont 
            // hold memory. Leave in place to avoid instantiation overheads
            return imgData;
        } catch (e) {
            console.warn("Image is un-trusted and pixel access is blocked");
            ctx = can = undefined; // canvas and context can no longer be used so dump them
        }
        return { width: 0, height: 0, data: [] }; // return empty pixel data
    }
    const hex2RGB = h => { // Hex color to array of 3 values
        if (h.length === 4 || h.length === 5) {
            return [parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16), parseInt(h[3] + h[3], 16)];
        }
        return [parseInt(h[1] + h[2], 16), parseInt(h[3] + h[4], 16), parseInt(h[5] + h[6], 16)];
    }
    const idx2Coord = (idx, w) => ({ x: idx % w, y: idx / w | 0 });
    return function(img, hex, minDist = Infinity) {
        const [r, g, b] = hex2RGB(hex);
        const { width, height, data } = getPixels(img);
        var idx = 0,
            found;
        while (idx < data.length) {
            const R = data[idx] - r;
            const G = data[idx + 1] - g;
            const B = data[idx + 2] - b;
            const d = R * R + G * G + B * B;
            if (d === 0) { // found exact match 
                return {...idx2Coord(idx / 4, width), distance: 0 };
            }
            if (d < minDist) {
                minDist = d;
                found = idx;
            }
            idx += 4;
        }
        return found ? {...idx2Coord(found / 4, width), distance: minDist ** 0.5 | 0 } : undefined;
    }
})();