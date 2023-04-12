import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/main/Main";
import Music from "./pages/main/Music";
import MusicResult from "./pages/main/MusicResult";
import Loading from "./pages/main/Loading";
import StartingLetter from "./pages/main/StartingLetter";
import Stretch from "./pages/main/Stretch";

import TestPage from "./testPages/TestPage";
import UploadPage from "./testPages/UploadPage";
import DownloadPage from "./testPages/DownloadPage";
import ViewPhoto from "./testPages/ViewPhoto";
import ViewVideo from "./testPages/ViewVideo";
import AnyPhoto from "./testPages/AnyPhoto";

import ListPhoto from "./testPages/ListPhoto";
import ListVideo from "./testPages/ListVideo";

import LetterLoading from "./pages/main/LetterLoading";
import VideoLetter from "./pages/main/VideoLetter";
import StartingLetterStart from "./pages/main/StartingLetterStart";
import Emergency from "./pages/main/Emergency";
import LetterScore from "./pages/sideComponents/LetterScore";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/main" element={<Main />} />
          <Route path="/music" element={<Music />} />
          <Route path="/musicresult" element={<MusicResult />} />
          <Route path="/letter" element={<StartingLetter />} />
          <Route path="/letterstart" element={<StartingLetterStart />} />
          <Route path="/letterscore" element={<LetterScore />} />
          <Route path="/stretch" element={<Stretch />} />
          <Route path="/emergency" element={<Emergency />} />

          <Route path="/test" element={<TestPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/viewpicture" element={<ViewPhoto />} />
          <Route path="/viewvideo" element={<ViewVideo />} />
          <Route path="/anyphoto" element={<AnyPhoto />} />

          <Route path="/listpicture" element={<ListPhoto />} />
          <Route path="/listvideo" element={<ListVideo />} />

          <Route path="/letterloading" element={<LetterLoading />} />
          <Route path="/videoletter" element={<VideoLetter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
