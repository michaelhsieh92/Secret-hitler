import { WAITING_ROOM, MAX_PLAYERS, ROLES, DECK } from './constants';
import Player from './Player';
import { shuffle, assign } from './utils';
import Proposal from './Proposal';

export default class Game {
  constructor(id, hostName, roomKey) {
    this.id = id;
    this.host = new Player(hostName, true, null);
    this.key = roomKey;
    this.state = WAITING_ROOM;
    this.players = [this.host];
    this.president = null;
    this.proposals = [];
    this.turnNum = 0;
    this.deck = DECK;
    this.draw = [];
    this.discard = [];
  }

  addPlayer = (playerName) => {
    if (this.players.find(player => player.getName().toUpperCase() === playerName.toUpperCase())) {
      return {
        ok: false,
        error: `Player with name ${playerName} already exists`,
      };
    }
    this.players.push(new Player(playerName, false, null));
    return {
      ok: true,
      error: null,
    };
  };

  getPlayers = () => this.players.map(player => player);

  isFull = () => this.players.length >= MAX_PLAYERS;

  setup = () => {
    let roles = [];
    roles = [...ROLES[this.players.length]];
    shuffle(roles);

    assign(this.players, roles);
    const player = this.players[Math.floor(Math.random() * this.players.length)];
    this.president = player.name;
  };

  voting = (turn, president, chancellor) => {
    if (turn !== this.turnNum) {
      this.proposals.push(new Proposal(president, chancellor));
      this.turnNum++;
    }
  };

  policies = () => {
    if (this.discard.length === 0) {
      shuffle(this.deck);
    }
    let i = 0;
    while (i < 3) {
      this.draw[i] = this.deck.pop();
      i++;
    }
  };

  discardOneCard = () => {
    this.discard.push(this.draw.pop());
  };
}
