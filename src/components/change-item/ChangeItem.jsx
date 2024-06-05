import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import SuccessAlert from "../success-alert/SuccessAlert";
import SelectStreetPanel from "../select-street-panel/SelectStreetPanel";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ChangeItem = ({ userData }) => {
  const itemId = useParams();

  const [itemData, setItemData] = useState(null);
  const [itemImages, setItemImages] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: 'Փոփոխված է',
      icon: "success"
    })
  }

  useEffect(() => {
    const get_item_data = async () => {
      try {
        const { data } = await axios.get(
          "https://service.homely.am/api/item/get",
          {
            params: itemId,
          }
        );
        setItemData(() => data.data[0]);
        setItemImages(data.item_images);
        console.log(data.item_images)
        setShowLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    get_item_data();
  }, []);


  const add_floor = () => {
    let x = new Array();
    for (let index = 1; index <= 32; index++) {
      x.push(
        <option value={index} key={index}>
          {index}
        </option>
      );
    }
    return x;
  };
  console.log(itemData)
  const [streetName, setStreetName] = useState("");
  const [region, setRegion] = useState("Աջափնյակ");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    data = { ...data, adminid: userData.id };

    items.forEach((el, index) => {
      formData.append(`file${index}`, el);
    });
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await axios.post(
        "https://service.homely.am/api/admin/update/item",
        formData
      );
      console.log(res)
      setDisableBtn(false);
      showSwal();
    } catch (error) {
      console.log(error);
    }
  };
  const [dragging, setDragging] = useState(false);
  const [items, setItems] = useState([]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("index");
    const newItems = [...items];
    const draggedItem = newItems.splice(dragIndex, 1)[0];
    newItems.splice(dropIndex, 0, draggedItem);
    setItems(newItems);
    setDragging(false);
  };

  function onAddCon(event) {
    setItemData(() => {
      return {
        ...itemData,
        conveniences: [...itemData.conveniences, event.target.value],
      };
    });
  }
  function onRemoveCon(event) {
    setItemData(() => {
      return {
        ...itemData,
        conveniences: itemData.conveniences.filter(
          (el) => el !== event.target.value
        ),
      };
    });
  }
  function onAddFac(event) {
    setItemData(() => {
      return {
        ...itemData,
        facilities_in_the_building: [
          ...itemData.facilities_in_the_building,
          event.target.value,
        ],
      };
    });
  }
  function onRemoveFac(event) {
    setItemData(() => {
      return {
        ...itemData,
        facilities_in_the_building: itemData.facilities_in_the_building.filter(
          (el) => el !== event.target.value
        ),
      };
    });
  }

  return (
    <>
      {!showLoading && (
        <div
          style={{
            marginTop: "150px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <form
            onSubmit={(evn) => {
              evn.preventDefault();
              onSubmit(itemData);
            }}
          >
            <InputGroup className="mb-3">
              <Form.Control
                aria-describedby="basic-addon1"
                placeholder="Անուն Ազգանուն"
                onChange={(event) =>
                  setItemData((e) => ({ ...e, owner_name: event.target.value }))
                }
                value={itemData.owner_name}
              />
            </InputGroup>
            <div className="form-panel">
              <InputGroup className="mb-3">
                <Form.Control
                  aria-describedby="basic-addon1"
                  placeholder="Հեռ․ համար"
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      owner_phone: event.target.value,
                    }))
                  }
                  value={itemData.owner_phone}
                />
              </InputGroup>
            </div>
            <div className="ann_type_panel">
              <h5 className="h_header">Հայտարարության տեսակը</h5>
              <div className="checks">
                <div>
                  <label htmlFor="type_1">Վաճառք</label>
                  <input
                    id="type_1"
                    type="radio"
                    value={"sell"}
                    checked={itemData.type === "sell"}
                    onChange={(event) =>
                      setItemData((e) => ({ ...e, type: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="type_2">Վարձակալություն</label>
                  <input
                    id="type_2"
                    type="radio"
                    value={"rent"}
                    checked={itemData.type === "rent"}
                    onChange={(event) =>
                      setItemData((e) => ({ ...e, type: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="type_3">Վաճառք և Վարձակալություն</label>
                  <input
                    id="type_3"
                    type="radio"
                    value={"rent_and_sell"}
                    checked={itemData.type === "rent_and_sell"}
                    onChange={(event) =>
                      setItemData((e) => ({ ...e, type: event.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-panel">
              <h5 className="h_header">Գտնվելու վայրը</h5>
              <div>
                <span>Մարզ</span>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(event) =>
                    setItemData((e) => ({ ...e, marz: event.target.value }))
                  }
                >
                  <option
                    value={"yerevan"}
                    selected={itemData.marz === "yerevan"}
                  >
                    Երևան
                  </option>
                  <option
                    value={"kotayk"}
                    selected={itemData.marz === "kotayk"}
                  >
                    Կոտայք
                  </option>
                </Form.Select>
              </div>
              <div>
                <span>Շրջան</span>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(event) =>
                    setItemData((e) => ({ ...e, region: event.target.value }))
                  }
                >
                  <option
                    value="Աջափնյակ"
                    selected={itemData.region === "Աջափնյակ"}
                  >
                    Աջափնյակ
                  </option>
                  <option value="Ավան" selected={itemData.region === "Ավան"}>
                    Ավան
                  </option>
                  <option
                    value="Արաբկիր"
                    selected={itemData.region === "Արաբկիր"}
                  >
                    Արաբկիր
                  </option>
                  <option
                    value="Դավթաշեն"
                    selected={itemData.region === "Դավթաշեն"}
                  >
                    Դավթաշեն
                  </option>
                  <option
                    value="Էրեբունի"
                    selected={itemData.region === "Էրեբունի"}
                  >
                    Էրեբունի
                  </option>
                  <option
                    value="Կենտրոն"
                    selected={itemData.region === "Կենտրոն"}
                  >
                    Կենտրոն
                  </option>
                  <option
                    value="Փոքր կենտրոն"
                    selected={itemData.region === "Փոքր կենտրոն"}
                  >
                    Փոքր կենտրոն
                  </option>
                  <option
                    value="Մալաթիա-Սեբաստիա"
                    selected={itemData.region === "Մալաթիա-Սեբաստիա"}
                  >
                    Մալաթիա-Սեբաստիա
                  </option>
                  <option
                    value="Նոր Նորք"
                    selected={itemData.region === "Նոր Նորք"}
                  >
                    Նոր Նորք
                  </option>
                  <option
                    value="Նորք-Մարաշ"
                    selected={itemData.region === "Նորք-Մարաշ"}
                  >
                    Նորք-Մարաշ
                  </option>
                  <option
                    value="Նուբարաշեն"
                    selected={itemData.region === "Նուբարաշեն"}
                  >
                    Նուբարաշեն
                  </option>
                  <option
                    value="Շենգավիթ"
                    selected={itemData.region === "Շենգավիթ"}
                  >
                    Շենգավիթ
                  </option>
                  <option
                    value="Քանաքեռ-Զեյթուն"
                    selected={itemData.region === "Քանաքեռ-Զեյթուն"}
                  >
                    Քանաքեռ-Զեյթուն
                  </option>
                </Form.Select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <span>Փողոց</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon1"
                      value={itemData.street}
                      onChange={(event) =>
                        setItemData((e) => ({
                          ...e,
                          street: event.target.value,
                        }))
                      }
                    />
                  </InputGroup>
                </div>
                <div>
                  <span>Շենք</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon1"
                      value={itemData.building}
                      onChange={(event) =>
                        setItemData((e) => ({
                          ...e,
                          building: event.target.value,
                        }))
                      }
                    />
                  </InputGroup>
                </div>
                <div>
                  <span>Բնակարան</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      value={itemData.flat}
                      onChange={(event) =>
                        setItemData((e) => ({ ...e, flat: event.target.value }))
                      }
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
            {streetName !== "" && (
              <SelectStreetPanel
                streetName={streetName}
                region={region}
                onSelect={(street) => setStreetName(street)}
              />
            )}
            <hr />
            <div className="form-panel">
              <h5 className="h_header">Շենքի մասին</h5>
              <div>
                <span>Շենքի տիպ</span>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      type_of_building: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"panel"}
                    selected={itemData.type_of_building === "panel"}
                  >
                    Պանելային
                  </option>
                  <option
                    value={"stone"}
                    selected={itemData.type_of_building === "stone"}
                  >
                    Քարե
                  </option>
                  <option
                    value={"monolith"}
                    selected={itemData.type_of_building === "monolith"}
                  >
                    Մոնոլիտ
                  </option>
                  <option
                    value={"new"}
                    selected={itemData.type_of_building === "new"}
                  >
                    Նորակառույց
                  </option>
                </Form.Select>
              </div>
              <div>
                <Form.Check
                  type="switch"
                  id="elevator-switch"
                  label="Ունի վերելակ"
                  checked={itemData.elevator}
                  onChange={(event) =>
                    setItemData((e) => ({ ...e, elevator: event.target.value }))
                  }
                />
              </div>
              <div>
                <Form.Check
                  type={"checkbox"}
                  id={`check1`}
                  label={`Դոմոֆոն`}
                  value={"Դոմոֆոն"}
                  checked={itemData.facilities_in_the_building.includes("Դոմոֆոն")}
                  onChange={
                    itemData.facilities_in_the_building.includes("Դոմոֆոն")
                      ? onRemoveFac
                      : onAddFac
                  }
                />

                <Form.Check
                  type={"checkbox"}
                  id={`check2`}
                  label={`Դռնապահ`}
                  value={"Դռնապահ"}
                  checked={itemData.facilities_in_the_building.includes("Դռնապահ")}
                  onChange={
                    itemData.facilities_in_the_building.includes("Դռնապահ")
                      ? onRemoveFac
                      : onAddFac
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`check3`}
                  label={`Խաղահրապարակ`}
                  value={`Խաղահրապարակ`}
                  checked={itemData.facilities_in_the_building.includes("Խաղահրապարակ")}
                  onChange={
                    itemData.facilities_in_the_building.includes("Խաղահրապարակ")
                      ? onRemoveFac
                      : onAddFac
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`check4`}
                  label={`Բացօթյա կայանատեղի`}
                  value={`Բացօթյա կայանատեղի`}
                  checked={itemData.facilities_in_the_building.includes("Բացօթյա կայանատեղի")}
                  onChange={
                    itemData.facilities_in_the_building.includes("Բացօթյա կայանատեղի")
                      ? onRemoveFac
                      : onAddFac
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`check5`}
                  label={`Ծածկապատ կայանատեղի`}
                  value={`Ծածկապատ կայանատեղի`}
                  checked={itemData.facilities_in_the_building.includes("Ծածկապատ կայանատեղի")}
                  onChange={
                    itemData.facilities_in_the_building.includes("Ծածկապատ կայանատեղի")
                      ? onRemoveFac
                      : onAddFac
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`check6`}
                  label={`Ավտոտնակ`}
                  value={`Ավտոտնակ`}
                  checked={itemData.facilities_in_the_building.includes("Ավտոտնակ")}
                  onChange={
                    itemData.facilities_in_the_building.includes("Ավտոտնակ")
                      ? onRemoveFac
                      : onAddFac
                  }
                />
              </div>
            </div>
            <hr />
            <div className="form-panel">
              <h5 className="h_header">Գույքի մասին</h5>
              <div>
                <span>Մակերես</span>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon2"
                    value={itemData.area}
                    onChange={(event) =>
                      setItemData((e) => ({ ...e, area: event.target.value }))
                    }
                  />
                  <InputGroup.Text id="basic-addon2">ք․ մ․</InputGroup.Text>
                </InputGroup>
              </div>
              <div>
                <span>Սենյակների քանակ</span>
                <Form.Select
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      number_of_rooms: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"1"}
                    selected={itemData.number_of_rooms === "1"}
                  >
                    1
                  </option>
                  <option
                    value={"2"}
                    selected={itemData.number_of_rooms === "2"}
                  >
                    2
                  </option>
                  <option
                    value={"3"}
                    selected={itemData.number_of_rooms === "3"}
                  >
                    3
                  </option>
                  <option
                    value={"4"}
                    selected={itemData.number_of_rooms === "4"}
                  >
                    4
                  </option>
                  <option
                    value={"5"}
                    selected={itemData.number_of_rooms === "5"}
                  >
                    5
                  </option>
                  <option
                    value={"6"}
                    selected={itemData.number_of_rooms === "6"}
                  >
                    6
                  </option>
                  <option
                    value={"7"}
                    selected={itemData.number_of_rooms === "7"}
                  >
                    7
                  </option>
                  <option
                    value={"8"}
                    selected={itemData.number_of_rooms === "8"}
                  >
                    8
                  </option>
                  <option
                    value={"9"}
                    selected={itemData.number_of_rooms === "9"}
                  >
                    9
                  </option>
                  <option
                    value={"10"}
                    selected={itemData.number_of_rooms === "10"}
                  >
                    10
                  </option>
                  <option
                    value={"11"}
                    selected={itemData.number_of_rooms === "11"}
                  >
                    11
                  </option>
                  <option
                    value={"12+"}
                    selected={itemData.number_of_rooms === "12+"}
                  >
                    12+
                  </option>
                </Form.Select>
              </div>
              <div>
                <span>Սանհանգույցների քանակ</span>
                <Form.Select
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      number_of_bathrooms: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"1"}
                    selected={itemData.number_of_bathrooms === "1"}
                  >
                    1
                  </option>
                  <option
                    value={"2"}
                    selected={itemData.number_of_bathrooms === "2"}
                  >
                    2
                  </option>
                  <option
                    value={"3+"}
                    selected={itemData.number_of_bathrooms === "3+"}
                  >
                    3+
                  </option>
                </Form.Select>
              </div>
              <div>
                <span>Առաստաղի բարձրություն</span>
                <Form.Select
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      ceiling_height: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"2,5"}
                    selected={itemData.ceiling_height === "2,5"}
                  >
                    2,5 մ
                  </option>
                  <option
                    value={"2,6"}
                    selected={itemData.ceiling_height === "2,6"}
                  >
                    2,6 մ
                  </option>
                  <option
                    value={"2,7"}
                    selected={itemData.ceiling_height === "2,7"}
                  >
                    2,7 մ
                  </option>
                  <option
                    value={"2,75"}
                    selected={itemData.ceiling_height === "2,75"}
                  >
                    2,75 մ
                  </option>
                  <option
                    value={"2,8"}
                    selected={itemData.ceiling_height === "2,8"}
                  >
                    2,8 մ
                  </option>
                  <option
                    value={"3"}
                    selected={itemData.ceiling_height === "3"}
                  >
                    3 մ
                  </option>
                  <option
                    value={"3,2"}
                    selected={itemData.ceiling_height === "3,2"}
                  >
                    3,2 մ
                  </option>
                  <option
                    value={"3,5"}
                    selected={itemData.ceiling_height === "3,5"}
                  >
                    3,5 մ
                  </option>
                </Form.Select>
              </div>
              <div>
                <span>Հարկայնություն</span>
                <Form.Select>{add_floor()}</Form.Select>
              </div>
              <div>
                <span>Հարկ</span>
                <Form.Select>{add_floor()}</Form.Select>
              </div>
              <div>
                <span>Պատշգամբ</span>
                <Form.Select
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      balcony: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"Առկա չէ"}
                    selected={itemData.balcony === "Առկա չէ"}
                  >
                    Առկա չէ
                  </option>
                  <option
                    value={"Բաց պատշգամբ"}
                    selected={itemData.balcony === "Բաց պատշգամբ"}
                  >
                    Բաց պատշգամբ
                  </option>
                  <option
                    value={"Փակ պատշգամբ"}
                    selected={itemData.balcony === "Փակ պատշգամբ"}
                  >
                    Փակ պատշգամբ
                  </option>
                  <option
                    value={"Մի քանի պատշգամբ"}
                    selected={itemData.balcony === "Մի քանի պատշգամբ"}
                  >
                    Մի քանի պատշգամբ
                  </option>
                </Form.Select>
              </div>
              <div>
                <span>Կահույք</span>
                <Form.Select
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      furniture: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"Առկա չէ"}
                    selected={itemData.furniture === "Առկա չէ"}
                  >
                    Առկա չէ
                  </option>
                  <option
                    value={"Առկա է"}
                    selected={itemData.furniture === "Առկա է"}
                  >
                    Առկա է
                  </option>
                  <option
                    value={"Մասնակի կահույք"}
                    selected={itemData.furniture === "Մասնակի կահույք"}
                  >
                    Մասնակի կահույք
                  </option>
                  <option
                    value={"Համաձայնությամբ"}
                    selected={itemData.furniture === "Համաձայնությամբ"}
                  >
                    Համաձայնությամբ
                  </option>
                </Form.Select>
              </div>
              <div>
                <span>Կարգավիճակ</span>
                <Form.Select
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      status: event.target.value,
                    }))
                  }
                >
                  <option
                    value={"Վերանորոգված"}
                    selected={itemData.status === "Վերանորոգված"}
                  >
                    Վերանորոգված
                  </option>
                  <option
                    value={"Զրոյական"}
                    selected={itemData.status === "Զրոյական"}
                  >
                    Զրոյական
                  </option>
                  <option value={"Լավ"} selected={itemData.status === "Լավ"}>
                    Լավ
                  </option>
                  <option
                    value={"Դիզայներական ոճ"}
                    selected={itemData.status === "Դիզայներական ոճ"}
                  >
                    Դիզայներական ոճ
                  </option>
                </Form.Select>
              </div>
              <div>
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences1`}
                  label={`Օդորակիչ`}
                  value={"Օդորակիչ"}
                  checked={itemData.conveniences.includes("Օդորակիչ")}
                  onChange={
                    itemData.conveniences.includes("Օդորակիչ")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences2`}
                  label={`Սառնարան`}
                  value={"Սառնարան"}
                  checked={itemData.conveniences.includes("Սառնարան")}
                  onChange={
                    itemData.conveniences.includes("Սառնարան")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences3`}
                  label={`Սալօջախ`}
                  value={"Սալօջախ"}
                  checked={itemData.conveniences.includes("Սալօջախ")}
                  onChange={
                    itemData.conveniences.includes("Սալօջախ")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences4`}
                  label={`Աման լվացող մեքենա`}
                  value={"Աման լվացող մեքենա"}
                  checked={itemData.conveniences.includes("Աման լվացող մեքենա")}
                  onChange={
                    itemData.conveniences.includes("Աման լվացող մեքենա")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences5`}
                  label={`Լվացքի մեքենա`}
                  value={"Լվացքի մեքենա"}
                  checked={itemData.conveniences.includes("Լվացքի մեքենա")}
                  onChange={
                    itemData.conveniences.includes("Լվացքի մեքենա")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences6`}
                  label={`Չորացնող մեքենա`}
                  value={"Չորացնող մեքենա"}
                  checked={itemData.conveniences.includes("Չորացնող մեքենա")}
                  onChange={
                    itemData.conveniences.includes("Չորացնող մեքենա")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences7`}
                  label={`Տեսարան դեպի բակ`}
                  value={"Տեսարան դեպի բակ"}
                  checked={itemData.conveniences.includes("Տեսարան դեպի բակ")}
                  onChange={
                    itemData.conveniences.includes("Տեսարան դեպի բակ")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences8`}
                  label={`Տեսարան դեպի փողոց`}
                  value={"Տեսարան դեպի փողոց"}
                  checked={itemData.conveniences.includes("Տեսարան դեպի փողոց")}
                  onChange={
                    itemData.conveniences.includes("Տեսարան դեպի փողոց")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
                <Form.Check
                  type={"checkbox"}
                  id={`conveniences9`}
                  label={`Տեսարան դեպի քաղաք`}
                  value={"Տեսարան դեպի քաղաք"}
                  checked={itemData.conveniences.includes("Տեսարան դեպի քաղաք")}
                  onChange={
                    itemData.conveniences.includes("Տեսարան դեպի քաղաք")
                      ? onRemoveCon
                      : onAddCon
                  }
                />
              </div>
            </div>
            <hr />
            <div className="form-panel">
              <h5 className="h_header">Գին</h5>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Արժեքը դոլարով"
                  value={itemData.price}
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      price: event.target.value,
                    }))
                  }
                />
              </InputGroup>
            </div>
            <div className="form-panel">
              <h5 className="h_header">Տեղեկություն</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Նկարագիր"
                  style={{ height: "140px" }}
                  value={itemData.description}
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      description: event.target.value,
                    }))
                  }
                />
                <div
                  style={{
                    border: "2px solid #0D6EFDFF",
                    borderRadius: "7px",
                    padding: "10px",
                    marginTop: "15px",
                  }}
                >
                  <p>Չի երևում հաճախորդին</p>
                  <Form.Control
                    as="textarea"
                    placeholder="Նկարագիր (Չի երևում հաճախորդին)"
                    style={{ height: "140px" }}
                    value={itemData.description_hidden}
                    onChange={(event) =>
                      setItemData((e) => ({
                        ...e,
                        description_hidden: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="item-images-panel">
              {itemImages.map((x, index) => {
                return (
                  <div
                    draggable={true}
                    key={x.id}
                    className="img-box"
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <button
                      className="delete_img_btn"
                      onClick={(evn) => {
                        evn.preventDefault();
                        setItemImages(
                          itemImages.filter((image) => image.id !== x.id)
                        );
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                    <img src={`https://service.homely.am/storage/images/${x.image}`} width={"100%"} />
                    <input type={"checkbox"} />
                  </div>
                );
              })}
            </div>
            <div className="form-panel">
              <div>
                <Button variant="primary" style={{ cursor: "pointer" }}>
                  <label
                    htmlFor="item_img"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <AiOutlineFileImage />
                    <span>Գույքի նկար</span>
                  </label>
                </Button>
                {/* <input
                  type="file"
                  id="item_img"
                  onChange={(evn) => {
                    setItems(evn.target.files);
                  }}
                  accept="image/*"
                  multiple={true}
                  required={true}
                /> */}
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="YouTube հղում"
                  type="url"
                  aria-describedby="basic-addon2"
                  value={itemData.video_url === 'null' ? '' : itemData.video_url}
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      video_url: event.target.value,
                    }))
                  }
                />
              </InputGroup>
              <div>
                <input
                  type="radio"
                  id="exclusive"
                  value={"Էքսկլյուզիվ"}
                  style={{ marginRight: "10px" }}
                  checked={itemData.proposal === "Էքսկլյուզիվ"}
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      proposal: event.target.value,
                    }))
                  }
                />
                <label htmlFor="exclusive">Էքսկլյուզիվ</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="hatuk"
                  value={"Հատուկ առաջարկ"}
                  style={{ marginRight: "10px" }}
                  checked={itemData.proposal === "Հատուկ առաջարկ"}
                  onChange={(event) =>
                    setItemData((e) => ({
                      ...e,
                      proposal: event.target.value,
                    }))
                  }
                />
                <label htmlFor="hatuk">Հատուկ առաջարկ</label>
              </div>
              <div>
                <Form.Check
                  type="switch"
                  id="elevator-switch"
                  label="Նկարված է"
                  checked={itemData.drawn}
                />
              </div>
            </div>
            <Button
              disabled={disableBtn}
              variant="secondary"
              style={{ marginTop: "15px" }}
              type="submit"
              // onClick={() => setDisableBtn(true)}
            >
              Փոփոխել
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangeItem;
