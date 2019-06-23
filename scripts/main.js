import canvasBounds from './canvas-bounds.js';
import ElementWrapper from './element-wrapper.js';

/**
 *
 * Main
 *
 * @class Main
 * @extends {Phaser.State}
 */
class Main extends Phaser.State
{
    /**
     * Creates an instance of Main.
     */
    constructor()
    {
        super();

        this.bunny = null;

        this.wrappedElement = null;
    }

    /**
     *
     * preload
     *
     */
    preload()
    {
        this.game.load.image('bunny', 'bunny.png');
    }

    /**
     *
     * create
     *
     */
    create()
    {
        // create bunny
        this.bunny = this.game.add.sprite(0, 0, 'bunny');

        this.bunny.anchor.set(0.5);

        // get element to wrap things around
        const element = document.getElementById('my-element');

        element.addEventListener('submit', this.shake.bind(this));

        // create wrapped element
        this.wrappedElement = new ElementWrapper(element);

        this.wrappedElement.anchorXY = 0.5;

        this.game.world.addChild(this.wrappedElement);

        // handle window resize
        window.addEventListener('resize', this.onResize.bind(this));

        this.onResize();
    }

    /**
     *
     * shake
     *
     * @param {event} e
     */
    shake(e)
    {
        e.preventDefault();

        this.wrappedElement.scale.set(1.1);
        this.wrappedElement.rotation = Math.random() > 0.5 ? 0.075 : -0.075;

        setTimeout(() =>
        {
            this.wrappedElement.scale.set(1);
            this.wrappedElement.rotation = 0;
        }, 100);
    }

    /**
     *
     * update
     *
     */
    update()
    {
        this.bunny.rotation += 0.05;
    }

    /**
     *
     * onResize
     *
     */
    onResize()
    {
        // resize renderer
        const { innerWidth, innerHeight } = window;

        this.game.renderer.resize(innerWidth, innerHeight);

        // store canvas bounds
        const rect = this.game.canvas.getBoundingClientRect();

        canvasBounds.x = rect.left + (window.scrollX || window.pageXOffset);
        canvasBounds.y = rect.top + (window.scrollY || window.pageYOffset);
        canvasBounds.width = rect.width;
        canvasBounds.height = rect.height;

        // reposition bunny & wrapped element
        this.bunny.x = canvasBounds.width >> 1;
        this.bunny.y = (canvasBounds.height >> 1) - (this.wrappedElement.bounds.height >> 1) - 30;

        this.wrappedElement.x = canvasBounds.width >> 1;
        this.wrappedElement.y = (canvasBounds.height >> 1) + 30;

        this.wrappedElement.x = canvasBounds.width >> 1;
        this.wrappedElement.y = canvasBounds.height >> 1;
    }
}

const config =
{
    renderer        : Phaser.AUTO,
    scaleMode       : Phaser.ScaleManager.RESIZE,
    vAlign          : true,
    parent          : 'game-canvas',
    backgroundColor : '#3a7ccd',
    state           : Main
};

Phaser.Device.whenReady(() =>
{
    // eslint-disable-next-line no-new
    new Phaser.Game(config);
});

