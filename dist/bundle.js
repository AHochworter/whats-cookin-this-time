/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  font-family: \"Kaushan Script\", cursive;\n  background-color: #dfd7c0;\n  height: 100vh;\n  width: 100vw;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  background-color: #ffffff;\n}\n\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: #e37222;\n  height: 100px;\n}\n\nnav {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  flex-direction: column;\n  align-content: space-between;\n  background-color: #66b9bf;\n  height: 100px;\n  margin-bottom: 0px;\n}\n\n.nav-left {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: reverse;\n  align-content: space-around;\n  background-color: #66b9bf;\n  height: 65px;\n  width: 25vw;\n}\n\n.nav-center {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-content: stretch;\n  justify-content: center;\n  align-items: center;\n  background-color: #66b9bf;\n  height: 65px;\n  width: 50vw;\n}\n\n.nav-right {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  flex-direction: row-reverse;\n  align-content: center;\n  background-color: #66b9bf;\n  height: 65px;\n  width: 25vw;\n}\n\n.welcome-user {\n  font-size: 25px;\n}\n\nh1 {\n  display: flex;\n  font-size: 68px;\n  color: #ffffff;\n  -webkit-text-stroke: 0.005px #66b9bf;\n}\n\nh2 {\n  display: flex;\n  justify-content: center;\n  font-size: 40px;\n  color: #080808;\n}\n\n.recipe-tag,\nh3 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 17px;\n  color: #080808;\n}\n\nbutton {\n  background-color: #07889b;\n  color: black;\n  font-family: \"Poppins\", sans-serif;\n  width: 200px;\n  height: 35px;\n  font-size: 20px;\n  font-weight: bold;\n  border-radius: 1px 50px;\n  font-variant: common-ligatures;\n  border: none;\n}\n\n.search-bar,\n.max-cost-search-bar {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 350px;\n}\n\n.search-bar-input,\n.max-cost-input {\n  display: flex;\n  justify-content: flex-start;\n  border: none;\n  border-radius: 30px 30px 30px 30px;\n  padding-left: 25px;\n  height: 35px;\n}\n\n.max-cost-input {\n  width: 90px;\n}\n\n.search-btn,\n.clear-search-btn,\n.by-cost-button {\n  background-color: #07889b;\n  color: black;\n  font-family: \"Poppins\", sans-serif;\n  width: 125px;\n  height: 35px;\n  font-size: 15px;\n  font-weight: bold;\n  border-radius: 1px 50px;\n  font-variant: common-ligatures;\n  border: none;\n}\n\nselect {\n  background-color: #07889b;\n  color: black;\n  font-family: \"Poppins\", sans-serif;\n  width: 200px;\n  height: 35px;\n  font-size: 20px;\n  font-weight: bold;\n  border-radius: 1px 50px;\n  font-variant: common-ligatures;\n  border: none;\n  text-align: center;\n}\n\n.homepage-view {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-color: #dfd7c0;\n  height: 450px;\n  width: 100vw;\n}\n\n.recipe {\n  display: flex;\n  flex-direction: column;\n  background-color: #ffffff;\n  border-style: solid;\n  filter: drop-shadow(4px 3px 3px #3d3f3f);\n  margin: 10px;\n  width: 275px;\n  height: 300px;\n}\n\n.recipe-card {\n  cursor: pointer;\n}\n\n.recipe-card:hover,\n.recipe-card:focus {\n  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);\n  transform: translateY(-0.35em);\n}\n\n.recipe-name {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  margin: 0px 10px 2px 10px;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 20px;\n}\n\n.recipe-image {\n  max-width: 285px;\n  max-height: 165px;\n  width: auto;\n  height: auto;\n}\n\n.favorite-toggle {\n  height: 28px;\n  width: 28px;\n  margin: 0px 6px 6px 0px;\n}\n\n.recipe-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: stretch;\n  margin: 10px;\n  height: 450px;\n}\n\n/* Individual Recipe View */\n.individual-recipe-view {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  background-color: #ffffff;\n  width: 100vw;\n  height: 100vh;\n}\n\n.button-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-end;\n  width: 46vw;\n  height: 65px;\n}\n\n.individual-recipe-container {\n  display: flex;\n  flex-direction: row;\n  background-color: #ffffff;\n  justify-content: space-between;\n  width: 100vw;\n  height: 100vh;\n}\n\n.recipe-ingredients-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  background-color: #efaa78;\n  padding: 5px 15px 5px 15px;\n  margin: 15px 15px 15px 15px;\n  width: 50vw;\n  height: 85vh;\n}\n\n.recipe-name-heading-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #66b9bf;\n  filter: drop-shadow(5px 5px 4px #07889b);\n  color: #ffffff;\n  height: 50px;\n  width: 40vw;\n}\n\n.recipe-name-recipe-view {\n  display: flex;\n  justify-content: center;\n  margin: 0px 10px 2px 10px;\n  font-family: \"Kaushan Script\", cursive;\n  filter: drop-shadow(4px 4px 3px black);\n  font-size: 27px;\n  color: #ffffff;\n}\n\n.recipe-image-details-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #ffffff;\n  border-style: double;\n  border-color: #66b9bf;\n  margin: 10px 10px 10px 10px;\n  width: 40vw;\n  height: 27vh;\n}\n\n.recipe-image-details {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  filter: drop-shadow(4px 3px 3px #3d3f3f);\n  max-width: 400px;\n  max-height: 300px;\n  width: auto;\n  height: auto;\n}\n\n.ingredients-heading-wrapper,\n.instructions-heading-wrapper,\n.recipe-cost-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: #ffffff;\n  background-color: #66b9bf;\n  filter: drop-shadow(5px 5px 4px #07889b);\n  height: 50px;\n  width: 30vw;\n}\n\n.recipe-ingredients-list {\n  display: flex;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 20px;\n  justify-content: center;\n  align-items: normal;\n  padding: 35px 50px 20px 50px;\n  margin: 15px 30px 30px 30px;\n  background-color: #ffffff;\n  border-style: double;\n  border-color: #66b9bf;\n  width: 25vw;\n  height: 30vh;\n}\n\n.recipe-cost {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: \"Kaushan Script\", cursive;\n  filter: drop-shadow(4px 4px 3px black);\n  font-size: 24px;\n  color: #ffffff;\n}\n\n.recipe-instructions-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #efaa78;\n  padding: 5px 15px 5px 15px;\n  margin: 15px 15px 15px 15px;\n  width: 50vw;\n  height: 85vh;\n}\n\n.recipe-instructions-list {\n  display: flex;\n  align-items: flex-start;\n  padding: 75px 50px 20px 50px;\n  background-color: #ffffff;\n  border-style: double;\n  border-color: #66b9bf;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 20px;\n  margin: 30px 30px 30px 30px;\n  width: 45vw;\n  height: 70vh;\n  line-height: 2;\n}\n\n.ingredients-instructions-headings {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: \"Kaushan Script\", cursive;\n  filter: drop-shadow(4px 4px 3px black);\n  font-size: 35px;\n  color: #ffffff;\n}\n\nbutton:hover {\n  background-color: #e37222;\n  color: white;\n  cursor: pointer;\n}\n\nbutton:active {\n  background-color: #dfd7c0;\n  box-shadow: 0 5px #666;\n  transform: translateY(4px);\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,SAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,sCAAA;EACA,yBAAA;EACA,aAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,yBAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,yBAAA;EACA,aAAA;AACF;;AAEA;EACE,aAAA;EACA,eAAA;EACA,uBAAA;EACA,sBAAA;EACA,4BAAA;EACA,yBAAA;EACA,aAAA;EACA,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,eAAA;EACA,uBAAA;EACA,2BAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,eAAA;EACA,2BAAA;EACA,qBAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA;EACE,eAAA;AACF;;AAEA;EACE,aAAA;EACA,eAAA;EACA,cAAA;EACA,oCAAA;AACF;;AAEA;EACE,aAAA;EACA,uBAAA;EACA,eAAA;EACA,cAAA;AACF;;AAEA;;EAEE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,cAAA;AACF;;AAEA;EACE,yBAAA;EACA,YAAA;EACA,kCAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,uBAAA;EACA,8BAAA;EACA,YAAA;AACF;;AAEA;;EAEE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;AACF;;AAEA;;EAEE,aAAA;EACA,2BAAA;EACA,YAAA;EACA,kCAAA;EACA,kBAAA;EACA,YAAA;AACF;;AAEA;EACE,WAAA;AACF;;AAEA;;;EAGE,yBAAA;EACA,YAAA;EACA,kCAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,uBAAA;EACA,8BAAA;EACA,YAAA;AACF;;AAEA;EACE,yBAAA;EACA,YAAA;EACA,kCAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,uBAAA;EACA,8BAAA;EACA,YAAA;EACA,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,yBAAA;EACA,aAAA;EACA,YAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,mBAAA;EACA,wCAAA;EACA,YAAA;EACA,YAAA;EACA,aAAA;AACF;;AAEA;EACE,eAAA;AACF;;AACA;;EAEE,6CAAA;EACA,8BAAA;AAEF;;AACA;EACE,aAAA;EACA,uBAAA;EACA,kBAAA;EACA,yBAAA;EACA,oCAAA;EACA,eAAA;AAEF;;AACA;EACE,gBAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;AAEF;;AACA;EACE,YAAA;EACA,WAAA;EACA,uBAAA;AAEF;;AACA;EACE,aAAA;EACA,eAAA;EACA,6BAAA;EACA,oBAAA;EACA,YAAA;EACA,aAAA;AAEF;;AACA,2BAAA;AACA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,uBAAA;EACA,yBAAA;EACA,YAAA;EACA,aAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,8BAAA;EACA,YAAA;EACA,aAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,mBAAA;EACA,yBAAA;EACA,0BAAA;EACA,2BAAA;EACA,WAAA;EACA,YAAA;AAEF;;AAAA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,yBAAA;EACA,wCAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;AAGF;;AAAA;EACE,aAAA;EACA,uBAAA;EACA,yBAAA;EACA,sCAAA;EACA,sCAAA;EACA,eAAA;EACA,cAAA;AAGF;;AAAA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,yBAAA;EACA,oBAAA;EACA,qBAAA;EACA,2BAAA;EACA,WAAA;EACA,YAAA;AAGF;;AAAA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,wCAAA;EACA,gBAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;AAGF;;AAAA;;;EAGE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,cAAA;EACA,yBAAA;EACA,wCAAA;EACA,YAAA;EACA,WAAA;AAGF;;AAAA;EACE,aAAA;EACA,oCAAA;EACA,eAAA;EACA,uBAAA;EACA,mBAAA;EACA,4BAAA;EACA,2BAAA;EACA,yBAAA;EACA,oBAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;AAGF;;AAAA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sCAAA;EACA,sCAAA;EACA,eAAA;EACA,cAAA;AAGF;;AAAA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,yBAAA;EACA,0BAAA;EACA,2BAAA;EACA,WAAA;EACA,YAAA;AAGF;;AAAA;EACE,aAAA;EACA,uBAAA;EACA,4BAAA;EACA,yBAAA;EACA,oBAAA;EACA,qBAAA;EACA,oCAAA;EACA,eAAA;EACA,2BAAA;EACA,WAAA;EACA,YAAA;EACA,cAAA;AAGF;;AAAA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sCAAA;EACA,sCAAA;EACA,eAAA;EACA,cAAA;AAGF;;AAAA;EACE,yBAAA;EACA,YAAA;EACA,eAAA;AAGF;;AAAA;EACE,yBAAA;EACA,sBAAA;EACA,0BAAA;AAGF;;AAAA;EACE,aAAA;AAGF","sourcesContent":["* {\n  margin: 0;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  font-family: 'Kaushan Script', cursive;\n  background-color: #dfd7c0;\n  height: 100vh;\n  width: 100vw;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  background-color: #ffffff;\n}\n\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: #e37222;\n  height: 100px;\n}\n\nnav {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  flex-direction: column;\n  align-content: space-between;\n  background-color: #66b9bf;\n  height: 100px;\n  margin-bottom: 0px;\n}\n\n.nav-left {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: reverse;\n  align-content: space-around;\n  background-color: #66b9bf;\n  height: 65px;\n  width: 25vw;\n}\n\n.nav-center {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-content: stretch;\n  justify-content: center;\n  align-items: center;\n  background-color: #66b9bf;\n  height: 65px;\n  width: 50vw;\n}\n\n.nav-right {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  flex-direction: row-reverse;\n  align-content: center;\n  background-color: #66b9bf;\n  height: 65px;\n  width: 25vw;\n}\n\n.welcome-user {\n  font-size: 25px;\n}\n\nh1 {\n  display: flex;\n  font-size: 68px;\n  color: #ffffff;\n  -webkit-text-stroke: 0.005px #66b9bf;\n}\n\nh2 {\n  display: flex;\n  justify-content: center;\n  font-size: 40px;\n  color: #080808;\n}\n\n.recipe-tag,\nh3 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 17px;\n  color: #080808;\n}\n\nbutton {\n  background-color: #07889b;\n  color: black;\n  font-family: 'Poppins', sans-serif;\n  width: 200px;\n  height: 35px;\n  font-size: 20px;\n  font-weight: bold;\n  border-radius: 1px 50px;\n  font-variant: common-ligatures;\n  border: none;\n}\n\n.search-bar,\n.max-cost-search-bar {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 350px;\n}\n\n.search-bar-input,\n.max-cost-input {\n  display: flex;\n  justify-content: flex-start;\n  border: none;\n  border-radius: 30px 30px 30px 30px;\n  padding-left: 25px;\n  height: 35px;\n}\n\n.max-cost-input {\n  width: 90px;\n}\n\n.search-btn,\n.clear-search-btn,\n.by-cost-button {\n  background-color: #07889b;\n  color: black;\n  font-family: 'Poppins', sans-serif;\n  width: 125px;\n  height: 35px;\n  font-size: 15px;\n  font-weight: bold;\n  border-radius: 1px 50px;\n  font-variant: common-ligatures;\n  border: none;\n}\n\nselect {\n  background-color: #07889b;\n  color: black;\n  font-family: 'Poppins', sans-serif;\n  width: 200px;\n  height: 35px;\n  font-size: 20px;\n  font-weight: bold;\n  border-radius: 1px 50px;\n  font-variant: common-ligatures;\n  border: none;\n  text-align: center;\n}\n\n.homepage-view {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-color: #dfd7c0;\n  height: 450px;\n  width: 100vw;\n}\n\n.recipe {\n  display: flex;\n  flex-direction: column;\n  background-color: #ffffff;\n  border-style: solid;\n  filter: drop-shadow(4px 3px 3px #3d3f3f);\n  margin: 10px;\n  width: 275px;\n  height: 300px;\n}\n\n.recipe-card {\n  cursor: pointer;\n}\n.recipe-card:hover,\n.recipe-card:focus {\n  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);\n  transform: translateY(-0.35em);\n}\n\n.recipe-name {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  margin: 0px 10px 2px 10px;\n  font-family: 'Open Sans', sans-serif;\n  font-size: 20px;\n}\n\n.recipe-image {\n  max-width: 285px;\n  max-height: 165px;\n  width: auto;\n  height: auto;\n}\n\n.favorite-toggle {\n  height: 28px;\n  width: 28px;\n  margin: 0px 6px 6px 0px;\n}\n\n.recipe-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: stretch;\n  margin: 10px;\n  height: 450px;\n}\n\n/* Individual Recipe View */\n.individual-recipe-view {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  background-color: #ffffff;\n  width: 100vw;\n  height: 100vh;\n}\n\n.button-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-end;\n  width: 46vw;\n  height: 65px;\n}\n\n.individual-recipe-container {\n  display: flex;\n  flex-direction: row;\n  background-color: #ffffff;\n  justify-content: space-between;\n  width: 100vw;\n  height: 100vh;\n}\n\n.recipe-ingredients-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  background-color: #efaa78;\n  padding: 5px 15px 5px 15px;\n  margin: 15px 15px 15px 15px;\n  width: 50vw;\n  height: 85vh;\n}\n.recipe-name-heading-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #66b9bf;\n  filter: drop-shadow(5px 5px 4px #07889b);\n  color: #ffffff;\n  height: 50px;\n  width: 40vw;\n}\n\n.recipe-name-recipe-view {\n  display: flex;\n  justify-content: center;\n  margin: 0px 10px 2px 10px;\n  font-family: 'Kaushan Script', cursive;\n  filter: drop-shadow(4px 4px 3px black);\n  font-size: 27px;\n  color: #ffffff;\n}\n\n.recipe-image-details-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #ffffff;\n  border-style: double;\n  border-color: #66b9bf;\n  margin: 10px 10px 10px 10px;\n  width: 40vw;\n  height: 27vh;\n}\n\n.recipe-image-details {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  filter: drop-shadow(4px 3px 3px #3d3f3f);\n  max-width: 400px;\n  max-height: 300px;\n  width: auto;\n  height: auto;\n}\n\n.ingredients-heading-wrapper,\n.instructions-heading-wrapper,\n.recipe-cost-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: #ffffff;\n  background-color: #66b9bf;\n  filter: drop-shadow(5px 5px 4px #07889b);\n  height: 50px;\n  width: 30vw;\n}\n\n.recipe-ingredients-list {\n  display: flex;\n  font-family: 'Open Sans', sans-serif;\n  font-size: 20px;\n  justify-content: center;\n  align-items: normal;\n  padding: 35px 50px 20px 50px;\n  margin: 15px 30px 30px 30px;\n  background-color: #ffffff;\n  border-style: double;\n  border-color: #66b9bf;\n  width: 25vw;\n  height: 30vh;\n}\n\n.recipe-cost {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Kaushan Script', cursive;\n  filter: drop-shadow(4px 4px 3px black);\n  font-size: 24px;\n  color: #ffffff;\n}\n\n.recipe-instructions-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #efaa78;\n  padding: 5px 15px 5px 15px;\n  margin: 15px 15px 15px 15px;\n  width: 50vw;\n  height: 85vh;\n}\n\n.recipe-instructions-list {\n  display: flex;\n  align-items: flex-start;\n  padding: 75px 50px 20px 50px;\n  background-color: #ffffff;\n  border-style: double;\n  border-color: #66b9bf;\n  font-family: 'Open Sans', sans-serif;\n  font-size: 20px;\n  margin: 30px 30px 30px 30px;\n  width: 45vw;\n  height: 70vh;\n  line-height: 2;\n}\n\n.ingredients-instructions-headings {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Kaushan Script', cursive;\n  filter: drop-shadow(4px 4px 3px black);\n  font-size: 35px;\n  color: #ffffff;\n}\n\nbutton:hover {\n  background-color: #e37222;\n  color: white;\n  cursor: pointer;\n}\n\nbutton:active {\n  background-color: #dfd7c0;\n  box-shadow: 0 5px #666;\n  transform: translateY(4px);\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getIngredients: () => (/* binding */ getIngredients),
/* harmony export */   getRecipes: () => (/* binding */ getRecipes),
/* harmony export */   getUsers: () => (/* binding */ getUsers),
/* harmony export */   postRecipe: () => (/* binding */ postRecipe)
/* harmony export */ });
// Your fetch requests will live here!
const getUsers = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

