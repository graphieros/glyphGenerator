(function main(){

  const SVG_wrapper = document.getElementById("inputSVGwrapper_L");
  const xmlns = "http://www.w3.org/2000/svg";
  const SVG = document.createElementNS(xmlns, "svg");
  SVG.id = "baseSVG";
  SVG.setAttributeNS(null, "viewBox", "0 0 1024 1024");

  const STM = document.getElementById("STM_L");
  const LTM = document.getElementById("LTM_L");
  const ICS = document.getElementById("ICS_L");
  const CS = document.getElementById("CS_L");

  const PRINTER = document.getElementById("PRINTER_L");
  const SENTENCE = document.getElementById("sentence");

  let Xcenter = 512;
  let Ycenter = 512;
  let circles = [];
  let Xarray = [];
  let Yarray = [];
  let drawnLines = [];
  let fakeLines = [];
  let size = 400;

  let sides = 6;

  function buildCoreSVG(){
    SVG.innerHTML = "";
    Xarray = [];
    Yarray = [];
    circles = [];
    drawnLines = [];
    fakeLines = [];
    LTM.innerHTML = "";

    let Xcord;
    let Ycord;

    Xarray.push(Xcenter);
    Yarray.push(Ycenter);

    for(i = 0; i < sides; i += 1){
      Xcord = Math.round((Xcenter + size * Math.cos(i * 2 * Math.PI / sides)) * 100) / 100;
        Ycord = Math.round((Ycenter + size * Math.sin(i * 2 * Math.PI / sides)) * 100) / 100;
        Xarray.push(Xcord);
        Yarray.push(Ycord);
    }

    for(i = 0; i <= sides; i += 1){
      let circle = document.createElementNS(xmlns, "circle");
          circle.setAttributeNS(null, "class", "inputCircles");
          circle.setAttributeNS(null, "cx", Xarray[i]);
          circle.setAttributeNS(null, "cy", Yarray[i]);
          circle.setAttributeNS(null, "r", 40);
          circle.setAttributeNS(null, "fill", "white");
          circle.setAttributeNS(null, "cursor", "pointer");
          circle.setAttributeNS(null, "transition", "all 0.3s ease");
      circles.push(circle)
      SVG.appendChild(circle);
  };

  SVG_wrapper.appendChild(SVG);

  for(i =0; i < circles.length; i += 1){
    let oneCircle = circles[i];
    oneCircle.addEventListener("mouseover", function(){
      oneCircle.setAttributeNS(null, "fill", "tomato");
    });   
    oneCircle.addEventListener("mouseout", function(){
      oneCircle.setAttributeNS(null, "fill", "white");
    });
  }
  };

  let Yincr = 0;

  function createSVG(){
    buildCoreSVG();

    for(i = 0; i < circles.length; i += 1){
      let O = circles[i];
      let X = Xarray[i];
      let Y = Yarray[i];

      let Yfake = Yarray[i] + Yincr;

      O.addEventListener("click", function(){
        drawnLines.push([X, Y]);
        fakeLines.push([X, Yfake]);
        drawLine();
      });
    }
  

  function drawLine(){
    if(drawnLines.length >=1){
      let path = document.createElementNS(xmlns, "path");
              path.setAttributeNS(null, 'stroke', "white");
      path.setAttributeNS(null, 'stroke-width', 15);
              path.setAttributeNS(null, 'stroke-linejoin', "round");
              path.setAttributeNS(null, 'stroke-linecap', 'round');
              path.setAttributeNS(null, 'd', `M ${drawnLines.join(' ')}`); 
              path.setAttributeNS(null, 'opacity', 1);
              path.setAttributeNS(null, "fill", "none");
          SVG.appendChild(path);
    }
    STM.innerHTML = drawnLines;
    CS.innerHTML = fakeLines;
  }
}

  createSVG();

  (function cut(){
    SVG.setAttributeNS(null, "width", "200");
    SVG.setAttributeNS(null, "height", "200");
  
    const BTNCUT = document.getElementById("CUT_L");
  
    BTNCUT.addEventListener("click", function(){
      let path = document.createElementNS(xmlns, "path");
      path.setAttributeNS(null, 'stroke', "greenyellow");
      path.setAttributeNS(null, 'stroke-width', 15);
      path.setAttributeNS(null, 'stroke-linejoin', "round");
      path.setAttributeNS(null, 'stroke-linecap', 'round');
      path.setAttributeNS(null, 'd', `M ${CS.innerHTML}`); 
      path.setAttributeNS(null, 'opacity', 1);
      path.setAttributeNS(null, "fill", "none");
      SVG.appendChild(path);
  
      LTM.innerText += `<path d="M ${drawnLines}"/>`;
      ICS.innerText += `<path d="M ${fakeLines}"/>`;
      allInputCircles = [];
      drawnLines = [];
      fakeLines = [];
    });
  }());

  (function clear(){
    const BTNCLEAR = document.getElementById("CLEAR_L");

    BTNCLEAR.addEventListener("click", function(){
      STM.innerHTML = "";
      CS.innerHTML = "";
      SVG_wrapper.innerHTML="";
      createSVG();
    })
  }());

  let linkHeight = 50;
  let viewBoxHeight = 1024;

  let spit = [];

  function link(){
    const BTNLINK = document.getElementById("LINK_L");

    BTNLINK.addEventListener("click", function(){
      PRINTER.innerHTML = "";
      let linkSVG = document.createElementNS(xmlns, "svg");
      linkSVG.id = "final_output";
      linkSVG.setAttributeNS(null, "viewBox", `0 0 1024 ${viewBoxHeight}`);
      linkSVG.setAttributeNS(null, "width", "50px");
      linkSVG.setAttributeNS(null, "height", `${linkHeight}px`);
      linkSVG.setAttributeNS(null, "stroke-width", "30px");
      linkSVG.setAttributeNS(null, "stroke-linecap", "round");
      linkSVG.setAttributeNS(null, "stroke-linejoin", "round");
      linkSVG.setAttributeNS(null, "fill", "none");
      linkSVG.setAttributeNS(null, "stroke", "black");

      let centraLine = document.createElementNS(xmlns, "path");
      centraLine.setAttributeNS(null, 'stroke', "black");
      centraLine.setAttributeNS(null, 'stroke-width', 15);
      centraLine.setAttributeNS(null, 'stroke-linejoin', "round");
      centraLine.setAttributeNS(null, 'stroke-linecap', 'round');
      centraLine.setAttributeNS(null, 'd', `M 500 512, 524 ${viewBoxHeight - 512}`); 
      centraLine.setAttributeNS(null, 'opacity', 1);
      centraLine.setAttributeNS(null, "fill", "none");

      let centraLine2 = document.createElementNS(xmlns, "path");
      centraLine2.setAttributeNS(null, 'stroke', "black");
      centraLine2.setAttributeNS(null, 'stroke-width', 15);
      centraLine2.setAttributeNS(null, 'stroke-linejoin', "round");
      centraLine2.setAttributeNS(null, 'stroke-linecap', 'round');
      centraLine2.setAttributeNS(null, 'd', `M 524 512, 500 ${viewBoxHeight - 512}`); 
      centraLine2.setAttributeNS(null, 'opacity', 1);
      centraLine2.setAttributeNS(null, "fill", "none");

      linkSVG.innerHTML = ICS.innerHTML.split('&lt;').join('<').split('&gt;').join('>');
      linkSVG.appendChild(centraLine);
      linkSVG.appendChild(centraLine2);

      PRINTER.appendChild(linkSVG);
      spit.push(linkSVG);
      Yincr += 1024;
      linkHeight += 50;
      viewBoxHeight += 1024;
    })
  };

  link();

  (function wash(){
    const BTNWASH = document.getElementById("WASH_L");
    BTNWASH.addEventListener("click", function(){
      STM.innerHTML = "";
      CS.innerHTML = "";
      SVG_wrapper.innerHTML="";
      LTM.innerHTML = "";
      ICS.innerHTML = "";
      PRINTER.innerHTML = "";
      Yincr = 0;
      createSVG();
      linkHeight = 50;
      viewBoxHeight = 1024;
    });
  }());

  (function copyToSentence(){
    const BTNWORD = document.getElementById("WORD_L");

    BTNWORD.addEventListener("click", function(){
      const oneWord = document.getElementById("final_output");
      SENTENCE.appendChild(oneWord);
      STM.innerHTML = "";
      CS.innerHTML = "";
      SVG_wrapper.innerHTML="";
      LTM.innerHTML = "";
      ICS.innerHTML = "";
      PRINTER.innerHTML = "";
      Yincr = 0;
      createSVG();
      linkHeight = 50;
      viewBoxHeight = 1024;
    })
  }());

  (function clearSentence(){
    const BTNCLEARSENT = document.getElementById("CLEARSENTENCE");
      BTNCLEARSENT.addEventListener("click", function(){
        SENTENCE.innerHTML ="";
      })
  }());

}());
