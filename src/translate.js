import en from './dictionary/en.json'
import ru from './dictionary/ru.json'

const enData = JSON.stringify(en);
const ruData = JSON.stringify(ru);

const enDictionary = JSON.parse(enData);
const ruDictionary = JSON.parse(ruData);

export { enDictionary, ruDictionary };


/*//import { i18n } from '@lingui/core';
import { resolve, __dirname } from 'path';
import { readFileSync } from 'fs';

const filepath = './dictionary/en.json'
const getFixturePath = resolve(__dirname, filepath);
const enDictionary = readFileSync(getFixturePath(filepath, 'utf-8'));
*/
//const enDictionary = readFileSync(resolve(__dirname, './dictionary/en.json')).toString('utf8');
//const ruDictionary = readFileSync(resolve(__dirname, './dictionary/ru.json')).toString('utf8');

//const readFile = (filepath) => readFileSync(getFixturePath(filepath, 'utf-8'));

/*

function renderPost (results) {
    const templateStr = fs.readFileSync(path.resolve(__dirname, './dictionary/en.json')).toString('utf8')
    const template = Handlebars.compile(templateStr, { noEscape: true })
    const view = Object.assign({
      date: new Date().toISOString(),
      versionSlug: slugify(results.version)
    }, results)
  
    return Object.assign({
      content: template(view)
    }, results)
  }




setLanguage(language) {
    i18next.init({
      lng: language,
      resources: require(`json!./${language}.json`)
    });
  
    this.props.actions.changeLanguage(i18next);
  }





i18n.load('en', {
    how: "How do you want your egg today?",
    choice: "How to choose the egg"
  });
  i18n.load('it', {
    how: "Come vuoi il tuo uovo oggi?",
    choice: "Come scegliere l'uovo"
  });
  i18n.activate('en');
  
  // В компоненте:
  const context = useLingui();
  <div>{context.i18n._('how')}</div>

  
  // Переключение:
  const context = useLingui();
  context.i18.activate('it');
 */


 