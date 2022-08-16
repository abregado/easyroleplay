function animateCanvas1 () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');

    // 2200 x 900
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 460;

    const image = new Image();
    image.src = "img/viking2.png";
    const spriteWidth = 600;
    const spriteHeight = 460;
    const startX = 0;
    const startY = 0;
    let frameX = 0;
    let frameY = 0;
    let gameFrame = 0;
    const staggerFrame = 6;

    function animate() {
        ctx.clearRect(startX, startY, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.drawImage(image, frameX * spriteWidth, frameY * spriteHeight,
            spriteWidth, spriteHeight, startX, startY, spriteWidth, spriteHeight);

        if (gameFrame % staggerFrame == 0) {
            if (frameX < 7) frameX++;
            else frameX = 0;
        }
        gameFrame++;

        requestAnimationFrame(animate);
    }
    animate();
}

function animateCanvas2 () {
    const canvas = document.getElementById("canvas2");
    const ctx = canvas.getContext('2d');

    // 825 x 216
    // 75 x 216

    // 722 x 200
    // 65 x 200
    const CANVAS_WIDTH = canvas.width = 50;
    const CANVAS_HEIGHT = canvas.height = 175;

    const image = new Image();
    image.src = "img/mini4-blue-fire.png";
    const spriteWidth = 50;
    const spriteHeight = 175;
    let frameX = 0;
    let frameY = 0;
    let gameFrame = 0;
    const staggerFrame = 6;

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.drawImage(image, frameX * spriteWidth, frameY * spriteHeight,
            spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

        if (gameFrame % staggerFrame == 0) {
            if (frameX < 10) frameX++;
            else frameX = 0;
        }
        gameFrame++;

        requestAnimationFrame(animate);
    }
    animate();
}

window.onload = function () {
    animateCanvas1();
    animateCanvas2();

    document.querySelector(".flipper").addEventListener("click", event => {
        event.currentTarget.classList.toggle('flip');
    });
}