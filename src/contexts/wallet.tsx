import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo, useContext } from 'react';

const WalletContext = React.createContext<{
    network: string;
}>({
    network: '',
});

export const getWalletAdapters = (network:any) => {
    return [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({network}),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolletWalletAdapter({ network }),
        new SolletExtensionWalletAdapter({ network }),
    ]
}

export function NewWalletProvider({children = null as any}) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => {
            return getWalletAdapters(network)
        },
        [network]
    );

    return (
        <WalletContext.Provider value={{
            network
        }}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>{children}</WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </WalletContext.Provider>
    );
}

export function useWalletProvider(){
    const {network} = useContext(WalletContext);
    return {network};
}