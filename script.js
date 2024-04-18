import * as THREE from 'three'

const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color : "yellow" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const tick = () => {

    const elpasedTime = clock.getElapsedTime()

    mesh.rotation.y = elpasedTime;

    renderer.render(scene,camera)
    window.requestAnimationFrame(tick);
}

tick()