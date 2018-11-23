'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var INNER_GAP_X = 20;
var INNER_GAP_Y = 20;
var TEXT_HEIGHT = 10;
var GISTOGRAM_INNER_GAP = 20;
var GISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var BETWEEN_BAR_GAP = 50;
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + INNER_GAP_X, CLOUD_Y + INNER_GAP_Y);
  ctx.fillText('Список результатов:', CLOUD_X + INNER_GAP_X, CLOUD_Y + INNER_GAP_Y + GAP + TEXT_HEIGHT);

  var getMaxElement = function () {
    var maxElement = times[0];

    for (var i = 1; i < times.length; i++) {
      if (times[i] > maxElement) {
        maxElement = times[i];
      }
    }

    return maxElement;
  };

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + INNER_GAP_X + GISTOGRAM_INNER_GAP + (BAR_WIDTH + BETWEEN_BAR_GAP) * i, CLOUD_HEIGHT - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
    }

    ctx.fillRect(CLOUD_X + INNER_GAP_X + GISTOGRAM_INNER_GAP + (BAR_WIDTH + BETWEEN_BAR_GAP) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT - (GISTOGRAM_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (GISTOGRAM_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px PT Mono';
    ctx.fillText(Math.round(times[i]), CLOUD_X + INNER_GAP_X + GISTOGRAM_INNER_GAP + (BAR_WIDTH + BETWEEN_BAR_GAP) * i, CLOUD_HEIGHT - GAP - GAP * 2 - TEXT_HEIGHT - (GISTOGRAM_HEIGHT * times[i]) / maxTime);
  }
};
