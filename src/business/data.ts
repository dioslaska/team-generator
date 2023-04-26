export interface ISkill {
  name: string;
  display: string;
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
  teamplay: number;
  skip?: boolean;
}

export const skills: ISkill[] = [
  { name: 'attack', display: 'Attack', weight: 1 },
  { name: 'defense', display: 'Defense', weight: 1 },
  { name: 'speed', display: 'Speed', weight: 1 },
  { name: 'shoot', display: 'Shoot', weight: 1 },
  { name: 'passes', display: 'Passes', weight: 0.8 },
  { name: 'dribble', display: 'Dribble', weight: 0.6 },
  { name: 'morale', display: 'Morale', weight: 0.3 },
  { name: 'teamplay', display: 'Teamplay', weight: 0.3 },
];

export const players: IPlayer[] = [
  {
    id: 1,
    name: 'Atesz',
    img: '/assets/avatars/atesz.jpg',
    attack: 5.25,
    defense: 9,
    speed: 5,
    shoot: 6.25,
    passes: 7.75,
    dribble: 7,
    morale: 8.75,
    teamplay: 9,
  },
  {
    id: 2,
    name: 'Béla',
    img: '/assets/avatars/bela.jpg',
    attack: 5,
    defense: 9.25,
    speed: 8.25,
    shoot: 4.5,
    passes: 6.75,
    dribble: 4,
    morale: 8.75,
    teamplay: 9,
  },
  {
    id: 3,
    name: 'Csaba',
    img: '/assets/avatars/csaba.jpg',
    attack: 5.75,
    defense: 7.75,
    speed: 7.5,
    shoot: 6,
    passes: 7,
    dribble: 5.25,
    morale: 6.5,
    teamplay: 8.5,
  },
  {
    id: 4,
    name: 'Csabika',
    img: '/assets/avatars/csabika.jpg',
    attack: 4.25,
    defense: 5.75,
    speed: 6,
    shoot: 4.5,
    passes: 6.75,
    dribble: 3.75,
    morale: 7.75,
    teamplay: 8,
  },
  {
    id: 5,
    name: 'Csegzi',
    img: '/assets/avatars/csegzi.jpg',
    attack: 2.25,
    defense: 2,
    speed: 3.5,
    shoot: 2.5,
    passes: 2.5,
    dribble: 2.25,
    morale: 8.25,
    teamplay: 6,
  },
  {
    id: 6,
    name: 'Fazi',
    img: '/assets/avatars/fazi.jpg',
    attack: 6.25,
    defense: 9,
    speed: 8.5,
    shoot: 6,
    passes: 7.25,
    dribble: 5.5,
    morale: 8,
    teamplay: 9,
  },
  {
    id: 7,
    name: 'Huni',
    img: '/assets/avatars/avatar.svg',
    attack: 9,
    defense: 7.5,
    speed: 9.5,
    shoot: 8.25,
    passes: 9.75,
    dribble: 8.75,
    morale: 5,
    teamplay: 8.75,
  },
  {
    id: 8,
    name: 'Isti',
    img: '/assets/avatars/isti.jpg',
    attack: 7.25,
    defense: 8,
    speed: 9,
    shoot: 6.75,
    passes: 8.5,
    dribble: 7.25,
    morale: 8.5,
    teamplay: 9.5,
  },
  {
    id: 9,
    name: 'Kinda',
    img: '/assets/avatars/kinda.jpg',
    attack: 3.25,
    defense: 3.75,
    speed: 1.75,
    shoot: 3.5,
    passes: 3,
    dribble: 2.75,
    morale: 8.75,
    teamplay: 8,
  },
  {
    id: 10,
    name: 'Nagy Attila',
    img: '/assets/avatars/attila.jpg',
    attack: 8,
    defense: 9,
    speed: 8,
    shoot: 9.25,
    passes: 8,
    dribble: 7.5,
    morale: 9,
    teamplay: 7.25,
  },
  {
    id: 11,
    name: 'Robi',
    img: '/assets/avatars/robi.jpg',
    attack: 8.5,
    defense: 3.75,
    speed: 7.5,
    shoot: 8.5,
    passes: 7.75,
    dribble: 8.5,
    morale: 5.25,
    teamplay: 7.25,
  },
  {
    id: 12,
    name: 'Róka',
    img: '/assets/avatars/roka.jpg',
    attack: 9.5,
    defense: 5.25,
    speed: 9,
    shoot: 9.75,
    passes: 8,
    dribble: 9.75,
    morale: 6.25,
    teamplay: 5.25,
  },
  {
    id: 13,
    name: 'Zoli',
    img: '/assets/avatars/zoli.jpg',
    attack: 6.5,
    defense: 7.25,
    speed: 6.25,
    shoot: 6.5,
    passes: 7.5,
    dribble: 6.75,
    morale: 6.75,
    teamplay: 8.5,
  },
  {
    id: 14,
    name: 'Zsolt',
    img: '/assets/avatars/zsolt.jpg',
    attack: 7.25,
    defense: 4.5,
    speed: 7.75,
    shoot: 7.75,
    passes: 7.5,
    dribble: 7.75,
    morale: 4.25,
    teamplay: 6.25,
  },
];

const skippedPlayersJSON = localStorage.getItem('selected-players');

export const skippedPlayers: { [key: number]: boolean } = skippedPlayersJSON ? JSON.parse(skippedPlayersJSON) : {};

export const playerMap: { [key: string]: IPlayer } = {};

for (const player of players) {
  if (skippedPlayers[player.id]) {
    player.skip = true;
  }
  playerMap[player.name] = player;
}
