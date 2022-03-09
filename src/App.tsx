import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';
import { NewWalletProvider } from './contexts/wallet';
import Content from './components/Content';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <NewWalletProvider>
            <WalletMultiButton />
                <Content />
            <WalletDisconnectButton />
        </NewWalletProvider>
    );
};
export default App;