import { useDrawerContext } from '../../context/drawer-context';
import LoginForm from '../features/login/login-form';
import MemoDetails from '../features/memo/memo-details';
import DrawerSide from './drawer-side';

export default function Drawer() {
  const { drawerOpen, setDrawerOpen } = useDrawerContext();

  return (
    <main className={`drawer w-screen overflow-y-hidden`}>
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={() => setDrawerOpen(!drawerOpen)}
      />
      <div className="drawer-content w-full flex flex-col bg-white h-screen">
        <nav className="z-10 navbar bg-base-300 w-full min-h-32">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Memo App</div>
          <LoginForm />
        </nav>
        <MemoDetails />
      </div>
      <DrawerSide />
    </main>
  );
}
