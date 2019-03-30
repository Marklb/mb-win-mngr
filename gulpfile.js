// const { exec } = require('gulp')
// const { exec } = require('shelljs')
const { exec } = require('child_process')
const c = require('ansi-colors')
const ansiRegex = require('ansi-regex')

const os = require('os');
const pty = require('node-pty');
// const { fit } = require('xterm/lib/addons/fit/fit')

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// ptyProcess.write('ls\r');
// ptyProcess.resize(100, 40);
// ptyProcess.write('ls\r');

const isNonEmptyArray = (v) => v && v.length > 0

const parseLine = (line)  => {
  const regex1 = /Date: (.*)/gm
  const regex2 = /Hash: (.*)/gm
  const regex3 = /Time: (.*)/gm
  const regex4 = /chunk {(.*)} (.*) \(.*\) (.*) /gm

  const regex5 = /ERROR\s.*/gm

  // const res = regex1.exec(line)
  // console.log(res)

  const res = line.match(regex5)
  console.log(res)
}

const isClearCode = (v) => v === '\u001b[0K'

const findClearRange = (data) => {
  const m = data.match(ansiRegex())

  if (isNonEmptyArray(m)) {
    for (let i = 0; i < m.length; i++) {
      if (isClearCode(m[i])) {
        if (i > 0) {
          return [ data.indexOf(m[i - 1]) +  m[i - 1].length, 0 ]
        }
        return [ 0, 0 ]
      }
    }
  }

  return null
}

const insertStrAt = (str, ins, idx) => {
  return str.slice(0, idx) + ins + str.slice(idx)
}

// const defaultTask = () => {
//   // const child = exec('npm run build:ng-watch', { async: true })
//   // child.stdout.on('data', (data) => {
//   //   console.log('data', c.red('[') + data + c.red(']'))
//   //   parseLine(data)
//   // })

//   const ptyProcess = pty.spawn(shell, ['npm', 'run', 'build:ng-watch'], {
//     name: 'xterm-color',
//     cols: 200,
//     rows: 30,
//     cwd: __dirname,
//     env: process.env
//   });

//   ptyProcess.on('data', function(data) {
//     // console.log(data)
//     const m = data.match(ansiRegex())
//     // console.log(m, m && m.length > 0 ? data.indexOf(0) : '')
//     // console.log(m, m && m.length > 0 ? data.charAt(m[0].length + 1) : '')

//     const r = findClearRange(data)
//     // console.log('r', r)

//     if (r) {
//       // process.stdout.write(insertStrAt(data, '~~', r[0] + r[1]))
//       console.log('r', r, m)
//       console.log(insertStrAt(data, '~~', r[0] + r[1] + 1))
//     } else {
//       // process.stdout.write(data)
//       console.log(data)
//     }


//     // let idxStr = ''
//     // for (let i = 0; i < m.length; i++) { idxStr += data.indexOf(m[i]) + ' ' }
//     // console.log(m, idxStr)
//     // console.log(typeof data)



//     // process.stdout.write(c.blue('--'))
//     // process.stdout.write(data)
//     // if (data.indexOf('\%') !== -1) {
//     //   let s = ''
//     //   for (let i = 0; i < Math.min(10, data.length); i++) {
//     //     // process.stdout.write(data.charCodeAt(i) + ' ')
//     //     s += data.charCodeAt(i) + ' '
//     //   }
//     //   console.log(s)
//     // }
//     // parseLine(data)

//     // console.log(c.red('-----------'))
//     // console.log(c.red('--[') + data + c.blue(']--'))
//     // console.log(c.blue('-----------'))
//   });
// }

const defaultTask = () => {
  // const child = exec('npm run build:ng-watch', { async: true })
  // child.stdout.on('data', (data) => {
  //   console.log('data', c.red('[') + data + c.red(']'))
  //   parseLine(data)
  // })

  const ptyProcess = pty.spawn(shell, ['npm', 'run', 'build:ng-watch'], {
    name: 'xterm-color',
    cols: 200,
    rows: 30,
    cwd: `${__dirname}/src/extensions`,
    env: process.env
  });

  ptyProcess.on('data', function(data) {
    // console.log(data)
    const m = data.match(ansiRegex())
    // console.log(m, m && m.length > 0 ? data.indexOf(0) : '')
    // console.log(m, m && m.length > 0 ? data.charAt(m[0].length + 1) : '')

    const r = findClearRange(data)
    // console.log('r', r)

    if (r) {
      // process.stdout.write(insertStrAt(data, '~~', r[0] + r[1]))
      console.log('r', r, m)
      console.log(insertStrAt(data, '~~', r[0] + r[1] + 1))
    } else {
      // process.stdout.write(data)
      console.log(data)
    }


    // let idxStr = ''
    // for (let i = 0; i < m.length; i++) { idxStr += data.indexOf(m[i]) + ' ' }
    // console.log(m, idxStr)
    // console.log(typeof data)



    // process.stdout.write(c.blue('--'))
    // process.stdout.write(data)
    // if (data.indexOf('\%') !== -1) {
    //   let s = ''
    //   for (let i = 0; i < Math.min(10, data.length); i++) {
    //     // process.stdout.write(data.charCodeAt(i) + ' ')
    //     s += data.charCodeAt(i) + ' '
    //   }
    //   console.log(s)
    // }
    // parseLine(data)

    // console.log(c.red('-----------'))
    // console.log(c.red('--[') + data + c.blue(']--'))
    // console.log(c.blue('-----------'))
  });
}

exports.default = defaultTask
