/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {*}      detail Any details to pass along with the event
 * @param  {Node}   elem   The element to emit the event on
 */
function $emit(type, detail, elem = document) {
  // Create a new event
  let event = new CustomEvent(`reef:${type}`, {
    bubbles: true,
    cancelable: true,
    detail: detail,
  });

  // Dispatch the event
  return elem.dispatchEvent(event);
}

/**
 * Create the event handler function
 * @param {Class} instance The instance
 */
function createHandler(instance) {
  return function handler(event) {
    instance.render();
  };
}

/**
 * Get the element from the UI
 * @param  {String|Node} elem The element or selector string
 * @return {Node}             The element
 */
function getElem(elem) {
  return typeof elem === "string" ? document.querySelector(elem) : elem;
}

/**
 * Get an object's type
 * @param  {*}      obj The object
 * @return {String}     The type
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * Check if an attribute string has a stringified falsy value
 * @param  {String}  str The string
 * @return {Boolean}     If true, value is falsy (yea, I know, that's a little confusing)
 */
function isFalsy(str) {
  return ["false", "null", "undefined", "0", "-0", "NaN", "0n", "-0n"].includes(
    str
  );
}

/**
 * Check if two nodes are different
 * @param  {Node}  node1 The first node
 * @param  {Node}  node2 The second node
 * @return {Boolean}     If true, they're not the same node
 */
function isDifferentNode(node1, node2) {
  return (
    (typeof node1.nodeType === "number" && node1.nodeType !== node2.nodeType) ||
    (typeof node1.tagName === "string" && node1.tagName !== node2.tagName) ||
    (typeof node1.id === "string" && node1.id !== node2.id) ||
    (typeof node1.src === "string" && node1.src !== node2.src)
  );
}

export { $emit, createHandler, getElem, getType, isFalsy, isDifferentNode };
