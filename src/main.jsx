import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {createRoot} from 'react-dom/client'
import './css/index.css'
import App from "../components/App.jsx";

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <App/>
    // {/*</StrictMode>,*/}
)
