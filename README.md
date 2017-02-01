Layout Designer
===================
### Table of contents

[TOC]
## Brief ##
The Layout Designer was built as a part of Glitzio. You can use the Layout Designer to pretty much build a layout for anything. Currently the layouts are rectangles, because they are just serving as containers for content.
LD depends on 

 - bootstrap, 
 - jquery, and 
 - interact.js

The core parts of LD is in `<div id="glitz-container-1"> </div>` and `<div class="col-lg-3 sidebar"> </div>`. 
The div with the id `glitz-container-1` is the base container, the mother container, the container that hold containers. Don't mess with it.


creative.js
-------------

The magic happens here. 
According to the constraints of Glitzio, there can't be more than one widget in the main container.
The widgets are

 - playlist
 - rss
 - weather
 - clock

The variables that keep count of them are defined as `xyzCount`
Each widget has a dictionary that holds its properties. The dictionary is used to update the contents of the sidebar, and obviously to generate the XML and send. The format of the dictionary variables is `xyzProps`.


----------


Each widget's existence in the sidebar is montored by the variables that are in this format `xyzAdded`.


----------


An important flag is the `selected`variable. This holds the type (number) of the currently selected widget in the Designer.


----------
## Functions ##


----------
### `setupDesigner()` ###

On page ready, this function will determine if we are creating a new Layout or editing a previously created Layout.
We look at the path of the URL and use it to determine if we are editing or creating a new layout.
   So, assuming the URL to create a new layout is 'http://glitzio.com/new/' then the function will do nothing and you can start creating a layout.
    
But, if the action is to edit a layout, then let us assume that the URL will be 'http://glitzio.com/edit/layout_name/', then the if statement should match a URL pattern like that.
 It's your job to know the URL routing you will be using, and to ensure that an ID that you can use to request a previously created Layout's details can be gotten from the URL. We'll use the name of the layout from the URL to query the DB and get the XML of the layout to be edited.
Details to setup the designer can then be extracted from the response of the request and used to rebuild the Layout on the Designer.

### `updateColor(containerId)` ###
Updates the background color of the main glitz-container. `containerId` is always **1**. Remember, `glitz-container-1` ? Yea, that's the **1**

### `updateWidgetColor(containerId, containerN)` ###
Updates the background color of the widget containers.
The param `containerId` is the id associated with the `<div>` of the container (`glitz-xyz-1`). This is usually the current value of `selected`. `containerN` is the widget type. Each widget has an accompanying recognizing number. 

### ` updateProperties(containerN)` ###
Updates the properties of a widget.
The parameter, `containerN` is the widget type.

### `xremoveWidget(containerId, containerN)` ###
Removes a widget from the designer view.
The param `containerId` is the id associated with the `<div>` of the container (`glitz-xyz-1`). This is usually the current value of `selected`. `containerN` is the widget type.

### `deselectContainer(containerN)` ###
Deselects a widget and removes its properties from the sidebar.
The parameter, `containerN` is the widget type.

### `selectContainer(containerId, containerN)` ###
Selects a widget and adds its properties to the sidebar.

### `addPlaylist(containerId)` ###
Special function for widget of type Playlist alone. 
Adds a Playlist widget to the designer.

### `addWidget(containerId)` ###
Adds a widget to the designer.

### `validateAll()` ###
Validates all fields before generating XML. Every possible situation must be checked here. Every. Possible. Situation. 
These include checks for valid URLs, valid time (datatype=number) 

### `generateXML()` ###
This generates the XML that we will be saved.
Remember that previously created playlists were gotten via an AJAX call above (`selectContainer`). The properties of the final selected Playlist will then be used here for `PLAYLIST_XML`.

### `saveLayout()` ###
Saves the generated layout to the DB after performing all sanity checks.
POST `generatedXML` here via AJAX and notify user in appropriate way. Remember, you need to use the Layout_Name entered by the user as an identifying key to save the `generatedXML` to the DB because we will be using that to build the URL when a user is editing a layout.

Currently, this function opens a new tab with the XML as the content.

## `creative.css` ##
This is responsible for the batman look and feel of the designer. Also, the design and placement of containers were designed here. A lot of the ids for the HTML elements have their designs here. *Touch. At. Thy. Peril*.
