import render from "./render.js";
import { $emit, getElem, createHandler } from "./utilities.js";

/**
 * Component Class
 */
class Component {
  /**
   * The constructor object
   * @param  {Node|String} elem     The element or selector to render the template into
   * @param  {Function}    template The template function to run when the data updates
   * @param  {Object}      options  Additional options
   */
  constructor(elem, template, options) {
    // Create instance properties
    this.elem = elem;
    this.template = template;
    this.stores = options.stores
      ? options.stores.map((store) => `reef:store-${store}`)
      : ["reef:store"];
    this.events = options.events;
    this.handler = createHandler(this);
    this.debounce = null;

    // Init
    this.start();
  }

  /**
   * Start reactive data rendering
   */
  start() {
    for (let store of this.stores) {
      document.addEventListener(store, this.handler);
    }
    this.render();
    $emit("start", null, getElem(this.elem));
  }

  /**
   * Stop reactive data rendering
   */
  stop() {
    for (let store of this.stores) {
      document.removeEventListener(store, this.handler);
    }
    $emit("stop", null, getElem(this.elem));
  }

  /**
   * Render the UI
   */
  render() {
    // Cache instance
    const self = this;

    // If there's a pending render, cancel it
    if (self.debounce) {
      window.cancelAnimationFrame(self.debounce);
    }

    // Setup the new render to run at the next animation frame
    self.debounce = window.requestAnimationFrame(function () {
      render(self.elem, self.template(), { events: self.events });
    });
  }
}

/**
 * Create a new listener
 * @param  {Node|String} elem     The element or selector to render the template into
 * @param  {Function}    template The template function to run when the data updates
 * @param  {Object}      options  Additional options
 */
function component(elem, template, options = {}) {
  const componentInstance = new Component(elem, template, options);
  componentInstance.render.bind(componentInstance);
  return componentInstance;
}

export default component;
