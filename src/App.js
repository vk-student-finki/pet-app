import "./App.css";
import { Alert, Container, LinearProgress, Snackbar } from "@mui/material";
import Header from "./modules/common/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./modules/home/Home";
import { Users } from "./modules/users/Users";
import { UserDetails } from "./modules/users/UserDetails";
import { UpdateUser } from "./modules/users/UpdateUser";
import { CreateUser } from "./modules/users/CreateUser";
import { Groups } from "./modules/groups/Groups";
import { CreateGroup } from "./modules/groups/CreateGroup";
import { DeleteGroup } from "./modules/groups/DeleteGroup";
import { UpdateGroup } from "./modules/groups/UpdateGroup";
import { GroupDetails } from "./modules/groups/GroupDetails";
import { Privileges } from "./modules/privileges/Privileges";
import { PrivilegeDetails } from "./modules/privileges/PrivilegeDetails";
import { DeleteUser } from "./modules/users/DeleteUser";
import { SignIn } from "./modules/auth/SignIn";
import { useDispatch, useSelector, useStore } from "react-redux";
import { COMMON_ACTIONS } from "./modules/common/CommonActions";

export default function App() {
  const location = useLocation();
  const loading = useSelector((state) => state.loading);
  const showSuccessMessage = useSelector((state) => state.showSuccessMessage);
  const dispatch = useDispatch();

  return (
    <>
      {loading && <LinearProgress />}
      {!loading && <div style={{ height: "4px" }}></div>}
      {showSuccessMessage && (
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={5000}
          onClose={() => {
            dispatch({ type: COMMON_ACTIONS.CLEAR_NOTIFICATIONS });
          }}
        >
          <Alert
            onClose={() => {
              dispatch({ type: COMMON_ACTIONS.CLEAR_NOTIFICATIONS });
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {showSuccessMessage}
          </Alert>
        </Snackbar>
      )}
      <Container>
        {location?.pathname !== "/signin" &&
          location?.pathname !== "/users/create" && <Header />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/details/:id" element={<UserDetails />}></Route>
          <Route path="/users/edit/:id" element={<UpdateUser />}></Route>
          <Route path="/users/create" element={<CreateUser />}></Route>
          <Route path="/groups" element={<Groups />}></Route>
          <Route path="/users/delete/:id" element={<DeleteUser />}></Route>
          <Route path="/groups/create" element={<CreateGroup />}></Route>
          <Route path="/groups/delete/:id" element={<DeleteGroup />}></Route>
          <Route path="/groups/edit/:id" element={<UpdateGroup />}></Route>
          <Route path="/groups/details/:id" element={<GroupDetails />}></Route>
          <Route path="/privileges" element={<Privileges />}></Route>
          <Route path="/privileges/:id" element={<PrivilegeDetails />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </Container>
    </>
  );
}
