import { animator } from "./CreateFabricAnimation.js";
import { loadTextAnimator } from "./LoadTextAnimation.js";
// (function () {
// var objectArray = new Array();
export const createTextAnimator = (canvas, id, path, objectArray) => {
  const textAnimView = document.getElementById(id);
  var textanimView = bodymovin.loadAnimation({
    container: textAnimView,
    renderer: "svg",
    loop: true,
    rendererSettings: {
      progressiveLoad: false
    },
    path: path
  });

  const textCanvas = document.createElement("canvas");
  textCanvas.width = 800;
  textCanvas.height = 800;
  textCanvas.setAttribute("id", `${id}-canvas`);
  const textanimItem = loadTextAnimator(canvas, textCanvas, path);
  // var objectArray = new Array();
  document.querySelector("#" + id).onclick = () => {
    $("li").removeClass("actived");
    canvas.discardActiveObject();
    fabric.Lottie = fabric.util.createClass(fabric.Image, {
      type: "lottie",
      lockRotation: true,
      lockSkewingX: true,
      lockSkewingY: true,
      srcFromAttribute: false,

      initialize: function (path, options) {
        if (!options.width) options.width = 480;
        if (!options.height) options.height = 480;

        this.path = path;
        this.tmpCanvasEl = fabric.util.createCanvasElement();
        this.tmpCanvasEl.width = options.width;
        this.tmpCanvasEl.height = options.height;

        this.lottieItem = lottie.loadAnimation({
          renderer: "canvas",
          loop: true,
          autoplay: true,
          path,
          rendererSettings: {
            context: this.tmpCanvasEl.getContext("2d"),
            preserveAspectRatio: "xMidYMid meet"
          }
        });

        // this.lottieItem.addEventListener('DOMLoaded', () => {
        //   console.log('DOMLoaded')
        // })

        this.lottieItem.addEventListener("enterFrame", (e) => {
          this.canvas?.requestRenderAll();
        });

        this.callSuper("initialize", this.tmpCanvasEl, options);
      },

      play: function () {
        this.lottieItem.play();
      },
      stop: function () {
        this.lottieItem.stop();
      },
      getSrc: function () {
        return this.path;
      }
    });

    fabric.Lottie.fromObject = function (_object, callback) {
      const object = fabric.util.object.clone(_object);
      fabric.Image.prototype._initFilters.call(
        object,
        object.filters,
        function (filters) {
          object.filters = filters || [];
          fabric.Image.prototype._initFilters.call(
            object,
            [object.resizeFilter],
            function (resizeFilters) {
              object.resizeFilter = resizeFilters[0];
              fabric.util.enlivenObjects(
                [object.clipPath],
                function (enlivedProps) {
                  object.clipPath = enlivedProps[0];
                  const fabricLottie = new fabric.Lottie(object.src, object);
                  callback(fabricLottie, false);
                }
              );
            }
          );
        }
      );
    };

    fabric.Lottie.async = true;
    // const textfabricImage = new animator(textCanvas, {
    //   id: path,
    //   scaleX: 0.5,
    //   scaleY: 0.5,
    //   needsItsOwnCache: () => {
    //     return true;
    //   },
    //   objectCaching: true
    // });

    const textfabricImage = new fabric.Lottie(path, {
      scaleX:1,
    })
    canvas.add(textfabricImage);
    objectArray.push(textfabricImage);
    canvas.requestRenderAll();
    console.log("MOVING INTO ", objectArray);
    // layer
    let id = canvas.getObjects().length - 1;
    $("#containerLayers").prepend(
      '<li id="' +
        id +
        '" class="ui-state-default actived"><span class="ui-icon ui-icon-arrow-2-n-s"></span> text ' +
        id +
        "</li>"
    );
    $("#" + id).click(function (evt) {
      if ($(this).hasClass("actived")) {
        // remove active state of all layers and objects
        $("li").removeClass("actived");
        canvas.discardActiveObject();
        canvas.renderAll();
        console.log("ACTIVE ", id);
      } else {
        // remove active state of all layers and objects
        $("li").removeClass("actived");
        canvas.discardActiveObject();
        canvas.renderAll();
        // activate layer and object
        $(this).addClass("actived");
        var obj = canvas.item(id);
        canvas.setActiveObject(obj);
        canvas.renderAll();
        console.log("DE ACTIVE ", id);
      }
    });

    textfabricImage.on("selected", function () {
      $("li").removeClass("actived");
      $("#" + id).addClass("actived");
    });

    $("#containerLayers").sortable({
      update: function (event, ui) {
        $($("#containerLayers li").get().reverse()).each(function (
          index,
          list
        ) {
          if (objectArray[$(list).attr("id")]) {
            console.log(
              "MOVINGSORTS",
              objectArray,
              "Indexes ",
              index,
              "ids ",
              $(list).attr("id")
            );
            canvas.moveTo(objectArray[$(list).attr("id")], index);
            // canvas.renderAll();
          }
        });
        canvas.renderAll();
      }
    });
    $("#containerLayers").disableSelection();
  };
};
