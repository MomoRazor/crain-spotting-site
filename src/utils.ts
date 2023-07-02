import { Language } from './components';

export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const getErrorMsg = (
    selectedLanguage?: Language,
    englishText?: string,
    malteseText?: string
) => {
    if (selectedLanguage === 'EN') {
        return englishText || 'Required';
    } else if (selectedLanguage === 'MT') {
        return malteseText || 'Insejt din';
    } else {
        return '';
    }
};
