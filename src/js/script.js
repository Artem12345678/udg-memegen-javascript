import MemeGen from "./modules/memegen";

(function wrapper($) {
  $(document).ready(() => {
    /* eslint-disable no-unused-vars */
    const app = new MemeGen("app");
  });
})(jQuery);
