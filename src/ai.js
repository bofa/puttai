import numeric, { sub, norm2, mul, prettyPrint } from 'numeric';
import { deepqlearn } from 'convnet';

export default class AI {

  constructor(id, getPlayers) {
    this.getPlayers = getPlayers;
    this.iterator = 0;
    this.direction = [0, 0, 0];

    this.brain = new deepqlearn.Brain(4, 4); // 3 inputs, 2 possible outputs (0,1)
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
    const dist = norm2(dir);

    if(this.iterator%20===0) {
      // Train brain.
      var reward = 10*dist + positions[0][1];
      this.brain.backward(reward); // <-- learning magic happens here

      const action = this.brain.forward([positions[0][0], positions[0][1], positions[1][0], positions[1][1]]); // returns index of chosen action

      this.direction = AI.mapActionToDirection(action);

      console.log('reward', reward, 'Direction', prettyPrint(this.direction));
    }

    return AI.convertToPhone(this.direction);
  }

  static numberOfActions = 4;
  static force = 4;
  static mapActionToDirection(action) {
    const theta = 2*Math.PI*action/AI.numberOfActions;
    return [AI.force*Math.sin(theta), 0, AI.force*Math.cos(theta)];
  }

  static convertToWorld(v) {
    return [v.y, v.z, v.x];
  }

  static convertToPhone(v) {
    return [v[2], v[0], v[1]];
  }

  resolveBrain(state) {
    brain.epsilon_test_time = 0.0; // don't make any more random choices
    brain.learning = false;
    // get an optimal action from the learned policy
    return brain.forward(state);
  }

}
