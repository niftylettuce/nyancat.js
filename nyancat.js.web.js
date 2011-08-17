/*
nyancat.js.web.js

Copyright (c) 2011 Yu-Jie Lin (livibetter)

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
var tty;
var nyancat_js;
var _nyanTerval;

function require(module) {
  if (module == 'tty') {
    // Font VT323 @24px width=10px, height=26px
    tty = new _tty($(window).width(), $(window).height(), 10, 26);
    return tty;
    }
  }

function __stdin() {
    this._keypress = function(evt) {
      self.keypress_handler('wut?', {
          ctrl: evt.ctrlKey,
          name: String.fromCharCode(evt.charCode)
          });
      };
    this.on = function(_, func) {
      self.keypress_handler = func;
      };
    }
_stdin = new __stdin();

process = {
    exit: function() {},
    on: function() {},
    openStdin: function() {
      return _stdin;
      }
    }

exports = {
    mode: undefined
    }

function _tty(width, height, font_width, font_height) {
    self.windowSize = [Math.floor(height / font_height),
                       Math.floor(width / font_width)]; // lines, columns

    this.getWindowSize = function() {
      return self.windowSize;
      }

    this.setRawMode = function() {};
    }

function load_colors(nyancat_js) {
  $.ajax({
      url: 'colors.js',
      // Prevent Firefox from trying to parse text as HTML
      mimeType: 'text/javascript;',
      dataType: 'text',
      success: function(colors_js) {
        module = 'GET ME DA DAM SPAN!!!';
        eval(colors_js);
        exports.mode = 'browser';
        $(window).resize(load_nyancat_js).resize();
        $('html').keypress(_stdin._keypress);
        }
      });
  }

function load_nyancat_js() {
  if (nyancat_js) {
    if (_nyanTerval)
      clearInterval(_nyanTerval);
    eval(nyancat_js);
    _nyanTerval = nyanTerval;
    }
  }

$(function() {
  $.ajax({
      url: 'nyancat.js',
      // Prevent Firefox from trying to parse text as HTML
      mimeType: 'text/plain; charset=utf-8',
      dataType: 'text',
      success: function(data) {
        // Get rid of that hashbang line
        nyancat_js = data.replace(/.*/, '');
        load_colors();
        }
      });
  // Font VT323 @24px
  tty = new _tty($(window).width(), $(window).height(), 10, 26);
  console._error = console.error;
  console.error = function(nyan_line) {
    var nyancat = $('#nyancat');
    var nyans = nyancat.children();
    if (nyans.length > tty.getWindowSize()[0])
      nyans.slice(0, nyans.length - tty.getWindowSize()[0]).remove();
    if (nyan_line.indexOf('.js') != -1)
      nyan_line = nyan_line.replace(/(github.*\.js)/, '<a href="http://$&">$&</a>');
    $('<pre/>').append($('<span>' + nyan_line + '</span>')).appendTo(nyancat)
    }
  })
// vim:sts=2:sw=2:et:smarttab
