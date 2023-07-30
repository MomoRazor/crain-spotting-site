import { AppProps } from 'next/app'
import { AppProvider } from '@sector-eleven-ltd/cosmos-core'
import { useRouter } from 'next/router'
import { FirebaseAuthProvider } from '@/components'
import { Linker } from '@/components/Linker'
import { ApiProvider } from '@/components/api/ApiProvider'

const MyApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter()

    return (
        <ApiProvider>
            <AppProvider
                path={{
                    linker: Linker,
                    path: router.asPath
                }}
                theme={{
                    setup: customThemeSetup
                }}
            >
                <FirebaseAuthProvider
                    loggedOutEndpoints={['/', '/forgot-password']}
                    skipRehydrateEndpoints={['/', '/no-user', '/logout', '/forgot-password']}
                >
                    <SidebarPage hideSidebarIn={['/', '/no-user', '/logout', '/forgot-password']}>
                        <Component {...pageProps} />
                    </SidebarPage>
                </FirebaseAuthProvider>
            </AppProvider>
        </ApiProvider>
    )
}

export default MyApp
