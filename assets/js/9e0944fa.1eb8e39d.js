"use strict";(self.webpackChunksisyphus_docs=self.webpackChunksisyphus_docs||[]).push([[6292],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(n),h=i,m=c["".concat(l,".").concat(h)]||c[h]||u[h]||r;return n?a.createElement(m,o(o({ref:t},d),{},{components:n})):a.createElement(m,o({ref:t},d))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1259:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:4},o="AIP with Sisyphus",s={unversionedId:"advanced-guides/aip-spec",id:"advanced-guides/aip-spec",title:"AIP with Sisyphus",description:"To help us follow the Google API Improvement Proposals, Sisyphus implements many standards that are not provided for",source:"@site/docs/advanced-guides/aip-spec.md",sourceDirName:"advanced-guides",slug:"/advanced-guides/aip-spec",permalink:"/docs/advanced-guides/aip-spec",draft:!1,editUrl:"https://github.com/ButterCam/sisyphus-docs/edit/main/docs/advanced-guides/aip-spec.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Service Discover",permalink:"/docs/advanced-guides/service-discover"}},l={},p=[{value:"AIP-122 Resource Name",id:"aip-122-resource-name",level:2},{value:"AIP-127 HTTP and gRPC Transcoding",id:"aip-127-http-and-grpc-transcoding",level:2},{value:"AIP-132 Standard methods: List",id:"aip-132-standard-methods-list",level:2},{value:"Sorting",id:"sorting",level:3},{value:"Filtering",id:"filtering",level:3},{value:"Pagination",id:"pagination",level:3},{value:"AIP-160 Filtering",id:"aip-160-filtering",level:2},{value:"Filter in SQL",id:"filter-in-sql",level:3},{value:"Filter in Code",id:"filter-in-code",level:3},{value:"AIP-161 Field masks",id:"aip-161-field-masks",level:2}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"aip-with-sisyphus"},"AIP with Sisyphus"),(0,i.kt)("p",null,"To help us follow the Google API Improvement Proposals, Sisyphus implements many standards that are not provided for\nimplementation in the AIP."),(0,i.kt)("h2",{id:"aip-122-resource-name"},"AIP-122 Resource Name"),(0,i.kt)("p",null,"A standard resource name format is provided in the ",(0,i.kt)("a",{parentName:"p",href:"https://google.aip.dev/122"},"AIP-122")," specification and is a unique\nidentifier for representing resources in the system."),(0,i.kt)("p",null,"Sisyphus generates a special type for all resource name definitions, which is used to easily extract individual parts of\nthe resource name in the code."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},'message Book {\n    option (google.api.resource) = {\n        type: "library.googleapis.com/Book"\n        pattern: "publishers/{publisher}/books/{book}"\n    };\n\n    // Book\'s resource name\n    // formatted as: publishers/{publisher}/books/{book}\n    string name = 1;\n\n    // Other fields\n}\n')),(0,i.kt)("p",null,"The above code will additionally generate a ",(0,i.kt)("inlineCode",{parentName:"p"},"Name")," interface type to represent the resource name of any pattern and\ngenerate a concrete implementation type for each pattern that implements the ",(0,i.kt)("inlineCode",{parentName:"p"},"Name")," interface."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},"interface Book : Message<Book, MutableBook> {\n    // Book's resource name interface type\n    public interface Name : ResourceName {\n        // The implementation type generated by the specific pattern in the resource name.\n        // When the resource name has more than one pattern, multiple implementation types may be generated\n        public class Base(`data`: Map<String, String>) : AbstractResourceName(data), Name {\n        }\n    }\n\n    // The string type of all referenced resource names will also be automatically changed to the corresponding interface type\n    val name: Name\n}\n")),(0,i.kt)("p",null,"In addition, if there are fields of type ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," referenced to the resource name, they will also be automatically\nchanged to the specified interface type, e.g."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},'message ListBooksRequest {\n    // publishers of the book\n    // Format: publishers/{publisher_id}\n    string parent = 1 [(google.api.resource_reference) = {\n        type: "library.googleapis.com/Publisher"\n    }];\n\n    // Other fields (e.g. page_size, page_token, filter, etc.)...\n}\n')),(0,i.kt)("p",null,"will change the type of the parent field to ",(0,i.kt)("inlineCode",{parentName:"p"},"Publisher.Name"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},"interface ListBooksRequest : Message<ListBooksRequest, MutableListBooksRequest> {\n    // The string type of the referenced resource name will also be automatically changed to the corresponding interface type\n    val parent: Publisher.Name\n}\n")),(0,i.kt)("p",null,"You can create a ",(0,i.kt)("inlineCode",{parentName:"p"},"Name")," object in Kotlin using ",(0,i.kt)("inlineCode",{parentName:"p"},"Name.of"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Name.invoke")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"Name.tryCreate"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'val name = Book.Name.of("publisher_id", "book_id") // just fill in the variable part\nval name =\n    Book.Name("publishers/123/books/456") // resolve a resource name in its entirety, and automatically create an UnknownResourceName when an unsupported pattern is encountered\nval name =\n    Book.Name.tryCreate("publishers/123/books/456") // Try to create a resource name, and return null when an unsupported pattern is encountered\n')),(0,i.kt)("p",null,"When you need to access a specific part of a resource name, you can directly use the corresponding variable name to get\nthe specified part, e.g."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},"val publisherId = name.publisherId\nval bookId = name.bookId\n")),(0,i.kt)("h2",{id:"aip-127-http-and-grpc-transcoding"},"AIP-127 HTTP and gRPC Transcoding"),(0,i.kt)("p",null,"In ",(0,i.kt)("a",{parentName:"p",href:"/docs/guides/http-transcoding"},"the previous section")," we mentioned how to use transcoding in Sisyphus to access the\ngRPC API via HTTP/Json."),(0,i.kt)("p",null,"In most cases, the semantics of the HTTP RequestHeader and the gRPC Metadata are not identical, so when accessing the\ngRPC API using HTTP, we also need to configure the transformation of the HTTP Header into the gRPC Metadata when\naccessing the gRPC API using HTTP."),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"TranscodingHeaderExporter")," to customize this process."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'@Component\nclass MyTranscodingHeaderExporter : TranscodingHeaderExporter {\n    private val keys = mutableMapOf<String, Metadata.Key<String>>()\n\n    private val allowedHeader = setOf(\n        HttpHeaders.AUTHORIZATION.lowercase(),\n        HttpHeaders.COOKIE.lowercase(),\n        HttpHeaders.FROM.lowercase(),\n        HttpHeaders.HOST.lowercase(),\n        HttpHeaders.REFERER.lowercase(),\n        HttpHeaders.ACCEPT_LANGUAGE.lowercase(),\n        HttpHeaders.PRAGMA.lowercase(),\n    )\n\n    private fun key(header: String): Metadata.Key<String> {\n        return keys.getOrPut(header) {\n            Metadata.Key.of(header, Metadata.ASCII_STRING_MARSHALLER)\n        }\n    }\n\n    override fun export(request: ServerRequest, metadata: Metadata) {\n        for ((key, values) in request.headers().asHttpHeaders()) {\n            val normalized = key.lowercase()\n            if (normalized in allowedHeader) {\n                metadata.put(key(normalized), values.joinToString(","))\n            }\n        }\n    }\n}\n')),(0,i.kt)("p",null,"In addition, due to the inherent limitations of the gRPC client, gRPC requests cannot be customized with ",(0,i.kt)("inlineCode",{parentName:"p"},"User-Agent"),",\nwe can also use ",(0,i.kt)("inlineCode",{parentName:"p"},"TranscodingHeaderExporter")," to convert the HTTP User-Agent to another gRPC Metadata to the gRPC service."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'override fun export(request: ServerRequest, metadata: Metadata) {\n    for ((key, values) in request.headers().asHttpHeaders()) {\n        if (key.equals(HttpHeaders.USER_AGENT, ignoreCase = true)) {\n            // Convert User-Agent to X-User-Agent\n            metadata.put(key("x-user-agent"), values.joinToString(","))\n            continue\n        }\n        val normalized = key.lowercase()\n        if (normalized in allowedHeader) {\n            metadata.put(key(normalized), values.joinToString(","))\n        }\n    }\n}\n')),(0,i.kt)("p",null,"The HTTP/Json interface is typically used in browsers, for which we also need to support preflight requests. Sisyphus\nwill automatically support preflight requests based on the configuration of the supported gRPC methods."),(0,i.kt)("p",null,"However, when we want to return the custom Metadata of the gRPC response to the client, due to browser limitations, we\nneed to enumerate the possible response headers in the preflight request in order to be read by the front-end."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"TranscodingCorsConfigurationInterceptor")," interface can be used to customize all preflight responses."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'@Component\nclass MyTranscodingCorsConfigurationInterceptor : TranscodingCorsConfigurationInterceptor {\n    override fun intercept(\n        config: CorsConfiguration,\n        method: ServerMethodDefinition<*, *>,\n        pattern: HttpRule.Pattern<*>,\n        path: String\n    ): CorsConfiguration {\n        config.addExposedHeader("request-id")\n        return config\n    }\n}\n')),(0,i.kt)("h2",{id:"aip-132-standard-methods-list"},"AIP-132 Standard methods: List"),(0,i.kt)("p",null,"List interfaces are common in API design, and Sisyphus provides a number of tools to make it easy for developers to\nquickly create list API."),(0,i.kt)("h3",{id:"sorting"},"Sorting"),(0,i.kt)("p",null,"In the List interface we may need to support the ",(0,i.kt)("inlineCode",{parentName:"p"},"order_by")," field to specify the sorting rules for the list,\nthe ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ButterCam/sisyphus/tree/master/lib/sisyphus-dsl"},"sisyphus-dsl")," component provides OrderDsl to\nparse the Ordering syntax in the ",(0,i.kt)("a",{parentName:"p",href:"https://google.aip.dev/132#ordering"},"AIP-132"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'val start = OrderDsl.parse("foo desc, bar")\n')),(0,i.kt)("p",null,"In addition, if JDBC is used as the backend database,\nthe ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-jdbc"},"sisyphus-jdbc")," middleware can translate\nthe ordering syntax into ",(0,i.kt)("inlineCode",{parentName:"p"},"order by")," part of SQL."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'val orderByBuilder = orderByBuilder {\n    field("foo", Tables.BAR.FOO)\n}\n\njooq.selectFrom(Tables.BAR).orderBy(orderByBuilder.build(orderBy))\n')),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"orderByBuilder")," DSL to quickly embed ordering syntax into a JOOQ query."),(0,i.kt)("h3",{id:"filtering"},"Filtering"),(0,i.kt)("p",null,"Sisyphus also implements a corresponding tool for filters DSL, but since the implementation of filters is more complex,\nwe will cover the details in ",(0,i.kt)("a",{parentName:"p",href:"http://localhost:3000/docs/advenced-guides/aip-spec#aip-160-filtering"},"AIP-160")," below."),(0,i.kt)("h3",{id:"pagination"},"Pagination"),(0,i.kt)("p",null,"Sisyphus recommends customizing a Protobuf Message to store the paging context and encode its binary serialization as\nUrlSafeBase64 as a ",(0,i.kt)("inlineCode",{parentName:"p"},"page_token"),"."),(0,i.kt)("p",null,"Here are two very common paging contexts for reference."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-protobuf"},"message IndexAnchorPaging {\n    int64 index = 1;\n}\n\nmessage OffsetPaging {\n    int32 offset = 1;\n}\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"IndexAnchorPaging")," is anchor-based paging, can be used for high performance paging, but can not support page skipping,\nusually used on the client side, its meaning is the index of the last element of the previous page, when getting the\nnext page just need to provide ",(0,i.kt)("inlineCode",{parentName:"p"},"WHERE id > paging.token")," to get the next page."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"OffsetPaging")," is an offset-based paging, which is worse in large amount of data, but more flexible and can support page\nskipping, usually used in the management backend, and the SQL statement translated as ",(0,i.kt)("inlineCode",{parentName:"p"},"LIMIT offset, limit")," is needed to\nget the next page."),(0,i.kt)("h2",{id:"aip-160-filtering"},"AIP-160 Filtering"),(0,i.kt)("p",null,"Filtering is an important part of the List interface and Sisyphus has gone to great lengths to simplify the work of\ndevelopers in this section, providing a very simple DSL to help developers translate the Filtering syntax structure into\ntraditional SQL."),(0,i.kt)("h3",{id:"filter-in-sql"},"Filter in SQL"),(0,i.kt)("p",null,"This is the most efficient way to implement filters, leaving the filter to the database to be processed, ensuring that a\nspecified amount of data is returned, as shown\nin ","[sisyphus-jdbc]","(",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-"},"https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-")," jdbc) The ",(0,i.kt)("inlineCode",{parentName:"p"},"sqlBuilder")," DSL is\nused in the middleware to create the ",(0,i.kt)("inlineCode",{parentName:"p"},"TableSqlBuilder"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'val sqlBuilder = sqlBuilder(Tables.FOO) {\n    field("name", Tables.FOO.ID) {\n        Foo.Name.tryCreate(it as String)?.note?.toLong()\n    }\n    field("bar", Tables.FOO.BAR)\n    field("title", Tables.BAZ.TITLE)\n    library(object : FilterStandardLibrary() {\n        fun withBaz(): Join {\n            return Join {\n                it.leftJoin(Tables.BAZ).on(Tables.BAZ.FOO_ID.eq(Tables.FOO.ID))\n            }\n        }\n    })\n}\n')),(0,i.kt)("p",null,"Specify the field names that can be used in the filtering statement in the ",(0,i.kt)("inlineCode",{parentName:"p"},"sqlBuilder")," DSL and map them to fields in\nthe database, as well as specify a custom transformation function."),(0,i.kt)("p",null,"Use this sqlBuilder to build SQL with JOOQ."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},"sqlBuilder.select(jooq, filter)\n    .orderBy(orderByBuilder.build(orderBy))\n")),(0,i.kt)("p",null,"And the client just needs to fill in the ",(0,i.kt)("inlineCode",{parentName:"p"},"filter")," field of the List interface with a filtering statement\nlike ",(0,i.kt)("inlineCode",{parentName:"p"},"name='foos/1' OR baz=2"),", which automatically translates to"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT *\nFROM foo\nWHERE (id = 1 OR baz = 2)\n")),(0,i.kt)("p",null,"You can also extend ",(0,i.kt)("inlineCode",{parentName:"p"},"FilterStandardLibrary")," to provide functions that can be used in filtering statements, and to\nenable join queries if the function returns a ",(0,i.kt)("inlineCode",{parentName:"p"},"Join")," object."),(0,i.kt)("p",null,"When the client fills in the filter field with ",(0,i.kt)("inlineCode",{parentName:"p"},"title='FooBar' withBaz()"),", Sisyphus applies the Join value of WithBaz\nto the JOOQ query."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT *\nFROM foo\n         LEFT JOIN baz ON baz.foo_id = foo.id\nWHERE (title = 'FooBar')\n")),(0,i.kt)("p",null,"When a function returns ",(0,i.kt)("inlineCode",{parentName:"p"},"Condition"),", the function can be written in a condition, allowing for complex queries that are\nnot possible with filter statements, or limited queries that are wrapped for security."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},'library(object : FilterStandardLibrary() {\n    fun safeQuery(): Condition {\n        return Tables.FOO.PASSWORD.eq("123456")\n    }\n})\n')),(0,i.kt)("p",null,"When the client fills in the filter field with ",(0,i.kt)("inlineCode",{parentName:"p"},"bar='foobar'' AND safeQuery()"),", the filter will be converted to the\nfollowing SQL statement."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT *\nFROM foo\nWHERE (baz = 2 AND password = '123456')\n")),(0,i.kt)("h3",{id:"filter-in-code"},"Filter in Code"),(0,i.kt)("p",null,"Another type of filtering is code filtering, which means that the data found in the database is logically filtered by\nlocal code. The filters in this way will be more powerful, but there may also case empty pages."),(0,i.kt)("p",null,"Sisyphus uses ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/google/cel-spec"},"CEL")," to describe this filter."),(0,i.kt)("p",null,"The full name of CEL is Common Expression Language, a non-Turing-complete expression language proposed by Google that\ncan be deeply integrated with Protobuf."),(0,i.kt)("p",null,"CelEngine is used in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/ButterCam/sisyphus/tree/master/lib/sisyphus-dsl"},"sisyphus-dsl")," to execute CEL\nexpressions."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},"val celEngine = CelEngine()\nval filteredItems = foos.filter {\n    celEngine.eval(\n        \"foo.bar == 'foobar' && foo.title == 'FooBar'\",\n        mapOf(\"foo\" to it)\n    )\n}\n")),(0,i.kt)("p",null,"In addition to being used as a filter, CEL can be used in a variety of scenarios that require dynamic code execution,\nsuch as permission checking, dynamic content, etc."),(0,i.kt)("h2",{id:"aip-161-field-masks"},"AIP-161 Field masks"),(0,i.kt)("p",null,"When implementing the Update interface, we often require partial update functionality, where the client can choose to\nupdate some fields instead of the entire object. Usually, this can be achieved by using a null value that is not\nupdated, but this makes it impossible to distinguish whether the user wants to delete the field or does not want to\nupdate the field."),(0,i.kt)("p",null,"In this case, ",(0,i.kt)("inlineCode",{parentName:"p"},"FieldMask")," can be used to solve this problem by passing an additional ",(0,i.kt)("inlineCode",{parentName:"p"},"update_mask")," field to guide the\nupdate operation of the service field."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-kotlin"},"Foo.resolveMask(updateMask).paths.forEach { field ->\n    when (field) {\n        Foo.BAR_FIELD_NAME -> this.bar = foo.bar.takeIf { foo.hasBar() }\n        Foo.TITLE_FIELD_NAME -> this.title = foo.title.takeIf { foo.hasTitle() }\n    }\n}\n")),(0,i.kt)("p",null,"Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"resolveMask")," method to normalize update_mask and access each field to be updated via paths."))}u.isMDXComponent=!0}}]);