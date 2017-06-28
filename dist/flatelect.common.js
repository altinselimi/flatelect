module.exports=function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=1)}([function(module,exports,__webpack_require__){__webpack_require__(3);var Component=__webpack_require__(4)(__webpack_require__(2),__webpack_require__(5),null,null);module.exports=Component.exports},function(module,__webpack_exports__,__webpack_require__){"use strict";function install(Vue){Vue.component("flatelect",__WEBPACK_IMPORTED_MODULE_0__components_flatelect_flatelect_vue___default.a)}Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.install=install;var __WEBPACK_IMPORTED_MODULE_0__components_flatelect_flatelect_vue__=__webpack_require__(0),__WEBPACK_IMPORTED_MODULE_0__components_flatelect_flatelect_vue___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_flatelect_flatelect_vue__);__webpack_require__.d(__webpack_exports__,"flatelect",function(){return __WEBPACK_IMPORTED_MODULE_0__components_flatelect_flatelect_vue___default.a});var plugin={version:"0.0.1",install:install};__webpack_exports__.default=plugin;var GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:"undefined"!=typeof global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin)},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={props:{options:{type:Array,required:!1,default:null},objkey:{type:String,required:!1,default:null},size:{type:String,required:!1,default:"full"},fancy:{type:Boolean,required:!1,default:!1},required:{type:Boolean,required:!1,default:!1},custom:{type:Boolean,required:!1,default:!1}},data:function(){return{noInput:!1,inputValue:null,searchValue:null,dropdown:!1,keyboardSelection:null}},methods:{select:function(option){this.inputValue=option,this.searchValue=null,this.close(),this.$emit("selected",option)},focusInput:function(forceClose){if("icon"===forceClose&&this.dropdown)this.close();else{if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)||this.$refs.searchInput.focus(),this.dropdown=!0,null!==this.inputValue){this.keyboardSelection=this.inputValue;var index=this.filteredOptions.indexOf(this.inputValue);this.$nextTick(function(){var optionsDiv=document.getElementById("options"),selectedEl=document.getElementById("option"+index);selectedEl.offsetTop>150?optionsDiv.scrollTop=selectedEl.offsetTop-150:selectedEl.offsetTop<100&&(optionsDiv.scrollTop=0)})}}},close:function(){this.dropdown=!1,this.$refs.searchInput.blur()},keymonitor:function(event){var index=this.filteredOptions.indexOf(this.keyboardSelection),myElement=void 0,topPos=void 0,scrollingDiv=document.getElementById("options");"Enter"===event.key?this.select(this.keyboardSelection):"up"===event.key||"ArrowUp"===event.key?index>0?(this.keyboardSelection=this.filteredOptions[index-1],myElement=document.getElementById("option"+index),topPos=myElement.offsetTop,topPos>150?scrollingDiv.scrollTop=topPos-150:topPos<100&&(scrollingDiv.scrollTop=0)):-1===index&&(this.keyboardSelection=this.filteredOptions[0]):"down"!==event.key&&"ArrowDown"!==event.key||index<this.filteredOptions.length&&(-1===index?this.keyboardSelection=this.filteredOptions[0]:(this.keyboardSelection=this.filteredOptions[index+1],myElement=document.getElementById("option"+index),(topPos=myElement.offsetTop)>150&&(scrollingDiv.scrollTop=topPos-100)))},searching:function(){"Enter"!==event.key&&"up"!==event.key&&"ArrowUp"!==event.key&&"down"!==event.key&&"ArrowDown"!==event.key&&(this.searchValue=this.inputValue)}},computed:{filteredOptions:function(){var _this=this;return null!==this.searchValue&&this.searchValue.length>0?null!==this.objkey?this.options.filter(function(option){return-1!==option[_this.objkey].toLowerCase().indexOf(_this.searchValue.toLowerCase())}):this.options.filter(function(option){return-1!==option.toLowerCase().indexOf(_this.searchValue.toLowerCase())}):this.options}}}},function(module,exports){},function(module,exports){module.exports=function(rawScriptExports,compiledTemplate,scopeId,cssModules){var esModule,scriptExports=rawScriptExports=rawScriptExports||{},type=typeof rawScriptExports.default;"object"!==type&&"function"!==type||(esModule=rawScriptExports,scriptExports=rawScriptExports.default);var options="function"==typeof scriptExports?scriptExports.options:scriptExports;if(compiledTemplate&&(options.render=compiledTemplate.render,options.staticRenderFns=compiledTemplate.staticRenderFns),scopeId&&(options._scopeId=scopeId),cssModules){var computed=options.computed||(options.computed={});Object.keys(cssModules).forEach(function(key){var module=cssModules[key];computed[key]=function(){return module}})}return{esModule:esModule,exports:scriptExports,options:options}}},function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{class:[{dropdownOn:!!_vm.dropdown,fancy:!!_vm.fancy},_vm.size],attrs:{id:"select-wrapper"},on:{mouseleave:function($event){_vm.close()},keydown:_vm.keymonitor}},[_c("div",{staticClass:"select-filter",on:{click:function($event){_vm.focusInput()}}},[_c("input",{directives:[{name:"model",rawName:"v-model",value:_vm.inputValue,expression:"inputValue"},{name:"show",rawName:"v-show",value:!_vm.noInput,expression:"!noInput"}],ref:"searchInput",attrs:{placeholder:"Select an option...",type:"text",required:_vm.required},domProps:{value:_vm.inputValue},on:{focus:function($event){_vm.focusInput()},keyup:function($event){_vm.searching()},input:function($event){$event.target.composing||(_vm.inputValue=$event.target.value)}}})]),_vm._v(" "),_c("span",{staticClass:"icon-wrapper",on:{click:function($event){_vm.focusInput("icon")}}},[_c("span",{staticClass:"down",class:{moveup:!!_vm.dropdown}},[_c("div",{staticClass:"box"})]),_vm._v(" "),_vm.dropdown?_c("span",{staticClass:"x"},[_c("div",{staticClass:"box"})]):_vm._e()]),_vm._v(" "),_vm.dropdown&&_vm.options?_c("div",{attrs:{id:"options"}},[_vm.options.length>0?_c("ul",_vm._l(_vm.filteredOptions,function(option,index){return _c("li",{attrs:{id:"option"+index},on:{click:function($event){_vm.select(option)}}},[_c("p",{class:{heading:option==option.toUpperCase(),keyboardHover:option===_vm.keyboardSelection}},[!1===_vm.custom?_c("span",[_vm._v("\n                        "+_vm._s(option)+"\n                    ")]):_c("span",[_vm._t("default")],2)])])})):_c("ul",[_c("p",[_vm._v("There are no options to be shown.")])])]):_vm._e()])},staticRenderFns:[]}}]);