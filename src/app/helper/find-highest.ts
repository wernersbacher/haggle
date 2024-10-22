export function findHighestNumbers(numbers: number[]): {
  highest: number;
  highestUnique: number;
} {
  // 1. Höchste Zahl finden
  const highest = Math.max(...numbers);

  // 2. Häufigkeit der Zahlen zählen
  const frequencyMap: { [key: number]: number } = {};
  numbers.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  });

  // 3. Höchste nicht mehrmals vorkommende Zahl finden
  let highestUnique: number = 0;
  for (const num of numbers) {
    if (frequencyMap[num] === 1) {
      if (highestUnique === null || num > highestUnique) {
        highestUnique = num;
      }
    }
  }

  return { highest, highestUnique };
}
