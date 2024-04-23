import AppNavigation from "./navigations/AppNavigation";
import { AuthProvider } from "./hooks/AuthContext";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNavigation></AppNavigation>
      </AuthProvider>
    </Provider>
  );
}
