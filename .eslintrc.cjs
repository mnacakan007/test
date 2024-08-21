module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.tsx', '.ts']}],
    'react/self-closing-comp': ['warn', {component: true, html: true}],
    'sort-imports': ['error', {ignoreDeclarationSort: true}],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    "import/order": [
      "off",
      {
        "groups":
          [
            "external",
            "builtin",
            "internal",
            "sibling",
            "parent",
            "index"
          ]
      }
    ],
    "import/no-unused-modules": "off",
    "import/no-named-as-default": "off",
    "indent": [
      "error",
      "tab",
      {"SwitchCase": 1}
    ],
    "linebreak-style": "off",
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-mixed-spaces-and-tabs": "error",
    "@typescript-eslint/no-unused-vars": ["warn", {
      args: "after-used",
      ignoreRestSiblings: false
    }],

    "vars-on-top": "warn",
    "default-case": "warn",
    "require-await": "warn",
    "eol-last": "off",

    "react/no-unknown-property": "off",
    "react/jsx-key": "error",
    "no-inner-declarations": "warn",
    "no-constant-condition": "warn",
    "no-empty": "error",
    "no-case-declarations": "off",
    "no-void": "off",
    "no-duplicate-imports": "error",
    "keyword-spacing": "error",

    "no-unused-expressions": [
      "warn",
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": [
      "error",
      {
        "align": "colon"
      }
    ],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never"
    }],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/key-spacing": [
      "error",
      {
        "align": "colon"
      }
    ],
    "no-multiple-empty-lines": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-multiple-empty-lines": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ]
  },
};
