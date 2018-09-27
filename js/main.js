'use strict';

console.log('Empire Millennium chat blocker main.js opened');

// init
document.onload = function() {
  chrome.storage.sync.get(['ignoreText', 'completelyHide'], function(result) {
    if (!result) {
      chrome.storage.sync.set({'ignoreText': '', 'completelyHide': false}, function() {
        console.log('Empire Millennium chat blocker main.js: storage initialized.');
      });
    }
    else {
      document.getElementByID("ignoreText").value = result.ignoreText;
      document.getElementByID("completelyHide").checked = result.completelyHide;
    }
  });
};

function save() {
  chrome.storage.sync.set({'ignoreText': document.getElementByID("ignoreText").value,
                           'completelyHide': document.getElementByID("completelyHide").checked},
                           function() {
      console.log('Empire Millennium chat blocker main.js: values saved.');
  });
}

function clear()
{
  document.getElementByID("ignoreText").value = '';
  document.getElementByID("completelyHide").checked = false;
  this.save()
}
