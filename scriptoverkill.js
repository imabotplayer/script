// ==UserScript==
// @name         CellsHub.ga Mouse Control
// @version      1.0
// @description  Left-click = Split, Right-click = Feed.
// @author       Botplayer
// @icon         http://bit.ly/2oT4wRk
// @match        *://*.cellshub.ga/*
// @grant        none
// ==/UserScript==

(function() {
	"use strict";

	let speed = 50;
	let intervalID = null;

	canvas.addEventListener("mousedown", ({button}) => {
		if (button === 0) // left click
			wsSend(UINT8_CACHE[17]);
		if (button === 2) { // right click
            wsSend(UINT8_CACHE[21]);
            intervalID = setInterval(function(){wsSend(UINT8_CACHE[21]);}, speed);
		}
	});
	addEventListener("mouseup", ({button}) => {
		if (button === 2) {
			clearInterval(intervalID);
			intervalID = null;
		}
	});
	canvas.addEventListener("mousewheel", () => {
		canvas.dispatchEvent(new MouseEvent("mousemove", {
			clientX: innerWidth / 2,
			clientY: innerHeight / 2
		}));
	});
	const prevent = event => event.preventDefault();
	canvas.addEventListener("contextmenu", prevent);
	canvas.addEventListener("drag", prevent);
})();