const getRecipes = () => {
  return fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

const getIngredients = () => {
  return fetch('	http://localhost:3001/api/v1/ingredients')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log('error'));
};

const postRecipe = (recipeID, userID) => {
  const postObject = { userID: userID, recipeID: recipeID };

  return fetch(`http://localhost:3001/api/v1/usersRecipes`, {
    method: 'POST',
    body: JSON.stringify(postObject),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tagData = [
    'all',  
    'antipasti', 'antipasto',
    'appetizer', 'breakfast',
    'brunch',    'condiment',
    'dinner',  
    'dip',       'hor d\'oeuvre',
    'lunch',     'main course',
    'main dish', 'morning meal',
    'salad',     'sauce',
    'side dish', 'snack',
    'spread',    'starter'
]

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tagData);



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentRecipeList: () => (/* binding */ currentRecipeList),
/* harmony export */   ingredientsData: () => (/* binding */ ingredientsData),
/* harmony export */   recipeData: () => (/* binding */ recipeData),
/* harmony export */   savedRecipes: () => (/* binding */ savedRecipes),
/* harmony export */   usersData: () => (/* binding */ usersData)
/* harmony export */ });
/* harmony import */ var _src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _src_user_recipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _data_tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
//NOTE: Your DOM manipulation will occur in this file

