import { Dictionary } from '../../../helper/dictionary';
import { GameRule } from '../../../models/rule';
import { RuleDescription } from '../../../models/rule-desc';

export const RULE_RESULT_EXPLANATION_EN: Dictionary<RuleDescription> = {};

/**
 * The rules used in the explanation of the game result
 */
RULE_RESULT_EXPLANATION_EN['1orange_base'] = {
  description: 'Orange cards have a basic value of 4',
};
RULE_RESULT_EXPLANATION_EN['2red_base'] = {
  description: 'Red cards have a basic value of 3',
};
RULE_RESULT_EXPLANATION_EN['3blue_base'] = {
  description: 'Blue cards have a basic value of 2',
};
RULE_RESULT_EXPLANATION_EN['4white_base'] = {
  description: 'White cards have a basic value of 5',
};
RULE_RESULT_EXPLANATION_EN['5yellow_base'] = {
  description: 'Yellow cards have a basic value of 1',
};
RULE_RESULT_EXPLANATION_EN['rule4'] = {
  description:
    'If a player has more than three white cards, all of his/her white cards lose their value',
};
RULE_RESULT_EXPLANATION_EN['rule5'] = {
  description:
    'A player can score only as many orange cards as he/she has blue cards',
};
RULE_RESULT_EXPLANATION_EN['rule6_attack'] = {
  description:
    "If a player has five or more blue cards, 10 points are deducted from every other player's score (attacker)",
};
RULE_RESULT_EXPLANATION_EN['rule6_damage'] = {
  description:
    "If a player has five or more blue cards, 10 points are deducted from every other player's score (lost)",
};
RULE_RESULT_EXPLANATION_EN['rule7'] = {
  description:
    'A set of three red cards protects you from one set of five blue cards',
};
RULE_RESULT_EXPLANATION_EN['rule8'] = {
  description:
    'The player with the most yellow cards gets a bonus of the number of those cards squared. If two or more players tie for the most yellow, the bonus is calculated for the player with the next highest number of yellows',
};
RULE_RESULT_EXPLANATION_EN['rule9'] = {
  description:
    'If a player hands in seven or more cards of the same color, he/she is eliminated from the game',
};
RULE_RESULT_EXPLANATION_EN['rule10'] = {
  description: 'Each set of five different colors gives a bonus of 10 points',
};
RULE_RESULT_EXPLANATION_EN['rule11'] = {
  description:
    'If a "pyramid" is handed in with no other cards, the value of the hand is doubled. A pyramid consists of four cards of one color, three cards of a second color, two cards of a third color, and one card of a fourth color',
};
RULE_RESULT_EXPLANATION_EN['rule12'] = {
  description:
    'The player with the most red cards doubles their value. In case of a tie, no player collects the extra value',
};
RULE_RESULT_EXPLANATION_EN['rule13'] = {
  description:
    'Each set of two yellow cards doubles the value of one white card',
};
RULE_RESULT_EXPLANATION_EN['rule14'] = {
  description:
    'Each set of three blue cards quadruples the value of one orange card',
};
RULE_RESULT_EXPLANATION_EN['rule15'] = {
  description:
    'No more than thirteen cards in a hand can be scored. If more are handed in, the excess will be removed at random',
};

/**
 * The list of rules players get assigned to - these are handed out
 */
export const RULE_HANDEDOUT_EN: GameRule[] = [
  {
    shortname: 'rule1',
    description: 'Orange cards have a basic value of 4',
  },
  {
    shortname: 'rule2',
    description:
      'White cards have the highest basic value and are equal to a red card and a blue card',
  },
  {
    shortname: 'rule3',
    description:
      'Blue cards have a basic value twice that of yellow and half that of orange',
  },
  {
    shortname: 'rule4',
    description:
      'If a player has more than three white cards, all of his/her white cards lose their value',
  },
  {
    shortname: 'rule5',
    description:
      'A player can score only as many orange cards as he/she has blue cards',
  },
  {
    shortname: 'rule6',
    description:
      "If a player has five or more blue cards, 10 points are deducted from every other player's score",
  },
  {
    shortname: 'rule7',
    description:
      'A set of three red cards protects you from one set of five blue cards',
  },
  {
    shortname: 'rule8',
    description:
      'The player with the most yellow cards gets a bonus of the number of those cards squared. If two or more players tie for the most yellow, the bonus is calculated for the player with the next highest number of yellows',
  },
  {
    shortname: 'rule9',
    description:
      'If a player hands in seven or more cards of the same color, he/she is eliminated from the game',
  },
  {
    shortname: 'rule10',
    description: 'Each set of five different colors gives a bonus of 10 points',
  },
  {
    shortname: 'rule11',
    description:
      'If a "pyramid" is handed in with no other cards, the value of the hand is doubled. A pyramid consists of four cards of one color, three cards of a second color, two cards of a third color, and one card of a fourth color',
  },
  {
    shortname: 'rule12',
    description:
      'The player with the most red cards doubles their value. In case of a tie, no player collects the extra value',
  },
  {
    shortname: 'rule13',
    description:
      'Each set of two yellow cards doubles the value of one white card',
  },
  {
    shortname: 'rule14',
    description:
      'Each set of three blue cards quadruples the value of one orange card',
  },
  {
    shortname: 'rule15',
    description:
      'No more than thirteen cards in a hand can be scored. If more are handed in, the excess will be removed at random',
  },
];
