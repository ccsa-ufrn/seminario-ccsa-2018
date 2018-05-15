webpackJsonp([2,5],{

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomHandler; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DomHandler = (function () {
    function DomHandler() {
    }
    DomHandler.prototype.addClass = function (element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    };
    DomHandler.prototype.addMultipleClasses = function (element, className) {
        if (element.classList) {
            var styles = className.split(' ');
            for (var i = 0; i < styles.length; i++) {
                element.classList.add(styles[i]);
            }
        }
        else {
            var styles = className.split(' ');
            for (var i = 0; i < styles.length; i++) {
                element.className += ' ' + styles[i];
            }
        }
    };
    DomHandler.prototype.removeClass = function (element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };
    DomHandler.prototype.hasClass = function (element, className) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    };
    DomHandler.prototype.siblings = function (element) {
        return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    };
    DomHandler.prototype.find = function (element, selector) {
        return element.querySelectorAll(selector);
    };
    DomHandler.prototype.findSingle = function (element, selector) {
        return element.querySelector(selector);
    };
    DomHandler.prototype.index = function (element) {
        var children = element.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].nodeType == 1)
                num++;
        }
        return -1;
    };
    DomHandler.prototype.relativePosition = function (element, target) {
        var elementDimensions = element.offsetParent ? { width: element.outerWidth, height: element.outerHeight } : this.getHiddenElementDimensions(element);
        var targetHeight = target.offsetHeight;
        var targetWidth = target.offsetWidth;
        var targetOffset = target.getBoundingClientRect();
        var viewport = this.getViewport();
        var top, left;
        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height)
            top = -1 * (elementDimensions.height);
        else
            top = targetHeight;
        if ((targetOffset.left + elementDimensions.width) > viewport.width)
            left = targetWidth - elementDimensions.width;
        else
            left = 0;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    };
    DomHandler.prototype.absolutePosition = function (element, target) {
        var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        var elementOuterHeight = elementDimensions.height;
        var elementOuterWidth = elementDimensions.width;
        var targetOuterHeight = target.offsetHeight;
        var targetOuterWidth = target.offsetWidth;
        var targetOffset = target.getBoundingClientRect();
        var windowScrollTop = this.getWindowScrollTop();
        var windowScrollLeft = this.getWindowScrollLeft();
        var viewport = this.getViewport();
        var top, left;
        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height)
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
        else
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width)
            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
        else
            left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    };
    DomHandler.prototype.getHiddenElementOuterHeight = function (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementHeight;
    };
    DomHandler.prototype.getHiddenElementOuterWidth = function (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementWidth;
    };
    DomHandler.prototype.getHiddenElementDimensions = function (element) {
        var dimensions = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return dimensions;
    };
    DomHandler.prototype.scrollInView = function (container, item) {
        var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
        var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
        var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
        var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        var containerRect = container.getBoundingClientRect();
        var itemRect = item.getBoundingClientRect();
        var offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        var scroll = container.scrollTop;
        var elementHeight = container.clientHeight;
        var itemHeight = this.getOuterHeight(item);
        if (offset < 0) {
            container.scrollTop = scroll + offset;
        }
        else if ((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    };
    DomHandler.prototype.fadeIn = function (element, duration) {
        element.style.opacity = 0;
        var last = +new Date();
        var opacity = 0;
        var tick = function () {
            opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();
            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    };
    DomHandler.prototype.fadeOut = function (element, ms) {
        var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
        var fading = setInterval(function () {
            opacity = opacity - gap;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        }, interval);
    };
    DomHandler.prototype.getWindowScrollTop = function () {
        var doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    };
    DomHandler.prototype.getWindowScrollLeft = function () {
        var doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    };
    DomHandler.prototype.matches = function (element, selector) {
        var p = Element.prototype;
        var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p.msMatchesSelector || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(element, selector);
    };
    DomHandler.prototype.getOuterWidth = function (el, margin) {
        var width = el.offsetWidth;
        if (margin) {
            var style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    };
    DomHandler.prototype.getHorizontalPadding = function (el) {
        var style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    };
    DomHandler.prototype.getHorizontalMargin = function (el) {
        var style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    };
    DomHandler.prototype.innerWidth = function (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    };
    DomHandler.prototype.width = function (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    };
    DomHandler.prototype.getOuterHeight = function (el, margin) {
        var height = el.offsetHeight;
        if (margin) {
            var style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    };
    DomHandler.prototype.getHeight = function (el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return height;
    };
    DomHandler.prototype.getWidth = function (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width;
    };
    DomHandler.prototype.getViewport = function () {
        var win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    };
    DomHandler.prototype.getOffset = function (el) {
        var x = el.offsetLeft;
        var y = el.offsetTop;
        while (el = el.offsetParent) {
            x += el.offsetLeft;
            y += el.offsetTop;
        }
        return { left: x, top: y };
    };
    DomHandler.prototype.equals = function (obj1, obj2) {
        if (obj1 == null && obj2 == null) {
            return true;
        }
        if (obj1 == null || obj2 == null) {
            return false;
        }
        if (obj1 == obj2) {
            delete obj1._$visited;
            return true;
        }
        if (typeof obj1 == 'object' && typeof obj2 == 'object') {
            obj1._$visited = true;
            for (var p in obj1) {
                if (p === "_$visited")
                    continue;
                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                    return false;
                }
                switch (typeof (obj1[p])) {
                    case 'object':
                        if (obj1[p] && obj1[p]._$visited || !this.equals(obj1[p], obj2[p]))
                            return false;
                        break;
                    case 'function':
                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString()))
                            return false;
                        break;
                    default:
                        if (obj1[p] != obj2[p])
                            return false;
                        break;
                }
            }
            for (var p in obj2) {
                if (typeof (obj1[p]) == 'undefined')
                    return false;
            }
            delete obj1._$visited;
            return true;
        }
        return false;
    };
    DomHandler.prototype.getUserAgent = function () {
        return navigator.userAgent;
    };
    DomHandler.prototype.isIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return true;
        }
        // other browser
        return false;
    };
    DomHandler.prototype.appendChild = function (element, target) {
        if (this.isElement(target))
            target.appendChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.appendChild(element);
        else
            throw 'Cannot append ' + target + ' to ' + element;
    };
    DomHandler.prototype.removeChild = function (element, target) {
        if (this.isElement(target))
            target.removeChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.removeChild(element);
        else
            throw 'Cannot remove ' + element + ' from ' + target;
    };
    DomHandler.prototype.isElement = function (obj) {
        return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
            obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
    };
    DomHandler.prototype.calculateScrollbarWidth = function () {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };
    DomHandler.zindex = 1000;
    DomHandler = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], DomHandler);
    return DomHandler;
}());
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/dom-handler.service.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeralService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GeralService = (function () {
    function GeralService(_http) {
        this._http = _http;
        // host : string = 'http://localhost/seminario-ccsa-old/index.php';
        this.host = 'https://seminario2017.ccsa.ufrn.br';
    }
    GeralService.prototype.getGts = function () {
        return this._http.get('https://sigeva.ccsa.ufrn.br/api/event/5a720e7e586eef000f1a38c4/gts/all')
            .map(function (res) { return res.json().data; });
    };
    GeralService.prototype.getNews = function () {
        return this._http
            .get('https://sigeva.ccsa.ufrn.br/api/event/5a720e7e586eef000f1a38c4/news/all')
            .map(function (res) { return res.json().data; });
    };
    GeralService.prototype.getNewsOne = function (id) {
        return this._http.get(this.host + "/api/newsone/" + id)
            .map(function (res) { return res.json().data; });
    };
    GeralService.prototype.sendMessage = function (name, email, message, subject) {
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* URLSearchParams */]();
        body.set('name', name);
        body.set('email', email);
        body.set('subject', subject);
        body.set('message', message);
        return this._http.post(this.host + "/api/message", body)
            .map(function (res) { return res.json(); });
        ;
    };
    GeralService.prototype.createUser = function (name, email, cpf, category, institution, phone, password, repassword) {
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* URLSearchParams */]();
        body.set('name', name);
        body.set('email', email);
        body.set('cpf', cpf);
        body.set('type', category);
        body.set('institution', institution);
        body.set('phone', phone);
        body.set('pass', password);
        body.set('pass-repeate', repassword);
        return this._http.post(this.host + "/api/new_user", body)
            .map(function (res) { return res.json(); });
    };
    GeralService.prototype.login = function (email, password) {
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* URLSearchParams */]();
        body.set('pass', password);
        body.set('email', email);
        return this._http.post(this.host + "/api/login", body)
            .map(function (res) { return res.json(); });
    };
    GeralService.prototype.resetPass = function (email) {
        var body = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* URLSearchParams */]();
        body.set('email', email);
        return this._http.post(this.host + "/api/forgot_pass", body)
            .map(function (res) { return res.json(); });
    };
    GeralService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], GeralService);
    return GeralService;
    var _a;
}());
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/geral.service.js.map

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 444;


