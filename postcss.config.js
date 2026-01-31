import globalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import postcssCustomMedia from "postcss-custom-media";
import postcssFor from "postcss-for";

export default {
  plugins: [
    postcssImport(),
    globalData({
      files: [
         "./src/app/styles/mq.pcss",
         "./src/app/styles/mixins.pcss"
      ]
    }),
    postcssFor(),
    postcssCustomMedia(),
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": false,
        "custom-properties": true,
        "mixins": true
      }
    }),
    postcssNested()
  ]
}
