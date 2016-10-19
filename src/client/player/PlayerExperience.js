import * as soundworks from 'soundworks/client';
import PlayerRenderer from './PlayerRenderer';

const audioContext = soundworks.audioContext;

const viewTemplate = `
  <canvas class="background"></canvas>
  <div class="foreground">
    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">

    </div>
    <div class="section-bottom flex-middle"></div>
  </div>
`;

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
export default class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain, audioFiles) {
    super();

    this.platform = this.require('platform', { features: ['wake-lock'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.loader = this.require('loader', {
      assetsDomain: assetsDomain,
      files: audioFiles,
    });
  }

  init() {
    // initialize the view
    this.viewTemplate = viewTemplate;
    this.viewContent = { title: `Vamos!` };
    this.viewCtor = soundworks.CanvasView;
    this.viewOptions = { preservePixelRatio: true };
    this.view = this.createView();
  }

  start() {
    super.start(); // don't forget this

    if (!this.hasStarted)
      this.init();

    this.show();

    // play the first loaded buffer immediately
    // const src = audioContext.createBufferSource();
    // src.buffer = this.loader.buffers[0];
    // src.connect(audioContext.destination);
    // src.start(audioContext.currentTime);

    // play the second loaded buffer when the message `play` is received from
    // the server, the message is send when another player joins the experience.
    // this.receive('play', () => {
    //   const delay = Math.random();
    //   const src = audioContext.createBufferSource();
    //   src.buffer = this.loader.buffers[1];
    //   src.connect(audioContext.destination);
    //   src.start(audioContext.currentTime + delay);
    // });

    this.tapped = (stickerID) => {
        this.send('sticker', stickerID);
    };

    // initialize rendering
    // @param sticker tapped Callback
    // @param number of stickers
    this.renderer = new PlayerRenderer(this.tapped, 2);

    this.view.addRenderer(this.renderer);

    // this function is called before each update (`Renderer.render`) of the canvas
    this.view.setPreRender(function(ctx, dt) {
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#000000';
      ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fill();
      ctx.restore();
    });
  }
}
