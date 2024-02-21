import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventBus from "utils/event";
import { set_login_state } from "state/login/reducer";
import { useDispatch } from "react-redux";

function useGoLogin() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  useEffect(() => {
    eventBus.on("global_not_login", () => {
      dispath(set_login_state(false));
      navigate("/login");
    });
  }, []);
  return null;
}

export default useGoLogin;
