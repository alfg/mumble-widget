# Mumble-widget

Mumble-widget is a web-based channel viewer widget to display active users on your Mumble server. This project was built for [GuildBit](http://guildbit.com) subscribers to easily embed the widget on their guild's website in two lines of code using the snippet on [mumble-widget.guildbit.com](http://mumble-widget.guildbit.com).

The project's goal is to have a clean and customizable design, simple installation and to support any host utilizing the [Channel Viewer Protocol](http://mumble.sourceforge.net/Channel_Viewer_Protocol).

JS Fiddle example: http://jsfiddle.net/alfg/3m86purL/

## Supported Hosts

The following are a list of compatible hosts implementing the [Channel Viewer Protocol](http://mumble.sourceforge.net/Channel_Viewer_Protocol). Feel free to add hosts to this list and a JSFiddle example of the script working.

| Host  | Compatible?  | JSFiddle Demo  |
|---|---|---|
| [GuildBit](http://guildbit.com) | YES | http://jsfiddle.net/alfg/3m86purL/  |
| [CleanVoice](http://cleanvoice.ru/free/mumble/) | YES | http://jsfiddle.net/alfg/8ojLfbzb/ |
| [Mumble.com](http://www.mumble.com/)  |  YES  |  http://jsfiddle.net/alfg/z2qf81d6/ |
| [GotMumble](http://www.gotmumble.com/)  |  YES  | http://jsfiddle.net/alfg/3krr8pp1/  |
| [MMO-Mumble](https://mmo-mumble.com/)  |  YES  | http://jsfiddle.net/seansummers/47eb1Lvx/ |
| [MumbleMe](https://www.mumbleme.com/)  | YES | http://jsfiddle.net/seansummers/zfngfr0h/ |
| [CommandChannel](https://commandchannel.com/)  |  YES  | http://jsfiddle.net/alfg/2ju0678g/ |
| [TypeFrag](http://www.typefrag.com/services/mumble-hosting/)  |  ???  |   |
| [MumbleBoxes](https://www.mumbleboxes.com/)  |  ???  |   |
| [MyMumble](https://www.mymumble.com/)  |  ???  |   |
| [GameServers](https://www.gameservers.com/mumble_murmur/)  |  ???  |   |



## Usage

There are two methods of installation, depending if you are self-hosting the script or using the hosted version.

### Hosted

Hosted is for those who don't necessarily want to bother setting up the script. This method is meant to be simplified and serves the files over a [Content Delivery Network (CDN)](http://en.wikipedia.org/wiki/Content_delivery_network).

To use the hosted version of the script, simply copy and paste the following snippet of code where you want the widget to load on your website:

```html
<script class="mumble-widget" type="text/javascript"
    src="//dqc3ygqu0f1ud.cloudfront.net/dist/mumble-widget/mumble-widget.cdn.min.js"
    data-source="//guildbit.com/server/cvp/a1722c92-368e-4506-9ea2-22be00ca8129"
    data-width="400"></script>
<div id="mumble-widget-container"></div>
```

Parameters:
- `data-source` - The path to the CVP JSONP Source of your Mumble hosting provider.
- `data-width` - (optional) The width (pixels) of the widget and data.
- `data-theme` - (optional) The theme name. See [Themes](#themes) below.
- `data-key` - (optional) The CVP Key if using GuildBit as your Mumble Host (in this case, you do not need to include the `data-source` attribute.

### Self-Hosted

Self-hosted is for those who would like to have control of the source code and/or customize the template or widget itself.

1. Download contents in /dist folder.
2. Add the following snippet where you want the widget to load: 

```html
<script class="mumble-widget" src="../src/mumble-widget.js" type="text/javascript"
    data-width="400"
    data-source="http://guildbit.com/server/cvp/aec4afa2-d777-43e9-8ca5-41bc70d00877/json/?callback=callback">
</script>
<div id="mumble-widget-container"></div>
```

Parameters:
- `data-source` - The path to the CVP JSONP Source of your Mumble hosting provider.
- `data-width` - (optional) The width (pixels) of the widget and data.
- `data-theme` - (optional) The theme name. See [Themes](#themes) below.
- `data-key` - (optional) The CVP Key if using GuildBit as your Mumble Host (in this case, you do not need to include the `data-source` attribute.


## Themes

You can use the following themes by adding the `data-theme` attribute to the script tag. 

Example: `data-theme="obsidian"`.

| Default  | Grayscale  | Obsidian  |
|---|---|---|
| ![Default](/demo/themes/theme_default.PNG) | ![Grayscale](/demo/themes/theme_grayscale.PNG) | ![Obsidian](/demo/themes/theme_obsidian.PNG) |

## Development

Mumble-widget is built with [jQuery](http://jquery.com), [Knockout.js](http://knockoutjs.com) and uses [Grunt](http://gruntjs.com) for validating, linting, and minifying/uglifying code output. Install using the instructions below:

1. `git clone https://github.com/alfg/mumble-widget.git`
2. `cd mumble-widget`
3. `npm install`
4. Run a simple http server to serve demo/index.html. *Note using the filesystem to serve the demo will not work due to browser security warnings with ajax loading.*

## Todo

- Compatibility with hosts using CVP protocol
- Add various themes

## Notes

- Project is in early development and may have code breaking changes through early version updates

## License

[MIT License](http://alfg.mit-license.org/) © Alfred Gutierrez
