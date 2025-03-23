module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',       // Vue 3 官方推荐规则
    'eslint:recommended',                // ESLint 核心规则
    // '@typescript-eslint/recommended',    // TypeScript 推荐规则
    '@vue/eslint-config-typescript',     // Vue 官方 TypeScript 集成
    'plugin:prettier/recommended'        // Prettier 集成（必须放在最后）
  ],
  parser: 'vue-eslint-parser',           // Vue 单文件组件解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', // TypeScript 解析器
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // TypeScript 规则
    '@typescript-eslint/no-explicit-any': 'off',      // 允许使用 any 类型
    '@typescript-eslint/no-unused-vars': 'warn',      // 未使用变量警告
    
    // Vue 规则
    'vue/multi-word-component-names': 'off',         // 允许单单词组件名
    'vue/html-self-closing': [                       // 自动闭合标签
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' },
        svg: 'always',
        math: 'always'
      }
    ],
    
    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'quotes': ['error', 'single'],                    // 强制单引号
    'semi': ['error', 'never']                        // 禁止分号
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off', // 禁用 ESLint 的缩进检查（由 Prettier 处理）
      }
    }
  ]
}