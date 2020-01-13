const fractalInput = document.getElementById("fractalInput");
const fractalOutput = document.getElementById("fractalOutput");
const xmlns = "http://www.w3.org/2000/svg";
let svg = document.createElementNS(xmlns, "svg");
svg.id = "fractalSVG";
const MEMORYIN = document.getElementById("memoryInput");
const MEMORYOUT = document.getElementById("memoryOutput");

let i;

let sides = 6;
let Xcenter = 100;
let Ycenter = 100;
let svgHeight = 200;
let svgWidth = 200;

let circles = [];
let Xarray = [];
let Yarray = [];
let allInputCircles = [];

let drawnLines = [];

svg.setAttributeNS(null, "viewBox", "0 0 200 200");
svg.setAttributeNS(null, "width", svgWidth);
svg.setAttributeNS(null, "height", svgHeight);
svg.setAttributeNS(null, "fill", "black");
svg.setAttributeNS(null, "position", "absolute");
svg.style.display = "block";

function makeSvg(){
  svg.innerHTML ="";
  Xarray = [];
  Yarray = [];
  allInputCircles = [];
  drawnLines = [];
  MEMORYOUT.innerHTML = "";
  let size = 90;
        let Xcord;
        let Ycord;
        Xarray.push(Xcenter);
        Yarray.push(Ycenter);

        for (i = 0; i <= sides; i += 1) {
            Xcord = Math.round((Xcenter + size * Math.cos(i * 2 * Math.PI / sides)) * 100) / 100;
            Ycord = Math.round((Ycenter + size * Math.sin(i * 2 * Math.PI / sides)) * 100) / 100;
            Xarray.push(Xcord);
            Yarray.push(Ycord);
        };

        for(i = 0; i <= sides; i += 1){
          let circle = document.createElementNS(xmlns, "circle");
          circle.setAttributeNS(null, "class", "inputCircles");
          circle.setAttributeNS(null, "cx", Xarray[i]);
          circle.setAttributeNS(null, "cy", Yarray[i]);
          circle.setAttributeNS(null, "r", 8);
          circle.setAttributeNS(null, "fill", "lightgrey");
          circle.setAttributeNS(null, "cursor", "pointer");
          allInputCircles.push(circle)
          svg.appendChild(circle);
        }
        fractalInput.appendChild(svg);

        for(i =0; i < allInputCircles.length; i += 1){
          let oneCircle = allInputCircles[i];
          oneCircle.addEventListener("mouseover", function(){
            oneCircle.setAttributeNS(null, "fill", "grey");
          });
          oneCircle.addEventListener("mouseout", function(){
            oneCircle.setAttributeNS(null, "fill", "lightgrey");
          });
        }
}

function createSvg(){
        makeSvg();

        for(i = 0; i < allInputCircles.length; i += 1){
          let oneCircle = allInputCircles[i];
          let oneX = Xarray[i];
          let oneY = Yarray[i];
          oneCircle.addEventListener("click", function(){
            drawnLines.push([oneX, oneY]);
            drawLine();
          });
        }

        function drawLine(){
          if(drawnLines.length >= 1){
            let path = document.createElementNS(xmlns, "path");
            path.setAttributeNS(null, 'stroke', "greenyellow");
            path.setAttributeNS(null, 'stroke-width', 4);
            path.setAttributeNS(null, 'stroke-linejoin', "round");
            path.setAttributeNS(null, 'stroke-linecap', 'round');
            path.setAttributeNS(null, 'd', `M ${drawnLines.join(' ')}`); 
            path.setAttributeNS(null, 'opacity', 1);
            path.setAttributeNS(null, "fill", "none");
            svg.appendChild(path);
          }
          MEMORYIN.innerHTML = drawnLines;
        }
};

createSvg();

(function cut(){
  const BTNCUT = document.getElementById("fractalBtn0");
  BTNCUT.addEventListener("click", function(){
    let path = document.createElementNS(xmlns, "path");
    path.setAttributeNS(null, 'stroke', "black");
    path.setAttributeNS(null, 'stroke-width', 4);
    path.setAttributeNS(null, 'stroke-linejoin', "round");
    path.setAttributeNS(null, 'stroke-linecap', 'round');
    path.setAttributeNS(null, 'd', `M ${MEMORYIN.innerHTML}`); 
    path.setAttributeNS(null, 'opacity', 1);
    path.setAttributeNS(null, "fill", "none");
    svg.appendChild(path);

    MEMORYOUT.innerText += `<path d="M ${drawnLines}"/>`;

    allInputCircles = [];
    drawnLines = [];
  });

}());

let color = 240;
let strokeWidth = 8;

(function print(){
  const BTNPRINT = document.getElementById("fractalBtn2");
  
  BTNPRINT.addEventListener("click", function(){
    let outputSVG= document.createElementNS(xmlns, "svg");
    outputSVG.className = "outputSVG";
        outputSVG.setAttributeNS(null, "viewBox", "0 0 200 200");
        outputSVG.setAttributeNS(null, "width", svgWidth);
        outputSVG.setAttributeNS(null, "height", svgHeight);
        outputSVG.setAttributeNS(null, "stroke-width", strokeWidth);
        outputSVG.setAttributeNS(null, "background", "transparent");
        outputSVG.setAttributeNS(null, "stroke-linecap", "round");
        outputSVG.setAttributeNS(null, "stroke-linejoin", "round");
        outputSVG.setAttributeNS(null, "fill", "none");
        outputSVG.setAttributeNS(null, "stroke", `rgb(${color}, ${color}, ${color})`);
        outputSVG.setAttributeNS(null, "position", "absolute");
        
        outputSVG.innerHTML = MEMORYOUT.innerHTML.split('&lt;').join('<').split('&gt;').join('>');
        fractalOutput.appendChild(outputSVG);
        svgWidth /= 2;
        svgHeight /= 2;
        color /= 1.3;
        strokeWidth *=1.2;
  });
  
}());

(function wash(){
  const BTNWASH = document.getElementById("fractalBtn3");
  let outputSVG = document.getElementById("outputSVG");
  BTNWASH.addEventListener("click", function(){
    fractalOutput.innerHTML = "";
    svgWidth = 200;
    svgHeight = 200;
    color = 240;
    strokeWidth = 8;
  });
}());

(function clear(){
  const BTNCLEAR = document.getElementById("fractalBtn1");
  BTNCLEAR.addEventListener("click", function(){
    MEMORYIN.innerHTML="";
    fractalInput.innerHTML="";
    createSvg();
  })
}());
