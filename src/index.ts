import * as env from 'dotenv';

const URL = 'https://contoso.sharepoint.com';

export function config(build: any) {
    let customCdnTask = build.subTask('custom-cdn', (gulp: any, buildOptions: any, done: (failure?: Object) => void) => {
        if (buildOptions && buildOptions.args && buildOptions.properties && buildOptions.uniqueTasks) {
            env.config();
            let replacer = buildOptions.args['target-cdn'];
            if (!replacer) {
                replacer = process.env.TargetCdn;
                if (!replacer) {
                    build.warn('[spfx-build-url-rewrite] No substitions found as argument or in environment variables!');
                }
            }

            if (replacer) {
                // Update externals
                build.verbose(`[spfx-build-url-rewrite] Rewriting ${URL} to ${replacer}.`);
                for (const key in buildOptions.properties.externals) {
                    if (buildOptions.properties.externals.hasOwnProperty(key)) {
                        var external = buildOptions.properties.externals[key];
                        if (external.path) {
                            external.path = external.path.replace(URL, replacer);
                        } else {
                            buildOptions.properties.externals[key] = external.replace(URL, replacer);
                        }
                    }
                }
                // Update cdnBasePath
                const writeManifestTask: any = buildOptions.uniqueTasks.find((x: any) => { return x.name == 'write-manifests' });
                if (writeManifestTask && writeManifestTask.taskConfig) {
                    if (writeManifestTask.taskConfig && writeManifestTask.taskConfig.cdnBasePath) {
                        writeManifestTask.taskConfig.cdnBasePath = writeManifestTask.taskConfig.cdnBasePath.replace(URL, replacer);
                    }
                }
            }
        }
        done();
    });
    build.rig.addPostBuildTask(customCdnTask);
}
