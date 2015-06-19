/*! breakdetective v0.0.1-dev [17-06-2015] | (c) Rafael Pawlos (http://rafaelpawlos.com) | MIT license */

var breakdetective = (function () {

  var moduleObject = {
    init: function (element) {
      var self = this;
      self.element = element;
      self.isTextContainer = self.isText(element.firstChild);

      self.element.className += ' breakdetective';

      if (!self.isTextContainer) {
        self.children = element.childNodes;
        var items = self.children.length;
        self.lastChild = self.isText(self.children[items-1]) ? self.children[items-2] : self.children[items-1];
        
        self.update();
        self.addListener(window, 'resize', self.update);
      }
    },
    
    update: function () {
      var self = this;
      
      self.checkIfbroken();
      self.updateClass();
      self.updateItemsNumber();
    },
    
    checkIfbroken: function () {
      var self = this;

      self.broken = (self.lastChild.offsetTop - self.children[0].offsetTop > 0);
    },
    
    updateClass: function () {
      var self = this;
      
      var hasClass = self.element.className.match('broken-line');
      if (self.broken && !hasClass) {
        self.element.className += ' broken-line';
      }
      else if (!self.broken && hasClass){
        self.removeClass(self.element, 'broken-line');
      }
    },

    updateItemsNumber: function () {
      var self = this;

      if (self.lastOffsetLeft !== self.lastChild.offsetLeft) {
        var counter = 0;
        var child = self.children[0];

        while (child !== null) {
          if (child.offsetTop === self.children[0].offsetTop) {
            counter++;
          } else {
            break;
          }
          child = child.nextElementSibling;
        }

        self.element.setAttribute('data-bdcolumns', counter);
        self.lastOffsetLeft = self.lastChild.offsetLeft;
      }
    },
    
    addListener: function (element, event, listener) {
      var self = this;

      element.addEventListener(event, function (e) {
        return listener.call(self, e);
      }, false);
    },
    
    removeClass: function(e, c) {
      e.className = e.className.replace(new RegExp(' ?' + c ), '');
    },
    
    isText:function(element){
      return element.nodeName === "#text";
    }
  };

  return function (query) {
    var elements = document.querySelectorAll(query);

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
