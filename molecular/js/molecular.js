
//APP0
(function molecularize(){

    const SVGWRAPPER = document.getElementById("IO_SVG");
    const sides = 6;
    const xmlns = "http://www.w3.org/2000/svg";
    const SVG = document.createElementNS(xmlns, "svg");
    SVG.id = "IO_molecular_SVG";
    let SVGSIZE = 1024;
    SVG.setAttributeNS(null, "viewBox", `0 0 ${SVGSIZE} ${SVGSIZE}`);
    const STM = document.getElementById("STM_M");
    const LTM = document.getElementById("LTM_M");
    const PRINTER = document.getElementById("molecular_printer");
    let MOLOUT = document.getElementById("wrapper_IO_right");

    let Xcenter = 512;
    let Ycenter = 512;
    let circles = [];
    let Xarray = [];
    let Yarray = [];
    let allInputCircles = [];
    let drawnLines = [];
    let size = SVGSIZE /5;


    function buildCoreSVG(){

        SVG.innerHTML = "";
        Xarray = [];
        Yarray = [];
        allInputCircles = [];
        drawnLines = [];
        LTM.innerHTML = "";

        // let Xcord0, Xcord1, Xcord2, Xcord3, Xcord4, Xcord5, Xcord6;
        // let Ycord0, Ycord1, Ycord2, Ycord3, Ycord4, Ycord5, Ycord6;

        // Xarray.push(Xcenter);
        // Yarray.push(Ycenter);


        // for (i = 0; i < 1000; i += 1) {
        // Xcord0 = Math.round((Xcenter + size * Math.cos(i * 2 * Math.PI / sides)) * 100) / 100;
        // Xcord1 = Math.round((Xcenter + (size*2) * Math.cos(i * 2 * Math.PI / sides)) * 100) / 100;
        // Xcord2 = Math.round((Xcenter + (size*1.5) * Math.cos(i * 2 * Math.PI / sides)) * 100) / 100;
        // Xcord3 = Math.round((Xcenter + size * Math.cos((i+1) * 2 * Math.PI / sides)) * 100) / 100;
        // Xcord4 = Math.round((Xcenter + (size*2) * Math.cos((i+2) * 2 * Math.PI / sides)) * 100) / 100;
        // Xcord5 = Math.round((Xcenter + (size*0.5) * Math.cos((i+2) * 2 * Math.PI / sides)) * 100) / 100;
        // Xcord6 = Math.round((Xcenter + (size*2.5) * Math.cos((i+2) * 2 * Math.PI / sides)) * 100) / 100;

        // Ycord0 = Math.round((Ycenter + size * Math.sin(i * 2 * Math.PI / sides)) * 100) / 100;
        // Ycord1 = Math.round((Ycenter + (size*2) * Math.sin(i * 2 * Math.PI / sides)) * 100) / 100;
        // Ycord2 = Math.round((Xcenter + (size*1.5) * Math.sin(i * 2 * Math.PI / sides)) * 100) / 100;
        // Ycord3 = Math.round((Ycenter + (size*2) * Math.sin((i+1) * 2 * Math.PI / sides)) * 100) / 100;
        // Ycord4 = Math.round((Ycenter + (size) * Math.sin((i+2) * 2 * Math.PI / sides)) * 100) / 100;
        // Ycord5 = Math.round((Ycenter + (size*1.5) * Math.sin((i+2) * 2 * Math.PI / sides)) * 100) / 100;
        // Ycord6 = Math.round((Ycenter + (size*1.5) * Math.sin((i+2) * 2 * Math.PI / sides)) * 100) / 100;


        // Xarray.push(Xcord0);
        // Xarray.push(Xcord1);
        // Xarray.push(Xcord2);
        // Xarray.push(Xcord3);
        // Xarray.push(Xcord4);
        // Xarray.push(Xcord5);
        // Xarray.push(Xcord6);

        // Yarray.push(Ycord0);
        // Yarray.push(Ycord1);
        // Yarray.push(Ycord2);
        // Yarray.push(Ycord3);
        // Yarray.push(Ycord4);
        // Yarray.push(Ycord5);
        // Yarray.push(Ycord6);
        // };

        Xarray=[
                        310, 410,     610, 710,
                    260, 360, 460, 560, 660, 760,
                        310, 410,     610, 710,
                160, 260,                   760, 860,
              110, 210, 310,      510,    710, 810, 910,
                160, 260,                   760, 860,
                        310, 410,     610, 710,
                    260, 360, 460,  560, 660, 760,
                        310, 410,     610, 710
        ];

        Yarray=[
                        150, 150,      150, 150, 
                      240, 240, 240, 240, 240, 240, 
                        330, 330,      330, 330, 
                420, 420,                     420, 420, 
              510, 510, 510,       510,     510, 510, 510, 
                600, 600,                     600, 600,
                        690, 690,      690, 690,
                      780, 780, 780, 780, 780, 780, 
                        870, 870,       870, 870
        ];
 

        for(i = 0; i < Xarray.length; i += 1){
            let circle = document.createElementNS(xmlns, "circle");
                circle.setAttributeNS(null, "cx", Xarray[i]);
                circle.setAttributeNS(null, "cy", Yarray[i]);
                if(i === 11 || i === 12 || i === 20 || i === 21 || i === 22 || i === 30 || i === 31){
                  circle.setAttributeNS(null, "r", SVGSIZE / 32);
                  circle.setAttributeNS(null, "class", "circles_mol_max");
                }else{
                  circle.setAttributeNS(null, "r", SVGSIZE / 48);
                  circle.setAttributeNS(null, "class", "circles_mol_min");
                }
                circle.setAttributeNS(null, "fill", "rgba(255,255,255,0.4");
                circle.setAttributeNS(null, "cursor", "pointer");
                circle.setAttributeNS(null, "transition", "all 0.3s ease");
            allInputCircles.push(circle)
            SVG.appendChild(circle);
        };

        SVGWRAPPER.appendChild(SVG);


      for(i =0; i < allInputCircles.length; i += 1){
        let oneCircle = allInputCircles[i];
        oneCircle.addEventListener("mouseover", function(){
          oneCircle.setAttributeNS(null, "fill", "tomato");
        });   
        oneCircle.addEventListener("mouseout", function(){
          oneCircle.setAttributeNS(null, "fill", "rgba(255,255,255,0.4");
        });
      }
    }

    function createSvg(){
        buildCoreSVG();
      
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
              path.setAttributeNS(null, 'stroke', "white");
              path.setAttributeNS(null, 'stroke-width', 4);
              path.setAttributeNS(null, 'stroke-linejoin', "round");
              path.setAttributeNS(null, 'stroke-linecap', 'round');
              path.setAttributeNS(null, 'd', `M ${drawnLines.join(' ')}`); 
              path.setAttributeNS(null, 'opacity', 1);
              path.setAttributeNS(null, "fill", "none");
          SVG.appendChild(path);
        }
        STM.innerHTML = drawnLines;
      }
    };

      createSvg();

      (function cut(){
        SVG.setAttributeNS(null, "width", "256");
        SVG.setAttributeNS(null, "height", "256");
      
        const BTNCUT = document.getElementById("CUT_mol");
      
        BTNCUT.addEventListener("click", function(){
          let path = document.createElementNS(xmlns, "path");
          path.setAttributeNS(null, 'stroke', "greenyellow");
          path.setAttributeNS(null, 'stroke-width', 4);
          path.setAttributeNS(null, 'stroke-linejoin', "round");
          path.setAttributeNS(null, 'stroke-linecap', 'round');
          path.setAttributeNS(null, 'd', `M ${STM.innerHTML}`); 
          path.setAttributeNS(null, 'opacity', 1);
          path.setAttributeNS(null, "fill", "none");
          SVG.appendChild(path);
      
          LTM.innerText += `<path d="M ${drawnLines}"/>`;
          allInputCircles = [];
          drawnLines = [];
        });
      }());

      (function print(){
        const BTNPRINT = document.getElementById("LINK_mol");

        BTNPRINT.addEventListener("click", function(){
            let printSVG = document.createElementNS(xmlns, "svg");
            printSVG.setAttributeNS(null, "viewBox", `0 0 ${SVGSIZE} ${SVGSIZE}`);
            printSVG.setAttributeNS(null, "width", "200px");
            printSVG.setAttributeNS(null, "height", "200px");
            printSVG.setAttributeNS(null, "stroke-width", `${SVGSIZE / 128}px`);
            printSVG.setAttributeNS(null, "stroke-linecap", "round");
            printSVG.setAttributeNS(null, "stroke-linejoin", "round");
            printSVG.setAttributeNS(null, "fill", "none");
            printSVG.setAttributeNS(null, "stroke", "greenyellow");
            printSVG.style.background = "black";
            printSVG.style.borderRadius = "15px";
        
            printSVG.innerHTML = LTM.innerHTML.split('&lt;').join('<').split('&gt;').join('>');
            PRINTER.appendChild(printSVG);

        })
      }());

      (function clear(){
        const BTNCLEAR = document.getElementById("CLEAR_mol");

        BTNCLEAR.addEventListener("click", function(){
          STM.innerHTML="";
          SVGWRAPPER.innerHTML="";
          createSvg();
        })
      }());

      (function wash(){
        const BTNWASH = document.getElementById("WASH_mol");
        BTNWASH.addEventListener("click", function(){
          PRINTER.innerHTML = "";
        });
      }());

      (function mol(){
        let MOL = document.getElementById("MOLECULE");
        MOL.addEventListener("click", function(){
          let MOLOUT_SVG = document.createElementNS(xmlns, "svg");
          MOLOUT_SVG.setAttributeNS(null, "viewBox", `0 0 ${SVGSIZE} ${SVGSIZE}`);
          MOLOUT_SVG.setAttributeNS(null, "height", "100px");
          MOLOUT_SVG.setAttributeNS(null, "width", "100px");
          MOLOUT_SVG.setAttributeNS(null, "stroke-width", `${SVGSIZE / 128}px`);
          MOLOUT_SVG.setAttributeNS(null, "stroke-linecap", "round");
          MOLOUT_SVG.setAttributeNS(null, "stroke-linejoin", "round");
          MOLOUT_SVG.setAttributeNS(null, "fill", "none");
          MOLOUT_SVG.setAttributeNS(null, "stroke", "black");
          MOLOUT_SVG.innerHTML = LTM.innerHTML.split('&lt;').join('<').split('&gt;').join('>');;
          MOLOUT.appendChild(MOLOUT_SVG);
        });
      }());

      (function dissolve(){
        let DISSOLVE = document.getElementById("DISSOLVE_mol");
        DISSOLVE.addEventListener("click", function(){
          MOLOUT.innerHTML = "";
          PRINTER.innerHTML = "";
        });
      }());

}());

