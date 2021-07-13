

var renderer = PIXI.autoDetectRenderer(800, 800, {
    transparent: true,
    resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add("eye", "images/Eyepiece-wh.png")
    .add("ringBottom", "images/Ring-bottom-wh.png")
    .add("ringTop1", "images/Ring-top1-wh.png")
    .add("ringTop2", "images/Ring-top2-wh.png")
    .load(setup);

var eye;
var ringB;
var ringTop1;
var ringTop2;
var randomColor = null;

localStorage.setItem('eyeRot', .02);
localStorage.setItem('ringBRot', .02);
localStorage.setItem('ringT1Rot', .02);
localStorage.setItem('ringT2Rot', .02);
localStorage.setItem('color', "black");
localStorage.setItem('visibility', "on");


function setup(){
    eye = new PIXI.Sprite(
    PIXI.loader.resources["eye"].texture
    );
    
    ringB = new PIXI.Sprite(
    PIXI.loader.resources["ringBottom"].texture
    );
    
    ringTop1 = new PIXI.Sprite(
    PIXI.loader.resources["ringTop1"].texture
    );
    
    ringTop2 = new PIXI.Sprite(
    PIXI.loader.resources["ringTop2"].texture
    );
    
    stage.addChild(eye);
    stage.addChild(ringB);
    stage.addChild(ringTop1);
    stage.addChild(ringTop2);
    
    animationLoop();
}

function animationLoop() {
    
    requestAnimationFrame(animationLoop);
    
    var eyeRot = parseFloat(localStorage.getItem('eyeRot'));
    var ringBRot = parseFloat(localStorage.getItem('ringBRot'));
    var ringT1Rot = parseFloat(localStorage.getItem('ringT1Rot'));
    var ringT2Rot = parseFloat(localStorage.getItem('ringT2Rot'));
    var visibility = localStorage.getItem('visibility');
    
    eye.scale.set(.4, .4);
    eye.x = renderer.width / 2;
    eye.y = renderer.height / 2;
    eye.anchor.set(0.5, 0.35);
    eye.rotation += eyeRot;
    
    ringB.scale.set(1.15, 1.15);
    ringB.x = renderer.width / 2;
    ringB.y = renderer.height / 2;
    ringB.anchor.set(.5, .08);
    ringB.rotation += ringBRot;

    ringTop1.scale.set(1, 1);
    ringTop1.x = renderer.width / 2;
    ringTop1.y = renderer.height / 2;
    ringTop1.anchor.set(.7, .6);
    ringTop1.rotation += ringT1Rot;

    ringTop2.scale.set(.75, .8);
    ringTop2.x = renderer.width / 2;
    ringTop2.y = renderer.height / 2;
    ringTop2.anchor.set(.5, 1.1);
    ringTop2.rotation += ringT2Rot;
    
    var selected_color = localStorage.getItem('color');
    
    if (selected_color == "colors") {
        eye.tint = Math.random() * 0xFFFFFF;
        ringB.tint = Math.random() * 0xFFFFFF;
        ringTop1.tint = Math.random() * 0xFFFFFF;
        ringTop2.tint = Math.random() * 0xFFFFFF;
    }
    if (selected_color == "black") {
        eye.tint = 0x000000;
        ringB.tint = 0x000000;
        ringTop1.tint = 0x000000;
        ringTop2.tint = 0x000000;
    }
    if (selected_color == "random") {
        if (randomColor == null) 
        {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            eye.tint = randomColor;
            ringB.tint = randomColor;
            ringTop1.tint = randomColor;
            ringTop2.tint = randomColor;
        }
    }
    if (visibility == "on") {
        eye.alpha = 1;
        ringB.alpha = 1;
        ringTop1.alpha = 1;
        ringTop2.alpha = 1;
    }
    if (visibility == "off") {
        eye.alpha = 0;
        ringB.alpha = 0;
        ringTop1.alpha = 0;
        ringTop2.alpha = 0;
    }
    
    renderer.render(stage);
    
}

