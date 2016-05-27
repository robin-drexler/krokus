const krokus = require('../dist/js/krokus.js').default;

module.exports = {
  'test krokus format number': function(beforeExit, assert) {
    const formatPattern = {
      pattern: '#,##0.00',
      decimal_sep: ',',
      group_sep: '.',
    };

    assert.equal(krokus.formatNumber(10000, formatPattern), '10.000,00');
    assert.equal(krokus.formatNumber(200000000, formatPattern), '200.000.000,00');
    assert.equal(krokus.formatNumber(432.55, formatPattern), '432,55');
  },
  'test krokus format currency': function(beforeExit, assert) {
    const formatCurrencyPattern = {
      pattern: '#,##0.00 ¤',
      decimal_sep: ',',
      group_sep: '.',
      symbol: '€',
    };

    assert.equal(krokus.formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
  },
  'test krokus format currency for USD': function(beforeExit, assert) {
    const formatCurrencyPatternForUSD = {
      pattern: '¤#,##0.00',
      decimal_sep: '.',
      group_sep: ',',
      symbol: '$',
    };

    assert.equal(krokus.formatCurrency(10000000, formatCurrencyPatternForUSD), '$10,000,000.00');
  },
  'test krokus format currency for negative and positive numbers': function(beforeExit, assert) {
    const formatCurrencyPattern = {
      pattern: '#,##0.00 ¤',
      decimal_sep: ',',
      group_sep: '.',
      symbol: '€',
    };

    assert.equal(krokus.formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
    assert.equal(krokus.formatCurrency(-10000, formatCurrencyPattern), '-10.000,00 €');
  },
  'test krokus format not currency': function(beforeExit, assert) {
    const wrongFormatCurrencyPattern = {
      pattern: '#,##0.00 ¤ l',
      decimal_sep: ',',
      group_sep: '.',
      symbol: '€',
    };

    try {
      const notDefined = krokus.formatCurrency(10000, wrongFormatCurrencyPattern);
      assert.equal(notDefined, 'This must not happen');
    } catch(e) {
      assert.equal(e, 'Given format is wrong');
    }
  }
};