/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(557);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/main.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom_handler_service__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geral_service__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(304);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(_domHandler, _renderer, _ngZone, _geralService, _formBuilder) {
        this._domHandler = _domHandler;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._geralService = _geralService;
        this._formBuilder = _formBuilder;
        this.isInscriptionProcessing = false;
        this._isLoginModalActive = false;
        this._isNewsModalOpen = false;
        this._isDoingLogin = false;
        this._gtsleft = [];
        this._gtsright = [];
        this._markedNews = { title: '', text: '', created_at: '' };
        this._othersNews = [];
        this._allNews = [];
        this.modalMinicurso = false;
        this.modalOficina = false;
        this.modalMesaRedonda = false;
        this.modalConferencia = false;
        this.modalProgramacao = false;
        this.modalUmaNoticiaModal = false;
        this.modalColoquio = false;
        this.modalInfoScience = false;
        this.modalPublicManagement = false;
        this.modalFeminism = false;
        this.modalInternational = false;
        this.modalTalkingCircle = false;
        this.modalExtension = false;
        this.modalWelfare = false;
        this.modalBeing = false;
        this.modalPrazo = true;
        /** REGISTER FORM */
        this._registerForm = this._formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            mail: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            cpf: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            category: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            institution: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            repeatPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
        });
        /** CONTACT FORM */
        this._contactForm = this._formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            mail: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            subject: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            message: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])]
        });
        /** LOGIN FORM */
        this._loginForm = this._formBuilder.group({
            mail: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])]
        });
        this._resetPasswordForm = this._formBuilder.group({
            mail: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* Validators */].required])]
        });
        this.news = this._geralService.getNews();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._geralService.getGts().
            subscribe(function (gts) {
            var i;
            for (i = 0; i < gts.length / 2 + 1; ++i)
                _this._gtsleft.push(gts[i]);
            for (; i < gts.length; ++i)
                _this._gtsright.push(gts[i]);
        });
        this._geralService.getNews()
            .subscribe(function (news) {
            if (news.length > 0) {
                // this._markedNews = Object.assign({}, news[0]);
                // if(this._markedNews)
                // this._markedNews.text =
                //     this._markedNews.text.substring(0, 200)+'...';
                // if(news[1]) this._othersNews.push(Object.assign({}, news[1]));
                // if(news[2]) this._othersNews.push(Object.assign({}, news[2]));
                // for(let i = 0; i < this._othersNews.length; ++i)
                //     this._othersNews[i].text = this._othersNews[i].text.substring(0, 260)+'...';
                _this._allNews = news;
                console.log(_this._allNews);
            }
        });
    };
    AppComponent.prototype.loginFromMenu = function () {
        this.toggleMenu();
        this._openLogin();
    };
    AppComponent.prototype.goToFromMenu = function (selector) {
        var _this = this;
        this.toggleMenu();
        setTimeout(function () {
            _this._gotTo(selector);
        }, 600);
    };
    AppComponent.prototype.toggleMenu = function () {
        if (this._domHandler.hasClass(document.querySelector('body'), 'menu')) {
            this._domHandler.removeClass(document.querySelector('body'), 'menu');
            this._domHandler.removeClass(document.querySelector('body'), 'overlay');
        }
        else {
            this._domHandler.addClass(document.querySelector('body'), 'menu');
            this._domHandler.addClass(document.querySelector('body'), 'overlay');
        }
    };
    AppComponent.prototype._handleOverlayClick = function () {
        if (this._domHandler.hasClass(document.querySelector('body'), 'menu')) {
            this._domHandler.removeClass(document.querySelector('body'), 'menu');
            this._domHandler.removeClass(document.querySelector('body'), 'overlay');
        }
    };
    AppComponent.prototype._openLogin = function () {
        var _this = this;
        this._isLoginModalActive = !this._isLoginModalActive;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            if (_this._isLoginModalActive) {
                _this._renderer.invokeElementMethod(_this._mailInput.nativeElement, 'focus');
                console.log('a');
            }
        });
    };
    AppComponent.prototype._getViewport = function () {
        // from primeng project
        var win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    };
    AppComponent.prototype.openSub = function (a) {
        if (!this._domHandler.hasClass(document.querySelector('#' + a), 'open')) {
            for (var i = 0; i < document.querySelectorAll('ul div').length; ++i)
                this._domHandler.removeClass(document.querySelectorAll('ul div').item(i), 'open');
            this._domHandler.addClass(document.querySelector('#' + a), 'open');
        }
        else
            this._domHandler.removeClass(document.querySelector('#' + a), 'open');
    };
    AppComponent.prototype._sendMessage = function (e) {
        var _this = this;
        if (!this._contactForm.valid) {
            for (var a in this._contactForm.controls) {
                this._contactForm.controls[a].markAsTouched();
                this._contactForm.controls[a].markAsDirty();
            }
        }
        else {
            this._geralService.sendMessage(this._contactForm.get('name').value, this._contactForm.get('mail').value, this._contactForm.get('message').value, this._contactForm.get('subject').value)
                .subscribe(function (a) {
                if (a.status === 'success') {
                    alert('Mensagem enviada com sucesso.');
                    _this._contactForm.reset();
                }
                else {
                    alert(a.message);
                }
            });
        }
        return false;
    };
    AppComponent.prototype._toggleNewsModal = function () {
        this._isNewsModalOpen = !this._isNewsModalOpen;
    };
    AppComponent.prototype._toggleResetPasswordModal = function () {
        this._isResetPasswordOpen = !this._isResetPasswordOpen;
    };
    AppComponent.prototype._resetPassword = function () {
        var _this = this;
        if (!this._resetPasswordForm.valid) {
            alert('Preencha todos os campos necessários.');
        }
        else {
            this._geralService.resetPass(this._resetPasswordForm.get('mail').value)
                .subscribe(function (a) {
                if (a.status === 'success')
                    alert('Instruções foram enviadas para o seu email.');
            }, function (e) {
                alert(e.json().message);
                _this._isDoingLogin = false;
            });
        }
    };
    AppComponent.prototype._login = function () {
        var _this = this;
        if (!this._loginForm.valid) {
            alert('Preencha todos os campos necessários.');
        }
        else {
            this._isDoingLogin = true;
            this._geralService.login(this._loginForm.get('mail').value, this._loginForm.get('password').value)
                .subscribe(function (a) {
                if (a.status === 'success') {
                    window.location.href = 'https://seminario.ccsa.ufrn.br/dashboard';
                }
                else {
                    alert(a.message);
                }
                _this._isDoingLogin = false;
            }, function (e) {
                alert(e.json().message);
                _this._isDoingLogin = false;
            });
        }
    };
    AppComponent.prototype._register = function () {
        var _this = this;
        if (!this._registerForm.valid) {
            for (var a in this._registerForm.controls) {
                this._registerForm.controls[a].markAsTouched();
                this._registerForm.controls[a].markAsDirty();
            }
        }
        else {
            this.isInscriptionProcessing = true;
            this._geralService.createUser(this._registerForm.get('name').value, this._registerForm.get('mail').value, this._registerForm.get('cpf').value, this._registerForm.get('category').value, this._registerForm.get('institution').value, this._registerForm.get('phone').value, this._registerForm.get('password').value, this._registerForm.get('repeatPassword').value)
                .subscribe(function (a) {
                if (a.status === 'success') {
                    alert('Você foi cadastrado com sucesso!');
                    _this._registerForm.reset();
                    _this._openLogin();
                }
                else {
                    alert(a.message);
                }
                _this.isInscriptionProcessing = false;
            }, function (e) {
                alert(e.json().message);
                _this.isInscriptionProcessing = false;
            });
        }
        return false;
    };
    AppComponent.prototype._gotTo = function (selector) {
        $('main').stop()
            .animate({ scrollTop: $(selector)
                .offset().top - 120 }, 600, 'swing');
    };
    AppComponent.prototype._toggleMinicursoModal = function () {
        this.modalMinicurso = !this.modalMinicurso;
    };
    AppComponent.prototype._toggleOficinaModal = function () {
        this.modalOficina = !this.modalOficina;
    };
    AppComponent.prototype._toggleMesaRedondaModal = function () {
        this.modalMesaRedonda = !this.modalMesaRedonda;
    };
    AppComponent.prototype._toggleConferenciaModal = function () {
        this.modalConferencia = !this.modalConferencia;
    };
    AppComponent.prototype._toggleProgramacaoModal = function () {
        this.modalProgramacao = !this.modalProgramacao;
    };
    AppComponent.prototype._togglePrazoModal = function () {
        this.modalPrazo = !this.modalPrazo;
    };
    AppComponent.prototype._toggleColoquioModal = function () {
        this.modalColoquio = !this.modalColoquio;
    };
    AppComponent.prototype._toggleInfoScienceModal = function () {
        this.modalInfoScience = !this.modalInfoScience;
    };
    AppComponent.prototype._togglePublicManagementModal = function () {
        this.modalPublicManagement = !this.modalPublicManagement;
    };
    AppComponent.prototype._toggleFeminismModal = function () {
        this.modalFeminism = !this.modalFeminism;
    };
    AppComponent.prototype._toggleInternationalModal = function () {
        this.modalInternational = !this.modalInternational;
    };
    AppComponent.prototype._toggleTalkingCircleModal = function () {
        this.modalTalkingCircle = !this.modalTalkingCircle;
    };
    AppComponent.prototype._toggleExtensionModal = function () {
        this.modalExtension = !this.modalExtension;
    };
    AppComponent.prototype._toggleWelfareModal = function () {
        this.modalWelfare = !this.modalWelfare;
    };
    AppComponent.prototype._toggleBeingModal = function () {
        this.modalBeing = !this.modalBeing;
    };
    AppComponent.prototype._toggleUmaNoticiaModal = function (id) {
        var _this = this;
        if (id) {
            this._geralService.getNewsOne(id)
                .subscribe(function (news) {
                _this.umaNoticia = news;
                _this.modalUmaNoticiaModal = !_this.modalUmaNoticiaModal;
            });
        }
        else {
            this.modalUmaNoticiaModal = !this.modalUmaNoticiaModal;
        }
    };
    AppComponent.prototype.abrirUmaNoticia = function (e) {
        this._toggleUmaNoticiaModal(e);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])('mailInput'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _a) || Object)
    ], AppComponent.prototype, "_mailInput", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])('mainContainer'), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _b) || Object)
    ], AppComponent.prototype, "mainContainer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])('downloads'), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === 'function' && _c) || Object)
    ], AppComponent.prototype, "downloads", void 0);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(623),
            providers: [__WEBPACK_IMPORTED_MODULE_1__dom_handler_service__["a" /* DomHandler */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__dom_handler_service__["a" /* DomHandler */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__dom_handler_service__["a" /* DomHandler */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Renderer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Renderer */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__geral_service__["a" /* GeralService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__geral_service__["a" /* GeralService */]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormBuilder */]) === 'function' && _h) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/app.component.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geral_service__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__carousel__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__carousel_videos__ = __webpack_require__(558);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_6__carousel__["a" /* CarouselComponent */],
                __WEBPACK_IMPORTED_MODULE_7__carousel_videos__["a" /* CarouselVideosComponent */], __WEBPACK_IMPORTED_MODULE_7__carousel_videos__["b" /* SafePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__geral_service__["a" /* GeralService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/app.module.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_handler_service__ = __webpack_require__(212);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SafePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselVideosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Pipe */])({ name: 'safeUrl' }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _a) || Object])
    ], SafePipe);
    return SafePipe;
    var _a;
}());
var CarouselVideosComponent = (function () {
    function CarouselVideosComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.news = [];
        this.allNews = ['J7GhZPKWAY0', 'bBATqnFymd4', 'Xq0GvzB1WRA', 'Mzv9h4nUB3k'];
        for (var i = 0; i < 3 && i < this.allNews.length; ++i) {
            this.news.push(i);
        }
    }
    CarouselVideosComponent.prototype.next = function () {
        for (var i = 0; i < this.news.length; i++) {
            if (this.news[i] < this.allNews.length - 1) {
                this.news[i]++;
            }
            else {
                this.news[i] = 0;
            }
        }
    };
    CarouselVideosComponent.prototype.previous = function () {
        for (var i = 0; i < this.news.length; i++) {
            if (this.news[i] > 0) {
                this.news[i]--;
            }
            else {
                this.news[i] = this.allNews.length - 1;
            }
        }
    };
    CarouselVideosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'carousel-videos',
            template: "\n    <div class=\"container-all\">\n        <a class=\"btn left\" (click)=\"previous()\"><</a>\n\n        <!--<div class=\"news-container\">\n          <a class=\"news\" *ngFor=\"let n of news\" (click)=\"abrirDialogo(allNews[n].id)\"\n            (keyup.enter)=\"abrirDialogo(allNews[n].id)\">\n            <h1>{{ allNews[n].title }}</h1>\n            <p [innerHTML]=\"allNews[n].text\"></p>\n          </a>\n        </div>-->\n        <div class=\"news-container\">\n          <a class=\"news\" *ngFor=\"let n of news\">\n              <iframe width=\"auto\" height=\"230\"  [src]=\"('https://www.youtube.com/embed/' + allNews[n]) | safeUrl\" frameborder=\"0\" allowfullscreen></iframe>\n          </a>\n        </div>\n\n        <a class=\"btn right\" (click)=\"next()\">></a>\n      </div>\n    ",
            styles: ["\n\n      .container-all {\n        postion: relative;\n        height: 230px;\n        overflow: hidden;\n        margin-top: 40px;\n      }\n\n      .btn {\n        position: absolute;\n        top: 0;\n        margin-top: 100px;\n        display: block;\n        width: 36px;\n        font-size: 30px;\n        padding: 95px 10px;\n        cursor: pointer;\n        background: #4CAF50;\n        color: white;\n      }\n\n      .btn:hover, .btn:focus {\n        background: #46a049;\n      }\n\n      .btn:active {\n        background: #4CAF50;\n      }\n\n      .btn.left {\n        left: 0;\n      }\n\n      .btn.right {\n        right: 0;\n      }\n\n      .news-container {\n        display: flex;\n        margin: auto 46px;\n      }\n\n      .news {\n        display: block;\n        width: calc( 100% / 3 );\n        padding: 10px 10px;\n      }\n\n    "],
            providers: [__WEBPACK_IMPORTED_MODULE_2__dom_handler_service__["a" /* DomHandler */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _a) || Object])
    ], CarouselVideosComponent);
    return CarouselVideosComponent;
    var _a;
}());
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/carousel-videos.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom_handler_service__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geral_service__ = __webpack_require__(213);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CarouselComponent = (function () {
    function CarouselComponent(_geral) {
        var _this = this;
        this._geral = _geral;
        this.openModal = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.news = [];
        this._geral.getNews()
            .subscribe(function (news) {
            _this.allNews = news;
            _this.allNews.forEach(function (news) {
                news.text = news.text.substring(0, 200) + '...';
            });
            for (var i = 0; i < 3 && i < _this.allNews.length; ++i) {
                _this.news.push(i);
            }
        });
    }
    CarouselComponent.prototype.next = function () {
        for (var i = 0; i < this.news.length; i++) {
            if (this.news[i] < this.allNews.length - 1) {
                this.news[i]++;
            }
            else {
                this.news[i] = 0;
            }
        }
    };
    CarouselComponent.prototype.previous = function () {
        for (var i = 0; i < this.news.length; i++) {
            if (this.news[i] > 0) {
                this.news[i]--;
            }
            else {
                this.news[i] = this.allNews.length - 1;
            }
        }
    };
    CarouselComponent.prototype.abrirDialogo = function (id) {
        this.openModal.emit(id);
    };
    CarouselComponent.prototype.ngOnInit = function () { };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === 'function' && _a) || Object)
    ], CarouselComponent.prototype, "openModal", void 0);
    CarouselComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'carousel',
            template: "\n    <div class=\"container-all\">\n        <a class=\"btn left\" (click)=\"previous()\"><</a>\n\n        <div class=\"news-container\">\n          <a class=\"news\" *ngFor=\"let n of news\" (click)=\"abrirDialogo(allNews[n].id)\"\n            (keyup.enter)=\"abrirDialogo(allNews[n].id)\">\n            <h1>{{ allNews[n].title }}</h1>\n            <p [innerHTML]=\"allNews[n].text\"></p>\n          </a>\n        </div>\n\n        <a class=\"btn right\" (click)=\"next()\">></a>\n      </div>\n    ",
            styles: ["\n\n      .container-all {\n        postion: relative;\n        height: 230px;\n        overflow: hidden;\n        margin-top: 40px;\n      }\n\n      .btn {\n        position: absolute;\n        top: 0;\n        margin-top: 100px;\n        display: block;\n        width: 36px;\n        background: rgb(170, 170, 170);\n        font-size: 30px;\n        padding: 95px 10px;\n        cursor: pointer;\n        background: #fcb813;\n      }\n\n      .btn:hover, .btn:focus {\n        background: #edaa10;\n      }\n\n      .btn:active {\n        background: #f4bf4b;\n      }\n\n      .btn.left {\n        left: 0;\n      }\n\n      .btn.right {\n        right: 0;\n      }\n\n      .news-container {\n        display: flex;\n        margin: auto 46px;\n      }\n\n      .news {\n        display: block;\n        width: calc( 100% / 3 );\n        padding: 10px 10px;\n        cursor: pointer;\n      }\n\n      .news:hover, .news:focus {\n        background: rgba(238, 238, 238, 0.8);\n      }\n\n      .news h1 {\n        font-size: 14px;\n        font-weight: bold;\n      }\n\n      .news p {\n        font-size: 12px;\n      }\n\n    "],
            providers: [__WEBPACK_IMPORTED_MODULE_1__dom_handler_service__["a" /* DomHandler */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__geral_service__["a" /* GeralService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__geral_service__["a" /* GeralService */]) === 'function' && _b) || Object])
    ], CarouselComponent);
    return CarouselComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/carousel.js.map

