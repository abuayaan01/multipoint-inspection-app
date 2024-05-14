import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { IoCrop } from "react-icons/io5";
import { PiSwatchesFill } from "react-icons/pi";
import {
  IoMdBrush,
  IoMdCloseCircle,
  IoIosUndo,
  IoIosRedo,
} from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import {
  MdOutlineRectangle,
  MdOutlineTextFields,
  MdCleaningServices,
  MdOutlineArrowOutward,
} from "react-icons/md";
import { PiPencilLine } from "react-icons/pi";

const ImageEditor = ({
  selectedImage,
  onClose,
  allImages,
  setSelectedImage,
  selectedImageIndex,
}) => {
  const { editor, onReady } = useFabricJSEditor();

  const history = [];
  const [color, setColor] = useState("#000000");
  const [cropImage, setCropImage] = useState(true);
  const [brush, setBrush] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const colorInputRef = React.useRef();

  const swatchColors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#800080",
    "#008000",
    "#000080",
    "#f1c40f",
    "#e67e22",
    "#3498db",
  ];

  const setDrawingColor = (newColor) => {
    if (!editor || !fabric || !cropImage) {
      return;
    }

    setColor(newColor);
    // editor.canvas.freeDrawingBrush.color = newColor;
    // editor.setStrokeColor(newColor);
  };

  const openColorPicker = () => {
    colorInputRef.current.click();
  };

  const MAX_CANVAS_SIZE = 500;

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }

    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }

    fabric.Image.fromURL(URL.createObjectURL(selectedImage), (image) => {
      const originalWidth = image.width;
      const originalHeight = image.height;
      const maxWidth = 600;
      const maxHeight = 400;
      const scaleFactor = Math.min(
        maxWidth / originalWidth,
        maxHeight / originalHeight
      );
      const scaledWidth = originalWidth * scaleFactor;
      const scaledHeight = originalHeight * scaleFactor;
      editor.canvas.setDimensions({ width: scaledWidth, height: scaledHeight });
      image.scaleToWidth(scaledWidth);
      image.scaleToHeight(scaledHeight);
      editor.canvas.setBackgroundImage(
        image,
        editor.canvas.renderAll.bind(editor.canvas)
      );
    });
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    addBackground();
    editor.canvas.freeDrawingBrush.color = color;
    editor.canvas.freeDrawingBrush.width = parseInt(brushSize, 10);
  }, [editor?.canvas.backgroundImage]);

  const changeBrushSize = (value) => {
    setBrushSize(value);
    editor.canvas.freeDrawingBrush.width = parseInt(brushSize, 10);
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const toggleDraw = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    setBrush(!brush);
  };

  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };

  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const onAddCircle = () => {
    editor.addCircle();
  };

  const onAddRectangle = () => {
    editor.addRectangle();
  };

  const addText = () => {
    editor.addText("Insert Text");
  };

  const onAddLine = () => {
    editor.addLine();
  };

  const onAddArrow = () => {
    if (editor) {
      const line = new fabric.Line([50, 100, 200, 200], {
        strokeWidth: 2,
        stroke: color,
        hasControls: true,
        strokeLineCap: "round",
        strokeLineJoin: "round",
      });

      const arrowHead = new fabric.Triangle({
        width: 15,
        height: 20,
        fill: color,
        top: line.y2,
        left: line.x2,
        angle: 120,
        originX: "center",
        originY: "center",
      });

      const group = new fabric.Group([line, arrowHead], {
        selectable: true,
      });

      editor.canvas.add(group);
      editor.canvas.setActiveObject(group);
    }
  };

  const onSave = () => {
    if (!editor || !fabric) {
      return;
    }

    const dataURL = editor.canvas.toDataURL({
      format: "png",
      quality: 10,
    });
    const blob = dataURLToBlob(dataURL);
    const fileName = selectedImage.name;
    const file = new File([blob], fileName, { type: "image/png" });
    allImages[selectedImageIndex] = file;
    setSelectedImage(allImages);
    onClose();
  };

  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  return (
    <>
      <div className="image-viewer">
        <div className="flex w-full">
          <div className="flex flex-col w-[20%] h-[100vh] bg-[#474747] items-censter justifys-center">
            <p className="text-gray-300 text-2xl my-5 mx-3 font-bold uppercase">
              Edit Image
            </p>
            <span
              className={`imageEditorButton ${!cropImage && "activeTool"}`}
              onClick={(e) => {
                setCropImage(!cropImage);
                if (cropImage) editor.canvas.isDrawingMode = false;
                setBrush(false);
              }}
            >
              <IoCrop /> Crop
            </span>
            <span
              className="imageEditorButton"
              onClick={onAddArrow}
              disabled={!cropImage}
            >
              <MdOutlineArrowOutward /> Arrow
            </span>
            <span
              className="imageEditorButton"
              onClick={onAddCircle}
              disabled={!cropImage}
            >
              <FaRegCircle /> Circle
            </span>
            <span
              className="imageEditorButton"
              onClick={onAddRectangle}
              disabled={!cropImage}
            >
              <MdOutlineRectangle /> Rectangle
            </span>
            <span
              className="imageEditorButton"
              onClick={addText}
              disabled={!cropImage}
            >
              <MdOutlineTextFields />
              Text
            </span>
            <span
              className="imageEditorButton"
              onClick={onAddLine}
              disabled={!cropImage}
            >
              <PiPencilLine /> Line
            </span>
            <span
              className={`imageEditorButton ${brush && "activeTool"}`}
              onClick={toggleDraw}
              disabled={!cropImage}
            >
              <IoMdBrush /> Brush
            </span>

            <div className="bg-[#606060]">
              <p className="imageEditorButton !border-none">
                <PiSwatchesFill /> Swatches
              </p>
              <div className="flex justify-around flex-wrap imageEditorButton !cursor-default !bg-[#303030] !pt-4">
                {swatchColors.map((swatchColor, index) => (
                  <div
                    key={index}
                    className="swatch cursor-pointer rounded hover:scale-110"
                    style={{
                      backgroundColor: swatchColor,
                      width: "20px",
                      height: "20px",

                    }}
                    onClick={() => setDrawingColor(swatchColor)}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[80%] relative justify-center items-center">
            <div className="bg-[#333] flex justify-between items-center h-10 absolute top-0 w-full px-2">
              <div className="flex">
                <span
                  title="Close"
                  className="text-white text-xs px-4 flex justify-center items-center py-1 rounded bg-[#474747] hover:bg-[#404040] cursor-pointer"
                  onClick={onClose}
                >
                  {selectedImage.name} <IoMdCloseCircle className="ml-2" />
                </span>

                <span className="imageEditorNavButton" disabled={!cropImage}>
                  <div
                    onClick={openColorPicker}
                    style={{
                      width: "20px",
                      height: "20px",
                      background: color,
                      borderRadius: "2px",
                    }}
                  ></div>
                  <input
                    ref={colorInputRef}
                    style={{ visibility: "hidden" }}
                    className="w-[20px] h-[20px] outline-none border-none p-0"
                    disabled={!cropImage}
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />{" "}
                  <p className="relative right-2">Color</p>
                </span>

                <div className="imageEditorNavButton">
                  <label
                    htmlFor="brushSizeRange"
                    className="text-white flex items-center"
                  >
                    Brush Size :
                    <input
                      id="brushSizeRange"
                      className="mx-2 h-[2px] cursor-pointer"
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={brushSize}
                      onChange={(e) => changeBrushSize(e.target.value)}
                      disabled={!cropImage}
                    />
                    {brushSize}
                  </label>
                </div>

                <span
                  title="Clear All"
                  className="imageEditorNavButton"
                  onClick={clear}
                  disabled={!cropImage}
                >
                  <MdCleaningServices />
                </span>

                <span
                  title="Undo"
                  className="imageEditorNavButton"
                  onClick={undo}
                  disabled={!cropImage}
                >
                  <IoIosUndo />
                </span>

                <span
                  title="Redo"
                  className="imageEditorNavButton"
                  onClick={redo}
                  disabled={!cropImage}
                >
                  <IoIosRedo />
                </span>
              </div>

              <div className="flex">
                <span
                  className="imageEditorNavButton bg-[#474747]"
                  onClick={removeSelectedObject}
                  disabled={!cropImage}
                >
                  Delete Selection
                </span>
                <span
                  className="imageEditorNavButton bg-[#474747]"
                  onClick={onSave}
                >
                  Save
                </span>
              </div>
            </div>
            <div
              className=""
              style={{
                border: `1px ${!cropImage ? "dashed" : "solid"} #aaa`,
              }}
            >
              <FabricJSCanvas className="sample-canvas" onReady={onReady} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageEditor;
