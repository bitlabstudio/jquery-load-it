/*
 * jQuery LoadIt v0.1
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

    this.init();
    this._get_query_string(element);
    this._get_url();
    this._get_content_placement();
    this._get_loading_class();
}

LoadItPlugin.prototype.init = function() {

    // Initialize the plugin

    // variables
    var query
        ,url;

    // get url from the element's url data attribute
    url = this._get_url();

    // create the GET query string
    query = this._get_query_string(this);

    // TODO this is probably better as $.ajax()
    this.$element.load(url + query);
};

LoadItPlugin.prototype._get_content_placement = function() {

    // returns the specified content placement behaviour for received data or its default

    var content_placement = this.$element.attr('data-loadit-content');

    if (!content_placement) {
        content_placement = 'replace';
    }

    return content_placement
};

LoadItPlugin.prototype._get_loading_class = function() {

    // returns the specified class, that is applied while waiting for the fetched content or its default value

    var loading_class = this.$element.attr('data-loadit-loading-class');

    if (!loading_class) {
        loading_class = 'loadit-loading';
    }

    return loading_class;
};

LoadItPlugin.prototype._get_query_string = function() {

    // create the query string from the elements attributes

    var attribute
        ,attname
        ,query = ''
        ,prefix
        ,value;

    // iterate over each attribute of the element
    for (var i = 0; i < this.element.attributes.length; i++) {
        attribute = this.element.attributes[i];

        // start the query string with ? and add every additional parameter with &
        if (query === '') {
            prefix = '?';
        } else {
            prefix = '&';
        }

        // if the attribute starts with the plugin default prefix of 'data-load-it',
        // then add the attribute to the query string
        if (attribute.name.indexOf(this.DEFAULT_PREFIX) === 0) {
            attname = attribute.name.slice(this.DEFAULT_PREFIX.length);
            if (this.EXCLUDED_ATTRIBUTES.indexOf(attname) == -1) {
                value = encodeURIComponent(attribute.value);
                query = query + prefix + attname + '=' + value;
            }
        }
    }

    return query
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
    $.fn['loadit'] = function() {
        return this.each(function(){
            $.data(this, 'loadit', new LoadItPlugin(this))
        })
    };
    $(document).ready(function() {
        $('[data-class="loadit"]').loadit();
    });
}( jQuery ));

