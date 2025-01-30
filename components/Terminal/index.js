import React, { useEffect } from 'react';
import Editor from '../Editor';
import { fetchFileSystem, saveFileSystem } from '../../firebase/utils/fireStoreOperations';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import Container from './components/Container';
import Header from './components/Header';
import TerminalComponent from './components/Terminal';
import { useDispatch, useSelector } from 'react-redux';
import {
    addOutput,
    setRole,
    setUid,
    setFileSystem,
    setPath,
} from '../../store/slices';
const Terminal = ({
    id,
}) => {
    const dispatch = useDispatch();
    const terminalState = useSelector(state => state.terminals.terminals.find(t => t.id === id));
    const { isEditing, fileSystem, path } = terminalState;





    useEffect(() => {
        if (terminalState) {
            setPath({ terminalId: id, path: path || '/' });
        }
    }, [terminalState]);



    useEffect(() => {
        const initFS = async () => {
            try {
                const fs = await fetchFileSystem();
                if (!fs) {
                    const defaultFS = {
                        '~': {
                            type: 'dir',
                            content: {
                                'welcome.txt': {
                                    type: 'file',
                                    content: 'Welcome to the terminal!'
                                }
                            }
                        }
                    };
                    dispatch(setFileSystem({ fileSystem: defaultFS }));
                    await saveFileSystem(defaultFS);
                } else {
                    dispatch(setFileSystem({ fileSystem: fs }));
                }
                dispatch(setPath({ terminalId: id, path: '/' }));
            } catch (error) {
                console.error('Error initializing filesystem:', error);
            }
        };
    
        initFS();
    }, []);

    useEffect(() => {
        const syncFileSystem = async () => {
            if (fileSystem) {
                await saveFileSystem(fileSystem);
            }
        };

        syncFileSystem();
    }, [fileSystem]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    await user.getIdToken(true);
                    const token = await user.getIdTokenResult();
                    dispatch(setRole(token.claims.role || 'guest'));
                    dispatch(setUid(user.uid));
                    dispatch(addOutput(`Logged in as ${token.claims.role || 'guest'}.`));
                } catch (error) {
                    dispatch(addOutput('Error refreshing token. Defaulting to guest.'));
                }
            } else {
                dispatch(setUid(null));
                dispatch(setRole('guest'));
                dispatch(addOutput('No user is signed in. Operating as guest.'));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    useEffect(() => {
        if (fileSystem) {
            saveFileSystem(fileSystem);
        }
    }, [fileSystem]);





    return (
        <>
            {isEditing && (<Editor id={id} />)}
            <Container id={id}>
                <Header id={id} />
                <TerminalComponent id={id} />
            </Container>
        </>
    );
};

export default Terminal;