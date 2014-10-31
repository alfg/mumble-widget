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
            var cvpKey = $(".mumble-widget").data("key");
            var width = $(".mumble-widget").data("width") || 500;
            var host = $(".mumble-widget").data("source") || "//guildbit.com/server/cvp/" + cvpKey + "/json/?callback=?";

            // Asset Sources
            var cssSource = "//dqc3ygqu0f1ud.cloudfront.net/dist/mumble-widget/mumble-widget.min.css";

            // Set container width
            $("#mumble-widget-container").width(width);

            /******* Load CSS *******/
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: cssSource
            });
            css_link.appendTo("head");


            /******* JSONP Endpoint *******/
            var jsonpUrl = host;

            /******* Load HTML Template *******/
            var html = "<table class='mumble-script-widget rounded centered' data-bind='with: cvp'><thead> \
                <tr data-bind='if: $data.root'><th><a href='#' data-bind='text: name, attr: { href: x_connecturl }'></a></th></tr> \
                <tr data-bind='ifnot: $data.root'><th>Not Found</th></tr> \
                </thead><tbody> \
                <!-- ko if: $data.root --> \
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
                  <!-- ko if: $root.userCount() == 0 --> \
                  <tr><td>No users are online</td></tr> \
                  <!-- /ko --> \
                <!-- /ko --> \
                \
                <!-- ko ifnot: $data.root --> \
                <tr><td>Unable to load</td></tr> \
                <!-- /ko --> \
                \
                </tbody></table>";
            $("#mumble-widget-container").html(html);

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
                  for (i = 0; i < data.root.channels.length; i++) {
                    var users = data.root.channels[i].users.length;
                    count += users;
                  }
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
