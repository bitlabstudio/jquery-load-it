jQuery LoadIt
=============

A jQuery plugin that aims to make post loading of data into already loaded elements easier.

Loading parts of a page after the big picture can dramatically increase the sensation of a fast loading page.
Even though the page as a whole is not loaded faster, just giving the impression, that there's some sort of progress
will provide a far better experience.

But this is no excuse to not optimize your data to respond faster in the first place ;)

Wishlist / not sure if it's added or really necessary / not sure when it's added, might be a while:

* inserting / showing animation. E.g. using jQuery slide or fade
* Populating lists of templates from a json response / populating content from json in general
  Like when you have a list of avatars, then you may not want to send whole finished templates all the time. It would
  be easier and probably faster to not have the backend render everything if the general layout and template is already
  present. We could just get back a JSON response with  the image URLs and fill them in.
* success / launch callbacks
* Loading triggers: Automatically reload on a certain action / if a certain input gets changed / scroll / hover / click

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


Header and footer
+++++++++++++++++

If you want, you can define a header and a footer, that will not be replaced when the content is inserted. A header will
always remain on top of the element, even if the content is prepended. Same behaviour applies to the footer and
appending.

An example markup could be:

.. code-block:: html

    <div data-class="loadit" data-loadit-url="/mysupercontent/">
        <div class="loadit-header">
            <h1>My header headline that will stay on top</h1>
        </div>

        <!-- Here will the content go -->

        <div class="loadit-footer">
            <p>This is my super footer text, that will not be replaced.</p>
        </div>
    </div>


Load more buttons
+++++++++++++++++

You can add a load more button to your footer, that will post to the same view where the content was fetched before, but
with the addition of sending extra parameters to the view. These extra parameters are defined on the footer element, the
same way as you did on the parent. Just use ``data-loadit-my-extra-key="myextravalue"`` on the ``loadit-footer`` element
to send them along with the new request for more content.

A note about the behaviour of the arguments. All data attributes defined by you on the parent element can be overwritten
on the footer.

To identify the element, that should serve as load more button, you need to add the ``data-class="loadit-morebutton"``
attribute to it and place it inside the element with ``class="loadit-footer"``.

This could look something like:

.. code-block:: html

    <div data-class="loadit" data-loadit-url="/mysupercontent/" data-loadit-myarg="myval" data-loadit-content="append">
        <div class="loadit-header">
            <h1>My header headline that will stay on top</h1>
        </div>

        <!-- Here will the content go -->

        <div class="loadit-footer" data-loadit-myarg="overwritten">
            <a href="#" data-class"loadit-morebutton">Load more</a>
        </div>
    </div>
