import { Dictionary } from '../../../helper/dictionary';
import { GameRule } from '../../../models/rule';
import { RuleDescription } from '../../../models/rule-desc';

// todo: move to map
export const RULE_RESULT_EXPLANATION_DE: Dictionary<RuleDescription> = {};

/**
 * The rules used in the explanation of the game result
 */
RULE_RESULT_EXPLANATION_DE['1orange_base'] = {
  description:
    'Orangene Karten haben einen Basiswert von 4 und sind gleichwertig mit einer roten und einer gelben Karte',
};
RULE_RESULT_EXPLANATION_DE['2red_base'] = {
  description:
    'Weiße Karten haben die höchste Wertigkeit und sind gleichwertig mit einer roten und einer blauen Karte',
};
RULE_RESULT_EXPLANATION_DE['3blue_base'] = {
  description:
    'Blaue Karten haben einen Basiswert doppelt so hoch wie gelbe und halb so hoch wie orange',
};
RULE_RESULT_EXPLANATION_DE['4white_base'] = {
  description: 'Weiße Karten haben einen Basiswert von 5',
};
RULE_RESULT_EXPLANATION_DE['5yellow_base'] = {
  description: 'Gelbe Karten haben einen Basiswert von 1',
};
RULE_RESULT_EXPLANATION_DE['rule4'] = {
  description:
    'Wenn ein Spieler mehr als drei weiße Karten hat, verlieren alle seine weißen Karten ihren Wert',
};
RULE_RESULT_EXPLANATION_DE['rule5'] = {
  description:
    'Ein Spieler kann nur so viele orange Karten zählen, wie er blaue Karten hat',
};
RULE_RESULT_EXPLANATION_DE['rule6_attack'] = {
  description:
    'Wenn ein Spieler fünf oder mehr blaue Karten hat, werden jedem anderen Spieler 10 Punkte abgezogen (Angreifer)',
};
RULE_RESULT_EXPLANATION_DE['rule6_damage'] = {
  description:
    'Wenn ein Spieler fünf oder mehr blaue Karten hat, werden jedem anderen Spieler 10 Punkte abgezogen (verloren)',
};
RULE_RESULT_EXPLANATION_DE['rule7'] = {
  description:
    'Ein Satz aus drei roten Karten schützt vor einem Satz aus fünf blauen Karten',
};
RULE_RESULT_EXPLANATION_DE['rule8'] = {
  description:
    'Der Spieler mit den meisten gelben Karten erhält einen Bonus in Höhe der Anzahl dieser Karten zum Quadrat. Wenn zwei oder mehr Spieler die meisten gelben Karten haben, wird der Bonus für den Spieler mit der nächsthöchsten Anzahl gelber Karten berechnet',
};
RULE_RESULT_EXPLANATION_DE['rule9'] = {
  description:
    'Wenn ein Spieler sieben oder mehr Karten derselben Farbe abgibt, wird er aus dem Spiel ausgeschlossen',
};
RULE_RESULT_EXPLANATION_DE['rule10'] = {
  description:
    'Jedes Set aus fünf verschiedenen Farben gibt einen Bonus von 10 Punkten',
};
RULE_RESULT_EXPLANATION_DE['rule11'] = {
  description:
    'Wenn eine "Pyramide" ohne andere Karten abgegeben wird, wird der Wert der Hand verdoppelt. Eine Pyramide besteht aus vier Karten einer Farbe, drei Karten einer zweiten Farbe, zwei Karten einer dritten Farbe und einer Karte einer vierten Farbe',
};
RULE_RESULT_EXPLANATION_DE['rule12'] = {
  description:
    'Der Spieler mit den meisten roten Karten verdoppelt deren Wert. Bei einem Gleichstand erhält kein Spieler den zusätzlichen Wert',
};
RULE_RESULT_EXPLANATION_DE['rule13'] = {
  description:
    'Jedes Set aus zwei gelben Karten verdoppelt den Wert einer weißen Karte',
};
RULE_RESULT_EXPLANATION_DE['rule14'] = {
  description:
    'Jedes Set aus drei blauen Karten vervierfacht den Wert einer orangefarbenen Karte',
};
RULE_RESULT_EXPLANATION_DE['rule15'] = {
  description:
    'Es können nicht mehr als dreizehn Karten in einer Hand gewertet werden. Wenn mehr abgegeben werden, werden die überschüssigen Karten zufällig entfernt',
};

/**
 * The list of rules players get assigned to - these are handed out
 */
export const RULE_HANDEDOUT_DE: GameRule[] = [
  {
    shortname: 'rule1',
    description:
      'Orangene Karten haben einen Basiswert von 4 und sind gleichwertig mit einer roten und einer gelben Karte',
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
      'Wenn ein Spieler mehr als drei weiße Karten hat, verlieren alle seine weißen Karten ihren Wert',
  },
  {
    shortname: 'rule5',
    description:
      'Ein Spieler kann nur so viele orange Karten zählen, wie er blaue Karten hat',
  },
  {
    shortname: 'rule6',
    description:
      'Wenn ein Spieler fünf oder mehr blaue Karten hat, werden jedem anderen Spieler 10 Punkte abgezogen',
  },
  {
    shortname: 'rule7',
    description:
      'Ein Satz aus drei roten Karten schützt vor einem Satz aus fünf blauen Karten',
  },
  {
    shortname: 'rule8',
    description:
      'Der Spieler mit den meisten gelben Karten erhält einen Bonus in Höhe der Anzahl dieser Karten zum Quadrat. Wenn zwei oder mehr Spieler die meisten gelben Karten haben, wird der Bonus für den Spieler mit der nächsthöchsten Anzahl gelber Karten berechnet',
  },
  {
    shortname: 'rule9',
    description:
      'Wenn ein Spieler sieben oder mehr Karten derselben Farbe abgibt, wird er aus dem Spiel ausgeschlossen',
  },
  {
    shortname: 'rule10',
    description:
      'Jedes Set aus fünf verschiedenen Farben gibt einen Bonus von 10 Punkten',
  },
  {
    shortname: 'rule11',
    description:
      'Wenn eine "Pyramide" ohne andere Karten abgegeben wird, wird der Wert der Hand verdoppelt. Eine Pyramide besteht aus vier Karten einer Farbe, drei Karten einer zweiten Farbe, zwei Karten einer dritten Farbe und einer Karte einer vierten Farbe',
  },
  {
    shortname: 'rule12',
    description:
      'Der Spieler mit den meisten roten Karten verdoppelt deren Wert. Bei einem Gleichstand erhält kein Spieler den zusätzlichen Wert',
  },
  {
    shortname: 'rule13',
    description:
      'Jedes Set aus zwei gelben Karten verdoppelt den Wert einer weißen Karte',
  },
  {
    shortname: 'rule14',
    description:
      'Jedes Set aus drei blauen Karten vervierfacht den Wert einer orangefarbenen Karte',
  },
  {
    shortname: 'rule15',
    description:
      'Es können nicht mehr als dreizehn Karten in einer Hand gewertet werden. Wenn mehr abgegeben werden, werden die überschüssigen Karten zufällig entfernt',
  },
];
