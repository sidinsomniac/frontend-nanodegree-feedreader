/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against this application.
 */

//  This function checks if the feed urls are valid or not
const isURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

/* All the tests will be placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is the RSS Feeds test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {

        /* This is our test to make sure that the allFeeds
         * variable has been defined and that it is not
         * empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in all
         * allFeeds object and ensures it has a URL
         * defined and that the URL is not empty.
         */
        it('urls are defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(isURL(feed.url)).toBe(true);
            });
        });

        /* This test loops through each feed in the
         * allFeeds object and ensures it has a name
         * defined and that the name is not empty.
         */
        it('names are defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });



    /* This is another test suite named "The menu"
    * and it checks for the behavior of the menu icon
    */
    describe('The menu', () => {

        const menuBar = document.querySelector('.icon-list');

        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', () => {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked, 
         * and it has two expectations: what the menu 
         * display does when clicked and whether it 
         * hides when clicked again.
         */

        it('changes visibility when the menu icon is clicked', () => {
            menuBar.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menuBar.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

    });


    /* This is a testing suite for initial entries */
    describe('Initial Entries', () => {

        /* The beforeEach function is called once before 
        * each spec in the test suite in which it is called
        * to basically DRY up the code. We use it here since
        * the loadFeed() is asynchronous, so this test will require
        * the use of beforeEach and asynchronous done() function.
        */

        beforeEach((done) => {
            /* The done() function is always passed to the
            * beforeEach() test methods as an argument, and 
            * is usually used in the success callback function 
            * of Ajax calls and the pertinent event listener of DOM events.
            */
            loadFeed(0, done);
        });

        /* This test ensures when the loadFeed function is 
         * called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it('should contain atleast one entry', (done) => {
            expect(document.querySelectorAll('.feed .entry').length).toBeDefined();
            expect(document.querySelectorAll('.feed .entry').length).not.toBe(0);
            done();
        });
    });



    /* A new feed selection test suite */

    describe('New Feed Selection', () => {

        // Declaring variables for the old feed and new feed
        let oldFeed, newFeed;

        /* Since loadFeed() is asynchronous, we use the
         * beforeEach() and done() test methods here as well
        */
        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1, () => {
                    newFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });

        /* This test ensures when a new feed is loaded by the
        * loadFeed function that the content actually changes.
        */

        it('loads a new feed', (done) => {
            // Ensures old feed and new feed is not the same
            expect(newFeed).not.toBe(oldFeed);
            done();
        });
    });
}());
