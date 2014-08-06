# Mumble-widget

Mumble-widget is a web-based channel viewer widget to display active users on your Mumble server. This project was built for [GuildBit](http://guildbit.com) subscribers to easily embed the widget on their guild's website in two lines of code using the snippet on [mumble-widget.guildbit.com](http://mumble-widget.guildbit.com).

The project's goal is to have a clean and customizable design, simple installation and to support any host utilizing the [Channel Viewer Protocol](http://mumble.sourceforge.net/Channel_Viewer_Protocol).

This project is a work-in-progress, but feel free to contribute!

## Usage

There are two methods of installation, depending if you are self-hosting the script or using the hosted version.

### Self-Hosted

Self-hosted is for those who would like to have control of the source code and/or customize the template or widget itself.

1. Download contents in /dist folder.
2. Add the following snippet where you want the widget to load: 

```html
    <script class="mumble-widget" src="../src/mumble-widget.js" type="text/javascript"
      data-width="400"
      data-source="http://guildbit.com/server/cvp/aec4afa2-d777-43e9-8ca5-41bc70d00877/json/?callback=callback"></script>
    <div id="mumble-widget-container"></div>
```

Parameters:
- `data-width` - The width (pixels) of the widget and data
- `data-source` - The path to the CVP JSONP Source of your Mumble hosting provider (if not using GuildBit)
- `data-key` - (not shown) The CVP Key if using GuildBit as your Mumble Hosting (in this case, you do not need to include    the `data-source` attribute.

### Hosted

Hosted is for those who don't necessarily want to bother setting up the script. This method is meant to be simplified and serves the files over a [Content Delivery Network (CDN)](http://en.wikipedia.org/wiki/Content_delivery_network).

1. Visit http://mumble-widget.guildbit.com to generate your script.
2. Copy and paste the code snippet into your website where you want the widget to load.

## Development

Mumble-widget is built with [jQuery](http://jquery.com), [Knockout.js](http://knockoutjs.com) and uses [Grunt](http://gruntjs.com) for validating, linting, and minifying/uglifying code output. Install using the instructions below:

1. `git clone https://github.com/alfg/mumble-widget.git`
2. `cd mumble-widget`
3. `npm install`
4. Run a simple http server to serve demo/index.html. *Note using the filesystem to serve the demo will not work due to browser security warnings with ajax loading.*

## Todo

- Iron out bugs and improve code + design
- Compatibility with hosts using CVP protocol

## Notes

- Project is in early development and may have code breaking changes through early version updates
- Support is limited to Guildbit servers for the time being, but will support other hosts in the near future

## License

[MIT License](http://alfg.mit-license.org/) © Alfred Gutierrez
