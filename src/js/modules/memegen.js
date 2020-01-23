export default class MemeGen {
  /**
   * @constructor
   * @this {MemeGen}
   * @param {string} id - id of the DOM element to mount in (root element)
   */
  constructor(id) {
    this.topTextElement = null;
    this.bottomTextElement = null;
    this.fontFamilyElement = null;
    this.fontSizeElement = null;
    this.fontColorElement = null;
    this.imageElement = null;
    this.canvasElement = null;
    this.canvasContext = null;
    this.mimeTypeElement = null;
    this.saveElement = null;

    this.rootElement = document.getElementById(id);
    this.appElement = null;

    this.topText = null;
    this.bottomText = null;
    this.fontFamily = null;
    this.fontSize = null;
    this.fontColor = null;
    this.mimeType = null;

    this.imageUrl = "https://i.imgflip.com/2cp1.jpg";

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    this.onSaveHandler = this.onSaveHandler.bind(this);

    this.setup();
  }

  /**
   * @this {MemeGen}
   * @description Application setup
   */
  setup() {
    this.initWrapper();

    this.initToolbar();
    this.initCanvas();
    this.initSave();
    this.initResults();
    this.initListeners();

    this.render();
  }

  /**
   * @this {MemeGen}
   * @description Creates and injects the main app wrapper in the root element
   */
  initWrapper() {
    if (this.rootElement) {
      const markup = `<div class="app"></div>`;

      this.rootElement.insertAdjacentHTML("beforeend", markup);
      this.appElement = document.querySelector(".app");
    } else {
      console.error("DOM element with the provided ID is not found!");
    }
  }

  /**
   * @this {MemeGen}
   * @description Creates and injects the toolbar in the main app wrapper
   */
  initToolbar() {
    const markup = `
      <div class="app__toolbar">
        <div class="form-row">
          <div class="input-group col-lg-4 app__control">
            <div class="input-group-prepend">
              <span class="input-group-text">File</span>
            </div>
            <div class="custom-file">
              <input class="custom-file-input" id="image" type="file" accept="image/jpeg,image/png,image/gif" />
              <label class="custom-file-label" for="#image">Select</label>
            </div>
          </div>
          <div class="input-group col-lg-4 app__control">
            <div class="input-group-prepend">
              <label class="input-group-text" for="topText">Top Text</label>
            </div>
            <input class="form-control" id="topText" type="text" placeholder="Type text..." value="Start Of Debug" name="topText" />
          </div>
          <div class="input-group col-lg-4 app__control">
            <div class="input-group-prepend">
              <label class="input-group-text" for="bottomText">Bottom Text</label>
            </div>
            <input class="form-control" id="bottomText" type="text" placeholder="Type text..." value="End Of Debug" name="bottomText" />
          </div>
        </div>
        <div class="form-row">
          <div class="input-group col-lg-4 app__control">
            <div class="input-group-prepend">
              <label class="input-group-text" for="font">Font</label>
            </div>
            <select class="custom-select" id="font" name="fontFamily">
              <option disabled="disabled">Choose...</option>
              <option selected="selected" value="Arial">Arial</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Pacifico">Pacifico</option>
            </select>
          </div>
          <div class="input-group col-lg-4 app__control">
            <div class="input-group-prepend">
              <label class="input-group-text" for="color">Color</label>
            </div>
            <input class="form-control" id="color" type="text" value="rgb(255, 128, 0)" name="fontColor" />
          </div>
          <div class="input-group col-lg-4 app__control">
            <label class="mr-2" for="size">Font Size</label>
            <input class="custom-range" id="size" type="range" min="15" max="50" value="25" style="flex-grow: 1; width: auto;" name="fontSize" />
          </div>
      </div>
    </div> `;

    this.appElement.insertAdjacentHTML("beforeend", markup);

    this.topTextElement = document.getElementById("topText");
    this.bottomTextElement = document.getElementById("bottomText");
    this.fontFamilyElement = document.getElementById("font");
    this.fontSizeElement = document.getElementById("size");
    this.fontColorElement = document.getElementById("color");
    this.imageElement = document.getElementById("image");

    this.topText = this.topTextElement.value || "Start Of Debug";
    this.bottomText = this.bottomTextElement.value || "End Of Debug";
    this.fontFamily = this.fontFamilyElement.value || "Arial";
    this.fontSize = this.fontSizeElement.value || "25";
    this.fontColor = this.fontColorElement.value || "#ffffff";
  }

  /**
   * @this {MemeGen}
   * @description Creates and injects the canvas in the main app wrapper
   */
  initCanvas() {
    const markup = `
      <div class="app__canvas">
        <canvas id="canvas"></canvas>
      </div> `;

    this.appElement.insertAdjacentHTML("beforeend", markup);

    this.canvasElement = document.getElementById("canvas");

    this.canvasContext = this.canvasElement.getContext("2d");
  }

  /**
   * @this {MemeGen}
   * @description Creates and injects the save toolbar in the main app wrapper
   */
  initSave() {
    const markup = `
      <div class="app__save">
        <div class="input-group col-lg-6 app__control">
          <select class="custom-select" id="mime" name="mimeType">
            <option disabled="disabled">Choose...</option>
            <option selected="selected" value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/gif">GIF</option>
          </select>
          <div class="input-group-append">
            <button class="btn btn-info" id="save">Save As</button>
          </div>
        </div>
      </div> `;

    this.appElement.insertAdjacentHTML("beforeend", markup);

    this.mimeTypeElement = document.getElementById("mime");
    this.saveElement = document.getElementById("save");

    this.mimeType = this.mimeTypeElement.value || "image/jpeg";
  }

  /**
   * @this {MemeGen}
   * @description Creates and injects the results wrapper in the main app wrapper
   */
  initResults() {
    const markup = `
      <div class="app__results">
        <div class="row"></div>
      </div> `;

    this.appElement.insertAdjacentHTML("beforeend", markup);
  }

  /**
   * @this {MemeGen}
   * @description Event listeners setup
   */
  initListeners() {
    this.imageElement.addEventListener("change", this.onFileChangeHandler);

    this.topTextElement.addEventListener("input", this.onChangeHandler);

    this.bottomTextElement.addEventListener("input", this.onChangeHandler);

    this.fontFamilyElement.addEventListener("input", this.onChangeHandler);

    this.fontSizeElement.addEventListener("change", this.onChangeHandler);

    this.mimeTypeElement.addEventListener("change", this.onChangeHandler);

    this.saveElement.addEventListener("click", this.onSaveHandler);

    $("#color")
      .colorpicker()
      .on("colorpickerChange", this.onChangeHandler);

    document.addEventListener("click", this.onDeleteHandler);
  }

  /**
   * @this {MemeGen}
   * @param {InputEvent | Event} event - input or change event
   * @description
   */
  onChangeHandler(event) {
    const { name, value } = event.target;

    this[name] = value;

    this.render();
  }

  /**
   * @this {MemeGen}
   * @param {Event} event - change event
   */
  onFileChangeHandler(event) {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;

      this.render();
    };

    reader.readAsDataURL(event.target.files[0]);

    document.querySelector(".custom-file-label").innerHTML =
      event.target.files[0].name;
  }

  /**
   * @this {MemeGen}
   * @param {MouseEvent} event - click event
   */
  onSaveHandler(event) {
    event.preventDefault();

    let snapshot;

    if (this.mimeType === "image/gif") {
      // eslint-disable-next-line no-undef
      const gif = new GIF({
        workers: 2,
        quality: 10
      });

      gif.addFrame(this.canvasElement, { delay: 200 });

      gif.on("finished", blob => {
        const reader = new FileReader();

        reader.onload = () => {
          snapshot = reader.result;

          const markup = this.getResultMarkup(snapshot);

          document
            .querySelector(".app__results .row")
            .insertAdjacentHTML("beforeend", markup);
        };

        reader.readAsDataURL(blob);
      });

      gif.render();
    } else {
      snapshot = this.canvasElement.toDataURL(this.mimeType);

      const markup = this.getResultMarkup(snapshot);

      document
        .querySelector(".app__results .row")
        .insertAdjacentHTML("beforeend", markup);
    }
  }

  /**
   * @this {MemeGen}
   * @param {MouseEvent} event - click event
   */

  // eslint-disable-next-line class-methods-use-this
  onDeleteHandler(event) {
    if (event.target.className.includes("btn-danger")) {
      event.target
        .closest(".col-md-4")
        .parentNode.removeChild(event.target.closest(".col-md-4"));
    }
  }

  /**
   * @this {MemeGen}
   * @param {string} snapshot - urlencoded image
   * @returns {string} HTML string
   * @description Generates a markup string
   */
  getResultMarkup(snapshot) {
    const markup = `
      <div class="col-md-4">
        <div class="card mb-5">
          <img class="card-img-top" src="${snapshot}" alt="A custom meme" />
          <div class="card-body">
          <p class="card-text">Top Text: ${this.topText}</p>
          <p class="card-text">Bottom Text: ${this.bottomText}</p>
          <a href="${snapshot}" download="meme" class="btn btn-success">Download</a>
          <button class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    `;

    return markup;
  }

  /**
   * @this {MemeGen}
   * @description Renders image and text into canvas
   */
  render() {
    const image = new Image();

    image.addEventListener("load", () => {
      this.canvasElement.width = image.width;
      this.canvasElement.height = image.height;

      this.canvasContext.drawImage(image, 0, 0);

      this.canvasContext.textAlign = "center";
      this.canvasContext.textBaseline = "middle";
      this.canvasContext.font = `${this.fontSize}px ${this.fontFamily}`;
      this.canvasContext.fillStyle = this.fontColor;
      this.canvasContext.fillText(
        this.topText,
        this.canvasElement.width / 2,
        50
      );
      this.canvasContext.fillText(
        this.bottomText,
        this.canvasElement.width / 2,
        this.canvasElement.height - 50
      );
    });

    image.setAttribute("crossorigin", "anonymous"); // tainted canvas fix
    image.setAttribute("src", this.imageUrl);
  }
}
