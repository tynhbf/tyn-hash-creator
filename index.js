/**
 * Hash Creator Within PHP function on NodeJS application to promise.
 * @package tyn-hash-creator
 * @version 0.0.3
 */

let fs   = require('fs')
let path = require('path')
let cli  = require('./lib/cli.js')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Create exec-php object that contain user php functions.
 * @param {string} file, Path to user php file.
 * @param {string} bin, Path to php bin file.
 * @param {function} callback, Callback function.
 *  @arg {mixed} error message.
 *  @arg {object} methods Collection of user php functions.
 *  @arg {string} printed string on requiring user php file.
 */

exports.phpExec = (file,bin,a,b,c,d) =>{

    if (!bin) {
        bin = 'php'
    }

    let absFile = file
    let tmpPath = process.cwd()
    let tmpParents = Object.values(require.cache)
        .filter(m => {
            if (!m.children || !m.children.length)
                return

            return m.children.includes(module)
        })

    if (tmpParents && tmpParents.length)
        tmpPath = tmpParents[0].path

    absFile = path.resolve(tmpPath, file)

    let cacheName = `{#CACHE#}${absFile}`

    let token = '{#SEPARATOR#}';
    let sc = `include '${absFile}'; echo '${token}'; echo json_encode(get_defined_functions()['user']);`
    let cmd = [bin, `-r "${sc}";`].join(' ')
    let output = null

    return exec(cmd, {cwd: path.dirname(absFile)}).then(sout=> {

        let souts = sout.stdout.split(token)

        output = souts[0]

        let funcs = JSON.parse(souts[1])
        let php = {}
        funcs.forEach(func => {

            php[func] = ((file, bin, func) => {
                return function() {
                    let args = Array.prototype.slice.call(arguments, 0)
                    cli.execute(file, bin, func, args)
                }
            })(absFile, bin, func)
        })

        require.cache[cacheName] = [false, php, output]
        myfunc = php["tynhash"]
        const mypro = util.promisify(myfunc);
        return mypro(a,b,c,d).then(resultm=>{
            return resultm
        })
    })
}