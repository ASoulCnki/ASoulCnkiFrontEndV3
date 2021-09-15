module.exports = {
  extends: ["stylelint-config-standard"],
  ignoreFiles : [
    "dist/**/*.css"
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "windicss",
          "apply",
          "variants",
          "responsive",
          "screen"
        ]
      }
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null
  }
}