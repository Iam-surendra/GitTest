describe('Classnotebook Demo App', function() {
    var signInButton = element(by.id('h_sign'));
    var usernameTextbox=element.all(by.css('.placeholderContainer')).all(by.css('.form-control'));
    var passwordTextbox=element(by.id('i0118'));
    var nextButton= element(by.buttonText('Next'));
    var signinButton=element(by.id('idSIButton9'));
    var classNotebookTab=element(by.id('ClassNotebookTab'));
    var CNBook = element(by.linkText('Test Agave V2 2401 Notebook'));


    var viewTab = element(by.id('tabView-title'));

    var appForOfficePanel2 = element(by.id('AppForOfficePanel2-Entry'));
    var officePanelSignIn = element(by.id('SignInButton'));
    var newWindowConformPopUp = element(by.id('newWindowNotificaiton'));
    var distributeButtonOnPannel = element(by.id('DistributePageButton'));
    var classNoteBookRibbon = element.all((by.css('.cui-topBar2'))).all(by.tagName('li')).last();
    var path = require('path');
  
    beforeAll(function(){
      browser.waitForAngularEnabled(false);
    browser.get('https://www.onenote.com/');
    });
    
     it('should login success', function() {
      signInButton.click();
      var EC = protractor.ExpectedConditions;
      browser.switchTo().frame(element(by.id('h_signiniframe')).getWebElement());
      browser.wait(EC.visibilityOf(nextButton), 10000);
      usernameTextbox.sendKeys('t-shwsha@contososd.org');
      nextButton.click();
      browser.switchTo().defaultContent();
      browser.wait(EC.visibilityOf(signinButton), 10000);
      passwordTextbox.sendKeys('!!abc123');
      signinButton.click();
      signinButton.click();
      expect(browser.getTitle()).toEqual('Notebooks');
      });

it('should open onenote online',function(){
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(classNotebookTab), 12000);
    classNotebookTab.click();    
    browser.wait(EC.visibilityOf(CNBook), 12000);
    CNBook.click()
    expect(browser.getTitle()).toEqual('Test Agave V2 2401 Notebook');
});
it('Should open Immesive office launcher',function(){
    var EC = protractor.ExpectedConditions;
    browser.switchTo().frame(element(by.id('WebApplicationFrame')).getWebElement());
    browser.sleep(6000);
    browser.wait(EC.visibilityOf(viewTab), 12000);
    viewTab.click();
    var immersiveReaderButton = element(by.id('btnImmersiveMode-Large'));
    browser.wait(EC.visibilityOf(immersiveReaderButton), 12000,"immersive Reader  button is not visible");
    immersiveReaderButton.click();
    browser.switchTo().defaultContent();
    browser.sleep(12000);
 });
 it('should click play button on Immersive reader',function(){
    //browser.switchTo().defaultContent();
    var EC = protractor.ExpectedConditions;
    browser.sleep(12000);
    //browser.switchTo().frame(0);
    // browser.sleep(4000);
    // browser.switchTo().defaultContent();
    // var iframes = element(by.tagName("iframe"))[0].title;

    // console.log(iframes);
    //console.log(iframes[1].getAttribute("id"));

    //browser.switchTo().frame(element(by.id('2ed8463c-2732-4bbb-af1c-846b2a292239')).getWebElement());
    //browser.switchTo().frame(element(by.id('immersive-reader')).getWebElement());
    // browser.switchTo().frame(1);
    // var playButton = element(by.id('readerControlsBtn'));
    // //browser.wait(EC.visibilityOf(playButton), 12000);
    // playButton.click();
    var EC = protractor.ExpectedConditions;
    // Waits for an alert pops up.
    browser.wait(EC.alertIsPresent(), 5000);
    
   var title = element(by.id('appReaderTitle'));
   console.log(title.textContent)
 });
});