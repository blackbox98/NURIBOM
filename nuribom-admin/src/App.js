import "./App.css";
import "./css/style.css";
import { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const LoginUser = lazy(() => import("./pages/auth/LoginUser"));
const LoginWorker = lazy(() => import("./pages/auth/LoginWorker"));
const RegistWorker = lazy(() => import("./pages/auth/RegistWorker"));
const RegistUser = lazy(() => import("./pages/auth/RegistUser"));
const Main = lazy(() => import("./pages/main/Main"));
const UserDetail = lazy(() => import("./pages/detail/UserDetail"));
const MedicineRegist = lazy(() => import("./pages/regist/MedicineRegist"));
const SongRegist = lazy(() => import("./pages/regist/SongRegist"));
const StretchRegist = lazy(() => import("./pages/regist/StretchRegist"));
const VisitRegist = lazy(() => import("./pages/regist/VisitRegist"));
const MedicineUpdate = lazy(() => import("./components/regist/MedicineUpdate"));
const VisitUpdate = lazy(() => import("./components/regist/VisitUpdate"));
const CalendarForm = lazy(() => import("./components/calendar/CalendarForm"));
const UpdateUser = lazy(() => import("./pages/auth/UpdateUser"));
const UploadFile = lazy(() => import("./pages/auth/UploadFile"));
const UploadVideo = lazy(() => import("./pages/auth/UploadVideo"));
const UploadPicAndVid = lazy(() => import("./pages/auth/UploadPicAndVid"));
const Notice = lazy(() => import("./pages/main/Notice"));
const PrivateRoute = lazy(() => import("./routes/PrivateRoute"));
const UserPhoto = lazy(() => import("./pages/detail/UserPhoto"));
const UpdateStretch = lazy(() => import("./pages/regist/UpdateStretch"));
const UpdateSong = lazy(() => import("./pages/regist/UpdateSong"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* auth */}
            <Route path="/worker" element={<LoginUser />} />
            <Route path="/worker/loginworker" element={<LoginWorker />} />
            <Route path="/worker/registworker" element={<RegistWorker />} />
            <Route
              path="/worker/registuser"
              element={<PrivateRoute component={<RegistUser />} />}
            />
            {/* auth */}
            <Route
              path="/worker/main"
              element={<PrivateRoute component={<Main />} />}
            />
            {/* detail */}

            <Route
              path="/worker/userdetail/:workerId/:userId"
              element={<PrivateRoute component={<UserDetail />} />}
            />
            {/* detail */}

            {/* regist */}
            <Route
              path="/worker/medicineregist/:workerId/:userId"
              element={<PrivateRoute component={<MedicineRegist />} />}
            />
            <Route
              path="/worker/songregist/:workerId/:userId"
              element={<PrivateRoute component={<SongRegist />} />}
            />
            <Route
              path="/worker/stretchregist/:workerId/:userId"
              element={<PrivateRoute component={<StretchRegist />} />}
            />
            <Route
              path="/worker/visitregist/:workerId/:userId"
              element={<PrivateRoute component={<VisitRegist />} />}
            />
            {/* regist */}

            {/* component */}
            <Route
              path="/worker/CalendarForm"
              element={<PrivateRoute component={<CalendarForm />} />}
            />
            {/* component */}

            {/* update */}
            <Route
              path="/worker/MedicineUpdate/:medicationId/:userId"
              element={<PrivateRoute component={<MedicineUpdate />} />}
            />
            <Route
              path="/worker/VisitUpdate/:workerId/:userId"
              element={<PrivateRoute component={<VisitUpdate />} />}
            />
            <Route
              path="/worker/StretchUpdate/:userId/:stretchId"
              element={<PrivateRoute component={<UpdateStretch />} />}
            />
            <Route
              path="/worker/SongUpdate/:userId/:songId"
              element={<PrivateRoute component={<UpdateSong />} />}
            />
            <Route
              path="/worker/updateuser/:workerId/:userId"
              element={<PrivateRoute component={<UpdateUser />} />}
            />
            {/* update */}

            <Route
              path="/worker/uploadfile/:workerId/:userId"
              element={<PrivateRoute component={<UploadFile />} />}
            />

            <Route
              path="/worker/picandvid/:workerId/:userId"
              element={<PrivateRoute component={<UploadPicAndVid />} />}
            />

            <Route
              path="/worker/video/:workerId/:userId"
              element={<PrivateRoute component={<UploadVideo />} />}
            />

            <Route
              path="/worker/photo/:workerId/:userId"
              element={<PrivateRoute component={<UserPhoto />} />}
            />

            <Route
              path="/worker/notice/:workerId"
              element={<PrivateRoute component={<Notice />} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
