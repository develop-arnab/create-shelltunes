export const loadTextAnimator = (canvas, textCanvas, path) => {
  var selected = false;
  const textanimItem = bodymovin.loadAnimation({
    renderer: "canvas",
    loop: true,
    autoplay: false,
    // animationData: JSON.parse(JSON.stringify(doctorAnimationData)),
    path: path,
    rendererSettings: {
      context: textCanvas.getContext("2d"), // the canvas context
      preserveAspectRatio: "xMidYMid meet"
      //   clearCanvas: true,
    }
  });

  canvas.on({
    "selection:updated": OnAnimationSelected,
    "selection:created": OnAnimationSelected
  });

  function OnAnimationSelected(obj) {
    //Handle the object here
    // console.log("TEXT Animation SELECTED", obj.target._AECanvas.id);
    console.log("TEXT Canvas ID ", textCanvas.id);

    if (obj?.target?._AECanvas && obj?.target?._AECanvas.id === textCanvas.id) {
      console.log("MATCH");
      selected = true;
      $("#object-control .horizontal_container").remove();
      for (var i = 0; i < textanimItem.renderer.elements?.length; i++) {
        if (textanimItem?.renderer?.elements[i]?.data?.layers) {
          console.log(
            "Layer Text ",
            i +
              " " +
              textanimItem?.renderer?.elements[i]?.data?.layers[0]?.t.d.k[0].s
                .t +
              " "
          );
          $("#object-control").append(`<div class="horizontal_container">
                <p>Text Layer ${i}</p>
                <input class="input-box" type="text" id="layerText-${i}" name="width" value="${textanimItem?.renderer?.elements[i]?.data?.layers[0]?.t.d.k[0].s.t}"/>
                <div class="horizontal_box">
                <input class="input-box input-box-half" type="text" id="fontSize-${i}" name="width" value="20"/>
                <input class="input-box input-box-half" type="text" id="fontColor-${i}" name="width" value="[0,0,0]"/>
                </div>
                </div>`);
        }
      }
    } else {
      console.log("NO MATCH");
      selected = false;
    }
  }

  textanimItem.addEventListener("enterFrame", (e) => {
    // console.log('enterFrame', textanimItem.currentFrame, textanimItem.timeCompleted, textanimItem.frameRate)
    // console.log(
    //   "current time",
    //   textanimItem.currentFrame / textanimItem.frameRate
    // );
    slider.value = e.currentTime;
    canvas.requestRenderAll();
  });
  textanimItem.addEventListener("DOMLoaded", () => {
    window.tempEl = textanimItem;
    textanimItem.goToAndStop(1, true);
    console.log("total frames", textanimItem.getDuration(false));
    slider.max = textanimItem.getDuration(true);
    // console.log(textanimItem.renderer.canvasContext.canvas === textCanvas);
  });

  window.addEventListener("load", function () {
        document
          .getElementById("addAnimText")
          .addEventListener("click", function (e) {
            console.log("addAnimText");
            // var mainTitle = document.getElementById("animationText").value;
            // var subTitle = document.getElementById("animationText2").value;

            $('#object-control [id*="layerText"]').each(function () {
              // Check if the ID contains the string "layerText"
              if (
                $(this).attr("id") &&
                $(this).attr("id").includes("layerText")
              ) {
                // Log the current value and ID of the element
                console.log("ID:", $(this).attr("id"), "Value:", $(this).val());
                if (selected) {
                  textanimItem.renderer.elements[
                    Number($(this).attr("id").split("-")[1])
                  ].elements[0].updateDocumentData(
                    {
                      t: $(this).val(),
                      s: $(
                        `#fontSize-${$(this).attr("id").split("-")[1]}`
                      ).val(),
                      fc: JSON.parse(
                        $(
                          `#fontColor-${$(this).attr("id").split("-")[1]}`
                        ).val()
                      )
                    },
                    0
                  );
                }
              }
            });
            if (selected) {
              // console.log("ANIMATION DATA : ",textanimItem ," TEXT SEARCH :" ,textanimItem.assets[0].layers[0].t.d.k[0].s.t)
              // textanimItem.renderer.elements[0].elements[0].updateDocumentData({
              //   t: subTitle, fc : "#000000"
              // });
              // textanimItem.renderer.elements[2].elements[0].updateDocumentData({
              //   t: subTitle
              // },0);
              // textanimItem.renderer.elements[2].elements[0].updateDocumentData(
              //   {
              //     t: "NILABJA",
              //     s: 240
              //     //, fc : "#000000"
              //   },
              //   0
              // );
              // textanimItem.renderer.elements[2].elements[0].updateDocumentData(
              //   {
              //     t: "DAS",
              //     s: 240
              //     //, fc : "#000000"
              //   },
              //   0
              // );
              // textanimItem.renderer.elements[3].elements[0].updateDocumentData({
              //   t: mainTitle,s:40, fc : "#000000"
              // },0);
              // textanimItem.renderer.elements[4].elements[0].updateDocumentData(
              //   {
              //     t: mainTitle
              //   },
              //   0
              // );
              // textanimItem.renderer.elements[5].elements[0].updateDocumentData({
              //   t: mainTitle, fc : "#000000"
              // });
              // textanimItem.renderer.elements[4].updateDocumentData({
              //   t: subTitle
              // });
              // textanimItem.renderer.elements[5].updateDocumentData({
              //   t: subTitle
              // });
              // textanimItem.renderer.elements[6].elements[0].updateDocumentData({
              //   t: subTitle
              // });
              // textanimItem.renderer.elements[7].updateDocumentData({
              //   t: mainTitle
              // });
              // textanimItem.renderer.elements[8].elements[0].updateDocumentData({
              //   t: mainTitle
              // });
            }
          });
    document.getElementById("play").addEventListener("click", function (e) {
      console.log("It was clicked");
      textanimItem.play();
    });
    document.getElementById("pause").addEventListener("click", function (e) {
      console.log("It was clicked");
      textanimItem.pause();
    });
    document.getElementById("stop").addEventListener("click", function (e) {
      console.log("It was clicked");
      textanimItem.stop();
    });
  });
};
