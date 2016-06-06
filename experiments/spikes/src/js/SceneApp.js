// SceneApp.js

import alfrid, { Scene } from 'alfrid';
import ViewSphere from './ViewSphere';

window.getAsset = function (id) {
	for(var i = 0; i < assets.length; i++) {
		if(id === assets[i].id) {
			return assets[i].file;
		}
	}
};

const GL = alfrid.GL;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();

		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
		this._isMouseDown = false;

		window.addEventListener('mousedown', () => {	this._isMouseDown = true; });
		window.addEventListener('mouseup', () => {	this._isMouseDown = false; });
		window.addEventListener('mousemove', (e) => this._onMove(e));
	}

	_initTextures() {
		let irr_posx = alfrid.HDRLoader.parse(getAsset('irr_posx'));
		let irr_negx = alfrid.HDRLoader.parse(getAsset('irr_negx'));
		let irr_posy = alfrid.HDRLoader.parse(getAsset('irr_posy'));
		let irr_negy = alfrid.HDRLoader.parse(getAsset('irr_negy'));
		let irr_posz = alfrid.HDRLoader.parse(getAsset('irr_posz'));
		let irr_negz = alfrid.HDRLoader.parse(getAsset('irr_negz'));

		this._textureIrr = new alfrid.GLCubeTexture([irr_posx, irr_negx, irr_posy, irr_negy, irr_posz, irr_negz]);

		let rad_posx = alfrid.HDRLoader.parse(getAsset('rad_posx'));
		let rad_negx = alfrid.HDRLoader.parse(getAsset('rad_negx'));
		let rad_posy = alfrid.HDRLoader.parse(getAsset('rad_posy'));
		let rad_negy = alfrid.HDRLoader.parse(getAsset('rad_negy'));
		let rad_posz = alfrid.HDRLoader.parse(getAsset('rad_posz'));
		let rad_negz = alfrid.HDRLoader.parse(getAsset('rad_negz'));

		this._textureRad = new alfrid.GLCubeTexture([rad_posx, rad_negx, rad_posy, rad_negy, rad_posz, rad_negz]);
	}


	_initViews() {
		this._bCopy = new alfrid.BatchCopy();
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();
		this._bBall = new alfrid.BatchBall();
		this._bSkybox = new alfrid.BatchSkybox();
		// this._vModel = new ViewObjModel();

		this._vSphere = new ViewSphere();
	}

	_onMove(e) {
		if(this._isMouseDown) return;
		console.log('moving hit testing');
	}


	render() {
		GL.clear(0, 0, 0, 0);
		// this._bSkybox.draw(this._textureRad);
		this._bAxis.draw();
		this._bDots.draw();

		// this._vModel.render(this._textureRad, this._textureIrr, this._textureAO);
		this._vSphere.render(this._textureRad, this._textureIrr);
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;