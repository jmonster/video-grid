import {LitElement, html, css} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

export class VideoGrid extends LitElement {
  get participantCount() {
    const slot = this.shadowRoot.querySelector('slot[name="video"]');
    const childNodes = slot && slot.assignedNodes({flatten: true});
    const videos = Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE);
    return (videos && videos.length) || 0;
  }


  static get styles() {
    return css`
      canvas {
        width: 100%;
        height: auto;
        object-fit: revert;
      }

      .videos {
        display: none;
      }

      .canvases {
        background-color: springgreen;
        display: grid;
        
      }
    `;
  }

  static get properties() {
    return {
      participantCount: { type: Number },
      canvasesStyles: { type: String }
    };
  }

  constructor() {
    super()
    this.canvasesStyles = {'grid-template-columns': '1fr'}
  }

  render() {
    return html`
      <div class="videos"><slot name="video" @slotchange="${this._convertToCanvas}"></slot></div>
      <div class="canvases" style=${styleMap(this.canvasesStyles)}></div>
    `;
  }

  async _convertToCanvas() {
    removeAllChildNodes(this.shadowRoot.querySelector('.canvases'))

    const slot = this.shadowRoot.querySelector('slot[name="video"]');
    const childNodes = slot && slot.assignedNodes({flatten: true});
    const videos = Array.prototype.filter.call(childNodes, (node) => node.nodeType == Node.ELEMENT_NODE);

    if (videos.length  < 2) { this.canvasesStyles = {'grid-template-columns': '1fr'} }
    else if (videos.length  < 5) { this.canvasesStyles = {'grid-template-columns': '1fr 1fr'} }
    else if (videos.length  < 10) { this.canvasesStyles = {'grid-template-columns': '1fr 1fr 1fr'} }
    else if (videos.length  < 16) { this.canvasesStyles = {'grid-template-columns': '1fr 1fr 1fr 1fr'} }
    else { this.canvasesStyles = {'grid-template-columns': '1fr 1fr 1fr 1fr'}; console.info('Wow many participants...') }

    videos.forEach(async (v) => {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('class', v.id)

      this.shadowRoot.querySelector('.canvases').appendChild(canvas)
      this._drawToCanvas(v, canvas)

      // hack to hide the video but still have it play
      // otherwise our canvas copy is blanked out
      // v.setAttribute('hidden', 'true')
      v.oncanplay = v.play // leak?
    })
  }

  _drawToCanvas(video, canvas) {
    // update size otherwise image can become distorted
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(() => this._drawToCanvas(video, canvas));
  }
}

window.customElements.define('video-grid', VideoGrid);
