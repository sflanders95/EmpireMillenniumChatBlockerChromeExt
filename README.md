# EmpireMillenniumChatBlockerChromeExt
<img src="images/emwss.jpg" width="300" align="right">


A Chrome Extension for the game Empire Millennium wars to block specific user's chat messages.

**To Install:**<br>
Download all of the files retaining directory structure.  You can [download the files as a zip archive by clicking here](https://github.com/sflanders95/EmpireMillenniumChatBlockerChromeExt/archive/master.zip) or use git to make a local clone:
```sh
git clone https://github.com/sflanders95/EmpireMillenniumChatBlockerChromeExt
```

Open Chrome and navigate to: [chrome://extensions](chrome://extensions)

Turn Developer mode on: &nbsp; <img src="images/chromeDevModeOn.png" width="100" valign="middle">

Click the "Load Unpacked" button and select the directory where the manifest.json file is that you just downloaded.  *(if you downloaded the zip file, unzip it so chrome can get to the manifest.json file.)*

Now open the [Empire Millennium Wars Game](https://empiremillenniumwars.com/ 'a goodgamesstudios crappy product').

After installing the plugin, a new icon <img src="images/Actions-process-stop-icon16.png" valign="middle"> should have been created at the top right of the chrome window.  The Hover text over the icon will say "Block Chat Messages".  Click it to get the settings window.  Enter the text or username you wish to no longer see in the chat window and click the "Save" button. *note: the search text must be 4 characters or more for the app to work*

To remove the text, click the "Erase" button.  It's a good idea to use the Erase button when there is no need to filter chat. This is because clearing out the search string prevents this chrome extension from repeatedly searching the chat messages for the specified text.

To regain the hidden messages, use Erase function then reload the game (press F5).

# Versions:

Oct 18, 2018 - Changed to allow for new URL for the game.  empiremillenniumwars.ggs-emw.com has been chanegd to game.empiremillenniumwars.com.  Possibly to allow for cross iframe javascript now that the site utilizes one domain "empiremillenniumwars.com".

Oct 14, 2018 - Fixed isseu #2.  realized that removing chat array item in alliance or global also removed corresponding array item in the other chat win.  Changed so it only minimizes the offending text.

Sept 30, 2018 - Revised to allow for new iframe structure of the game.

Sept 26, 2018 - Epoch

---
[MIT Software License](https://raw.githubusercontent.com/sflanders95/EmpireMillenniumChatBlockerChromeExt/master/LICENSE) <br>
\<EOF\>
