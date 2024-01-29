export const createTextBox = (canvas, id, objectArray) => {
    $(`#${id}`).click(function (evt) {
      // remove active state of each layer
      var fonts = [
        "LuckiestGuy-Regular",
        "AirbnbCerealBlack",
        "AirbnbCerealBook"
      ];
      $("li").removeClass("actived");
      canvas.discardActiveObject();

      // object
      var text = new fabric.Text("Text", {
        left: 100,
        top: 100,
        hasRotatingPoint: true
      });
      canvas.add(text);
      objectArray.push(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      console.log("ADDED TEXT");
      // layer
      var id = canvas.getObjects().length - 1;
      $("#containerLayers").prepend(
        '<li id="' +
          id +
          '" class="ui-state-default actived"><span class="ui-icon ui-icon-arrow-2-n-s"></span> item ' +
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

      text.on("selected", function () {
        $("li").removeClass("actived");
        $("#" + id).addClass("actived");
      });

      var select = document.getElementById("font-family");
      fonts.forEach(function (font) {
        var option = document.createElement("option");
        option.innerHTML = font;
        option.value = font;
        select.appendChild(option);
      });

      document.getElementById("font-family").onchange = function () {
        if (this.value !== "Times New Roman") {
          loadAndUse(this.value);
        } else {
          canvas.getActiveObject().set("fontFamily", this.value);
          canvas.requestRenderAll();
        }
      };
      function loadAndUse(font) {
        var myfont = new FontFaceObserver(font);
        myfont
          .load()
          .then(function () {
            // when font is loaded, use it.
            canvas.getActiveObject().set("fontFamily", font);
            canvas.requestRenderAll();
          })
          .catch(function (e) {
            console.log(e);
            alert("font loading failed " + font);
          });
      }

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
    });
}