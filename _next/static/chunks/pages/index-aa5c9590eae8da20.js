(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{7276:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7682)}])},7925:(e,t,n)=>{"use strict";n.d(t,{db:()=>a,j:()=>c});var i=n(223),r=n(2405),s=n(9640),l=n(2571);let o=(0,i.Wp)({apiKey:"AIzaSyDNxQqCgDqgKwqlr6CD236mZ7yFNzv8OMc",authDomain:"peaz-os.firebaseapp.com",projectId:"peaz-os",storageBucket:"peaz-os.firebasestorage.app",messagingSenderId:"1072881959988",appId:"1:1072881959988:web:3432093b67245713443661"}),a=(0,r.aU)(o),c=(0,s.xI)(o);(0,l.Uz)(o),(0,s.zK)(c).then(()=>{}).catch(e=>{console.error("Anonymous sign-in error:",e)})},807:(e,t,n)=>{"use strict";n.d(t,{d:()=>s,o:()=>l});var i=n(2405),r=n(7925);let s=async e=>{try{if(!e||!e["~"])throw Error("Invalid file system structure");let t=JSON.parse(JSON.stringify(e));return await (0,i.BN)((0,i.H9)(r.db,"fileSystems","default"),t),console.log("File system saved successfully"),t}catch(e){throw console.error("Error saving to Firestore:",e),e}},l=async()=>{try{let e=(0,i.H9)(r.db,"fileSystems","default"),t=await (0,i.x7)(e);if(t.exists()){let e=t.data();if(!e||!e["~"])throw Error("Invalid file system data");return e}return null}catch(e){return console.error("Error fetching file system:",e),null}}},7682:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>L});var i=n(4848),r=n(6540),s=n(1468),l=n(7360),o=n(1928),a=n(9410),c=n(807);let d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/";if(!t||!e)return null;let n=t.split("/").filter(Boolean),i=e["~"];for(let e of n){if(".."===e){n.pop();continue}if(!i||!i.content||!i.content[e])return null;i=i.content[e]}return i},u=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/";if("string"!=typeof t)return console.error("resolvePath: targetPath is not a string",t),e;if("string"!=typeof e&&(console.error("resolvePath: path is not a string",e),e="/"),t.startsWith("/"))return t;let n=e.split("/").filter(Boolean);for(let e of t.split("/").filter(Boolean))".."===e?n.pop():"."!==e&&n.push(e);return"/"+n.join("/")},m=e=>{let{id:t}=e,n=(0,s.wA)(),u=(0,s.d4)(e=>e.terminals.terminals.find(e=>e.id===t)),m=(0,s.d4)(e=>e.terminals.fileSystem),h=null==u?void 0:u.editingFile,g=null==h?void 0:h.split("/").pop(),p=null==u?void 0:u.fileContent,[f,y]=(0,r.useState)("string"==typeof p?p:"object"==typeof p?JSON.stringify(p,null,2):""),x=async()=>{if(!h){console.error("No file being edited");return}try{if(console.log("Starting save operation:",h),!m||!m["~"])throw Error("File system not initialized");let e=JSON.parse(JSON.stringify(m)),i=h.startsWith("/")?h.substring(1):h,r=i.split("/"),s=r.pop(),l=r.join("/")||"/";console.log("Debug:",{normalizedPath:i,dirPath:l,fileName:s});let o=d(e,l);if(!o)throw Error("Directory ".concat(l," not found"));o.content||(o.content={}),o.content[s]||(o.content[s]={type:"file",content:""}),o.content[s].content=f,n((0,a.QZ)({fileSystem:e})),await (0,c.d)(e),n((0,a.vJ)({terminalId:t,isEditing:!1})),n((0,a.Hk)({terminalId:t,editingFile:null})),n((0,a.ge)({terminalId:t,content:""}))}catch(e){console.error("Save error:",e),alert("Error saving file: ".concat(e.message))}};(0,r.useEffect)(()=>{y("string"==typeof p?p:"object"==typeof p?JSON.stringify(p,null,2):"")},[p]);let w=r.useCallback(e=>{y(e)},[]);return(0,i.jsx)("div",{className:"editor-overlay",children:(0,i.jsxs)("div",{className:"editor-container",children:[(0,i.jsxs)("div",{className:"editor-header",children:[(0,i.jsxs)("span",{children:["Editing: ",g]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("button",{onClick:()=>{n((0,a.vJ)({terminalId:t,isEditing:!1})),n((0,a.Hk)({terminalId:t,editingFile:null})),n((0,a.ge)({terminalId:t,content:""}))},children:"Cancel"}),(0,i.jsx)("button",{onClick:x,children:"Save"})]})]}),(0,i.jsx)(l.Ay,{value:f||"",height:"400px",theme:"dark",extensions:[(0,o.wD)()],onChange:w})]})})};var h=n(9640),g=n(7925);let p=function(e){let{children:t,id:n}=e,l=(0,s.wA)(),o=(0,r.useRef)(null),c=(0,s.d4)(e=>e.terminals.terminals.find(e=>e.id===n)),{zIndex:d,isMinimized:u,isDragging:m,isMaximized:h,position:g,dimensions:p}=c;return(0,i.jsx)("div",{ref:o,className:"terminal-container ".concat(u?"minimized":""," ").concat(h?"maximized":""),style:{top:"".concat(g.y,"px"),left:"".concat(g.x,"px"),zIndex:d,width:"".concat(p.width,"px"),height:"".concat(p.height,"px")},onClick:e=>{if(l((0,a.R0)(n)),!e.target.closest(".window-controls")&&!m){var t,i,r;null===(r=c.refs)||void 0===r||null===(i=r.input)||void 0===i||null===(t=i.current)||void 0===t||t.focus()}},children:t})},f=function(e){let{id:t}=e,n=(0,s.wA)(),{isMaximized:l,position:o,isDragging:c,offset:d,refs:u,isResizing:m,resizeDirection:h,dimensions:g,isMinimized:p}=(0,s.d4)(e=>e.terminals.terminals.find(e=>e.id===t)),f=()=>{n((0,a.NT)({terminalId:t,isMaximized:!l}))},y=(0,r.useCallback)(()=>{n((0,a.x2)(t)),n((0,a.Q3)(p?t:null))},[n,t,p]);return(0,r.useEffect)(()=>{let e=e=>{if(c){var i,r;let s=e.clientX-d.x,l=e.clientY-d.y,o=(null==u?void 0:null===(i=u.terminal)||void 0===i?void 0:i.offsetWidth)||0,c=(null==u?void 0:null===(r=u.terminal)||void 0===r?void 0:r.offsetHeight)||0,m={left:o,bottom:window.innerHeight-c/2,right:window.innerWidth-o/2,top:window.innerHeight+c/2};n((0,a.Kk)({terminalId:t,position:{x:Math.max(m.left/2,Math.min(m.right,s)),y:Math.max(200,Math.min(m.bottom,l))}}))}else if(m){let i=h.includes("right")?e.clientX-o.x:g.width,r=h.includes("bottom")?e.clientY-o.y:g.height;n((0,a.Y_)({terminalId:t,dimensions:{width:Math.max(300,i),height:Math.max(200,r)}}))}},i=()=>{n((0,a.Q4)({terminalId:t,isDragging:!1})),n((0,a.yY)({terminalId:t,isResizing:!1})),n((0,a.UT)({terminalId:t,resizeDirection:""}))};return(c||m)&&(window.addEventListener("mousemove",e),window.addEventListener("mouseup",i)),()=>{window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",i)}},[c,m,d,o.x,o.y,g,h]),(0,i.jsxs)("div",{className:"terminal-header",onMouseDown:e=>{e.preventDefault(),o&&(n((0,a.R0)(t)),n((0,a.Q4)({terminalId:t,isDragging:!0})),n((0,a.sf)({terminalId:t,offset:{x:e.clientX-o.x,y:e.clientY-o.y}})))},onDoubleClick:f,children:[(0,i.jsxs)("span",{children:["Terminal ",t]}),(0,i.jsxs)("div",{className:"window-controls",children:[(0,i.jsx)("button",{className:"control-button minimize",onClick:e=>{e.stopPropagation(),y()},children:"–"}),(0,i.jsx)("button",{className:"control-button maximize",onClick:f,children:l?"\uD83D\uDDD7":"▢"}),(0,i.jsx)("button",{className:"control-button close",onClick:()=>{n((0,a.Zm)(t))},children:"\xd7"})]})]})};var y=n(7836);let x=[".","..",".git","node_modules"],w={ls:(e,t,n,i,r,s)=>{if(!t||!t["~"])return"ls: file system not initialized";let l=e[0]||n||"/",o=d(t,l);if(!o||"dir"!==o.type)return"ls: cannot access '".concat(l,"': No such directory");let a=Object.keys(o.content).filter(e=>"admin"===r||!x.includes(e));return a.length>0?a.join("  "):""},cd:(e,t,n,i,r,s)=>{if(0===e.length)return"cd: missing operand";let l=e[0],o=u(n,l),c=d(t,o);return c&&"dir"===c.type?(console.log("Dispatching setPath with terminalId:",s.id,"resolvedPath:",o),i((0,a.SO)({terminalId:s.id,path:o})),"Changed directory to ".concat(o)):"cd: no such file or directory: ".concat(l)},mkdir:async(e,t,n,i,r,s)=>{if("admin"!==r)return"mkdir: permission denied";if(0===e.length)return"mkdir: missing operand";let l=e[0],o=JSON.parse(JSON.stringify(t)),u=d(o,n);return u?(u.content[l]={type:"dir",content:{}},i((0,a.QZ)({fileSystem:o})),await (0,c.d)(o),"Directory '".concat(l,"' created successfully")):"mkdir: cannot create directory '".concat(l,"': No such directory")},touch:async(e,t,n,i,r,s)=>{if(console.log("Debug touch - role:",r),"admin"!==r)return"touch: permission denied";if(0===e.length)return"touch: missing file operand";let l=e[0];if(!d(t,n))return"touch: cannot create file '".concat(l,"': No such directory");let o=JSON.parse(JSON.stringify(t)),u=d(o,n);return u.content[l]||(u.content[l]={type:"file",content:""},i((0,a.QZ)({fileSystem:o})),await (0,c.d)(o)),"File '".concat(l,"' created successfully")},rm:async(e,t,n,i,r)=>{if("admin"!==r)return"rm: permission denied";if(0===e.length)return"rm: missing operand";let s=e[0],l=e.includes("-r")||e.includes("-R");if(!d(t,n))return"rm: cannot remove '".concat(s,"': No such directory");let o=JSON.parse(JSON.stringify(t)),u=d(o,n);return u.content[s]?"dir"!==u.content[s].type||l?(delete u.content[s],i((0,a.QZ)({fileSystem:o})),await (0,c.d)(o),"'".concat(s,"' removed successfully")):"rm: cannot remove '".concat(s,"': Is a directory"):"rm: cannot remove '".concat(s,"': No such file or directory")},cat:(e,t,n)=>{if(0===e.length)return"cat: missing file operand";let i=e[0],r=d(t,n);if(!r||"dir"!==r.type)return"cat: ".concat(i,": No such directory");let s=r.content[i];return s?"file"!==s.type?"cat: ".concat(i,": Is a directory"):s.content||"":"cat: ".concat(i,": No such file")},edit:async(e,t,n,i,r,s)=>{if(!s||!s.id)return"edit: terminal state not initialized";if("admin"!==r)return"edit: permission denied";if(0===e.length)return"edit: missing file operand";let l=e[0],o=u(n,l),c=d(t,o);if(!c)return"edit: cannot find '".concat(l,"'");if("file"!==c.type)return"edit: '".concat(l,"' is not a file");try{return i((0,a.Hk)({terminalId:s.id,editingFile:o})),i((0,a.ge)({terminalId:s.id,content:c.content})),i((0,a.vJ)({terminalId:s.id,isEditing:!0})),null}catch(e){return console.error("Edit error:",e),"edit: failed to open file"}},authenticate:async(e,t,n,i,r,s)=>{let[l,o]=e;if(!l||!o)return"Usage: authenticate <email> <password>";try{await (0,h.x9)(g.j,l,o);let e=await g.j.currentUser.getIdTokenResult();return i((0,a.L4)(e.claims.role||"guest")),i((0,a.n9)("Logged in as ".concat(e.claims.role||"guest","."))),null}catch(e){return console.error("Authentication error:",e),"Authentication failed."}},login:async(e,t,n,i,r,s)=>{if(2!==e.length)return"Usage: login <username> <password>";let[l,o]=e;try{let e=await (0,h.x9)(g.j,l,o),t=(await e.user.getIdTokenResult()).claims.role||"guest";return i((0,a.L4)({terminalId:s.id,role:t})),i((0,a.n9)({terminalId:s.id,output:"Welcome ".concat(l,". Logged in as ").concat(t,".")})),null}catch(e){switch(console.error("Login error:",e.code,e.message),e.code){case"auth/user-not-found":return"Login failed: Invalid username";case"auth/wrong-password":return"Login failed: Invalid password";case"auth/invalid-email":return"Login failed: Invalid email format";default:return"Login failed: ".concat(e.message)}}},sudo:(e,t,n,i,r,s)=>s&&s.id?0===e.length?"sudo: no command specified":"su"!==e[0]||"-"!==e[1]&&e[1]?"admin"!==r?(i((0,a.Oe)({terminalId:s.id,awaiting:!0,type:"sudo",command:e.join(" ")})),i((0,a.zF)({terminalId:s.id,input:""})),"Password: "):"Command not implemented":"admin"===r?"Already running with admin privileges":(i((0,a.Oe)({terminalId:s.id,awaiting:!0,type:"sudo",command:"su -"})),i((0,a.zF)({terminalId:s.id,input:""})),"Password: "):"sudo: terminal state not initialized",su:(e,t,n,i,r)=>"admin"===r?"su: user root is already logged in":(i((0,a.Oe)({terminalId:state.id,awaiting:!0,type:"su",command:null})),"Password: "),verifyPassword:async e=>{try{let t=y.env.NEXT_PUBLIC_ADMIN_EMAIL;return await (0,h.x9)(g.j,t,e),!0}catch(e){return!1}},logout:(e,t,n,i,r,s)=>"admin"!==r?"logout: not logged in as admin":(i((0,a.L4)({terminalId:s.id,role:"guest"})),"Switched to guest user."),whoami:(e,t,n,i,r)=>"".concat(r,"@peaZ-OS"),chmod:async(e,t,n,i,r)=>"admin"!==r?"chmod: Permission denied":"Permission changes not implemented yet",show:(e,t,n,i,r,s)=>{if(0===e.length)return"show: missing file operand";let l=e[0],o=d(t,n);if(!o||"dir"!==o.type)return"show: ".concat(l,": No such directory");let c=o.content[l];if(!c)return"show: ".concat(l,": No such file");if("file"!==c.type)return"show: ".concat(l,": Is a directory");let u="string"==typeof c.content?c.content:JSON.stringify(c.content),m={id:Date.now(),zIndex:1e3,isMinimized:!1,position:{x:window.innerWidth/2+50,y:window.innerHeight/2+50},content:u,path:n,role:"guest",input:"",output:[],history:[],historyIndex:-1,isEditing:!1,editingFile:null,fileContent:null};return i((0,a.Wk)(m)),"Opening ".concat(l," in new window...")},clear:(e,t,n,i,r,s)=>(i((0,a.re)({terminalId:s.id})),null),pwd:(e,t,n)=>n,echo:e=>e.join(" "),history:(e,t,n,i,r,s)=>{let l=(null==s?void 0:s.history)||[];return l.length?l.map((e,t)=>"".concat(t+1,"  ").concat(e)).join("\n"):"No commands in history"},help:()=>"Available commands:\nls - list directory contents\ncd - change directory\nmkdir - create a new directory\ntouch - create a new file\nrm - remove files or directories\ncat - display file contents\nedit - edit file contents\nsudo su - switch to admin user\nlogout - switch back to guest user\nclear - clear terminal screen\npwd - print working directory\necho - display a line of text\nhistory - show command history\nhelp - display this help message",exit:(e,t,n,i,r)=>"admin"===r?(i((0,a.L4)({terminalId:state.id,role:"guest"})),"Logged out from root"):(i(removeTerminal(state.id)),null)};var v=n(7836);let j=(e,t,n)=>{if(!n)return;let{input:i="",history:r=[],historyIndex:s=-1,path:l="/",fileSystem:o=null,isAwaitingPassword:c,passwordType:u,lastSudoCommand:m,role:h}=n;switch(e.key){case"Enter":if(c){e.preventDefault(),i.trim()===v.env.NEXT_PUBLIC_ROOT_PASSWORD?(t((0,a.L4)({terminalId:n.id,role:"admin"})),t((0,a.n9)("Root access granted."))):t((0,a.n9)("Authentication failure")),t((0,a.Oe)({terminalId:n.id,awaiting:!1,type:null,command:null})),t((0,a.zF)({terminalId:n.id,input:""}));return}i.trim()&&(N(i.trim(),t,n),t((0,a.Al)({terminalId:n.id,command:i.trim()})),t((0,a.pN)({terminalId:n.id,historyIndex:-1})),t((0,a.zF)({terminalId:n.id,input:""})));break;case"ArrowUp":if(e.preventDefault(),!r.length)return;let g=-1===s?r.length-1:Math.max(0,s-1);t((0,a.pN)({terminalId:n.id,historyIndex:g})),t((0,a.zF)({terminalId:n.id,input:r[g]}));break;case"ArrowDown":if(e.preventDefault(),0===r.length||-1===s)return;let p=s+1;p<r.length?(t((0,a.pN)({terminalId:n.id,historyIndex:p})),t((0,a.zF)({terminalId:n.id,input:r[p]}))):(t((0,a.pN)({terminalId:n.id,historyIndex:-1})),t((0,a.zF)({terminalId:n.id,input:""})));break;case"Tab":e.preventDefault();let f=i.split(" "),y=f[f.length-1],x=[];if(1===f.length)x=Object.keys(w).filter(e=>e.startsWith(y));else if(o){let e=d(o,l);e&&"dir"===e.type&&(x=Object.keys(e.content).filter(e=>e.startsWith(y)))}1===x.length?(f[f.length-1]=x[0],t((0,a.zF)({terminalId:n.id,input:f.join(" ")+" "}))):x.length>0&&t((0,a.n9)({terminalId:n.id,output:"\n".concat(x.join("  "),"\n")}))}},N=async(e,t,n)=>{if(!e)return;let i=e.split(" "),r=i.shift().toLowerCase();if(t((0,a.n9)({terminalId:n.id,output:"".concat(b(n.path,n.role)).concat(e)})),console.log("Terminal ID:",n.id),!w[r]){t((0,a.n9)({terminalId:n.id,output:"command not found: ".concat(r)}));return}try{let e=await w[r](i,n.fileSystem,n.path,t,n.role,n);e&&t((0,a.n9)({terminalId:n.id,output:e}))}catch(e){console.error("Error executing ".concat(r,":"),e),t((0,a.n9)({terminalId:n.id,output:"Error: ".concat(e.message)}))}},b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"guest";return"".concat("admin"===t?"root":"guest","@peaZ-OS:").concat(e).concat("/"===e?"":"/"," ")},I=function(e){let{id:t}=e,n=(0,s.wA)(),l=(0,s.d4)(e=>e.terminals.terminals.find(e=>e.id===t)),{role:o,input:c,path:d}=l,u=(0,r.useCallback)(e=>{n((0,a.zF)({terminalId:t,input:e.target.value}))},[n,t]),m=(0,r.useCallback)(e=>{null!==e&&n((0,a.y$)({terminalId:t,ref:e}))},[n,t]),h=(0,r.useCallback)(e=>{l&&j(e,n,l)},[n,l,t]);return(0,i.jsxs)("div",{className:"input-line",children:[(0,i.jsx)("span",{className:"prompt",children:b(d,o)}),(0,i.jsx)("input",{ref:m,type:"text",value:c,onChange:u,onKeyDown:h,className:"terminal-input"})]})},k=function(e){let{output:t,path:n,role:s}=e,l=(0,r.useRef)(null),o=()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)};return(0,r.useEffect)(()=>{o()},[t]),(0,i.jsx)("div",{className:"terminal-output",ref:l,children:t.map((e,t)=>"string"==typeof e&&e.startsWith(b(n,s)+" $")?(0,i.jsxs)("div",{className:"output-line",children:[(0,i.jsxs)("span",{className:"prompt",children:[b(n,s)," $ "]}),(0,i.jsx)("span",{className:"command",children:e.slice((b(n,s)+" $ ").length)})]},t):(0,i.jsx)("div",{className:"output-line",children:(0,i.jsx)("span",{className:"output",children:e})},t))})},C=function(e){let{id:t}=e,{content:n,contentType:r,output:l,role:o,path:a}=(0,s.d4)(e=>e.terminals.terminals.find(e=>e.id===t));return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"terminal",children:[n&&(0,i.jsx)("iframe",{srcDoc:n,title:"HTML Viewer",style:{width:"100%",height:"100%",border:"none"}}),!n&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(k,{id:t,output:l,path:a,role:o}),(0,i.jsx)(I,{id:t})]})]})})},D=e=>{let{id:t}=e,n=(0,s.wA)(),l=(0,s.d4)(e=>e.terminals.terminals.find(e=>e.id===t)),{isEditing:o,fileSystem:d,path:u}=l;return(0,r.useEffect)(()=>{l&&(0,a.SO)({terminalId:t,path:u||"/"})},[l]),(0,r.useEffect)(()=>{(async()=>{try{let e=await (0,c.o)();if(e)n((0,a.QZ)({fileSystem:e}));else{let e={"~":{type:"dir",content:{"welcome.txt":{type:"file",content:"Welcome to the terminal!"}}}};n((0,a.QZ)({fileSystem:e})),await (0,c.d)(e)}n((0,a.SO)({terminalId:t,path:"/"}))}catch(e){console.error("Error initializing filesystem:",e)}})()},[]),(0,r.useEffect)(()=>{(async()=>{d&&await (0,c.d)(d)})()},[d]),(0,r.useEffect)(()=>{let e=(0,h.hg)(g.j,async e=>{if(e)try{await e.getIdToken(!0);let t=await e.getIdTokenResult();n((0,a.L4)(t.claims.role||"guest")),n((0,a.RJ)(e.uid)),n((0,a.n9)("Logged in as ".concat(t.claims.role||"guest",".")))}catch(e){n((0,a.n9)("Error refreshing token. Defaulting to guest."))}else n((0,a.RJ)(null)),n((0,a.L4)("guest")),n((0,a.n9)("No user is signed in. Operating as guest."))});return()=>e()},[n]),(0,r.useEffect)(()=>{d&&(0,c.d)(d)},[d]),(0,i.jsxs)(i.Fragment,{children:[o&&(0,i.jsx)(m,{id:t}),(0,i.jsxs)(p,{id:t,children:[(0,i.jsx)(f,{id:t}),(0,i.jsx)(C,{id:t})]})]})},S=e=>{let{terminal:t}=e,n=(0,s.wA)(),{activeTerminalId:l}=(0,s.d4)(e=>e.terminals),[o,c]=(0,r.useState)(!1),[d,u]=(0,r.useState)({x:0,y:0}),m=()=>{n((0,a.R0)(t.id)),n((0,a.x2)(t.id)),n((0,a.Q3)(t.id))};return(0,i.jsxs)("div",{onContextMenu:e=>{e.preventDefault(),u({x:e.clientX,y:e.clientY}),c(!0)},onClick:()=>{m()},style:{position:"relative"},children:[(0,i.jsx)("button",{className:"taskbar-button ".concat(l===t.id?"active":""),children:(0,i.jsx)("span",{role:"img","aria-label":"terminal",children:"\uD83D\uDCBB"})}),o&&(0,i.jsxs)("ul",{className:"context-menu",style:{top:d.y-50,left:d.x,position:"absolute"},onMouseLeave:()=>c(!1),children:[(0,i.jsx)("li",{onClick:()=>{alert("Terminal ID: ".concat(t.id)),c(!1)},children:"Information"}),(0,i.jsx)("li",{onClick:()=>{m(),c(!1)},children:"Close"})]})]})},E=(0,r.forwardRef)((e,t)=>{let{onAddTerminal:n,onClose:r,setPath:s}=e;console.log(n);let l=e=>{console.log(e),s(e),n(e),r()};return(0,i.jsx)("ul",{className:"start-menu",ref:t,style:{position:"absolute",bottom:"32px",left:"-8px",zIndex:1001},onMouseLeave:r,children:[{label:"New Terminal",path:"/"},{label:"About",path:"/about"},{label:"Skills",path:"/skills"},{label:"Projects",path:"/projects"},{label:"Contact",path:"/contact"}].map((e,t)=>(0,i.jsx)("li",{onClick:()=>l(e.path),className:"start-menu-item",children:e.label},t))})});E.displayName="StartMenu";let O=()=>{let[e,t]=(0,r.useState)(!1),n=(0,r.useRef)(null),l=(0,r.useRef)(null),o=(0,s.wA)(),c=e=>{l.current&&!l.current.contains(e.target)&&n.current&&!n.current.contains(e.target)&&t(!1)};return(0,r.useEffect)(()=>(e?window.addEventListener("click",c):window.removeEventListener("click",c),()=>{window.removeEventListener("click",c)}),[e]),(0,i.jsxs)("div",{className:"start-button-container",children:[(0,i.jsx)("button",{className:"start-button",onClick:()=>{t(e=>!e)},ref:n,children:(0,i.jsx)("span",{role:"img","aria-label":"start",children:"\uD83D\uDDA5️"})}),e&&(0,i.jsx)(E,{setPath:a.SO,ref:l,onAddTerminal:e=>{o((0,a.SO)(e));let n=Date.now(),i="terminal-".concat(n,"-").concat(Math.random().toString(36).substr(2,9));o((0,a.Wk)({id:n,key:i})),t(!1)},onClose:()=>t(!1)})]})},z=e=>{let{onClose:t}=e,[n,s]=(0,r.useState)(null),[l,o]=(0,r.useState)(null),a=(0,r.useRef)(null),c=(0,r.useRef)(null),d={help:{desc:"Display available commands",usage:"help"},ls:{desc:"List directory contents",usage:"ls [directory]"},cd:{desc:"Change directory",usage:"cd [directory]"},pwd:{desc:"Print working directory",usage:"pwd"},clear:{desc:"Clear terminal screen",usage:"clear"},cat:{desc:"Display file contents",usage:"cat [filename]"},whoami:{desc:"Display current user",usage:"whoami"}},u={touch:{desc:"Create empty file (admin only)",usage:"touch [filename]"},rm:{desc:"Remove file/directory (admin only)",usage:"rm [-r] [filename]"},mkdir:{desc:"Create directory (admin only)",usage:"mkdir [dirname]"},edit:{desc:"Edit file contents (admin only)",usage:"edit [filename]"},sudo:{desc:"Execute command with admin privileges",usage:"sudo [command]"},"sudo su":{desc:"Switch to admin user",usage:"sudo su [-]"},login:{desc:"Login as user",usage:"login [username] [password]"},logout:{desc:"Logout current user",usage:"logout"}},m=e=>{o(n),s(e),setTimeout(()=>{var e;null===(e=a.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})},100)};return(0,i.jsx)("div",{className:"help-guide",onClick:e=>{"help-guide"===e.target.className&&t()},children:(0,i.jsxs)("div",{className:"help-content",ref:c,children:[(0,i.jsx)("button",{className:"close-button",onClick:t,children:"\xd7"}),(0,i.jsx)("button",{className:"scroll-top-button",onClick:()=>{var e;null===(e=c.current)||void 0===e||e.scrollTo({top:0,behavior:"smooth"})},title:"Scroll to Top",children:"↑"}),l&&(0,i.jsx)("button",{className:"previous-command-button",onClick:()=>{l&&(s(l),o(null))},title:"Go to Previous Command",children:"←"}),(0,i.jsx)("h1",{children:"\uD83D\uDDA5️ Terminal Guide"}),(0,i.jsxs)("div",{className:"terminal-box",children:[(0,i.jsx)("div",{className:"terminal-header",children:(0,i.jsxs)("div",{className:"terminal-controls",children:[(0,i.jsx)("div",{className:"control-dot red"}),(0,i.jsx)("div",{className:"control-dot yellow"}),(0,i.jsx)("div",{className:"control-dot green"})]})}),(0,i.jsx)("p",{children:"Welcome to my interactive terminal portfolio! This terminal simulates a Linux-like environment where you can navigate through my projects and information using commands."})]}),(0,i.jsxs)("section",{className:"guide-section",children:[(0,i.jsx)("h2",{children:"\uD83D\uDCBB Basic Controls"}),(0,i.jsxs)("ul",{className:"tips-list",children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Window Movement"}),"Click and drag the terminal header to move the window"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Window Controls"}),"Click the minimize (-), maximize (□), or close (\xd7) buttons to control the window"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Command History"}),"Use Up/Down arrow keys to navigate through previous commands"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Window Resize"}),"Drag the window edges or corners to resize the terminal"]})]})]}),(0,i.jsxs)("section",{className:"guide-section",children:[(0,i.jsx)("h2",{children:"\uD83D\uDCA1 Good to Know"}),(0,i.jsxs)("ul",{className:"tips-list",children:[(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Tab Completion:"})," Press Tab key while typing to auto-complete commands and file names"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Command Suggestions:"}),"When you tab complete a command, you can press Tab again to see available options"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"History Navigation:"})," Use Up/Down arrow keys to cycle through previously used commands"]}),(0,i.jsxs)("li",{children:[(0,i.jsx)("strong",{children:"Command Arguments:"})," Some commands accept additional arguments shown in square brackets [arg]"]})]})]}),(0,i.jsxs)("section",{className:"guide-section",children:[(0,i.jsx)("h2",{children:"\uD83D\uDEE0️ Available Commands"}),(0,i.jsx)("h3",{children:"Basic Commands"}),(0,i.jsx)("div",{className:"commands-grid",children:Object.entries(d).map(e=>{let[t,r]=e;return(0,i.jsxs)("div",{className:"command-item ".concat(n===t?"selected":""),onClick:()=>m(t),children:[(0,i.jsx)("code",{children:t}),(0,i.jsx)("span",{children:r.desc})]},t)})}),(0,i.jsx)("h3",{children:"\uD83D\uDD12 Admin & Authentication"}),(0,i.jsx)("div",{className:"commands-grid",children:Object.entries(u).map(e=>{let[t,r]=e;return(0,i.jsxs)("div",{className:"command-item ".concat(n===t?"selected":""),onClick:()=>m(t),children:[(0,i.jsx)("code",{children:t}),(0,i.jsx)("span",{children:r.desc})]},t)})}),n&&(0,i.jsxs)("div",{className:"command-details",ref:a,children:[(0,i.jsx)("h4",{children:"Command Usage:"}),(0,i.jsx)("code",{children:(d[n]||u[n]).usage})]})]})]})})},L=()=>{let{terminals:e}=(0,s.d4)(e=>e.terminals),[t,n]=(0,r.useState)(!1);return(0,i.jsxs)("div",{className:"home-container",children:[(0,i.jsx)("h1",{children:"Welcome to My Portfolio"}),(0,i.jsx)("p",{children:"Interact with the terminal below to navigate through my projects."}),(0,i.jsxs)("button",{className:"help-button",onClick:()=>n(!0),children:[(0,i.jsx)("span",{role:"img","aria-label":"help",children:"❔"})," Terminal Guide"]}),t&&(0,i.jsx)(z,{onClose:()=>n(!1)}),e.map(e=>(0,i.jsx)(D,{id:e.id},e.key||e.id)),(0,i.jsxs)("div",{className:"taskbar",children:[(0,i.jsx)(O,{}),e.map(e=>(0,i.jsx)(S,{terminal:e},e.id))]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[883,308,809,411,976,636,593,792],()=>t(7276)),_N_E=e.O()}]);