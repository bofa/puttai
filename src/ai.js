import numeric, { sub, norm2, mul, prettyPrint } from 'numeric';

export default class AI {

  constructor(id, getPlayers) {
    this.getPlayers = getPlayers;
    this.iterator = 0;
  }

  /**
   * Mapping from phone to world is [y, 0, x].
   * @return {array} - Force vector for the game. x
   */
  update() {
    const players = this.getPlayers();
    const positions = players.map(p => p.getPosition());

    this.iterator++;

    const dir = sub(positions[0], positions[1]);
    const norm = mul(-3/norm2(dir), dir);

    if(this.iterator%10===0) {
      console.log('players', prettyPrint(norm));
    }

    return AI.convertToPhone(norm);
  }

  static convertToWorld(v) {
    return [v.y, v.z, v.x];
  }

  static convertToPhone(v) {
    return [v[2], v[0], v[1]];
  }

}
