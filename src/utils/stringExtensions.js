export function extendStringPrototype() {
  if (!String.prototype.capitalizeFirstLetter) {
    String.prototype.capitalizeFirstLetter = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }
}
