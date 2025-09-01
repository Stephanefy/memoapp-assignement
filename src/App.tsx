import Drawer from './components/common/drawer';
import { MemoContextProvider } from './context/memo-context';
import { AuthContextProvider } from './context/auth-context';
import { DrawerContextProvider } from './context/drawer-context';

function App() {
  return (
    <AuthContextProvider>
      <DrawerContextProvider>
        <MemoContextProvider>
          <Drawer />
        </MemoContextProvider>
      </DrawerContextProvider>
    </AuthContextProvider>
  );
}

export default App;
