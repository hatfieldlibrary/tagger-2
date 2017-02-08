## Dialog Directive and Controllers

The service defined in `show-dialog.js` provides a method for invoking `$mdDialog.show()` with options. 

The `$mdDialog` directive requires a controller.  Controllers are provided via the other services defined in 
this directory. To use a dialog within a component, inject the necessary services and combine using composition
to create the component's dialog object.
