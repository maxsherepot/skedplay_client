/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/apps/main/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/nova/nova.js":
/*!***********************************!*\
  !*** ./resources/js/nova/nova.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _viewedResourcesWatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewedResourcesWatcher */ \"./resources/js/nova/viewedResourcesWatcher.js\");\n\nNova.booting(function (Vue, router) {\n  _viewedResourcesWatcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"].watch(router);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbm92YS9ub3ZhLmpzPzYyNWUiXSwibmFtZXMiOlsiTm92YSIsIndhdGNoZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUVBQSxJQUFJLENBQUpBLFFBQWEsdUJBQWlCO0FBQzFCQyxpRUFBTyxDQUFQQTtBQURKRCIsImZpbGUiOiIuL3Jlc291cmNlcy9qcy9ub3ZhL25vdmEuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2F0Y2hlciBmcm9tICcuL3ZpZXdlZFJlc291cmNlc1dhdGNoZXInO1xuXG5Ob3ZhLmJvb3RpbmcoKFZ1ZSwgcm91dGVyKSA9PiB7XG4gICAgd2F0Y2hlci53YXRjaChyb3V0ZXIpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/nova/nova.js\n");

/***/ }),

/***/ "./resources/js/nova/viewedResourcesWatcher.js":
/*!*****************************************************!*\
  !*** ./resources/js/nova/viewedResourcesWatcher.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  watch: function watch(router) {\n    router.beforeEach(function (to, from, next) {\n      if (to.name === 'detail' || to.name === 'edit') {\n        var badge = document.querySelector('.resource-not-seen-count[data-resource=' + to.params.resourceName + ']');\n\n        if (!badge) {\n          next();\n          return;\n        }\n\n        var query = '?model=' + badge.getAttribute('data-class') + '&id=' + to.params.resourceId;\n        Nova.request().get('/admin/check-resource-seen' + query).then(function (response) {\n          if (!response.data.result || response.data.seen) {\n            return;\n          }\n\n          badge.innerHTML--;\n\n          if (parseInt(badge.innerHTML) === 0) {\n            badge.remove();\n          }\n        });\n      }\n\n      next();\n    });\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvbm92YS92aWV3ZWRSZXNvdXJjZXNXYXRjaGVyLmpzPzNmNTEiXSwibmFtZXMiOlsid2F0Y2giLCJyb3V0ZXIiLCJ0byIsImJhZGdlIiwiZG9jdW1lbnQiLCJuZXh0IiwicXVlcnkiLCJOb3ZhIiwicmVzcG9uc2UiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZTtBQUNYQSxPQURXLHlCQUNHO0FBQ1ZDLFVBQU0sQ0FBTkEsV0FBa0IsMEJBQW9CO0FBQ2xDLFVBQUlDLEVBQUUsQ0FBRkEscUJBQXdCQSxFQUFFLENBQUZBLFNBQTVCLFFBQWdEO0FBQzVDLFlBQUlDLEtBQUssR0FBR0MsUUFBUSxDQUFSQSxjQUF1Qiw0Q0FBNENGLEVBQUUsQ0FBRkEsT0FBNUMsZUFBbkMsR0FBWUUsQ0FBWjs7QUFDQSxZQUFJLENBQUosT0FBWTtBQUNSQyxjQUFJO0FBQ0o7QUFDSDs7QUFFRCxZQUFJQyxLQUFLLEdBQUcsWUFDTkgsS0FBSyxDQUFMQSxhQURNLFlBQ05BLENBRE0sWUFHTkQsRUFBRSxDQUFGQSxPQUhOO0FBS0FLLFlBQUksQ0FBSkEsY0FBbUIsK0JBQW5CQSxZQUNVLG9CQUFjO0FBQ2hCLGNBQUksQ0FBQ0MsUUFBUSxDQUFSQSxLQUFELFVBQXlCQSxRQUFRLENBQVJBLEtBQTdCLE1BQWlEO0FBQzdDO0FBQ0g7O0FBRURMLGVBQUssQ0FBTEE7O0FBQ0EsY0FBSU0sUUFBUSxDQUFDTixLQUFLLENBQWRNLFNBQVEsQ0FBUkEsS0FBSixHQUFxQztBQUNqQ04saUJBQUssQ0FBTEE7QUFDSDtBQVRUSTtBQVdIOztBQUNERixVQUFJO0FBekJSSjtBQTJCSDtBQTdCVSxDQUFmIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL25vdmEvdmlld2VkUmVzb3VyY2VzV2F0Y2hlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICB3YXRjaChyb3V0ZXIpIHtcbiAgICAgICAgcm91dGVyLmJlZm9yZUVhY2goKHRvLCBmcm9tLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICBpZiAodG8ubmFtZSA9PT0gJ2RldGFpbCcgfHwgdG8ubmFtZSA9PT0gJ2VkaXQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc291cmNlLW5vdC1zZWVuLWNvdW50W2RhdGEtcmVzb3VyY2U9JyArIHRvLnBhcmFtcy5yZXNvdXJjZU5hbWUgKyAnXScpO1xuICAgICAgICAgICAgICAgIGlmICghYmFkZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gJz9tb2RlbD0nXG4gICAgICAgICAgICAgICAgICAgICsgYmFkZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLWNsYXNzJylcbiAgICAgICAgICAgICAgICAgICAgKyAnJmlkPSdcbiAgICAgICAgICAgICAgICAgICAgKyB0by5wYXJhbXMucmVzb3VyY2VJZDtcblxuICAgICAgICAgICAgICAgIE5vdmEucmVxdWVzdCgpLmdldCgnL2FkbWluL2NoZWNrLXJlc291cmNlLXNlZW4nICsgcXVlcnkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5kYXRhLnJlc3VsdCB8fCByZXNwb25zZS5kYXRhLnNlZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhZGdlLmlubmVySFRNTC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGJhZGdlLmlubmVySFRNTCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWRnZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/nova/viewedResourcesWatcher.js\n");

/***/ }),

/***/ "./resources/sass/nova.scss":
/*!**********************************!*\
  !*** ./resources/sass/nova.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Fzcy9ub3ZhLnNjc3M/Yzg0MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuL3Jlc291cmNlcy9zYXNzL25vdmEuc2Nzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/sass/nova.scss\n");

/***/ }),

/***/ 0:
/*!********************************************************************!*\
  !*** multi ./resources/js/nova/nova.js ./resources/sass/nova.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! G:\server\OSPanel\domains\skedplay2\api\resources\js\nova\nova.js */"./resources/js/nova/nova.js");
module.exports = __webpack_require__(/*! G:\server\OSPanel\domains\skedplay2\api\resources\sass\nova.scss */"./resources/sass/nova.scss");


/***/ })

/******/ });