//Imports🤞






//Global Variables👇
let currentRecipeName;
let currentUser;

let usersData;
let recipeData;
let ingredientsData;
let currentRecipeList;
let savedRecipes = [];

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const individualRecipeContainer = document.querySelector(
  '.individual-recipe-container'
);
const homeView = document.querySelector('.homepage-view');
const discoverRecipesHeader = document.querySelector('.discover-header');
const searchInput = document.getElementById('searchInput');
const dropDownMenu = document.querySelector('.drop-down-menu');
const selectButton = document.querySelector('.select-button');

//Buttons
const searchButton = document.querySelector('.search-btn');
const clearSearch = document.querySelector('.clear-search-btn');
const savedRecipesButton = document.querySelector('.saved-recipes-btn');
const saveRecipeBtn = document.querySelector('.save-button');
const deleteRecipeBtn = document.querySelector('.delete-button');
const homeBtn = document.querySelector('.home-btn');
const byCostButton = document.querySelector('.by-cost-button');
const welcomeUser = document.querySelector('.welcome-user');
const navCenter = document.querySelector('.nav-center');

//Event Listeners Here👇

const beginFetch = () => {
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getUsers)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getRecipes)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.getIngredients)()]).then(data => {
    usersData = data[0].users;
    recipeData = data[1].recipes;
    ingredientsData = data[2].ingredients;
    currentRecipeList = recipeData;
    currentUser = (0,_src_user_recipes__WEBPACK_IMPORTED_MODULE_1__.getRandomUser)(usersData);

    homeBtn.addEventListener('click', function () {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([
        recipeContainer,
        homeView,
        dropDownMenu,
        selectButton,
        navCenter,
      ]);
      recipeContainer.innerHTML = '';
      currentRecipeList = recipeData;
      discoverRecipesHeader.innerText = 'Discover Recipes';
      renderRecipeCards(recipeData);
      dropDownMenu.value = 'all';
    });

    recipeContainer.addEventListener('click', event => {
      const recipeName = event.target.closest('div').id;
      currentRecipeName = recipeName;
      renderRecipeDetails(recipeName);
    });

    searchButton.addEventListener('click', function (event) {
      renderSearchResults(currentRecipeList);
    });

    clearSearch.addEventListener('click', function (event) {
      searchInput.value = '';
      resetSearch();
      if (discoverRecipesHeader.innerText === 'Saved Recipes') {
        renderSavedRecipeResults();
      } else {
        renderSearchResults();
      }
    });

    byCostButton.addEventListener('click', function (event) {
      const maxCost = parseFloat(document.getElementById('maxCostInput').value);
      if (!isNaN(maxCost)) {
        renderFilteredRecipes(maxCost);
      }
    });

    selectButton.addEventListener('click', e => {
      e.preventDefault();
      renderRecipeCardsByTag(currentRecipeList, dropDownMenu.value);
      currentRecipeList = recipeData;
    });

    savedRecipesButton.addEventListener('click', function (event) {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([
        recipeContainer,
        homeView,
        dropDownMenu,
        selectButton,
        navCenter,
      ]);
      currentRecipeList = currentUser.recipesToCook;
      renderSavedRecipeResults();
      dropDownMenu.value = 'all';
    });

    deleteRecipeBtn.addEventListener('click', function () {
      deleteRecipeFromDOM(currentRecipeName);
      const deletedRecipe = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.findRecipe)(recipeData, currentRecipeName);

      if (deletedRecipe) {
        currentUser.recipesToCook = currentUser.recipesToCook.filter(
          recipeId => recipeId !== deletedRecipe.id
        );
        refreshSavedRecipesView();
      }
    });

    function deleteRecipeFromDOM(recipeName) {
      const recipeElement = document.getElementById(recipeName);
      if (recipeElement) {
        recipeElement.remove();
      }
      individualRecipeContainer.innerHTML = '';
    }

    function refreshSavedRecipesView() {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([
        recipeContainer,
        homeView,
        dropDownMenu,
        selectButton,
        navCenter,
      ]);
      currentRecipeList = currentUser.recipesToCook;
      renderSavedRecipeResults();
      dropDownMenu.value = 'all';
    }

    const handleSaveRecipeClick = event => {
      (0,_src_user_recipes__WEBPACK_IMPORTED_MODULE_1__.saveRecipe)(recipeData, currentRecipeName, currentUser);
    };

    saveRecipeBtn.addEventListener('click', handleSaveRecipeClick);

    //Event Handlers Here👇
    const renderRecipeCards = recipeList => {
      recipeContainer.innerHTML = ' ';
      recipeList.forEach(recipe => {
        if (recipe.tags.length === 0) {
          recipeContainer.innerHTML += `
          <div class="recipe recipe-card" id="${recipe.name}">
            <img class="recipe-card" role="button"
              src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
            />
            <h3 class="recipe-tag recipe-card" id="${recipe.name}">category not indicated</h3>
            <h4 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h4>
          </div>`;
        } else {
          recipeContainer.innerHTML += `
          <div class="recipe recipe-card" id="${recipe.name}">
            <img class="recipe-card" role="button"
              src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
            />
            <h3 class="recipe-tag recipe-card" id="${recipe.name}">${recipe.tags[0]}</h3>
            <h4 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h4>
          </div>`;
        }
      });
    };

    const renderRecipeDetails = recipeName => {
      removeHiddenClass([individualRecipeView]);
      addHiddenClass([
        recipeContainer,
        homeView,
        selectButton,
        dropDownMenu,
        navCenter,
      ]);
      individualRecipeContainer.innerHTML = ' ';
      currentRecipeName = event.target.id;
      const chosenRecipe = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.findRecipe)(recipeData, currentRecipeName);
      const recipeCost = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.calculateRecipeCost)(chosenRecipe, ingredientsData);
      const instructions = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.getRecipeInstructions)(recipeData, currentRecipeName);
      const formattedInstructions = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.formatInstructions)(instructions);
      const ingredientDetails = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.getIngredientsByRecipe)(
        recipeData,
        ingredientsData,
        currentRecipeName
      );
      const formattedIngredients = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.formatIngredients)(ingredientDetails);
      individualRecipeContainer.innerHTML += `
    <div class="individual-recipe-container">    
      <div class="recipe-ingredients-wrapper">
        <div class="recipe-name-heading-wrapper">
        <h3 class="recipe-name-recipe-view">${chosenRecipe.name}</h3>
        </div>
        <div class="recipe-image-details-wrapper">
          <img
            src="${chosenRecipe.image}" alt="${
        chosenRecipe.name
      }" class="recipe-image-details">
        </div>
          <div class="ingredients-heading-wrapper">
            <h3 class="ingredients-instructions-headings">Ingredients</h3>
          </div>
          <div class="recipe-ingredients-list">${formattedIngredients.replace(
            /\n/g,
            '<br>'
          )}</div>
          <div class="recipe-cost-wrapper">
            <p class="recipe-cost">This recipe costs $${recipeCost} to make.</p>
          </div>
      </div>
      <div class="recipe-instructions-wrapper">
        <div class="instructions-heading-wrapper">
          <h3 class="ingredients-instructions-headings">Instructions</h3>
        </div>
        <div class="recipe-instructions-list">${formattedInstructions.join(
          '<br>'
        )}</div>
      </div>
    </div>`;
    };

    const renderSearchResults = recipes => {
      let searchValue = searchInput.value;
      recipeContainer.innerHTML = '';
      const searchedRecipes = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.filterByName)(currentRecipeList, searchValue);
      if (!searchedRecipes.length) {
        recipeContainer.innerHTML = `
          <div class="no-recipes-found-message">
            <p class="no-recipe-match">No recipes found</p>
          </div>`;
      } else {
        if (discoverRecipesHeader.innerText === 'Saved Recipes') {
          currentRecipeList = currentUser.recipesToCook;
          discoverRecipesHeader.innerText = 'Saved Recipes';
        }
        renderRecipeCards(searchedRecipes);
        currentRecipeList = searchedRecipes;
      }
    };

    const resetSearch = () => {
      searchInput.value = '';
      recipeContainer.innerHTML = '';
      if (discoverRecipesHeader.innerText === 'Saved Recipes') {
        currentRecipeList = currentUser.recipesToCook;
      } else {
        currentRecipeList = recipeData;
      }
    };

    const renderSavedRecipeResults = () => {
      if (currentUser.recipesToCook.length === 0) {
        discoverRecipesHeader.innerText = "You haven't saved any recipes yet.";
        recipeContainer.innerHTML = '';
      } else {
        discoverRecipesHeader.innerText = 'Saved Recipes';
        const savedRecipesToDisplay = recipeData.filter(recipe =>
          currentUser.recipesToCook.includes(recipe.id)
        );
        renderRecipeCards(savedRecipesToDisplay);
        currentRecipeList = savedRecipesToDisplay;
      }
    };

    const renderRecipeCardsByTag = (recipeList, tag) => {
      const recipeByTagList = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.filterByTag)(currentRecipeList, tag);
      recipeContainer.innerHTML = '';
      let defaultTag = '';
      if (tag === 'all') {
        renderRecipeCards(recipeList);
      } else {
        renderRecipeCards(recipeByTagList);
        currentRecipeList = recipeByTagList;
      }
    };

    const renderFilteredRecipes = maxCost => {
      const filteredRecipes = currentRecipeList.filter(recipe => {
        const recipeCostFiltered = (0,_src_filter_recipes__WEBPACK_IMPORTED_MODULE_0__.calculateRecipeCost)(recipe, ingredientsData);
        return !isNaN(recipeCostFiltered) && recipeCostFiltered <= maxCost;
      });

      if (filteredRecipes.length === 0) {
        recipeContainer.innerHTML = `
          <div class="no-recipes-found-message">
            <p class="no-recipe-match">No recipes found within the specified cost.</p>
          </div>`;
      } else {
        renderRecipeCards(filteredRecipes);
        currentRecipeList = filteredRecipes;
      }
    };

    const welcomeNewUser = () => {
      welcomeUser.innerText = `Welcome to the site ${currentUser.name}!`;
    };

    (window.onload = renderRecipeCards(recipeData)),
      renderSelectTagOptions(_data_tags__WEBPACK_IMPORTED_MODULE_3__["default"]),
      welcomeNewUser();

    //Helper Functions👇
    const removeHiddenClass = elements => {
      elements.forEach(element => {
        element.classList.remove('hidden');
      });
      return elements;
    };

    const addHiddenClass = elements => {
      elements.forEach(element => {
        element.classList.add('hidden');
      });
      return elements;
    };
  });
};

