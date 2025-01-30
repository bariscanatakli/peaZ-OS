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
    const fileSystem = useSelector(state => state.terminals.fileSystem);





    useEffect(() => {
        if (terminalState) {
            setPath({ terminalId: id, path: terminalState.path || '/' });
        }
    }, [terminalState]);



    useEffect(() => {
        const initializeFileSystem = async () => {
            try {
                const fs = await fetchFileSystem();
                if (fs) {
                    dispatch(setFileSystem({ fileSystem: fs }));
                }
            } catch (error) {
                console.error('Error initializing file system:', error);
            }
        };

        initializeFileSystem();
    }, []);

    useEffect(() => {
        const syncFileSystem = async () => {
            if (terminalState?.fileSystem) {
                await saveFileSystem(terminalState.fileSystem);
            }
        };

        syncFileSystem();
    }, [terminalState?.fileSystem]);

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
            {terminalState?.isEditing && (<Editor id={id} />)}
            <Container id={id}>
                <Header id={id} />
                <TerminalComponent id={id} />
            </Container>
        </>
    );
};

export default Terminal;