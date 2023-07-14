import { window as vsWindow, type TextEditorDecorationType } from "vscode";

type ColorObject = {
  colorValue: string;
  colorTextEditorDecorationType: TextEditorDecorationType;
};

type ColorMap = Map<RegExp, ColorObject>;

function createColorObject(colorValue: string): ColorObject {
  const commonStyles = {
    contentText: "",
    width: "0.6rem",
    height: "0.6rem",
    margin: "auto 0 auto 4px",
    border: "1px solid DimGray",
  };

  return {
    colorValue,
    // We generate TextEditorDecorationType classes and store them in this map
    // to use the same instance of the decoration throughout the lifetime of
    // the extension. Creating these dynamically on every decorations update
    // is both a performance issue and complex to implement (needs dispose logic).
    // https://github.com/microsoft/vscode-extension-samples/issues/22#issuecomment-321555992
    colorTextEditorDecorationType: vsWindow.createTextEditorDecorationType({
      after: {
        backgroundColor: colorValue,
        ...commonStyles,
      },
    }),
  };
}

export function getColorMap(): ColorMap {
  const map: ColorMap = new Map();

  /***************
   * Surface
   ***************/

  map.set(
    /surface\.background\.level1\.lowContrast/g,
    createColorObject("hsla(220, 30%, 96%, 1)")
  );

  map.set(
    /surface\.background\.level1\.highContrast/g,
    createColorObject("hsla(217, 56%, 17%, 1)")
  );

  map.set(
    /surface\.background\.level2\.lowContrast/g,
    createColorObject("hsla(0, 0%, 100%, 1)")
  );

  map.set(
    /surface\.background\.level2\.highContrast/g,
    createColorObject("hsla(216, 44%, 23%, 1)")
  );

  map.set(
    /surface\.background\.level3\.lowContrast/g,
    createColorObject("hsla(220, 27%, 98%, 1)")
  );

  map.set(
    /surface\.background\.level3\.highContrast/g,
    createColorObject("hsla(216, 33%, 29%, 1)")
  );

  map.set(
    /surface\.border\.normal\.lowContrast/g,
    createColorObject("hsla(216, 15%, 54%, 0.18)")
  );

  map.set(
    /surface\.border\.normal\.highContrast/g,
    createColorObject("hsla(216, 15%, 54%, 0.18)")
  );

  /***************
   * Overlay
   ***************/

  /***************
   * Brand
   ***************/

  /***************
   * Feedback
   ***************/

  /***************
   * Action
   ***************/

  map.set(
    /action\.icon\.link\.default/g,
    createColorObject("hsla(213, 89%, 56%, 1)")
  );

  map.set(
    /action\.icon\.link\.hover/g,
    createColorObject("hsla(218, 89%, 51%, 1)")
  );

  map.set(
    /action\.icon\.link\.focus/g,
    createColorObject("hsla(223, 95%, 48%, 1)")
  );

  map.set(
    /action\.icon\.link\.active/g,
    createColorObject("hsla(223, 95%, 48%, 1)")
  );

  map.set(
    /action\.icon\.link\.disabled/g,
    createColorObject("hsla(218, 19%, 81%, 1)")
  );

  map.set(
    /action\.icon\.link\.visited/g,
    createColorObject("hsla(268, 100%, 79%, 1)")
  );

  /***************
   * Badge
   ***************/

  return map;
}
