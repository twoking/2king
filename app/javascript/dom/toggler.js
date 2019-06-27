const $panel = $('.panel')
const $toggler = $('.toggler')
const $filterNav = $('#bottom-nav-filter')
const $homeNav = $('#bottom-nav-home')

// maybe need refactoring

$toggler.on('click', function(e) {
  e.preventDefault();
  const $target = $('#' + this.dataset.target).addClass('active');
  $panel.not($target).removeClass('active');

  $filterNav.removeClass('active');
  $homeNav.addClass('active');
});

$homeNav.on('click', function(e) {
  $filterNav.addClass('active');
  $homeNav.removeClass('active');

  $panel.slice(1).removeClass('active');
  $panel.first().addClass('active');
});


