var expect = require('chai').expect,
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY;

test.describe('Google Search', function() {
    test.it('should work', function() {
        var driver = new webdriver.Builder()
            .withCapabilities({
                'browserName': 'chrome',
                'platform': 'Windows XP',
                'version': '43.0',
                'username': username,
                'accessKey': accessKey
            })
            .usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub")
            .build();
        driver.get('http://www.google.com');

        var searchBox = driver.findElement(webdriver.By.name('q'));

        searchBox.sendKeys('simple programmer');

        searchBox.getAttribute('value').then(function(value) {
            expect(value).to.equal('simple programmer');
        });

        driver.quit();
    });
});
