class Gene {

  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(params?: Gene) {
    if(params) {
      this.red = params.red;
      this.green = params.green;
      this.blue = params.blue;
      this.alpha = params.alpha;
    } else {
      this.red = round(random(0, 255));
      this.green = round(random(0, 255));
      this.blue = round(random(0, 255));
      this.alpha = round(random(0, 255));
    }
  }
}
