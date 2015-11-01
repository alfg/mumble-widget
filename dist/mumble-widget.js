/*
 *  mumble-widget - v0.2.0
 *  Mumble Channel Viewer Widget
 *  http://github.com/alfg/mumble-widget
 *
 *  Made by Alfred Gutierrez
 *  Under MIT License
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
        $.getScript("//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js", function() {
          console.log("Loading knockout.js...");

          // Call our main function
          main();
        });

        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        jQuery.ajaxSetup({async:false});
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {

            // Element
            var $widget = $(".mumble-widget");

            // Configuration from data-attributes
            var cvpKey = $widget.data("key");
            var width = $widget.data("width") || 500;
            var host = $widget.data("source") || "//guildbit.com/server/cvp/" + cvpKey + "/json/?callback=?";
            var theme = $widget.data("theme") || "default";

            // Asset Sources
            var cssSource = "../src/mumble-widget.css";
            var tmplSource = "../src/template.html";

            // Set container width
            $("#mumble-widget-container").width(width);


            /******* Load CSS *******/
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: cssSource
            });
            css_link.appendTo("head");


            /******* Load JSONP *******/
            var jsonpUrl = host;

            /******* Load HTML *******/
            var html;
            $.get(tmplSource, function(data) {
              html = data;
              var $el = $("#mumble-widget-container");
              $el.html(html);
              $el.addClass(theme);
            });

            // Knockout Users ViewModel for displaying and updating users online
            function CvpViewModel() {
                var self = this;

                // Observables
                self.cvp = ko.observable();
                self.userCount = ko.observable();

                // Load initial data into cvp observable, then set an interval
                var loadCvpData = function() {
                    var data = {};
                    $.ajax({
                        url: jsonpUrl,
                        async: true,
                        dataType: "jsonp",
                        jsonpCallback: "callback",
                        success: function (data) {
                            console.log(data);
                            self.cvp(data);
                            self.userCount(countUsers(data));
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                };

                var countUsers = function(data) {
                  var count = data.root.users.length;

                  // Recursive iteration function for counting users in channels
                  var iterate = function(obj) {
                      for (var property in obj) {
                          if (obj.hasOwnProperty(property)) {
                              if (typeof obj[property] === "object") {
                                  if (property === "channels") {
                                      for (var i = 0; i < obj[property].length; i++) {
                                          var users = obj[property][i].users.length;
                                          count += users;
                                      }
                                  }
                                iterate(obj[property]);
                              }
                          }
                      }
                  };

                  iterate(data.root);

                  return count;
                };

                // Update CVP data every 15s
                setInterval(function() {
                    loadCvpData();
                }, 15000);

                self.cvp(loadCvpData()); // Preload cvp data

            }
            ko.applyBindings(new CvpViewModel());
        });
    }

})(); // We call our anonymous function immediately
