# Copy Paste Grid Editors (7.11+)

Original package created by Søren Kottal (http://skttl.dk).
 
This is a fixed version that works with Umbraco 7.11+
 
Link to the original package: https://our.umbraco.com/packages/backoffice-extensions/copy-paste-grid-editors/

This package adds copy/paste functionality to the grid editor.
 
It works by hijacking the loading of the grid editor, and replaces it with a new one including the copy/paste functionality.
 
When you copy a grid element, the element is saved in the browsers local storage. You can then paste it wherever the grid element is allowed.
 
The package saves the last 10 copies, so you can have more elements copied.
 
This package is also made as a pull request for Umbraco, so hopefully one day, it will be obsolete :)
 
Thanks to Lars Erik Aabech for the initial pull request!