class Population {

  settings: any = {
    maxPopulation: 400,
    mutationRate: 0.01
  }

  items: DNA[] = [];
  collide: any = {
    A: DNA,
    B: DNA
  };
  target: any;

  constructor(target: p5.Image) {
    this.target = target;
    this.target.genes = [];
    for(let i = 0; i < this.target.pixels.length; i+=4) {
      this.target.genes.push(new Gene({
        red: this.target.pixels[i],
        green: this.target.pixels[i + 1],
        blue: this.target.pixels[i + 2],
        alpha: this.target.pixels[i + 3]
      }));
    }
  }

  init() {
    for(let i = 0; i < this.settings.maxPopulation; i++) {
      this.items.push(new DNA(this.target.genes.length));
    }
    this.calcFitness();
  }

  calcFitness() {
    this.items.forEach(function(item) {
      item.calcFitness(this.target.genes);
    });
  }

  selection() {
    var maxFitness = 0;
    this.items.forEach(function(item) {
      if(item.fitness > maxFitness) {
        maxFitness = item.fitness;
      }
    });

    this.collide.A = this.selectParent(maxFitness);
    this.collide.B = this.selectParent(maxFitness);
  }

  selectParent(maxFitness) {
    var parent = null;

    while(parent == null) {
      var rate = random(0, 1);
      var item = this.getRandomItem();

      var ft = item.fitness / maxFitness;

      if(rate < ft) {
        parent = item;
      }
   }

    return parent;
  }

  getRandomItem() {
    var index = round(random(0, this.items.length - 1));
    return this.items[index];
  }

  calcAvgFittness() {
    var total = 0;
    this.items.forEach(function(item) {
      total += item.fitness;
    });

    var avg = total / this.items.length;
    console.log(avg);
  }

  generate() {

    var child = this.collide.A.crossover(this.collide.B);
    child.mutate(this.settings.mutationRate);
    child.calcFitness(this.target.genes);

    this.items.shift();
    this.items.push(child);

    this.calcAvgFittness();

  }

  display() {
    this.items[this.items.length - 1].show(this.target);
  }
}
