// index.js or your entry point file
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './App';
import {Provider} from "react-redux";
import store from "./redux/Store";
import {SessionWrapper} from "./redux/Reducers/AuthReducer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <SessionWrapper>
                <ToastContainer
                    pauseOnFocusLoss={false}

                />
                <AppRouter/>
            </SessionWrapper>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
