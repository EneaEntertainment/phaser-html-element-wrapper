import canvasBounds from './canvas-bounds.js';

/**
 *
 * ElementWrapper - Phaser CE
 *
 * @version : 2.0.1
 * @author  : http://www.enea.sk
 *
 * @export
 * @class ElementWrapper
 * @extends {PIXI.DisplayObject}
 */
export default class ElementWrapper extends PIXI.DisplayObject
{
    /**
     * Creates an instance of ElementWrapper.
     *
     * @param {Element} [target=null]
     */
    constructor(target = null)
    {
        super();

        this.target = target;

        this.previousTransform = new Phaser.Matrix();

        this._anchorX = 0;
        this._anchorY = 0;
    }

    /**
     *
     * compareMatrices
     *
     * @param {Phaser.Matrix} matrix1
     * @param {Phaser.Matrix} matrix2
     * @returns {boolean}
     */
    compareMatrices(matrix1, matrix2)
    {
        return (
            matrix1.a === matrix2.a &&
            matrix1.b === matrix2.b &&
            matrix1.c === matrix2.c &&
            matrix1.d === matrix2.d &&
            matrix1.tx === matrix2.tx &&
            matrix1.ty === matrix2.ty
        );
    }

    /**
     *
     * updateTarget
     *
     */
    updateTarget()
    {
        const matrix = this.worldTransform;

        this.target.style.left = `${canvasBounds.x}px`;
        this.target.style.top = `${canvasBounds.y}px`;
        this.target.style.transform = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.tx}, ${matrix.ty})`;
    }

    /**
     *
     * render
     *
     */
    render()
    {
        if (this.compareMatrices(this.worldTransform, this.previousTransform) || this.target === null)
        {
            return;
        }

        this.updateTarget();

        this.previousTransform = this.worldTransform.clone();
    }

    /**
     *
     * update
     *
     */
    update()
    {
        // do nothing
    }

    /**
     *
     * postUpdate
     *
     */
    postUpdate()
    {
        // do nothing
    }

    /**
     *
     * destroy
     *
     */
    destroy()
    {
        this.target = null;

        this.previousTransform = null;

        super.destroy();
    }

    /**
     *
     * bounds
     *
     * @readonly
     */
    get bounds()
    {
        return this.target.getBoundingClientRect();
    }

    /**
     *
     * anchorX
     *
     */
    get anchorX()
    {
        return this._anchorX;
    }

    /**
     *
     * anchorX
     *
     * @param {number} value
     */
    set anchorX(value)
    {
        this._anchorX = value;

        this.pivot.x = value * this.bounds.width;
    }

    /**
     *
     * anchorY
     *
     */
    get anchorY()
    {
        return this._anchorY;
    }

    /**
     *
     * anchorY
     *
     * @param {number} value
     */
    set anchorY(value)
    {
        this._anchorY = value;

        this.pivot.y = value * this.bounds.height;
    }

    /**
     *
     * anchorXY
     *
     * @param {number} value
     */
    set anchorXY(value)
    {
        this.anchorX = value;
        this.anchorY = value;
    }
}

ElementWrapper.prototype._renderWebGL = ElementWrapper.prototype.render;
ElementWrapper.prototype._renderCanvas = ElementWrapper.prototype.render;
