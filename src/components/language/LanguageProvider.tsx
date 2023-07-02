import { ReactNode, createContext, useContext, useState } from 'react';

export type Language  = 'MT' | 'EN'

interface ILanguageContextConfig {
    selectedLanguage?: Language;
    setSelectedLanguage?: (newLanguage: Language) => void;
}

interface ILanguageContext extends ILanguageContextConfig {}

const defaultLanguageContext: ILanguageContext = {
    selectedLanguage: 'MT'
};

const LanguageContext = createContext<ILanguageContext>(defaultLanguageContext);


export interface ILanguageProvider {
    children: ReactNode;
}

export const LanguageProvider = (props: ILanguageProvider) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('MT');

    return (
        <LanguageContext.Provider
            value={{
                selectedLanguage,
                setSelectedLanguage
            }}
        >
            {props.children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
	const ctx = useContext(LanguageContext)

	if (!ctx) {
		throw new Error("Language context not found! Check your App")
	}

	return ctx
}
