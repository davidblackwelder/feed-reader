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
    describe('RSS Feeds', function() {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined and is not empty', function() {
           for (let feed of allFeeds) {
               expect(feed.url).toBeDefined();
               expect(feed.url).toContain("http"); // testing for common start of a URL. (.toContain found at https://jasmine.github.io/2.0/introduction.html)
               expect(feed.url.length).not.toBe(0);
           }
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined and is not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        let body;

        beforeEach(function() {
            body = document.querySelector('body');
        });

        // Ensures the menu element is hidden by default
        it('has menu element hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         // Ensures the menu changes visibility when the menu icon is clicked
         it('has menu change visibility when the menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');

            // first click should show menu
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // second click should hide menu
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0);
            done();
        });

        /* Ensures when the loadFeed function is called and completes its work,
         * there is at least
         * a single .entry element within the .feed container.
         */
        it('has at least a single entry within the feed container', function(done) {
            const feed = document.querySelector('.feed');
            expect(feed.children).not.toBeNull();
            expect(feed.children).toBeDefined();
            done();
        });
    });

    describe('New Feed Selection', function() {
        let firstLoadFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstLoadFeed = document.querySelector('.feed').innerText;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Ensures when a new feed is loaded by the loadFeed function the content actually changes.

        it('has content change when a new feed is loaded by the loadFeed function', function(done) {
            let secondLoadFeed = document.querySelector('.feed').innerText;
            expect(firstLoadFeed).not.toEqual(secondLoadFeed);
            done();
        });
    });
}());
