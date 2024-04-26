import { DEFAULT_LAP_COUNT } from '../constants';
import Car from './Car';

class Racing {
  #players;
  #lapCount;
  #winners;

  constructor(players, lapCount = DEFAULT_LAP_COUNT) {
    if (!Array.isArray(players)) {
      throw new TypeError('잘못된 형식입니다.');
    }
    this.#players = players.map((player) => new Car(player));
    this.#lapCount = lapCount;
  }

  #getPlayersPosition() {
    return this.#players.map((player) => player.getPosition());
  }

  #race() {
    this.#players.forEach((player) => player.forward());
  }

  #isEndedRace() {
    return this.#getPlayersPosition().includes(this.#lapCount);
  }

  #setWinners() {
    return this.#players.filter(
      (player) => player.getPosition() === this.#lapCount
    );
  }

  getPlayers() {
    return this.#players;
  }

  getPlayerCount() {
    return this.#players.length;
  }

  getLapCount() {
    return this.#lapCount;
  }

  start() {
    while (!this.#isEndedRace()) {
      this.#race();
    }
    this.#winners = this.#setWinners();
    return this;
  }

  getWinners() {
    return this.#winners;
  }

  getWinnerNames() {
    return this.#winners.map((player) => player.getName());
  }
}

export default Racing;
