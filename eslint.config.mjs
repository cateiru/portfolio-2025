import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Biomeが処理するため、フォーマット関連のルールを無効化
      indent: "off",
      quotes: "off",
      semi: "off",
      "comma-dangle": "off",
      "max-len": "off",
      "object-curly-spacing": "off",
      "array-bracket-spacing": "off",
      "space-before-function-paren": "off",
      "keyword-spacing": "off",
      "space-infix-ops": "off",
      "eol-last": "off",
      "no-trailing-spaces": "off",
      "space-before-blocks": "off",
      "key-spacing": "off",
      "comma-spacing": "off",
      "no-multi-spaces": "off",
      "padded-blocks": "off",
      "arrow-spacing": "off",
      "block-spacing": "off",
      "func-call-spacing": "off",
      "space-in-parens": "off",
      "no-multiple-empty-lines": "off",
      "brace-style": "off",

      // Biomeが処理するため、基本的なルールを無効化
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off",
      "prefer-const": "off",
      "no-var": "off",
      "no-console": "off",
    },
  },
]

export default eslintConfig
