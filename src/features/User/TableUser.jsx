import React, { useState } from "react";
import { ButtonAction, Table } from "../../components";
import ModalDetailUser from "./ModalDetailUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

const TableUser = (props) => {
  const {
    totalRows,
    setTotalRows,
    setTotalPages,
    setReq,
    user,
    setUser,
    setSuccessMsg,
  } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <>
      <Table>
        <Table.HeadRow>
          <Table.HeadCol className="w-[50px]" title="#" />
          <Table.HeadCol className="w-[220px] text-start" title="Fullname" />
          <Table.HeadCol className="w-[180px] text-start" title="Email" />
          <Table.HeadCol className="w-[100px] text-start" title="Position" />
          <Table.HeadCol className="w-[250px] text-center" title="Action" />
        </Table.HeadRow>
        <Table.Body>
          {totalRows > 0 ? (
            user.map((el, i) => (
              <Table.BodyRow
                key={i}
                className={`${(i + 1) % 2 !== 0 ? "bg-[#dddddd]" : ""}`}
              >
                <Table.BodyCol title={el.UserId} className="text-center" />
                <Table.BodyCol title={el.UserFullname} className="capitalize" />
                <Table.BodyCol title={el.UserEmail} />
                <Table.BodyCol title={el.UserPosition} className="capitalize" />
                <Table.BodyCol
                  title={
                    <>
                      <ButtonAction
                        btnDetail={() => {
                          setOpenDetail(true);
                          setUserData(el);
                        }}
                        btnUpdate={() => {
                          setOpenUpdate(true);
                          setUserData(el);
                        }}
                        btnDelete={() => {
                          setOpenDelete(true);
                          setUserData(el);
                        }}
                      />
                    </>
                  }
                />
              </Table.BodyRow>
            ))
          ) : (
            <Table.BodyRow className="bg-[#dddddd]">
              <Table.BodyCol
                title={"Empty"}
                className="text-center font-bold italic"
                colSpan="5"
              />
            </Table.BodyRow>
          )}
        </Table.Body>
      </Table>
      {/* modal */}
      <ModalDetailUser
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailUser={userData}
      />
      <ModalUpdateUser
        setReq={setReq}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        updateUser={userData}
        setSuccessMsg={setSuccessMsg}
        setUser={setUser}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
      <ModalDeleteUser
        setReq={setReq}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        deleteUser={userData}
        setSuccessMsg={setSuccessMsg}
        setUser={setUser}
        setTotalRows={setTotalRows}
        setTotalPages={setTotalPages}
      />
    </>
  );
};

export default TableUser;
