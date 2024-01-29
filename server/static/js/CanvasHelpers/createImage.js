export const createImage = (canvas, id_, imageSource, objectArray) => {
//   $(`#${id}`).click(function (evt) {
    // remove active state of each layer
    $("li").removeClass("actived");
    canvas.discardActiveObject();

    // object
    fabric.util.loadImage(imageSource, function (img) {
      img.crossOrigin = "anonymous";
      var obj = new fabric.Image(img);
      obj.set({
        left: 100,
        top: 100,
        scaleX: 1,
        scaleY: 1,
        hasRotationPoint: true
      });
      canvas.add(obj);
      objectArray.push(obj);
      canvas.setActiveObject(obj);
      canvas.renderAll();

      // layer
      var id = canvas.getObjects().length - 1;
      $("#containerLayers").prepend(
        '<li id="' +
          id +
          '" class="ui-state-default actived"><span class="ui-icon ui-icon-arrow-2-n-s"></span> image ' +
          id +
          "</li>"
      );
      $("#" + id).click(function (evt) {
        console.log("ACTIVE ");
        if ($(this).hasClass("actived")) {
          // remove active state of all layers and objects
          $("li").removeClass("actived");
          canvas.discardActiveObject();
          canvas.renderAll();
          console.log("ACTIVE ");
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

          console.log("DE ACTIVE ");
        }
      });

      obj.on("selected", function () {
        $("li").removeClass("actived");
        $("#" + id).addClass("actived");
      });
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
//   });
};
