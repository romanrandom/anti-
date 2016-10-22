import * as soundworks from 'soundworks/client';
import viewTemplates from '../shared/viewTemplates';
import viewContent from '../shared/viewContent';
import ControllerExperience from './ControllerExperience';

window.addEventListener('load', () => {
  // configuration received from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const { appName, clientType, socketIO }  = window.soundworksConfig;
  // initialize the 'player' client
  soundworks.client.init(clientType, { socketIO, appName });
  soundworks.client.setViewContentDefinitions(viewContent);
  soundworks.client.setViewTemplateDefinitions(viewTemplates);

  // configure appearance of shared parameters
  const conductor = new ControllerExperience({
    gol: { type: 'buttons' }
  });

  // start client
  soundworks.client.start();
});


// // import client side soundworks and referee experience
// import * as soundworks from 'soundworks/client';
// import RefereeExperience from './RefereeExperience.js';
// import viewTemplates from '../shared/viewTemplates';
// import viewContent from '../shared/viewContent';
//
// // launch application when document is fully loaded
// window.addEventListener('load', () => {
//   // configuration received from the server through the `index.html`
//   // @see {~/src/server/index.js}
//   // @see {~/html/default.ejs}
//   const { appName, clientType, socketIO, assetsDomain }  = window.soundworksConfig;
//   // initialize the 'referee' client
//   soundworks.client.init(clientType, { appName, socketIO });
//   soundworks.client.setViewContentDefinitions(viewContent);
//   soundworks.client.setViewTemplateDefinitions(viewTemplates);
//   // create client side (referee) experience
//   const experience = new RefereeExperience();
//
//   // start the client
//   soundworks.client.start();
// });
