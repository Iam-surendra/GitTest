var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        $scope.searchSettings.passed = true;
        $scope.searchSettings.failed = true;
        $scope.searchSettings.pending = true;
        $scope.searchSettings.withLog = true;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should login success|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: unknown error: unhandled inspector error: {\"code\":-32000,\"message\":\"Cannot find context with specified id\"}\n  (Session info: chrome=63.0.3239.132)\n  (Driver info: chromedriver=2.35.528161 (5b82f2d2aae0ca24b877009200ced9065a772e73),platform=Windows NT 10.0.16299 x86_64)",
        "trace": "WebDriverError: unknown error: unhandled inspector error: {\"code\":-32000,\"message\":\"Cannot find context with specified id\"}\n  (Session info: chrome=63.0.3239.132)\n  (Driver info: chromedriver=2.35.528161 (5b82f2d2aae0ca24b877009200ced9065a772e73),platform=Windows NT 10.0.16299 x86_64)\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at Object.checkLegacyResponse (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\by.js:191:35\n    at call (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1068:28)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:907:19\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: WebDriver.call(function)\n    at Driver.call (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:901:23)\n    at Driver.findElementsInternal_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1068:17)\n    at Driver.findElements (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1043:19)\n    at Object.findElementsOverride (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\locators.js:200:31)\n    at ptor.waitForAngular.then (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:156:40)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: <anonymous>\n    at Timeout.pollCondition [as _onTimeout] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2195:19)\n    at ontimeout (timers.js:386:11)\n    at tryOnTimeout (timers.js:250:5)\n    at Timer.listOnTimeout (timers.js:214:5)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:29:15)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should login success\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:25:6)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://site-cdn.onenote.net/1691271551_Scripts/CommonDiagnostics.js 1 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1519807095499,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - Failed to decode downloaded font: https://www.onenote.com/segoeuil.woff",
                "timestamp": 1519807097953,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - OTS parsing error: invalid version tag",
                "timestamp": 1519807097954,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc 568 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807098091,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc 568 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807098092,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://site-cdn.onenote.net/1691271551_Scripts/home.js 0:6762 Uncaught TypeError: Cannot read property 'style' of null",
                "timestamp": 1519807099964,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/hrd 277 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807100335,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/hrd 277 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807100336,
                "type": ""
            }
        ],
        "screenShotFile": "00770029-00b1-004e-0095-0001001200fe.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should open onenote online|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: Wait timed out after 12007ms",
        "trace": "TimeoutError: Wait timed out after 12007ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:42:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should open onenote online\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:40:1)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "008200a6-00c7-0057-00f0-00eb00470026.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "Should open Immesive office launcher|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"WebApplicationFrame\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"WebApplicationFrame\"])\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at NoSuchElementError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:192:5)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.switchTo().frame([object Object])\n    at Driver.schedule (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.frame (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1824:25)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:50:24)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"Should open Immesive office launcher\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:48:1)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "001f0027-0083-00c0-0074-00cb003400d0.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should click play button on Immersive reader|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: Wait timed out after 5005ms",
        "trace": "TimeoutError: Wait timed out after 5005ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:80:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should click play button on Immersive reader\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:60:2)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "002a00b8-00cd-0098-003b-00ad002700e8.png",
        "timestamp": null,
        "duration": null
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};