beginFetch();

const renderSelectTagOptions = tagData => {
  tagData.forEach(tag => {
    dropDownMenu.innerHTML += `
        <option value="${tag}">${tag}</option>
        `;
  });
};


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateRecipeCost: () => (/* binding */ calculateRecipeCost),
/* harmony export */   filterByName: () => (/* binding */ filterByName),
/* harmony export */   filterByTag: () => (/* binding */ filterByTag),
/* harmony export */   findRecipe: () => (/* binding */ findRecipe),
/* harmony export */   formatIngredients: () => (/* binding */ formatIngredients),
/* harmony export */   formatInstructions: () => (/* binding */ formatInstructions),
/* harmony export */   getIngredientsByRecipe: () => (/* binding */ getIngredientsByRecipe),
/* harmony export */   getRecipeInstructions: () => (/* binding */ getRecipeInstructions)
/* harmony export */ });
const filterByTag = (recipes, tag) => {
  let recipesFilteredByTag = recipes.filter(recipe => {
    return recipe.tags.includes(tag);
  });
  return recipesFilteredByTag;
};

const filterByName = (recipeList, name) => {
  return recipeList.filter(recipe => {
    if (recipe.name.toLowerCase().includes(name.toLowerCase())) {
      return recipe;
    }
  });
};

