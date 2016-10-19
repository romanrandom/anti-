import { Renderer } from 'soundworks/client';
import * as konva from 'konva';

/**
 * A simple canvas renderer.
 * The class renders a dot moving over the screen and rebouncing on the edges.
 */
export default class PlayerRenderer extends Renderer {
  constructor(tapCallback, numImages) {
    super(0); // update rate = 0: synchronize updates to frame rate

    this.tapCallback = tapCallback;

    this.stage = new Konva.Stage({
        container: 'experience',
        width: window.innerWidth,
        height: window.innerHeight
    });

    this.stickers = new Array(numImages);
  }

  /**
   * Initialize renderer state.
   */
   init() {

    this.layer = new Konva.Layer();

    for (var i = 0; i < this.stickers.length; i++) {
        this.stickers[i] = new Image();

        this.stickers[i].onload = (e) => {
            const imgElement = e.path[0] || e.target;
            console.log(imgElement.src.match("s/stick(.*)\\."));
            // imgElement.src.match
            const antimg = new Konva.Image({
                x: Math.random() * this.stage.attrs.width,
                y: Math.random() * this.stage.attrs.height,
                image: imgElement,
                width: 150,
                height: 150,
                rotation: Math.random() * 60,
                draggable: true,
                id: imgElement.src.match("s/stick(.*)\\.")[1]
            });

            //antimg.offsetX(antimg.width / 2);
            //antimg.offsetY(antimg.height / 2);

            antimg.on('tap', () => {
                this.tapCallback(antimg.attrs.id);
            });

            // add the shape to the layer
            this.layer.add(antimg);

            // add the layer to the stage
            this.stage.add(this.layer);
        };
        this.stickers[i].src = `stickers/stick${i + 1}.jpg`;
    }
    console.log(this.layer);


}

  /**
   * Update rederer state.
   * @param {Number} dt - time since last update in seconds.
   */
  update(dt) {

  }

  /**
   * Draw into canvas.
   * Method is called by animation frame loop in current frame rate.
   * @param {CanvasRenderingContext2D} ctx - canvas 2D rendering context
   */
  render(ctx) {
    // canvas operations
    ctx.save();

    ctx.restore();
  }
}
