import React, { useState } from "react";
import "./select-street-panel.css";
import { FaCheck } from "react-icons/fa6";

const SelectStreetPanel = ({ streetName, onSelect, region }) => {
  const streetsInYerevan = [
    {
      ԱՋԱՓՆՅԱԿ: [
        "Հալաբյան փողոց",
        "Հասրաթյան փողոց /Գրիգոր/",
        "Շիրազի փողոց",
        "Աշտարակի խճուղի",
        "Չաուշի փողոց",
        "Սիլիկյան նոր խճուղի",
        "Սեբաստիա փողոց",
        "Լենինգրադյան փողոց",
        "Բեկնազարյան փողոց",
        "Բաշինջաղյան փողոց",
        "Մազմանյան փողոց",
        "Շինարարների փողոց",
        "Մարգարյան փողոց",
        "Աբելյան փողոց",
      ],
      ԱՎԱՆ: [
        "Բաբաջանյան փողոց",
        "Աճառյան փողոց",
        "Ռուբինյանց փողոց",
        "Խուդյակովի փողոց",
        "Բագրևանդի փողոց",
      ],
      ԱՐԱԲԿԻՐ: [
        "Բաղրամյան պողոտա",
        "Կասյան փողոց",
        "Քոչարի փողոց",
        "Վաղարշյան փողոց",
        "Սարալանջի փողոց",
        "Կոմիտասի պողոտա",
        "Կիևյան փողոց",
        "Ազատության պողոտա",
        "Թբիլիսյան խճուղի",
        "Օրբելի եղբայրների փողոց",
        "Ավետիսյան փողոց",
        "Համբարձումյան փողոց",
        "Հակոբյան փողոց",
        "Խաչատրյան փողոց",
        "Գյուլբենկյան փողոց",
        "Փափազյան փողոց",
        "Մամիկոնյանց փողոց",
        "Տիգրանյան փողոց",
        "Շահսուվարյան փողոց",
        "Վրացական փողոց",
        "Բաբայան փողոց",
        "Գրիբոյեդովի փողոց",
        "Շիրվանզադեի փողոց",
        "Զարյան փողոց",
        "Ադոնցի փողոց",
      ],
      ԴԱՎԹԱՇԵՆ: [
        "Միկոյան փողոց /Անաստաս Միկոյան փողոց -Երևան -Եղվարդ խճուղին՝ սկսած Դավթաշենի կամրջից մինչև Դավթաշեն համայնքի վարչական տարածքի վերջը/",
        "Սասնա Ծռերի փողոց",
        "Պետրոսյան փողոց",
        "Փիրումյան փողոց",
        "Աղաբաբյան փողոց",
        "Գևորգյան փողոց /Սամվել Գևորգյան նախագծային փողոց/Դավթաշեն կամրջի ուղեկապը Աշտարակի խճուղուն ուղեկապիին միացնող փողոց/",
      ],
      ԷՐԵԲՈՒՆԻ: [
        "Տիգրան Մեծի պողոտա",
        "Արցախի պողոտա",
        "Այվազովսկու փողոց",
        "Էրեբունու փողոց",
        "Դավիթ Բեկի փողոց",
        "Ռոստովյան փողոց",
        "Գարեգին Նժդեհի փողոց",
        "Խորենացու փողոց",
        "Բելինսկու փողոց",
        "Ազատամարտիկների պողոտա",
        "Արին-Բերդի փողոց",
        "Դաշտենցի փողոց",
        "Նուբարաշենի խճուղի",
        "Սասունցի Դավթի փողոց",
        "Խաղաղ Դոնի փողոց",
        "Տիտոգրադյան փողոց",
        "Մասիս-Աբովյան շրջանցող ճանապարհ",
        "Աթոյան փողոց",
      ],
      ԿԵՆՏՐՈՆ: [
        "Բաղրամյան պողոտա",
        "Մաշտոցի պողոտա",
        "Կորյունի փողոց",
        "Սարյան փողոց",
        "Ամիրյան փողոց",
        "Տիգրան Մեծի պողոտա",
        "Խանջյան փողոց",
        "Աբովյան փողոց",
        "Նալբանդյան փողոց",
        "Մոսկովյան փողոց",
        "Հերացու փողոց",
        "Մյասնիկյան պողոտա",
        "Խորենացու փողոց",
        "Պռոշյան փողոց",
        "Ագաթանգեղոսի փողոց",
        "Արշակունյաց պողոտա",
        "Իսակովի պողոտա",
        "Չարենցի փողոց",
        "Նար-Դոսի փողոց",
        "Սայաթ-Նովայի պողոտա",
        "Ծիծեռնակաբերդի խճուղի",
        "Գետառի փողոց",
        "Պարոնյան փողոց",
        "Սարալանջի փողոց",
        "Աթենքի փողոց",
        "Գրիգոր Լուսավորչի փողոց",
        "Վարդանանց փողոց",
        "Իսրայելյան փողոց",
        "Ձորափի փողոց",
        "Արամի փողոց",
        "Բուզանդի փողոց",
        "Պուշկինի փողոց",
        "Ֆիրդուսի փողոց",
        "Զորյանի փողոց",
        "Կողբացու փողոց",
        "Տպագրիչների փողոց",
        "Անտառային փողոց",
        "Քաջազնունու փողոց",
        "Տերյան փողոց",
        "Հանրապետության փողոց",
        "Մկրտչյան փողոց /Մհեր Մկրտչյան/Տիգրան Մեծի պողոտայից մինչև Խորենացու փողոց /Հանրապետության փողոցի մի հատվածը/",
        "Մելիք-Ադամյան փողոց",
        "Զաքյան փողոց",
        "Լեոյի փողոց",
        "Քոչարի փողոց",
        "Մանուկյան փողոց",
        "Դեմիրճյան փողոց",
        "Արգիշտիի փողոց",
        "Շարիմանյան փողոց",
        "Բեյրութի փողոց",
        "Իտալիայի փողոց",
        "Սարգսյան փողոց",
      ],
      "ՄԱԼԱԹԻԱ-ՍԵԲԱՍՏԻԱ": [
        "Սեբաստիայի փողոց",
        "Ծովակալ Իսակովի պողոտա",
        "Բաբաջանյան փողոց",
        "Րաֆֆու փողոց",
        "Շերամի փողոց",
        "Ամերիկյան փողոց /Էջմիածնի հին խճուղի/",
        "Տիչինայի փողոց",
        "Օհանովի փողոց",
        "Զորավար Անդրանիկի փողոց",
        "Լենինգրադյան փողոց",
        "Շիրակի փողոց",
        "Մալաթիայի փողոց",
        "Արարատյան փողոց",
      ],
      "ՆՈՐ ՆՈՐՔ": [
        "Գայի պողոտա",
        "Մյասնիկյանի պողոտա",
        "Թևոսյան փողոց",
        "Բագրևանդի փողոց",
        "Բ.Մուրադյան փողոց",
        "Քոչինյան փողոց /Անտոն/",
        "Դավիթ Բեկի փողոց",
        "Միկոյան փողոց",
        "Գյուլիքևխյան փողոց",
        "Գյուրջյան փողոց",
        "Գալշոյան փողոց",
        "Շոպրոնի փողոց",
        "Սաֆարյան փողոց",
      ],
      "ՆՈՐՔ-ՄԱՐԱՇ": ["Արմենակյան փողոց", "Հովսեփյան փողոց"],
      ՆՈՒԲԱՐԱՇԵՆ: ["Նուբարաշենի խճուղի"],
      ՇԵՆԳԱՎԻԹ: [
        "Շիրակի փողոց",
        "Արտաշեսյան պողոտա",
        "Արտաշատի խճուղի",
        "Արշակունյաց պողոտա",
        "Գագեգին Նժդեհի փողոց",
        "Բագրատունյաց փողոց",
        "Թամանցիների փողոց",
        "Եղբայրության փողոց",
        "Մանանդյան փողոց",
        "Մանթաշյան փողոց",
        "Մայիսի 9-ի փողոց",
        "Ֆրունզեի փողոց",
        "Չեխովի փողոց",
        "Արարատյան փողոց",
        "Նորագավիթի 1-ին փողոց",
      ],
      "ՔԱՆԱՔԵՌ-ԶԵՅԹՈՒՆ": [
        "Դավիթ Անհաղթի փողոց",
        "Ռուբինյանց փողոց",
        "Սևակի փողոց",
        "Զաքարիա Քանաքեռցու /Սարկավագի/ փողոց",
        "Հասրաթյան փողոց",
        "Ուլնեցու փողոց",
        "Քանաքեռ 1-ին փողոց",
      ],
    },
  ]
  return (
    <div className="all_streets">
      {streetsInYerevan[0][region.toUpperCase()]
        .filter((el) => el.toLowerCase().startsWith(streetName.toLowerCase()))
        .map((el, index) => {
          return (
            <div key={index} onClick={() => onSelect(el)} className={"street_name"}>
              <span>{el}</span>
              {el.toLowerCase() === streetName.toLowerCase() && (
                <FaCheck className="selected_street_icon" />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default SelectStreetPanel;
