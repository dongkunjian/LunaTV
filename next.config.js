/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */

const nextConfig = {
  // 核心：静态导出，必生成 out 文件夹
  output: 'export',
  // 静态站点必须关闭 trailingSlash 兼容
  trailingSlash: true,

  eslint: {
    dirs: ['src'],
    // 忽略 ESLint 错误，继续构建
    ignoreDuringBuilds: true,
  },

  reactStrictMode: false,
  swcMinify: false,

  // 完全关闭所有服务端功能
  experimental: {
    instrumentationHook: false,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },

  // 关闭所有服务端依赖
  webpack(config) {
    config.resolve.fallback = {
      net: false,
      tls: false,
      crypto: false,
      fs: false,
      path: false,
    };
    return config;
  },
};

// 静态导出模式下，完全禁用 PWA 避免冲突
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: true, // 👈 强制关闭PWA，解决构建中断
  register: false,
  skipWaiting: false,
});

module.exports = withPWA(nextConfig);
