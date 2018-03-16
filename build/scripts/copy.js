const fs = require('fs-extra');
const klawSync = require('klaw-sync')

run();

function run() {
    console.log("Running copy");

    const files = klawSync('./node_modules/bwip-js/fonts', {nodir: true});
    try {
        files.forEach((file) => {
            if(!!file.path) {
                const parts = file.path.split('\\');
                const fileName = parts[parts.length - 1];
                fs.copySync(file.path, './target/dist/bwipjs-fonts/' + fileName);
            }
        });
    } catch (err) {
        console.log(err);
    }
}