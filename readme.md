# A drawing app

## Source
The source code is copied from [this page](https://www.codewithrandom.com/2022/12/16/drawing-app-javascript-drawing-app-using-html-css-javascript-codewithrandom/).

## Bug reports

### Bug #01 Drawing behaviour
There is a problem with drawing at the edge of the canvas.
#### how to reproduce
Start drawing in the middle of the canvas by pressing and holding the left mouse button. Move the mouse cursor over the edge of the canvas and release it there. When moving the mouse pointer back over the canvas, the drawing continues.
#### how to solve
Change the scope of the event listeners.

### Bug #02 Size changing
There is a problem with changing the size of the brush.
#### how to reproduce
Clicking on the plus or minus button does not increase or decrease the size of the brush.
#### how to solve
Check the code syntax in the event listeners.

## Tasks
1. Fix all bugs
2. Add a headline to the page.
3. When you hover the buttons at the lower bar, the mouse pointer should change to some other symbol to indicate that the buttons are clickable.
4. For drawing the mouse pointer should change to a pen or a brush.
5. Add another button that changes the color to a random new one.
6. Load a color scheme using the [Colormind API](http://colormind.io/api-access/) and generate color buttons for each color of the scheme instead of just one color button.
