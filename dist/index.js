import {Container}from'@cruxkit/container';import {Icon}from'@cruxkit/icon';import {Divider}from'@cruxkit/divider';import {push}from'@cruxjs/client';import {jsxs,jsx,Fragment}from'@minejs/jsx/jsx-runtime';function S(e){return e==="sm"?2:e==="lg"?6:4}function J(e){if(e!==void 0)return typeof e=="number"?e:S(e)}function x(e){if(e==="flex-start")return "start";if(e==="center")return "center";if(e==="flex-end")return "end"}function p(e,t){if(e){if(typeof e=="function")return e();if(t){if(e instanceof Node)return e.cloneNode(true);if(Array.isArray(e))return e.map(s=>s instanceof Node?s.cloneNode(true):s)}return e}}function C(e){return e.type==="logo"||e.keepOnMobile?"":"hidden md:flex"}function y(e,t,s){let u=t?.config?.[e.type],f=J(u?.gap);if(e.type==="logo")return jsx(Container,{display:"flex",align:"center",gap:f??2,className:"navbar-item navbar-logo cursor-pointer",onClick:()=>push("/"),children:p(e.content,s)});if(e.type==="links")return jsx(Container,{as:"ul",display:"flex",align:"center",gap:f??1,h:"full",className:"navbar-item navbar-links",children:p(e.content,s)});if(e.type==="actions")return jsx(Container,{display:"flex",align:"center",gap:f??2,h:"full",className:"navbar-item navbar-actions",children:p(e.content,s)});if(e.type==="search")return jsx(Container,{display:"flex",align:"center",gap:f??2,h:"full",className:"navbar-item navbar-search",children:p(e.content,s)});if(e.type==="divider"){let o=p(e.content,s);return o?jsx(Container,{display:"flex",align:"center",w:"auto",h:"full",px:2,className:"navbar-item navbar-divider",children:o}):jsx(Container,{display:"flex",align:"center",w:"auto",h:"full",px:2,className:"navbar-item navbar-divider",children:jsx(Divider,{orientation:"vertical",thickness:t?.dividerThickness||"super-thin",spacing:t?.dividerSpacing??2,opacity:t?.dividerOpacity??50,variant:t?.dividerVariant,color:t?.dividerColor,max:t?.dividerMax??60})})}return jsx(Container,{display:"flex",align:"center",h:"full",className:"navbar-item navbar-custom",children:p(e.content,s)})}function g(e,t,s,u){return e.type==="divider"?false:e.divider===true?true:e.divider===false?false:false}function X(e){let t=e.mode||"horizontal",s=e.gap||"md",u=(n,r)=>{let l=n.dividerMainOnMobile||e.dividerMainOnMobile,v={thickness:e.dividerThickness||"super-thin",spacing:e.dividerSpacing??2,opacity:e.dividerOpacity??50,variant:e.dividerVariant,color:e.dividerColor,max:e.dividerMax??60};return l?l==="hidden"?jsx(Container,{h:r==="vertical"?"full":void 0,w:r==="vertical"?void 0:"full",className:"hidden md:flex items-center",children:jsx(Divider,{orientation:r,...v})}):l==="visible"?jsx(Divider,{orientation:r,...v}):l==="horizontal"?r==="vertical"?jsxs(Fragment,{children:[jsx(Container,{w:"full",className:"md:hidden flex items-center",children:jsx(Divider,{orientation:"horizontal",...v})}),jsx(Container,{h:"full",className:"hidden md:flex items-center",children:jsx(Divider,{orientation:"vertical",...v})})]}):jsx(Divider,{orientation:"horizontal",...v}):l==="vertical"?r==="horizontal"?jsxs(Fragment,{children:[jsx(Container,{h:"full",className:"flex md:hidden items-center",children:jsx(Divider,{orientation:"vertical",...v})}),jsx(Container,{w:"full",className:"hidden md:flex items-center",children:jsx(Divider,{orientation:"horizontal",...v})})]}):jsx(Divider,{orientation:"vertical",...v}):null:jsx(Divider,{orientation:r,...v})},f=e.items.map(n=>{let r=n.position||e.config?.[n.type]?.position||"start";return {item:n,position:r}}),o={start:f.filter(n=>n.position==="start").map(n=>n.item),centerStart:f.filter(n=>n.position==="center-start").map(n=>n.item),center:f.filter(n=>n.position==="center").map(n=>n.item),centerEnd:f.filter(n=>n.position==="center-end").map(n=>n.item),end:f.filter(n=>n.position==="end").map(n=>n.item)},N=e.items.filter(n=>n.type!=="logo"&&!n.keepOnMobile),w=e.mobileActionsPosition||"top",m=e.mobileItemsLayout||"vertical",I=w==="bottom"?N.filter(n=>n.type!=="actions"):N,k=w==="bottom"?N.filter(n=>n.type==="actions"):[],E=N.length>0,h=S(s),z=t==="vertical"?{direction:"column",sectionDirection:"column"}:{direction:"row",sectionDirection:"row"},j=e.sticky?"sticky top-0 z-40":"";return jsxs(Container,{as:"nav",display:"flex",direction:z.direction,gap:h,bg:"surface",className:`
                    navbar
                    ${t==="horizontal"?"border-b":"border-e"}
                    border-1
                    ${j}
                    ${e.className||""}
                `,children:[o.start.length>0&&jsx(Container,{display:"flex",direction:z.sectionDirection,gap:h,align:"center",h:"full",className:"navbar-section navbar-section--start",children:o.start.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:n.type!=="divider"?x(n.align):void 0,h:"full",className:`
                                        navbar-item-wrapper
                                        ${C(n)}
                                    `,children:y(n,e)}),g(n)&&jsx(Container,{display:"flex",align:"center",h:t==="horizontal"?"full":void 0,w:t==="horizontal"?void 0:"full",children:u(n,t==="horizontal"?"vertical":"horizontal")})]}))}),(o.center.length>0||o.centerStart.length>0||o.centerEnd.length>0)&&jsxs(Container,{display:"flex",direction:z.sectionDirection,gap:h,align:"center",justify:"between",h:"full",className:"navbar-section navbar-section--center flex-1",children:[o.centerStart.length>0&&jsx(Container,{display:"flex",align:"center",justify:"start",h:"full",className:"flex-1",children:o.centerStart.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:n.type!=="divider"?x(n.align):void 0,h:"full",className:`
                                                navbar-item-wrapper
                                                ${C(n)}
                                            `,children:y(n,e)}),g(n)&&jsx(Container,{display:"flex",align:"center",h:t==="horizontal"?"full":void 0,w:t==="horizontal"?void 0:"full",children:u(n,t==="horizontal"?"vertical":"horizontal")})]}))}),o.center.length>0&&jsx(Container,{display:"flex",align:"center",justify:"center",h:"full",className:"flex-0",children:o.center.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:n.type!=="divider"?x(n.align):void 0,h:"full",className:`
                                                navbar-item-wrapper
                                                ${C(n)}
                                            `,children:y(n,e)}),g(n)&&jsx(Container,{display:"flex",align:"center",h:t==="horizontal"?"full":void 0,w:t==="horizontal"?void 0:"full",children:u(n,t==="horizontal"?"vertical":"horizontal")})]}))}),o.centerEnd.length>0&&jsx(Container,{display:"flex",align:"center",justify:"end",h:"full",className:"flex-1",children:o.centerEnd.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:n.type!=="divider"?x(n.align):void 0,h:"full",className:`
                                                navbar-item-wrapper
                                                ${C(n)}
                                            `,children:y(n,e)}),g(n)&&jsx(Container,{display:"flex",align:"center",className:t==="horizontal"?"h-full":"w-full",children:u(n,t==="horizontal"?"vertical":"horizontal")})]}))})]}),o.end.length>0&&jsxs(Container,{display:"flex",direction:z.sectionDirection,gap:h,align:"center",h:"full",className:"navbar-section navbar-section--end justify-end",children:[o.end.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:n.type!=="divider"?x(n.align):void 0,h:"full",className:`
                                        navbar-item-wrapper
                                        ${C(n)}
                                    `,children:y(n,e)}),g(n)&&jsx(Container,{display:"flex",align:"center",className:t==="horizontal"?"h-full":"w-full",children:u(n,t==="horizontal"?"vertical":"horizontal")})]})),E&&jsxs(Container,{display:"flex",align:"center",className:"navbar-mobile-toggle ms-4 md:hidden",children:[jsx("input",{id:"navbar-mobile-toggle",type:"checkbox",className:"peer sr-only","aria-label":"Toggle navigation menu"}),jsx("label",{htmlFor:"navbar-mobile-toggle",tabIndex:0,role:"button","aria-expanded":"false",className:`\r
                                        flex\r
                                        items-center\r
                                        size-10\r
                                        border-1\r
                                        rounded-md\r
                                        bg-surface\r
                                        items-center\r
                                        justify-center\r
                                        transition-transform\r
                                        duration-200\r
                                        ease-out\r
                                        hover:bg-brand-subtle\r
                                        cursor-pointer\r
                                        focus:outline-none\r
                                        focus:ring-2\r
                                        focus:ring-brand\r
                                    `,onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.target.click());},children:jsx(Icon,{name:"bars",size:"md"})}),jsx("label",{htmlFor:"navbar-mobile-toggle",className:`\r
                                        fixed\r
                                        inset-0\r
                                        hidden\r
                                        md:hidden\r
                                        peer-checked:block\r
                                        bg-black\r
                                        bg-opacity-50\r
                                        z-40\r
                                    `,"aria-hidden":"true"}),jsxs(Container,{display:"flex",direction:"column",className:`\r
                                        navbar-mobile-drawer\r
                                        fixed\r
                                        inset-y-0\r
                                        end-0\r
                                        z-50\r
                                        w-64\r
                                        max-w-full\r
                                        bg-surface\r
                                        border-s\r
                                        border-1\r
                                        shadow-lg\r
                                        md:hidden\r
                                        translate-x-full\r
                                        transition-transform\r
                                        duration-300\r
                                        ease-out\r
                                        peer-checked:translate-x-0\r
                                    `,children:[jsxs(Container,{display:"flex",direction:"column",gap:h,className:"p-4 flex-1 overflow-y-auto",children:[jsx(Container,{display:"flex",justify:"end",children:jsx("label",{htmlFor:"navbar-mobile-toggle",tabIndex:0,role:"button","aria-label":"Close navigation menu",className:`\r
                                                    flex\r
                                                    items-center\r
                                                    justify-center\r
                                                    size-8\r
                                                    rounded-md\r
                                                    cursor-pointer\r
                                                    hover:bg-brand-subtle\r
                                                    focus:outline-none\r
                                                    focus:ring-2\r
                                                    focus:ring-brand\r
                                                `,onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.target.click());},children:jsx(Icon,{name:"x",size:"md"})})}),jsx(Container,{display:"flex",direction:"column",gap:h,w:"full",children:I.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:"center",w:"full",className:"navbar-item-wrapper",children:y(n,e,true)}),g(n)&&jsx(Container,{w:"full",children:jsx(Divider,{orientation:"horizontal",thickness:e.sidebarDividerThickness||e.dividerThickness||"super-thin",spacing:e.sidebarDividerSpacing??e.dividerSpacing??2,opacity:e.sidebarDividerOpacity??e.dividerOpacity??50,variant:e.sidebarDividerVariant||e.dividerVariant,color:e.sidebarDividerColor||e.dividerColor,max:e.sidebarDividerMax??e.dividerMax??60})})]}))})]}),k.length>0&&jsx(Container,{display:"flex",direction:m==="horizontal"?"row":"column",wrap:m==="horizontal"?true:void 0,gap:h,align:m==="horizontal"?"center":void 0,justify:m==="horizontal"?"center":void 0,w:"full",className:"p-4 border-t border-1",children:k.map((n,r,l)=>jsxs(Fragment,{children:[jsx(Container,{display:"flex",align:"center",justify:"center",w:m==="horizontal"?void 0:"full",className:"navbar-item-wrapper",children:y(n,e,true)}),g(n)&&jsx(Container,{w:m==="horizontal"?void 0:"full",h:m==="horizontal"?"full":void 0,px:m==="horizontal"?2:void 0,children:jsx(Divider,{orientation:m==="horizontal"?"vertical":"horizontal",thickness:e.sidebarDividerThickness||e.dividerThickness||"super-thin",spacing:e.sidebarDividerSpacing??e.dividerSpacing??2,opacity:e.sidebarDividerOpacity??e.dividerOpacity??50,variant:e.sidebarDividerVariant||e.dividerVariant,color:e.sidebarDividerColor||e.dividerColor,max:e.sidebarDividerMax??e.dividerMax??60})})]}))})]})]})]})]})}export{X as Navbar};//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map