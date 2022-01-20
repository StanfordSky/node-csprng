const DEFAULT_BITS = 128,
    DEFAULT_RADIX = 16,
    DIGITS = 'ACEGHKLMNRTWXYZ1234679'.split('');

const crypto = require('crypto'),
    Seq = require('sequin');

const rand = function (bits, radix) {
  bits = bits || DEFAULT_BITS;
  radix = radix || DEFAULT_RADIX;

  if (radix < 2 || radix > 36)
    throw new Error('radix argument must be between 2 and 36');

  let length = Math.ceil(bits * Math.log(2) / Math.log(radix)),
      entropy = crypto.randomBytes(bits),
      stream = new Seq(entropy),
      string = '';

  while (string.length < length)
    string += DIGITS[stream.generate(radix)];

  return string;
};

module.exports = rand;
