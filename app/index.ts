var target;
var population;

function preload() {
  target = loadImage('assets/sample.jpg', function() {
    target.resize(windowWidth / 28, 0);
    target.loadPixels();
  });
}

function setup () {
  createCanvas(target.width * 2, target.height);
  population = new Population(target);
  population.init();
}

function draw() {
  background(51);
  image(target, 0, 0, target.width, target.height);

  for(let i = 0; i < 100; i++) {
    population.selection();
    population.generate();
  }
  if(frameCount % 10 == 0) {
    population.display();
  }

  meter.tick();
}
