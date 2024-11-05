# snow
Make it snow on your web site.

[Live Demonstration](https://Canop.github.io/snow/)

* Snow piles up at the bottom of the screen
* Customizable: from a light snow to a blizzard
* Optionally restricted to a date range
* Dynamically controllable: start new snow falls and stop them
* Don't mess with the DOM: only one canvas is added
* Light and with no dependency

[![Chat on Miaou](https://miaou.dystroy.org/static/shields/room-fr.svg?v=1)](https://miaou.dystroy.org/3)
[![Chat on Miaou](https://miaou.dystroy.org/static/shields/room-en.svg?v=1)](https://miaou.dystroy.org/8)

## Usage

Import the script:

    <script src=snow.js></script>

Then call the start function:

    snow.start();

or with some parameters:

```Javascript
snow.start({
    flakeCount: 1000,
    stickingRatio: 0.55,
    wind: -2,
    monthDayRange: "12/15-01/05", // only from mid December to January the 5
});
```

You can ask the snow to gently stop:

    snow.stop();

## Options

* `flakeCount`: number of flakes. Default: `800`
* `maxRadius`: max radius of flakes. Default: `2.5`
* `wind`: wind speed, can be positive (towards the right) or negative. Default: `0`. Reasonnable winds are lower than `20`.
* `color`: snow color. Default: `#ddf`
* `minSpeed`: vertical minimal speed. Default: `1`
* `maxSpeed`: vertical maximal speed. Default: `4.2`
* `stickingRatio`: how much the snow sticks to the ground. Default: `.4`
* `maxHeightRatio`: at what part of the screen height does snow stop accumulating. Default: `.25`
* `monthDayRange`: a range of month/day during which snow is active. None by default

## Install with npm

`npm i Canop/snow`

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Denys Séguret <[http://dystroy.org/](http://dystroy.org/)>
