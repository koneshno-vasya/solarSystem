let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let h = 500;
let w = 700;
let orbitsArray = [];//orbitsArray[id][angle][x,y]
let planetsArray = [[30, 2, "red", 10, 0], [75, 4, "orange", 5, 0], [150, 5, "blue", 1, 0]];
//planet[id][0-orbitRadius;1-planetRadius;2-planetColor;3-degrees per screen update,4 - rotation angle]
let starsArray = [];
let numberOfStars = 1000;
let moonAngle = 0;
canvas.setAttribute("height", h);
canvas.setAttribute("width", w);
for (let planet = 0; planet < planetsArray.length; planet++) {
	orbitsArray[planet] = [];
	for (let angle = 0; angle < 360; angle = angle + 1) {
		orbitsArray[planet][angle] = [];
	}
}
for (let i = 0;i < numberOfStars;i++){
	starsArray[i] = [Math.floor(Math.random() * w),Math.floor(Math.random() * h)];
	if (Math.round(Math.random()*20) == 0){
		starsArray[i][2] = 1;
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
setInterval(draw, 50);
function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, w, h);

	drawMoon();
	drawStars();

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
function drawMoon(){
	let x = 10 * Math.cos((Math.PI * moonAngle) / 180);
	x = orbitsArray[2][planetsArray[2][4]][0] + x;
	let y = 10 * Math.sin((Math.PI * moonAngle) / 180);
	y = orbitsArray[2][planetsArray[2][4]][1] - y;
	moonAngle += 5;
	if (moonAngle >=360){
		moonAngle = 0;
	}
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(x, y, 2, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
}

function drawStars(){
	ctx.fillStyle = "white";
	for (let i = 0;i < numberOfStars; i++){
		starsArray[i][1] -= 1;
		if (starsArray[i][1] < 0){
			starsArray[i][1] = h - 1;
		}
		ctx.fillRect(starsArray[i][0],starsArray[i][1],1,1);
		if(starsArray[i][2] == 1){
			ctx.fillRect(starsArray[i][0],starsArray[i][1],2,2);
		}
	}
}




