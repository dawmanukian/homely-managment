import React, { useState } from "react";
import "./announcements.css";
import ItemCard from "../item-card/ItemCard";
import SearchForm from "../admin/search-form/SearchForm";
import AnnouncementsFilter from "../announcements-filter/AnnouncementsFilter";

const Announcements = () => {
  const [ann, setAnn] = useState([
    {
      id: 1,
      header: "Նոր Նորք, Գյուրջյան փող",
      item_img:
        "https://housing.com/news/wp-content/uploads/2023/03/exterior-design-shutterstock_1932966368-1200x700-compressed.jpg",
      address: "Գյուրջյան փող, Նոր Նորք, Երևան",
      price_usd: "130,000",
      price_rub: "450,000",
      price_dram: "600,000",
      broker_name: "Դավիթ Մանուկյան",
      broker_phone: "+37494673735",
      broker_email: "thedavitmanukyan@gmail.com",
    },
    {
      id: 2,
      header: "Նոր Հասցե, Այլ Նորք",
      item_img: "https://i.pinimg.com/564x/56/df/a1/56dfa1f96fb005764fcfef238d5d56d9.jpg",
      address: "Այլ հասցե, Հայաստան",
      price_usd: "150,000",
      price_rub: "500,000",
      price_dram: "700,000",
      broker_name: "Անուն Ազգանուն",
      broker_phone: "+37498765432",
      broker_email: "example@email.com",
    },
    {
      id: 3,
      header: "Ավելին՝ Պուշկինի փող, Գյումրի",
      item_img: "https://i.pinimg.com/564x/56/df/a1/56dfa1f96fb005764fcfef238d5d56d9.jpg",
      address: "Պուշկինի փող, Գյումրի",
      price_usd: "180,000",
      price_rub: "600,000",
      price_dram: "800,000",
      broker_name: "Գագիկ Գրիգորյան",
      broker_phone: "+37491234567",
      broker_email: "gagik.grigoryan@gmail.com",
    },
    {
      id: 4,
      header: "Բարձրագույն վայր, Սևան",
      item_img: "https://i.pinimg.com/564x/96/9e/29/969e29466c4040aa181f7d80e6cac331.jpg",
      address: "Լուսավորչի փող, Երևան",
      price_usd: "200,000",
      price_rub: "700,000",
      price_dram: "900,000",
      broker_name: "Աննա Անանյան",
      broker_phone: "+37499887766",
      broker_email: "anna.ananyan@gmail.com",
    },
    {
      id: 5,
      header: "Վերֆելի վայր, Սևան",
      item_img: "https://i.pinimg.com/564x/9f/e3/01/9fe30127806487440ab6a36ee165d58e.jpg",
      address: "Բարձրագույն վայր, Սևան",
      price_usd: "250,000",
      price_rub: "850,000",
      price_dram: "1,100,000",
      broker_name: "Ռաֆֆի Ռաֆֆիան",
      broker_phone: "+37495555000",
      broker_email: "raffi.raffian@gmail.com",
    },
  ]);
  const [showData, setShowData] = useState(ann);
  return (
    <div className="workers-page">
      <div style={{ height: "100px" }}></div>
      <AnnouncementsFilter
        onSearch={(search) => {
          search !== ""
            ? setShowData(
                ann.filter(
                  (el) =>
                    el.broker_phone === search ||
                    el.header.toLowerCase().startsWith(search.toLowerCase())
                )
              )
            : setShowData(ann);
        }}
      />
      <div className="all-items">
        {showData.map((el) => {
          return <ItemCard data={el} />;
        })}
      </div>
    </div>
  );
};

export default Announcements;
