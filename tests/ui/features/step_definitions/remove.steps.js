const { Given , Then , When } = require('cucumber');
const assert = require('assert')

Given(/^The contact list is display$/, function (callback) {
    this.browser.visit("http://localhost:3000", (err) => {
        if (err) throw err;
        let nbContactsInTable = this.browser.queryAll("table tr[id]").length;

        let contact = this.browser.tabs.current.Contact;
        let iterator = contact.Contacts.instance().iterator();
        let i = 0;
        while(iterator.hasNext()){
            let row = iterator.next();
            let firstName = this.browser.queryAll('td#cellFirstName')[i].innerHTML;
            let lastName = this.browser.queryAll('td#cellLastName')[i].innerHTML;
            assert.ok(row.firstName() == firstName && row.lastName() == lastName);
            i ++;
        }
        assert.equal(nbContactsInTable, i);
        callback();
    });
});

When(/^User clicks on remove button of the first contact$/, function (callback) {
    let contact = this.browser.tabs.current.Contact;
    let iterator = contact.Contacts.instance().iterator();
    let firstContact = iterator.first();

    this.browser.query("#button_" + firstContact.id()).click();

    callback();
});

Then(/^The first contact is removed$/, function (callback) {
    let contact = this.browser.tabs.current.Contact;
    let iterator = contact.Contacts.instance().iterator();

    let nbContactsAfterDeleteFirst = 0;
    while (iterator.hasNext()) {
        let row = iterator.next();
        assert.ok(row.lastName() != "RAMAT" && row.firstName() != "Eric");
        nbContactsAfterDeleteFirst++;
    }
    assert.equal(this.browser.queryAll("table tr[id]").length, nbContactsAfterDeleteFirst);
    callback();
});