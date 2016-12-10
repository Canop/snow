# snow
Make it snow on your web site.

* Snow cumulates at the bottom of the screen
* Customizable: from a light snow not really sticking to a blizzard
* Dynamically controllable: stop or start new snow falls
* Don't mess with the DOM: only one canvas is added

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

