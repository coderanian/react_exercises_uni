import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import QuoteGenerator from "./QuoteGenerator";
import AppNavbar from "./AppNavbar";
import MarkdownPreviewer from "./MarkdownPreviewer";
import DrumMachine from "./DrumMachine";
import Calculator from "./Calculator";
import Timer from "./Timer";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * Generate random pastel color in hsla coding to pass as background color for components
 * @returns {string} css-ready hsla format
 */
function randomColorBg(){
    return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes >
            <Route path="/" element={<AppNavbar />}>
                <Route index element={<Home bgColor={randomColorBg()} />}/>
                <Route path="QuoteGenerator" element={<QuoteGenerator bgColor={randomColorBg()} />}/>
                <Route path="MarkdownPreviewer" element={<MarkdownPreviewer bgColor={randomColorBg()} />}/>
                <Route path="DrumMachine" element={<DrumMachine  bgColor={randomColorBg()} />}/>
                <Route path="Calculator" element={<Calculator  bgColor={randomColorBg()} />}/>
                <Route path="Timer" element={<Timer  bgColor={randomColorBg()} />}/>
            </Route>
        </Routes>
    </BrowserRouter>
);

