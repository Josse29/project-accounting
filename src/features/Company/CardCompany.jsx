import React, { useEffect, useState } from "react";
import { Card } from "../../components";
import { Company } from "../../assets";
import ModalUpdateCompany from "./ModalUpdateCompany";
import { FaEdit } from "react-icons/fa";
import { getCompanyAPI } from "../../services";
import { formatDate } from "../../utils";

const CardCompany = () => {
  const [company, setCompany] = useState({});
  const getCompany = async () => {
    try {
      const response = await getCompanyAPI();
      setCompany(response[0]);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getCompany();
  }, []);
  const [modalUpdate, setModalUpdate] = useState(false);
  return (
    <div className="mb-5">
      <Card>
        <Card.Header
          headerTitle="About Company"
          className="text-center bg-[#2563eb]"
        />
        <Card.Body>
          <div className="flex gap-4 px-4 py-2 items-center">
            <div className="flex-1">
              <img
                src={company.CompanyImg || Company}
                alt=""
                className="w-full"
              />
            </div>
            <div className="flex-[2]">
              <div className="flex justify-between gap-3">
                <div className="text-4xl mb-2 capitalize">
                  {company.CompanyName}
                </div>
                <div
                  className="flex bg-sky-500 hover:bg-sky-600 h-[40px] w-[40px] rounded-lg cursor-pointer "
                  onClick={() => setModalUpdate(true)}
                >
                  <FaEdit className="m-auto text-white text-xl" />
                </div>
              </div>
              <div className="text-2xl mb-2">
                {formatDate(company.CompanyEst)}
              </div>
              <div className="mb-1 text-xl">{company.CompanyInfo}</div>
            </div>
          </div>
          <ModalUpdateCompany
            modalUpdate={modalUpdate}
            setModalUpdate={setModalUpdate}
            data={company}
            setCompany={setCompany}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardCompany;
