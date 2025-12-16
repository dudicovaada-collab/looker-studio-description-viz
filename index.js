looker.plugins.visualizations.add({
  id: "knob_bubble_annotation",

  create(element) {
    element.innerHTML = `
      <div id="container">
        <div id="knob"></div>
        <div id="bubble"></div>
      </div>
    `;

    this.container = element.querySelector("#container");
    this.knob = element.querySelector("#knob");
    this.bubble = element.querySelector("#bubble");

    this.knob.addEventListener("mouseenter", () => {
      if (this.visibility === "hover") {
        this.bubble.style.display = "block";
      }
    });

    this.knob.addEventListener("mouseleave", () => {
      if (this.visibility === "hover") {
        this.bubble.style.display = "none";
      }
    });
  },

  updateAsync(data, element, config, queryResponse, details, done) {
    // Knob
    this.knob.textContent = config.knob.icon;
    this.knob.style.fontFamily = config.knob.fontFamily;
    this.knob.style.fontSize = `${config.knob.fontSize}px`;
    this.knob.style.color = config.knob.fontColor;
    this.knob.style.backgroundColor = config.knob.backgroundColor;
    this.knob.style.borderRadius = `${config.knob.borderRadius}px`;
    this.knob.style.width = "32px";
    this.knob.style.height = "32px";
    this.knob.style.display = "flex";
    this.knob.style.alignItems = "center";
    this.knob.style.justifyContent = "center";
    this.knob.style.cursor = "pointer";
    this.knob.style.position = "absolute";

    // Bubble
    this.bubble.textContent = config.bubble.text;
    this.bubble.style.fontFamily = config.bubble.fontFamily;
    this.bubble.style.fontSize = `${config.bubble.fontSize}px`;
    this.bubble.style.color = config.bubble.fontColor;
    this.bubble.style.backgroundColor = config.bubble.backgroundColor;
    this.bubble.style.borderRadius = `${config.bubble.borderRadius}px`;
    this.bubble.style.padding = `${config.bubble.padding}px`;
    this.bubble.style.position = "absolute";
    this.bubble.style.maxWidth = "250px";
    this.bubble.style.zIndex = "10";

    // Position
    const map = {
      "top-left": { knob: { top: 0, left: 0 }, bubble: { top: 0, left: 40 } },
      "top-right": { knob: { top: 0, right: 0 }, bubble: { top: 0, right: 40 } },
      "bottom-left": { knob: { bottom: 0, left: 0 }, bubble: { bottom: 0, left: 40 } },
      "bottom-right": { knob: { bottom: 0, right: 0 }, bubble: { bottom: 0, right: 40 } }
    };

    Object.assign(this.knob.style, map[config.behavior.position].knob);
    Object.assign(this.bubble.style, map[config.behavior.position].bubble);

    // Visibility
    this.visibility = config.behavior.visibility;
    this.bubble.style.display =
      this.visibility === "always" ? "block" : "none";

    done();
  }
});
