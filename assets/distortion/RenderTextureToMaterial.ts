
import { _decorator, Component, Node, RenderTexture, Material, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RenderTextureToMaterial')
export class RenderTextureToMaterial extends Component {
    @property(RenderTexture)
    renderTexture: RenderTexture = null
    @property(Material)
    material: Material = null

    update(dt: number) {
        this.material.setProperty('renderTexture', this.renderTexture.getGFXTexture())
    }
}