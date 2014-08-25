/*
 * jQuery LoadIt v0.2
 *
 * A jQuery plugin that makes post loading content easier.
 *
 * Latest source at https://github.com/bitmazk/jquery-load-it
 *
 */

function LoadItPlugin(element) {

    this.$element = $(element);
    this.element = element;
    this.DEFAULT_PREFIX = 'data-loadit-';
    this.EXCLUDED_ATTRIBUTES = ['url', 'loading-class', 'content'];

}

LoadItPlugin.prototype.init = function() {

    // Initialize the plugin

    // variables
    var loading_class
        ,url;

    // get url from the element's url data attribute
    url = this._get_url();

    // get the loading class to apply while waiting for a response and add it to the element
    loading_class = this._get_loading_class();
    this.$element.addClass(loading_class);

    this.load_data(url, loading_class, false);
};

LoadItPlugin.prototype.load_more = function() {

    // Initialize the plugin

    // variables
    var loading_class
        ,url;

    // get url from the element's url data attribute
    url = this._get_url();

    // get the loading class to apply while waiting for a response and add it to the element
    loading_class = this._get_loading_class();
    this.$element.addClass(loading_class);

    this.load_data(url, loading_class, true);
};

LoadItPlugin.prototype.load_data = function(url, loading_class, loadmore) {

    // loads the actual data

    var query = this._get_query_string(loadmore);

    // get the content placement behaviour
    var content_placement = this._get_content_placement();

    // get the content
    $.ajax({
        url: url + query
        ,context: this.element
        ,success: function(data) {

            var $header = $(this).find('.loadit-header')
                ,$footer = $(this).find('.loadit-footer');

            // if there are no children, we can just insert the data
            if (!$(this).children().length) {
                $(this).html(data);
            } else {

                // if there are children, place the content where defined
                if (content_placement === 'replace' || !$(this).children().length) {

                    // clear the content
                    $(this).html('');

                    // append the header again if present
                    if ($header.length) {
                        $(this).append($header);
                    }

                    // append the content
                    $(this).append($(data));

                    // append the footer again if present
                    if ($footer.length) {
                        $(this).append($footer);
                    }

                } else if (content_placement === 'append') {

                    // insert after the last child, that is not the footer
                    if ($footer.length) {
                        $(data).insertBefore($footer);
                    } else {
                        $(data).insertAfter($(this).children().last());
                    }
                } else if (content_placement === 'prepend') {

                    // insert before the first child, that is not the header
                    if ($header.length) {
                        $(data).insertAfter($header);
                    } else {
                        $(data).insertBefore($(this).children().not('loadit-header').first());
                    }
                }
            }

            // remove the loading class again
            $(this).removeClass(loading_class);
        }
    });
};

LoadItPlugin.prototype._get_content_placement = function() {

    // returns the specified content placement behaviour for received data or its default

    var content_placement = this.$element.attr('data-loadit-content');

    if (!content_placement) {
        content_placement = 'replace';
    }

    return content_placement;
};

LoadItPlugin.prototype._get_loading_class = function() {

    // returns the specified class, that is applied while waiting for the fetched content or its default value

    var loading_class = this.$element.attr('data-loadit-loading-class');

    if (!loading_class) {
        loading_class = 'loadit-loading';
    }

    return loading_class;
};

LoadItPlugin.prototype._get_query_string = function(loadmore) {

    // create the query string from the elements attributes

    var attribute
        ,attributes = {}
        ,key
        ,query = ''
        ,prefix
        ,value
        ,$footer = this.$element.find('.loadit-footer')
        ,i;

    // iterate over each attribute of the element and save it in the dictionary
    for (i = 0; i < this.element.attributes.length; i++) {
        attribute = this.element.attributes[i];
        attributes[attribute.name] = attribute.value;
    }

    // if loading more, we overwrite the attributes again
    if (loadmore) {
        for (i = 0; i < $footer[0].attributes.length; i++) {
            attribute = $footer[0].attributes[i];
            attributes[attribute.name] = attribute.value;
        }
    }

    for (var attname in attributes) {
        if (attname.indexOf(this.DEFAULT_PREFIX) === 0) {
            // start the query string with ? and add every additional parameter with &
            if (query === '') {
                prefix = '?';
            } else {
                prefix = '&';
            }

            // if the attribute starts with the plugin default prefix of 'data-load-it',
            // then add the attribute to the query string
            key = attname.slice(this.DEFAULT_PREFIX.length);
            if (this.EXCLUDED_ATTRIBUTES.indexOf(key) === -1) {
                value = encodeURIComponent(attributes[attname]);
                query = query + prefix + key + '=' + value;
            }
        }
    }

    return query;
};

LoadItPlugin.prototype._get_url = function() {

    // returns the specified url from the element or the default value

    var url = this.$element.attr('data-loadit-url');

    if (!url) {
        url = '.';
    }

    return url;
};

(function( $ ) {
    $.fn.loadit = function(action) {
        return this.each(function() {
            var plugin = new LoadItPlugin(this);
            if (action === 'more') {
                $.data(this, 'load_more', plugin.load_more());
            } else {
                $.data(this, 'loadit', plugin.init());
            }
        });
    };
    $(document).ready(function() {
        $('[data-class="loadit"]').loadit();
    });
    $(document).on('click', '[data-class="loadit-morebutton"]', function(e) {
        e.preventDefault();
        $(this).parents('[data-class="loadit"]').loadit('more');
    });
}( jQuery ));

