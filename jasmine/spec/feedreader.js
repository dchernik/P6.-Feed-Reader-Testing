/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		var len = allFeeds.length;

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */

		// Test URL inside each feed in allFeeds
		it('Feed URL is defined and not empty', function() {
			for (var i = 0; i < len; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});
		 
		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */

		// Test name inside each feed in allFeeds
		it('Feed name is defined and not empty', function() {
			for (var i = 0; i < len; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		});
	});

	/* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {

		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */

		// Test if body element initially has class 'menu-hidden'
		// Uses jasmine-jquery library
		it('is hidden by default', function() {
			expect('body').toHaveClass('menu-hidden');
		});

		/* TODO: Write a test that ensures the menu changes
		* visibility when the menu icon is clicked. This test
		* should have two expectations: does the menu display when
		* clicked and does it hide when clicked again.
		*/

		// Test if click event on menu button toggles 
		// menu-hidden class on body element
		// Uses jasmine-jquery library
		it('changes visibility on menu button click', function() {
			$('.menu-icon-link').click();
			expect('body').not.toHaveClass('menu-hidden');
			$('.menu-icon-link').click();
			expect('body').toHaveClass('menu-hidden');
		});

		// Test that menu hides when a feed was selected
		// Uses jasmine-jquery library
		it('hides on new feed selection', function() {
			$('body').removeClass('menu-hidden');
			$('.feed-list a').click();
			expect('body').toHaveClass('menu-hidden');
		});

		// Test that feed gets removed from the menu list
		// Uses jasmine-jquery library
		it('deletes a feed from the list', function() {
			// remember the tested list item
			var $temp = $('a[data-id="0"]').parent();

			// simulate remove-button click
			$('button[data-id="0"]').click();

			// the test itself
			expect($('a[data-id="0"]').parent().length).toBe(0);
			
			// put removed item back
			$('.feed-list').prepend($temp);
		});
	});

	/* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		
		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		// Test if feed container has any children after loadFeed function
		// ran with default (as per app scpecs) parameter
		// Uses jasmine-jquery library
		it('.feed container should not be empty', function(done) {
			expect('.feed').not.toBeEmpty();
			done();
		});
	});


	/* TODO: Write a new test suite named "New Feed Selection" */
	// This test suit assumes there at least two feeds in allFeeds
	// array and that the first one is loaded onto the page by default
	describe('New Feed Selection', function() {
		
		/* TODO: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
				// will hold .feed containers text before loading new feed 
		var initialContent = '',				
				// will hold .feed containers text after loading new feed 			
				newContent = '',
				// will load last feed to perform the test
				newFeedId = allFeeds.length - 1;

		// Get content of .feed container before and after loading
		// after loading new feed		
		beforeEach(function(done) {
			content = $('.feed').text();
			
			loadFeed(newFeedId, function() {
				newContent = $('.feed').text();
				done();
			});
		});

		// Return page to initial state after test finishes
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
			
		// Test that content changes
		it('content of .feed container should change', function(done) {
			expect(content).not.toEqual(newContent);
			done();
		});
	});
}());
