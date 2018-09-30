'use strict';
console.log('ContentScript loading on '+window.host);
var SettingsKeys = {ignoreText: 'ignoreText', completelyHide: 'completelyHide'};
var _ChatClass = 'chat__message';

window.onload = () => {
  console.log('ContentScript Activated');
  console.log(getChatParentDiv());
  doWork();
}

// chrome.runtime.onMessage.addListener(
//     function(message, callback) {
//       if (message == “runContentScript”) {
//         chrome.tabs.executeScript({
//           file: 'js/contentScript.js'
//         });
//       }
//    });

function getChatParentDiv() {
  var aryChat = document.getElementsByClassName('chat__message');
  var returnVal = 'not changed';
  if (aryChat[0])
      returnVal = aryChat[0].parentNode.parentNode;
  else
      returnVal = 'err';
  return returnVal;
}

function doWork()
{
    var timerID = null;
    timerID = setInterval(function() {
      getSetting(SettingsKeys.ignoreText, function(val) { 
        console.log('Timer Event::_ignoreText = '+val+' '+new Date().getMilliseconds());
        removeItems(val);
      } ); 
    }, 7000);
}

function removeItems(ignoreText)
{
  if ((ignoreText) && (ignoreText.length > 3))
  {
    var parent = getChatParentDiv();
    for (var i = 0; i < parent.children.length; i++)
    {
        if (parent.children[i].outerHTML.toUpperCase().indexOf(ignoreText.toUpperCase()) > 0)
        {
            parent.removeChild(parent.children[i]);
            removeItems(ignoreText);
            i = 300000; // reset counter for recursion exit as an item was just removed.
        }
    }
  }
}

/* Usage:
 *   getSetting('keyIdentifier', (val) => { do something with val; } ); 
 */
function getSetting(lKey, fn) 
{
  chrome.storage.local.get(lKey, (result) => {
    if (result) {
        //console.log('getSetting('+lKey+'): '+ JSON.stringify(result) );
        //console.log('getSetting('+lKey+'): '+ result.ignoreText );
        switch (lKey) {  /* Security Exception: cannot use: eval('result.'+SettingsKeys.ignoreText) */
          case SettingsKeys.ignoreText:
            fn(result.ignoreText); break;
          case SettingsKeys.completelyHide:
            fn(result.completelyHide); break;
          default:
            fn('err');
        }
    }
    else {
      console.log('Data retrieval failed');
      fn('err2');
    }
  });
}