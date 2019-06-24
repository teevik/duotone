module.exports = {
  babel: {
    plugins: ["babel-plugin-styled-components"]
  },
  webpack: {
    configure: {
      output: {
        globalObject : "this"
      }
    }
  }
}
