!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]"),a=null,n=!1;o.disabled=!0,t.addEventListener("click",(function(){n||(n=!0,a=setInterval((function(){console.log("getRandomHexColor()"),e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),t.disabled=!0,o.disabled=!1}),1e3))})),o.addEventListener("click",(function(){n=!1,clearInterval(a),o.disabled=!0,t.disabled=!1,console.log("Interval with id ".concat(a," has stopped!"))}))}();
//# sourceMappingURL=01-color-switcher.5406feae.js.map