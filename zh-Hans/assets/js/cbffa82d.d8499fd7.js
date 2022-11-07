"use strict";(self.webpackChunksisyphus_docs=self.webpackChunksisyphus_docs||[]).push([[5806],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(g,a(a({ref:t},c),{},{components:n})):r.createElement(g,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5235:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>p,toc:()=>l});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:2},a="\u5b9e\u73b0\u4e00\u4e2a gRPC \u63a5\u53e3",p={unversionedId:"guides/implement-a-grpc-api",id:"guides/implement-a-grpc-api",title:"\u5b9e\u73b0\u4e00\u4e2a gRPC \u63a5\u53e3",description:"\u6240\u6709\u7684 gRPC \u63a5\u53e3\u90fd\u7531 proto \u6587\u4ef6\u4e2d\u7684 service \u4e0e rpc \u5b9a\u4e49\uff0c\u8fd9\u4e9b\u5b9a\u4e49\u5c06\u4f1a\u88ab Sisyphus Protobuf \u63d2\u4ef6\u751f\u6210\u4e3a Kotlin \u4ee3\u7801\u3002",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/implement-a-grpc-api.md",sourceDirName:"guides",slug:"/guides/implement-a-grpc-api",permalink:"/zh-Hans/docs/guides/implement-a-grpc-api",draft:!1,editUrl:"https://github.com/ButterCam/sisyphus-docs/edit/main/docs/guides/implement-a-grpc-api.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u521b\u5efa\u4e00\u4e2a Message \u5b9e\u4f53",permalink:"/zh-Hans/docs/guides/create-a-message"},next:{title:"\u4e3a API \u63a5\u53e3\u63d0\u4f9b\u9a8c\u8bc1",permalink:"/zh-Hans/docs/guides/auth-your-api"}},s={},l=[{value:"<code>generateProtos</code> \u4efb\u52a1",id:"generateprotos-\u4efb\u52a1",level:2},{value:"\u629b\u51fa\u5f02\u5e38",id:"\u629b\u51fa\u5f02\u5e38",level:2},{value:"\u5b9e\u73b0 echo API",id:"\u5b9e\u73b0-echo-api",level:2}],c={toc:l};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u5b9e\u73b0\u4e00\u4e2a-grpc-\u63a5\u53e3"},"\u5b9e\u73b0\u4e00\u4e2a gRPC \u63a5\u53e3"),(0,o.kt)("p",null,"\u6240\u6709\u7684 gRPC \u63a5\u53e3\u90fd\u7531 proto \u6587\u4ef6\u4e2d\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"service")," \u4e0e ",(0,o.kt)("inlineCode",{parentName:"p"},"rpc")," \u5b9a\u4e49\uff0c\u8fd9\u4e9b\u5b9a\u4e49\u5c06\u4f1a\u88ab Sisyphus Protobuf \u63d2\u4ef6\u751f\u6210\u4e3a Kotlin \u4ee3\u7801\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-protobuf"},'service Echo {\n    rpc Echo (EchoRequest) returns (EchoResponse) {\n        option (google.api.http) = {\n            post: "/v1beta1/echo:echo"\n            body: "*"\n        };\n    }\n}\n')),(0,o.kt)("p",null,"\u5728\u6211\u4eec\u7684\u4e1a\u52a1\u4e2d\u53ea\u9700\u8981\u7b80\u5355\u7684\u6dfb\u52a0\u4e00\u4e2a\u7c7b\uff0c\u5e76\u96c6\u6210\u81ea\u751f\u6210\u7684\u62bd\u8c61\u7c7b\uff0c\u7136\u540e\u6253\u4e0a ",(0,o.kt)("inlineCode",{parentName:"p"},"@RpcServiceImpl")," \u6ce8\u89e3\u5373\u53ef\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-kotlin"},'@RpcServiceImpl\nclass EchoImpl : Echo() {\n    override suspend fun Echo(request: EchoRequest): EchoResponse {\n        TODO("not implemented")\n    }\n}\n')),(0,o.kt)("h2",{id:"generateprotos-\u4efb\u52a1"},(0,o.kt)("inlineCode",{parentName:"h2"},"generateProtos")," \u4efb\u52a1"),(0,o.kt)("p",null,"\u5728\u524d\u9762\u6211\u4eec\u4ecb\u7ecd\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"generateProtos")," Gradle \u4efb\u52a1\uff0c\u5b83\u4f1a\u4e3a\u6240\u6709\u7684 proto \u6587\u4ef6\u751f\u6210 Kotlin \u4ee3\u7801\u3002"),(0,o.kt)("p",null,"\u4efb\u4f55\u7f16\u8bd1\u64cd\u4f5c\u90fd\u4f9d\u8d56\u4e8e\u76f8\u5e94\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"generateProtos")," \u4efb\u52a1\uff0c\u6240\u4ee5\u5f53\u6267\u884c ",(0,o.kt)("inlineCode",{parentName:"p"},"build")," \u4efb\u52a1\u65f6\uff0cproto \u6587\u4ef6\u4e5f\u4f1a\u81ea\u52a8\u751f\u6210\u3002"),(0,o.kt)("p",null,"\u4f46\u662f\u5728\u4ee3\u7801\u4e0d\u5b8c\u5168 Kotlin \u65e0\u6cd5\u6b63\u5e38\u7f16\u8bd1\u7684\u65f6\u5019\uff0c\u6211\u4eec\u8fd8\u662f\u9700\u8981\u624b\u52a8\u6267\u884c ",(0,o.kt)("inlineCode",{parentName:"p"},"generateProtos"),"\u3002"),(0,o.kt)("admonition",{title:"\u63d0\u793a",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"\u5f53 proto \u6587\u4ef6\u53d1\u751f\u4e86\u53d8\u66f4\uff0c\u6216\u8005\u627e\u4e0d\u5230 proto \u4e2d\u7684\u5143\u7d20\u65f6\uff0c\u5c31\u6267\u884c ",(0,o.kt)("inlineCode",{parentName:"p"},"generateProtos")," \u5427\uff01")),(0,o.kt)("h2",{id:"\u629b\u51fa\u5f02\u5e38"},"\u629b\u51fa\u5f02\u5e38"),(0,o.kt)("p",null,"\u53ef\u4ee5\u5728 gRPC \u7684\u5b9e\u73b0\u4e2d\u968f\u610f\u7684\u629b\u51fa ",(0,o.kt)("inlineCode",{parentName:"p"},"StatusException"),"\uff0cSisyphus \u4f1a\u6b63\u786e\u7684\u5c06\u6b64\u5f02\u5e38\u8f6c\u6362\u4e3a gRPC \u7684\u9519\u8bef\u54cd\u5e94\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-kotlin"},"import com.bybutter.sisyphus.rpc.StatusException\n\nthrow StatusException(Code(it.code), it.message).withDetails(it.details)\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"StatusException"),"\n\u5177\u6709\u5f88\u591a\u65b9\u4fbf\u7684\u51fd\u6570\uff0c\u53ef\u4ee5\u63d0\u4f9b\u66f4\u591a\u7684\u9519\u8bef\u4fe1\u606f\uff0c\u8fd9\u4e9b\u9519\u8bef\u4fe1\u606f\u7684\u6807\u51c6",(0,o.kt)("a",{parentName:"p",href:"https://github.com/googleapis/api-common-protos/blob/main/google/rpc/error_details.proto"},"\u7531 Google \u9884\u5b9a\u4e49"),"\n\uff0cSisyphus \u5b9e\u73b0\u4e86\u8fd9\u4e9b\u6807\u51c6\u3002"),(0,o.kt)("admonition",{title:"\u6ce8\u610f",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"\u4f7f\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"StatusException")," \u65f6\uff0c\u6ce8\u610f\u5bfc\u5165\u7684\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"com.bybutter.sisyphus.rpc")," \u5305\u4e0b\u7684\uff0c\u800c\u4e0d\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"io.grpc")," \u5305\u3002",(0,o.kt)("inlineCode",{parentName:"p"},"io.grpc.StatusException")," \u63d0\u4f9b\u7684\u662f\u6700\u57fa\u7840\u7684\u5f02\u5e38\u7c7b\uff0c\u867d\u7136\nSisyphus \u4e5f\u80fd\u591f\u5904\u7406\uff0c\u4f46\u662f\u56e0\u4e3a\u4e0d\u652f\u6301\u989d\u5916\u7684\u4fe1\u606f\uff0c\u6240\u4ee5\u4e0d\u63a8\u8350\u4f7f\u7528\u3002")),(0,o.kt)("h2",{id:"\u5b9e\u73b0-echo-api"},"\u5b9e\u73b0 echo API"),(0,o.kt)("p",null,"\u4e86\u89e3\u4e86\u5982\u4f55\u521b\u5efa Message \u4e0e\u629b\u51fa\u5f02\u5e38\uff0c\u6211\u4eec\u5c31\u80fd\u6b63\u786e\u7684\u5b9e\u73b0 ",(0,o.kt)("inlineCode",{parentName:"p"},"Echo.echo")," API \u4e86\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-kotlin"},"override suspend fun echo(input: EchoRequest): EchoResponse {\n    input.error?.let {\n        throw StatusException(Code(it.code), it.message)\n            .withDetails(it.details)\n    }\n    return EchoResponse {\n        this.content = input.content\n        this.severity = input.severity\n    }\n}\n")),(0,o.kt)("p",null,"\u4e0a\u9762\u8fd9\u4e2a\u4f8b\u5b50\u662f\u6700\u7b80\u5355\u7684 gRPC API\uff0c\u4f1a\u5c06 ",(0,o.kt)("inlineCode",{parentName:"p"},"EchoRequest")," \u4e2d\u7684\u5185\u5bb9\u8f6c\u6362\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"EchoResponse")," \u4e2d\u7684\u5185\u5bb9\u3002"),(0,o.kt)("p",null,"\u5982\u679c ",(0,o.kt)("inlineCode",{parentName:"p"},"EchoRequest")," \u4e2d\u5305\u542b\u4e00\u4e2a\u9519\u8bef\uff0c\u5219\u4f1a\u629b\u51fa ",(0,o.kt)("inlineCode",{parentName:"p"},"StatusException")," \u6765\u5c55\u793a\u8fd9\u4e2a\u9519\u8bef\u3002"))}u.isMDXComponent=!0}}]);