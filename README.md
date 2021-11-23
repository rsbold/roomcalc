# Room Calculator app - coding challenge for Borwell.
Written by Rob Bold 23/11/2021.
Visual Studio Code, React, React-Bootstrap.

## To Run
Clone the git repository.
Run
```
npm install
npm start
```
## Description
The application consists of a single component, RoomCalculator.  This component doesn't take
any properties.  It maintains state to represent the user-entered width, height and length 
of the room, the calculated values for floor area, total wall area, room volume, and a 
message to indicate if the user has entered non-numeric input.

The onChange events of the width, length and height controls are used to calculate new
values whenever a value is changed.  We then use setState() to update the display of the 
calculated values.

React-Bootstrap was used for layout and styling.

## Assumptions
1. The room is a cuboid with no windows or doors.
2. When calculating the paint area, we're not including the ceiling.

## Possible Future refinements
1. ~~Display calculated values to fixed number of decimal places.~~
2. ~~Refactor calculations to reduce repeated/similar code.~~
3. ~~Styling status message, e.g. alert red when non-numeric values entered.~~

This could have been written as multiple components:
1. An input component to gather user input for length, height and width
2. A display component to display the calculated areas and volume (accepting values via props)
3. A top level component to tie the two together, with state lifted up to this "host" component.