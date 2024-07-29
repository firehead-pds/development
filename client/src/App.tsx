import PublicRoute from "./guards/PublicRoute.tsx";
import Signup from "./pages/public/Signup.tsx";
import ContactUs from "./pages/public/ContactUs.tsx";
import Login from "./pages/public/Login.tsx";
import WelcomePage from "./pages/public/WelcomePage.tsx";
import PageLoader from "./components/UI/PageLoader.tsx";
import ProtectedRoute from "./guards/ProtectedRoute.tsx";
import Dashboard from "./pages/app/dashboard/Dashboard.tsx";
import MembershipProtectedRoute from "./guards/MembershipProtectedRoute.tsx";
import Wing from "./pages/app/wing-index/Wing.tsx";
import Friendship from "./pages/app/friends/Friends.tsx";
import JoinWing from "./pages/app/invite-code/JoinWing.tsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {useAppDispatch} from "./app/hook.ts";
import {logOut, setCredentials} from "./features/auth/authSlice.ts";
import {useLazyRefreshQuery} from "./features/auth/authApiSlice.ts";
import {useEffect, useState} from "react";
import WingsGridsIndex from "./pages/app/wing-grid/WingsGridsIndex.tsx";
import CreateWingGrid from "./pages/app/wing-grid/CreateWingGrid.tsx";
import WingGrid from "./pages/app/wing-grid/WingGrid.tsx";

export default function App() {
    const dispatch = useAppDispatch();
    const [refresh, {isLoading}] = useLazyRefreshQuery();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
            const tryRefresh = async () => {
                try {
                    const data = await refresh().unwrap();
                    dispatch(setCredentials(data));
                } catch (e) {
                    dispatch(logOut());
                } finally {
                    setIsInitializing(false);
                }
            };

            tryRefresh().then();
        }, [dispatch]
    );
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PublicRoute/>,
            children: [
                {
                    path: "/",
                    element: <WelcomePage/>,
                },
                {
                    path: "/signup",
                    element: <Signup/>,
                },
                {
                    path: "/contact-us",
                    element: <ContactUs/>,
                },
                {
                    path: "/login",
                    element: <Login/>,
                },
            ],
        },
        {
            path: "/app",
            element: <ProtectedRoute/>,
            children: [
                {
                    path: "",
                    element: <Navigate to={"dashboard"}/>,
                },
                {
                    path: "dashboard",
                    element: <Dashboard/>,
                },
                {
                    path: "wing/:wingId",
                    element: <MembershipProtectedRoute/>,
                    children: [
                        {
                            path: "",
                            element: <Wing/>,
                        },
                        {
                            path: "friends",
                            element: <Friendship/>,
                        },
                        {
                            path: "grids",
                            element: <WingsGridsIndex/>,
                        },
                        {
                            path: "grids/create",
                            element: <CreateWingGrid/>,
                        },
                        {
                            path: "grids/:gridId",
                            element: <WingGrid/>,
                        },
                    ],
                },
                {
                    path: "join-wing/:token",
                    element: <JoinWing/>,
                },
            ],
        },
    ]);

    if (isLoading || isInitializing) {
        return <PageLoader/>;
    }

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}
