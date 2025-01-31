(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{6170:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(5904)}])},1372:()=>{},8779:()=>{},1812:()=>{},7916:()=>{},5595:()=>{},7289:()=>{},7103:()=>{},5578:()=>{},7653:()=>{},2823:()=>{},4472:()=>{},5160:(e,t,r)=>{"use strict";var n=r(6540),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=n.useSyncExternalStore,a=n.useRef,u=n.useEffect,l=n.useMemo,s=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,r,n,c){var f=a(null);if(null===f.current){var d={hasValue:!1,value:null};f.current=d}else d=f.current;var p=o(e,(f=l(function(){function e(e){if(!u){if(u=!0,o=e,e=n(e),void 0!==c&&d.hasValue){var t=d.value;if(c(t,e))return a=t}return a=e}if(t=a,i(o,e))return t;var r=n(e);return void 0!==c&&c(t,r)?(o=e,t):(o=e,a=r)}var o,a,u=!1,l=void 0===r?null:r;return[function(){return e(t())},null===l?void 0:function(){return e(l())}]},[t,r,n,c]))[0],f[1]);return u(function(){d.hasValue=!0,d.value=p},[p]),s(p),p}},8418:(e,t,r)=>{"use strict";e.exports=r(5160)},9222:(e,t,r)=>{"use strict";function n(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}r.d(t,{U1:()=>es,Z0:()=>em});var i,o="function"==typeof Symbol&&Symbol.observable||"@@observable",a=()=>Math.random().toString(36).substring(7).split("").join("."),u={INIT:`@@redux/INIT${a()}`,REPLACE:`@@redux/REPLACE${a()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${a()}`};function l(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function s(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce((e,t)=>(...r)=>e(t(...r)))}function c(e){return({dispatch:t,getState:r})=>n=>i=>"function"==typeof i?i(t,r,e):n(i)}var f=c(),d=Symbol.for("immer-nothing"),p=Symbol.for("immer-draftable"),y=Symbol.for("immer-state");function h(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var m=Object.getPrototypeOf;function _(e){return!!e&&!!e[y]}function b(e){return!!e&&(w(e)||Array.isArray(e)||!!e[p]||!!e.constructor?.[p]||x(e)||P(e))}var g=Object.prototype.constructor.toString();function w(e){if(!e||"object"!=typeof e)return!1;let t=m(e);if(null===t)return!0;let r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===g}function v(e,t){0===S(e)?Reflect.ownKeys(e).forEach(r=>{t(r,e[r],e)}):e.forEach((r,n)=>t(n,r,e))}function S(e){let t=e[y];return t?t.type_:Array.isArray(e)?1:x(e)?2:P(e)?3:0}function E(e,t){return 2===S(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function O(e,t,r){let n=S(e);2===n?e.set(t,r):3===n?e.add(r):e[t]=r}function x(e){return e instanceof Map}function P(e){return e instanceof Set}function T(e){return e.copy_||e.base_}function j(e,t){if(x(e))return new Map(e);if(P(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);let r=w(e);if(!0!==t&&("class_only"!==t||r)){let t=m(e);return null!==t&&r?{...e}:Object.assign(Object.create(t),e)}{let t=Object.getOwnPropertyDescriptors(e);delete t[y];let r=Reflect.ownKeys(t);for(let n=0;n<r.length;n++){let i=r[n],o=t[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(t[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:e[i]})}return Object.create(m(e),t)}}function C(e,t=!1){return z(e)||_(e)||!b(e)||(S(e)>1&&(e.set=e.add=e.clear=e.delete=N),Object.freeze(e),t&&Object.entries(e).forEach(([e,t])=>C(t,!0))),e}function N(){h(2)}function z(e){return Object.isFrozen(e)}var A={};function D(e){let t=A[e];return t||h(0,e),t}function R(e,t){t&&(D("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function k(e){I(e),e.drafts_.forEach(F),e.drafts_=null}function I(e){e===i&&(i=e.parent_)}function M(e){return i={drafts_:[],parent_:i,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function F(e){let t=e[y];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function $(e,t){t.unfinalizedDrafts_=t.drafts_.length;let r=t.drafts_[0];return void 0!==e&&e!==r?(r[y].modified_&&(k(t),h(4)),b(e)&&(e=W(t,e),t.parent_||L(t,e)),t.patches_&&D("Patches").generateReplacementPatches_(r[y].base_,e,t.patches_,t.inversePatches_)):e=W(t,r,[]),k(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==d?e:void 0}function W(e,t,r){if(z(t))return t;let n=t[y];if(!n)return v(t,(i,o)=>U(e,n,t,i,o,r)),t;if(n.scope_!==e)return t;if(!n.modified_)return L(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;let t=n.copy_,i=t,o=!1;3===n.type_&&(i=new Set(t),t.clear(),o=!0),v(i,(i,a)=>U(e,n,t,i,a,r,o)),L(e,t,!1),r&&e.patches_&&D("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function U(e,t,r,n,i,o,a){if(_(i)){let a=W(e,i,o&&t&&3!==t.type_&&!E(t.assigned_,n)?o.concat(n):void 0);if(O(r,n,a),!_(a))return;e.canAutoFreeze_=!1}else a&&r.add(i);if(b(i)&&!z(i)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;W(e,i),(!t||!t.scope_.parent_)&&"symbol"!=typeof n&&Object.prototype.propertyIsEnumerable.call(r,n)&&L(e,i)}}function L(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&C(t,r)}var K={get(e,t){if(t===y)return e;let r=T(e);if(!E(r,t))return function(e,t,r){let n=Z(t,r);return n?"value"in n?n.value:n.get?.call(e.draft_):void 0}(e,r,t);let n=r[t];return e.finalized_||!b(n)?n:n===V(e.base_,t)?(B(e),e.copy_[t]=H(n,e)):n},has:(e,t)=>t in T(e),ownKeys:e=>Reflect.ownKeys(T(e)),set(e,t,r){let n=Z(T(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){let n=V(T(e),t),i=n?.[y];if(i&&i.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if((r===n?0!==r||1/r==1/n:r!=r&&n!=n)&&(void 0!==r||E(e.base_,t)))return!0;B(e),q(e)}return!!(e.copy_[t]===r&&(void 0!==r||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t]))||(e.copy_[t]=r,e.assigned_[t]=!0,!0)},deleteProperty:(e,t)=>(void 0!==V(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,B(e),q(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){let r=T(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty(){h(11)},getPrototypeOf:e=>m(e.base_),setPrototypeOf(){h(12)}},X={};function V(e,t){let r=e[y];return(r?T(r):e)[t]}function Z(e,t){if(!(t in e))return;let r=m(e);for(;r;){let e=Object.getOwnPropertyDescriptor(r,t);if(e)return e;r=m(r)}}function q(e){!e.modified_&&(e.modified_=!0,e.parent_&&q(e.parent_))}function B(e){e.copy_||(e.copy_=j(e.base_,e.scope_.immer_.useStrictShallowCopy_))}function H(e,t){let r=x(e)?D("MapSet").proxyMap_(e,t):P(e)?D("MapSet").proxySet_(e,t):function(e,t){let r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:i,modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1},o=n,a=K;r&&(o=[n],a=X);let{revoke:u,proxy:l}=Proxy.revocable(o,a);return n.draft_=l,n.revoke_=u,l}(e,t);return(t?t.scope_:i).drafts_.push(r),r}v(K,(e,t)=>{X[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),X.deleteProperty=function(e,t){return X.set.call(this,e,t,void 0)},X.set=function(e,t,r){return K.set.call(this,e[0],t,r,e[0])};var Q=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,r)=>{let n;if("function"==typeof e&&"function"!=typeof t){let r=t;t=e;let n=this;return function(e=r,...i){return n.produce(e,e=>t.call(this,e,...i))}}if("function"!=typeof t&&h(6),void 0!==r&&"function"!=typeof r&&h(7),b(e)){let i=M(this),o=H(e,void 0),a=!0;try{n=t(o),a=!1}finally{a?k(i):I(i)}return R(i,r),$(n,i)}if(e&&"object"==typeof e)h(1,e);else{if(void 0===(n=t(e))&&(n=e),n===d&&(n=void 0),this.autoFreeze_&&C(n,!0),r){let t=[],i=[];D("Patches").generateReplacementPatches_(e,n,t,i),r(t,i)}return n}},this.produceWithPatches=(e,t)=>{let r,n;return"function"==typeof e?(t,...r)=>this.produceWithPatches(t,t=>e(t,...r)):[this.produce(e,t,(e,t)=>{r=e,n=t}),r,n]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){var t;b(e)||h(8),_(e)&&(_(t=e)||h(10,t),e=function e(t){let r;if(!b(t)||z(t))return t;let n=t[y];if(n){if(!n.modified_)return n.base_;n.finalized_=!0,r=j(t,n.scope_.immer_.useStrictShallowCopy_)}else r=j(t,!0);return v(r,(t,n)=>{O(r,t,e(n))}),n&&(n.finalized_=!1),r}(t));let r=M(this),n=H(e,void 0);return n[y].isManual_=!0,I(r),n}finishDraft(e,t){let r=e&&e[y];r&&r.isManual_||h(9);let{scope_:n}=r;return R(n,t),$(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){let n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}r>-1&&(t=t.slice(r+1));let n=D("Patches").applyPatches_;return _(e)?n(e,t):this.produce(e,e=>n(e,t))}},J=Q.produce;Q.produceWithPatches.bind(Q),Q.setAutoFreeze.bind(Q),Q.setUseStrictShallowCopy.bind(Q),Q.applyPatches.bind(Q),Q.createDraft.bind(Q),Q.finishDraft.bind(Q),r(7836);var Y="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!=arguments.length)return"object"==typeof arguments[0]?s:s.apply(null,arguments)};"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;var G=e=>e&&"function"==typeof e.match;function ee(e,t){function r(...n){if(t){let r=t(...n);if(!r)throw Error(eD(0));return{type:e,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:e,payload:n[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=t=>l(t)&&"type"in t&&"string"==typeof t.type&&t.type===e,r}function et(e){return["type","payload","error","meta"].indexOf(e)>-1}var er=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function en(e){return b(e)?J(e,()=>{}):e}function ei(e,t,r){return e.has(t)?e.get(t):e.set(t,r(t)).get(t)}var eo=()=>function(e){let{thunk:t=!0,immutableCheck:r=!0,serializableCheck:n=!0,actionCreatorCheck:i=!0}=e??{},o=new er;return t&&("boolean"==typeof t?o.push(f):o.push(c(t.extraArgument))),o},ea=e=>t=>{setTimeout(t,e)},eu=(e={type:"raf"})=>t=>(...r)=>{let n=t(...r),i=!0,o=!1,a=!1,u=new Set,l="tick"===e.type?queueMicrotask:"raf"===e.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:ea(10):"callback"===e.type?e.queueNotification:ea(e.timeout),s=()=>{a=!1,o&&(o=!1,u.forEach(e=>e()))};return Object.assign({},n,{subscribe(e){let t=n.subscribe(()=>i&&e());return u.add(e),()=>{t(),u.delete(e)}},dispatch(e){try{return(o=!(i=!e?.meta?.RTK_autoBatch))&&!a&&(a=!0,l(s)),n.dispatch(e)}finally{i=!0}}})},el=e=>function(t){let{autoBatch:r=!0}=t??{},n=new er(e);return r&&n.push(eu("object"==typeof r?r:void 0)),n};function es(e){let t,r;let i=eo(),{reducer:a,middleware:c,devTools:f=!0,preloadedState:d,enhancers:p}=e||{};if("function"==typeof a)t=a;else if(l(a))t=function(e){let t;let r=Object.keys(e),i={};for(let t=0;t<r.length;t++){let n=r[t];"function"==typeof e[n]&&(i[n]=e[n])}let o=Object.keys(i);try{!function(e){Object.keys(e).forEach(t=>{let r=e[t];if(void 0===r(void 0,{type:u.INIT}))throw Error(n(12));if(void 0===r(void 0,{type:u.PROBE_UNKNOWN_ACTION()}))throw Error(n(13))})}(i)}catch(e){t=e}return function(e={},r){if(t)throw t;let a=!1,u={};for(let t=0;t<o.length;t++){let l=o[t],s=i[l],c=e[l],f=s(c,r);if(void 0===f)throw r&&r.type,Error(n(14));u[l]=f,a=a||f!==c}return(a=a||o.length!==Object.keys(e).length)?u:e}}(a);else throw Error(eD(1));r="function"==typeof c?c(i):i();let y=s;f&&(y=Y({trace:!1,..."object"==typeof f&&f}));let h=el(function(...e){return t=>(r,i)=>{let o=t(r,i),a=()=>{throw Error(n(15))},u={getState:o.getState,dispatch:(e,...t)=>a(e,...t)};return a=s(...e.map(e=>e(u)))(o.dispatch),{...o,dispatch:a}}}(...r));return function e(t,r,i){if("function"!=typeof t)throw Error(n(2));if("function"==typeof r&&"function"==typeof i||"function"==typeof i&&"function"==typeof arguments[3])throw Error(n(0));if("function"==typeof r&&void 0===i&&(i=r,r=void 0),void 0!==i){if("function"!=typeof i)throw Error(n(1));return i(e)(t,r)}let a=t,s=r,c=new Map,f=c,d=0,p=!1;function y(){f===c&&(f=new Map,c.forEach((e,t)=>{f.set(t,e)}))}function h(){if(p)throw Error(n(3));return s}function m(e){if("function"!=typeof e)throw Error(n(4));if(p)throw Error(n(5));let t=!0;y();let r=d++;return f.set(r,e),function(){if(t){if(p)throw Error(n(6));t=!1,y(),f.delete(r),c=null}}}function _(e){if(!l(e))throw Error(n(7));if(void 0===e.type)throw Error(n(8));if("string"!=typeof e.type)throw Error(n(17));if(p)throw Error(n(9));try{p=!0,s=a(s,e)}finally{p=!1}return(c=f).forEach(e=>{e()}),e}return _({type:u.INIT}),{dispatch:_,subscribe:m,getState:h,replaceReducer:function(e){if("function"!=typeof e)throw Error(n(10));a=e,_({type:u.REPLACE})},[o]:function(){return{subscribe(e){if("object"!=typeof e||null===e)throw Error(n(11));function t(){e.next&&e.next(h())}return t(),{unsubscribe:m(t)}},[o](){return this}}}}}(t,d,y(..."function"==typeof p?p(h):h()))}function ec(e){let t;let r={},n=[],i={addCase(e,t){let n="string"==typeof e?e:e.type;if(!n)throw Error(eD(28));if(n in r)throw Error(eD(29));return r[n]=t,i},addMatcher:(e,t)=>(n.push({matcher:e,reducer:t}),i),addDefaultCase:e=>(t=e,i)};return e(i),[r,n,t]}var ef=(e,t)=>G(e)?e.match(t):e(t),ed=(e=21)=>{let t="",r=e;for(;r--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t},ep=["name","message","stack","code"],ey=Symbol.for("rtk-slice-createasyncthunk"),eh=(e=>(e.reducer="reducer",e.reducerWithPrepare="reducerWithPrepare",e.asyncThunk="asyncThunk",e))(eh||{}),em=function({creators:e}={}){let t=e?.asyncThunk?.[ey];return function(e){let r;let{name:n,reducerPath:i=n}=e;if(!n)throw Error(eD(11));let o=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},a=Object.keys(o),u={},l={},s={},c=[],f={addCase(e,t){let r="string"==typeof e?e:e.type;if(!r)throw Error(eD(12));if(r in l)throw Error(eD(13));return l[r]=t,f},addMatcher:(e,t)=>(c.push({matcher:e,reducer:t}),f),exposeAction:(e,t)=>(s[e]=t,f),exposeCaseReducer:(e,t)=>(u[e]=t,f)};function d(){let[t={},r=[],n]="function"==typeof e.extraReducers?ec(e.extraReducers):[e.extraReducers],i={...t,...l};return function(e,t){let r;let[n,i,o]=ec(t);if("function"==typeof e)r=()=>en(e());else{let t=en(e);r=()=>t}function a(e=r(),t){let u=[n[t.type],...i.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return 0===u.filter(e=>!!e).length&&(u=[o]),u.reduce((e,r)=>{if(r){if(_(e)){let n=r(e,t);return void 0===n?e:n}if(b(e))return J(e,e=>r(e,t));{let n=r(e,t);if(void 0===n){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return n}}return e},e)}return a.getInitialState=r,a}(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of c)e.addMatcher(t.matcher,t.reducer);for(let t of r)e.addMatcher(t.matcher,t.reducer);n&&e.addDefaultCase(n)})}a.forEach(r=>{let i=o[r],a={reducerName:r,type:`${n}/${r}`,createNotation:"function"==typeof e.reducers};"asyncThunk"===i._reducerDefinitionType?function({type:e,reducerName:t},r,n,i){if(!i)throw Error(eD(18));let{payloadCreator:o,fulfilled:a,pending:u,rejected:l,settled:s,options:c}=r,f=i(e,o,c);n.exposeAction(t,f),a&&n.addCase(f.fulfilled,a),u&&n.addCase(f.pending,u),l&&n.addCase(f.rejected,l),s&&n.addMatcher(f.settled,s),n.exposeCaseReducer(t,{fulfilled:a||e_,pending:u||e_,rejected:l||e_,settled:s||e_})}(a,i,f,t):function({type:e,reducerName:t,createNotation:r},n,i){let o,a;if("reducer"in n){if(r&&"reducerWithPrepare"!==n._reducerDefinitionType)throw Error(eD(17));o=n.reducer,a=n.prepare}else o=n;i.addCase(e,o).exposeCaseReducer(t,o).exposeAction(t,a?ee(e,a):ee(e))}(a,i,f)});let p=e=>e,y=new Map;function h(e,t){return r||(r=d()),r(e,t)}function m(){return r||(r=d()),r.getInitialState()}function g(t,r=!1){function n(e){let n=e[t];return void 0===n&&r&&(n=m()),n}function i(t=p){let n=ei(y,r,()=>new WeakMap);return ei(n,t,()=>{let n={};for(let[i,o]of Object.entries(e.selectors??{}))n[i]=function(e,t,r,n){function i(o,...a){let u=t(o);return void 0===u&&n&&(u=r()),e(u,...a)}return i.unwrapped=e,i}(o,t,m,r);return n})}return{reducerPath:t,getSelectors:i,get selectors(){return i(n)},selectSlice:n}}let w={name:n,reducer:h,actions:s,caseReducers:u,getInitialState:m,...g(i),injectInto(e,{reducerPath:t,...r}={}){let n=t??i;return e.inject({reducerPath:n,reducer:h},r),{...w,...g(n,!0)}}};return w}}();function e_(){}var eb=class{constructor(e){this.code=e,this.message=`task cancelled (reason: ${e})`}name="TaskAbortError";message},eg=(e,t)=>{if("function"!=typeof e)throw TypeError(eD(32))},ew=()=>{},ev=(e,t=ew)=>(e.catch(t),e),eS=(e,t)=>(e.addEventListener("abort",t,{once:!0}),()=>e.removeEventListener("abort",t)),eE=(e,t)=>{let r=e.signal;r.aborted||("reason"in r||Object.defineProperty(r,"reason",{enumerable:!0,value:t,configurable:!0,writable:!0}),e.abort(t))},eO=e=>{if(e.aborted){let{reason:t}=e;throw new eb(t)}},ex=e=>t=>ev((function(e,t){let r=ew;return new Promise((n,i)=>{let o=()=>i(new eb(e.reason));if(e.aborted){o();return}r=eS(e,o),t.finally(()=>r()).then(n,i)}).finally(()=>{r=ew})})(e,t).then(t=>(eO(e),t))),{assign:eP}=Object,eT="listenerMiddleware",ej=e=>{let{type:t,actionCreator:r,matcher:n,predicate:i,effect:o}=e;if(t)i=ee(t).match;else if(r)t=r.type,i=r.match;else if(n)i=n;else if(i);else throw Error(eD(21));return eg(o,"options.listener"),{predicate:i,type:t,effect:o}},eC=eP(e=>{let{type:t,predicate:r,effect:n}=ej(e);return{id:ed(),effect:n,type:t,predicate:r,pending:new Set,unsubscribe:()=>{throw Error(eD(22))}}},{withTypes:()=>eC}),eN=eP(ee(`${eT}/add`),{withTypes:()=>eN}),ez=eP(ee(`${eT}/remove`),{withTypes:()=>ez}),eA=Symbol.for("rtk-state-proxy-original");function eD(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}},5904:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(4848);r(4472),r(7653),r(2823),r(7103),r(8779),r(7289),r(1372),r(5578),r(1812),r(7916),r(5595);var i=r(1468),o=r(9222),a=r(9410);let u=(0,o.U1)({reducer:{terminals:a.Ay},middleware:e=>e({serializableCheck:!1})}),l=function(e){let{Component:t,pageProps:r}=e;return(0,n.jsx)(i.Kq,{store:u,children:(0,n.jsx)(t,{...r})})}},9410:(e,t,r)=>{"use strict";r.d(t,{Al:()=>f,Ay:()=>k,Hk:()=>v,Kk:()=>N,L4:()=>m,NT:()=>C,Oe:()=>y,Q3:()=>O,Q4:()=>T,QZ:()=>c,R0:()=>l,RJ:()=>R,SO:()=>s,UT:()=>D,Wk:()=>a,Y_:()=>z,Zm:()=>u,ge:()=>S,n9:()=>b,pN:()=>d,re:()=>g,sf:()=>j,vJ:()=>E,x2:()=>h,y$:()=>P,yY:()=>A,zF:()=>_});var n=r(9222);let i={id:null,path:"/",fileSystem:null,history:[],historyIndex:-1,suggestions:[],isAwaitingPassword:!1,passwordType:null,lastSudoCommand:null,role:"guest",uid:null,isEditing:!1,editingFile:null,fileContent:"",input:"",output:[],permissions:{read:!0,write:!1,execute:!1},refs:{terminal:null,input:null},isDragging:!1,offset:{x:0,y:0},isMinimized:!1,isMaximized:!1,position:{x:window.innerWidth/2,y:window.innerHeight/2},dimensions:{width:600,height:400},isResizing:!1,resizeDirection:""},o=(0,n.Z0)({name:"terminals",initialState:{terminals:[],currentZIndex:1,positionOffset:20,fileSystem:null},reducers:{addTerminal:(e,t)=>{console.log(t.payload);let{id:r,key:n,content:o,editingFile:a,history:u,historyIndex:l,input:s,isEditing:c,isMinimized:f,output:d,path:p,position:y,role:h}=t.payload,m={...i,id:r,key:n,zIndex:e.currentZIndex+1,input:"",output:['Welcome to Terminal. Type "help" for available commands.'],path:"/",role:h||"guest",isEditing:c||!1,editingFile:a||null,fileContent:"",content:o||null,history:u||[],historyIndex:l||-1,isMinimized:f||!1};e.terminals.push(m),e.currentZIndex++,e.positionOffset+=20},removeTerminal:(e,t)=>{e.terminals=e.terminals.filter(e=>e.id!==t.payload)},bringToFront:(e,t)=>{e.currentZIndex++;let r=e.terminals.find(e=>e.id===t.payload);r&&(r.zIndex=e.currentZIndex)},setPath:(e,t)=>{let{terminalId:r,path:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.path=n)},setActiveTerminalId:(e,t)=>{e.activeTerminalId=t.payload},minimizeTerminal:(e,t)=>{let r=e.terminals.find(e=>e.id===t.payload);r&&(r.isMinimized=!r.isMinimized)},setFileSystem:(e,t)=>{let{fileSystem:r}=t.payload;e.fileSystem=r,e.terminals.forEach(e=>{e.fileSystem=r})},updateHistory:(e,t)=>{let{terminalId:r,command:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.history.push(n.trim()),i.historyIndex=i.history.length)},setHistoryIndex:(e,t)=>{let{terminalId:r,historyIndex:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.historyIndex=n)},setSuggestions:(e,t)=>{let{terminalId:r,suggestions:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.suggestions=n)},setAwaitingPassword:(e,t)=>{let{terminalId:r,awaiting:n,type:i,command:o}=t.payload,a=e.terminals.find(e=>e.id===r);a&&(a.isAwaitingPassword=n,a.passwordType=i,a.lastSudoCommand=o||null)},setRole:(e,t)=>{let{terminalId:r,role:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.role=n,"admin"===n?i.permissions={read:!0,write:!0,execute:!0}:i.permissions={read:!0,write:!1,execute:!1})},setInput:(e,t)=>{let{terminalId:r,input:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.input=n)},addOutput:(e,t)=>{let{terminalId:r,output:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&i.output.push(n)},clearOutput:(e,t)=>{let{terminalId:r}=t.payload,n=e.terminals.find(e=>e.id===r);n&&(n.output=[])},setEditingFile:(e,t)=>{if(!t.payload)return;let{terminalId:r,editingFile:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.editingFile=n)},setFileContent:(e,t)=>{if(!t.payload)return;let{terminalId:r,content:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.fileContent=n)},setIsEditing:(e,t)=>{if(!t.payload)return;let{terminalId:r,isEditing:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.isEditing=n)},updateTerminal:(e,t)=>{let{terminalId:r,updates:n}=t.payload;e.terminals=e.terminals.map(e=>e.id===r?{...e,...n}:e)},setTerminalRef:(e,t)=>{let{terminalId:r,ref:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.refs={...i.refs,terminal:n})},setInputRef:(e,t)=>{let{terminalId:r,ref:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.refs={...i.refs,input:n})},setDragging:(e,t)=>{let{terminalId:r,isDragging:n}=t.payload;console.log(n);let i=e.terminals.find(e=>e.id===r);i&&(i.isDragging=n)},setOffset:(e,t)=>{let{terminalId:r,offset:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.offset=n)},setMaximized:(e,t)=>{let{terminalId:r,isMaximized:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.isMaximized=n)},setPosition:(e,t)=>{let{terminalId:r,position:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.position=n)},setDimensions:(e,t)=>{let{terminalId:r,dimensions:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.dimensions=n)},setUid:(e,t)=>{let{terminalId:r,uid:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.uid=n)},setResizing:(e,t)=>{let{terminalId:r,isResizing:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.isResizing=n)},setResizeDirection:(e,t)=>{let{terminalId:r,direction:n}=t.payload,i=e.terminals.find(e=>e.id===r);i&&(i.resizeDirection=n)}}}),{addTerminal:a,removeTerminal:u,bringToFront:l,setPath:s,setFileSystem:c,updateHistory:f,setHistoryIndex:d,setSuggestions:p,setAwaitingPassword:y,minimizeTerminal:h,setRole:m,setInput:_,addOutput:b,clearOutput:g,updateTerminal:w,setEditingFile:v,setFileContent:S,setIsEditing:E,setActiveTerminalId:O,setTerminalRef:x,setInputRef:P,setDragging:T,setOffset:j,setMaximized:C,setPosition:N,setDimensions:z,setResizing:A,setResizeDirection:D,setUid:R}=o.actions,k=o.reducer},1468:(e,t,r)=>{"use strict";r.d(t,{Kq:()=>_,d4:()=>O,wA:()=>S});var n=r(6540),i=r(8418),o=Symbol.for("react.forward_ref"),a=Symbol.for("react.memo"),u={notify(){},get:()=>[]},l=!!("undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement),s="undefined"!=typeof navigator&&"ReactNative"===navigator.product,c=l||s?n.useLayoutEffect:n.useEffect,f={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},d={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},p={[o]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[a]:d};Object.getOwnPropertyNames,Object.getOwnPropertySymbols,Object.getOwnPropertyDescriptor,Object.getPrototypeOf,Object.prototype;var y=Symbol.for("react-redux-context"),h="undefined"!=typeof globalThis?globalThis:{},m=function(){if(!n.createContext)return{};let e=h[y]??=new Map,t=e.get(n.createContext);return t||(t=n.createContext(null),e.set(n.createContext,t)),t}(),_=function(e){let{children:t,context:r,serverState:i,store:o}=e,a=n.useMemo(()=>{let e=function(e,t){let r;let n=u,i=0,o=!1;function a(){c.onStateChange&&c.onStateChange()}function l(){if(i++,!r){let t,i;r=e.subscribe(a),t=null,i=null,n={clear(){t=null,i=null},notify(){(()=>{let e=t;for(;e;)e.callback(),e=e.next})()},get(){let e=[],r=t;for(;r;)e.push(r),r=r.next;return e},subscribe(e){let r=!0,n=i={callback:e,next:null,prev:i};return n.prev?n.prev.next=n:t=n,function(){r&&null!==t&&(r=!1,n.next?n.next.prev=n.prev:i=n.prev,n.prev?n.prev.next=n.next:t=n.next)}}}}}function s(){i--,r&&0===i&&(r(),r=void 0,n.clear(),n=u)}let c={addNestedSub:function(e){l();let t=n.subscribe(e),r=!1;return()=>{r||(r=!0,t(),s())}},notifyNestedSubs:function(){n.notify()},handleChangeWrapper:a,isSubscribed:function(){return o},trySubscribe:function(){o||(o=!0,l())},tryUnsubscribe:function(){o&&(o=!1,s())},getListeners:()=>n};return c}(o);return{store:o,subscription:e,getServerState:i?()=>i:void 0}},[o,i]),l=n.useMemo(()=>o.getState(),[o]);return c(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),l!==o.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,l]),n.createElement((r||m).Provider,{value:a},t)};function b(e=m){return function(){return n.useContext(e)}}var g=b();function w(e=m){let t=e===m?g:b(e),r=()=>{let{store:e}=t();return e};return Object.assign(r,{withTypes:()=>r}),r}var v=w(),S=function(e=m){let t=e===m?v:w(e),r=()=>t().dispatch;return Object.assign(r,{withTypes:()=>r}),r}(),E=(e,t)=>e===t,O=function(e=m){let t=e===m?g:b(e),r=(e,r={})=>{let{equalityFn:o=E}="function"==typeof r?{equalityFn:r}:r,{store:a,subscription:u,getServerState:l}=t();n.useRef(!0);let s=n.useCallback({[e.name]:t=>e(t)}[e.name],[e]),c=(0,i.useSyncExternalStoreWithSelector)(u.addNestedSub,a.getState,l||a.getState,s,o);return n.useDebugValue(c),c};return Object.assign(r,{withTypes:()=>r}),r}()}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(6170),t(8440))),_N_E=e.O()}]);