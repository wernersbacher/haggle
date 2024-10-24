import { Rule } from '../models/rule';

export const ORIGINAL_RULES: Rule[] = [
  {
    shortname: 'rule1',
    description: 'Orange-Karten haben einen Basiswert von 4',
  },
  {
    shortname: 'rule2',
    description:
      'Weiße Karten haben die höchste Wertigkeit und sind gleichwertig mit einer roten und einer blauen Karte',
  },
  {
    shortname: 'rule3',
    description:
      'Blaue Karten haben doppelt so viel Wert wie gelbe und halb so viel wie orange',
  },
  {
    shortname: 'rule4',
    description:
      'Wenn mehr als 3 weiße Karten, verlieren alle weißen Karten ihren Wert',
  },
  {
    shortname: 'rule5',
    description:
      'Ein Spieler kann nur so viele Orange-Karten zählen, wie er blaue hat',
  },
  {
    shortname: 'rule6_rule7',
    description:
      'Wenn ein Spieler 5 oder mehr blaue Karten hat, werden anderen Spielern 10 Punkte abgezogen, außer er hat min. 3 rote Karten',
  },
  {
    shortname: 'rule8',
    description:
      'Der Spieler mit den meisten gelben Karten bekommt pointspunkte, außer jemand andere hat allein mehr gelbe Karten',
  },
  {
    shortname: 'rule9',
    description:
      'Wenn ein Spieler 7 oder mehr Karten derselben Farbe hat, wird er disqualifiziert',
  },
  {
    shortname: 'rule10',
    description: 'Jedes Set von 5 verschiedenen Farben gibt 10 Punkte',
  },
  {
    shortname: 'rule11',
    description: '"Pyramide" (4-3-2-1 Karten) verdoppelt den Wert',
  },
  {
    shortname: 'rule12',
    description:
      'Der Spieler mit den meisten roten Karten verdoppelt deren Wert',
  },
  {
    shortname: 'rule13',
    description: 'Jeweils zwei gelbe Karten verdoppeln eine weiße Karte',
  },
  {
    shortname: 'rule14',
    description:
      'Jeweils 3 blaue Karten vervierfachen den Wert einer orangefarbenen Karte',
  },
];