/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/luccas/Projetos/seminario-ccsa-2018/src/environment.js.map

/***/ }),

/***/ 623:
/***/ (function(module, exports) {

module.exports = "<!-- OVERLAY --> <div class=\"backdrop\"></div>\n<div (click)=\"_handleOverlayClick()\" class=\"overlay\"></div>\n<nav class=\"menu-mobile\">\n  <a href=\"http://sigeva.ccsa.ufrn.br/login\">Entrar</a>\n  <a (click)=\"goToFromMenu('#s-inscription')\" (keypress.enter)=\"goToFromMenu('#s-inscription')\">Inscrição</a>\n  <!--<a>Programação</a>-->\n  <!-- <a (click)=\"goToFromMenu('#s-comment')\" (keypress.enter)=\"goToFromMenu('#s-comment')\">Contato</a> -->\n</nav>\n<!-- END - OVERLAY -->\n\n<header>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12 text-right\">\n        <a class=\"open-menu-mobile\" style=\"float:left; font-size: 18px; padding-top: 6px;\" (click)=\"toggleMenu()\" (keypress.enter)=\"toggleMenu()\">\n          <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n        </a>\n\n        <a style=\"float: right; display: block; cursor: pointer; padding-left: 10px;\" class=\"login-container\">\n          <a class=\"login\" tabindex=\"0\" href=\"http://sigeva.ccsa.ufrn.br/login\">ENTRAR</a>\n\n          <div class=\"login\" [ngClass]=\"{'open': _isLoginModalActive}\">\n            <div class=\"l\">\n              <form [formGroup]=\"_loginForm\" (ngSubmit)=\"_login($event)\" novalidate>\n                <input #mailInput placeholder=\"Email\" formControlName=\"mail\">\n                <input type=\"password\" placeholder=\"Senha\" formControlName=\"password\">\n                <button type=\"submit\" style=\"cursor: pointer;\" [disabled]=\"_isDoingLogin\">{{ _isDoingLogin ? 'AGUARDE...' : 'LOGIN' }}</button>\n              </form>\n            </div>\n            <div class=\"forgot\" style=\"color: black;\">\n              <a (click)=\"_toggleResetPasswordModal()\" (keypress.enter)=\"_toggleResetPasswordModal()\">Esqueci a senha</a>\n            </div>\n          </div>\n        </a>\n\n        <a class=\"login\" tabindex=\"0\" (click)=\"_gotTo('#s-inscription')\" (keypress.enter)=\"_gotTo('#s-inscription')\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        INSCREVER-SE\n                </a>\n\n        <!-- <a class=\"login\" tabindex=\"0\" (click)=\"_gotTo('#s-comment')\" (keypress.enter)=\"_gotTo('#s-comment')\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        CONTATO\n                </a> -->\n\n        <a class=\"login\" tabindex=\"0\" (click)=\"_toggleNewsModal('#s-comment')\" (keypress.enter)=\"_toggleNewsModal('#s-comment')\"\n          style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        NOTÍCIAS\n                </a>\n\n        <!-- <a class=\"login\" tabindex=\"0\" href=\"http://www.seminario2016.ccsa.ufrn.br\" target=\"_blank\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        ANAIS 2016\n                </a> -->\n\n        <!-- <a class=\"login\" tabindex=\"0\" (click)=\"_toggleProgramacaoModal()\" (keypress.enter)=\"_toggleProgramacaoModal()\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        PROGRAMAÇÃO\n                </a> -->\n\n        <!-- <a class=\"login\" tabindex=\"0\" (click)=\"_toggleConferenciaModal()\" (keypress.enter)=\"_toggleConferenciaModal()\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        CONFERÊNCIAS\n                </a> -->\n\n        <!-- <a class=\"login\" tabindex=\"0\" (click)=\"_toggleMesaRedondaModal()\" (keypress.enter)=\"_toggleMesaRedondaModal()\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        MESAS-REDONDAS\n                </a> -->\n\n        <!-- <a class=\"login\" tabindex=\"0\" (click)=\"_toggleOficinaModal()\" (keypress.enter)=\"_toggleOficinaModal()\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        OFICINAS\n                </a> -->\n\n        <!-- <a class=\"login\" tabindex=\"0\" (click)=\"_toggleMinicursoModal()\" (keypress.enter)=\"_toggleMinicursoModal()\" style=\"cursor:pointer;float: right; display: block; padding: 10px; padding-top: 14px;\n                    height: 40px; margin-right: 10px;\">\n                        MINICURSOS\n                </a> -->\n\n        <!--<a\n                class=\"login\"\n                tabindex=\"0\"\n                style=\"float: right; display: block; padding: 10px; padding-top: 14px; height: 40px; margin-right: 10px;\"\n                href=\"https://facebook.com/ccsa.ufrn\" target=\"_blank\"><i class=\"fa fa-facebook\" aria-hidden=\"true\"></i></a>\n\n                <a\n                class=\"login\"\n                tabindex=\"0\"\n                style=\"float: right; display: block; padding: 10px; padding-top: 14px; height: 40px;\"\n                href=\"https://ccsa.ufrn.br\" target=\"_blank\"><i class=\"fa fa-wordpress\" aria-hidden=\"true\"></i></a>-->\n\n      </div>\n    </div>\n  </div>\n</header>\n\n<main #mainContainer>\n\n  <section class=\"logo\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <picture>\n            <!-- greater size to lower size -->\n            <source srcset=\"assets/ng2/marca.png\" media=\"(min-width: 768px)\">\n            <source srcset=\"assets/ng2/marca.png\" media=\"(min-width: 0px)\">\n            <img width=\"100%\" alt=\"Marca - Seminário de Pesquisa do CCSA\">\n          </picture>\n          <h2>14 a 18 de maio de 2018</h2>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"pattern3\"></div>\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <nav class=\"main\">\n          <a class=\"blue\" href=\"https://docs.google.com/document/d/1wdtHDS5PEy-safMX-DwzWBhEikMLtzQHRSP9jHB00cQ/edit\">Programação</a>\n          <a class=\"blue\" (click)=\"_toggleColoquioModal()\" (keypress.enter)=\"_toggleColoquioModal()\">Subeventos</a>\n          <a class=\"red\" (click)=\"_gotTo('#s-inscription')\" (keypress.enter)=\"_gotTo('#s-inscription')\">Inscreva-se</a>\n          <a class=\"yellow\" href=\"http://sigeva.ccsa.ufrn.br/login\">Acessar</a>\n        </nav>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"container \">\n    <div class=\"row\">\n      <div class=\"col-12 hidden-md-down\">\n        <div class=\"pattern3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <section class=\"presentation\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <b>O 23º Seminário de Pesquisa do CCSA/UFRN – Desenvolvimento e Democracia no Brasil: do que estamos falando? – </b> evidencia a preocupação do Centro de Ciências Sociais\n          Aplicadas em consolidar um espaço para discussão e socialização do conhecimento produzido nas diferentes áreas\n          das ciências sociais aplicadas (Direito, Economia, Administração, Serviço Social, Ciências Contábeis, Turismo e\n          Biblioteconomia)\n        </div>\n        <div class=\"col-md-6\">\n          Tem como objetivo tornar acessível à comunidade universitária a produção científica existente no CCSA por meio da divulgação\n          dos trabalhos apresentados; estimular a comunidade acadêmica do CCSA para a prática da pesquisa; contribuir para\n          o desenvolvimento da pesquisa e da reflexão teórico-metodológica no campo das Ciências Sociais Aplicadas; abrir\n          espaço para interlocução com outras áreas do conhecimento.\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"pattern3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <!-- <section class=\"news\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <h1>NOVIDADES</h1>\n        </div>\n      </div>\n\n      <carousel-videos></carousel-videos>\n\n    </div>\n  </section>\n\n  <section class=\"news\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <h1>NOTÍCIAS</h1>\n          <a (click)=\"_toggleNewsModal()\" (keyup.enter)=\"_toggleNewsModal()\" class=\"more-news\">TODAS AS NOTÍCIAS</a>\n        </div>\n      </div>\n\n      <carousel (openModal)=\"abrirUmaNoticia($event)\" ></carousel>\n\n    </div>\n  </section>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"pattern2\"></div>\n      </div>\n    </div>\n  </div> -->\n\n  <section class=\"downloads\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <h1 id=\"s-downloads\">DOWNLOADS</h1>\n          <nav>\n            <a href=\"assets/ng2/download/normas.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_01.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_01_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Normas\n            </a>\n            <a href=\"assets/ng2/download/XXIII SPCCSA template.poster.zip\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Template para Pôster\n            </a>\n            <a href=\"assets/ng2/download/XXIII SPCCSA template.artigo.zip\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Template para Artigo\n            </a>\n            <a href=\"assets/ng2/download/XXIII SPCCSA template.casoensino.zip\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Template para Casos para Ensino\n            </a>\n            <a href=\"assets/ng2/download/credits/creditoadministracao.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Administração\n            </a>\n            <a href=\"assets/ng2/download/credits/creaditocontabeis.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Ciências Contábeis\n            </a>\n            <a href=\"assets/ng2/download/credits/creaditocienciaseconomicas.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Ciências Econômicas\n            </a>\n            <a href=\"assets/ng2/download/credits/creditodireito.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Direito\n            </a>\n            <a href=\"assets/ng2/download/credits/creditoturismo.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Turismo\n            </a>\n            <a href=\"assets/ng2/download/credits/creditobiblioteconomia.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Biblioteconomia\n            </a>\n            <a href=\"assets/ng2/download/credits/creditoservicosocial.pdf\" target=\"_blank\">\n              <picture>\n                <!-- greater size to lower size -->\n                <source srcset=\"assets/ng2/download_02.png\" media=\"(min-width: 768px)\">\n                <source srcset=\"assets/ng2/download_02_mobile.png\" media=\"(min-width: 0px)\">\n                <img alt=\"Marca - Seminário de Pesquisa do CCSA\">\n              </picture>\n              Créditos para Serviço Social\n            </a>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"pattern1\"></div>\n      </div>\n    </div>\n  </div>\n\n  <section class=\"thematic-groups\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <h1><span>GRUPOS</span> TEMÁTICOS</h1>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6\">\n          <ul class=\"main\">\n            <li *ngFor=\"let i of _gtsleft;let k2 = index;\">\n              <div class=\"ball\"></div>\n              <span>{{ i.name }}</span>\n              <ul>\n                <li *ngFor=\"let j of i.tgs; let k = index;\">\n                  <a (click)=\"openSub('div'+ k +'left'+ k2)\" (keypress.enter)=\"openSub('div'+ k +'left'+ k2)\">{{ j.name }}</a>\n                  <div id=\"div{{ k }}left{{ k2 }}\">\n                    <p class=\"coordinators\">{{ j.coordinators }}</p>\n                    <p class=\"description\">{{ j.syllabus }}</p>\n                  </div>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </div>\n\n        <div class=\"col-md-6\">\n          <ul class=\"main\">\n            <li *ngFor=\"let i of _gtsright; let k2 = index;\">\n              <div class=\"ball\"></div>\n              <span>{{ i.name }}</span>\n              <ul>\n                <li *ngFor=\"let j of i.tgs; let k = index;\">\n                  <a (click)=\"openSub('div'+ k +'right'+ k2)\" (keypress.enter)=\"openSub('div'+ k +'left'+ k2)\">{{ j.name }}</a>\n                  <div id=\"div{{ k }}right{{ k2 }}\">\n                    <p class=\"coordinators\">{{ j.coordinators }}</p>\n                    <p class=\"description\">{{ j.syllabus }}</p>\n                  </div>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </section>\n  <!-- end / section.thematic-group -->\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"pattern3\"></div>\n      </div>\n    </div>\n  </div>\n\n  <section class=\"register\" style=\"margin: 0;\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <h1 id=\"s-inscription\">INSCRIÇÕES <span>ATÉ 12 DE MAIO</span></h1>\n          <p>A partir de sua 23º edição o <strong>Seminário de Pesquisa do CCSA</strong> utilizará a plataforma Sigeva (Sistema de Gestão de Eventos Acadêmicos), desenvolvida\n          para suportar eventos do CCSA. Para efetuar inscrição no evento é necessário criar uma conta na plataforma que pode ser acessada pelo endereço\n          <a href=\"http://sigeva.ccsa.ufrn.br\" target=\"_blank\">http://sigeva.ccsa.ufrn.br</a>.</p>\n          <p>ATENÇÃO: Após criar uma conta no Sigeva deve-se fazer a inscrição na página do evento, que pode ser facilmente localizada na página inicial da plataforma. O usuário que não se inscrever no Sigeva e no evento não poderá ser citado como coautor em artigos, posteres e casos para ensino assim como não poderá ser inscrito como expositor em oficinas ou minicursos</p>\n          <a href=\"http://sigeva.ccsa.ufrn.br\" class=\"sigeva-btn\">Acessar o Sigeva</a>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <div class=\"pattern3\"></div>\n      </div>\n    </div>\n  </div>\n    <section class=\"contact\" style=\"margin:0;\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <h1 id=\"s-comment\">CONTATO</h1>\n\n          <form [formGroup]=\"_contactForm\" (ngSubmit)=\"_sendMessage($event)\" novalidate>\n            <div class=\"form-control\">\n              <label>NOME:</label>\n              <input placeholder=\"Nome Completo\" formControlName=\"name\">\n\n              <div *ngIf=\"_contactForm.get('name').errors && (_contactForm.get('name').dirty || _contactForm.get('name').touched)\">\n                <p [hidden]=\"!_contactForm.get('name').hasError('required')\">É obrigatório</p>\n              </div>\n            </div>\n\n            <div class=\"form-control\">\n              <label>EMAIL:</label>\n              <input placeholder=\"Email\" formControlName=\"mail\">\n\n              <div *ngIf=\"_contactForm.get('mail').errors && (_contactForm.get('mail').dirty || _contactForm.get('mail').touched)\">\n                <p [hidden]=\"!_contactForm.get('mail').hasError('required')\">É obrigatório</p>\n              </div>\n            </div>\n\n            <div class=\"form-control\">\n              <label>ASSUNTO:</label>\n              <input placeholder=\"Assunto\" formControlName=\"subject\">\n\n              <div *ngIf=\"_contactForm.get('subject').errors && (_contactForm.get('subject').dirty || _contactForm.get('subject').touched)\">\n                <p [hidden]=\"!_contactForm.get('subject').hasError('required')\">É obrigatório</p>\n              </div>\n            </div>\n\n            <div class=\"form-control\">\n              <label>MENSAGEM:</label>\n              <textarea placeholder=\"Mensagem\" formControlName=\"message\"></textarea>\n\n              <div *ngIf=\"_contactForm.get('message').errors && (_contactForm.get('message').dirty || _contactForm.get('message').touched)\">\n                <p [hidden]=\"!_contactForm.get('message').hasError('required')\">É obrigatório</p>\n              </div>\n            </div>\n\n            <button type=\"submit\">ENVIAR</button>\n          </form>\n\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"support\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"support-container\">\n            <div class=\"item\">\n              <h1>REALIZAÇÃO</h1>\n              <div class=\"support-container\">\n                <img src=\"assets/ng2/ufrn.png\">\n                <img src=\"assets/ng2/ccsa.png\">\n              </div>\n            </div>\n            <div class=\"item\">\n              <h1>APOIO</h1>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n  <!-- end / support -->\n\n  <footer>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n          ISSN 1808 6381 - <a href=\"https://ccsa-ufrn.github.io/\" target=\"_black\">ATCCSA</a>\n        </div>\n      </div>\n    </div>\n  </footer>\n\n</main>\n\n<div class=\"modal-news\" [ngClass]=\"{'open': _isNewsModalOpen}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      NOTÍCIAS\n      <a (click)=\"_toggleNewsModal()\" (keypress.enter)=\"_toggleNewsModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n\n      <ul>\n        <li *ngFor=\"let n of _allNews\">\n          <h1>{{ n.data.title }}</h1>\n          <p [innerHTML]=\"n.data.text\"></p>\n        </li>\n      </ul>\n\n    </div>\n  </div>\n</div>\n\n\n<div class=\"modal-reset-password\" [ngClass]=\"{'open': _isResetPasswordOpen}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      RECUPERAR SENHA\n      <a (click)=\"_toggleResetPasswordModal()\" (keypress.enter)=\"_toggleResetPasswordModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n      <form [formGroup]=\"_resetPasswordForm\">\n        <input placeholder=\"Email\" formControlName=\"mail\">\n        <button (click)=\"_resetPassword()\" (keypress.enter)=\"_resetPassword()\">OK</button>\n      </form>\n    </div>\n  </div>\n</div>\n\n<!-- MODALS NOVOS -->\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalMinicurso}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      MINICURSOS\n      <a (click)=\"_toggleMinicursoModal()\" (keypress.enter)=\"_toggleMinicursoModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n\n      <ul>\n        <li> 1. A ATUAÇÃO ESTATAL NA INTERNAÇÃO CONTRA A VONTADE DE CONSUMIDORES DE SUBSTÂNCIAS PSICOATIVAS</li>\n        <li> 2. A IMPORTÂNCIA E A AVALIAÇÃO DOS CONTROLES INTERNOS DE UMA EMPRESA – ROTINAS INTERNAS, ACESSOS, SEGREGAÇÃO DE FUNÇÕES,\n          AMARRAÇÕES, LIMITAÇÕES DE CONTROLE, DESFALQUES TEMPORÁRIOS E PERMANENTES</li>\n        <li> 3. A RESPONSABILIDADE CIVIL EXTRACONTRATUAL DO ESTADO PELA PRESTAÇÃO DE SERVIÇOS DE SAÚDE PÚBLICA</li>\n        <li> 4. ANÁLISE DE DADOS CONTÁBEIS COM A UTILIZAÇÃO DAS FERRAMENTAS ESTATÍSTICA DO MICROSOFT EXCEL – TEORIA E PRÁTICA</li>\n        <li> 5. COMO ELABORAR PEÇAS PROCESSUAIS CONSTITUCIONAIS -Turma 01: ADI, ADC, ADO e ADPF</li>\n        <li> 6. COMO SUBMETER COM SUCESSO UM ARTIGO PARA UM PERIÓDICO CIENTÍFICO EM TURISMO: EXPERIÊNCIAS E TÉCNICAS</li>\n        <li> 7. COMUNICAÇÃO EMPÁTICA</li>\n        <li> 8. CONVIVÊNCIA COM O SEMIÁRIDO BRASILEIRO</li>\n        <li> 9. DEFININDO ESTRATÉGIAS PARA ALAVANCAR O SUCESSO EMPRESARIAL COM OS REQUISITOS DA NORMA ISO 9001:2015 – SISTEMA\n          DE GESTÃO DA QUALIDADE</li>\n        <li> 10. ELABORANDO ARTIGOS CIENTÍFICOS: Foco nos Discentes de Ciências Contábeis” </li>\n        <li> 11. ESTATUTO DA CIDADE E PLANO DIRETOR: ESTUDANDO ASPECTOS ESSENCIAIS DA POLÍTICA URBANA NO BRASIL </li>\n        <li> 12. EXCEL AVANÇADO APLICADO NAS EMPRESAS </li>\n        <li> 13. IMPORTÂNCIA DOS TRIBUTOS NO DESEMPENHO DA EMPRESA BRASILEIRA </li>\n        <li> 14. IN VERBIS- NORMAS DA ABNT E PESQUISA CIENTÍFICA: PARA ENTENDER, PRODUZIR E PUBLICAR</li>\n        <li> 15. INTRODUÇÃO À GESTÃO DE PROCESSOS </li>\n        <li> 16. INTRODUÇÃO À TEORIA DA ESPECULAÇÃO </li>\n        <li> 17. INTRODUÇÃO AO R </li>\n        <li> 18. INVESTINDO EM AÇÕES E EM RENDA FIXA </li>\n        <li> 19. MAPEAMENTO DE PROCESSOS COM O BIZAGI UTILIZANDO BPMN </li>\n        <li> 20. MATEMÁTICA FINANCEIRA COM UTILIZAÇÃO DA HP12C </li>\n        <li> 21. MICROGERAÇÃO DE ENERGIA ELÉTRICA E SUA REGULAÇÃO</li>\n        <li> 22. MONITORAMENTO E CONTROLE DE PROJETOS</li>\n        <li> 23. MULHER, MERCADO DE TRABALHO E A AGENDA DO TRABALHO DECENTE DA OIT</li>\n        <li> 24. NORMALIZAÇÃO DE TRABALHOS ACADÊMICOS</li>\n        <li> 25. NORMATIZAÇÃO ABNT REFERÊNCIAS CITAÇÕES EM TRABALHOS CIENTIFICOS</li>\n        <li> 26. NOTAS EXPLICATIVAS: QUE BICHO É ESSE?</li>\n        <li> 27. OS DESAFIOS NA SOCIEDADE CONTEMPORÂNEA NO COMBATE AO TRABALHO INFANTIL RURAL E SEXUAL</li>\n        <li> 28. PLÁGIO NA ACADEMIA: TIPOS, CARACTERÍSTICA E COMO EVITAR</li>\n        <li> 29. POR UMA NOVA HERMENÊUTICA DOS DIREITOS FUNDAMENTAIS: DEVERES DO ESTADO PARA COM AS POLÍTICAS PÚBLICAS</li>\n        <li> 30. PROCESSO CONSTITUCIONAL BRASILEIRO</li>\n        <li> 31. PROPORCIONALIDADE VS MORALIDADE</li>\n        <li> 32. SETOR PESSOAL</li>\n        <li> 33. SOCIEDADE DE DEBATES: ENSAIOS DE LÓGICA ARGUMENTATIVA E DESENVOLVIMENTO DE ORATÓRIA</li>\n        <li> 34. USO DE BASES DE DADOS E FERRAMENTAS DE OTIMIZAÇÃO DE PESQUISA</li>\n        <li> 35. A PRÁTICA DO ASSISTENTE SOCIAL NA EDUCAÇÃO</li>\n        <li> 36. ANÁLISE DA VIABILIDADE ECONÔMICA DE UM EVENTO</li>\n        <li> 37. ARTE E MARXISMO</li>\n        <li> 38. CONSERVAÇÃO E RESTAURAÇÃO DE LIVROS</li>\n        <li> 39. DA SINDICÂNCIA E DO PROCESSO ADMINISTRATIVO DISCIPLINAR</li>\n        <li> 40. DIREITO E DESENVOLVIMENTO: O PROTAGONISMO CIDADÃO NA CONSTRUÇÃO DE UM DESENVOLVIMENTO SUSTENTÁVEL</li>\n        <li> 41. DIREITOS DOS ANIMAIS: UM OLHAR DO DIREITO PARA ALÉM DO HUMANO.</li>\n        <li> 42. DIVERSIDADE HUMANA, SEXUALIDADES E FEMINISMO: A PRESENÇA DA MULHER NA LITERATURA E DESAFIOS CONTEMPORÂNEOS</li>\n        <li> 43. FOTOGRAFIA E TURISMO: O QUE SE PODE VER ALÉM DO OLHAR</li>\n        <li> 44. INDEXAÇÃO DE IMAGENS</li>\n        <li> 45. INFORMAÇÃO DIGITAL ACESSÍVEL</li>\n        <li> 46. INTERACIONISMO SIMBÓLICO E ETNOMETODOLOGIA: PROPOSIÇÕES METODOLÓGICAS PARA PESQUISAS NA ADMINISTRAÇÃO PÚBLICA</li>\n        <li> 47. INTRODUÇÃO À REDAÇÃO DE PARECER JURÍDICO - CASO ANARQUISTA</li>\n        <li> 48. INTRODUÇÃO AO DIREITO DA PROPRIEDADE INTELECTUAL</li>\n        <li> 49. MÉTODOS QUANTITATIVOS: CORRELAÇÃO E REGRESSÃO SIMPLES</li>\n        <li> 50. O DIREITO À CIDADE E A VIOLÊNCIA DE GENERO</li>\n        <li> 51. O ENFRENTAMENTO DA QUESTÃO SOCIAL E EMANCIPAÇÃO HUMANA NA PERSPECTIVA JURIDICA: OS LIMITES DO DIREITO E SEU CARÁTER\n          DE CLASSE</li>\n        <li> 52. PATRIMÔNIO CULTURAL E TURISMO NO BRASIL: CIDADE HISTÓRICAS COMO CIDADES TURÍSTICAS.</li>\n        <li> 53. PATRIMÔNIO HISTÓRICO E CULTURAL DE NATAL NA ÓTICA DO TURISMO</li>\n        <li> 54. SEUS DADOS PESSOAIS E A INTERNET: SITUAÇÃO DO DIREITO FUNDAMENTAL À PRIVACIDADE NA ERA DAS REDES SOCIAIS</li>\n        <li> 55. SUSTENTABILIDADE SOCIOAMBIENTAL NA ADMINISTRAÇÃO PÚBLICA</li>\n        <li> 56. TRUQUES DO WORD NA NORMATIZAÇÃO DE TRABALHOS ACADÊMICOS</li>\n        <li> 57. AS LIÇÕES DE DIREITO DA TRILOGIA TEBANA DE SÓFOCLES: DE LAIO A ANTÍGONA</li>\n        <li> 58. ASPECTOS GERAIS E AS MUDANÇAS APRESENTADAS PELO NOVO MARCO REGULATÓRIO DO TERCEIRO SETOR</li>\n        <li> 59. AUDITORIA CONTÁBIL DE “ASSURANCE” NA PRÁTICA</li>\n        <li> 60. CONSULTORIA ORGANIZACIONAL</li>\n        <li> 61. DESMISTIFICANDO O MESTRADO: A PREPARAÇÃO, O INGRESSO, O CURSO E SUAS POSSIBILIDADES</li>\n        <li> 62. DESMISTIFICANDO TRABALHOS CIENTÍFICOS</li>\n        <li> 63. DIREITO AMBIENTAL</li>\n        <li> 64. DIREITO, POLÍTICA TRIBUTÁRIA E DESIGUALDADES SOCIAIS: UM ESTUDO INTRODUTÓRIO</li>\n        <li> 65. EXCEL AVANÇADO APLICADO NAS EMPRESAS</li>\n        <li> 66. FINANÇAS PESSOAIS: MUDE SEUS HÁBITOS E TENHA SAÚDE FINANCEIRA CAPAZ DE TRANSFORMAR SUA VIDA ECONÔMICA EM UMA\n          VIDA DE SUCESSO</li>\n        <li> 67. GERENCIAMENTO DE TEMPO: FACILITANDO A VIDA DOS ALUNOS DA GRADUAÇÃO</li>\n        <li> 68. INTRODUÇÃO À AVALIAÇÃO DE EMPRESAS (VALUATION) </li>\n        <li> 69. LEVANTAMENTO E INTERPRETAÇÃO DE DADOS SOCIOECONÔMICOS DO IPEADATA</li>\n        <li> 70. MARKETING JURÍDICO</li>\n        <li> 71. O PODER DO PENSAMENTO INOVADOR – Como definir metas, alcança-las e inspirar pessoas </li>\n        <li> 72. SISTEMAS E SOFTWARES LIVRES PARA TODOS: UMA ABORDAGEM FILOSÓFICA E SOCIOECONÔMICA BASEADA NA PROPRIEDADE COLETIVA\n          DOS MEIOS DE PRODUÇÃO DIGITAIS </li>\n      </ul>\n\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalOficina}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      OFICINAS\n      <a (click)=\"_toggleOficinaModal()\" (keypress.enter)=\"_toggleOficinaModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n\n      <ul>\n        <li>EXPLORANDO A BASE DE DADOS ECONOMÁTICA® José Mauro Madeiros Velôso Soares e Diogo Henrique Silva Lima Matutino</li>\n        <li>MENDELEY, PESQUISA CIENTIFICA E GERENCIAMENTO DE BIBLIOGRAFIAS Victor Hugo da Silva Matutino</li>\n        <li>OFICINA DE ARTIGOS CIENTÍFICOS – ESTRUTURA BÁSICA Jair Soares de Oliveira Segundo Matutino</li>\n        <li>METODOLOGIA DO TRABALHO CIENTÍFICO NO TURISMO Mayara Ferreira de Farias Vespertino</li>\n        <li>MÉTODOS E TÉCNICAS DE ELABORAÇÃO DE PROJETOS DE PESQUISA Mauro Lemuel Alexandre Vespertino</li>\n        <li>MÉTODOS QUANTITATIVOS APLICADOS AO TURISMO Victor Hugo da Silva Vespertino</li>\n        <li>MOSTRA DE CINEMA: GASTRONOMIA SUSTENTÁVEL (COCA-COLA – VOCÊ SABE O QUE ESTÁ TOMANDO?) Sueli Aparecida Moreira Vespertino</li>\n        <li>MOSTRA DE CINEMA: GASTRONOMIA SUSTENTÁVEL (COWSPIRACY: O SEGREDO DA SUSTENTABILIDADE) Sueli Aparecida Moreira Vespertino</li>\n        <li>MOSTRA DE CINEMA: GASTRONOMIA SUSTENTÁVEL (O LADO NEGRO DO CHOCOLATE) Sueli Aparecida Moreira Vespertino</li>\n        <li>MOSTRA DE CINEMA: GASTRONOMIA SUSTENTÁVEL (PÃO NOSSO DE CADA DIA) Sueli Aparecida Moreira Vespertino</li>\n        <li>MOSTRA DE CINEMA: GASTRONOMIA SUSTENTÁVEL (PIPOCA GOURMET)  Sueli Aparecida Moreira Vespertino</li>\n        <li>OFICINA DE CASOS JURÍDICOS - CASO “ANARQUISTA” Fabrízia Pessoa Serafim e Jair Soares Vespertino</li>\n        <li>A TEORIA CONSTITUCIONAL DO PROCESSO PENAL E A SEGURANÇA PÚBLICA: ASPECTOS POLÊMICOS NO RN Renata Araújo Soares Noturno</li>\n        <li>CADASTRO E SUBMISSÃO DE ARTIGOS EM REVISTAS DE TURISMO Mayara Ferreira de Farias Noturno</li>\n        <li>CADASTRO E UTILIZAÇÃO DAS FERRAMENTAS DA PLATAFORMA LATTES Mayara Ferreira de Farias Noturno</li>\n        <li>ELABORAÇÃO DE ARTIGOS CIENTÍFICOS EM TURISMO Mayara Ferreira de Farias Noturno</li>\n        <li>OFICINE III - POR TRÁS DA TELA: O PAPEL DO CINEMA NA TRANSFORMAÇÃO SOCIAL DE ATORES EM CONTEXTO DE VIOLÊNCIA E CRIMINALIDADE\n          Fábio Ataíde e Marcus Aurélio Freitas Barros Noturno</li>\n        <li>DINAMICAS E JOGOS PARA ORGANIZAÇÕES DE TRABALHO. Antonio Alves Filho Noturno</li>\n      </ul>\n\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalMesaRedonda}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      MESAS REDONDAS\n      <a (click)=\"_toggleMesaRedondaModal()\" (keypress.enter)=\"_toggleMesaRedondaModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n\n      <ul>\n        <li>1. A INSERÇÃO DO RIO GRANDE DO NORTE NOS SISTEMA AGROALIMENTARES GLOBALIZADOS: UMA ANÁLISE DO CASO DA FRUTICULTURA\n          A PARTIR DO CONCEITO DE VALOR AGREGADO Emanoel Márcio Nunes Walter Belik, Representante da Cooperativa de Produtores\n          do Melão e Representante do Sebrae Matutino</li>\n        <li>2. A MILITARIZAÇÃO ESCOLAR: UMA BOA SAÍDA PARA INEFICIÊNCIA ESTATAL NA PROMOÇÃO DO DIREITO À EDUCAÇÃO? Ângelo José\n          Menezes Silvino Gabriel Miranda Brito, José Willington Germano e Ana Beatriz Ferreira Rebello Presgrave Matutino</li>\n        <li>3. AGROTÓXICOS X AGROECOLOGIA: UM NECESSÁRIO DEBATE ENTRE ACADEMIA, INSTITUIÇÕES PÚBLICAS E SOCIEDADE Marise Costa\n          de Souza Duarte Joyce Naiana Paiva de Lima, João Hélio Cavalcanti e Tibério Clemente Rodrigues de Souza Matutino</li>\n        <li>4. ANÁLISE COMPARATIVA DA QUESTÃO HÍDRICA DO NORDESTE BRASILEIRO E DA ÁSIA CENTRAL: FALTA D’ÁGUA OU MÁ ADMINISTRAÇÃO\n          DE RECURSOS? Ângelo José Menezes Silvino Luiza Fernandes de Abrantes Barbosa, Breno Fabrício da Silva Santos e\n          Daniel César Neves e Silva Matutino</li>\n        <li>5. ASPECTOS GERAIS DO CPC/15 - DISCUSSÕES CRÍTICAS Fabiana Dantas Soares Alves da Mota Ana Beatriz Ferreira Rebello\n          Presgrave e Rafaela Oliveira Reis Cadó Matutino</li>\n        <li>6. CAMINHOS PARA PÓS-GRADUAÇÃO Kesia Cristine Melo Alunos da pós-graduação do CCSA Matutino</li>\n        <li>7. CIBERCONDRIA: UM PERIGO EMINENTE Thelma Pìgnataro Alunos do curso de Administração: Marketing Matutino</li>\n        <li>8. DIVERSIDADE E PROBLEMAS DE GÊNERO NA INTERNET Mariana de Siqueira Gustavo Paiva, Monalisa de Souza e Martha da\n          Costa Matutino</li>\n        <li>9. DIVERSIDADE HUMANA E MARXISMO: DIVERSIDADE SEXUAL E A QUESTÃO DAS DROGAS EM DISCUSSÃO Mariana de Siqueira Gustavo\n          Paiva, Monalisa de Souza e Martha da Costa Matutino</li>\n        <li>10. LÊNIN, ZAPATA E O CONSTITUCIONALISMO BRASILEIRO: UMA ANÁLISE DO CENTENÁRIO DAS REVOLUÇÕES SOCIAIS Mariana de\n          Siqueira Gustavo Barbosa, Gabriel Vitullo e Zéu Palmeira Matutino</li>\n        <li>11. NA PRÁTICA, A TEORIA É OUTRA? INSTRUMENTALIDADE NA PERSPECTIVA DO PROJETO ÉTICO-POLÍTICO DO SERVIÇO SOCIAL BRASILEIRO\n          Tibério Lima Henrique Wellen, Silvana Mara de Morais dos Santos e Daniela Neves Matutino</li>\n        <li>12. O ENFRENTAMENTO À VIOLÊNCIA SEXUAL CONTRA CRIANÇAS E ADOLESCENTES: PERMANENTES OU NOVOS DESAFIOS PARA REDE DE\n          PROTEÇÃO? Anna Luiza Lopes Liberato Alexandre Freire Brena Karoline Cavalcante de Oliveira, Adeílza Clímaco Ferreira\n          e Cristiane Sousa Silva Matutino</li>\n        <li>13. O LICENCIAMENTO AMBIENTAL COMO ESSENCIAL INSTRUMENTO DE GESTÃO E AS PROPOSTAS DE SUA FLEXIBILIZAÇÃO (COM ÊNFASE\n          NA PEC 65/2012) Marise Costa de Souza Duarte Daniel Nicolau de Vasconcelos Pinheiro, Gilka da Mata Dias e Rondinelle\n          Silva Oliveira Matutino</li>\n        <li>14. OBEDIÊNCIA À AUTORIDADE NO CONTEXTO DA PSICOLOGIA DE MOVIMENTOS DE MASSA Jair Soares de Oliveira Segundo Ana\n          Izabel Oliveira Lima, Fillipe Azevedo Rodrigues, Manuel Sabino Pontes e Rosivaldo Toscano dos Santos Júnior Matutino</li>\n        <li>15. OBSTÁCULOS HERMENÊUTICO-JURÍDICOS PARA A EFETIVIDADE DAS POLÍTICAS PÚBLICAS Fabiano André de Souza Mendonça Vladimir\n          da Rocha França e Hallison Rêgo Bezerra Matutino</li>\n        <li>16. POLÍTICA TRIBUTÁRIA E DESIGUALDADES SOCIAIS: UM DEBATE NECESSÁRIO Igor Alexandre Felipe de Macedo Francisco Aurélio\n          de Albuquerque Filho e Karol Marinho Matutino</li>\n        <li>17. POLÍTICAS PÚBLICAS E AGRICULTURA FAMILIAR NA CADEIA GLOBAL DO MELÃO NO ESTADO DO RIO GRANDE DO NORTE: LIMITES\n          E POSSIBILIDADES João Matos Filho Emanoel Márcio Nunes e Manoel Cândido Matutino</li>\n        <li>18. TRABALHO DECENTE, CONDIÇÕES DE TRABALHO E PARTICIPAÇÃO FEMININA NA CADEIA PRODUTIVA DO MELÃO DO RN Valdenia Apolinário\n          Representante Feminina e Representante do Ministério do Trabalho Matutino</li>\n        <li>19. TUTELA EFETIVA DE DIREITOS NO ESTADO CONSTITUCIONAL: AS DECISÕES ESTRUTURAIS NO DIREITO BRASILEIRO Leonardo Martins\n          Marcus Aurélio de Freitas Barro,  Marcus Vinicius Pereira Junior, Dimitre Soares, Guglielmo Marconi Soares de Castro\n          e Giovanni Alessandro Begossi Matutino</li>\n      </ul>\n\n      <br><br>\n\n      <ul>\n        <li>1. ESTADO E SOCIEDADE NO DEBATE SOBRE SEGURANÇA ALIMENTAR Dalvanir Avelino da Silva Jean Pierre Tertuliano Câmara,\n          Sonia Soares e Victor Hugo Dias Vespertino</li>\n        <li>2. ARTE URBANA E LIBERDADE DE EXPRESSÃO NO CONTEXTO DO DIREITO À CIDADE Leonardo Martins Marise Costa de Souza Duarte,\n          Miguel Nery Santos Silva e Natália Bastos Bonavides Vespertino</li>\n        <li>3. BANCOS COMUNITÁRIOS: UMA ALTERNATIVA PARA SUPERAÇÃO DAS DESIGUALDADES SOCIAIS Rosângela Alves de Oliveira Daniel\n          Pereira, Emanuel Cadó e Larissa de Carvalho Nunes Vespertino</li>\n        <li>4. EMPREENDEDORISMO SOCIAL NO SÉCULO XXI Mauricio Assuero de Lima Freitas Kalyna Fernamda Batista da Silva, Maria\n          de Fátima da Silva e Pauliana Pereira da Silva Marques Vespertino</li>\n        <li>5. FORMAÇÃO DE GESTORES PÚBLICOS NO BRASIL: EXPERIÊNCIAS, CAMINHOS E ESTRATÉGIAS PARA PROFISSIONALIZAÇÃO Bruno Leonardo\n          Bezerra da Silva Thiago Ferreira Dias,Cynara Carvalho de Abreu e Raquel Alves Santos   Vespertino</li>\n        <li>6. OS DESAFIOS A SEREM ENFRENTADOS PARA IMPLEMENTAR A PESQUISA EMPÍRICA NO DIREITO: ENTRE O MÉTODO E A DOGMÁTICA\n          Keity Mara Ferreira de Souza e Saboya Keity Mara Ferreira de Souza e Saboya e Luciano Athayde Chaves Vespertino</li>\n        <li>7. PERSPECTIVAS DE GOVERNANÇA DO TURISMO NO BRASIL Wilker Nóbrega Jurema Dantas Vespertino</li>\n        <li>8. POLÍTICAS E AÇÕES DE MEMÓRIAS INSTITUCIONAIS: RELATOS Professor DECIN Eliane Braga de Oliveirae Teodora de Araújo\n          Alves Vespertino</li>\n        <li>9. SOCIEDADE CIVIL E DIREITO: COMO EXERCER A CIDADANIA PARA REDUZIR A DESIGUALDADE SOCIAL Ana Luíza Félix Severo\n          Carlos André Maciel Pinheiro Pereirae Adson Kepler Monteiro Maia Vespertino</li>\n        <li>10. TURISMO E INCLUSÃO/EXCLUSÃO SOCIOESPACIAL Almir Félix Batista de Oliveira Maria Lúcia Bastos Alves, Maria Augusta\n          Wanderley Seabra de Melo, Ana Karina de Oliveira Maia Vespertino</li>\n        <li>11. TURISMO E PATRIMÔNIO CULTURAL: CENTROS HISTÓRICOS, GASTRONOMIA E TURISMO RELIGIOSO COMO FORMAS DE IDENTIDADE\n          E DE PRESERVAÇÃO ATRAVÉS DA PRÁTICA TURÍSTICA. Almir Félix Batista de Oliveira Maria Lúcia Bastos Alves, Maria\n          Augusta Wanderley Seabra de Melo e Ana Karina de Oliveira Maia Vespertino</li>\n      </ul>\n\n      <br><br>\n\n      <ul>\n        <li>1. DIREITO A SER CRIANÇA NA AMÉRICA LATINA: QUAL A RESPONSABILIDADE DO ESTADO NA INVISIBILIDADE INFANTIL? ANÁLISE\n          CASUÍSTICA Ângelo José Menezes Silvino Francisco André Alves Moura, José Serafim da Costa Neto e Sânzia Mirelly\n          da Costa Guedes Noturno</li>\n        <li>2. LITERATURA E QUESTÃO SOCIAL Zéu Palmeira Sobrinho Henrique André Ramos Wellen e Zéu Palmeira Sobrinho Noturno</li>\n        <li>3. O CENTENÁRIO DA CODIFICAÇÃO CIVIL NO BRASIL E REFLEXÕES SOBRE A TEORIA DAS INCAPACIDADES A PARTIR DO ESTATUTO\n          DA PESSOA COM DEFICIÊNCIA Fabiana Dantas Soares Alves da Mota Catarina Cardoso Sousa França, Erica Vericia Canuto\n          de Oliveira Veras, Anna Emanuella Nelson dos Santos Noturno</li>\n        <li>4. POLÍTICAS PÚBLICAS E SEGURANÇA ALIMENTAR NO RIO GRANDE DO NORTE Fábio Resende de Araújo Dalvanir Avelino da Silva\n          e Richard Medeiros de Araújo Noturno</li>\n        <li>5. RACIONALIDADE DECISÓRIA E LIMITES AO IDEAL DE VIDA BOA: DIÁLOGO SOBRE A INTERVENÇÃO DO ESTADO NO FORO ÍNTIMO DO\n          CIDADÃO Mariana de Siqueira Gustavo Barbosa, Gabriel Vitullo e Zéu Palmeira Noturno</li>\n        <li>6. SUBNOTIFICAÇÃO DO ACIDENTE DE TRABALHO INFANTIL Fabiana Dantas Soares Alves da Mota Maxwellk da Silva Melo, Zéu\n          Palmeira Sobrinho e Priscila Farias dos Anjos Noturno</li>\n        <li>7. TRABALHO INFANTIL ARTÍSTICO E O PROTAGONISMO DOS MC´S Zéu Palmeira Sobrinho João Ricardo dos Reis Cavalcante Cerqueira,\n          Winnie Alencar Farias e Suzana Melo de Oliveira Noturno</li>\n        <li>8. TRABALHO INFANTIL ARTÍSTICO E O PROTAGONISMO DOS MC’S Zéu Palmeira Sobrinho Suzana Melo de Oliveira, João Ricardo\n          dos Reis Cavalcante Cerqueira e Winnie Alencar Farias Noturno</li>\n        <li>9. TRABALHO INFANTIL E ESCRAVO: UMA ANÁLISE A PARTIR DO DIREITO INTERNACIONAL DOS DIREITOS HUMANOS Fabiana Dantas\n          Soares Alves da Mota Amanda Oliveira da Câmara Moreira, Rafaela Oliveira Reis Cadó e Saulo de Medeiros Torres Noturno</li>\n        <li>10. TRIBUTAÇÃO DA ECONOMIA DIGITAL: CASOS UBER, NETFLIX E SPOTIFY Ana Beatriz Ferreira Rebello Presgrave Igor Alexandre\n          Felipe de Macêdo, Félix Oliveira e Luiz Felipe Monteiro Seixas Noturno</li>\n      </ul>\n\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalConferencia}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      CONFERÊNCIAS - PROGRAMAÇÃO\n      <a (click)=\"_toggleConferenciaModal()\" (keypress.enter)=\"_toggleConferenciaModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n\n      <h2>CONFERÊNCIA DE ABERTURA (08/05)</h2>\n\n      <ul>\n        <li><b>DESIGUALDADES SOCIAIS: UMA ABORDAGEM A PARTIR DO FUNDO PÚBLICO</b> | 19h |  Prof. Dr. Evilásio Salvador\n          <p>Auditório Otto de Brito Guerra (Reitoria)</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 09/05 (MATUTINO)</h2>\n\n      <ul>\n        <li><b>PARTICIPAÇÃO SOCIAL E EFETIVIDADE DE ORGANIZAÇÕES PÚBLICAS: QUAL O VERDADEIRO PAPEL DOS STAKEHOLDERS?</b> | 9h30-11h30  | Prof. Ricardo Corrêa Gomes\n          <p>Auditório Nepsa 1</p>\n        </li>\n        <li><b>AS CONDIÇÕES SOCIOECONÔMICAS E A VIOLÊNCIA DOMÉSTICA CONTRA A MULHER</b> | 9h30-11h30  | Prof. José Raimundo Carvalho\n          <p>Auditório do Núcleo de Práticas Jurídicas - NPJ</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 09/05 (VESPERTINO)</h2>\n\n      <ul>\n        <li><b>MEMÓRIA INSTITUCIONAL</b> | 15h30-17h15 | Profa. Dra. Eliane Braga de Oliveira\n          <p>Biblioteca Central Zila Mamede </p>\n        </li>\n        <li><b>A IMPORTÂNCIA DAS POLÍTICAS PÚBLICAS DE CULTURA PARA O DESENOLVIMENTO DA CADEIA PRODUTIVA DOS MUSEUS E DO TURISMO</b> | 15h30-17h15 | Profa. Dra. Isabela Andrade Morais\n          <p>Auditório do Núcleo de Práticas Jurídicas - NPJ</p>\n        </li>\n        <li><b>EXTENSÃO UNIVERSITÁRIA: uma questão de cidadania</b> | 15h30-17h15 | Profa. Dra. Clébia Mardônia Freitas Silva\n          <p>Auditório de Ciências Contábeis Sala H2 Setor V</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 09/05 (NOTURNO)</h2>\n\n      <ul>\n        <li><b>DESCUBRA O EMPREENDEDOR QUE EXISTE EM VOCÊ</b> | 20h00-22h15 | Marcelo Henrique Neves Pereira\n          <p>Auditório Sala H2 Setor V</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 10/05 (MATUTINO)</h2>\n\n      <ul>\n        <li><b>O AJUSTE FISCAL E A REALIDADE ATUAL DA ECONOMIA BRASILEIRA: REFORMAS, DIAGNÓSTICOS E PERSPECTIVAS</b> | 9h30-11h30 | Prof. Dr. Pedro Rossi\n          <p>Auditório do Núcleo de Práticas Jurídicas - NPJ</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 10/05 (VESPERTINO)</h2>\n\n      <ul>\n        <li><b>INOVAÇÃO E ESTRATÉGIA EM ORGANIZAÇÕES PÚBLICAS DE GOVERNO: RELATO DE EXPERIÊNCIAS</b> | 15h30-17h15 | Prof. Dr. Antônio Isidro da Silva Filho\n          <p>Auditório do Nepsa 1</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 11/05 (MATUTINO)</h2>\n\n      <ul>\n        <li><b>FINANÇAS PESSOAIS</b> | 9h30-11h30 | Prof. Dr. Marcus Vinicius Veras Machado\n          <p>Auditório do Nepsa 1</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 11/05 (NOTURNO)</h2>\n\n      <ul>\n        <li><b>ENTRE A CONVENÇÃO DE NOVA YORK E A LEI BRASILEIRA DE ACESSIBILIDADE - AVANÇOS OU RETROCESSOS?</b> | 20h00-22h15 | Profa. Dra. Larissa Maria de Moraes Leal\n          <p>Auditório do Núcleo de Práticas Jurídicas - NPJ</p>\n        </li>\n        <li><b>PLANEJAMENTO TRIBUTÁRIO: ASPECTOS RACIONAIS E COMPORTAMENTAIS</b> | 20h00-22h15 |  Prof. Fabrício Costa Resende Campos\n          <p>Auditório 3 – Nepsa II</p>\n        </li>\n      </ul>\n\n      <h2>CONFERÊNCIAS DE 12/05 (MATUTINO)</h2>\n\n      <ul>\n        <li><b>A CONTRARREFORMA DA PREVIDÊNCIA SOCIAL NO CONTEXTO DA CRISE DO CAPITAL</b> | 09h30-11h30 | Profa. Dra. Sara Graneman\n          <p>Auditório do Núcleo de Práticas Jurídicas - NPJ</p>\n        </li>\n      </ul>\n\n    </div>\n  </div>\n</div>\n\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalProgramacao}\">\n  <div class=\"container-all\">\n    <div class=\"header\">\n      PROGRAMAÇÃO\n      <a (click)=\"_toggleProgramacaoModal()\" (keypress.enter)=\"_toggleProgramacaoModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\">\n      <a href=\"assets/ng2/download/CONFERENCIAS.pdf\" target=\"_blank\">CLIQUE AQUI</a> PARA BAIXAR A PROGRAMAÇÃO DE CONFERÊNCIAS.\n      <br/>\n      <a href=\"assets/ng2/download/MINICURSOS.pdf\" target=\"_blank\">CLIQUE AQUI</a> PARA BAIXAR A PROGRAMAÇÃO DE MINICURSOS.\n      <br/>\n      <a href=\"assets/ng2/download/MESAS-REDONDAS.pdf\" target=\"_blank\">CLIQUE AQUI</a> PARA BAIXAR A PROGRAMAÇÃO DE MESAS-REDONDAS.\n      <br/>\n      <a href=\"assets/ng2/download/OFICINAS.pdf\" target=\"_blank\">CLIQUE AQUI</a> PARA BAIXAR A PROGRAMAÇÃO DE OFICINAS.\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalPrazo}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n         AVISO \n        <a (click)=\"_togglePrazoModal()\" (keypress.enter)=\"_togglePrazoModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <p>Solicitamos a todos que confiram suas inscrições para evitar problemas de choque de atividades.  O sistema apresentou algumas inconsistências e pode ter havido problemas . Pedimos desculpas pelos transtornos que isso tenha provocado.</p>\n        <p>As Inconsistências podem ter  ocorrido nas atividades de mesas-redondas, conferências, pôsteres, oficinas e comunicação oral que ocorrem no mesmo horário. </p>\n        <p>É muito importante que confiram todas as atividades que se iniciam às 9:30, 15:30 e 20:15 pois é possível que haja choque nas atividades. Se surgirem dúvida, procure as informações na programação.</p>\n        <p>Informamos que o sistema ficará aberto até o meio-dia da segunda-feira para correção nas escolhas que apresentarem conflito. O sistema estará aberto apenas para esse fim.</p>\n        <p>Coordenação do Seminário de Pesquisa do CCSA/UFRN</p>\n      </div>\n    </div>\n  </div>\n  \n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalWelfare}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        XVI Seminário de Seguridade Social e Trabalho: Trabalho Decente e Democracia\n        <a (click)=\"_toggleWelfareModal()\" (keypress.enter)=\"_toggleWelfareModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <div>\n          <p>O Seminário de Seguridade Social e Trabalho, promovido pelo GESTO (Grupo de Estudos\n              Seguridade Social e Trabalho) tem por objetivo central proporcionar a divulgação e a atualização\n              de conhecimentos sobre temáticas relacionadas aos direitos trabalhistas e previdenciários, com\n              foco especial, na questão das recentes reformas dos direitos sociais. O evento é uma realização da\n              Base de Pesquisa DIREITOS SOCIAIS E CONTEMPRANEIDADE e conta com o apoio do\n              Departamento de Direito Privado da UFRN.</p>\n              <h3>18/05</h3>\n              <ul>\n                <li><strong>Local: </strong>Auditório do NEPSA 1 (PRÓXIMO AO BLOCO DO GOIABÃO)</li>\n                <li><strong>09h:00 as 12:00 - </strong>Preparação</li>\n                <li><strong>14:00 - </strong>Credenciamento</li>\n                <li><strong>14:15 - </strong>Apresentação artística</li>\n                <li><strong>14:40 - </strong>Conferência de abertura\n                  <ol>\n                    <li>Juiza Laura Brenda- presidente da AJD - Associaçao de Juristas para a Democracia</li>\n                    <li><strong>Presidente da mesa: </strong>Maria Arlete Duarte Araújo</li>\n                  </ol>\n                </li>\n                <li>Criação oficial do Núcleo Juridico da AJD no RN</li>\n                <li><strong>Painel: </strong>Trabalho Decente e Gênero\n                  <ol>\n                    <li><strong>Painelista 1: </strong> Ana Laura Araújo (integrante AJPDC - Associação dos Juristas Potiguares\n                      pela Democracia e Cidadania).</li>\n                    <li><strong>Painelista 2: </strong>Paula Lays (Pesquisadora do GESTO e acadêmica de direito) </li>\n                  </ol>\n                </li>\n              </ul>\n          </div>\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal-news\" style=\"z-index: 1000\"[ngClass]=\"{'open': modalExtension}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        VII Mostra de Extensão\n        <a (click)=\"_toggleExtensionModal()\" (keypress.enter)=\"_toggleExtensionModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <div>\n          <a href=\"assets/ng2/download/Extension.pdf\"><h4>Folder do evento</h4></a>\n          <h3>15/05</h3>\n          <ul>\n            <li>15h:30 Conferência: Extensão na UFRN\n              <ol>\n                <li>Prof. Maria de Fatima Ximenes / Pró-Reitora de Extensão UFRN</li>\n                <li><strong>Público alvo: </strong> Professores, estudantes e técnicos no CCSA</li>\n              </ol>\n            </li>\n            <li>17h:00 Diálogos sobre Extensão:  Inserção Curricular da Extensão no Cursos de Graduação do CCSA\n              <ol>\n                <li><strong>Mediadora: </strong>Pamela de Medeiros Brandão/Assessora Acadêmica do CCSA</li>\n                <li><strong>Público alvo: </strong>Atividade direcionada aos coordenadores e membros do NDE  dos cursos de Graduação do CCSA.</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>16/05</h3>\n          <ul>\n            <li>09h:30 Oficina: Metodologias de Ensino para a Inclusão  \n              <ol>\n                <li><strong>Mediador: </strong>CAENE</li>\n                <li><strong>Público alvo: </strong>Professores dos cursos de Graduação do CCSA.</li>\n              </ol>\n            </li>\n            <li>15h:30 Oficina; Diálogos sobre Extensão:  Avaliando e Planejando a Extensão do CCSA\n              <ol>\n                <li><strong>Mediadora: </strong> <strong>Pamela de Medeiros Brandão</strong>/Assessora Acadêmica do CCSA e <strong>Telma Elita</strong>(Ténica em Assuntos Estudantis do Núcleo de Apoio ao Discente NADis)</li>                \n                <li><strong>Público alvo: </strong>Atividade direcionada a todos os professores e alunos envolvidos em ações de extensão no CCSA..</li>\n              </ol>\n            </li>\n          </ul>\n          </div>\n          <br/>\n      </div>\n    </div>\n  </div>\n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalTalkingCircle}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        EVENTO RODA DE CONVERSA  - ANO  V\n        <a (click)=\"_toggleTalkingCircleModal()\" (keypress.enter)=\"_toggleTalkingCircleModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <a href=\"assets/ng2/download/TalkingCircle.pdf\"><h4>Folder do evento</h4></a>\n        <br/>\n          <div>\n          <h3>15/05 - 9h:30</h3>\n          <ul>\n            <li><strong>ASPECTOS PROCESSUAIS DO ACESSO À JUSTIÇA NO BRASIL,2017 - Auditório 4 Nepsa 2</strong>\n              <ol>\n                <li>Jose Orlando Riberio Rosário</li>\n                <li>Cristina Forani Consani</li>\n                <li>PatricIa Borba V. Guimaraes</li>\n                <li>Celso Luiz Braga de Castro</li>\n              </ol>\n            </li>\n            <br/>\n            <li><strong>ACESSO À JUSTICA: </strong>aspectos constitucionais e sociais, 2017 - Auditório 4 Nepsa 2\n              <ol>\n                <li>Jose Orlando Riberio Rosário</li>\n                <li>Cristina Forani Consani</li>\n                <li>Yanko  Marcius de Alencar Xavier</li>\n                <li>Celso Luiz Braga de Castro</li>\n              </ol>\n            </li>\n            <li><strong>ACESSO À JUSTIÇA: </strong>perspectivas filosóficas,2017 - Auditório 4 Nepsa 2\n              <ol>\n                <li>Jose Orlando Riberio Rosário</li>\n                <li>Cristina Forani Consani</li>\n                <li>Ricardo Tinoco de Goés</li>\n                <li>Celso Luiz Braga de Castro</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>16/05 - 15h:30</h3>\n          <ul>\n            <li><strong>GESTÃO ESTRATÉGICA DAS EXPERIÊNCIAS DE LAZER</strong> - Auditório 2 Nepsa 2\n              <ol>\n                <li>Autores: Paulo Henrique Azevêdo; Antônio Carlos Bramante </li>\n                <li>Autor presente: Mozart Fazito Rezende (escreveu o capítulo  Desenvolvimento, Turismo, Lazer e Viagens Sensoriais)</li>\n              </ol>\n            </li>\n            <li><strong>GESTÃO DE RISCO PARA TURISMO DE AVENTURA</strong> - Auditório 2 Nepsa 2\n              <ol>\n                <li>Autor presente: Jodrian Freitas</li>\n              </ol>\n            </li>\n            <li><strong>O OLHAR DO RESIDENTE: TEORIAS E CASOS NA GESTÃO DO TURISMO</strong> - Auditório 2 Nepsa 2              \n              <ol>\n                <li>Autores: Marcelo Milito, Sérgio Marques e Mayara Farias</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>17/05 - 9h:30</h3>\n          <ul>\n            <li><strong>DESIGUALDADE SOCIAL E POLÍTICAS SOCIAIS: </strong>estudos sobre expressões da questão\n              social e políticas de enfrentamento a pobreza na cidade e no campo,  2017\n              <ol>\n                <li>Iris Maria de Oliveira</li>\n                <li>Maria Regina Avila Moreira</li>\n                <li>Edla Hoffmann</li>\n                <li>Ilena Felipe Barros</li>\n                <li>Rosangela Alves de Oliveira</li>\n                <li>Eliana Andrade da Silva</li>\n              </ol>\n            </li>\n            <li><strong>DENÚNCIA ANÔNIMA: </strong> instrumento de proteção de direitos fundamentais no Brasil\", 2017 \n              <ol>\n                <li>Morton  Medeiros </li>\n              </ol>\n            </li>\n            <li><strong>DIREITO E JUSTIÇA , 2017</strong>\n              <ol>\n                <li>Jose Orlando Riberio Rosário</li>\n                <li>Cristina Forani Consani</li>\n                <li>Celso Luiz Braga de Castro</li>\n                <li>Yanko  Marcius de Alencar Xavier</li>\n                <li>PatricIa Borba V. Guimaraes </li>\n              </ol>\n            </li>\n            <li><strong>FEMINISMO, DIVERSIDADE SEXUAL E SERVIÇO SOCIAL, 2017 </strong>\n              <ol>\n                <li>Mirla Cisne (UERN)</li>\n                <li>Silvana Mara (UFRN)</li>\n              </ol>\n            <li><strong>REPOSITÓRIOS DIGITAIS: teoria e prática</strong>\n              <ol>\n                <li>Autores e Organizadores: Vechiato, \n                  Fernando Luiz, Marques, Clediane de Araujo Guedes, \n                  Koshiyama, Débora Costa Araújo Di Giacomo,  Moura, \n                  Elisângela Alves de, Torino, Emanuelle, aia, Maria \n                  Aniolly Queiroz, Marques, Marques, Tércia Maria \n                  Souza de Moura</li>\n              </ol>\n            </li>\n          </ul>\n          </div>\n          <br/>\n      </div>\n    </div>\n</div>\n\n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalInternational}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        Colóquio Internacional - Agricultura camponesa, segurança alimentar e nutricional e resistências: interlocuções Brasil, Argentina, Colômbia\n        <a (click)=\"_toggleInternationalModal()\" (keypress.enter)=\"_toggleInternationalModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <div>\n          <li><strong>Coordenador: </strong>Prof. Washington José de Sousa (PPGA/CCSA/UFRN)</li>\n          <br/>\n          <h3>Brasil - 17/05 - Manhã</h3>\n          <ul>\n            <li>Mapeamentos da produção científica nacional e da UFRN em segurança alimentar e nutricional (SAN)\n              <ol>\n                <li>Denys Daniel da Silva</li>\n                <li>Diego José do Nascimento Rabelo</li>\n                <li>Sarah Monique Fonseca de Menezes</li>\n              <li><strong>Mediador: </strong> Prof. Raoni Fernandes Azeredo, Universidade Federal do Oeste do Pará (UFOPA)</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>Brasil - 17/05 - Tarde</h3>\n          <ul>\n            <li>Um resgate das políticas de SAN no Brasil\n              <ol>\n                <li>Sandro Silva, Instituto de Pesquisa Econômica Aplicada (IPEA)</li>\n              </ol>\n            </li>\n            <li>O Projeto SISAN Universidades e o OBSERVASAN - Observatório Nordestino de Segurança e Soberania Alimentar e Nutricional\n              <ol>\n                <li>Maurício Sardá, Universidade Federal Rural de Pernambuco (UFRPE)</li>\n                <li><strong>Mediadora: </strong> Dinara Leslie Macedo e Silva (Faculdade de Ciências da Saúde do Trairi –   Facisa/UFRN)</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>Colombia e Argentina - 18/05 - Manhã</h3>\n          <ul>\n            <li>Sumapaz território de lutas agrárias na Colômbia: histórias e geografias e resistências indígenas e camponesas - do latifúndio de ontem ao neoextrativismo de hoje\n              <ol>\n                <li>Oscar Hernan Triviño,  (Universidad de Cundinamarca (Colômbia)</li>\n              </ol>\n            </li>\n            <li>O associativismo rural na Argentina. Principais discussões e desafios atuais\n              <ol>\n                <li>Juan Emanuel Barrera Calderón, Universidade Nacional de Córdoba (Argentina)</li>\n                <li><strong>Mediador: </strong>Maurício Sardá, Universidade Federal Rural de Pernambuco (UFRPE)</li>\n              </ol>\n            </li>\n          </ul>\n          </div>  \n          <br/>\n\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalFeminism}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        I COLÓQUIO FEMINISMO MATERIALISTA E MARXISMO\n        <a (click)=\"_toggleFeminismModal()\" (keypress.enter)=\"_toggleFeminismModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <div>\n          <li><strong>Realização: </strong> Grupos de Pesquisa GEPTED e QTEMOSS</li>\n          <br/>\n          <h3>1ª Dia - 14/05</h3>\n            <ul>\n              <li><strong>8h:00</strong> Abertura</li>\n              <li><strong>8h:30 </strong> Lançamento do Livro \"Feminismo, Diversidade Sexual e Serviço Social\" - Profª Drª. Mirla Cisne (UERN) e Profª. Drª. Silvana Mara (UFRN)</li> \n              <li><strong>9h:00</strong> Palestra - Crítica a noção de gênero, feminismo materialista e marxismo: questões polêmicas e desafios  \n                <ol>\n                  <li>Palestrantes: ProfªDrª Janaiky Almeida (UFERSA) e ProfªDrª Mirla Cisne (UERN);</li>\n                  <li><strong>Coordenação:</strong> ProfªDrª Andréa Lima (UFRN) e Fernanda Nascimento (Bolsista IC)</li>\n                </ol>\n              </li>\n              <li><strong>11h:00</strong> Debate</li>\n              <li><strong>14h:00</strong> Palestra - Crítica a noção de gênero, feminismo materialista e marxismo: questões polêmicas e desafios                \n                <ol>\n                  <li>Palestrantes: Profª. Drª Anotinette Brito (UFRN) e Drª Verônica Ferreira (SOS CORPO e AMB) </li>\n                  <li><strong>Coordenação:</strong> ProfªDrª Ilka Lima e Lenny Grillo (Bolsista IC)</li>\n                  <li><strong>16h:00</strong> Debate</li>\n                </ol>\n              </li>\n            </ul>\n            <br/>\n            <h3>2ª Dia - 15/05</h3>\n            <ul>\n              <li><strong>9h:30</strong> Mesa-Redonda - Feminismo, Serviço Social e questões contemporâneas [\n                <ol>\n                  <li>Violência contra mulher – ProfªDrª Fernanda Marques (UERN)</li>\n                  <li>Assédio Sexual – ProfªDrª Ilidiana Diniz (UFRN)</li>\n                  <li>Feminismo e participação política - Profª Drª.Telma Gurgel </li>\n                  <li>Feminismo e Projeto Ético-político do Serviço Social – Profª Drª Miriam Inácio (UFRN)</li>\n                  <li><strong>Coordenação:</strong> ProfªDrª Rita de Lourdes e Karol Alves (Bolsista IC)</li>\n                </ol>\n              </li>\n              <li><strong>Tarde: </strong> Reunião GEPTED/QTEMOSS e Pesquisadoras convidadas</li>\n            </ul>\n          </div>\n          <br/>\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalPublicManagement}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        IV COLÓQUIO SOBRE GESTÃO PÚBLICA\n        <a (click)=\"_togglePublicManagementModal()\" (keypress.enter)=\"_togglePublicManagementModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <a href=\"assets/ng2/download/2018_04_04_ IV_Coloquio_Gestao_Publica.pdf\"><h4>Folder do evento</h4></a>\n        <div>\n        <h3>1ª Dia - 16/05</h3>\n          <ul>\n            <li><strong>15h:30</strong> Mesa-Redonda - Os desafios da profissionalização da burocracia\n              <ol>\n                <li>Palestrantes: Pedro Luiz Costa Cavalcante (Coordena-\n                    dor de Estudos e Políticas de Estado e Democracia -\n                    IPEA) e Natália Massaco Koga (ENAP)\n                    Mediador: Prof. Richard Medeiros (PPGP/UFRN)</li>\n                <li><strong>Local:</strong> Auditório do Curso de Ciências Contábeis –\n                    Sala H2 – Setor V</li>\n              </ol>\n            </li>\n            <li><strong>19:30 </strong> Cerimônia de Abertura \n            <li><strong>20:00</strong> Conferência - Construindo capacidades institucionais de gestão na Administração Pública: limites e\n              possibilidades \n              <ol>\n                <li>Conferencista: Alexandre de Avila Gomide (Diretor de\n                    Estudos e Políticas do Estado, Instituições e Democra-\n                    cia - IPEA)</li>\n                <li><strong>Local:</strong> Auditório do NEPSA I</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>2ª Dia - 17/05</h3>\n          <ul>\n            <li><strong>9h:30</strong> Mesa-Redonda - Laboratórios de Governo e Inovação na Gestão Pública \n              <ol>\n                <li>Palestrantes: Marco Bruno Miranda Clementino\n                    (Diretor do Foro da Justiça Federal no Rio\n                    Grande do Norte e do i.9 JFRN, Laboratório de\n                    Inovação da JFRN) e Daniela Coimbra Swiatek\n                    (Coordenadora do Laboratório de Inovação em\n                    Mobilidade - Prefeitura de São Paulo)</li>\n                <li>Mediador: Prof. Hironobu Sano (PPGP/PPGA/UFRN)</li>\n                <li><strong>Local:</strong> Auditório do NEPSA I</li>\n              </ol>\n            </li>\n            <li><strong>15:30</strong> Conferência de Encerramento - Novos dilemas e alternativas para a Gestão Pública \n              <ol>\n                <li>Conferencista: João Mendes da Rocha Neto\n                    (Professor do Programa de Pós-graduação em\n                    Administração - UNB, Escola Nacional de\n                    Administração Pública)</li>\n                <li><strong>Local:</strong> Auditório do NEPSA I</li>\n              </ol>\n            </li>\n          </ul>\n          </div>\n          <br/>\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalBeing}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        EXPOSIÇÃO 'A ESSÊNCIA DO SER\n        <a (click)=\"_toggleBeingModal()\" (keypress.enter)=\"_toggleBeingModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <a href=\"assets/ng2/download/EssenciaDoSer.pdf\"><h4>Folder do evento</h4></a>\n        <ul>\n          <h3>Abertura 17/05/2018 às 9:30h - Hall de exposições do Nepsa</h3>\n          <p>A mostra é uma iniciativa do DEPAD e das professora Aline Nelson, Lilia Asuca, Pamela Brandão\n            Teresa Pires e Arlete Araújo com curadoria do fotógrafo e aluno da UFRN Vlademir Alexandre\n            e compõe um conjunto de fotografia autorais entre frases e trechos poéticos colecionados como relíquias\n            pela professora Dalvanir Avelino\n          </p>\n          <p>\n            A exposição fotográfica A ESSÊNCIA DO SER capta a beleza, fazendo com que nos despertem os sentidos e \n            as emoções mais profundas em termos de reflexão sobre como deixamos o essencial da vida passar, por vezes,\n            despercebidos em meio às atribuições do cotidiano. Neste sentido é notável o olhar para a diversidade da fotógrafa\n            Dalvanir Avelino, cujo respeito ao outra e a solidariedade humana, próprias da sua essência, transparecem em seus registros.\n          </p>\n        </ul>\n        <br/>\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal-news\" style=\"z-index: 1000\" [ngClass]=\"{'open': modalInfoScience}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n        Coloquio de Ciência da Informação - Tema: Protagonismo Social da Informação\n        <a (click)=\"_toggleInfoScienceModal()\" (keypress.enter)=\"_toggleInfoScienceModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <a href=\"assets/ng2/download/VIII_Coloquio_de_Pesquisa_em_Ciencia_da_Informacao.pdf\"><h4>Folder do evento</h4></a>\n        <ul>\n          <h3>1ª Dia - 15/05</h3>\n          <ul>\n            <li><strong>16:00 – Café de boas-vindas – Sala de reunião setor V</strong></li>\n            <p>Reunião com a Profa Henriette Ferreira Gomes (UFBA) e a Coordenação do Curso de Graduação em Biblioteconomia, \n              Coordenação do Mestrado Profissional em Gestão da Informação e do Conhecimento e com os membros do Grupo de \n              Pesquisa “Informação na Sociedade Contemporânea”.</p>\n          </ul>\n          <h3>2ª Dia - 16/05</h3>\n          <ul>\n            <li><strong>16/05 ABERTURA DO EVENTO  / LOCAL: NEPSA I</strong></li>\n            <li><strong>15h:30</strong> Apresentação cultural / Grupo Potibones</li>\n            <li><strong>15h:45</strong> Mesa de Abertura\n            <ol>\n              <li>Profa. Dra. Maria Arlete Duarte de Araújo (Diretora do CCSA/UFRN);</li>\n              <li>Prof. Dr. Fernando Luiz Vechiato (Chefe do DECIN/UFRN);</li>\n              <li>Prof. MSc. Francisco de Assis Noberto Galdino de Araújo (Coordenador COBIB/UFRN); </li>\n              <li>Profa. Dra. Andrea Vasconcelos Carvalho / Prof. Dr. Pedro Alves Barbosa Neto (Coordenador (a) PPGIC/UFRN); </li>\n              <li>Profa. Dra. Gabrielle Francinne de S.C Tanus (Coordenadora VIII CPCI)</li>\n            </ol></li>\n            <li><strong>16h. às 17h30</strong> Palestra de abertura com a Profa. Dra. Henriette Ferreira Gomes - (UFBA): “Ciência da Informação em favor do protagonismo social: contributo ao desenvolvimento humano”</li>\n            <li><strong>17:30 Lançamento do livro</strong> \"Informação e Protagonismo social”/ Henriette Ferreira Gomes, Hildenise Ferreira Novo (Org.) / 2017</li>\n          </ul>\n          <br/>\n          <h3>3ª Dia - 17/05</h3>\n          <ul>\n            <li><strong>09h30 às 11h30:</strong> Grupos Temáticos</li>\n            <li><strong>13h às 15h: </strong>Minicursos</li>\n            <li><strong>15h30 às 17:00: </strong>Mesa redonda: “Ciência da Informação: informação, mediação e cultura”\n              <ol>\n                <li>Profa. Dra. Henriette Ferreira Gomes (UFBA)</li>\n                <li>Profa. Dra. Gabrielle Francinne de S.C Tanus (UFRN)</li>\n                <li>Profa. Dra. Monica Marques Carvalho Gallotti (UFRN)</li>\n                <li>Mediador: MSc. Francisco de Assis Noberto Galdino de Araújo</li>\n              </ol>\n            </li>\n          </ul>\n          <br/>\n          <h3>4ª Dia - 18/05</h3>\n          <ul>\n            <li><strong>09h30 às 11h30:</strong> Grupos Temáticos</li>\n            <li><strong>13h às 15h: </strong>Minicursos</li>\n            <li><strong>15h30: </strong>Painel: “Pesquisas em Gestão da Informação e do Conhecimento” \n              <ol>\n                <li>Coordenadora: Profa. Dra. Andrea Vasconcelos Carvalho / Prof. Dr. Pedro Alves Barbosa Neto(PPGIC/UFRN)</li>\n              </ol>\n            </li>\n            <li><strong>17:00 - Encerramento: </strong></li>\n          </ul>\n        </ul>\n        <br/>\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalColoquio}\">\n    <div class=\"container-all\">\n      <div class=\"header\">\n         Subeventos \n        <a (click)=\"_toggleColoquioModal()\" (keypress.enter)=\"_toggleColoquioModal()\">FECHAR</a>\n      </div>\n      <div class=\"container-modal\">\n        <a (click)=\"_toggleInfoScienceModal()\" \n        (keypress.enter)=\"_toggleInfoScienceModal()\">\n        <h2 style=\"color: #4F81BD\">Coloquio de Ciência da Informação - Tema: Protagonismo Social da Informação - Mais informações</h2>\n        </a>\n        <a (click)=\"_togglePublicManagementModal()\" \n        (keypress.enter)=\"_togglePublicManagementModal()\">\n        <h2 style=\"color: #4F81BD\">IV COLÓQUIO SOBRE GESTÃO PÚBLICA - Mais informações</h2>\n        </a>\n        <a (click)=\"_toggleFeminismModal()\" \n        (keypress.enter)=\"_toggleFeminismModal()\">\n        <h2 style=\"color: #4F81BD\">I COLÓQUIO FEMINISMO MATERIALISTA E MARXISMO - Mais informações</h2>\n        </a>\n        <a (click)=\"_toggleInternationalModal()\" \n        (keypress.enter)=\"_toggleInternationalModal()\">\n        <h2 style=\"color: #4F81BD\">Colóquio Internacional - Agricultura camponesa, segurança alimentar e nutricional e resistências: interlocuções Brasil, Argentina, Colômbia - Mais informações</h2>\n        </a>\n        <a (click)=\"_toggleTalkingCircleModal()\" \n        (keypress.enter)=\"_toggleTalkingCircleModal()\">\n        <h2 style=\"color: #4F81BD\">EVENTO RODA DE CONVERSA  - ANO  V - Mais informações</h2>\n        </a>\n        <a (click)=\"_toggleExtensionModal()\" \n        (keypress.enter)=\"_toggleExtensionModal()\">\n        <h2 style=\"color: #4F81BD\"> VII Mostra de Extensão - Mais informações</h2>\n        </a>\n        <a (click)=\"_toggleWelfareModal()\" \n        (keypress.enter)=\"_toggleWelfareModal()\">\n        <h2 style=\"color: #4F81BD\">XVI Seminário de Seguridade Social e Trabalho: Trabalho Decente e Democracia - Mais informações</h2>\n        </a>\n        <a (click)=\"_toggleBeingModal()\" \n        (keypress.enter)=\"_toggleBeingModal()\">\n        <h2 style=\"color: #4F81BD\">EXPOSIÇÃO 'A ESSÊNCIA DO SER</h2>\n        </a>\n      </div>\n  </div>\n</div>\n\n\n<div class=\"modal-news\" [ngClass]=\"{'open': modalUmaNoticiaModal}\">\n  <div class=\"container-all\">\n    <div class=\"header\" style=\"overflow: hidden;\">\n      <div class=\"big\">{{umaNoticia?.title}} </div>\n      <a (click)=\"_toggleUmaNoticiaModal()\" (keypress.enter)=\"_toggleUmaNoticiaModal()\">FECHAR</a>\n    </div>\n    <div class=\"container-modal\" [innerHTML]=\"umaNoticia?.text\">\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 926:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(445);


/***/ })

},[926]);
//# sourceMappingURL=main.bundle.map