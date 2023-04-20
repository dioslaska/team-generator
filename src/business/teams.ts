import { IPlayer, players, skills } from './data';
import { combination, deltaPercent, shuffle } from './util';

export interface IResult {
  team1: IPlayer[];
  team2: IPlayer[];
  scores1: { [key: string]: number };
  scores2: { [key: string]: number };
  deltas: { [key: string]: number };
}

export function createTeams(): IResult {
  function checkTeams(comb: number[]): boolean {
    const team1 = [];
    const team2 = [];
    const scores1: { [key: string]: number } = { total: 0 };
    const scores2: { [key: string]: number } = { total: 0 };
    const deltas: { [key: string]: number } = { total: 0 };
    let eligible = true;
    let totalScore1 = 0;
    let totalScore2 = 0;
    let totalDelta = 0;
    let weightedNr = 0;

    const map: { [key: number]: boolean } = comb.reduce((m, i) => {
      m[i] = true;
      return m;
    }, {} as { [key: number]: boolean });

    for (let i = 0; i < total; i++) {
      if (map[i]) {
        team1.push(presentPlayers[i]);
      } else {
        team2.push(presentPlayers[i]);
      }
    }

    for (const skill of skills) {
      scores1[skill.name] = 0;
      scores2[skill.name] = 0;
      deltas[skill.name] = 0;
    }

    for (const player of team1) {
      for (const skill of skills) {
        scores1[skill.name] = scores1[skill.name] + (player as any)[skill.name];
        totalScore1 += (player as any)[skill.name] * skill.weight;
      }
    }

    for (const player of team2) {
      for (const skill of skills) {
        scores2[skill.name] = scores2[skill.name] + (player as any)[skill.name];
        totalScore2 += (player as any)[skill.name] * skill.weight;
      }
    }

    for (const skill of skills) {
      const delta = deltaPercent(scores1[skill.name], scores2[skill.name]);
      if (Math.abs(delta) > thresholdSkill) {
        eligible = false;
      }
      deltas[skill.name] = delta;
      // Calculate average score
      scores1[skill.name] = scores1[skill.name] / teamLength;
      scores2[skill.name] = scores2[skill.name] / teamLength;
      scores1.total += scores1[skill.name] * skill.weight;
      scores2.total += scores2[skill.name] * skill.weight;
      weightedNr += skill.weight;
    }

    scores1.total = scores1.total / weightedNr;
    scores2.total = scores2.total / weightedNr;

    totalDelta = deltaPercent(totalScore1, totalScore2);

    // if (eligible && avgDiff < totalThreshold) {
    //   totalOk++;
    // }

    // if (eligible && totalDelta < bestDelta) {
    //   bestDelta = totalDelta;
    //   if (totalDelta < thresholdTotal && !found) {

    if (eligible && Math.abs(totalDelta) < thresholdTotal && !found) {
      found = true;
      bestTeam1 = team1.sort((p1, p2) => (p1.name < p2.name ? -1 : 1));
      bestTeam2 = team2.sort((p1, p2) => (p1.name < p2.name ? -1 : 1));
      bestScores1 = scores1;
      bestScores2 = scores2;
      bestDeltas = deltas;
      bestDeltas.total = totalDelta;
      return true;
    }

    return false;
  }

  const presentPlayers = players.filter((p) => !p.skip).slice(0, 12);
  const total = presentPlayers.length;
  const teamLength = Math.round(total / 2);
  const thresholdSkill = 8;
  const thresholdTotal = 5;
  // let totalOk = 0;
  let found = false;
  // let bestDelta = Infinity;
  let bestTeam1: IPlayer[] = [];
  let bestTeam2: IPlayer[] = [];
  let bestScores1: { [key: string]: number } = { total: 0 };
  let bestScores2: { [key: string]: number } = { total: 0 };
  let bestDeltas: { [key: string]: number } = { total: 0 };

  shuffle(presentPlayers);

  combination(total, teamLength, checkTeams);

  return {
    team1: bestTeam1,
    team2: bestTeam2,
    scores1: bestScores1,
    scores2: bestScores2,
    deltas: bestDeltas,
  };
}
