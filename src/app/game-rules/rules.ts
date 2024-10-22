import { CardColors, PlayerCards } from '../models/player-cards';
import { Rule } from './../models/rule';

// TODO: Return value types/events

// calculated from ruleset
const BASIC_VALUES: CardColors = {
  red: 3,
  blue: 2,
  yellow: 1,
  orange: 4,
  white: 5,
};

function rule1(player: PlayerCards): number {
  // Regel 1: Orange-Karten haben einen Basiswert von 4
  return player.orange * BASIC_VALUES.orange;
}

function rule2(player: PlayerCards): number {
  // Regel 2: Weiße Karten haben die höchste Wertigkeit und sind gleichwertig mit einer roten und einer blauen Karte
  return player.white * BASIC_VALUES.white;
}

function rule3(player: PlayerCards): number {
  // Regel 3: Blaue Karten haben doppelt so viel Wert wie gelbe und halb so viel wie orange
  return player.blue * BASIC_VALUES.blue;
}

function rule4(player: PlayerCards): number {
  // Regel 4: Wenn mehr als 3 weiße Karten, verlieren alle weißen Karten ihren Wert
  if (player.white > 3) {
    return -player.white * BASIC_VALUES.white;
  }
  return 0;
}

function rule5(player: PlayerCards): number {
  // Regel 5: Ein Spieler kann nur so viele Orange-Karten zählen, wie er blaue hat
  if (player.orange > player.blue) {
    return -(player.orange - player.blue) * BASIC_VALUES.orange;
  }
  return 0;
}

function rule6(player: PlayerCards, otherPlayers: PlayerCards[]): number {
  // Regel 6: Wenn ein Spieler 5 oder mehr blaue Karten hat, werden anderen Spielern 10 Punkte abgezogen
  if (player.blue >= 5) {
    for (let otherPlayer of otherPlayers) {
      if (otherPlayer !== player) {
        // In einem realen Fall würde dies die anderen Spieler beeinflussen
        // TODO bei sich nichts machen
        // hier müssen die schutzkarten grpüft werden und geguckt werden ob jemand andere die 10 punkte hat
      }
    }
  }
  return 0;
}

function rule7(player: PlayerCards): number {
  // Regel 7: Set von 3 roten Karten schützt vor einem Set von 5 blauen
  // (keine Punktevergabe, diese Regel betrifft Schutzmechanismen)
  // TODO
  return 0;
}

function rule8(player: PlayerCards, otherPlayers: PlayerCards[]): number {
  // Regel 8: Der Spieler mit den meisten gelben Karten bekommt Bonuspunkte
  // TODO: Check if the max player is "alone" with the max number
  const maxYellow = Math.max(...otherPlayers.map((p) => p.yellow));
  if (player.yellow === maxYellow) {
    return player.yellow ** 2;
  }
  return 0;
}

function rule9(player: PlayerCards): number {
  // Regel 9: Wenn ein Spieler 7 oder mehr Karten derselben Farbe hat, wird er disqualifiziert
  if (
    player.red >= 7 ||
    player.blue >= 7 ||
    player.yellow >= 7 ||
    player.orange >= 7 ||
    player.white >= 7
  ) {
    return -Infinity; // disqualifiziert
    // TODO: throw disqualified event
  }
  return 0;
}

function rule10(player: PlayerCards): number {
  // Regel 10: Jedes Set von 5 verschiedenen Farben gibt 10 Punkte
  return (
    Math.min(
      player.red,
      player.blue,
      player.yellow,
      player.orange,
      player.white
    ) * 10
  );
}

function rule11(player: PlayerCards): number {
  // Regel 11: "Pyramide" (4-3-2-1 Karten) verdoppelt den Wert
  const colors = [
    player.red,
    player.blue,
    player.yellow,
    player.orange,
    player.white,
  ];
  colors.sort((a, b) => b - a);
  if (colors.toString() === [4, 3, 2, 1].toString()) {
    return 2; // multiplikator
  }
  return 1;
}

function rule12(player: PlayerCards, otherPlayers: PlayerCards[]): number {
  // Regel 12: Der Spieler mit den meisten roten Karten verdoppelt ihren Wert
  // TODO: Check if the max player is "alone" with the max number
  //
  const maxRed = Math.max(...otherPlayers.map((p) => p.red));
  if (player.red === maxRed) {
    return player.red * 2;
  }
  return 0;
}

function rule13(player: PlayerCards): number {
  // Regel 13: Jeweils zwei gelbe Karten verdoppeln eine weiße Karte
  // TODO: doubling the value is not working like this - first iteration: change values for specific player?
  if (player.yellow >= 2) {
    return Math.floor(player.yellow / 2) * (player.white * 2);
  }
  return 0;
}

function rule14(player: PlayerCards): number {
  // Regel 14: Jeweils 3 blaue Karten vervierfachen den Wert einer orangefarbenen Karte
  // wie rule 13
  if (player.blue >= 3) {
    return Math.floor(player.blue / 3) * (player.orange * 4);
  }
  return 0;
}

function rule15(player: PlayerCards): number {
  // Regel 15: Es dürfen nicht mehr als 13 Karten gewertet werden
  const totalCards =
    player.red + player.blue + player.yellow + player.orange + player.white;
  if (totalCards > 13) {
    // TODO: remove too many cards
    return -(totalCards - 13); // Beispielhafte Abwertung für Karten über 13
  }
  return 0;
}

function calculateTotalPoints(
  player: PlayerCards,
  otherPlayers: PlayerCards[]
): number {
  let points = 0;

  // todo: make sure otherplayers has no the own player inside

  // loopen durch alle Regeln und methoden anwenden

  points += rule1(player);
  points += rule2(player);
  points += rule3(player);
  points += rule4(player);
  points += rule5(player);
  points += rule6(player, otherPlayers);
  points += rule7(player);
  points += rule8(player, otherPlayers);
  points += rule9(player);
  points += rule10(player);
  points *= rule11(player); // Multiplikator für Regel 11
  points += rule12(player, otherPlayers);
  points += rule13(player);
  points += rule14(player);
  points += rule15(player);

  return points;
}
