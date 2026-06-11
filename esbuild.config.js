const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: {
      'post-confirmation/index': 'src/post-confirmation/index.ts',
      'pre-token/index': 'src/pre-token/index.ts',
    },
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'node24',
    platform: 'node',
    external: ['@aws-sdk/*'],
    outdir: '.build',
  })
  .catch(() => process.exit(1));
