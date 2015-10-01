/*! breakdetective v0.0.2-dev [29-06-2015] | (c) Rafael Pawlos (http://rafaelpawlos.com) | MIT license */

var breakdetective = (function () {

  var moduleObject = {
    init: function (container) {
      var self = this;
      self.container = container;
      self.firstChild = container.firstElementChild;
      
      container.className += ' breakdetective';

      if (self.firstChild) {
        self.lastChild = container.lastElementChild;
        self.elementsWidth = self.getElementsWidth(container.children);
        self.minWidth = parseInt(self.getCssValue(self.firstChild, 'min-width')) || self.elementsWidth.max;
        
        self.update();
        self.addListener(window, 'resize', self.update);
      }
    },
    
    update: function () {
      var self = this;
      
      self.checkIfbroken();
      self.updateClass();
      self.updateColumnsNumber();
    },
    
    checkIfbroken: function () {
      var self = this;

      self.broken = self.elementsWidth.all + 1 > self.container.offsetWidth;
    },
    
    updateClass: function () {
      var self = this;
      
      var hasClass = self.container.className.match('broken-line');
      if (self.broken && !hasClass) {
        self.container.className += ' broken-line';
      }
      else if (!self.broken && hasClass){
        self.rmClass(self.container, 'broken-line');
      }
    },

    updateColumnsNumber: function () {
      var self = this;

      var columns = 0;
      columns = Math.floor(self.container.offsetWidth / (self.minWidth + 1));
      if (parseInt(self.container.getAttribute('data-bditems')) !== columns) {
        self.container.setAttribute('data-bditems', columns);
      }
    },
    
    getElementsWidth: function (elements){
      var self = this;
      
      var widths = [];
      for(var i = 0; i < elements.length; i++) {
        widths[i] = self.getOuterWidth(elements[i]);
      }
      return {
        max: Math.max.apply(Math, widths),
        all: widths.reduce(function(prev, current){return prev + current;})
      };
    },
    
    getOuterWidth: function (element) {
      var self = this;

      var boxSizing = self.getCssValue(element, 'box-sizing');
      if (boxSizing !== 'border-box') {
        var paddingLeft = parseInt(self.getCssValue(element, 'padding-left'));
        var paddingRight = parseInt(self.getCssValue(element, 'padding-right'));
        var borderLeft = parseInt(self.getCssValue(element, 'border-left-width'));
        var borderRight = parseInt(self.getCssValue(element, 'border-right-width'));

        return element.offsetWidth + paddingLeft + paddingRight + borderLeft + borderRight;
      }
      else {
        return element.offsetWidth;
      }
    },
    
    getCssValue: function (element, prop) {
      var style = window.getComputedStyle(element);
      return style.getPropertyValue(prop);
    },
    
    addListener: function (element, event, listener) {
      var self = this;

      element.addEventListener(event, function (e) {
        return listener.call(self, e);
      }, false);
    },
    
    rmClass: function (e, c) {
      var cPattern = new RegExp('( |^)' + c + '($| )');
      e.className = e.className.replace(cPattern, '$2');
    }
  };

  return function (query) {
    if (typeof query === 'string') {
      var elements = document.querySelectorAll(query);
    } else {
      var elements = query;
    }

    for(var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (!el.breakdetective) {
        Object.create(moduleObject).init(el);
        el.breakdetective = true;
      } else {
        console.warn('Detected double initialization of breakdetective module on %o', el);
      }
    }

    return elements;
  };

})();
