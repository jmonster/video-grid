import {VideoGrid} from '../video-grid.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('video-grid', () => {
  const url = 'https://frinkiac.com/mp4/S11E02/775960/783760.mp4'

  test('is defined', () => {
    const el = document.createElement('video-grid');
    assert.instanceOf(el, VideoGrid);
  });

  test('renders none', async () => {
    const el = await fixture(html`<video-grid></video-grid>`);
    assert.equal(el.querySelectorAll('video').length, 0);
  });

  test('renders one', async () => {
    const markup = html`
      <video slot="video">
        <source id='mp4' src="${url}" type='video/mp4' />
      </video>
    `

    const el = await fixture(html`<video-grid>${markup}</video-grid>`);
    assert.equal(el.querySelectorAll('video').length, 1);
  });

  test('renders many', async () => {
    const url = 'https://frinkiac.com/mp4/S11E02/775960/783760.mp4'
    const markup = html`
      <video slot="video">
        <source id='mp4' src="${url}" type='video/mp4' />
      </video>
      <video slot="video">
        <source id='mp4' src="${url}" type='video/mp4' />
      </video>
      <video slot="video">
        <source id='mp4' src="${url}" type='video/mp4' />
      </video>
    `

    const el = await fixture(html`<video-grid>${markup}</video-grid>`);
    assert.equal(el.querySelectorAll('video').length, 3);
  });
});
