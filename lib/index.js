module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const env = __webpack_require__(1);
const URL = 'https://contoso.sharepoint.com';
function config(build) {
    let customCdnTask = build.subTask('custom-cdn', (gulp, buildOptions, done) => {
        if (buildOptions && buildOptions.args && buildOptions.properties && buildOptions.uniqueTasks) {
            env.config();
            let replacer = buildOptions.args['target-cdn'];
            if (!replacer) {
                replacer = process.env.TargetCdn;
                if (!replacer) {
                    build.warn('[spfx-build-url-rewrite] No substitions found as argument or in environment variables!');
                }
            }
            if (replacer) {
                // Update externals
                build.verbose(`[spfx-build-url-rewrite] Rewriting ${URL} to ${replacer}.`);
                for (const key in buildOptions.properties.externals) {
                    if (buildOptions.properties.externals.hasOwnProperty(key)) {
                        var external = buildOptions.properties.externals[key];
                        if (external.path) {
                            external.path = external.path.replace(URL, replacer);
                        }
                        else {
                            buildOptions.properties.externals[key] = external.replace(URL, replacer);
                        }
                    }
                }
                // Update cdnBasePath
                const writeManifestTask = buildOptions.uniqueTasks.find((x) => { return x.name == 'write-manifests'; });
                if (writeManifestTask && writeManifestTask.taskConfig) {
                    if (writeManifestTask.taskConfig && writeManifestTask.taskConfig.cdnBasePath) {
                        writeManifestTask.taskConfig.cdnBasePath = writeManifestTask.taskConfig.cdnBasePath.replace(URL, replacer);
                    }
                }
            }
        }
        done();
    });
    build.rig.addPostBuildTask(customCdnTask);
}
exports.config = config;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);