/**
 * Created by malsha_h on 8/3/2017.
 */
describe('Sign In', function() {
    it('Correct Salon login redirect to search', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("q@q.qq");
        element(by.id('password')).sendKeys("q");
        element(by.id('signinbutton')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/search');
        element(by.id('account')).click();
        element(by.id('logout')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');
    });
    it('New user login', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("m@m.mm");
        element(by.id('password')).sendKeys("m");
        element(by.id('signinbutton')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/welcome');
        element(by.id('account')).click();
        element(by.id('logout')).click();
        // expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');

    });
    // it('Correct Stylist login redirect to profile', function() {
    //     browser.get('http://localhost:8080/signin/');
    //     element(by.id('email')).sendKeys("r@r.rr");
    //     element(by.id('password')).sendKeys("r");
    //     element(by.id('signinbutton')).click();
    //     expect(element(by.id('name')).getText()).
    //     toEqual('R R');
    //     element(by.id('account')).click();
    //     element(by.id('logout')).click();
    // });

});
