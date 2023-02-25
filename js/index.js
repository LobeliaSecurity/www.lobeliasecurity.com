(async () => {
  let values = {};
  let oDict = {
    "#wave > .bg-wave:not(#dummy1)": async (e) => {
      anime({
        targets: e,
        height: "30vh",
        duration: 1000,
        easing: "easeInOutExpo",
      });
    },
    "[set]": async (e) => {
      e.textContent = values[e.attributes.set.value];
    },
    "#menuControll": async (e) => {
      let active = document.querySelector("active");
      let animate = async () => {
        let move_to_elm = document.querySelector(
          `[value="${e.value}"][setValueOnClick="#menuControll"]`
        );
        await anime({
          targets: active,
          scale: 0.2,
          duration: 500,
          easing: "easeInExpo",
        });
        await anime({
          targets: active,
          left: move_to_elm.getBoundingClientRect().left - 25,
          duration: 500,
          easing: "easeOutBounce",
        });
        await anime({
          targets: active,
          scale: 1,
          duration: 300,
          easing: "easeInExpo",
        });
      };
      e.addEventListener("change", (event) => {
        animate();
      });
      window.addEventListener("resize", (event) => {
        animate();
      });
    },
    "[showWhenSome]": async (e) => {
      let target = document.querySelector(e.attributes["showWhenSome"].value);
      let values = JSON.parse(e.attributes["showWhenSome-values"].value).map(
        (_) => {
          return `${_}`;
        }
      );

      target.addEventListener("change", async (event) => {
        if (values.includes(`${target.value}`)) {
          await anime({
            targets: e,
            opacity: 1,
            duration: 200,
            easing: "linear",
          });
          e.removeAttribute("hide");
        } else {
          await anime({
            targets: e,
            opacity: 0,
            duration: 200,
            easing: "linear",
          });
          e.setAttribute("hide", "");
        }
      });
      target.dispatchEvent(new Event("change"));
    },
    "[setValueOnClick]": async (e) => {
      let target = document.querySelector(
        e.attributes["setValueOnClick"].value
      );
      e.addEventListener("click", (event) => {
        target.value = e.attributes.value.value;
        target.attributes.value.value = e.attributes.value.value;
        target.dispatchEvent(new Event("change"));
      });
    },
    body: async (e) => {
      await Promise.all(
        [...document.querySelectorAll("[async-src]")].map((_) => {
          return new Promise((resolve, reject) => {
            _.src = _.attributes["async-src"].value;
            _.addEventListener("load", async (event) => {
              resolve();
            });
          });
        })
      );
    },
    "#wave > .bg-wave:not(#dummy2)": async (e) => {
      await anime({
        targets: e,
        height: "120vh",
        duration: 2000,
        easing: "easeInExpo",
      });
    },
    "#loading [async-src='/media/logo.png']": async (e) => {
      await anime({
        targets: e,
        opacity: 1,
        duration: 2000,
        easing: "easeOutExpo",
      });
    },
    "#loading": async (e) => {
      anime({
        targets: e,
        opacity: 0,
        duration: 1000,
        easing: "linear",
      });
      await anime({
        targets: document.querySelector("#view"),
        opacity: 1,
        duration: 1000,
        easing: "linear",
      });
      e.remove();
    },
  };
  let queryWalker = new QueryWalker(oDict, document);
  await queryWalker.do();
})();
