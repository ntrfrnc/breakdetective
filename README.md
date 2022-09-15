BreakDetective.js
===========


Project Overview
----------------
Small piece of js code that detects line break among inline displayed elements (including inline-block, and flex with flex-direction:row).  
It adds `.broken-line` class when line is broken and calculate (by using largest element) how many elements could fit in the first line as `data-bditems` attribute.  
Allows you to take control over elements with broken lines by css.

**Version:** 0.0.2-dev  
**Dependencies:** none (VanillaJS)  
**Support:** Latest Mozilla Firefox, Google Chrome and IE9+. 

[SEE DEMO](https://pawlos.dev/breakdetective)


Usage:
----------------

Initialize library on element:

      breakdetective('.container');
 
And style elements and its children using `.broken-line` class and `data-bditems` attribute, e.g.:

      .container.broken-line .child{
        border: 1px solid red;
      }
      .container[data-bditems="3"] .child{
        width:33.33%;
      }

[See demo](https://pawlos.dev/breakdetective) for real examples.

License
----------------

BreakDetective.js is released under the terms of the MIT license. See LICENSE file for details.


Credits
----------------

BreakDetective.js is developed by Rafael Pawlos, [pawlos.dev](https://pawlos.dev)
