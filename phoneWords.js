$(document).ready(function() {
  'use strict';

  var possibilities = [];

  var digitMap = {
    2: new Set(['a', 'b', 'c']),
    3: new Set(['d', 'e', 'f']),
    4: new Set(['g', 'h', 'i', 'I']),
    5: new Set(['j', 'k', 'l']),
    6: new Set(['m', 'n', 'o']),
    7: new Set(['p', 'q', 'r', 's']),
    8: new Set(['t', 'u', 'v']),
    9: new Set(['w', 'x', 'y', 'z']),
  };


  function startWith(num) {
    if (num.length === 0) {
      return [];
    }

    var words = dictionary;

    for (var i = 0; i < num.length; ++i) {
      words = words.filter(function(word) {
        return digitMap[num[i]].has(word[i]);
      });
    }
    return words;
  }


  $('#digits').bind('input', function() {
    var digits = $(this).val();
    var validDigits = digits.replace(/[^2-9]/g, '');
    if (digits !== validDigits) {
      $(this).val(validDigits);
    }

    possibilities = startWith(validDigits);
    var topWords = possibilities.slice(0, 30).map(function(word) {
      return $('<li>').text(word);
    });

    if (possibilities.length > 30) {
      $('#displayAll').removeClass('hidden');
    } else {
      $('#displayAll').addClass('hidden');
    }

    $('#words').empty().append(topWords);
  });

  $('#digits').focus();


  $('#displayAll').click(function(e) {
    e.preventDefault();
    $('#displayAll').addClass('hidden');
    var words = possibilities.map(function(word) {
      return $('<li>').text(word);
    });
    $('#words').empty().append(words);
  });
});
