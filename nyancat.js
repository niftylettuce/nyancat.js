#!/usr/bin/env node

var colors = require('colors')
    //play = require('play').Play(),
process.stdin.resume()

var self = this;

var width = process.stdout.columns
  , height = process.stdout.rows
  , flag = "`·.,¸,.·*¯"
    // current cat is from http://asciimator.net/asciimation/9257
    // modified, added top ears, UU legs
  , cat = [
       '  ,---/V\\',
        '~|__(o.o)',
        ' U U U U ',
        '  UU  UU ',
      ]
  , flagLength = flag.length
  , catLength = cat[0].length
  , numFlags = Math.floor(width / (flagLength))
  , position = 0
  , nyanposition = 0
  , modnyan = width % flagLength
  , meow = 0
  , step = 0
  , color = -1; // 0 = red, 1 = yellow, 3 = green, 4 = cyan, 5 = blue, 6 = magenta)

// Key stuff
var nyanTerval = null,
    paused = false,
    music = false,
    speed = 100;

var niftylettuce = "by niftylettuce | github.com/niftylettuce/nyancat.js | @niftylettuce";
var niftylettuceSpaces = new Array(Math.floor((width - niftylettuce.length)/ 2)).join(" ");
var nyancatAsciiLength = "                                   _      _   ";
var nyancatAsciiSpaces = new Array(Math.floor((width - nyancatAsciiLength.length)/ 2)).join(" ");
var nyancatAscii = nyancatAsciiSpaces + "                                   _      _   \n" +
                   nyancatAsciiSpaces + " _ __  _   _  __ _ _ __   ___ __ _| |_   (_)___\n" +
                   nyancatAsciiSpaces + "| '_ \\| | | |/ _` | '_ \\ / __/ _` | __|  | / __|\n" +
                   nyancatAsciiSpaces + "| | | | |_| | (_| | | | | (_| (_| | |_ _ | \\__ \\\n" +
                   nyancatAsciiSpaces + "|_| |_|\\__, |\\__,_|_| |_|\\___\\__,_|\\__(_)/ |___/\n" +
                   nyancatAsciiSpaces + "       |___/                           |__/   ";

function nyanxit() {
  if (nyanTerval) clearInterval(nyanTerval);
    console.error("\n\n" + nyancatAscii.rainbow);
    console.error("\n\n"+ niftylettuceSpaces + niftylettuce+"\n\n");
    process.exit();
}

// User Control Stuff
process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8')
process.stdin.on('data', function(key) {
  if (key === 'c')
    nyanxit();
  else if (key === 'q' || key === 'escape')
    nyanxit();
  //louder
  else if (key === 's') {
    speed += 5;
    if(nyanTerval){
      clearInterval(nyanTerval);
      nyanTerval = setInterval(magic, speed);
    }
  }
  else if (key === 'f') {
    if(speed > 10) {
        speed -= 5;
    }
    if(nyanTerval){
      clearInterval(nyanTerval);
      nyanTerval = null;
      nyanTerval = setInterval(magic, speed);
    }
  }
  else if (key === 'p') {
    paused = paused ? false : true;
    if (paused) {
      clearInterval(nyanTerval);
      nyanTerval = null;
    }
    else {
      nyanTerval = setInterval(magic, speed);
    }
  }
  else {
    nyanxit();
    //console.log(arguments);
  }
});


//////////////////////////////////////////////////Begin Nyan
// replace nyan with the nyancat at pos
function tasteTheNyan(color, nyan, pos) {
  // get the nyancat
  var catColor = 'white';
  var nyancat;
    // dirty
    switch(meow) {
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
        break;
      default:
        nyancat = cat[0]; // .grey looks more like cat but its too hard to see
        break;
  }
  //replace the nyan
  if (pos < nyancat.length) {
  // if we are flying into the screen nyan
    console.error(nyancat.substr(nyancat.length-pos)[catColor] + nyan.substr(pos+0, width)[color]);
  } else
  if (pos > width) {
  // if we are flying out of the screen nyan
    console.error(nyan.substr(0,pos-nyancat.length)[color] + nyancat.substr(0, nyancat.length - (pos - width))[catColor]);
  }
  else {
  // somewhere in the middle nyan
    console.error(nyan.substr(0,pos-nyancat.length)[color] + nyancat[catColor] + nyan.substr(pos)[color]);
  }
  meow = (meow + 1) % 3;
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

process.on('SIGINT', nyanxit);

// thanks to ctide for making this function into a magical, auto-looping function!
function magic() {
  if (paused) {
    return;
  }
  var nyannyan,nyanPrint;
  var nyancat = '';
  //for the entire width
  // +1 because, position may be near the end
  // +1 because width > numberFlag*flagLen
  for(var w=0; w<numFlags+2; w++) {
    nyancat += flag;
  }

  nyancat = nyancat.substr(position,width);
  position = (position + flagLength - 1) % flagLength;

  // draw it
  nyannyan = tasteTheRainbow();
  tasteTheNyan(nyannyan, nyancat,nyanposition);
  nyanposition = nyanposition > width + catLength*2 ? nyanposition = 0 : nyanposition+1;
}

nyanTerval = setInterval(magic, speed);

