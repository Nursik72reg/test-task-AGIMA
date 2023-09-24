import './styles/variables.css'
import './styles/app.css'
import AudioPlayer from "./components/AudioPlayer";

function App() {

    return (
        <div className='app'>
            <div className='app__wrap'>
                <AudioPlayer/>
            </div>
        </div>
    )
}

export default App
