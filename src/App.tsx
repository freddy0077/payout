import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Auth/Login";
import PayoutWizard from "./containers/PayoutWizard";
import TicketWinners from "./containers/TicketWinners";
import MessagePage from "./containers/MessagePage";
import OTPForm from "./components/Auth/OTPForm";
import ChangePasswordForm from "./components/Auth/ChangePasswordForm";
import ChangePassword from "./components/Auth/ChangePassword";
import Start from "./components/Start";

function App() {
    return (
        <div className="flex flex-col w-full justify-center items-center h-screen ">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<OTPForm />} />
                    {/*<Route path="/change-password" element={<ChangePassword />} />*/}

                    <Route
                        path="/start"
                        element={<PrivateRoute isAuthenticated={false} />}
                    >
                        <Route index element={<Start />} />
                    </Route>

                    <Route
                        path="/wizard"
                        element={<PrivateRoute isAuthenticated={false} />}
                    >
                        <Route index element={<PayoutWizard />} />
                    </Route>


                    <Route
                        path="/change-password"
                        element={<PrivateRoute isAuthenticated={false} />}
                    >
                        <Route index element={<ChangePassword/>} />
                    </Route>

                    {/*<Route*/}
                    {/*    path="/otp"*/}
                    {/*    element={<PrivateRoute isAuthenticated={false} />}*/}
                    {/*>*/}
                    {/*    <Route index element={<OTPForm />} />*/}
                    {/*</Route>*/}

                    <Route
                        path="/ticket"
                        element={<PrivateRoute isAuthenticated={false} />}
                    >
                        <Route index element={<TicketWinners />} />
                    </Route>
                    <Route
                        path="/message"
                        element={<PrivateRoute isAuthenticated={false} />}
                    >
                        <Route index element={<MessagePage />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
