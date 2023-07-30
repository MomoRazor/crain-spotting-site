import { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { IStyleProps, LinkerProps, useAccess, Typography, useThemeSx } from '@sector-eleven-ltd/cosmos-core'

interface StyledLinkProps extends IStyleProps {}

const StyledLink = styled(Link)<StyledLinkProps>(({ sx }) => ({
    textDecoration: 'none',
    color: 'inherit',
    boxSizing: 'border-box',
    ...sx
}))

export const Linker: FunctionComponent<LinkerProps> = ({ children, newTab, to, sx, ...props }) => {
    const { allowed } = useAccess()

    const renderChildren = () =>
        typeof children === 'string' ? (
            <Typography sx={allowed ? { color: 'primary' } : undefined}>{children}</Typography>
        ) : (
            <>{children}</>
        )

    const themedSx = useThemeSx(sx)

    return allowed ? (
        <StyledLink {...props} href={to} target={newTab ? '_blank' : undefined} sx={themedSx}>
            {renderChildren()}
        </StyledLink>
    ) : (
        <>{renderChildren()}</>
    )
}
