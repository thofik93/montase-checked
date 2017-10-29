/* 
  MONTASE CHECK COMPONENT 
*/
if (typeof jQuery === 'undefined') {
  throw new Error('Montase checked\'s Plugin requires jQuery')
}

(function($){
  'use strict'

  var checkbox = '[data-ui="montasecheck"]'
  var MontaseCheck = function (el) {
    $(el).on('click', checkbox, this.toggleChecked)
  }

  MontaseCheck.VERSION = '0.0.1[BETA VERSION]'

  MontaseCheck.AUTHOR = 'THOFIK WIRANATA - thofikwiranata15@gmail.com'

  MontaseCheck.prototype.toggleChecked = function (e) {
    e.stopPropagation();
    e.preventDefault();

    MontaseCheck.prototype.isChecked(this)

  }

  MontaseCheck.prototype.isChecked = function (el) {
    var $el = $(el)
    var $input = $el.find('input');
    var inputType = $input.attr('type') 

    switch(inputType) {
      case 'checkbox': 
        if($el.is('.is-active')) {
          $el.removeClass('is-active')
          $input.prop('checked', false)
        } else {
          $el.addClass('is-active')
          $input.prop('checked', true)
        }
      break;

      case 'radio':
        var inputName = $input.attr('name')
        var $form = $input.closest('form')

        $form
          .find('input[name="' + inputName + '"]')
          .parent().removeClass('is-active')

        if($el.is('.is-active')) {
          $input.prop('checked', false)
        } else {
          $el.addClass('is-active')
          $input.prop('checked', true)
        }
      break; 
    }
    
  }

  MontaseCheck.prototype.isState = function(checkbox) {
    var $containerCheckbox = $(checkbox)
    var $checkbox = $containerCheckbox.find('input')

    if($checkbox.prop('disabled')) {
      $(checkbox).off('click.zzz.checkbox.data-api')
      $containerCheckbox.addClass('is-disabled')
    }

    if($checkbox.prop('checked')) {
      $containerCheckbox.addClass('is-active')
      $checkbox.prop('checked', true)
    }

    return 
  }


  MontaseCheck.prototype.buildDOM = function (checkbox) {
    var $span = $('<span></span>')
    MontaseCheck.prototype.isState(checkbox)
    $(checkbox).append($span)
  }

  // CHECKBOX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('ui.checkbox')

      if (!data) $this.data('ui.checkbox', (data = new MontaseCheck(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.montasecheck             = Plugin
  $.fn.montasecheck.Constructor   = MontaseCheck

  // CHECKBOX DATA-API
  // ==============
  $('[data-ui="montasecheck"]').each(function () {
    $(this).on('click.ui.checkbox.data-api', MontaseCheck.prototype.toggleChecked)
  })
  

  $(window).on('load', function () {
      $('[data-ui="montasecheck"]').each(function () {
        var $checkbox = $(this)
        MontaseCheck.prototype.buildDOM(this)
      })
    })

})(jQuery);