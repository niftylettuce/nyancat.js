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
        ' .---/V\ ',
        '~|__(^.^)',
        ' UU UU   ',
        ' U U U U ',
        '  UU  UU ',
        ' U U U U ',
      ],
    flagLength = flag.length,
    catLength = cat[0].length,
    numFlags = Math.floor(width / (flagLength)),
    position = 0,
    modulo = width % flagLength, 
    meow = 0,
    step = 0,
    color = 0; // 0 = red, 1 = yellow, 3 = green, 4 = cyan, 5 = blue, 6 = magenta)

// replace nyan with the nyancat as pos
function tasteTheNyan(nyan, pos) {
  var nyanLeft = nyan.substring(0,pos);
  if(last) {
    nyancat = nyancat.substring(0, nyancat.length - catLength);
    // dirty
    switch(meow) {
      case 0:
        nyancat += cat[0].white; // .grey looks more like cat but its too hard to see
        break;
      case 1:
        nyancat += cat[1].white;
        break;
      case 2:
        if(step === 3) {
          nyancat += cat[2]+step].white;
          step = 0;
        } else {
          nyancat += cat[2+step].white;
          step++;
        }
        break;
    }
    if(meow === 2) {
      meow = 0;
    } else {
      meow++;
    }
  }

}

// because unicorns and html5 just are so sweet together (http://paulirish.com)
function tasteTheRainbow(color, nyancat, pos) {

  switch(color) {
    case 0:
      console.error(nyancat.red);
      break;
    case 1:
      console.error(nyancat.yellow);
      break;
    case 2:
      console.error(nyancat.green);
      break;
    case 3:
      console.error(nyancat.cyan);
      break;
    case 4:
      console.error(nyancat.blue);
      break;
    case 5:
      console.error(nyancat.magenta);
      break;
    default:
      console.error(nyancat.rainbow);
      break;
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
  var nyancat = "";
  var last = false;
  //for the entire width
  for(w=0;w<numFlags;w++) {
    if(w === 0) {
      nyancat += flag.substring(position, flagLength);
    } else if (w === numFlags - 1) {
      nyancat += (flag + flag.substring(0, position));
      last = true;
    } else {
      nyancat += flag;
    }
  }
  // now the color
  if (color === 5) {
    color = 0;
  }
  else {
    color++;
  }
  // draw it
  tasteTheRainbow(color, nyancat, last);
  if(position === flagLength) {
      position = 1;
      } else {
        position++;
      }
  }
};

