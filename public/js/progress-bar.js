var progressBar = document.getElementByClassName('progress-bar__bar');
window.scrollY > 25 ? progressBar.addClass('show') : progressBar.removeClass('show');

progressBar = function() {
  this.init();
}

progressBar.prototype.init = function() {

}

progressBar.prototype.manualScroll = function() {

}

progressBar.prototype.calculate = function() {
  return this._scrollBarMaxWidth = window.width(),
  this._contentHeight = .offset
}
