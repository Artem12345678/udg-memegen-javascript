import testFunc from "./modules/testFunc";
import testClassDefault, { Test as testClass } from "./modules/testClass";

(function wrapper($) {
  $(document).ready(() => {
    testFunc();
    testClassDefault.output();

    testClass.asynchron();

    console.log("test from main file");
  });
})(jQuery);
