const fs = require('fs-extra');
const klawSync = require('klaw-sync');

run();

function run() {
    console.log("Running copy");

    const files = klawSync("node_modules/bwip-js/fonts", {
        nodir: true,
        filter: (file) => new RegExp(/node_modules.bwip-js.fonts.*\.(otf|js|bin)/).test(file.path)
    });
    try {
        files.forEach((file) => {
            if(!!file.path) {
                const parts = file.path.split('\\');
                const fileName = parts[parts.length - 1];
                fs.copySync(file.path, "target/dist/bwipjs-fonts/" + fileName);
            }
        });
    } catch (err) {
        console.log(err);
    }

    const imageFiles = klawSync("www/assets/images", {
        nodir: true,
        filter: (file) => /\.svg$/.test(file.path)
    });
    try {
        imageFiles.forEach((file) => {
            if(!!file.path) {
                const parts = file.path.split('\\');
                const fileName = parts[parts.length - 1];
                fs.copySync(file.path, "target/dist/images/" + fileName);
            }
        });
    }catch (err) {
        console.log(err);
    }
}