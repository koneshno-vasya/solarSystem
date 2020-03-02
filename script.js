let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let h = 500;
let w = 500;
let orbitsArray = [];//orbitsArray[id][angle][x,y]
let planetsArray = [[30,5,"red",10,0],[100,15,"yellow",30,0],[150,17,"blue",50,0]];
//planet[id][0-orbitRadius;1-planetRadius;2-planetColor;3-delay оf moving,4 - rotation angle]
canvas.setAttribute("height",h);
canvas.setAttribute("width",w);
for(let planet = 0; planet < planetsArray.length; planet++){
	orbitsArray[planet] = [];
	for(let angle = 0; angle < 360; angle = angle + 1){
		orbitsArray[planet][angle] = [];	
	}
}
for (let planet = 0; planet < planetsArray.length; planet++){
	for(let angle = 0; angle < 360; angle = angle + 1){
		let x = planetsArray[planet][0] * Math.cos((Math.PI * angle) / 180);
		x = w/2 + x;
		let y = planetsArray[planet][0]*Math.sin((Math.PI * angle) / 180);
		y = h/2 - y;

		orbitsArray[planet][angle][0] = x;
		orbitsArray[planet][angle][1] = y;
		
	}
}
console.log(orbitsArray);
ctx.fillRect(0,0,w,h);


for(let i = 0;i < planetsArray.length;i++){
	setInterval(draw,planetsArray[i][3],i)
}


function draw(id){
		/*
		let previousStateOfAngle = planetsArray[id][4]-1;
		if (previousStateOfAngle == -1){
			previousStateOfAngle = 365;
		}
		ctx.arc (	
		orbitsArray[id] [ orbitsArray [id]  [previousStateOfAngle]  [0]  ]   [0],		orbitsArray[id] [ orbitsArray [id]  [previousStateOfAngle]  [1]  ]   [1],		planetsArray[id][1],		0,		Math.PI * 2,		false);
		/*
		ctx.arc (	
		orbitsArray[id] [ orbitsArray [id]  [previousStateOfAngle]  [0]  ]   [0],
		orbitsArray[id] [ orbitsArray [id]  [previousStateOfAngle]  [1]  ]   [1],
		planetsArray[id][1],		0,		Math.PI * 2,		false);
		*/
		

		ctx.fillStyle = planetsArray[id][2];
		ctx.beginPath();
		ctx.arc (orbitsArray[id][planetsArray[id][4]][0], orbitsArray[id][planetsArray[id][4]][1], planetsArray[id][1], 0, Math.PI * 2, false);
		ctx.fill();
		planetsArray[id][4]++;
		if  (planetsArray[id][4] == 360){
			planetsArray[id][4] = 0;
		}
}