const findRecipe = (recipeList, name) => {
  const recipe = recipeList.find(recipeName => {
    return recipeName.name === name;
  });
  return recipe;
};

const getIngredientsByRecipe = (recipeList, ingredientsList, name) => {
  const recipeObject = recipeList.find(recipe => recipe.name === name);
  if (recipeObject && recipeObject.ingredients) {
    const recipeIngredientIds = recipeObject.ingredients.map(
      ingredient => ingredient.id
    );
    const filteredIngredients = ingredientsList.filter(ingredient =>
      recipeIngredientIds.includes(ingredient.id)
    );
    const ingredientNames = filteredIngredients.map(
      ingredient => ingredient.name
    );
    return ingredientNames;
  } else {
    return [];
  }
};

const formatIngredients = ingredients => {
  return ingredients
    .map(ingredient => {
      return `${ingredient}\n`;
    })
    .join('');
};

const calculateRecipeCost = (recipe, ingredients) => {
  const totalCost = recipe.ingredients.reduce((sum, ingredient) => {
    const recipeIngredId = ingredient.id;
    const recipeAmount = ingredient.quantity.amount;
    const matchingIngredient = ingredients.find(ingredient => {
      return ingredient.id === recipeIngredId;
    });
    const estimatedCostInCents = matchingIngredient.estimatedCostInCents;
    return (sum += (recipeAmount / 100) * estimatedCostInCents);
  }, 0);

  return totalCost.toFixed(2);
};

