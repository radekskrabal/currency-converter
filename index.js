var apiKey = '888b9ccf3d084dc8aaa7543644aa1f6f',
    exchangeRates;

/* TODO: Rewrite to promises */

var getCurrencies = function() {
    $.getJSON('https://openexchangerates.org/api/currencies.json?app_id=' + apiKey, function (currencies) {
        // cache the select el
        var amountSelect = $('select[name=amountUnit]'),
            targetSelect = $('select[name=targetUnit]'),
            options = [];

        // create options
        $.each(currencies, function (index, value) {
            if (index === 'USD') { return; }

            options.push('<option value="' + index + '">' + value + '</option>');
        });

        // append all currencies
        $.each(options, function (index, option) {
            amountSelect.append(option);
            targetSelect.append(option);
        });
    });
};

var getExchangeRates = function() {
    $.getJSON('https://openexchangerates.org/api/latest.json?app_id=' + apiKey, function (iExchangeRates) {
        exchangeRates = iExchangeRates.rates;
    });
};

var convert = function() {
    var amount = +$('input[name=amount]').val(),
        amountUnit = $('select[name=amountUnit]').val(),
        targetUnit = $('select[name=targetUnit]').val();

    return amount / exchangeRates[amountUnit] * exchangeRates[targetUnit];
};

var showResult = function() {
    var label = $('#result');

    label.text(convert());
    label.css('visibility', 'visible').hide().fadeIn('slow');
};

var hideResult = function() {
    $('#result').css('visibility', 'hidden');
};

var registerClickEventHandler = function() {
    $('button').click(showResult);
    $('input[name=amount]').change(hideResult);
    $('select[name=amountUnit]').change(hideResult);
    $('select[name=targetUnit]').change(hideResult);
};

$(document).ready(function() {
    // get data
    getCurrencies();
    getExchangeRates();

    // register events handlers
    registerClickEventHandler();
});