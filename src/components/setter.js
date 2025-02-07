import { $emit } from "./utilities.js";

/**
 * Setter Class
 */
class Setter {
  /**
   * The constructor object
   * @param  {Node|String} elem     The element or selector to render the template into
   * @param  {Function}    template The template function to run when the data updates
   * @param  {Object}      options  Additional options
   */
  constructor(data, setters, name = "") {
    // Get store type
    const type = "store" + (name ? `-${name}` : "");

    // Create data property setter/getter
    Object.defineProperties(this, {
      data: {
        get() {
          return structuredClone(data);
        },
        set() {
          return true;
        },
      },
    });

    // Add setter functions
    for (const fn in setters) {
      if (typeof setters[fn] !== "function") continue;
      this[fn] = function (...args) {
        setters[fn](data, ...args);
        $emit(type, data);
      };
    }
  }
}

/**
 * Create a new setter
 * @param  {Object} data    The data object
 * @param  {Object} setters The setter functions
 * @param  {String} name    The custom event namespace
 * @return {Proxy}          The reactive proxy
 */
function setter(data = {}, setters = {}, name = "") {
  return new Setter(data, setters, name);
}

export default setter;
