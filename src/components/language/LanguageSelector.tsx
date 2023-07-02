
import styled from '@emotion/styled/types';
import { useLanguage } from './LanguageProvider';
import { Typography } from '@sector-eleven-ltd/cosmos-core';

const StyledLanguageSelector = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

export const LanguageSelector = () => {
    const ctx = useLanguage();

    return (
        <StyledLanguageSelector
            onClick={() => {
                if (ctx.setSelectedLanguage) {
                    if (ctx.selectedLanguage === 'EN') {
                        ctx.setSelectedLanguage('MT');
                    } else {
                        ctx.setSelectedLanguage('EN');
                    }
                } else {
                    console.error('Context not found!');
                }
            }}
        >
            {ctx.selectedLanguage === 'EN' ? (
                <>
                    <Typography>MT</Typography>
                    <Typography sx={{textDecoration: 'underline'}}>EN</Typography>
                </>
            ) : (
                <>
                    <Typography sx={{textDecoration: 'underline'}}>MT</Typography>
                    <Typography>EN</Typography>
                </>
            )}
        </StyledLanguageSelector>
    );
};
