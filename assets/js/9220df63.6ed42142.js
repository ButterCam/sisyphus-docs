"use strict";(self.webpackChunksisyphus_docs=self.webpackChunksisyphus_docs||[]).push([[4638],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,y=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return r?n.createElement(y,o(o({ref:t},l),{},{components:r})):n.createElement(y,o({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2677:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:3},o="\u4e3a API \u63a5\u53e3\u63d0\u4f9b\u9a8c\u8bc1",p={unversionedId:"guides/auth-your-api",id:"guides/auth-your-api",title:"\u4e3a API \u63a5\u53e3\u63d0\u4f9b\u9a8c\u8bc1",description:"Sisyphus \u5728\u6784\u5efa gRPC \u670d\u52a1\u7684\u65f6\u5019\uff0c\u4f1a\u5c06 Spring \u4e0a\u4e0b\u6587\u4e2d\u7684\u6240\u6709 ServerInterceptor \u90fd\u52a0\u5165\u5176\u4e2d\u3002",source:"@site/docs/guides/auth-your-api.md",sourceDirName:"guides",slug:"/guides/auth-your-api",permalink:"/docs/guides/auth-your-api",draft:!1,editUrl:"https://github.com/ButterCam/sisyphus-docs/edit/main/docs/guides/auth-your-api.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"\u5b9e\u73b0\u4e00\u4e2a gRPC \u63a5\u53e3",permalink:"/docs/guides/implement-a-grpc-api"},next:{title:"\u63d0\u4f9b HTTP Restful API",permalink:"/docs/guides/http-transcoding"}},s={},c=[],l={toc:c};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4e3a-api-\u63a5\u53e3\u63d0\u4f9b\u9a8c\u8bc1"},"\u4e3a API \u63a5\u53e3\u63d0\u4f9b\u9a8c\u8bc1"),(0,a.kt)("p",null,"Sisyphus \u5728\u6784\u5efa gRPC \u670d\u52a1\u7684\u65f6\u5019\uff0c\u4f1a\u5c06 Spring \u4e0a\u4e0b\u6587\u4e2d\u7684\u6240\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"ServerInterceptor")," \u90fd\u52a0\u5165\u5176\u4e2d\u3002"),(0,a.kt)("p",null,"\u53ef\u4ee5\u901a\u8fc7\u4efb\u4f55 Spring \u6240\u652f\u6301\u7684\u65b9\u5f0f\u521b\u5efa\u4e00\u4e2a ",(0,a.kt)("inlineCode",{parentName:"p"},"ServerInterceptor")," Bean \u6765\u5b9e\u73b0\u81ea\u5b9a\u4e49\u7684\u9a8c\u8bc1\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-kotlin"},'@Component\nclass AuthInterceptor : ServerInterceptor {\n    private val key = Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER)\n\n    override fun <ReqT : Any?, RespT : Any?> interceptCall(\n        call: ServerCall<ReqT, RespT>,\n        headers: Metadata,\n        next: ServerCallHandler<ReqT, RespT>\n    ): ServerCall.Listener<ReqT> {\n        val auth = headers.get(key)\n        if (auth != "Bearer MyToken") {\n            throw io.grpc.StatusException(Status.UNAUTHENTICATED)\n        }\n        return next.startCall(call, headers)\n    }\n}\n')),(0,a.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"\u6ce8\u610f")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u7531\u4e8e ",(0,a.kt)("inlineCode",{parentName:"p"},"ServerInterceptor")," \u4e0d\u7531 Sisyphus \u7ba1\u7406\uff0c\u6240\u4ee5\u5728\u8fd9\u91cc\u9700\u8981\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"io.grpc.StatusException"),"\u3002"))))}u.isMDXComponent=!0}}]);