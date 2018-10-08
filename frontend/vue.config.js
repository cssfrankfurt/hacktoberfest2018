module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/variables.sass";'
      }
    },
    sourceMap: true
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: true,
        changeHost: true
      }
    }
  }
};
