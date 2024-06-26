import React, { useEffect, useState } from "react";
import "./add-item.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import SuccessAlert from "../success-alert/SuccessAlert";
import SelectStreetPanel from "../select-street-panel/SelectStreetPanel";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const AddItem = ({ userData }) => {
  const navigate = useNavigate();

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Գույքը ավելացվել է",
      icon: "success",
    });
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

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

  const [streetName, setStreetName] = useState("");
  const [region, setRegion] = useState("Աջափնյակ");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [adminId, setAdminId] = useState(() => {
    if (userData.type === "manager") {
      return 82
    }else {
      return userData.id
    }
  });
  const [marz, setMarz] = useState("yerevan");
  const [type, setType] = useState("rent");
  const [itemType, setItemType] = useState("Բնակարան");

  const onSubmit = async (data) => {
    const formData = new FormData();
    data = { ...data, adminid: adminId, street: streetName, type: type, item_type: itemType };

    items.forEach((el, index) => {
      formData.append(`file${index}`, el);
    });
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setShowLoading(true);
      const { data } = await axios.post(
        `https://service.homely.am/api/admin/create/item`,
        formData
      );
      setShowSuccessAlert(data);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
      showSwal();
      navigate("/");
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

  const [broker, setBrokers] = useState([])

  useEffect(() => {
    const get_all_brokers = async () => {
      try {
        const { data } = await axios.get(
          "https://service.homely.am/api/admin/get_all"
        );
        setBrokers(data.data.filter((el) => el.type == "broker"));
        setAdminId(broker[0].id);
      } catch (error) {
        console.log(error);
      }
    };
    if (userData.type === "manager") {
      get_all_brokers();
    }
  }, []);


  return (
    <>
      <div className="add_item_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h4>Գույքի տեսակ</h4>
            <div className="select_type">
              <div>
                <label htmlFor="type__1">Բնակարան</label>
                <input
                  id="type__1"
                  type="radio"
                  value={"Բնակարան"}
                  name="item_status"
                  onClick={(evn) => setItemType(() => evn.target.value)}
                />
              </div>
              <div>
                <label htmlFor="type__2">Առանձնատուն</label>
                <input
                  id="type__2"
                  type="radio"
                  value={"Առանձնատուն"}
                  name="item_status"
                  onClick={(evn) => setItemType(() => evn.target.value)}
                />
              </div>
              <div>
                <label htmlFor="type__3">Կոմերցիոն</label>
                <input
                  id="type__3"
                  type="radio"
                  value={"Կոմերցիոն"}
                  name="item_status"
                  onClick={(evn) => setItemType(() => evn.target.value)}
                />
              </div>
              <div>
                <label htmlFor="type__4">Հողատարածք</label>
                <input
                  id="type__4"
                  type="radio"
                  value={"Հողատարածք"}
                  name="item_status"
                  onClick={(evn) => setItemType(() => evn.target.value)}
                />
              </div>
            </div>
          </div>
          <hr />
          <h5 className="h_header">Գործակալ</h5>
          {userData.type === "manager" && (
            <>
              <Form.Select
                style={{ marginBottom: "17px" }}
                className="form-panel"
                aria-label="Default select example"
                onChange={(evn) => setAdminId(Number(evn.target.value))}
              >
                {broker.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name} {el.surname}
                    </option>
                  );
                })}
              </Form.Select>
            </>
          )}
          {itemType === "Բնակարան" ? (
            <>
              <div className="form-panel">
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Անուն Ազգանուն (գույքի տեր)"
                    {...register("owner_name")}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Հեռ․ համար (գույքի տեր)"
                    {...register("owner_phone")}
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
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_2">Վարձակալություն</label>
                    <input
                      id="type_2"
                      type="radio"
                      value={"rent"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_3">Վաճառք և Վարձակալություն</label>
                    <input
                      id="type_3"
                      type="radio"
                      value={"rent_and_sell"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
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
                    onChange={(evn) => setMarz(() => evn.target.value)}
                  >
                    <option value={"yerevan"}>Երևան</option>
                    <option value={"kotayk"}>Կոտայք</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Շրջան</span>
                  {marz === "yerevan" ? (
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(evn) => setRegion(evn.target.value)}
                      selected={"Աջափնյակ"}
                      {...register("region", { required: true })}
                    >
                      <option value="Աջափնյակ" selected={true}>
                        Աջափնյակ
                      </option>
                      <option value="Ավան">Ավան</option>
                      <option value="Արաբկիր">Արաբկիր</option>
                      <option value="Դավթաշեն">Դավթաշեն</option>
                      <option value="Էրեբունի">Էրեբունի</option>
                      <option value="Կենտրոն">Կենտրոն</option>
                      <option value="Փոքր կենտրոն">Փոքր կենտրոն</option>
                      <option value="Մալաթիա-Սեբաստիա">Մալաթիա-Սեբաստիա</option>
                      <option value="Նոր Նորք">Նոր Նորք</option>
                      <option value="Նորք-Մարաշ">Նորք-Մարաշ</option>
                      <option value="Նուբարաշեն">Նուբարաշեն</option>
                      <option value="Շենգավիթ">Շենգավիթ</option>
                      <option value="Քանաքեռ-Զեյթուն">Քանաքեռ-Զեյթուն</option>
                    </Form.Select>
                  ) : (
                    <>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(evn) => setRegion(evn.target.value)}
                        {...register("region", { required: true })}
                      >
                        <option value="Աբովյան" selected>
                          Աբովյան
                        </option>
                        <option value="Աղվերան">Աղվերան</option>
                        <option value="Ակունք">Ակունք</option>
                        <option value="Ալափարս">Ալափարս</option>
                        <option value="Արագյուղ">Արագյուղ</option>
                        <option value="Արամուս">Արամուս</option>
                        <option value="Արգել">Արգել</option>
                        <option value="Առինջ">Առինջ</option>
                        <option value="Արզական">Արզական</option>
                        <option value="Արզնի">Արզնի</option>
                        <option value="Բալահովիտ">Բալահովիտ</option>
                        <option value="Բջնի">Բջնի</option>
                        <option value="Բյուրեղավան">Բյուրեղավան</option>
                        <option value="Չարենցավան">Չարենցավան</option>
                        <option value="Ձորաղբյուր">Ձորաղբյուր</option>
                        <option value="Գառնի">Գառնի</option>
                        <option value="Հրազդան">Հրազդան</option>
                        <option value="Պտղնի">Պտղնի</option>
                        <option value="Սոլակ">Սոլակ</option>
                        <option value="Ծաղկաձոր">Ծաղկաձոր</option>
                        <option value="Վերին Պտղնի">Վերին Պտղնի</option>
                        <option value="Եղվարդ">Եղվարդ</option>
                        <option value="Զորավան">Զորավան</option>
                        <option value="Զովք">Զովք</option>
                        <option value="Զովունի">Զովունի</option>
                        <option value="Ֆանտան">Ֆանտան</option>
                        <option value="Զովաշեն">Զովաշեն</option>
                      </Form.Select>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div>
                    <span>Փողոց</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        value={streetName}
                        onChange={(evn) => setStreetName(evn.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div>
                    <span>Շենք</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        {...register("building", { required: true })}
                      />
                    </InputGroup>
                  </div>
                  <div>
                    <span>Բնակարան</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        {...register("flat", { required: true })}
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
              {streetName !== "" && (
                <SelectStreetPanel
                  streetName={streetName}
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
                    {...register("type_of_building", { required: true })}
                  >
                    <option value={"panel"}>Պանելային</option>
                    <option value={"stone"}>Քարե</option>
                    <option value={"monolith"}>Մոնոլիտ</option>
                    <option value={"new"}>Նորակառույց</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`check1`}
                    label={`Դոմոֆոն`}
                    value={"Դոմոֆոն"}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check2`}
                    label={`Դռնապահ`}
                    value={"Դռնապահ"}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check3`}
                    label={`Խաղահրապարակ`}
                    value={`Խաղահրապարակ`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check4`}
                    label={`Բացօթյա կայանատեղի`}
                    value={`Բացօթյա կայանատեղի`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check5`}
                    label={`Ծածկապատ կայանատեղի`}
                    value={`Ծածկապատ կայանատեղի`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Ավտոտնակ`}
                    value={`Ավտոտնակ`}
                    {...register("facilities_in_the_building")}
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
                      {...register("area", { required: true })}
                    />
                    <InputGroup.Text id="basic-addon2">ք․ մ․</InputGroup.Text>
                  </InputGroup>
                </div>
                <div>
                  <span>Սենյակների քանակ</span>
                  <Form.Select
                    {...register("number_of_rooms", { required: true })}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                    <option value={"11"}>11</option>
                    <option value={"12+"}>12+</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Սանհանգույցների քանակ</span>
                  <Form.Select
                    {...register("number_of_bathrooms", { required: true })}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3+</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Առաստաղի բարձրություն</span>
                  <Form.Select
                    {...register("ceiling_height", { required: true })}
                  >
                    <option value={"2,5"}>2,5 մ</option>
                    <option value={"2,6"}>2,6 մ</option>
                    <option value={"2,7"}>2,7 մ</option>
                    <option value={"2,75"}>2,75 մ</option>
                    <option value={"2,8"}>2,8 մ</option>
                    <option value={"3"}>3 մ</option>
                    <option value={"3,2"}>3,2 մ</option>
                    <option value={"3,5"}>3,5 մ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Հարկայնություն</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon1"
                      {...register("number_of_floors")}
                    />
                  </InputGroup>
                </div>
                <div>
                  <span>Հարկ</span>
                  <Form.Select {...register("floor", { required: true })}>
                    {add_floor()}
                  </Form.Select>
                </div>
                <div>
                  <span>Պատշգամբ</span>
                  <Form.Select {...register("balcony")}>
                    <option value={"Առկա չէ"}>Առկա չէ</option>
                    <option value={"Բաց պատշգամբ"}>Բաց պատշգամբ</option>
                    <option value={"Փակ պատշգամբ"}>Փակ պատշգամբ</option>
                    <option value={"Մի քանի պատշգամբ"}>Մի քանի պատշգամբ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Կահույք</span>
                  <Form.Select {...register("furniture", { required: true })}>
                    <option value={"Առկա չէ"}>Առկա չէ</option>
                    <option value={"Առկա է"}>Առկա է</option>
                    <option value={"Մասնակի կահույք"}>Մասնակի կահույք</option>
                    <option value={"Համաձայնությամբ"}>Համաձայնությամբ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Կարգավիճակ</span>
                  <Form.Select {...register("status", { required: true })}>
                    <option value={"Չվերանորոգված"}>Չվերանորոգված</option>
                    <option value={"Հին վերանորոգում"}>Հին վերանորոգում</option>
                    <option value={"Եվրովերանորոգված"}>Եվրովերանորոգված</option>
                    <option value={"Դիզայներական ոճ"}>Դիզայներական ոճ</option>
                    <option value={"Կապիտալ վերանորոգված"}>Կապիտալ վերանորոգված</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences1`}
                    label={`Օդորակիչ`}
                    value={"Օդորակիչ"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences2`}
                    label={`Սառնարան`}
                    value={"Սառնարան"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences3`}
                    label={`Սալօջախ`}
                    value={"Սալօջախ"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences4`}
                    label={`Աման լվացող մեքենա`}
                    value={"Աման լվացող մեքենա"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences5`}
                    label={`Լվացքի մեքենա`}
                    value={"Լվացքի մեքենա"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences6`}
                    label={`Չորացնող մեքենա`}
                    value={"Չորացնող մեքենա"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences7`}
                    label={`Տեսարան դեպի բակ`}
                    value={"Տեսարան դեպի բակ"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences8`}
                    label={`Տեսարան դեպի փողոց`}
                    value={"Տեսարան դեպի փողոց"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences9`}
                    label={`Տեսարան դեպի քաղաք`}
                    value={"Տեսարան դեպի քաղաք"}
                    {...register("conveniences")}
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
                    {...register("price")}
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
                    {...register("description")}
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
                      {...register("description_hidden")}
                    />
                  </div>
                </div>
              </div>
              <div className="item-images-panel">
                {items.map((el, index) => {
                  return (
                    <div
                      draggable={true}
                      key={el.id}
                      className="img-box"
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <button
                        className="delete_img_btn"
                        onClick={(evn) => {
                          evn.preventDefault();
                          setItems(
                            items.filter((image) => image.name !== el.name)
                          );
                        }}
                      >
                        <AiOutlineClose />
                      </button>
                      <img src={URL.createObjectURL(el)} width={"100%"} />
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
                  <input
                    type="file"
                    id="item_img"
                    onChange={(evn) => {
                      setItems([...items, ...evn.target.files]);
                    }}
                    multiple
                    accept="image/*"
                    required={true}
                  />
                </div>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="YouTube հղում"
                    type="url"
                    aria-describedby="basic-addon2"
                    {...register("video_url", { required: false })}
                  />
                </InputGroup>
                <div>
                  <input
                    type="radio"
                    id="exclusive"
                    value={"exclusive"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="exclusive">Էքսկլյուզիվ</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="hatuk"
                    value={"special"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="hatuk">Հատուկ առաջարկ</label>
                </div>
                <div>
                  <Form.Check
                    type="checkbox"
                    id="elevator-switch"
                    label="Նկարված է"
                    {...register("is_drown")}
                  />
                </div>
              </div>
              <Button
                disabled={showLoading}
                variant="success"
                style={{ marginTop: "15px" }}
                type="submit"
              >
                Ավելացնել
              </Button>
            </>
          ) : itemType === "Առանձնատուն" ? (
            <>
              <div className="form-panel">
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Անուն Ազգանուն (գույքի տեր)"
                    {...register("owner_name")}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Հեռ․ համար"
                    {...register("owner_phone")}
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
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_2">Վարձակալություն</label>
                    <input
                      id="type_2"
                      type="radio"
                      value={"rent"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_3">Վաճառք և Վարձակալություն</label>
                    <input
                      id="type_3"
                      type="radio"
                      value={"rent_and_sell"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
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
                    onChange={(evn) => setMarz(() => evn.target.value)}
                  >
                    <option value={"yerevan"}>Երևան</option>
                    <option value={"kotayk"}>Կոտայք</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Շրջան</span>
                  {marz === "yerevan" ? (
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(evn) => setRegion(evn.target.value)}
                      selected={"Աջափնյակ"}
                      {...register("region", { required: true })}
                    >
                      <option value="Աջափնյակ" selected={true}>
                        Աջափնյակ
                      </option>
                      <option value="Ավան">Ավան</option>
                      <option value="Արաբկիր">Արաբկիր</option>
                      <option value="Դավթաշեն">Դավթաշեն</option>
                      <option value="Էրեբունի">Էրեբունի</option>
                      <option value="Կենտրոն">Կենտրոն</option>
                      <option value="Փոքր կենտրոն">Փոքր կենտրոն</option>
                      <option value="Մալաթիա-Սեբաստիա">Մալաթիա-Սեբաստիա</option>
                      <option value="Նոր Նորք">Նոր Նորք</option>
                      <option value="Նորք-Մարաշ">Նորք-Մարաշ</option>
                      <option value="Նուբարաշեն">Նուբարաշեն</option>
                      <option value="Շենգավիթ">Շենգավիթ</option>
                      <option value="Քանաքեռ-Զեյթուն">Քանաքեռ-Զեյթուն</option>
                    </Form.Select>
                  ) : (
                    <>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(evn) => setRegion(evn.target.value)}
                        {...register("region", { required: true })}
                      >
                        <option value="Աբովյան" selected>
                          Աբովյան
                        </option>
                        <option value="Աղվերան">Աղվերան</option>
                        <option value="Ակունք">Ակունք</option>
                        <option value="Ալափարս">Ալափարս</option>
                        <option value="Արագյուղ">Արագյուղ</option>
                        <option value="Արամուս">Արամուս</option>
                        <option value="Արգել">Արգել</option>
                        <option value="Առինջ">Առինջ</option>
                        <option value="Արզական">Արզական</option>
                        <option value="Արզնի">Արզնի</option>
                        <option value="Բալահովիտ">Բալահովիտ</option>
                        <option value="Բջնի">Բջնի</option>
                        <option value="Բյուրեղավան">Բյուրեղավան</option>
                        <option value="Չարենցավան">Չարենցավան</option>
                        <option value="Ձորաղբյուր">Ձորաղբյուր</option>
                        <option value="Գառնի">Գառնի</option>
                        <option value="Հրազդան">Հրազդան</option>
                        <option value="Պտղնի">Պտղնի</option>
                        <option value="Սոլակ">Սոլակ</option>
                        <option value="Ծաղկաձոր">Ծաղկաձոր</option>
                        <option value="Վերին Պտղնի">Վերին Պտղնի</option>
                        <option value="Եղվարդ">Եղվարդ</option>
                        <option value="Զորավան">Զորավան</option>
                        <option value="Զովք">Զովք</option>
                        <option value="Զովունի">Զովունի</option>
                        <option value="Ֆանտան">Ֆանտան</option>
                        <option value="Զովաշեն">Զովաշեն</option>
                      </Form.Select>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div>
                    <span>Փողոց</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        value={streetName}
                        onChange={(evn) => setStreetName(evn.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div>
                    <span>Շենք</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        {...register("building", { required: true })}
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
              {streetName !== "" && (
                <SelectStreetPanel
                  streetName={streetName}
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
                    {...register("type_of_building", { required: true })}
                  >
                    <option value={"panel"}>Պանելային</option>
                    <option value={"stone"}>Քարե</option>
                    <option value={"monolith"}>Մոնոլիտ</option>
                    <option value={"new"}>Նորակառույց</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Տեսակ</span>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("type_of_building", { required: true })}
                  >
                    <option value={"panel"}>Տուն</option>
                    <option value={"stone"}>Թաունհաուզ</option>
                    <option value={"monolith"}>Ամառանոց</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Վիճակ</span>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("type_of_building", { required: true })}
                  >
                    <option value={"panel"}>Կառուցված</option>
                    <option value={"stone"}>Անավարտ</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`check5`}
                    label={`Լողավազան`}
                    value={`Լողավազան`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Սաունա`}
                    value={`Սաունա`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Բուխարի`}
                    value={`Բուխարի`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Խորովածի վառարան`}
                    value={`Խորովածի վառարան`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Անվտանգության համակարգ`}
                    value={`Անվտանգության համակարգ`}
                    {...register("facilities_in_the_building")}
                  />
                </div>
              </div>
              <hr />
              <div className="form-panel">
                <h5 className="h_header">Գույքի մասին</h5>
                <div>
                  <span>Տան մակերես</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon2"
                      {...register("area", { required: true })}
                    />
                    <InputGroup.Text id="basic-addon2">ք․ մ․</InputGroup.Text>
                  </InputGroup>
                </div>
                <div>
                  <span>Հողատարածքի մակերես</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon2"
                      {...register("area_plot_own_house", { required: true })}
                    />
                    <InputGroup.Text id="basic-addon2">ք․ մ․</InputGroup.Text>
                  </InputGroup>
                </div>
                <div>
                  <span>Սենյակների քանակ</span>
                  <Form.Select
                    {...register("number_of_rooms", { required: true })}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                    <option value={"11"}>11</option>
                    <option value={"12+"}>12+</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Սանհանգույցների քանակ</span>
                  <Form.Select
                    {...register("number_of_bathrooms", { required: true })}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3+</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Առաստաղի բարձրություն</span>
                  <Form.Select
                    {...register("ceiling_height", { required: true })}
                  >
                    <option value={"2,5"}>2,5 մ</option>
                    <option value={"2,6"}>2,6 մ</option>
                    <option value={"2,7"}>2,7 մ</option>
                    <option value={"2,75"}>2,75 մ</option>
                    <option value={"2,8"}>2,8 մ</option>
                    <option value={"3"}>3 մ</option>
                    <option value={"3,2"}>3,2 մ</option>
                    <option value={"3,5"}>3,5 մ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Հարկայնություն</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon1"
                      {...register("number_of_floors")}
                    />
                  </InputGroup>
                </div>
                {/* <div>
                  <span>Հարկ</span>
                  <Form.Select {...register("floor", { required: true })}>
                    {add_floor()}
                  </Form.Select>
                </div> */}
                <div>
                  <span>Պատշգամբ</span>
                  <Form.Select {...register("balcony")}>
                    <option value={"Առկա չէ"}>Առկա չէ</option>
                    <option value={"Բաց պատշգամբ"}>Բաց պատշգամբ</option>
                    <option value={"Փակ պատշգամբ"}>Փակ պատշգամբ</option>
                    <option value={"Մի քանի պատշգամբ"}>Մի քանի պատշգամբ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Կահույք</span>
                  <Form.Select {...register("furniture", { required: true })}>
                    <option value={"Առկա չէ"}>Առկա չէ</option>
                    <option value={"Առկա է"}>Առկա է</option>
                    <option value={"Մասնակի կահույք"}>Մասնակի կահույք</option>
                    <option value={"Համաձայնությամբ"}>Համաձայնությամբ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Կարգավիճակ</span>
                  <Form.Select {...register("status", { required: true })}>
                    <option value={"Չվերանորոգված"}>Չվերանորոգված</option>
                    <option value={"Հին վերանորոգում"}>Հին վերանորոգում</option>
                    <option value={"Եվրովերանորոգված"}>Եվրովերանորոգված</option>
                    <option value={"Դիզայներական ոճ"}>Դիզայներական ոճ</option>
                    <option value={"Կապիտալ վերանորոգված"}>Կապիտալ վերանորոգված</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences1`}
                    label={`Օդորակիչ`}
                    value={"Օդորակիչ"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences2`}
                    label={`Սառնարան`}
                    value={"Սառնարան"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences3`}
                    label={`Սալօջախ`}
                    value={"Սալօջախ"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences4`}
                    label={`Աման լվացող մեքենա`}
                    value={"Աման լվացող մեքենա"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences5`}
                    label={`Լվացքի մեքենա`}
                    value={"Լվացքի մեքենա"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences6`}
                    label={`Չորացնող մեքենա`}
                    value={"Չորացնող մեքենա"}
                    {...register("conveniences")}
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
                    {...register("price")}
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
                    {...register("description")}
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
                      {...register("description_hidden")}
                    />
                  </div>
                </div>
              </div>
              <div className="item-images-panel">
                {items.map((el, index) => {
                  return (
                    <div
                      draggable={true}
                      key={el.id}
                      className="img-box"
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <button
                        className="delete_img_btn"
                        onClick={(evn) => {
                          evn.preventDefault();
                          setItems(
                            items.filter((image) => image.name !== el.name)
                          );
                        }}
                      >
                        <AiOutlineClose />
                      </button>
                      <img src={URL.createObjectURL(el)} width={"100%"} />
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
                  <input
                    type="file"
                    id="item_img"
                    onChange={(evn) => {
                      setItems([...items, ...evn.target.files]);
                    }}
                    multiple
                    accept="image/*"
                    required={true}
                  />
                </div>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="YouTube հղում"
                    type="url"
                    aria-describedby="basic-addon2"
                    {...register("video_url", { required: false })}
                  />
                </InputGroup>
                <div>
                  <input
                    type="radio"
                    id="exclusive"
                    value={"exclusive"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="exclusive">Էքսկլյուզիվ</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="hatuk"
                    value={"special"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="hatuk">Հատուկ առաջարկ</label>
                </div>
                <div>
                  <Form.Check
                    type="checkbox"
                    id="elevator-switch"
                    label="Նկարված է"
                    {...register("is_drown")}
                  />
                </div>
              </div>
              <Button
                disabled={showLoading}
                variant="success"
                style={{ marginTop: "15px" }}
                type="submit"
              >
                Ավելացնել
              </Button>
            </>
          ) : itemType === "Կոմերցիոն" ? (
            <>
               <div className="form-panel">
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Անուն Ազգանուն (գույքի տեր)"
                    {...register("owner_name")}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Հեռ․ համար"
                    {...register("owner_phone")}
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
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_2">Վարձակալություն</label>
                    <input
                      id="type_2"
                      type="radio"
                      value={"rent"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_3">Վաճառք և Վարձակալություն</label>
                    <input
                      id="type_3"
                      type="radio"
                      value={"rent_and_sell"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
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
                    onChange={(evn) => setMarz(() => evn.target.value)}
                  >
                    <option value={"yerevan"}>Երևան</option>
                    <option value={"kotayk"}>Կոտայք</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Շրջան</span>
                  {marz === "yerevan" ? (
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(evn) => setRegion(evn.target.value)}
                      selected={"Աջափնյակ"}
                      {...register("region", { required: true })}
                    >
                      <option value="Աջափնյակ" selected={true}>
                        Աջափնյակ
                      </option>
                      <option value="Ավան">Ավան</option>
                      <option value="Արաբկիր">Արաբկիր</option>
                      <option value="Դավթաշեն">Դավթաշեն</option>
                      <option value="Էրեբունի">Էրեբունի</option>
                      <option value="Կենտրոն">Կենտրոն</option>
                      <option value="Փոքր կենտրոն">Փոքր կենտրոն</option>
                      <option value="Մալաթիա-Սեբաստիա">Մալաթիա-Սեբաստիա</option>
                      <option value="Նոր Նորք">Նոր Նորք</option>
                      <option value="Նորք-Մարաշ">Նորք-Մարաշ</option>
                      <option value="Նուբարաշեն">Նուբարաշեն</option>
                      <option value="Շենգավիթ">Շենգավիթ</option>
                      <option value="Քանաքեռ-Զեյթուն">Քանաքեռ-Զեյթուն</option>
                    </Form.Select>
                  ) : (
                    <>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(evn) => setRegion(evn.target.value)}
                        {...register("region", { required: true })}
                      >
                        <option value="Աբովյան" selected>
                          Աբովյան
                        </option>
                        <option value="Աղվերան">Աղվերան</option>
                        <option value="Ակունք">Ակունք</option>
                        <option value="Ալափարս">Ալափարս</option>
                        <option value="Արագյուղ">Արագյուղ</option>
                        <option value="Արամուս">Արամուս</option>
                        <option value="Արգել">Արգել</option>
                        <option value="Առինջ">Առինջ</option>
                        <option value="Արզական">Արզական</option>
                        <option value="Արզնի">Արզնի</option>
                        <option value="Բալահովիտ">Բալահովիտ</option>
                        <option value="Բջնի">Բջնի</option>
                        <option value="Բյուրեղավան">Բյուրեղավան</option>
                        <option value="Չարենցավան">Չարենցավան</option>
                        <option value="Ձորաղբյուր">Ձորաղբյուր</option>
                        <option value="Գառնի">Գառնի</option>
                        <option value="Հրազդան">Հրազդան</option>
                        <option value="Պտղնի">Պտղնի</option>
                        <option value="Սոլակ">Սոլակ</option>
                        <option value="Ծաղկաձոր">Ծաղկաձոր</option>
                        <option value="Վերին Պտղնի">Վերին Պտղնի</option>
                        <option value="Եղվարդ">Եղվարդ</option>
                        <option value="Զորավան">Զորավան</option>
                        <option value="Զովք">Զովք</option>
                        <option value="Զովունի">Զովունի</option>
                        <option value="Ֆանտան">Ֆանտան</option>
                        <option value="Զովաշեն">Զովաշեն</option>
                      </Form.Select>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div>
                    <span>Փողոց</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        value={streetName}
                        onChange={(evn) => setStreetName(evn.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div>
                    <span>Շենք</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        {...register("building", { required: true })}
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
              {streetName !== "" && (
                <SelectStreetPanel
                  streetName={streetName}
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
                    {...register("type_of_building", { required: true })}
                  >
                    <option value={"panel"}>Պանելային</option>
                    <option value={"stone"}>Քարե</option>
                    <option value={"monolith"}>Մոնոլիտ</option>
                    <option value={"new"}>Նորակառույց</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Տեսակ</span>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("type_of_commercial_premises", { required: true })}
                  >
                    <option value={"Գրասենյակային տարածք"}>Գրասենյակային տարածք</option>
                    <option value={"Առևտրային տարածք"}>Առևտրային տարածք</option>
                    <option value={"Արտադրական տարածք"}>Արտադրական տարածք</option>
                    <option value={"Պահեստ"}>Պահեստ</option>
                    <option value={"Ռեստորան"}>Ռեստորան</option>
                    <option value={"Ավտոսպասարկում"}>Ավտոսպասարկում</option>
                    <option value={"Շենք"}>Շենք</option>
                    <option value={"Հյուրանոց"}>Հյուրանոց</option>
                    <option value={"Բազմաֆունկցիոնալ գույք"}>Բազմաֆունկցիոնալ գույք</option>
                    <option value={"Գյուղատնտեսական գույք"}>Գյուղատնտեսական գույք</option>
                    <option value={"Այլ"}>Այլ</option>

                  </Form.Select>
                </div>
                <div>
                  <span>Վիճակ</span>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("own_home_condition", { required: true })}
                  >
                    <option value={"panel"}>Կառուցված</option>
                    <option value={"stone"}>Անավարտ</option>
                  </Form.Select> 
                </div>
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`check5`}
                    label={`Բացօթյա կայանատեղի`}
                    value={`Բացօթյա կայանատեղի`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Ծածկապատ կայանատեղի`}
                    value={`Ծածկապատ կայանատեղի`}
                    {...register("facilities_in_the_building")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Ավտոտնակ`}
                    value={`Ավտոտնակ`}
                    {...register("facilities_in_the_building")}
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
                      {...register("area", { required: true })}
                    />
                    <InputGroup.Text id="basic-addon2">ք․ մ․</InputGroup.Text>
                  </InputGroup>
                </div>
                <div>
                  <span>Սենյակների քանակ</span>
                  <Form.Select
                    {...register("number_of_rooms", { required: true })}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                    <option value={"11"}>11</option>
                    <option value={"12+"}>12+</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Սանհանգույցների քանակ</span>
                  <Form.Select
                    {...register("number_of_bathrooms", { required: true })}
                  >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3+</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Առաստաղի բարձրություն</span>
                  <Form.Select
                    {...register("ceiling_height", { required: true })}
                  >
                    <option value={"2,5"}>2,5 մ</option>
                    <option value={"2,6"}>2,6 մ</option>
                    <option value={"2,7"}>2,7 մ</option>
                    <option value={"2,75"}>2,75 մ</option>
                    <option value={"2,8"}>2,8 մ</option>
                    <option value={"3"}>3 մ</option>
                    <option value={"3,2"}>3,2 մ</option>
                    <option value={"3,5"}>3,5 մ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Հարկայնություն</span>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-describedby="basic-addon1"
                      {...register("number_of_floors")}
                    />
                  </InputGroup>
                </div>
                {/* <div>
                  <span>Հարկ</span>
                  <Form.Select {...register("floor", { required: true })}>
                    {add_floor()}
                  </Form.Select>
                </div> */}
                <div>
                  <span>Պատշգամբ</span>
                  <Form.Select {...register("balcony")}>
                    <option value={"Առկա չէ"}>Առկա չէ</option>
                    <option value={"Բաց պատշգամբ"}>Բաց պատշգամբ</option>
                    <option value={"Փակ պատշգամբ"}>Փակ պատշգամբ</option>
                    <option value={"Մի քանի պատշգամբ"}>Մի քանի պատշգամբ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Կահույք</span>
                  <Form.Select {...register("furniture", { required: true })}>
                    <option value={"Առկա չէ"}>Առկա չէ</option>
                    <option value={"Առկա է"}>Առկա է</option>
                    <option value={"Մասնակի կահույք"}>Մասնակի կահույք</option>
                    <option value={"Համաձայնությամբ"}>Համաձայնությամբ</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Կարգավիճակ</span>
                  <Form.Select {...register("status", { required: true })}>
                    <option value={"Չվերանորոգված"}>Չվերանորոգված</option>
                    <option value={"Հին վերանորոգում"}>Հին վերանորոգում</option>
                    <option value={"Եվրովերանորոգված"}>Եվրովերանորոգված</option>
                    <option value={"Դիզայներական ոճ"}>Դիզայներական ոճ</option>
                    <option value={"Կապիտալ վերանորոգված"}>Կապիտալ վերանորոգված</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences1`}
                    label={`Օդորակիչ`}
                    value={"Օդորակիչ"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences2`}
                    label={`Սառնարան`}
                    value={"Սառնարան"}
                    {...register("conveniences")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`conveniences3`}
                    label={`Սալօջախ`}
                    value={"Սալօջախ"}
                    {...register("conveniences")}
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
                    {...register("price")}
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
                    {...register("description")}
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
                      {...register("description_hidden")}
                    />
                  </div>
                </div>
              </div>
              <div className="item-images-panel">
                {items.map((el, index) => {
                  return (
                    <div
                      draggable={true}
                      key={el.id}
                      className="img-box"
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <button
                        className="delete_img_btn"
                        onClick={(evn) => {
                          evn.preventDefault();
                          setItems(
                            items.filter((image) => image.name !== el.name)
                          );
                        }}
                      >
                        <AiOutlineClose />
                      </button>
                      <img src={URL.createObjectURL(el)} width={"100%"} />
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
                  <input
                    type="file"
                    id="item_img"
                    onChange={(evn) => {
                      setItems([...items, ...evn.target.files]);
                    }}
                    multiple
                    accept="image/*"
                    required={true}
                  />
                </div>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="YouTube հղում"
                    type="url"
                    aria-describedby="basic-addon2"
                    {...register("video_url", { required: false })}
                  />
                </InputGroup>
                <div>
                  <input
                    type="radio"
                    id="exclusive"
                    value={"exclusive"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="exclusive">Էքսկլյուզիվ</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="hatuk"
                    value={"special"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="hatuk">Հատուկ առաջարկ</label>
                </div>
                <div>
                  <Form.Check
                    type="checkbox"
                    id="elevator-switch"
                    label="Նկարված է"
                    {...register("is_drown")}
                  />
                </div>
              </div>
              <Button
                disabled={showLoading}
                variant="success"
                style={{ marginTop: "15px" }}
                type="submit"
              >
                Ավելացնել
              </Button>
            </>
          ) : itemType === 'Հողատարածք' ? (
            <>
                             <div className="form-panel">
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Անուն Ազգանուն (գույքի տեր)"
                    {...register("owner_name")}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Հեռ․ համար"
                    {...register("owner_phone")}
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
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_2">Վարձակալություն</label>
                    <input
                      id="type_2"
                      type="radio"
                      value={"rent"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type_3">Վաճառք և Վարձակալություն</label>
                    <input
                      id="type_3"
                      type="radio"
                      value={"rent_and_sell"}
                      name="type"
                      onClick={(evn) => setType(() => evn.target.value)}
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
                    onChange={(evn) => setMarz(() => evn.target.value)}
                  >
                    <option value={"yerevan"}>Երևան</option>
                    <option value={"kotayk"}>Կոտայք</option>
                  </Form.Select>
                </div>
                <div>
                  <span>Շրջան</span>
                  {marz === "yerevan" ? (
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(evn) => setRegion(evn.target.value)}
                      selected={"Աջափնյակ"}
                      {...register("region", { required: true })}
                    >
                      <option value="Աջափնյակ" selected={true}>
                        Աջափնյակ
                      </option>
                      <option value="Ավան">Ավան</option>
                      <option value="Արաբկիր">Արաբկիր</option>
                      <option value="Դավթաշեն">Դավթաշեն</option>
                      <option value="Էրեբունի">Էրեբունի</option>
                      <option value="Կենտրոն">Կենտրոն</option>
                      <option value="Փոքր կենտրոն">Փոքր կենտրոն</option>
                      <option value="Մալաթիա-Սեբաստիա">Մալաթիա-Սեբաստիա</option>
                      <option value="Նոր Նորք">Նոր Նորք</option>
                      <option value="Նորք-Մարաշ">Նորք-Մարաշ</option>
                      <option value="Նուբարաշեն">Նուբարաշեն</option>
                      <option value="Շենգավիթ">Շենգավիթ</option>
                      <option value="Քանաքեռ-Զեյթուն">Քանաքեռ-Զեյթուն</option>
                    </Form.Select>
                  ) : (
                    <>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(evn) => setRegion(evn.target.value)}
                        {...register("region", { required: true })}
                      >
                        <option value="Աբովյան" selected>
                          Աբովյան
                        </option>
                        <option value="Աղվերան">Աղվերան</option>
                        <option value="Ակունք">Ակունք</option>
                        <option value="Ալափարս">Ալափարս</option>
                        <option value="Արագյուղ">Արագյուղ</option>
                        <option value="Արամուս">Արամուս</option>
                        <option value="Արգել">Արգել</option>
                        <option value="Առինջ">Առինջ</option>
                        <option value="Արզական">Արզական</option>
                        <option value="Արզնի">Արզնի</option>
                        <option value="Բալահովիտ">Բալահովիտ</option>
                        <option value="Բջնի">Բջնի</option>
                        <option value="Բյուրեղավան">Բյուրեղավան</option>
                        <option value="Չարենցավան">Չարենցավան</option>
                        <option value="Ձորաղբյուր">Ձորաղբյուր</option>
                        <option value="Գառնի">Գառնի</option>
                        <option value="Հրազդան">Հրազդան</option>
                        <option value="Պտղնի">Պտղնի</option>
                        <option value="Սոլակ">Սոլակ</option>
                        <option value="Ծաղկաձոր">Ծաղկաձոր</option>
                        <option value="Վերին Պտղնի">Վերին Պտղնի</option>
                        <option value="Եղվարդ">Եղվարդ</option>
                        <option value="Զորավան">Զորավան</option>
                        <option value="Զովք">Զովք</option>
                        <option value="Զովունի">Զովունի</option>
                        <option value="Ֆանտան">Ֆանտան</option>
                        <option value="Զովաշեն">Զովաշեն</option>
                      </Form.Select>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div>
                    <span>Փողոց</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        value={streetName}
                        onChange={(evn) => setStreetName(evn.target.value)}
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>
              {streetName !== "" && (
                <SelectStreetPanel
                  streetName={streetName}
                  onSelect={(street) => setStreetName(street)}
                />
              )}
              
         
              <hr />
              <div className="form-panel">
                <h5 className="h_header">Տեղեկություններ հողատարածքի մասին</h5>
                <div>
                    <span>Մակերեսը</span>
                    <InputGroup className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon1"
                        {...register("area_plot_own_house")}
                        /> 
                    </InputGroup>
                  </div>
                  <div>
                    <span>Կոմունիկացիաներ</span>
                  <Form.Check
                    type={"checkbox"}
                    id={`check5`}
                    label={`Էլեկտրականություն`}
                    value={`Էլեկտրականություն`}
                    {...register("amenities_own_home")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Ջրամատակարարում`}
                    value={`Ջրամատակարարում`}
                    {...register("amenities_own_home")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Գազ`}
                    value={`Գազ`}
                    {...register("amenities_own_home")}
                  />
                  <Form.Check
                    type={"checkbox"}
                    id={`check6`}
                    label={`Կոյուղի`}
                    value={`Կոյուղի`}
                    {...register("amenities_own_home")}
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
                    {...register("price")}
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
                    {...register("description")}
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
                      {...register("description_hidden")}
                    />
                  </div>
                </div>
              </div>
              <div className="item-images-panel">
                {items.map((el, index) => {
                  return (
                    <div
                      draggable={true}
                      key={el.id}
                      className="img-box"
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <button
                        className="delete_img_btn"
                        onClick={(evn) => {
                          evn.preventDefault();
                          setItems(
                            items.filter((image) => image.name !== el.name)
                          );
                        }}
                      >
                        <AiOutlineClose />
                      </button>
                      <img src={URL.createObjectURL(el)} width={"100%"} />
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
                  <input
                    type="file"
                    id="item_img"
                    onChange={(evn) => {
                      setItems([...items, ...evn.target.files]);
                    }}
                    multiple
                    accept="image/*"
                    required={true}
                  />
                </div>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="YouTube հղում"
                    type="url"
                    aria-describedby="basic-addon2"
                    {...register("video_url", { required: false })}
                  />
                </InputGroup>
                <div>
                  <input
                    type="radio"
                    id="exclusive"
                    value={"exclusive"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="exclusive">Էքսկլյուզիվ</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="hatuk"
                    value={"special"}
                    {...register("proposal")}
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="hatuk">Հատուկ առաջարկ</label>
                </div>
                <div>
                  <Form.Check
                    type="checkbox"
                    id="elevator-switch"
                    label="Նկարված է"
                    {...register("is_drown")}
                  />
                </div>
              </div>
              <Button
                disabled={showLoading}
                variant="success"
                style={{ marginTop: "15px" }}
                type="submit"
              >
                Ավելացնել
              </Button>
            </>
          ) : (
            <></>
          ) }
        </form>
      </div>
    </>
  );
};

export default AddItem;
