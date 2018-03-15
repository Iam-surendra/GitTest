var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    directConnect:true,
    framework:'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    multiCapabilities: [{
      browserName: 'chrome'
    }],
    onPrepare: function() {
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: 'beautifulreporter/screenshots'
     }).getJasmine2Reporter());
      browser.driver.manage().window().maximize();
    },
    jasmineNodeOpts: {
      defaultTimeoutInterval: 900000
    }
  };