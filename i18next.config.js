const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

module.exports = {
  options: {
    debug: true,
    removeUnusedKeys: false,
    func: {
      list: ['i18next.t', 't', 'this.t', 'this.props.t'],
      extensions: ['.js', '.jsx']
    },
    trans: {
      extensions: ['.js', '.jsx'],
      fallbackKey: (ns, value) => value
    },
    lngs: ['vi_VN', 'en_US'],
    ns: [
      'translations'
      // 'locale',
      // 'resource'
    ],
    defaultNs: 'translations',
    defaultValue: function(lng, ns, key) {
      let s = key.replace('_', ' ').toLowerCase();
      return s && s[0].toUpperCase() + s.slice(1);
    },
    resource: {
      loadPath: path.join(__dirname, '/src/assets/locales/{{lng}}/{{ns}}.json'),
      savePath: path.join(__dirname, '/src/assets/locales/{{lng}}/{{ns}}.json')
    },
    nsSeparator: ':', // namespace separator
    keySeparator: '.', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(
      content,
      { list: ['i18next._', 'i18next.__'] },
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false
          })
        );
        ++count;
      }
    );

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative)
        )}`
      );
    }

    done();
  }
};
