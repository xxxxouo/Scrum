import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProjectListAsync } from "state/project/reducer";

export const useGetProject = () => {
  const dispath = useDispatch();

  useEffect(() => {
    const list = dispath(getProjectListAsync());
  }, []);
  return null;
};
