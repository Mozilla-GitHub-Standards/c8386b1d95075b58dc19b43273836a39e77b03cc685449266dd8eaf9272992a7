/*
 * # Raspberry Pi (we'll treat this as the default)
 * pi@vaani:~ $ uname -a
 * Linux vaani 4.4.13-v7+ #894 SMP Mon Jun 13 13:13:27 BST 2016 armv7l GNU/Linux
 *
 * # Edison
 * root@vaani2:~# uname -a
 * Linux vaani2 3.10.17-yocto-standard #1 SMP PREEMPT Thu May 19 17:09:53 PDT 2016 i686 GNU/Linux
 *
 * We can check if this was a yocto image built using the Vaani metadata
 * by grepping the contents of /etc/build for 'meta-vaani'.
 */

var child_process = require('child_process');
var uname = child_process.execFileSync('uname', ['-a'], { encoding: 'utf8' });

var platform = require('./platforms/default.js');
var override;

try {
  child_process.execFileSync('grep', ['meta-vaani', '/etc/build']);
  override = require('./platforms/Vaani.js');
} catch(e) {
  if (uname.includes('yocto')) {
    override = require('./platforms/EdisonYocto.js');
  }
}

if (override) {
  for(var p in override) {
    platform[p] = override[p];
  }
}

module.exports = platform;
