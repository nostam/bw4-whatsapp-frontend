import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const useAuth = () => {
  const { userInfos, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchUser());
    if (error) {
      window.location.replace("/login");
      // history.push("/login");
    }
  }, [dispatch, error, history]);

  return [userInfos, loading];
};

export default useAuth;
