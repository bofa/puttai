export default class AI {

  constructor(getPlayers) {
    this.getPlayers = getPlayers;
  }

  update() {
    const players = this.getPlayers();
    return [5, 5, 5];
  }

}
