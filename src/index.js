import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Posts from './components/Posts/Posts';
import SinglePage from './components/SinglePost/SinglePost';
import CreatePost from './components/CreatePost/CreatePost';
import EditPost from './components/EditPost/EditPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Posts />,
        path: "/posts",
        index: true,
      },
      {
        path: "posts/:postId",
        element: <SinglePage />,
      },
      {
        path: "posts/create-post/",
        element: <CreatePost />
      },
      {
        path: `posts/:postId/edit-post/`,
        element: <EditPost />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
