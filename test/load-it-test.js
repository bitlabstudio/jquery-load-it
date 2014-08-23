QUnit.module('Helper methods')
QUnit.test('Testing the ``_get_content_placement`` method.', function(assert) {

    // setting up the element and its attributes
    var element = document.createElement('DIV')
        ,plugin;

    // instantiate the plugin
    plugin = new LoadItPlugin(element);

    //testing
    assert.equal(
        plugin._get_content_placement()
        ,'replace'
        ,'Per default ``_get_content_placement`` should return "replace".'
    );

    element.setAttribute('data-loadit-content', 'append');
    assert.equal(
        plugin._get_content_placement()
        ,'append'
        ,'When defined ``_get_content_placement`` should return the set value.'
    );
});

QUnit.test('Testing the ``_get_loading_class`` method.', function(assert) {

    // setting up the element and its attributes
    var element = document.createElement('DIV')
        ,plugin;

    // instantiate the plugin
    plugin = new LoadItPlugin(element);

    // testing
    assert.equal(
        plugin._get_loading_class()
        ,'loadit-loading'
        ,'Per default ``_get_loading_class`` should return "loadit-loading".'
    );

    element.setAttribute('data-loadit-loading-class', 'customloaderclass');
    assert.equal(
        plugin._get_loading_class()
        ,'customloaderclass'
        ,'If defined, ``_get_loading_class`` should return the set value.'
    );

});

QUnit.test('Testing the ``_get_query_string`` method.', function(assert) {
    // tests if the ``get_query_string`` method does its job

    // setting up the element and its attributes
    var element = document.createElement('DIV'),
        plugin;

    // attributes, that should not be added to the query
    element.setAttribute('data-not-used-element', 'has the wrong format');
    element.setAttribute('data-loadit-url', 'example.com');
    element.setAttribute('data-loadit-loading-class', 'customloadingclass');
    element.setAttribute('data-loadit-content', 'append');

    // attributes, that should be added to the query
    element.setAttribute('data-loadit-added', 'added');
    element.setAttribute('data-loadit-urlencoded', 'This needs urlencoding');

    // instantiate the plugin
    plugin = new LoadItPlugin(element);

    // testing
    assert.equal(
        plugin._get_query_string()
        ,'?added=added&urlencoded=This%20needs%20urlencoding'
        ,'A query string with GET paremeters should be created from element: ``' + element.outerHTML + '``'
    );
});

QUnit.test('Testing the ``_get_url`` method.', function(assert) {

    // setting up the element and its attributes
    var element = document.createElement('DIV')
        ,plugin;

    // instantiate the plugin
    plugin = new LoadItPlugin(element);

    // testing
    assert.equal(
        plugin._get_url()
        ,'.'
        ,'Without setting an url, it should default to "."'
    );

    element.setAttribute('data-loadit-url', 'example.com');
    assert.equal(
        plugin._get_url()
        ,'example.com'
        ,'The url should be set correctly.'
    );
});
