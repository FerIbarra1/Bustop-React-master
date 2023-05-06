import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import es from './es.json'
import en from './en.json'

//en cada modulo debe tenr su propia clase como esta y con share preferences indicaremos cuando se cambie el idioma

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'es',
    resources: {
        es: es,
        en: en
    },
    react: { 
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    }

})

export default i18n