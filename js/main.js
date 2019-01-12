'use strict';
var _DEBUG;
var _DataStore = { lang: "en",
                   bookmarks: [{"name": "Center Green", x:384, y:384}] }; /* contents of {name: "display name", x: 0, y: 0} */
var sDefaults = {
    "en": { "flag": "🇺🇸",
            "flagHelpText": "US English",
            "btnAdd" : "💾 Add Bookmark",
            "btnAddHelpText" : "💾 Enter desired x and y coordinates and click here to save",
            "deleteIconHelpText": "Delete This List",
            "GoToHelpText": "Go to Bookmark",
            "txtBMNameHelpText": "Enter a bookmark name",
            "txtCoordXHelpText": "The X Coordinate",
            "txtCoordYHelpText": "The Y Coordinate"
          }
}; /* sDefaults :: End String Definitions */

/* init */
document.addEventListener("DOMContentLoaded", function() {
  setDebug(false);
  LOG('ChromeExt:main.js init()');
  
  // Set Language dependent Labels:


  // Add Page Events.
  document.getElementById('btnAdd').addEventListener('click', addBookmark);
  document.getElementById('btnTest').addEventListener('click', (x, y) =>{ x=640;y=640;moveToLocation(x,y);});

  displayBookmarks();
});

function moveToLocation(bmIdx) {
  // setStatus('Bookmark Event: ' + bmName);
  // setStatus('Bookmark Event: ' + (bmIdx || 0));
  if (!bmIdx) { return false; }
  var bmObj = _DataStore.bookmarks[bmIdx] || null;
  setStatus('Bookmark Event: ' + JSON.stringify(bmObj));
  if (!bmObj) { setStatus('Bookmark not found'); return null; }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {"x":bmObj.x,"y":bmObj.y}, function(response) {
      setStatus(response);
      console.log(Date().toString() + 'TestBtn: response=' + response||'null');
    });
  });
}

function addBookmark() {
  setStatus('Adding Bookmark');
}

function deleteBookmark(bookmakr_name) {
  setStatus('Delete Bookmark ' + bookmakr_name);
}

/* Display the list of screens on the left column. */
function displayBookmarks(jsonData) {
  jsonData = jsonData || _DataStore;
  var divBMList = document.getElementById('divBookmarkList');
  divBMList.innerHTML = ''; /* Clear current Items: */
  if (!jsonData.bookmarks) { setStatus('No Bookmark Data'); return false; }

  for (var i = 0; i < jsonData.bookmarks.length; i++) {
    var divBMRow = cdefs('<div class="bookmarkRow"></div>');
    divBMList.appendChild(divBMRow);
    // divScreens.appendChild(divScrRow);
    var divDel = cdefs('<div class="del"> ❌ </div>'); /* ❌ ❎ */
    divDel.setAttribute('title', gStr('deleteIconHelpText') + ': ' + jsonData.bookmarks[i].name);
    divDel.setAttribute('bmData', i);
    divDel.addEventListener('click', (e)=>{deleteBookmark(e.target.getAttribute('bmData'))});
    divBMRow.appendChild(divDel);

    var divBMName= cdefs('<div class="bookmarkName"></div>');
    divBMName.setAttribute('bmData', i);
    divBMName.innerText = jsonData.bookmarks[i].name + ' ('+ jsonData.bookmarks[i].x +', '+ jsonData.bookmarks[i].x +')'; /* auto html encodes */
    divBMName.setAttribute('title', gStr('GoToHelpText') + ': ' + divBMName.innerText);
    divBMName.addEventListener('click', (e)=>{moveToLocation(e.target.getAttribute('bmData'))});
    divBMRow.appendChild(divBMName);
  }
}

/* Begin JSON List management ************************************************/

/* End JSON List management **************************************************/

/* Begin Data Storage ********************************************************/
function storeJson(oJson) {
  if (oJson == null)
    chrome.storage.sync.remove(['Paratus'], ()=>{});
  else
    chrome.storage.sync.set({"Paratus": oJson}, function(){
      LOG('Value is set to ' + JSON.stringify(oJson));
    });
}

function retrieveJson(fcallBack) {
  chrome.storage.sync.get(['Paratus'], (result)=>{
    /*LOG('Retrieved JSON string = ' + JSON.stringify(result.ChromeTabs));*/
    storedTabs = result.ChromeTabs;
    if (fcallBack)
      fcallBack(storedTabs);
  });
}
/* End Data Storage **********************************************************/

/*****************************************************************************
 * Begin: Functions to Set Labels based on Language Settings.                *
 *****************************************************************************/
/* returns the first two characters of the localization settings.  
 * e.g.: en-US returns en */
function getLang() {
  return navigator.languages[0].substring(0,2) || 'en';
}
/* get Localized String.
 * sKey is the json key name defined in sDefaults global var.
 * if an error occured, sDefaultVal is returned.
 * if defaultVal is not present, then sKey is returned. */
function gStr(sKey, defaultVal){
  var lang = sDefaults[getLang()] || sDefaults.en;
  var val = lang[sKey] || defaultVal || '';
  if (val == '') val = lang['en'] || defaultVal || sKey; /* still nothing, then try 'en' */
  return val;
}
/*****************************************************************************
 * End: Functions to Set Labels based on Language Settings.                  *
 *****************************************************************************/


/*****************************************************************************
 * Begin: Logging Functions                                                  *
 *****************************************************************************/
function setDebug(isDebug)
{
  _DEBUG = isDebug;
  document.getElementById('divDEBUG').style.display = ((isDebug) ? "block" : "none");
}
function getDebug()
{
  return _DEBUG;
}

function cdefs(s){
  var d = document.createElement('div');d.innerHTML=s.trim();return d.firstChild;
}

var _statusTimer;
function setStatus(str) {
  LOG('statusmsg: ' + str);
  _statusTimer = (clearTimeout(_statusTimer) || null);
  var newmsg = cdefs('<div class="statusMsg"></div>');
  newmsg.innerText = str;
  var o = document.getElementById('divStatus');
  o.insertBefore(newmsg, o.firstChild); /* tested: works even if no children */
  _statusTimer = setTimeout(()=>{
    while (o.firstChild) { o.removeChild(o.firstChild); }
    o.innerText = ''; 
    }, 5000);
}

function LOG(str) {
  console.log('[BCM]: ' + str);
  if (_DEBUG) {
    var lEntry = cdefs('<div class="log"></div>');
    lEntry.innerText = str;
    document.getElementById('divLOG').appendChild(lEntry);
  }
}
/*****************************************************************************
 * End: Logging Functions                                                    *
 *****************************************************************************/
