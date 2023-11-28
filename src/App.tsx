import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

import PostsPage from "./pages/PostsPage";
import PostDetails from "./pages/PostDetails";
import AppLayout from "./ui/AppLayout";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AllUsersPage from "./pages/AllUsersPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import EditUserPage from "./pages/EditUserPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <UserContext> */}
      <Toaster />
      <ReactQueryDevtools />
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/users" element={<AllUsersPage />} />
              <Route path="/post/:postId" element={<PostDetails />} />
              <Route path="/createPost" element={<CreatePostPage />} />
              <Route path="/editPost/:postId" element={<EditPostPage />} />
              <Route path="/account/:accountId" element={<AccountPage />} />
              <Route path="/edit/user/:editId" element={<EditUserPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
      {/* </UserContext> */}
    </QueryClientProvider>
  );
}
