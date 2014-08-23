jQuery LoadIt
=============

A jQuery plugin that aims to make post loading of data into already loaded elements easier.

Loading parts of a page after the big picture can dramatically increase the sensation of a fast loading page.
Even though the page as a whole is not loaded faster, just giving the impression, that there's some sort of progress
will provide a far better experience.

But this is no excuse to not optimize your data to respond faster in the first place ;)

TODO / Planned features:

* Implement adding ajax loader class while waiting for response to allow loading animations
* Implement placement of content via attribute - 'replace', 'append', 'prepend'
* Implement loadit-header and loadit-footer elements, that are even ignored by replace actions
* Load more button - calls the same url again and allows extra parameters. Per default 'append's content (see content
  placement).

Wishlist / not sure if it's added or really necessary / not sure when it's added, might be a while:

* inserting / showing animation. E.g. using jQuery slide or fade
* Populating lists of templates from a json response / populating content from json in general
  Like when you have a list of avatars, then you may not want to send whole finished templates all the time. It would
  be easier and probably faster to not have the backend render everything if the general layout and template is already
  present. We could just get back a JSON response with  the image URLs and fill them in.
* automatically reload on a certain action / if a certain input gets changed
* success / launch callbacks

Basic Usage
-----------

The most simple use case is to just define ``data-loadit-url`` on your element ``data-class="loadit"`` to enable the
script. Once added, it will automatically find those and load away. If you want to initialize it on your own, just leave
out ``data-class="loadit"`` and launch it by calling ``$('#my_element').loadit();`` manually.

.. code-block:: html

    <div data-class="loadit" data-loadit-url="/url/"></div>


You can pass any amount of additional arguments to your view by adding ``data-loadit-mykey="myvalue"`` to the
element. This would then result in ``mykey=myvalue`` to be passed as GET argument.
However you cannot use 'url', 'loading-class' or 'content' since these are used by LoadIt itself.

.. code-block:: html

    <div data-class="loadit" data-loadit-foo="bar" data-loadit-url="/url/"></div>


All data attribute options
++++++++++++++++++++++++++

``data-loadit-url`` - The url, the content should be fetched from. Default: '.'
``data-loadit-content`` - Can be either 'append', 'prepend' or 'replace' and tells LoadIt where to put the content.
Default: 'replace'
``data-loadit-loading-class`` - The class name, that is added to the element, when waiting for the content. This way you
can add your own custom style for loading animations. Default: 'loadit-loading'
