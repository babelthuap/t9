$(document).ready(function() {
  'use strict';

  var NUM_TO_DISPLAY = 100;

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


  $('#dialpad').on('click', 'button', function() {
    console.log('pad');
    var num = $(this).find('strong').text();
    $('#digits').val( $('#digits').val() + num );
    updateResults();
  });


  var $digits = $('#digits');
  $digits.on('input', updateResults)
         .focus();


  function updateResults() {
    var digits = $digits.val();
    var validDigits = digits.replace(/[^2-9]/g, '');
    if (digits !== validDigits) {
      $digits.val(validDigits);
    }
    $digits.focus();

    possibilities = startWith(validDigits);
    var topWords = possibilities.slice(0, NUM_TO_DISPLAY).join(', ');

    if (possibilities.length > NUM_TO_DISPLAY) {
      topWords += ', ...';
      $('#displayAll').removeClass('hidden');
      $('#num').text(possibilities.length);
    } else {
      $('#displayAll').addClass('hidden');
    }

    $('#words').empty()
               .append(topWords);
  }


  $('#clear').click(function(e) {
    e.preventDefault();
    $digits.val('');
    updateResults();
  });


  $('#displayAll').click(function(e) {
    e.preventDefault();
    $('#displayAll').addClass('hidden');
    $('#words').empty()
               .append( possibilities.join(', ') );
  });
});
