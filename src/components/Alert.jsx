import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Success = (props) => {
  const { successMsg, setSuccessMsg } = props;
  return (
    <>
      {successMsg !== "" && (
        <div className="bg-green-200 flex justify-between p-4 rounded-md mb-4">
          <div className="flex gap-3">
            <FaCheckCircle className="text-2xl my-auto text-green-800" />
            <div className="text-green-800 font-bold my-auto text-xl capitalize">
              {successMsg}
            </div>
          </div>
          <div className="my-auto" onClick={() => setSuccessMsg("")}>
            <FaTimes className="text-green-800 text-lg" />
          </div>
        </div>
      )}
    </>
  );
};
const Failed = (props) => {
  const { errMsg, setErrMsg } = props;
  return (
    <>
      {errMsg !== "" && (
        <div className="bg-red-200 p-4 rounded-md mb-5">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-3">
              <FaExclamationCircle className="text-3xl text-red-800" />
              <div className="text-2xl text-red-800 font-bold">Error</div>
            </div>
            <FaTimes
              className="text-red-800 text-lg my-auto"
              onClick={() => setErrMsg("")}
            />
          </div>
          <div className="text-red-800 font-bold my-auto text-lg">{errMsg}</div>
        </div>
      )}
    </>
  );
};
const Alert = () => {
  return <></>;
};
Alert.Success = Success;
Alert.Failed = Failed;
export default Alert;
