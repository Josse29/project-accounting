import React, { useEffect, useState } from "react";
import { Alert, ButtonIcon, Card, Loading } from "../../components";
import { FaAddressBook, FaKey } from "react-icons/fa6";
import SearchLimitUser from "./SearchLimitUser";
import ModalRegister from "./ModalRegister";
import TableUser from "./TableUser";
import PaginationUser from "./PaginationUser";
import { getUser } from "../../utils";
import ModalResetPassword from "./ModalResetPassword";

const CardUser = () => {
  const [loading, setLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [resetPassword, setResetPassword] = useState(false);
  const [req, setReq] = useState({
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  });
  useEffect(() => {
    const params = {
      req,
      setLoading,
      setUser,
      setTotalRows,
      setTotalPages,
    };
    getUser(params);
  }, []);
  return (
    <Card>
      <Card.Header headerTitle="User" className="bg-[#4338ca]" />
      <Card.Body>
        {/* add user */}
        <div className="mb-4 flex justify-between">
          <ButtonIcon
            title="Register"
            icon={<FaAddressBook />}
            className="bg-[#4338ca] hover:bg-[#382ea7] hover:ring-[#857cef] cursor-pointer"
            onClick={() => setOpenRegister(true)}
          />
          <ButtonIcon
            title="Reset Password"
            icon={<FaKey />}
            className="bg-sky-600 hover:ring-sky-700 cursor-pointer"
            onClick={() => setResetPassword(true)}
          />
        </div>
        {/* search & limit */}
        <div className="mb-4">
          <SearchLimitUser
            setUser={setUser}
            req={req}
            setReq={setReq}
            setTotalRows={setTotalRows}
            setTotalPages={setTotalPages}
            setLoading={setLoading}
          />
        </div>
        {/* alert */}
        <div className="mb-4">
          <Alert.Success
            successMsg={successMsg}
            setSuccessMsg={setSuccessMsg}
          />
        </div>
        {/* loading */}
        {loading && <Loading />}
        {/* table */}
        {!loading && (
          <div className="mb-4">
            <TableUser
              setReq={setReq}
              user={user}
              setUser={setUser}
              totalRows={totalRows}
              setTotalRows={setTotalRows}
              setSuccessMsg={setSuccessMsg}
              setTotalPages={setTotalPages}
            />
          </div>
        )}
        {/* pagination */}
        {!loading && (
          <div className="mb-4 flex justify-center">
            <PaginationUser
              req={req}
              setReq={setReq}
              totalPages={totalPages}
              totalRows={totalRows}
              setUser={setUser}
            />
          </div>
        )}
      </Card.Body>
      {/* modal */}
      <ModalRegister
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
        setReq={setReq}
        setUser={setUser}
        setSuccessMsg={setSuccessMsg}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
      <ModalResetPassword
        setSuccessMsg={setSuccessMsg}
        resetPassword={resetPassword}
        setResetPassword={setResetPassword}
      />
    </Card>
  );
};

export default CardUser;
