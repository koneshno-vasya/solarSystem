let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let h = 500;
let w = 700;
let orbitsArray = [];//orbitsArray[id][angle][x,y]
let planetsArray = [[30, 1, "red", 10, 0], [100, 2, "orange", 5, 0], [150, 2.5, "blue", 1, 0]];
//planet[id][0-orbitRadius;1-planetRadius;2-planetColor;3-degrees per screen update,4 - rotation angle]
canvas.setAttribute("height", h);
canvas.setAttribute("width", w);
for (let planet = 0; planet < planetsArray.length; planet++) {
	orbitsArray[planet] = [];
	for (let angle = 0; angle < 360; angle = angle + 1) {
		orbitsArray[planet][angle] = [];
	}
}
for (let planet = 0; planet < planetsArray.length; planet++) {
	for (let angle = 0; angle < 360; angle = angle + 1) {
		let x = planetsArray[planet][0] * Math.cos((Math.PI * angle) / 180);
		x = w / 2 + x;
		let y = planetsArray[planet][0] * Math.sin((Math.PI * angle) / 180);
		y = h / 2 - y;

		orbitsArray[planet][angle][0] = x;
		orbitsArray[planet][angle][1] = y;

	}
}
console.log(orbitsArray);

setInterval(draw, 50);

function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, w, h);

	ctx.fillStyle = "yellow";//draw the sun
	ctx.beginPath();
	ctx.arc(w / 2, h / 2, 20, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();

	for (let id = 0; id < planetsArray.length; id++) {
		ctx.fillStyle = planetsArray[id][2];
		ctx.beginPath();
		ctx.arc(orbitsArray[id][planetsArray[id][4]][0], orbitsArray[id][planetsArray[id][4]][1], planetsArray[id][1], 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();

		planetsArray[id][4] += planetsArray[id][3];
		if (planetsArray[id][4] >= 360) {
			planetsArray[id][4] = 0;
		}
	}
}





