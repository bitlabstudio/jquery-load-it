jQuery LoadIt v0.2
==================

A jQuery plugin that aims to make loading data easier.

Optimized everything, but still want to squeeze the last bit of speed sensation out of your page?
Want to load more content on a click of a button?
Do you want to auto load content on scroll or other events? [still WIP, stay tuned =)]

Well worry not, dear friend! You've come to the right place!


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


This basic setup will, once the page is ready, load the rest of the content into the defined ``div``.

**Django users hint:** Check out django-libs_. It has an ``AjaxResponseMixin``, that lets you easily handle ajax and
non-ajax responses for each of your views, just by adding the mixin and creating an ajax variant of your view template.

.. _django-libs: https://github.com/bitmazk/django-libs

All data attribute options
++++++++++++++++++++++++++

``data-loadit-url`` - The url, the content should be fetched from. Default: '.'
``data-loadit-content`` - Can be either 'append', 'prepend' or 'replace' and tells LoadIt where to put the content.
Default: 'replace'
``data-loadit-loading-class`` - The class name, that is added to the element, when waiting for the content. This way you
can add your own custom style for loading animations. Default: 'loadit-loading'


Load more buttons
+++++++++++++++++

**Important Note!** ``loadit-header`` and ``loadit-footer`` will soon be removed again. Just did turn out to be quite
useless in the end.

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

        <!-- Here will the content go -->

        <div class="loadit-footer" data-loadit-myarg="overwritten">
            <!-- This will soon work without the footer and just the button alone. -->
            <a href="#" data-class"loadit-morebutton">Load more</a>
        </div>
    </div>
