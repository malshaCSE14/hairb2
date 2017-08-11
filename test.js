/**
 * Created by malsha_h on 8/3/2017.
 */
describe('Sign In', function() {
    it('Wrong User cannot login', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("r@r.rr");
        element(by.id('password')).sendKeys("r");
        element(by.id('signinbutton')).click();
        // expect(element(by.id('name')).getText()).
        // toEqual('R R');
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/signin');
        // element(by.id('account')).click();
        // element(by.id('logout')).click();
    });
    it('Correct Stylist Login', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("jessica@gmail.com");
        element(by.id('password')).sendKeys("jessica");
        element(by.id('signinbutton')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/stylist-public-profile/598c4c3eb1a9251578b3d0f6');
        element(by.id('account')).click();
        element(by.id('logout')).click();
        // expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');

    });
    it('Correct Salon login redirect to search', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("emily@gmail.com");
        element(by.id('password')).sendKeys("emily");
        element(by.id('signinbutton')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/search');
        element(by.id('account')).click();
        element(by.id('logout')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');
    });
    it('New user login', function() {
        browser.get('http://localhost:8080/signin/');
        element(by.id('email')).sendKeys("laura@gmail.com");
        element(by.id('password')).sendKeys("laura");
        element(by.id('signinbutton')).click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/welcome');
        element(by.id('account')).click();
        element(by.id('logout')).click();
        // expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');

    });


});
//
// describe('Sign Up', function() {
//     it('Registration on existing email', function() {
//         browser.get('http://localhost:8080/signup/');
//         element(by.id('fname')).sendKeys("Laura");
//         element(by.id('lname')).sendKeys("Alexander");
//         element(by.id('email')).sendKeys("laura@gmail.com");
//         element(by.id('password')).sendKeys("r");
//         element(by.id('confirm_password')).sendKeys("r");
//         element(by.id('Button')).click();
//         // expect(element(by.id('name')).getText()).
//         // toEqual('R R');
//         expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/signup');
//         // element(by.id('account')).click();
//         // element(by.id('logout')).click();
//     });
//
// });



// /**
//  * Created by malsha_h on 8/3/2017.
//  */
// describe('Sign In', function() {
//     it('Correct Salon login redirect to search', function() {
//         browser.get('http://localhost:8080/signin/');
//         var searchTerm = 'emily@gmail.com';
//         for(i = 0; i < searchTerm.length; i++){
//             element(by.id('email')).sendKeys(searchTerm.charAt(i));
//         }
//         searchTerm = 'emily';
//         for(i = 0; i < searchTerm.length; i++){
//             element(by.id('password')).sendKeys(searchTerm.charAt(i));
//         }
//         // element(by.id('email')).sendKeys("emily@gmail.com");
//         // element(by.id('password')).sendKeys("emily");
//         element(by.id('signinbutton')).click();
//         expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/search');
//         element(by.id('account')).click();
//         element(by.id('logout')).click();
//         expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');
//     });
//     it('New user login', function() {
//         browser.get('http://localhost:8080/signin/');
//         var searchTerm = 'laura@gmail.com';
//         for(i = 0; i < searchTerm.length; i++){
//             element(by.id('email')).sendKeys(searchTerm.charAt(i));
//         }
//         // element(by.id('email')).sendKeys("laura@gmail.com");
//         searchTerm = 'laura';
//         for(i = 0; i < searchTerm.length; i++){
//             element(by.id('password')).sendKeys(searchTerm.charAt(i));
//         }
//         // element(by.id('password')).sendKeys("laura");
//         element(by.id('signinbutton')).click();
//         expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/welcome');
//         element(by.id('account')).click();
//         element(by.id('logout')).click();
//     });
//     it('Correct Stylist Login', function() {
//         browser.get('http://localhost:8080/signin/');
//         var searchTerm = 'jessica@gmail.com';
//         for(i = 0; i < searchTerm.length; i++){
//             element(by.id('email')).sendKeys(searchTerm.charAt(i));
//         }
//         searchTerm = 'jessica';
//         for(i = 0; i < searchTerm.length; i++){
//             element(by.id('password')).sendKeys(searchTerm.charAt(i));
//         }
//         // element(by.id('email')).sendKeys("jessica@gmail.com");
//         // element(by.id('password')).sendKeys("jessica");
//         element(by.id('signinbutton')).click();
//         expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/stylist-public-profile/598c4c3eb1a9251578b3d0f6');
//         element(by.id('account')).click();
//         element(by.id('logout')).click();
//         // expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/');
//
//     });
//     // it('Correct Stylist login redirect to profile', function() {
//     //     browser.get('http://localhost:8080/signin/');
//     //     element(by.id('email')).sendKeys("r@r.rr");
//     //     element(by.id('password')).sendKeys("r");
//     //     element(by.id('signinbutton')).click();
//     //     expect(element(by.id('name')).getText()).
//     //     toEqual('R R');
//     //     element(by.id('account')).click();
//     //     element(by.id('logout')).click();
//     // });
//
// });
