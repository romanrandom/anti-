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
        this.stickerSize = 150;
        for (var i = 0; i < this.stickers.length; i++) {
            this.stickers[i] = new Image();

            this.stickers[i].onload = (e) => {
                // console.log(e);
                const imgElement = e.path ? e.path[0] : e.target;
                // imgElement.src.match
                const antimg = new Konva.Image({
                    x: this.stickerSize / 2 + Math.random() * this.stage.attrs.width - this.stickerSize,
                    y: this.stickerSize / 2 + Math.random() * this.stage.attrs.height - this.stickerSize,
                    image: imgElement,
                    width: this.stickerSize,
                    height: this.stickerSize,
                    rotation: Math.random() * 180 - 90,
                    draggable: true,
                    idAnti: imgElement.src.match("s/stick(.*)\\.")[1]
                });

                //antimg.offsetX(antimg.width / 2);
                //antimg.offsetY(antimg.height / 2);

                antimg.on('mousedown touchstart', (e) => {

                    antimg.setZIndex(100);

                    this.tapCallback(antimg.attrs.idAnti);
                });

                antimg.cache();
                antimg.drawHitFromCache();

                // add the shape to the layer
                this.layer.add(antimg);

                // add the layer to the stage
                this.stage.add(this.layer);
            };
            this.stickers[i].src = `stickers/stick${i + 1}.png`;
        }
        //console.log(this.layer);
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
