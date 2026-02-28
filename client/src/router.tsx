import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import Loading from "@/pages/Loading";
import NotFound from "@/pages/NotFound";

// Lazy load all pages
const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Signup = lazy(() => import("@/pages/Auth/Signup"));
const Feed = lazy(() => import("@/pages/Feed"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const PageProfile = lazy(() => import("@/pages/PageProfile"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Saved = lazy(() => import("@/pages/Saved"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const UpdatePassword = lazy(() => import("@/pages/Auth/UpdatePassword"));
const VerifyCode = lazy(() => import("@/pages/Auth/VerifyCode"));

// Routes configuration
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/profile/:userId",
    element: <UserProfile />,
  },
  {
    path: "/page/:pageId",
    element: <PageProfile />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
