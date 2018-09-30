'use strict';

console.log('Empire Millennium chat blocker background.js has started.');
var _DEBUG, _ChatClass;

// if (chrome)
// chrome.runtime.onInstalled.addListener(function() {
//   init();
// });
// else
window.onload = () => { init(); }

function init() {
  _DEBUG = false;
  _ChatClass = 'chat__message';

  // getSetting(SettingsKeys.ignoreText, (val) => { _ignoreText = val; } ); 
  // getSetting(SettingsKeys.completelyHide, (val) => { _completelyHide = val; } ); 

  // TODO: if domain is empiremillenniumwars.ggs-emw.com
  // add the following background listener.
  LOG('Background STARTED');
  doWork();
}



function doWork()
{
    var timerID = null;
    timerID = setInterval(function() {
      getSetting(SettingsKeys.ignoreText, function(val) { 
        LOG('Timer Event::_ignoreText = '+val+' '+new Date().getMilliseconds());
      } ); 
    }, 7000);
}

function getChatParentDiv() {
  var aryChat = document.getElementsByClassName(_ChatClass);
  return aryChat[0].parentNode.parentNode || 'error';
}


/* BEGIN COMMON */
var SettingsKeys = {ignoreText: 'ignoreText', completelyHide: 'completelyHide'};

function saveSetting(lKey, lVal)
{
  chrome.storage.local.set({[lKey]: lVal} ); //, function(){} );
}

/* Usage:
 *   getSetting('keyIdentifier', (val) => { do something with val; } ); 
 */
function getSetting(lKey, fn) 
{
  chrome.storage.local.get(lKey, (result) => {
    if (result) {
        LOG('getSetting('+lKey+'): '+ JSON.stringify(result) );
        LOG('getSetting('+lKey+'): '+ result.ignoreText );
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
      LOG('Data retrieval failed');
      fn('err2');
    }
  });
}

function LOG(str) {
  console.log('[BCM]: ' + str);
  if (_DEBUG) {
    if (document.getElementById('LOG'))
    {
        var lEntry = document.createElement('div');
        lEntry.innerText = str;
        document.getElementById('LOG').appendChild(lEntry);
    }
  }
}
/* END COMMON */
