## Dialog Directive and Controllers

The `show-dialog.js` file contains the `$mdDialog` service used throughout Tagger. The dialog service's `showDialog`
function takes a controller as a parameter.  Controllers for different activities are
defined here as services that return the controller function.

Sample usage: 

```javascript
new ShowDialog.showDialog($event, message, CollectionDialog);
```