const getRecipeInstructions = (recipes, name) => {
  const targetRecipe = recipes.find(recipe => recipe.name === name);
  if (targetRecipe) {
    return targetRecipe.instructions;
  } else {
    return [];
  }
};

const formatInstructions = recipe => {
  let recipeInstructions = recipe.map(step => {
    return `${step.number}. ${step.instruction}`;
  });
  return recipeInstructions;
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteRecipe: () => (/* binding */ deleteRecipe),
/* harmony export */   getRandomUser: () => (/* binding */ getRandomUser),
/* harmony export */   saveRecipe: () => (/* binding */ saveRecipe)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

const saveRecipe = async (recipeList, recipeName, currentUser) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);
  if (
    !currentUser.recipesToCook.some(
      currentRecipe => currentRecipe.id === recipeFullInfo.id
    )
  ) {
    return (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.postRecipe)(recipeFullInfo.id, currentUser.id).then(() => {
      return (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getUsers)().then(usersDataResponse => {
        const usersData = usersDataResponse.users;
        const updatedUserObj = usersData.find(
          user => user.id === currentUser.id
        );
        if (updatedUserObj) {
          currentUser.recipesToCook = updatedUserObj.recipesToCook;
        }
        return currentUser.recipesToCook;
      });
    });
  } else {
    return Promise.resolve(currentUser.recipesToCook);
  }
};

const deleteRecipe = (savedRecipes, recipeId) => {
  const recipeIndex = savedRecipes.findIndex(recipe => recipe.id === recipeId);
  if (recipeIndex !== -1) {
    savedRecipes.splice(recipeIndex, 1);
  }
  return savedRecipes;
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _data_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _src_domUpdates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
//NOTE: Data model and non-dom manipulating logic will live in this file.







})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map