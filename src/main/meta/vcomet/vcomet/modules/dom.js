vcomet.dom = vcomet.dom || {};

// vcomet custom selector function
// prototype $ and $1 should not conflict with other frameworks API 

HTMLElement.prototype.$ = function (query) {
  return query.indexOf("#", 0) === 0 ? this.querySelector(query) : this.querySelectorAll(query);
};

HTMLElement.prototype.$1 = function (query) {
  return this.querySelector(query);
};

HTMLElement.prototype.getEnclosingComponent = function () {

  var parentNode = this.parentNode;
  var nodeName, enclosingComponent;
  
  while (parentNode) {

    if (parentNode.vcomet) {

      enclosingComponent = parentNode;
      parentNode = undefined;
      
    } else {

      nodeName = parentNode.nodeName.toLowerCase();
      parentNode = nodeName == "body" ? undefined : parentNode.parentNode;

    }

  }

  return enclosingComponent;

};

// vcomet definitions will always be available
vcomet.$ = function (query) {
  return query.indexOf("#", 0) === 0 ? document.querySelector(query) : document.querySelectorAll(query);
};

vcomet.$1 = function (query) {
  return document.querySelector(query);
};

// window definitions will use any other framework $ and $1 if found
window.$ = window.$ || vcomet.$;
window.$1 = window.$1 || vcomet.$1;

