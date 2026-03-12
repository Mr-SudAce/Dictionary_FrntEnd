import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Footer = ({ base_url }) => {
  const path = "/api/all/footer/";
  const API_URL = `${base_url}${path}`;

  const [footer, setFooter] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setFooter(res.data);
      })
      .catch((err) => {
        console.log("Error fetching Footer API Data", err);
      });
  }, []);

  const current = new Date();
  const year = `${current.getFullYear()}`;

  return (
    <>
      <footer
        className=" px-4 mx-auto border-t font-sans tracking-wide bg-[--main_color] p-0.5"
        style={{
          backgroundColor: "var(--main_bg)",
        }}
      >
        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 w-7xl mx-auto justify-center text-center">
          {footer.map((footerItem, index) => (
            <div key={index} className="lst">
              <h4
                className="font-semibold text-xl m-0 uppercase items-center flex justify-center py-3"
                style={{
                  color: "var(--main_color)",
                }}
              >
                {" "}
                {footerItem.heading}{" "}
              </h4>{" "}
              <hr className="border-[--main_bg] m-0 p-0" />
              <p
                className="m-0"
                dangerouslySetInnerHTML={{ __html: footerItem.description }}
              ></p>
            </div>
          ))}
        </div>
      </footer>
      <div
        className="border-t text-center  p-4"
        style={{
          backgroundColor: "var(--main_bg)",
        }}
      >
        <p
          className="text-slate-700 font-bold m-0 items-center justify-center flex gap-1 "
          style={{
            color: "var(--main_color)",
          }}
        >
          <span className="text-2xl text-center"> &copy;</span> 2024 - {year} |
          MeaningBy. All rights reserved.
        </p>
      </div>
    </>
  );
};

Footer.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Footer;
