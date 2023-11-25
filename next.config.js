const copyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        config.plugins.push(
            new copyWebpackPlugin({
                patterns: [
                    {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
                        to: 'static/chunks',
                    },
                    {
                        from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
                        to: 'static/chunks',
                    },
                    {
                        from: "./model/*.onnx",
                        to: "static/chunks",
                    }
                ],
            })
        )
        return config;
    }
}

module.exports = nextConfig
