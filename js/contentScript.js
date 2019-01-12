/* To install for chrome, right click on map and select "Inspect.
in the new screens, find the console.  Paste the contents of this file
and press enter.  You can then close the "Inspect" screens.  A new
Bookmark window will be in top left.  refresh browser to completely 
remove it.    */
/* *** Bookmarks, change gBM below to fit your needs (no comma after last item) *** */
/* var gBM = { "A Group": [757,578], 
            "B Group": [130,750], 
            "C Group": [560,755], 
            "D Group": [235,130], 
            "Lunch": [19,294],
            "PvP 01": [15,257],
            "PvP Deus 15s": [463,490],
            "PvP Xany hive": [278,514],
            "4 LTPers": [178,618],
            "PvP [RUR]": [655,672],
            "PvP [RUR]2": [643,680],
            "[D1*]XBromX": [270,265,"277M Level 19"],
            "Solo": [245,106],
            "NewLoc":[696,504],
            "OldSpot":[246,128]
};*/


function mv2(x, y) {
console.log(Date().toString() + ' Move Command Received: ('+x+','+y+')');
var www = document.getElementsByClassName("hud-world-map-bar__coordinates")[0];
//if (!document.getElementsByClassName("hud-world-map-bar__coordinates")[0]) {return 'Error: Map screen not found';}
if (!www) {return 'Error: Map screen not found';}
www = www.children[0];
www.click();
setTimeout(()=> {
  var base=document.getElementsByClassName("screen-coordinates-search__coordinates")[0];
  if (!base) { return 'Error: base coordinate screen not found.'; }
  //console.log(base);
  valx=base.children[1].children[1].children[0].children[0].value;
  if (x>valx) {for (i=valx; i < x; i++) {
  base.children[1].children[1].children[1].children[0].click(); } }
  else { for (i=valx; i > x; i--) {
  base.children[1].children[1].children[1].children[1].click(); } }

  valy=base.children[2].children[1].children[0].children[0].value;
  if (y>valy) {for (i=valy; i < y; i++) {
  base.children[2].children[1].children[1].children[0].click(); } }
  else { for (i=valy; i > y; i--) {
  base.children[2].children[1].children[1].children[1].click(); } }
  setTimeout(()=>{
    document.getElementsByClassName("button flex-direction-row button--size-expand button--style-primary button--shape-rounded button--layout-column")[0].click();
    }, 200)}
  , 200);
return 'Success';
}

var aEMWContentScriptLoaded=true;
/* MAIN: */
if (window.self !== window.top) { /* Only if inside of iFrame */
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(Date().toString() + ' message: ' + (JSON.stringify(request) || 'null'));
      if (request.x) {
        sendResponse(mv2(request.x,request.y) || 'Unknown Error');
      }
    });
}

// log from background script.
console.log(Date().toString() + ' contentScript');
