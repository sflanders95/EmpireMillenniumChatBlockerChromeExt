'use strict';

console.log('Empire Millennium chat blocker background.js has started.');

// init
chrome.storage.sync.get(['ignoreText', 'completelyHide'], function(result) {
  if (!result) {
    chrome.storage.sync.set({'ignoreText': '', 'completelyHide': false}, function() {
      console.log('Empire Millennium chat blocker background.js: storage initialized.');
    });
  }
});

// TODO: if domain is empiremillenniumwars.ggs-emw.com
// add the following background listener.

var timerID = null;
chrome.runtime.onInstalled.addListener(function() {
  timerID = setInterval(function() {
    chrome.storage.sync.get(['ignoreText', 'completelyHide'], function(result) {
      if (result.ignoreText.length > 0)
      {
        var cm = document.getElementsByClassName('chat__message');
        for (var i = 0; i < cm.length; i++)
        { 
          if (cm[i].innerHTML.toUpperCase().indexOf(result.ignoreText.toUpperCase()) > 0) 
          {
            cm[i].innerHTML = (result.completelyHide ? '' : result.ignoreText + ' msg hidden<br>');
          }
        }
      }
    })
  }, 1000);
});
