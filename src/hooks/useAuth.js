import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../actions/userActions";

const useAuth = () => {
  const { userInfos, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());

    if (error) {
      window.location.replace("/login");
    }
  }, [dispatch, error]);

  return [userInfos, loading];
};

export default useAuth;
