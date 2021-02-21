---
layout: page.11ty.cjs
title: <video-grid> ⌲ Home
---

# &lt;video-grid>

`<video-grid>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<video-grid>` is just an HTML element. You can it anywhere you can use HTML!

```html
<video-grid></video-grid>
```

  </div>
  <div>

<video-grid></video-grid>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<video-grid>` can be configured with attributed in plain HTML.

```html
<video-grid name="HTML"></video-grid>
```

  </div>
  <div>

<video-grid name="HTML"></video-grid>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<video-grid>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;video-grid&gt;</h2>
  <video-grid .name=${name}></video-grid>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;video-grid&gt;</h2>
<video-grid name="lit-html"></video-grid>

  </div>
</section>
