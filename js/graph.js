const DATABOX = document.getElementById("dataBox");
const MEMORY = document.getElementById("memory");
const CODE = document.getElementById("dataBox");
const BTNPRINT = document.getElementById("print");
const OUTPUT = document.getElementById("output");
const xmlns = "http://www.w3.org/2000/svg";

let drawingLines = [];
let plots = [];
let pointsArray = [];
let svg = document.createElementNS(xmlns, "svg");
svg.id = "svg";
let codeContent = [];
let memoryArray = [];


(function graph() {
    const WRAPPER = document.getElementById("wrapper");
    const PLOTS = document.getElementsByClassName("plot");

    let i;
    let sides = 6;
    let Xcenter = 512;
    let Ycenter = 512;
    let maxSize = 1000;

    for (i = 0; i < PLOTS.length; i += 1) {
        plots.push(PLOTS[i]);
    }

    let boxWidth = 600;
    let boxHeight = 600; 

    svg.setAttributeNS(null, "viewBox", "0 0 2100 2100");
    svg.setAttributeNS(null, "width", boxWidth);
    svg.setAttributeNS(null, "height", boxHeight);
    svg.setAttributeNS(null, "fill", "none");
    svg.setAttributeNS(null, "position", "absolute");

    svg.style.display = "block";

    (function hex() {
        let size = 400;
        let Xcord;
        let Ycord;
        pointsArray.push([Xcenter, Ycenter]);
        for (i = 0; i <= sides; i += 1) {
            Xcord = Math.round((Xcenter + size * Math.cos(i * 2 * Math.PI / sides)) * 100) / 100;
            Ycord = Math.round((Ycenter + size * Math.sin(i * 2 * Math.PI / sides)) * 100) / 100;
            pointsArray.push([Xcord, Ycord]);
        };

    }());

    for (i = 0; i < PLOTS.length; i += 1) {
        let onePlot = PLOTS[i];
        let oneREALplot = pointsArray[i];
        onePlot.setAttribute('name', oneREALplot.join('|'))

        onePlot.addEventListener("click", function() {
            drawingLines.push(oneREALplot);
            drawTheDamnLine();
        });
    }

    function drawTheDamnLine() {

        if (drawingLines.length >= 2) {
            let path = document.createElementNS(xmlns, "path");
            path.setAttributeNS(null, 'stroke', "black");
            path.setAttributeNS(null, 'stroke-width', 60);
            path.setAttributeNS(null, 'stroke-linejoin', "round");
            path.setAttributeNS(null, 'stroke-linecap', 'round');
            path.setAttributeNS(null, 'd', `M ${drawingLines}`); 
            path.setAttributeNS(null, 'opacity', 1);
            path.setAttributeNS(null, "fill", "none");
            svg.appendChild(path);
        }

        DATABOX.innerHTML = drawingLines;
    };
    WRAPPER.appendChild(svg);
}());

(function cut() {

    const BUTTON = document.getElementById("btn");
    const SVG = document.getElementById("svg");

    BUTTON.addEventListener("click", function() {

        let path = document.createElementNS(xmlns, "path");
        path.setAttributeNS(null, 'stroke', "black");
        path.setAttributeNS(null, 'stroke-width', 60);
        path.setAttributeNS(null, 'stroke-linejoin', "round");
        path.setAttributeNS(null, 'stroke-linecap', 'round');
        path.setAttributeNS(null, 'd', `M ${CODE.innerHTML}`);
        path.setAttributeNS(null, 'opacity', 1);
        path.setAttributeNS(null, "fill", "none");
        SVG.appendChild(path);

        MEMORY.innerText += `<path d="M ${drawingLines}"/>`;
        memoryArray.push(MEMORY.innerText);

        pointsArray = [];
        drawingLines = [];
    });

}());

(function clear() {
    const CLEAR = document.getElementById("clear");
    CLEAR.addEventListener("click", function() {
        svg.innerHTML = "";
        pointsArray = [];
        drawingLines = [];
        CODE.innerHTML = "";
        MEMORY.innerHTML = "";
    })
}());

(function wash() {
    const WASH = document.getElementById("wash");
    WASH.addEventListener("click", function() {
        OUTPUT.innerHTML = "";
    })
}());


(function printGlyph() {

    //can't manage to store MEMORY.innerHTML.split('&lt;').join('<').split('&gt;').join('>') into a variable

    BTNPRINT.addEventListener("click", function() {
        let smallSVG = document.createElementNS(xmlns, "svg");
        smallSVG.className = "smallSVG";
        smallSVG.id = "smallSVG";

        smallSVG.setAttributeNS(null, "viewBox", "0 0 1000 1000");
        smallSVG.setAttributeNS(null, "width", 30);
        smallSVG.setAttributeNS(null, "height", 30);
        smallSVG.setAttributeNS(null, "stroke-width", "30");
        smallSVG.setAttributeNS(null, "stroke-linecap", "round");
        smallSVG.setAttributeNS(null, "stroke-linejoin", "round");
        smallSVG.setAttributeNS(null, "fill", "none");
        smallSVG.setAttributeNS(null, "stroke", "black");
        smallSVG.setAttributeNS(null, "position", "absolute");
        
        smallSVG.innerHTML = MEMORY.innerHTML.split('&lt;').join('<').split('&gt;').join('>');
        OUTPUT.appendChild(smallSVG);
    })
}());