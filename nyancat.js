#!/usr/bin/env node
/*
nyancat.js

Copyright (c) 2011 Nick Baugh (niftylettuce)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var tty = require('tty');

var width = tty.getWindowSize(1)[1];
var height = tty.getWindowSize(1)[0];

var colors = require('colors'),
    flag = "`·.,¸,.·*¯",
    // current cat is from http://asciimator.net/asciimation/9257
    // modified, added top ears, UU legs
    cat = [
       '  ,---/V\\ ',
        '~|__(o.o)',
        ' U U U U ',
        '  UU  UU ',
      ],
    flagLength = flag.length,
    catLength = cat[0].length,
    numFlags = Math.floor(width / (flagLength)),
    position = 0,
    nyanposition = 0,
    modnyan = width % flagLength, 
    meow = 0,
    step = 0,
    color = -1; // 0 = red, 1 = yellow, 3 = green, 4 = cyan, 5 = blue, 6 = magenta)

var nyanTerval = null;

// replace nyan with the nyancat at pos
function tasteTheNyan(color, nyan, pos) {
  // get the nyancat
  var catColor = 'white';
  var nyancat;
    // dirty
    switch(meow) {
      case 0:
        nyancat = cat[0]; // .grey looks more like cat but its too hard to see
        break;
      case 1:
        nyancat = cat[1];
        break;
      case 2:
        if(step === 1) {
          nyancat = cat[2+step];
          step = 0;
        } else {
          nyancat = cat[2+step];
          step++;
        }
        meow = -1;
        break;
      default:
        nyancat = cat[0];
        meow = -1;
        break;
  }
  meow++;

  //replace the nyan
  if (pos < catLength) {
  // if we are flying into the screen nyan
    console.error(nyancat.substr(catLength-pos)[catColor] + nyan.substr(pos+1, width)[color]);
  } else 
  if (pos > width) {
  // if we are flying out of the screen nyan
    console.error(nyan.substr(0,pos-catLength)[color] + nyancat.substr(0, catLength - (pos - width))[catColor]);
  } 
  else {
  // somewhere in the middle nyan
    console.error(nyan.substr(0,pos-catLength)[color] + nyancat[catColor] + nyan.substr(pos)[color]);
  }
}

// because unicorns and html5 just are so sweet together (http://paulirish.com)
function tasteTheRainbow() {
  color++;
  switch(color) {
    case 0:
      return 'red';
    case 1:
      return 'yellow';
    case 2:
      return 'green';
    case 3:
      return 'cyan';
    case 4:
      return 'blue';
    case 5:
      color = -1;
      return 'magenta';
    default:
      color = -1;
      return 'rainbow';
  }
}

var niftylettuce = "by niftylettuce | github.com/niftylettuce/nyancat.js | @niftylettuce";
    niftylettuceSpaces = new Array(Math.floor((width - niftylettuce.length)/ 2)).join(" "),
    nyancatAsciiLength = "                                   _      _   ",
    nyancatAsciiSpaces = new Array(Math.floor((width - nyancatAsciiLength.length)/ 2)).join(" "),
    nyancatAscii = nyancatAsciiSpaces + "                                   _      _   \n" +
                   nyancatAsciiSpaces + " _ __  _   _  __ _ _ __   ___ __ _| |_   (_)___\n" +
                   nyancatAsciiSpaces + "| '_ \\| | | |/ _` | '_ \\ / __/ _` | __|  | / __|\n" +
                   nyancatAsciiSpaces + "| | | | |_| | (_| | | | | (_| (_| | |_ _ | \\__ \\\n" +
                   nyancatAsciiSpaces + "|_| |_|\\__, |\\__,_|_| |_|\\___\\__,_|\\__(_)/ |___/\n" +
                   nyancatAsciiSpaces + "       |___/                           |__/   ";

process.on('SIGINT', function() {
    console.error("\n\n" + nyancatAscii.rainbow);
    console.error("\n\n"+ niftylettuceSpaces + niftylettuce+"\n\n");
    process.exit();
});

// thanks to ctide for making this function into a magical, auto-looping function!
function magic() {
  var nyannyan,nyanPrint;
  var nyancat = '';
  //for the entire width
  // +1 because, position may be near the end
  // +1 because width > numberFlag*flagLen
  for(w=0;w<numFlags+2;w++) {
    nyancat += flag;
  }
  nyancat = nyancat.substr(position,width);
  position = position + modnyan;
  position = position >= flagLength ? position - flagLength : position;

  // draw it
  nyannyan = tasteTheRainbow();
  tasteTheNyan(nyannyan, nyancat,nyanposition);
  nyanposition = nyanposition > width + catLength*2 ? nyanposition = 0 : nyanposition+1;
}

nyanTerval = setInterval(magic, 90);

