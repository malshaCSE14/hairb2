/**
 * Created by malsha_h on 8/3/2017.
 */
describe('Sign In', function() {
    it('Validates the name of a correct user login', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("q@q.qq");
        element(by.id('password')).sendKeys("q");
        element(by.id('signinbutton')).click();
        expect(element(by.id('name')).getText()).
        toEqual('Q Q');
    });
});