QUnit.module('Helper methods');
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

    $(element).html('<div class="loadit-footer" data-loadit-added="differently"></div>');

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
    assert.equal(
        plugin._get_query_string(true)
        ,'?added=differently&urlencoded=This%20needs%20urlencoding'
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

QUnit.module('AJAX Tests');
QUnit.test('Test content is fetched and inserted properly', function(assert) {

    // initialize fake XMLHttpRequest server using sinon.js
    var server = this.sandbox.useFakeServer()
        ,element = document.createElement('DIV');

    // setup the response
    server.respondWith(
        'GET'                                   // method
        ,'.'                                    // location
        ,[200, {'Content-Type': 'text/html'}    // header
        ,'<p class="newcontent">Content</p>']   // content/body
    );

    // fire the plugin
    $(element).loadit();

    // let the server respond
    server.respond();

    // check if content replaced the html
    assert.ok(
        $(element).find('.newcontent').length
        ,'The element should contain the new content. Got: ' + element.outerHTML
    );

    // make content p elements have different classes
    $(element).children().each(function() {
        $(this).removeClass('newcontent').addClass('persistent');
    });
    element.setAttribute('data-loadit-content', 'prepend');
    $(element).loadit();
    server.respond();

    // check that the new content is prepended
    assert.ok(
        $(element).children().first().hasClass('newcontent')
        ,'The element should be the first in its parent. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).find('.persistent').length
        ,'The persistent elements should not have been replaced.'
    );

    // make content p elements have different classes again
    $(element).children().each(function() {
        $(this).removeClass('newcontent').addClass('persistent');
    });
    element.setAttribute('data-loadit-content', 'append');
    $(element).loadit();
    server.respond();

    // check that the new content is appended
    assert.ok(
        $(element).children().last().hasClass('newcontent')
        ,'The element should be the last in its parent. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).find('.persistent').length
        ,'The persistent elements should not have been replaced.'
    );

    // check that the loader class was removed again
    assert.ok(
        !$(element).hasClass('loadit-loading')
        ,'The element should no longer have the loading class: ' + element.outerHTML
    );
});

QUnit.test('Test for content that is inserted between header and footer', function(assert) {

    // initialize fake XMLHttpRequest server using sinon.js
    var server = this.sandbox.useFakeServer()
        ,element = document.createElement('DIV');

    // add header and footer to the element
    $(element).html('<div class="loadit-header"></div><div class="loadit-footer"></div>');

    // setup the response
    server.respondWith(
        'GET'                                   // method
        ,'.'                                    // location
        ,[200, {'Content-Type': 'text/html'}    // header
            ,'<p class="newcontent">Content</p>']   // content/body
    );

    // fire the plugin
    $(element).loadit();

    // let the server respond
    server.respond();

    // check if content is placed correctly
    assert.equal(
        $(element).find('.newcontent').length
        ,1
        ,'The element should be inserted Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().first().hasClass('loadit-header')
        ,'The header should not have been replaced. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().last().hasClass('loadit-footer')
        ,'The footer should not have been replaced. Got: ' + element.outerHTML
    );

    // same tests for appending content
    $(element).attr('data-loadit-content', 'append');

    $(element).loadit();
    server.respond();

    // check if content is placed correctly
    assert.equal(
        $(element).find('.newcontent').length
        ,2
        ,'The element should be inserted Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().first().hasClass('loadit-header')
        ,'The header should not have been replaced. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().last().hasClass('loadit-footer')
        ,'The footer should not have been replaced. Got: ' + element.outerHTML
    );

    // same tests for prepending content
    $(element).attr('data-loadit-content', 'append');

    $(element).loadit();
    server.respond();

    // check if content is placed correctly
    assert.equal(
        $(element).find('.newcontent').length
        ,3
        ,'The element should be inserted Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().first().hasClass('loadit-header')
        ,'The header should not have been replaced. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().last().hasClass('loadit-footer')
        ,'The footer should not have been replaced. Got: ' + element.outerHTML
    );
});

QUnit.test('Test the load more button', function(assert) {

    // initialize fake XMLHttpRequest server using sinon.js
    var server = this.sandbox.useFakeServer()
        ,element = document.createElement('DIV');

    // add header and footer to the element
    $(element).html(
        '<div class="loadit-header"></div>' +
        '<div class="loadit-footer"><a href="#" data-class="loadit-morebutton">Load more</a></div>'
    );
    $(element).attr('data-loadit-content', 'append');

    // setup the response
    server.respondWith(
        'GET'                                   // method
        ,'.'                                    // location
        ,[200, {'Content-Type': 'text/html'}    // header
            ,'<p class="newcontent">Content</p>']   // content/body
    );

    // fire the plugin
    $(element).loadit();

    // let the server respond
    server.respond();

    // check if content is placed correctly
    assert.equal(
        $(element).find('.newcontent').length
        ,1
        ,'The element should be inserted. Got: ' + element.outerHTML
    );

    // click the load more button
    $(element).loadit('more');
    server.respond();

    // check if content is placed correctly
    assert.equal(
        $(element).find('.newcontent').length
        ,2
        ,'The element should be inserted when loading more. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().first().hasClass('loadit-header')
        ,'The header should not have been replaced. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().last().hasClass('loadit-footer')
        ,'The footer should not have been replaced. Got: ' + element.outerHTML
    );

    // click the load more button while prepending
    $(element).attr('data-loadit-content', 'prepend');
    $(element).loadit('more');
    server.respond();

    // check if content is placed correctly
    assert.equal(
        $(element).find('.newcontent').length
        ,3
        ,'The element should be inserted when loading more. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().first().hasClass('loadit-header')
        ,'The header should not have been replaced. Got: ' + element.outerHTML
    );
    assert.ok(
        $(element).children().last().hasClass('loadit-footer')
        ,'The footer should not have been replaced. Got: ' + element.outerHTML
    );
});
