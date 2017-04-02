# Elementary Cellular Automaton.

**Warning! The plugin generates div elements to represent the cells. Uncautious usage may freeze the browser tab when
the number of divs becomes too high. This number will depend on the hardware and the browser. Be extra mindful if used
in production!**

## About

This plugin displays an [elementary cellular automaton](https://en.wikipedia.org/wiki/Elementary_cellular_automaton)
through the use of colored divs.
See an example use with [vue.js](https://vuejs.org/), [here](https://krekog.github.io/eca/).

## How to install

### download

The plugin can be downloaded via [bower](https://bower.io/) or by saving the js to your assets manually.

```
bower install eca
```

### link

Link to the plugin in the page it will be used on.

```html
<script type="text/javascript" src="assets/js/eca.js"></script>
```

Please be aware, that this plugin depends on [jQuery](https://jquery.com/), therefore it must be loaded after it is already present.

## How to use

To use the plugin, it must be binded to a container element (e.g. div).

```javascript
$('#myCellularAutomaton').bindECA();
```

You can customise the plugin by passing in a js object with the properties you want to change.

#### options

property | description | expected value | default value
 --- | --- | --- | ---
numberOfCells | The number of cells in a state. | a positive number | ``50``
speed | The interval at which the new state is generated in milliseconds. | a positive number | ``500``
ruleNumber | The number of rule to apply. You will find a nice list of rules [here](http://atlas.wolfram.com/01/01/). | a number from 0 to 255 | ``26``
classOfStateContainer | The class applied to the state container. This div will be appended to your selected container and will hold all the states. | a valid HTML class name | ``'stateContainer'``
classOfActive | The class of active/living cells. Have to differ from the class of inactive cells for the plugin to function correctly. | a valid HTML class name | ``'active'``
classOfInactive | The class of inactive/dead cells. Have to differ from the class of active cells for the plugin to function correctly. | a valid HTML class name | ``'inactive'``
colorOfActive | The color of the active/living cells. | a valid HTML color | ``'#2ca02c'``
colorOfInactive | The color of the inactive/dead cells. | a valid HTML color | ``'transparent'``
initialState | The initial state of the cells. The value ``null`` will result in a randomly generated state. | a string of ones and zeros (e.g. 0001001000) | ``null``

##### example:

```javascript
$('#myCellularAutomaton').bindECA({
    "numberOfCells": 10,
    "colorOfActive": "red",
    "initialState": "0001001000"
});
```

### to control

#### events

The plugin is controlled by namespaced events of the element it was binded to.

event | description
--- | ---
``start.ECA`` | Starts the state generation
``stop.ECA`` | Stops the state generation
``reset.ECA`` | Resets the container to the initial state

##### example:

```javascript
$('#myCellularAutomaton').trigger('start.ECA');
```

#### helper functions

There are helper functions to trigger the controlling events.

function | triggers
--- | ---
startECA | ``start.ECA``
stopECA | ``stop.ECA``
resetECA | ``reset.ECA``

All of the plugin's methods can be [chained](https://en.wikipedia.org/wiki/Method_chaining).

##### example:

```javascript
$('#myCellularAutomaton').stopECA().resetECA();
```

### to modify

Certain properties of the generator can be modified even on the fly, via the
following functions.

function | description | expected value | example
 --- | --- | --- | ---
setRule | Sets the [rule](http://atlas.wolfram.com/01/01/). | a number from 0 to 255 | ``26``
setColorOfActive | Sets the color of the active/living cells. | a valid HTML color | ``"#00FF00"``
setColorOfInactive | Sets the color of the inactive/dead cells. | a valid HTML color | ``"grey"``
setNumberOfCells | Sets the number of cells. (Re-initialises the current run.) | a positive number | ``10``
setInitialState | Sets the initial state. (Re-initialises the current run.) | a string of ones and zeros | ``"0001001000"``
