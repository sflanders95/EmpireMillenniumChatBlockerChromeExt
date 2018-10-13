'use strict';
console.log('ContentScript loading on '+window.host);
var SettingsKeys = {ignoreText: 'ignoreText', completelyHide: 'completelyHide'};
var _ChatClass = 'chat__message';
var sReplDiv = '<div style="font-size: 10px; color: #f66; background-color: #008;"> &nbsp; &nbsp; Content Removed</div>';

window.onload = () => {
  initVars();
  console.log('ContentScript Activated');
  console.log(getChatParentDiv());
  doWork();
}

function initVars()
{
   getSetting(SettingsKeys.ignoreText, function(val) {
      if (val == 'err') saveSetting (SettingsKeys.ignoreText, "");
   });
   getSetting(SettingsKeys.completelyHide, function(val) {
      if (val == 'err') saveSetting (SettingsKeys.ignoreText, false);
   });
}

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
      getSetting(SettingsKeys.ignoreText, function(txt) { 
        getSetting(SettingsKeys.completelyHide, (hide) => { 
           console.log('Timer Event::_ignoreText = '+txt+' | completelyHide = '+hide+'  '+new Date().getMilliseconds());
           removeItems(txt, hide);
         } );
      } ); 
    }, 7000);
}

function removeItems(ignoreText, hide)
{
  if ((ignoreText) && (ignoreText.length > 3))
  {
    var parent = getChatParentDiv();
    for (var i = 0; i < parent.children.length; i++)
    {
        if (parent.children[i].outerHTML.toUpperCase().indexOf(ignoreText.toUpperCase()) > 0)
        {
            if (hide) {
              parent.removeChild(parent.children[i]);
            } else {
              parent.children[i].outerHTML = sReplDiv;
            }
            removeItems(ignoreText, hide);
            parent.scrollIntoView(false);
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
      fn('err');
    }
  });
}

function saveSetting(lKey, lVal)
{
  chrome.storage.local.set({[lKey]: lVal} ); //, function(){} );
}