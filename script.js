import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene();
const texture = new THREE.TextureLoader();

const gradientTexture = texture.load("./rad-grad.png")
const gradientMaterial = new THREE.MeshBasicMaterial({
    map: gradientTexture,
    transparent: true
})
const gradientGeometry = new THREE.PlaneGeometry(5, 5, 5)
const gradientMesh = new THREE.Mesh(gradientGeometry, gradientMaterial);
gradientMesh.position.z = -1;
scene.add(gradientMesh)



const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color : 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
scene.add(hemiLight)


const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

window.addEventListener('resize', () => {


    sizes.height = widnow.innerHeight
    sizes.width = window.innerWidth

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

// Second Camera for gradient
const gradientCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
const gradientScene = new THREE.Scene();
// gradientCamera.position.z = -0.000005
gradientScene.add(gradientMesh);


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.dampingFactor = 0.02;


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const tick = () => {

    const elpasedTime = clock.getElapsedTime()

    mesh.rotation.x = elpasedTime;
    mesh.rotation.y = elpasedTime;

    controls.update();

    renderer.render(scene,camera)

    renderer.autoClear = false;
    renderer.render(gradientScene, gradientCamera);
    renderer.autoClear = true;

    window.requestAnimationFrame(tick);
}

tick()