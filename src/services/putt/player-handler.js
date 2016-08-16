import Player from './player';

export default class PlayerHandler {

  constructor(scene) {
    this.scene = scene;
    this.players = 0;
    this.playersArray = [];
    // this.currentActivePlayers = [false, false, false, false];
    this.debugg = false;
    this.respawnCallback = () => {};
  }

  createPlayer(index, Physijs) {
    this.players++;
    const newPlayer = new Player(this.scene, index, Physijs);
    this.playersArray.push(newPlayer);

    return newPlayer;
  }


  respawn(index) {
    const elementPos = this.playersArray.map(x => x.playerIndex).indexOf(index);

    this.playersArray[elementPos].reset();

    if (this.debugg) {
      this.playersArray[index].addDebugg();
    }
  }

  disconnect(index) {
    const elementPos = this.playersArray.findIndex(obj => index === obj.playerIndex);
    if (elementPos === -1) {
      return;
    }
    this.playersArray[elementPos].removePlayer();
    this.playersArray.splice(elementPos, 1);
  }

  updateSensor(id, payload) {
    const playerObj = this.playersArray.find(obj => obj.playerIndex === id);
    playerObj.updateSensor(payload);
  }

  jump(id, payload) {
    this.playersArray.find(player => player.playerIndex === id).jump(payload);
  }

  updatePhysics() {
    this.playersArray.forEach(x => x.updatePhysics(this.respawnCallback));
  }

  setRespawnCallback(callback) {
    this.respawnCallback = callback;
  }

}
