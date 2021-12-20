import "./App.css";
import { Alert, Container, LinearProgress, Snackbar } from "@mui/material";
import Header from "./modules/common/Header";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import { MyProfile } from "./modules/users/MyProfile";
import { useEffect } from "react";
import { AuthService } from "./modules/auth/AuthService";
import { ForbiddenAccess } from "./modules/common/ForbiddenAccess";
import { Grenades } from "./modules/grenades/Grenades";
import { CreateGrenade } from "./modules/grenades/CreateGrenade";
import { GrenadeDetails } from "./modules/grenades/GrenadeDetails";
import { Producers } from "./modules/producers/Producers";
import { CreateProducer } from "./modules/producers/CreateProducer";
import { Countries } from "./modules/countries/Countries";
import { ProducerDelete } from "./modules/producers/ProducerDelete";
import { CountryDelete } from "./modules/countries/CountryDelete";
import { CreateCountry } from "./modules/countries/CreateCountry";
import { DeleteGrenade } from "./modules/grenades/DeleteGrenade";
import { UpdateGrenade } from "./modules/grenades/UpdateGrenade";

export default function App() {
  const location = useLocation();
  const loading = useSelector((state) => state.loading);
  const showSuccessMessage = useSelector((state) => state.showSuccessMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.startsWith("/users")) {
      if (!AuthService.hasRole("ROLE_ADMINISTRATOR")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname.startsWith("/groups")) {
      if (!window?.localStorage?.getItem("auth")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname.startsWith("/privileges")) {
      if (!window?.localStorage?.getItem("auth")) {
        navigate("/forbidden");
      }
    }

    if (location.pathname.startsWith("/groups")) {
      if (!AuthService.hasRole("ROLE_ADMINISTRATOR")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname.startsWith("/privileges")) {
      if (!AuthService.hasRole("ROLE_ADMINISTRATOR")) {
        navigate("/forbidden");
      }
    }

    if (location.pathname.startsWith("/myprofile")) {
      if (!window?.localStorage?.getItem("auth")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname.startsWith("/grenades")) {
      if (!window?.localStorage?.getItem("auth")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname == "/grenades/create") {
      if (!AuthService.hasRole("ROLE_ADMINISTRATOR")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname.startsWith("/producers")) {
      if (!AuthService.hasRole("ROLE_ADMINISTRATOR")) {
        navigate("/forbidden");
      }
    }
    if (location.pathname.startsWith("/countries")) {
      if (!AuthService.hasRole("ROLE_ADMINISTRATOR")) {
        navigate("/forbidden");
      }
    }
  }, [location]);

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
        {location?.pathname !== "/signin" && <Header /> &&
          location?.pathname !== "/forbidden" && <Header />}
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
          <Route path="/myprofile/:username" element={<MyProfile />}></Route>
          <Route path="/forbidden" element={<ForbiddenAccess />}></Route>
          <Route path="/grenades" element={<Grenades />}></Route>
          <Route path="/grenades/create" element={<CreateGrenade />}></Route>
          <Route
            path="grenades/details/:id"
            element={<GrenadeDetails />}
          ></Route>
          <Route
            path="/grenades/delete/:id"
            element={<DeleteGrenade />}
          ></Route>
          <Route path="/grenades/edit/:id" element={<UpdateGrenade />}></Route>
          <Route path="/producers" element={<Producers />}></Route>
          <Route path="/producers/create" element={<CreateProducer />}></Route>
          <Route
            path="/producers/delete/:id"
            element={<ProducerDelete />}
          ></Route>
          <Route path="/countries" element={<Countries />}></Route>
          <Route
            path="/countries/delete/:id"
            element={<CountryDelete />}
          ></Route>
          <Route path="/countries/create" element={<CreateCountry />}></Route>
        </Routes>
      </Container>
    </>
  );
}
