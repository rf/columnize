var wordwrap = require('wordwrap');
var terminal = require('node-terminal');
var _ = require('underscore');

function columnize (initialNum) {
  var columns;
  var size = process.stdout.getWindowSize();
  var width;
  var height = size[1] - 2;
  var wrap;

  function refresh () {
    _.each(columns, function (column) {
      _.each(_.last(column.data, height), function (item, index) {
        terminal
          .move(index, column.x)
          .clearCharacters(width - 1)
          .move(index, column.x)
          .write(item);
      });
    });
  }

  // output some data to a particular column
  function out (to, data) {

    function doOut (data) {
      data = String(data);
      if (to >= columns.length) throw new Error("that column doesn't exist");
      columns[to].data = columns[to].data.concat(wrap(data).split('\n'));
      refresh();
    }

    // partially apply if data isn't specified
    if (data != undefined) {
      doOut(data);
    } else {
      return doOut;
    }
  }

  // set the # of columns
  function set (num) {
    columns = [];
    width = Math.floor(size[0] / num);
    wrap = wordwrap(0, width - 5, {mode: 'hard'});

    var i;
    for (i = 0; i < num; i++) {
      columns.push({
        x: (i * width),
        data: []
      });
    }

    terminal.clear();
  }

  set(initialNum);

  out.set = set;
  return out;
}

module.exports = columnize;
