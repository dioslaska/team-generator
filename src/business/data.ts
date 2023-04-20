export interface ISkill {
  name: string;
  weight: number;
}

export interface IPlayer {
  id: number;
  name: string;
  img: string;
  attack: number;
  defense: number;
  speed: number;
  morale: number;
  shoot: number;
  passes: number;
  dribble: number;
  skip?: boolean;
}

export const skills: ISkill[] = [
  { name: 'attack', weight: 1 },
  { name: 'defense', weight: 1 },
  { name: 'speed', weight: 1 },
  { name: 'shoot', weight: 0.9 },
  { name: 'passes', weight: 0.8 },
  { name: 'dribble', weight: 0.7 },
  { name: 'morale', weight: 0.6 },
];

export const players: IPlayer[] = [
  { id: 1, name: 'Atesz', img: '/assets/avatars/atesz.jpg', attack: 7, defense: 10, speed: 6, morale: 8, shoot: 7, passes: 8, dribble: 7 },
  { id: 2, name: 'Bela', img: '/assets/avatars/bela.jpg', attack: 7, defense: 8, speed: 10, morale: 9, shoot: 7, passes: 7, dribble: 6 },
  { id: 3, name: 'Csaba', img: '/assets/avatars/csaba.jpg', attack: 7, defense: 7, speed: 8, morale: 6, shoot: 6, passes: 7, dribble: 6 },
  {
    id: 4,
    name: 'Csabika',
    img: '/assets/avatars/csabika.jpg',
    attack: 6,
    defense: 6,
    speed: 8,
    morale: 8,
    shoot: 6,
    passes: 6,
    dribble: 6,
  },
  { id: 5, name: 'Csegzi', img: '/assets/avatars/csegzi.jpg', attack: 4, defense: 3, speed: 5, morale: 9, shoot: 4, passes: 4, dribble: 5 },
  { id: 6, name: 'Fazi', img: '/assets/avatars/fazi.jpg', attack: 7, defense: 8, speed: 10, morale: 8, shoot: 6, passes: 8, dribble: 7 },
  { id: 7, name: 'Huni', img: '/assets/avatars/avatar.svg', attack: 9, defense: 6, speed: 10, morale: 6, shoot: 7, passes: 9, dribble: 8 },
  { id: 8, name: 'Isti', img: '/assets/avatars/isti.jpg', attack: 7, defense: 8, speed: 9, morale: 9, shoot: 6, passes: 8, dribble: 7 },
  { id: 9, name: 'Kinda', img: '/assets/avatars/kinda.jpg', attack: 5, defense: 4, speed: 4, morale: 9, shoot: 5, passes: 5, dribble: 4 },
  {
    id: 10,
    name: 'Nagy Attila',
    img: '/assets/avatars/attila.jpg',
    attack: 8,
    defense: 8,
    speed: 9,
    morale: 9,
    shoot: 9,
    passes: 7,
    dribble: 8,
  },
  { id: 11, name: 'Robi', img: '/assets/avatars/robi.jpg', attack: 8, defense: 5, speed: 6, morale: 6, shoot: 7, passes: 7, dribble: 7 },
  {
    id: 12,
    name: 'Roka',
    img: '/assets/avatars/roka.jpg',
    attack: 10,
    defense: 6,
    speed: 10,
    morale: 6,
    shoot: 10,
    passes: 7,
    dribble: 10,
  },
  { id: 13, name: 'Zoli', img: '/assets/avatars/zoli.jpg', attack: 7, defense: 7, speed: 6, morale: 6, shoot: 7, passes: 8, dribble: 7 },
  { id: 14, name: 'Zsolt', img: '/assets/avatars/zsolt.jpg', attack: 7, defense: 4, speed: 8, morale: 5, shoot: 7, passes: 8, dribble: 7 },
];

const skippedPlayersJSON = localStorage.getItem('selected-players');

export const skippedPlayers: { [key: number]: boolean } = skippedPlayersJSON ? JSON.parse(skippedPlayersJSON) : {};

for (const player of players) {
  if (skippedPlayers[player.id]) {
    player.skip = true;
  }
}
