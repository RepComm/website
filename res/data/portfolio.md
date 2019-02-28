# Portfolio | Showcase
## [ColorWheel](https://github.com/RepComm/colorwheel)
[Preview](https://repcomm.github.io/colorwheel/colorsync.html)
An arbitrary color gradient renderer for the web
Mainly useful as the engine of an advanced color picker.
How it works:
* Implementation supplies 1 or more colors (usually three; red, green, blue)
* Number of colors supplied dictates angle of separation between them
* Loops through a canvas and sets the pixels
  * Converts 1d pixel data index to 2d xy in canvas space
  * Calculates distance, and rotation about center of canvas
  * Calculates which 'slice' between two colors the pixel xy is
  * Linearly interpolates between the two colors based on relative rotation in the 'slice'
  * Applies falloff to black based on distance from center (blending occurs)
* Pixels are pushed to the canvas and rendered on screen
* Canvas auto-resizes on element bounds changed, maintains aspect
### What I learned
* The use case for arc tangent function
* How to use floor and ceil to round floating index to get two indexes
-- from a linear interpolation of an array dimension
* Use case for inline if statement value assignment
-- assigned = (condition) ? value1 : value2
* That lerping two colors does not actually *blend* them
-- ex: red and green having orange and yellow in between
* How to blend colors by dividing distance (accidental discovery)
## [Hylitejs](https://github.com/RepComm/hylitejs)
[Preview](https://repcomm.github.io/hylitejs/example.html)
An editable syntax highlighter for the web
For some reason I can't find one that lets you edit in real-time..
So I started making one (still in progress, but the concept is there).
How it works:
* A transparent text input is used to capture key events + content
* A lexer parses through the string and creates tokens
* Current implementation recalculates HTML markup display fecade
-- that displays colored elements with same text, and CSS classes control highlighting.
* Another rendering implementation will use novofont renderer (another project), because it'll be easier to implement, and use less memory.. (canvas renderer). Still working on novofont to get it up to speed first.
* Languages will be defined w/ single json files that specify basic syntax rules

### What I've learned:
* HTML text node selection sucks when elements are de-re-allocated when editing..
* The web needs a color-able textarea element
* It's easier to write a lexer than apply colors to text on screen and edit them too.
* Dodgy hacks are sometimes acceptable and honestly not hacky at all.
* It's easier to make a font/text renderer than use HTML for live color coding..

## [NovoFont](https://github.com/RepComm/novofont)
[Preview](https://repcomm.github.io/novofont/novofont)
A json/binary vector font format and canvas-powered text element
for the web.
How it works:
* Text is rendered based on string and independent format array
-- containing font info (basically css)
* Loads font from file and loops through chars of it's content and
-- renders them using font info and pre-compiled SVG paths
### What I've learned:
* That reinventing the wheel is kinda fun if the wheel is a tank tread
* Storing render instructions separate from content is better for editing.
## [animjs](https://github.com/RepComm/animjs)
A js value animation library (early working code)
So far linearly interpolates keyframes automatically.
How it works:
* Right now its just a fancy lerp and keyframe management code
* Implementation supplies some property and sets their values
-- at keyframe indexes
* Implementation asks for properties value at some index (even if that keyframe wasn't set)
