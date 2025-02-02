import '@/styles/globals.css';
import '@/styles/Taskbar.css';
import '@/styles/Terminal.css';
import '@/styles/StartButton.css';
import '@/styles/ContextMenu.css';
import "@/styles/TerminalInfo.css";
import '@/styles/StartMenu.css';
import '@/styles/Editor.css';
import '@/styles/HelpGuide.css';
import "@/styles/Homepage.css";

import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;