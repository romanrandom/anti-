import { Experience } from 'soundworks/server';

// server-side 'player' experience.
export default class PlayerExperience extends Experience {

  constructor(clientTypes) {
    super(clientTypes);

    this.checkin = this.require('checkin');
    this.osc = this.require('osc');
    this.sharedConfig = this.require('shared-config');

    this.lastTeam = 0; // Team assigned to the last player who joined
  }

  // if anything needs to append when the experience starts
  start() {
  }

  // if anything needs to happen when a client enters the performance (*i.e.*
  // starts the experience on the client side), write it in the `enter` method
  enter(client) {

    super.enter(client);
    // send a message to all the other clients of the same type
    //this.broadcast(client.type, client, 'play');

    // Asignamos equipo alternadamente al nuevo jugador
    if (this.lastTeam === 0) {
        client.team = this.lastTeam = 1;
    } else {
        client.team = this.lastTeam = 0;
    }
     
    this.receive(client, 'sticker', sticker => {
                 
        console.log(sticker);
        this.osc.send('/osc/channel2', [client.team, sticker]);
    });
  }

  exit(client) {
    super.exit(client);
    // ...
  }
}
