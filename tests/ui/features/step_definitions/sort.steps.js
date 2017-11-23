const { Given , Then , When } = require('cucumber');
const assert = require('assert')

Given(/^The contact list is display but not sorted$/, function (callback) {
    this.browser.visit("http://localhost:3000", (err) => {
        if (err) throw err;
        let lastNames = this.browser.queryAll("td#cellLastName"),
            lastNamesSorted = true;

        for(var i=0; i<lastNames.length-1; i++){
            if(lastNames[i+1].innerHTML < lastNames[i].innerHTML) lastNamesSorted = false;
        }
        assert.equal(lastNamesSorted, false);
        callback();
    });
});

When(/^User clicks on sort button$/, function (callback) {
    this.browser.query("#button_sort").click();
    callback();
});

Then(/^Displayed contacts are sorted by lastname$/, function (callback) {
    let lastNames = this.browser.queryAll("td#cellLastName");
    for(var i=0; i<lastNames.length-1; i++){
        assert.ok(lastNames[i].innerHTML < lastNames[i+1].innerHTML);
    }
    callback();
});