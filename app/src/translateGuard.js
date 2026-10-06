/**
 * Keeps the page alive under browser machine translation (Google Translate,
 * Chrome's built-in translate, Edge's).
 *
 * Those tools replace text nodes with their own <font> wrappers. React still
 * holds the original nodes, so the next update that removes or inserts next to
 * one throws "Failed to execute 'removeChild' on 'Node'" and the whole tree
 * unmounts: a reader in, say, Portugal who translates the page gets a blank
 * screen on their first click. This is the long-standing React issue #11538.
 *
 * The guard makes both DOM calls tolerate a node that has been moved: removal
 * of an already-moved child becomes a no-op, and an insert before a moved
 * reference node appends instead. Neither changes behaviour on an untranslated
 * page, where the parent always matches.
 */
export default function installTranslateGuard() {
  if (typeof Node !== 'function' || !Node.prototype) return;

  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function guardedRemoveChild(child) {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child);
  };

  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function guardedInsertBefore(node, reference) {
    if (reference && reference.parentNode !== this) return this.appendChild(node);
    return insertBefore.call(this, node, reference);
  };
}
