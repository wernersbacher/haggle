export interface CardColors {
  red: number;
  yellow: number;
  blue: number;
  orange: number;
  white: number;
}

export class PlayerCards implements CardColors {
  red: number = 0;
  yellow: number = 0;
  blue: number = 0;
  orange: number = 0;
  white: number = 0;

  public total(): number {
    return this.red + this.blue + this.yellow + this.white;
  }
}