// TODO: MOVE THIS EXCEPT DOMREADY TO VCOMET.DOM
(function () {
  var self = this;

  // vcomet.domReady (Doesn't wait for customElements)
  (function (funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
      if (!readyFired) {
        // this must be set to true before we start calling callbacks
        readyFired = true;
        for (var i = 0; i < readyList.length; i++) {
          // if a callback here happens to add new ready handlers,
          // the docReady() function will see that it already fired
          // and will schedule the callback to run right after
          // this event loop finishes so all handlers will still execute
          // in order and no new ones will be added to the readyList
          // while we are processing the list
          readyList[i].fn.call(window, readyList[i].ctx);
        }
        // allow any closures held by these functions to free
        readyList = [];
      }
    }

    function readyStateChange() {
      if (document.readyState === "complete") {
        ready();
      }
    }
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function (callback, context) {
      if (typeof callback !== "function") {
        throw new TypeError("callback for docReady(fn) must be a function");
      }
      // if ready has already fired, then just schedule the callback
      // to fire asynchronously, but right away
      if (readyFired) {
        setTimeout(function () {
          callback(context);
        }, 1);
        return;
      } else {
        // add the function and context to the list
        readyList.push({
          fn: callback,
          ctx: context
        });
      }
      // if document already ready to go, schedule the ready function to run
      // IE only safe when readyState is "complete", others safe when readyState is "interactive"
      if (
        document.readyState === "complete" ||
        (!document.attachEvent && document.readyState === "interactive")
      ) {
        setTimeout(ready, 1);
      } else if (!readyEventHandlersInstalled) {
        // otherwise if we don't have event handlers installed, install them
        if (document.addEventListener) {
          // first choice is DOMContentLoaded event
          document.addEventListener("DOMContentLoaded", ready, false);
          // backup is window load event
          window.addEventListener("load", ready, false);
        } else {
          // must be IE
          document.attachEvent("onreadystatechange", readyStateChange);
          window.attachEvent("onload", ready);
        }
        readyEventHandlersInstalled = true;
      }
    };
  })("domReady", self);

  self.getEnclosingComponent = function (el) {
    while (
      el.parentNode &&
      Object.prototype.toString.call(el.parentNode) != "[object HTMLDocument]"
    ) {
      el = el.parentNode;

      if (el.vcomet) {
        return el;
      }
    }

    return null;
  };

  // Register resize listener callback
  vcomet.createCallback("onResize", vcomet);

  window.addEventListener("resize", function (event) {
    vcomet.triggerCallback("onResize", vcomet, null, [event]);
  });

  // Register global focus
  vcomet.domReady(function () {
    document.body.addEventListener(
      "focus",
      function (e) {
        vcomet.triggerCallback("onFocus", vcomet, e.target, e);

        if (e.target.onFocus) {
          vcomet.triggerCallback("onFocus", e.target, e.target, e);
        }
      },
      true
    ); //Non-IE
    //document.body.onfocusin = focusHandler; //IE

    // Register global blur
    document.body.addEventListener(
      "blur",
      function (e) {
        vcomet.triggerCallback("onBlur", vcomet, e.target, e);

        if (e.target.onBlur) {
          vcomet.triggerCallback("onBlur", e.target, e.target, e);
        }
      },
      true
    ); //Non-IE
    //document.body.onfocusout = blurHandler; //IE
  });

  // ###########################################################################

  /**
   * The right position (in pixels) relative to the right side of the specified parent
   * * If no parent is specified, document body is de default one
   * @param {[type]} el     [description]
   * @param {[type]} parent [description]
   */
  self.offsetRight = function (el, parent) {
    // Get parent the element is relative to
    parent = !parent ? document.documentElement || document.body : parent;
    var docWidth = parent.offsetWidth;
    // Get element offset left and offset width
    var elOffsetLeft = el.offsetLeft;
    var elOffsetWidth = el.offsetWidth;
    // Calculate offset right value
    var offsetRight = docWidth - (elOffsetLeft + elOffsetWidth);
    return offsetRight;
  };
  /**
     * The bottom position (in pixels) relative to the bottom side of the specified parent
     * * If no parent is specified, document body is de default one
     * @param {[type]} el     [description]
     * @param {[type]} parent [description]
     */
  self.offsetBottom = function (el, parent) {
    // Get parent the element is relative to
    parent = !parent ? document.documentElement || document.body : parent;
    var docHeight = parent.offsetHeight;
    // Get element offset top and offset height
    var elOffsetTop = el.offsetTop;
    var elOffsetHeight = el.offsetHeight;
    // Calculate offset bottom value
    var offsetBottom = docHeight - (elOffsetTop + elOffsetHeight);
    return offsetBottom;
  };
  /**
     * Get element transform axis value
     * @param  {[type]}  el   [description]
     * @param  {[type]}  axis [description]
     * @return {Boolean}      [description]
     */
  self.getTransformAxis = function (el, axis) {
    var value;
    // Get element transform property
    var transform = el.style.transform;
    if (transform) {
      // Extract specified axis from transform string
      switch (axis.toLowerCase()) {
        case "x":
          value = parseInt(transform.split(",")[0].split("(")[1]);
          break;
        case "y":
          value = parseInt(transform.split(",")[1]);
          break;
        case "z":
          value = parseInt(transform.split(",")[2].split(")")[0]);
          break;
      }
    }
    return value;
  };
  /**
     * Move a node the specified pixels distance
     * @param  {[type]} node     [description]
     * @param  {[type]} distance [description]
     * @return {[type]}          [description]
     */
  self.translate = function (el, axis, value) {
    // Set the new node translate position
    switch (axis.toLowerCase()) {
      case "x":
        el.style.transform = "translate3d(" + value + "px, 0px, 0px)";
        break;
      case "y":
        el.style.transform = "translate3d(0px, " + value + "px, 0px)";
        break;
      case "z":
        el.style.transform = "translate3d(0px, 0px, " + value + "px)";
        break;
    }
  };

  // Register if the element is on the path on mouse events
  self.registerPathListener = function (el) {
    el.isOnPath = false;

    el.addEventListener("pointerdown", function () {
      el.isOnPath = true;
    }, true);

    el.addEventListener("mousedown", function () {
      el.isOnPath = true;
    }, true);

    el.addEventListener("touchstart", function () {
      el.isOnPath = true;
    }, true);

    document.addEventListener("pointerup", function () {
      setTimeout(function () {
        el.isOnPath = false;
      }, 0);

    }, true);

    document.addEventListener("mouseup", function () {
      setTimeout(function () {
        el.isOnPath = false;
      }, 0);

    }, true);

    document.addEventListener("touchend", function () {
      setTimeout(function () {
        el.isOnPath = false;
      }, 0);

    }, true);

  };
}.apply(vcomet));
