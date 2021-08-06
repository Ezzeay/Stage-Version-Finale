// VARIABLES TO USE :

var scene = new THREE.Scene();
scene.autoUpdate = true;
var color3 = new THREE.Color("rgb(	128, 128, 128)");
scene.background = color3;
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100);

hlight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(hlight);
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
});
// Renderer
renderer.setSize(700, 500);
renderer.domElement.id = 'My3D';
renderer.setPixelRatio(window.devicePixelRatio / 1.1);
//renderer.outputEncoding = THREE.sRGBEncoding;
//renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement);

/// TEXTURE  !! 
var texture = new THREE.TextureLoader().load('modeles/belle-epoque.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.mapping = THREE.EquirectangularReflectionMapping;
texture.magFilter = THREE.LinearFilter;
texture.premultiplyAlpha = true;
texture.repeat.set(8, 8);
texture.needsUpdate = true;




var wall = new THREE.TextureLoader().load('modeles/wow.png');
wall.wrapT = THREE.RepeatWrapping;
wall.wrapS = THREE.RepeatWrapping;
wall.mapping = THREE.EquirectangularReflectionMapping;
wall.magFilter = THREE.LinearFilter;
wall.premultiplyAlpha = true;
wall.repeat.set(1, 1);
wall.needsUpdate = true;



// Geometry  ! 
const geometry2 = new THREE.PlaneGeometry(7, 2);
var material2 = new THREE.MeshBasicMaterial({ color: color3 });
material2.needsUpdate = true;
var floor = new THREE.Mesh(geometry2, material2);
floor.material.side = THREE.DoubleSide;
floor.position.set(-2, 1, -4.5);
floor.scale.set(1, 1, 1);
floor.rotation.x = 220;
scene.add(floor);




var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
var geometry = new THREE.BoxGeometry(5, 4, 3);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var cube = new THREE.Mesh(geometry, material);
const light = new THREE.DirectionalLight(0xffffff, 0.3, Infinity);
light.castShadow = true;
scene.add(light);
// 
// Loader
var loader = new THREE.GLTFLoader();
loader.load('js/uploads_files_2879580_realistic+interior.glb', (gltf) => {
        var Auditorio = gltf.scene;
        scene.add(Auditorio);
        Auditorio.autoUpdate = true;
        Auditorio.children[21].position.y = 0.05;
        for (let index = 0; index < Auditorio.children.length; index++) {
            if (Auditorio.children[index].userData.name == "rug") {
                Auditorio.children[index].rotation.y = Math.PI * 4 * 0.125;;
                Auditorio.children[index].position.x = -0.8;
                Auditorio.children[index].position.y = 0.03;
                Auditorio.children[index].position.z = -2;

            }
            if (Auditorio.children[index].userData.name == "Cube.013") {
                Auditorio.children[index].visible = false;
            }
            if (Auditorio.children[index].userData.name == "Window_Group") {
                Auditorio.children[index].material = material2;

                //Auditorio.children[index].visible = false;
            }
        }
        Auditorio.children[3].visible = false;
        Auditorio.castShadow = true;
        Auditorio.receiveShadow = true;
        Auditorio.needsUpdate = true;
        camera.position.set(1.720080306724795, 2.3311727504227524, 2.26);
    }, undefined,
    function(error) {
        console.error(error);
    });
var paint = document.getElementsByClassName("but")[1];
var TWOD = document.getElementsByClassName("but")[0];
var textureToShow = 0;


function turnto3D() {
    let dataURLstring = To3D();

    changeTexture(dataURLstring)
        //texture.premultiplyAlpha = true;
    texture.repeat.set(15, 15);
    texture.needsUpdate = true;
    var material2 = new THREE.MeshBasicMaterial({ map: texture, });
    /*material2.needsUpdate = true;
    loader.load('js/uploads_files_2879580_realistic+interior.glb', (gltf) => {
            var Auditorio = gltf.scene;
            for (let index = 0; index < Auditorio.children.length; index++) {
                if (Auditorio.children[index].userData.name == "rug") {
                    Auditorio.children[index].visible = false;
                }
                if (Auditorio.children[index].userData.name == "Plane" || Auditorio.children[index].userData.name == "Plane.003") {
                    Auditorio.children[index].material = material2;
                }
                if (Auditorio.children[index].userData.name == "Cube.013") {
                    Auditorio.children[index].visible = false;
                }
            }
            Auditorio.children[3].visible = false;
            Auditorio.castShadow = true;
            Auditorio.receiveShadow = true;
            scene.castShadow = true;
            scene.add(Auditorio);
        }, undefined,
        function(error) {
            console.error(error);
        });*/

}
paint.addEventListener("click", turnto3D);
TWOD.addEventListener("click", tothegrid);

function changeTexture(path) {
    texture = new THREE.TextureLoader().load(path);
    texture.offset.set(0.68, 0.68);
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    //texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.magFilter = THREE.LinearFilter;
    //texture.premultiplyAlpha = true;
    texture.repeat.set(15, 15);
    texture.needsUpdate = true;
    var material2 = new THREE.MeshBasicMaterial({ map: texture, });
    material2.needsUpdate = true;
    loader.load('js/uploads_files_2879580_realistic+interior.glb', (gltf) => {
            var Auditorio = gltf.scene;
            for (let index = 0; index < Auditorio.children.length; index++) {
                if (Auditorio.children[index].userData.name == "rug") {
                    Auditorio.children[index].visible = false;
                }
                if (Auditorio.children[index].userData.name == "Plane" || Auditorio.children[index].userData.name == "Plane.003") {
                    Auditorio.children[index].material = material2;
                }
                if (Auditorio.children[index].userData.name == "Cube.013") {
                    Auditorio.children[index].visible = false;
                }
            }
            Auditorio.children[3].visible = false;
            Auditorio.castShadow = true;
            Auditorio.receiveShadow = true;
            scene.castShadow = true;
            scene.add(Auditorio);
        }, undefined,
        function(error) {
            console.error(error);
        });

}
var animate = function() {
    setTimeout(function() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }, 1000 / 60);
};

animate();