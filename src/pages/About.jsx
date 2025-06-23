import React from "react";
import { NavigationContainer } from "../navigation";
import { Card, Card1, Container } from "../components";
import { FaCity } from "react-icons/fa6";
import { Josse } from "../assets";
import { CardCompany } from "../features/Company";

const About = () => {
  return (
    <NavigationContainer>
      <Card1 page="About" icon={<FaCity />} className="border-[#2563eb]" />
      <Container>
        {/* company */}
        <CardCompany />
        {/* developer */}
        <div className="mb-5">
          <Card>
            <Card.Header
              headerTitle="About Programmer"
              className="text-center bg-[#2563eb]"
            />
            <Card.Body>
              <div className="flex gap-8 px-4 py-2">
                <div className="flex-1">
                  <img src={Josse} alt="" className="w-full" />
                </div>
                <div className="flex-[2]">
                  {/* fullname */}
                  <div className="text-lg mb-2">
                    <div className="mb-1">Name :</div>
                    <div className="ms-2">Josse Surya Pinem</div>
                  </div>
                  {/* address */}
                  <div className="text-lg mb-2">
                    <div className="mb-1">Address :</div>
                    <div className="ms-2">Medan, North Sumatra, Indonesian</div>
                  </div>
                  {/* education */}
                  <div className="text-lg mb-2">
                    <div className="mb-1">Education :</div>
                    <div className="ms-2 text-lg">
                      <div className="mb-1">
                        2019-2023 : S-1 Bachelor Degree of University Prima
                        Indonesian, Medan
                      </div>
                      <div className="mb-1">
                        2016-2019 : Senior High School N 4 Medan
                      </div>
                      <div className="mb-1">
                        2013-2016 : Junior High School St Mary Kabanjahe
                      </div>
                      <div className="mb-2">
                        2007-2013 : Elementary School St Joseph Kabanjahe
                      </div>
                    </div>
                  </div>
                  {/* skills */}
                  <div className="mb-2 text-lg">
                    <div className="mb-1">Skills :</div>
                    <div className="ms-2">
                      HTML, CSS, Javascript, React.js, React Native, Electron,
                      Python, Kali Linux, NMAP, BurpSuite, Figma, Ms.Office
                    </div>
                  </div>
                  {/* working experience */}
                  <div className="mb-2 text-lg">
                    <div className="mb-1">Working Experience :</div>
                    <div className="ms-2 text-lg">
                      <div className="mb-1">
                        2023 - 2024 : Web & Mobile Programer Cv. Medika Solusi
                        Digital
                      </div>
                      <div className="mb-1">
                        2022 - 2023 : Front-end Developer Sekolah Ekspor
                      </div>
                      <div className="mb-1">
                        2021 - 2022 : Business Consultant PT. Equity World
                        Futures
                      </div>
                      <div className="mb-1">
                        2020 - 2021 : Adminstration STTSI
                      </div>
                    </div>
                  </div>
                  {/* contact */}
                  <div className="mb-2 text-lg">
                    <div className="mb-1">Contact :</div>
                    <div className="ms-2 text-lg">
                      <div className="mb-1">
                        Website : https://josse29.github.io/portfolio/
                      </div>
                      <div className="mb-1">Email : pinemjosse@gmail.com</div>
                      <div className="mb-1">WhatsApp : +6289524087023</div>
                      <div className="mb-1">Instagram : @pinemjosse</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </NavigationContainer>
  );
};

export default About;
