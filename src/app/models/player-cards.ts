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

  public reduceRandomCards(n: number): void {
    const colors: (keyof CardColors)[] = [
      'red',
      'yellow',
      'blue',
      'orange',
      'white',
    ];

    for (let i = 0; i < n; i++) {
      const availableColors = colors.filter((color) => this[color] > 0);
      if (availableColors.length === 0) return;

      const randomColor =
        availableColors[Math.floor(Math.random() * availableColors.length)];
      this[randomColor]--;
    }
  }
}
