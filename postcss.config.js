'use strict';

module.exports = ({ env }) => {
  function prodEval (options) {
    if (env === 'production') {
      return options || {};
    } else {
      return false;
    }
  }

  return {
    parser: false,
    plugins: {
      'cssnano': prodEval({ preset: ['default', { discardComments: { removeAll: true } }] }),
      'postcss-easings': prodEval({}),
      'postcss-easing-gradients': prodEval({
        alphaDecimals: 10,
        colorStops: 77
      }),
      'postcss-normalize': prodEval({}),
      'postcss-responsive-images': prodEval({}),
      'autoprefixer': prodEval({ grid: true }),
      'postcss-flexbugs-fixes': prodEval({ oldie: true }),
      'postcss-color-rgba-fallback': prodEval({ oldie: true }),
      'postcss-discard-comments': prodEval({ removeAll: true }),
      'postcss-discard-duplicates': prodEval({}),
      'postcss-discard-empty': prodEval({}),
      'rucksack-css': prodEval({
        reporter: true
      })
    }
  };
};
