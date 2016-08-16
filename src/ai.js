import numeric, { sub } from 'numeric';

export default class AI {

  constructor(id, getPlayers) {
    this.getPlayers = getPlayers;
    this.iterator = 0;
  }

  update() {
    const players = this.getPlayers();
    const positions = players.map(p => p.getPosition());

    this.iterator++;

    if(this.iterator%10===0) {
      console.log('players', positions);
    }

    return sub(positions[0], positions[1]);
  }

}
