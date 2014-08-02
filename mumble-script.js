(function () {

    // Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.1') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
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
        knockout_link.appendTo('head');

        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {
            var cvpKey = 'aec4afa2-d777-43e9-8ca5-41bc70d00877';
            var host = 'http://guildbit.com';
            var baseURL = host + "/server/cvp/" + cvpKey + "/json/?callback=?";


            /******* Load CSS *******/
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: "../mumble-script.css" // change this to cdn
            });
            css_link.appendTo('head');


            /******* Load JSONP *******/
            var jsonp_url = baseURL;
            // $.getJSON(jsonp_url, function(data) {
            //   // $('#mumble-script-container').html("This data comes from another server: " + data);
            //   console.log(data);
            // });

            /******* Load HTML *******/
            var html = "<table class='mumble-script-widget rounded centered' data-bind='with: cvp'><thead> \
                <tr><th data-bind='text: name'></th></tr> \
                </thead><tbody> \
                <!-- ko foreach: root.users --> \
                <tr class='widget-content'><td data-bind='text: name'></td></tr> \
                <!-- /ko --> \
                <!-- ko if: root.users.length == 0 --> \
                <tr><td>No users are online</td></tr> \
                <!-- /ko --> \
                </tbody></table>";

            $('#mumble-script-container').html(html);


            // Knockout Users ViewModel for displaying and updating users online
            function CvpViewModel() {
                var self = this;

                self.cvp = ko.observable(loadCvpData());

                // Load initial users into usersOnline observable, then set an interval
                function loadCvpData() {
                    var data = {};
                    $.ajax({
                        url: jsonp_url,
                        async: false,
                        dataType: "jsonp",
                        success: function (json) {
                            console.log(json.name);
                            data = json;
                            self.cvp(data);
                        }
                    });
                    // return data;
                }
                setInterval(function() {
                    // self.cvp(loadCvpData());
                    loadCvpData();
                }, 15000)

            }
            ko.applyBindings(new CvpViewModel());
        });
    }

})(); // We call our anonymous function immediately
