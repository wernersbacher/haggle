export class PlayerCards {
  red: number = 0;
  blue: number = 0;
  green: number = 0;
  gold: number = 0;
  black: number = 0;

  public total(): number {
    return this.red + this.blue + this.green + this.gold + this.black;
  }
}
