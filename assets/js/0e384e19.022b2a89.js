"use strict";(self.webpackChunksisyphus_docs=self.webpackChunksisyphus_docs||[]).push([[9671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(n),d=i,h=m["".concat(s,".").concat(d)]||m[d]||c[d]||o;return n?r.createElement(h,a(a({ref:t},p),{},{components:n})):r.createElement(h,a({ref:t},p))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_position:1},a="Introduce",l={unversionedId:"intro",id:"intro",title:"Introduce",description:"\u26a1\ufe0f Sisyphus can help you quickly build cloud-native modern backend services.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",draft:!1,editUrl:"https://github.com/ButterCam/sisyphus-docs/edit/main/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Getting Started",permalink:"/docs/getting-started"}},s={},u=[],p={toc:u};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduce"},"Introduce"),(0,i.kt)("p",null,"\u26a1\ufe0f Sisyphus can help you quickly build cloud-native modern backend services."),(0,i.kt)("p",null,"\ud83c\udfd7 Sisyphus uses a 'macroservices' design philosophy, which allows you to focus on business logic at the beginning of a\nproject and easily unpack it into microservices at a later stage of business expansion."),(0,i.kt)("p",null,"\ud83d\udcd3 Follow the ",(0,i.kt)("a",{parentName:"p",href:"https://google.aip.dev/"},"Google API Improvement Proposals")," for a handy guide to building robust and\nextensible APIs."),(0,i.kt)("p",null,"\ud83d\udca5 Ready for more? Use advanced features like Service Reflection, Swagger Integration, Service Monitoring, SQL Builder\nDSL and more!"),(0,i.kt)("p",null,"\ud83e\uddd0 Sisyphus is essentially a gRPC service framework built on Spring Boot and Kotlin, using Kotlin Coroutine technology to\nbuild asynchronous APIs."),(0,i.kt)("h1",{id:"features"},"Features"),(0,i.kt)("p",null,"Sisyphus has been designed from the ground up with a strong focus on the developer experience, helping you take a break\nfrom the tedium of business code."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\ud83e\udd44 ",(0,i.kt)("strong",{parentName:"li"},"Built with \u2764\ufe0f and Kotlin"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Develop with the more efficient Kotlin language"),(0,i.kt)("li",{parentName:"ul"},"Embrace the Java community, 100% compatibility with Java libraries"),(0,i.kt)("li",{parentName:"ul"},"Write high performance and very readable business logic using Kotlin concurrency techniques"))),(0,i.kt)("li",{parentName:"ul"},"\ud83e\uddd7\u200d ",(0,i.kt)("strong",{parentName:"li"},"Integration into the Protobuf/gRPC ecosystem"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Kotlin-specific Protobuf compiler to seamlessly integrate Protobuf into the Kotlin language system"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/devkanro/intellij-protobuf-plugin"},"Intellij Protobuf Plugin"),", which supports the Sisyphus\nframework, helps you write Protobuf files quickly"),(0,i.kt)("li",{parentName:"ul"},"Charles on gRPC, the ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/ButterCam/Mediator"},"Mediator")," proxy tool can help you debug gRPC services"),(0,i.kt)("li",{parentName:"ul"},"The minimalist gRPC client for Web ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/ButterCam/sisyphus.js"},"sisyphus.js")," helps you quickly\nintegrate into the browser"))),(0,i.kt)("li",{parentName:"ul"},"\ud83d\uddfa ",(0,i.kt)("strong",{parentName:"li"},"Follow the ",(0,i.kt)("a",{parentName:"strong",href:"https://google.aip.dev/"},"Google API Improvement Proposals")),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"When on the fence about API design, feel free to turn to the Google API Improvement Proposals"),(0,i.kt)("li",{parentName:"ul"},"Provides HTTP and gRPC Transcoding implementation, implementing both gRPC and beautiful Restful API at once"))),(0,i.kt)("li",{parentName:"ul"},"\u2601\ufe0f ",(0,i.kt)("strong",{parentName:"li"},"Native microservices"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Microservices and Macroservices can be assembled at will, retaining the features of microservices while including\nthe benefits of monolithic applications"),(0,i.kt)("li",{parentName:"ul"},"Deployment Plugin One-Click Deployment to K8s Environment"),(0,i.kt)("li",{parentName:"ul"},"Docker plugin supports layered builds using Spring Boot layered Jar to optimize image size"))),(0,i.kt)("li",{parentName:"ul"},"\ud83d\udc6c ",(0,i.kt)("strong",{parentName:"li"},"Developer Friendly"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Doing the most with the least configuration"),(0,i.kt)("li",{parentName:"ul"},"Configure the development environment using the readily editable gradle.properties"),(0,i.kt)("li",{parentName:"ul"},"Configure the runtime environment using the distributable Config Artifacts Jar")))),(0,i.kt)("h1",{id:"something-missing"},"Something missing?"),(0,i.kt)("p",null,"If you find issues with the documentation or have suggestions on how to improve the documentation or the project in\ngeneral, please ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ButterCam/sisyphus-docs/issues/new"},"file an issue"),"\u3002"))}c.isMDXComponent=!0}}]);