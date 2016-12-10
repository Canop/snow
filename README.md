# snow
Make it snow on your web site.

[Live Demonstration](https://Canop.github.io/snow/)

* Snow cumulates at the bottom of the screen
* Customizable: from a light snow not really sticking to a blizzard
* Dynamically controllable: stop or start new snow falls
* Don't mess with the DOM: only one canvas is added
* No dependance

[![Chat on Miaou](https://dystroy.org/miaou/static/shields/room-fr.svg?v=1)](https://dystroy.org/miaou/3?Code_Croissants)
[![Chat on Miaou](https://dystroy.org/miaou/static/shields/room-en.svg?v=1)](https://dystroy.org/miaou/8?Javascript)

## Usage

Import the script:

    <script src=snow.js></script>

Then call the start function:

    snow.start();

or with some parameters:

    snow.start({
	flakeCount: 4000,
	stickingRatio: 0.55,
	wind: -7
    });

You can ask the snow to gently stop:

    snow.stop();

## Options

* `flakeCount`: number of flakes. Default: `400`
* `maxRadius`: max radius of flakes. Default: `1.7`
* `wind`: wind speed, can be positive (towards the right) or negative. Default: `0`. Reasonnable winds are lower than `20`.
* `color`: snow color. Default: `#ddf`
* `minSpeed`: vertical minimal speed. Default: `1`
* `maxSpeed`: vertical maximal speed. Default: `4.2`
* `stickingRatio`: how much the snow sticks to the ground. Default: `.4`
