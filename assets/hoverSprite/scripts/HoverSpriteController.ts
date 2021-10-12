
import { _decorator, Component, Node, Sprite, v4, UITransform, systemEvent, SystemEvent, EventMouse, v2, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
const temp_v2 = v2()
const temp_v3 = v3()

@ccclass('HoverSpriteController')
export class HoverSpriteController extends Component {
    @property(Sprite)
    sprite: Sprite = null!

    private _params = v4()
    private _uiTrans: UITransform = null!

    start() {
        this._uiTrans = this.sprite.getComponent(UITransform)
        systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this)
        // resolution = params.zw
        this._params.z = 1
        this._params.w = this._uiTrans.height / this._uiTrans.width
    }

    onDestroy() {
        systemEvent.targetOff(this)
    }

    private onMouseMove(evt: EventMouse) {
        const location = evt.getUILocation(temp_v2)
        const worldLocation = Vec3.set(temp_v3, location.x, location.y, 0)
        const spriteLocation = this._uiTrans.convertToNodeSpaceAR(worldLocation, temp_v3)
        // uMouse = params.xy
        this._params.x = spriteLocation.x / this._uiTrans.width + this._uiTrans.anchorX
        this._params.y = 1 - (spriteLocation.y / this._uiTrans.height + this._uiTrans.anchorX)

        this.sprite.getMaterial(0)?.setProperty('params', this._params)
    }
}