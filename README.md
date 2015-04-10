# Project Solution Overview

To setup some of the tests in this project [jasmine-jquery library](https://github.com/velesin/jasmine-jquery) was used.

To run the tests simply open index.html file in a preferred browser.


### Additional tests.

Two additional tests were created in 'The menu' test suite.

- First one makes sure that the menu hides (body element has class menu-hidden),
when a feed was selected.
This test doesn't require any modifications of the application.

- Second one was set up to test for a possible future feature of removing feeds
from the menu. Right now that test fails. To implement that functionality we need
to create remove-buttons next to each feed in the menu, clicking any of which will
remove corresponding feed. Data binding will need to be set up for those buttons the
same way as it is set up now for menu links.