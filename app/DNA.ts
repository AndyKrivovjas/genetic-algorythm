class DNA {
  genes: Gene[] = [];
  fitness: number = null;

  constructor(length: number, genes?: Gene[]) {
    if(genes && genes.length) {
      this.genes = genes;
    } else {
      for(let i = 0; i < length; i++) {
        this.genes.push(new Gene());
      }
    }
  }

  calcFitness(target_genes: Gene[]) {
    if(this.fitness == null) {
      var score = 0;
      this.genes.forEach(function(gene, key) {
        var target = target_genes[key];

        if(gene.red == target.red) {
          score++;
        }
        if(gene.green == target.green) {
          score++;
        }
        if(gene.blue == target.blue) {
          score++;
        }
        if(gene.alpha == target.alpha) {
          score++;
        }
      });

      this.fitness = score / (this.genes.length * 4);
      // this.fitness *= this.fitness;
      this.fitness *= 100;
      // this.fitness = score;
    }
  }

  crossover(target: DNA) {
    var limit = floor(random(0, this.genes.length - 1));
    var genes: Gene[] = [];

    for(let i = 0; i < this.genes.length; i++) {
      if(i < limit) {
        genes.push(this.genes[i]);
      } else {
        genes.push(target.genes[i]);
      }
    }

    return new DNA(genes.length, genes);
  }

  mutate(mutateRate) {
    this.genes.forEach(function(gene) {
      var rate = random(0, 1);
      if(rate < mutateRate) {
        gene = new Gene();
      }
    });
  }

  show(target: p5.Image) {
    var img = createImage(target.width, target.height);
    img.loadPixels();
    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        var index = i * j + i;
        var c = this.genes[index];
        img.set(i, j, color(c.red, c.green, c.blue, c.alpha));
      }
    }
    img.updatePixels();
    image(img, target.width, 0);
  }
}
