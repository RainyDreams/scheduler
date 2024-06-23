
  (function () {
    if (typeof window > "u") return;

    var target,
      isMouseDown = false;
    var isTouchSupported = "ontouchstart" in window;

    document.createTouch =
      document.createTouch ||
      function (target, identifier, pageX, pageY, screenX, screenY) {
        return new Touch(
          target,
          identifier,
          {
            pageX: pageX,
            pageY: pageY,
            screenX: screenX,
            screenY: screenY,
            clientX: pageX - window.pageXOffset,
            clientY: pageY - window.pageYOffset,
          },
          0,
          0
        );
      };

    document.createTouchList =
      document.createTouchList ||
      function () {
        var touchList = [];
        for (var i = 0; i < arguments.length; i++) {
          touchList[i] = arguments[i];
        }
        touchList.item = function (index) {
          return this[index] || null;
        };
        touchList.identifiedTouch = function (id) {
          return this[id + 1] || null;
        };
        return touchList;
      };

    Element.prototype.matches =
      Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;

    Element.prototype.closest =
      Element.prototype.closest ||
      function (selector) {
        var element = this;
        while (element) {
          if (element.matches(selector)) return element;
          element = element.parentElement || element.parentNode;
        }
        return null;
      };

    function Touch(target, identifier, coords, radiusX, radiusY) {
      this.identifier = identifier;
      this.target = target;
      this.clientX = coords.clientX + radiusX;
      this.clientY = coords.clientY + radiusY;
      this.screenX = coords.screenX + radiusX;
      this.screenY = coords.screenY + radiusY;
      this.pageX = coords.pageX + radiusX;
      this.pageY = coords.pageY + radiusY;
    }

    function createEvent(type, originalEvent) {
      var event = document.createEvent("Event");
      event.initEvent(type, true, true);
      event.altKey = originalEvent.altKey;
      event.ctrlKey = originalEvent.ctrlKey;
      event.metaKey = originalEvent.metaKey;
      event.shiftKey = originalEvent.shiftKey;
      event.touches = getTouches(originalEvent);
      event.targetTouches = getTouches(originalEvent);
      event.changedTouches = getChangedTouches(originalEvent);
      // target.dispatchEvent(event);
      if (target && target.dispatchEvent) {
        target.dispatchEvent(event);
      }
    }

    function getChangedTouches(event) {
      var touchList = [];
      touchList.push(new Touch(target, 1, event, 0, 0));
      return touchList;
    }

    function getTouches(event) {
      return event.type === "mouseup" ? [] : getChangedTouches(event);
    }

    function handleEvent(type) {
      return function (event) {
        // if (event.type === "mousedown") debugger;
        if (event.type === "mousedown") isMouseDown = true;
        if (event.type === "mouseup") isMouseDown = false;
        if (event.type === "mousemove" && !isMouseDown) return;
        if (
          event.type === "mousedown" ||
          !target ||
          (target && !target.dispatchEvent)
        )
          target = event.target;
        if (target.closest("[data-no-touch-simulate]") == null)
          createEvent(type, event);
        if (event.type === "mouseup") target = null;
      };
    }

    function TouchSimulator() {
      window.addEventListener("mousedown", handleEvent("touchstart"), true);
      window.addEventListener("mousemove", handleEvent("touchmove"), true);
      window.addEventListener("mouseup", handleEvent("touchend"), true);
    }

    TouchSimulator.multiTouchOffset = 75;

    if (!isTouchSupported) new TouchSimulator();
  })();

