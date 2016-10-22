import { BasicSharedController } from 'soundworks/client';


class ControllerExperience extends BasicSharedController {
  constructor(options) {
    super(options);

    // this.auth = this.require('auth');
    this.platform = this.require('platform', { features: ['wake-lock'] });
  }
}

export default ControllerExperience;
