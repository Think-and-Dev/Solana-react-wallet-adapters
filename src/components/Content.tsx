/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletProvider } from '../contexts/wallet';

const Content: FC = () => {
    const connection = useConnection();
    const { publicKey, connected } = useWallet();
    const { network } = useWalletProvider();

    useEffect(() => {
        console.log('-------');
        console.log(publicKey);
        console.log(connected);
        console.log(network);
        console.log(connection);
    },[publicKey]);

    return(
        <div>
            {
                publicKey ? <div style={{'color':'white'}}>
                    CONNECTED!: {publicKey.toString()}
                </div>
                :
                <div style={{'color':'white'}}>
                    YOU ARE NOT CONNECTED
                </div>
            }
        </div>
    )
}

export default Content;