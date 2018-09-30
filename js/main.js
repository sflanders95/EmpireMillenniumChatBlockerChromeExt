'use strict';
var _DEBUG;

// init
document.addEventListener("DOMContentLoaded", function() {
  setDebug(false);
  LOG('main.js init()');

  document.getElementById('btnSave').addEventListener('click', saveData);
  document.getElementById('btnClear').addEventListener('click', clearData);

  loadData();
});

function saveData() {
  saveSetting(SettingsKeys.ignoreText, document.getElementById(SettingsKeys.ignoreText).value);
  saveSetting(SettingsKeys.completelyHide, document.getElementById(SettingsKeys.completelyHide).checked);
  loadData();
}

function loadData() {
  getSetting(SettingsKeys.ignoreText, (val) => {document.getElementById(SettingsKeys.ignoreText).value = val;});
  getSetting(SettingsKeys.completelyHide, (val) => {document.getElementById(SettingsKeys.completelyHide).checked = val;});
}

function clearData()
{
  document.getElementById("ignoreText").value = '';
  document.getElementById("completelyHide").checked = true;
  saveData();
}

function setDebug(isDebug)
{
  _DEBUG = isDebug;
  document.getElementById('DEBUG').style.display = ((isDebug) ? "block" : "none");
}
function getDebug()
{
  return _DEBUG;
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
        switch (lKey) {  /* Security Exception: cannot use: eval('result.'+SettingsKeys.ignoreText) */
          case SettingsKeys.ignoreText:
            fn(result.ignoreText); break;
          case SettingsKeys.completelyHide:
            fn(result.completelyHide); break;
          default:
            fn('');
        }
    }
    else {
      LOG('Data retrieval failed');
      fn('');
    }
  });
}

function LOG(str) {
  console.log('[BCM]: ' + str);
  if (_DEBUG) {
    var lEntry = document.createElement('div');
    lEntry.innerText = str;
    document.getElementById('LOG').appendChild(lEntry);
  }
}
/* END COMMON */