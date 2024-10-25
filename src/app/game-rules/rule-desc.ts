import { Dictionary } from '../helper/dictionary';
import { Rule } from '../models/rule';

export const RULE_RESULT_DESC_ORIGINAL: Dictionary<{ description: string }> =
  {};

RULE_RESULT_DESC_ORIGINAL['1orange_base'] = {
  description: 'Orangene Karten haben einen Basiswert von 4',
};
RULE_RESULT_DESC_ORIGINAL['2red_base'] = {
  description: 'Rote Karten haben einen Basiswert von 3',
};
RULE_RESULT_DESC_ORIGINAL['3blue_base'] = {
  description: 'Blaue Karten haben einen Basiswert von 2',
};
RULE_RESULT_DESC_ORIGINAL['4white_base'] = {
  description: 'Weiße Karten haben einen Basiswert von 5',
};
RULE_RESULT_DESC_ORIGINAL['5yellow_base'] = {
  description: 'Gelbe Karten haben einen Basiswert von 1',
};
RULE_RESULT_DESC_ORIGINAL['rule4'] = {
  description:
    'Wenn mehr als 3 weiße Karten, verlieren alle weißen Karten ihren Wert',
};
RULE_RESULT_DESC_ORIGINAL['rule5'] = {
  description:
    'Ein Spieler kann nur so viele Orange-Karten zählen, wie er blaue hat',
};
RULE_RESULT_DESC_ORIGINAL['rule6_attack'] = {
  description:
    'Wenn ein Spieler 5 oder mehr blaue Karten hat, werden anderen Spielern 10 Punkte abgezogen (Angreifer)',
};
RULE_RESULT_DESC_ORIGINAL['rule6_damage'] = {
  description:
    'Wenn ein Spieler 5 oder mehr blaue Karten hat, werden anderen Spielern 10 Punkte abgezogen (verloren)',
};
RULE_RESULT_DESC_ORIGINAL['rule7'] = {
  description:
    'A set of three red cards protects you from one set of five blue cards',
};
RULE_RESULT_DESC_ORIGINAL['rule8'] = {
  description:
    'Der Spieler mit den meisten gelben Karten bekommt pointspunkte, außer jemand andere hat allein mehr gelbe Karten',
};
RULE_RESULT_DESC_ORIGINAL['rule9'] = {
  description:
    'Wenn ein Spieler 7 oder mehr Karten derselben Farbe hat, wird er disqualifiziert',
};
RULE_RESULT_DESC_ORIGINAL['rule10'] = {
  description: 'Jedes Set von 5 verschiedenen Farben gibt 10 Punkte',
};
RULE_RESULT_DESC_ORIGINAL['rule11'] = {
  description: '"Pyramide" (4-3-2-1 Karten) verdoppelt den Wert',
};
RULE_RESULT_DESC_ORIGINAL['rule12'] = {
  description: 'Der Spieler mit den meisten roten Karten verdoppelt deren Wert',
};
RULE_RESULT_DESC_ORIGINAL['rule13'] = {
  description: 'Jeweils zwei gelbe Karten verdoppeln eine weiße Karte',
};
RULE_RESULT_DESC_ORIGINAL['rule14'] = {
  description:
    'Jeweils 3 blaue Karten vervierfachen den Wert einer orangefarbenen Karte',
};
RULE_RESULT_DESC_ORIGINAL['rule15'] = {
  description:
    'No more than thirteen cards in a hand can be scored. If more are handed in, the excess will be removed at random.',
};

// todo: move to dict, different languages, modular folder struct
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
    shortname: 'rule6',
    description:
      'Wenn ein Spieler 5 oder mehr blaue Karten hat, werden anderen Spielern 10 Punkte abgezogen',
  },
  {
    shortname: 'rule7',
    description:
      'A set of three red cards protects you from one set of five blue cards.',
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
  {
    shortname: 'rule15',
    description:
      'No more than thirteen cards in a hand can be scored. If more are handed in, the excess will be removed at random.',
  },
];
