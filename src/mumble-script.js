/*
 *  mumble-script.js - v0.0.1
 *	Mumble Channel Viewer.
 *
 *  Created by Alfred Gutierrez
 *  Under MIT License
 *  http://github.com/alfg/mumble-script
 */

(function () {

    // Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== "2.1.1") {
        var script_tag = document.createElement("script");
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState === "complete" || this.readyState === "loaded") {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        /******* Load Knockout *******/
        var knockout_link = $("<script>", {
            rel: "stylesheet",
            type: "text/javascript",
            src: "http://cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js"
        });
        knockout_link.appendTo("head");

        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {
            var cvpKey = $(".mumble-script").data("key");
            var width = $(".mumble-script").data("width") || 500;
            var host = $(".mumble-script").data("source") || "http://guildbit.com/server/cvp/" + cvpKey + "/json/?callback=?";

            // Set container width
            $("#mumble-script-container").width(width);


            /******* Load CSS *******/
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: "../src/mumble-script.css" // change this to cdn
            });
            css_link.appendTo("head");


            /******* Load JSONP *******/
            var jsonpUrl = host;

            /******* Load HTML *******/
            var html = "<table class='mumble-script-widget rounded centered' data-bind='with: cvp'><thead> \
                <tr><th><a href='#' data-bind='text: name, attr: { href: x_connecturl }'></a></th></tr> \
                </thead><tbody> \
                <!-- ko foreach: root.users --> \
                <tr><td data-bind='text: name'></td></tr> \
                <!-- /ko --> \
                <!-- ko foreach: root.channels --> \
                <!-- ko if: users.length > 0 --> \
                <tr class='subchannels'><td data-bind='text: name'></td></tr> \
                <!-- /ko --> \
                <!-- ko foreach: users --> \
                <tr><td data-bind='text: &apos;&mdash; &apos; + name'></td></tr> \
                <!-- /ko --> \
                <!-- /ko --> \
                <!-- ko if: root.users.length == 0 --> \
                <tr><td>No users are online</td></tr> \
                <!-- /ko --> \
                </tbody></table>";

            $("#mumble-script-container").html(html);


            // Knockout Users ViewModel for displaying and updating users online
            function CvpViewModel() {
                var self = this;

                // Observables
                self.cvp = ko.observable(loadCvpData());

                // Load initial data into cvp observable, then set an interval
                function loadCvpData() {
                    var data = {};
                    $.ajax({
                        url: jsonpUrl,
                        async: false,
                        dataType: "jsonp",
                        success: function (json) {
                            data = json;
                            self.cvp(data);
                        }
                    });
                }

                // Update CVP data every 15s
                setInterval(function() {
                    loadCvpData();
                }, 15000);

            }
            ko.applyBindings(new CvpViewModel());
        });
    }

})(); // We call our anonymous function immediately
