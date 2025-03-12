import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import SiteHeader from '../components/SiteHeader'
import App from "../components/App.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div>
            <SiteHeader/>
        </div>
        <div>
            <App/>
        </div>
    </StrictMode>,
)
