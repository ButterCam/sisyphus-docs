"use strict";(self.webpackChunksisyphus_docs=self.webpackChunksisyphus_docs||[]).push([[4638],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>y});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=s(r),y=a,m=d["".concat(u,".").concat(y)]||d[y]||l[y]||o;return r?n.createElement(m,i(i({ref:t},c),{},{components:r})):n.createElement(m,i({ref:t},c))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var p={};for(var u in t)hasOwnProperty.call(t,u)&&(p[u]=t[u]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2677:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>l,frontMatter:()=>o,metadata:()=>p,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:3},i="Auth your API",p={unversionedId:"guides/auth-your-api",id:"guides/auth-your-api",title:"Auth your API",description:"Sisyphus adds all the ServerInterceptors in the Spring context when building the gRPC service.",source:"@site/docs/guides/auth-your-api.md",sourceDirName:"guides",slug:"/guides/auth-your-api",permalink:"/docs/guides/auth-your-api",draft:!1,editUrl:"https://github.com/ButterCam/sisyphus-docs/edit/main/docs/guides/auth-your-api.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Implement a gRPC API",permalink:"/docs/guides/implement-a-grpc-api"},next:{title:"HTTP Transcoding",permalink:"/docs/guides/http-transcoding"}},u={},s=[],c={toc:s};function l(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"auth-your-api"},"Auth your API"),(0,a.kt)("p",null,"Sisyphus adds all the ",(0,a.kt)("inlineCode",{parentName:"p"},"ServerInterceptors")," in the Spring context when building the gRPC service."),(0,a.kt)("p",null,"A ",(0,a.kt)("inlineCode",{parentName:"p"},"ServerInterceptor")," bean can be created to implement custom validation in any way Spring supports."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-kotlin"},'@Component\nclass AuthInterceptor : ServerInterceptor {\n    private val key = Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER)\n\n    override fun <ReqT : Any?, RespT : Any?> interceptCall(\n        call: ServerCall<ReqT, RespT>,\n        headers: Metadata,\n        next: ServerCallHandler<ReqT, RespT>\n    ): ServerCall.Listener<ReqT> {\n        val auth = headers.get(key)\n        if (auth != "Bearer MyToken") {\n            throw io.grpc.StatusException(Status.UNAUTHENTICATED)\n        }\n        return next.startCall(call, headers)\n    }\n}\n')),(0,a.kt)("admonition",{title:"Caution",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Since ",(0,a.kt)("inlineCode",{parentName:"p"},"ServerInterceptor")," is not managed by Sisyphus, you need to use ",(0,a.kt)("inlineCode",{parentName:"p"},"io.grpc.StatusException")," here.")))}l.isMDXComponent=!0}}]);