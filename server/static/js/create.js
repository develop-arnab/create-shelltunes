import { create } from "./CanvasHelpers/CreateFabricArt.js";
import { createAndAddShapeToCanvas } from "../js/CanvasHelpers/shapesHelper.js";
import { createTextAnimator } from "./CanvasHelpers/createTextAnimator.js";
import { createArtAnimator } from "./CanvasHelpers/createArtAnimator.js";
import { createTextBox } from "./CanvasHelpers/createTextBox.js";
import { createImage } from "./CanvasHelpers/createImage.js";
import {
  saveCanvasState,
  retrieveCanvasState
} from "../services/animationsServices.js";
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 700,
    height: 680,
    selection: false,
    backgroundColor: "grey"
  });
};
const canvas = initCanvas("canvas");
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://create.shelltunes.com";
// const canvas = new fabric.Canvas("canvas");
document.getElementById("canvas").fabric = canvas;

// Listen for messages from the parent window
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_ACCESS_TOKEN") {
    // Set the access token in localStorage
    localStorage.setItem("accessToken", event.data.token);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  // Retrieve token from query parameters and set it in localStorage
  const urlSearchParams = new URLSearchParams(window.location.search);
  const tokenFromQueryParam = urlSearchParams.get("token");
  const idQueryParam = urlSearchParams.get("id");
  if (tokenFromQueryParam) {
    // Set the access token in localStorage
    localStorage.setItem("accessToken", tokenFromQueryParam);
  }

  if (idQueryParam) {
    console.log("ID ", idQueryParam);

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/` + `retrieveSavedCanvas?id=${idQueryParam}`
      );
      console.log("RETURNED Saved ", data);
      var divElement = document.getElementById("demo-anim");
      if (divElement) {
        divElement.click();
      }
      canvas.loadFromJSON(data[0].objects, function () {
        canvas.requestRenderAll();
      });
      // return data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
});
// $(document).ready(function () {
///// Create side panel div animations ////////
var objectArray = new Array();
const canvasCenter = canvas.getCenter();
const circle = new fabric.Circle({
  radius: 50,
  fill: "#cccccc",
  left: canvasCenter.left,
  top: -50,
  originX: "center",
  originY: "center",
  cornerColor: "grey"
});
const createCirc = createAndAddShapeToCanvas(
  canvas,
  "createCircle",
  circle,
  objectArray
);
const rect = new fabric.Rect({
  width: 100,
  height: 100,
  fill: "#333",
  left: canvasCenter.left,
  top: canvasCenter.top,
  originX: "center",
  originY: "center",
  cornerColor: "blue",
  objectCaching: false
});

const createRec = createAndAddShapeToCanvas(
  canvas,
  "createRect",
  rect,
  objectArray
);
const createText = createTextAnimator(
  canvas,
  "text-anim",
  `${BASE_URL}/assets/anim/Text/TextComp1.json`,
  objectArray
);

const createText2 = createTextAnimator(
  canvas,
  "text-anim2",
  `${BASE_URL}/assets/anim/Text/TextComp25.json`,
  objectArray
);

const createArt = createArtAnimator(
  canvas,
  "doctor-anim",
  `${BASE_URL}/uploads/2022-01-24T20-01-36.288Z-cow.json`,
  objectArray
);

const createArt2 = createArtAnimator(
  canvas,
  "demo-anim",
  `${BASE_URL}/uploads/2022-01-30T17-59-45.084Z-bat.json`,
  objectArray
);

const textbox = createTextBox(canvas, "btnCreateText", objectArray);

document.addEventListener("DOMContentLoaded", function () {
  function handleAddImageClick(clickedImageSrc) {
    console.log("CALLING IMAGE with ", clickedImageSrc);
    createImage(canvas, "btnCreateImage", clickedImageSrc, objectArray);
  }

  document
    .getElementById("performSearch")
    .addEventListener("click", async function () {
      console.log("Searching animations");
      var searchQuery = document.getElementById("searchInput").value;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        search: searchQuery
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      // Make API call
      await fetch(`${BASE_URL}/api/search`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Returned data ", data);
          // Process the response and create divs
          const resultsContainer = document.getElementById("animation-result");
          resultsContainer.innerHTML = ""; // Clear previous results

          data.result.forEach((item, idx) => {
            const newDiv = document.createElement("div");
            newDiv.className = "panel__img";
            newDiv.id = `anim-${idx}`;
            // var textanimView = bodymovin.loadAnimation({
            //   container: newDiv,
            //   renderer: "svg",
            //   loop: true,
            //   rendererSettings: {
            //     progressiveLoad: false
            //   },
            //   path: item.url.split("?")[0]
            // });
            resultsContainer.appendChild(newDiv);
            createArtAnimator(
              canvas,
              `anim-${idx}`,
              item.url.split("?")[0],
              objectArray
            );
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    });

  document
    .getElementById("searchImages")
    .addEventListener("click", async function () {
      console.log("Searching Images");
      var searchQuery = document.getElementById("imagesSearchInput").value;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        search: searchQuery
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      // Make API call
      await fetch("https://create.shelltunes.com/api/search-image", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Returned data ", data);
          // Process the response and create divs
          const resultsContainer = document.getElementById("images-result");
          resultsContainer.innerHTML = ""; // Clear previous results

          data.forEach((item, idx) => {
            const linkElement = document.createElement("a");
            linkElement.href = "#open-modal";

            // Create <img> element
            const imgElement = document.createElement("img");
            imgElement.classList.add("panel__img");
            imgElement.crossOrigin = "anonymous";
            imgElement.src = item.regular; // Change this to the appropriate image URL property from your API response
            imgElement.alt = "Uploaded image";

            // Append <img> to <a>
            linkElement.appendChild(imgElement);

            // Append <a> to resultsContainer
            resultsContainer.appendChild(linkElement);
          });

          // Add click event listener to the parent container after images are loaded
          resultsContainer.addEventListener("click", function (event) {
            console.log("Clicked element: ", event.target);
            console.log("Clicked element tag name: ", event.target.tagName);

            var clickedImageSrc;

            // Check if the clicked element is an <img> inside an <a>
            if (
              event.target.tagName === "IMG" &&
              event.target.parentNode.tagName === "A"
            ) {
              event.preventDefault();
              clickedImageSrc = event.target.getAttribute("src");
            }

            if (clickedImageSrc) {
              console.log("IMAGE SRC ", clickedImageSrc);
              handleAddImageClick(clickedImageSrc);
            }
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    });
  const canvasColorListener = () => {
    const picker = document.getElementById("canvas-color-picker");
    picker.addEventListener("change", (event) => {
      console.log("COLOR", event.target.value);
      // color = event.target.value;
      // // canvas.freeDrawingBrush.color = color;
      // // canvas.freeDrawingBrush.width = 15;
      // canvas.getActiveObject().set("fill", color);
      // canvas.renderAll();
    });
    canvas.setBackgroundColor(
      event.target.value,
      canvas.renderAll.bind(canvas)
    );
  };
  canvasColorListener();

  // Function to update canvas properties
  function updateCanvas() {
    const newWidth =
      parseInt(document.getElementById("canvas-width").value) ||
      canvas.getWidth();
    const newHeight =
      parseInt(document.getElementById("canvas-height").value) ||
      canvas.getHeight();
    const newColor = document.getElementById("canvas-color-picker").value;

    // Update canvas properties
    canvas.setDimensions({
      width: newWidth,
      height: newHeight
    });

    canvas.setBackgroundColor(newColor, canvas.renderAll.bind(canvas));
  }

  // Event listeners for input changes
  document
    .getElementById("canvas-width")
    .addEventListener("input", updateCanvas);
  document
    .getElementById("canvas-height")
    .addEventListener("input", updateCanvas);
  document
    .getElementById("canvas-color-picker")
    .addEventListener("input", updateCanvas);

  // Initial canvas setup
  updateCanvas();
});
let color = "#000";

(function () {
  var oldVal;
  const setColorListener = () => {
    const picker = document.getElementById("color-picker");
    picker.addEventListener("change", (event) => {
      console.log("COLOR", event.target.value);
      color = event.target.value;
      // canvas.freeDrawingBrush.color = color;
      // canvas.freeDrawingBrush.width = 15;
      canvas.getActiveObject().set("fill", color);
      canvas.renderAll();
    });
  };
  setColorListener();
  $("#width").on("change textInput input", function () {
    var val = this.value;
    if (val !== oldVal) {
      oldVal = val;
      const scale = canvas.getActiveObject().getObjectScaling();
      console.log("Width", val);
      canvas.getActiveObject().set("width", val / scale.scaleX);
      canvas.getActiveObject().setCoords();
      canvas.renderAll();
    }
  });
})();

canvas.on({
  "selection:updated": OnAnimationSelected,
  "selection:created": OnAnimationSelected
});

function OnAnimationSelected(obj) {
  //Handle the object here
  // console.log("Animation SELECTED", obj.target._AECanvas.id);
}

slider.oninput = (e) => {
  console.log(
    e.target.value,
    parseInt(e.target.value, 10) / 25,
    doctoranimItem.frameModifier
  );
  doctoranimItem.goToAndStop((parseInt(e.target.value, 10) / 25) * 1000, false);
};

function objectMovedListener(ev) {
  let target = ev.target;
  console.log(
    "left",
    target.left,
    "top",
    target.top,
    "width",
    target.width * target.scaleX,
    "height",
    target.height * target.scaleY
  );
  document.getElementById("width").value = (
    target.width * target.scaleX
  ).toFixed(2);
  document.getElementById("height").value = (
    target.height * target.scaleY
  ).toFixed(2);
}

// canvas.on('object:added', objectAddedListener);
canvas.on("object:modified", objectMovedListener);

let currentMode;
const modes = {
  pan: "pan",
  drawing: "drawing"
};

const toggleMode = (mode) => {
  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = "";
    } else {
      currentMode = modes.pan;
      canvas.isDrawingMode = false;
      canvas.renderAll();
    }
  } else if (mode === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = "";
      canvas.isDrawingMode = false;
      canvas.renderAll();
    } else {
      console.log(canvas.freeDrawingBrush.color);
      // canvas.freeDrawingBrush.color = color
      // canvas.freeDrawingBrush.width = 15

      currentMode = modes.drawing;
      canvas.isDrawingMode = true;
      canvas.renderAll();
    }
  }

  console.log(mode);
};

// var imageSaver = document.getElementById("lnkDownload");
// imageSaver.addEventListener("click", saveImage, false);

var canvasSaver = document.getElementById("saveCanvasButton");
canvasSaver.addEventListener("click", saveCanvas, false);

var imageSaver = document.getElementById("saveImageButton");
imageSaver.addEventListener("click", saveCanvasAsImage, false);
function saveCanvasAsImage(e) {
  console.log("SAVING IMAGE ");
  window.open(canvas.toDataURL("png"));
}
var jsonCanvas;

async function saveCanvas(e) {
  // canvas
  //   .getObjects()
  //   .filter((obj) => console.log("CANV OBJ Filter ", obj.id));
  //      canvas.forEachObject(function (obj) {
  //       //  obj.sourcePath = "/URL/FILE.svg";
  //        console.log("CANV OBJ " , obj.id);
  //      });

  jsonCanvas = JSON.stringify(canvas);
  console.log("SAVING ", jsonCanvas);
  const _jsonCanvas = await saveCanvasState(
    JSON.stringify(canvas),
    canvas.toDataURL("png")
  );
  console.log("OBJ Canvas", jsonCanvas);
}

var canvasLoader = document.getElementById("loadCanvasButton");
canvasLoader.addEventListener("click", loadCanvas, false);

async function loadCanvas() {
  const savedCanvas = await retrieveCanvasState();
  console.log("Called Load CANVAS", savedCanvas);

  canvas.loadFromJSON(savedCanvas, function () {
    canvas.requestRenderAll();
  });
  // canvas.loadFromJSON(savedCanvas);
  // canvas.requestRenderAll();
}

const svgState = {};
const clearCanvas = (canvas, svgState) => {
  svgState.val = canvas.toSVG();
  let obj = canvas.getObjects();
  console.log(obj);

  obj.forEach((o) => {
    // if(o !== canvas.backgroundImage) {
    //   canvas.remove(o)
    // }
    canvas.remove(o);
  });
};

const restoreCanvas = (canvas, svgState) => {
  if (svgState.val) {
    fabric.loadSVGFromString(svgState.val, (objects) => {
      console.log(objects);
      // objects = objects.filter((o) => o["xlink:href"] !== bgUrl);
      canvas.add(...objects);
      canvas.requestRenderAll();
    });
  }
};

var canvas_to_capture = $("canvas#canvas")[0];
var fps = 30,
  mediaRecorder;

function create_stream() {
  var canvasStream = canvas_to_capture.captureStream(fps);
  //create media recorder from the MediaStream object
  mediaRecorder = new MediaRecorder(canvasStream);
  var chunks = [];
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  //create dynamic video tag to
  mediaRecorder.onstop = function (e) {
    var blob = new Blob(chunks, { type: "video/mp4" });
    chunks = [];
    var videoURL = URL.createObjectURL(blob);
    var tag = document.createElement("a");
    tag.href = videoURL;
    tag.download = "sample.mp4";
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  //build the data chunk
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  //start recording
  mediaRecorder.start();
}

var recordToggle = false;

const record = () => {
  if (!recordToggle) {
    startRecording();
    recordToggle = true;
  } else {
    stopRecording();
    recordToggle = false;
  }
};
const startRecording = () => {
  create_stream();
};
const stopRecording = () => {
  mediaRecorder.stop();
};

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));
