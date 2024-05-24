import path from 'path';
import webpack from 'webpack';
import {BuildMode, BuildPaths, buildWebpack} from '@packages/config'
import packageJson from './package.json'

interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    SHOP_REMOTE_URL?: string
    ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }
    const AUTH_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3001'
    const STORE_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3002'

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
            auth: `auth@${AUTH_REMOTE_URL}/remoteEntry.js`,
            store: `store@${STORE_REMOTE_URL}/remoteEntry.js`,
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                // requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                // requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config;
}

