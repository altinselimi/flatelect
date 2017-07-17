# Flatelect

[![npm](https://img.shields.io/npm/v/flatelect.svg) ![npm](https://img.shields.io/npm/dm/flatelect.svg)](https://www.npmjs.com/package/flatelect)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Select plugin for VueJS

## Table of contents

- [Demo](http://flatelect.garazha.xyz)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save flatelect
```

## Default import

Install all the components:

```javascript
import Vue from 'vue'
import Flatelect from 'flatelect'

Vue.use(Flatelect)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'flatelect'

Vue.component('test', Test)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Distribution import

Install all the components:

```javascript
import 'flatelect/dist/flatelect.css'
import Flatelect from 'flatelect/dist/flatelect.common'

Vue.use(Flatelect)
```

Use specific components:

```javascript
import 'flatelect/dist/flatelect.css'
import { Test } from 'flatelect/dist/flatelect.common'

Vue.component('test', Test)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**

## Browser

```html
<link rel="stylesheet" href="flatelect/dist/flatelect.css"/>

<script src="vue.js"></script>
<script src="flatelect/dist/flatelect.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(Flatelect)
```

Use specific components:

```javascript
Vue.component('test', Flatelect.Test)
```

## Source import

Install all the components:

```javascript
import Vue from 'vue'
import Flatelect from 'flatelect/src'

Vue.use(Flatelect)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'flatelect/src'

Vue.component('test', Test)
```

# Usage

  <flatelect
    :options="options" //options to display
    :size="compact" //or full
    :fancy="true" //transulcent & soft shadow dropdown.
    :required="false" //validation purposes
    :objKey="name" //if options consist of objects, provide here the key which will be used to display the option.
    :custom="false" //if you want to render something else instead of option name, then use slot tag and write your own markup!
    v-on:selected="handleSelection" //callback method when user has made the selection.
    >
  </flatelect>

## License

[MIT](http://opensource.org/licenses/MIT)
