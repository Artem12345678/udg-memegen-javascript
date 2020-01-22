export default class Canvas {
  constructor(id) {
    this.canvasElement = document.getElementById(id);
    this.imageElement = document.getElementById("image");
    this.fontElement = document.getElementById("font");
    this.colorElement = document.getElementById("color");
    this.sizeElement = document.getElementById("size");
    this.topTextElement = document.getElementById("topText");
    this.bottomTextElement = document.getElementById("bottomText");
    this.mimeTypeElement = document.getElementById("mime");
    this.saveElement = document.getElementById("save");

    this.canvasContext = null;

    this.topText = this.topTextElement.value || "Start Of Debug";
    this.bottomText = this.bottomTextElement.value || "End Of Debug";
    this.fontFamily = this.fontElement.value || "Arial";
    this.fontSize = this.sizeElement.value || "25";
    this.fontColor = this.colorElement.value || "#ffffff";
    this.imageUrl = "https://i.imgflip.com/2cp1.jpg";
    this.mimeType = "image/jpeg";

    this.setup();
  }

  setup() {
    this.initCanvas();
    this.initListeners();
    this.render();
  }

  initCanvas() {
    if (this.canvasElement) {
      this.canvasContext = this.canvasElement.getContext("2d");
    } else {
      console.error("Canvas element with provided ID is not found!");
    }
  }

  initListeners() {
    if (this.imageElement) {
      this.imageElement.addEventListener("change", e => {
        const reader = new FileReader();

        reader.onload = () => {
          this.imageUrl = reader.result;

          this.render();
        };

        reader.readAsDataURL(e.target.files[0]);

        document.querySelector(".custom-file-label").innerHTML =
          e.target.files[0].name;
      });
    } else {
      console.error("DOM element with id #image is not found!");
    }

    if (this.topTextElement) {
      this.topTextElement.addEventListener("input", e => {
        this.topText = e.target.value;

        this.render();
      });
    } else {
      console.error("DOM element with id #topText is not found!");
    }

    if (this.bottomTextElement) {
      this.bottomTextElement.addEventListener("input", e => {
        this.bottomText = e.target.value;

        this.render();
      });
    } else {
      console.error("DOM element with id #bottomText is not found!");
    }

    if (this.fontElement) {
      this.fontElement.addEventListener("change", e => {
        this.fontFamily = e.target.value;

        this.render();
      });
    } else {
      console.error("DOM element with id #font is not found!");
    }

    if (this.colorElement) {
      $("#color")
        .colorpicker()
        .on("colorpickerChange", e => {
          this.fontColor = e.target.value;

          this.render();
        });
    } else {
      console.error("DOM element with id #color is not found!");
    }

    if (this.sizeElement) {
      this.sizeElement.addEventListener("change", e => {
        this.fontSize = e.target.value;

        this.render();
      });
    } else {
      console.error("DOM element with id #size is not found!");
    }

    if (this.mimeTypeElement) {
      this.mimeTypeElement.addEventListener("change", e => {
        this.mimeType = e.target.value;
      });
    } else {
      console.error("DOM element with id #mime is not found!");
    }

    if (this.saveElement) {
      this.saveElement.addEventListener("click", e => {
        e.preventDefault();

        let snapshot;

        if (this.mimeType === "image/gif") {
          /* eslint-disable no-undef */

          const gif = new GIF({
            workers: 2,
            quality: 10
          });

          gif.addFrame(this.canvasElement, { delay: 200 });

          gif.on("finished", blob => {
            const reader = new FileReader();

            reader.onload = () => {
              snapshot = reader.result;

              const markup = this.getSnapshotMarkup(snapshot);

              document
                .querySelector(".app__results .row")
                .insertAdjacentHTML("beforeend", markup);
            };

            reader.readAsDataURL(blob);
          });

          gif.render();
        } else {
          snapshot = this.canvasElement.toDataURL(this.mimeType);

          const markup = this.getSnapshotMarkup(snapshot);

          document
            .querySelector(".app__results .row")
            .insertAdjacentHTML("beforeend", markup);
        }
      });
    } else {
      console.error("DOM element with id #save is not found!");
    }

    document.addEventListener("click", e => {
      if (e.target.className.includes("btn-danger")) {
        e.target
          .closest(".col-md-4")
          .parentNode.removeChild(e.target.closest(".col-md-4"));
      }
    });
  }

  getSnapshotMarkup(snapshot) {
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
