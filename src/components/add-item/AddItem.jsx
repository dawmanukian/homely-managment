import React, { useState } from "react";
import "./add-item.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import SuccessAlert from "../success-alert/SuccessAlert";
import SelectStreetPanel from "../select-street-panel/SelectStreetPanel";

const AddItem = ({ type }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const add_floor = () => {
    let x = new Array();
    for (let index = 1; index <= 32; index++) {
      x.push(<option value={index}>{index}</option>);
    }
    return x;
  };

  const [streetName, setStreetName] = useState("");
  const [region, setRegion] = useState("Աջափնյակ");
  const [mainImage, setMainImage] = useState(null);
  const [itemImages, setItemImages] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit = (data) => {
    setShowSuccessAlert(true);
    const allData = { ...data, main_img: mainImage, item_images: itemImages };
    console.log(allData);
  };
  return (
    <>
      {showSuccessAlert && (
        <SuccessAlert
          text={"Գույքը ավելացվել է"}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      <div className="add_item_page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-panel">
            <InputGroup className="mb-3">
              <Form.Control
                aria-describedby="basic-addon1"
                placeholder="Անուն Ազգանուն"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                aria-describedby="basic-addon1"
                placeholder="Հեռ․ համար"
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
                  value={1}
                  {...register("ann_type", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="type_2">Վարձակալություն</label>
                <input
                  id="type_2"
                  type="radio"
                  value={2}
                  {...register("ann_type", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="type_3">Վաճառք և Վարձակալություն</label>
                <input
                  id="type_3"
                  type="radio"
                  value={3}
                  {...register("ann_type", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="form-panel">
            <h5 className="h_header">Գտնվելու վայրը</h5>
            <div>
              <span>Մարզ</span>
              <Form.Select aria-label="Default select example">
                <option>Երևան</option>
                <option>Կոտայք</option>
              </Form.Select>
            </div>
            <div>
              <span>Շրջան</span>
              <Form.Select
                aria-label="Default select example"
                onChange={(evn) => setRegion(evn.target.value)}
              >
                <option value="Աջափնյակ">Աջափնյակ</option>
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
                  <Form.Control aria-describedby="basic-addon1" />
                </InputGroup>
              </div>
              <div>
                <span>Բնակարան</span>
                <InputGroup className="mb-3">
                  <Form.Control aria-describedby="basic-addon1" />
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
              <Form.Select aria-label="Default select example">
                <option>Պանելային</option>
                <option>Քարե</option>
                <option>Մոնոլիտ</option>
                <option>Այլ</option>
              </Form.Select>
            </div>
            <div>
              <Form.Check
                type="switch"
                id="new-buil-switch"
                label="Նորակառույց"
                {...register("new_building")}
              />
              <Form.Check
                type="switch"
                id="elevator-switch"
                label="Ունի վերելակ"
                {...register("elevator")}
              />
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
              <Form.Select {...register("rooms_number", { required: true })}>
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
              <Form.Select {...register("bathroom_number", { required: true })}>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3+</option>
              </Form.Select>
            </div>
            <div>
              <span>Առաստաղի բարձրություն</span>
              <Form.Select {...register("ceiling_height", { required: true })}>
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
            <InputGroup className="mb-3" {...register("price_usd")}>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" placeholder="Արժեքը դոլարով" />
            </InputGroup>
          </div>
          <div className="form-panel">
            <h5 className="h_header">Տեղեկություն</h5>
            <div>
              <Form.Control
                as="textarea"
                placeholder="Նկարագիր"
                style={{ height: "140px" }}
                {...register("ann_description", { required: true })}
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
                  {...register("ann_description", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="form-panel" style={{ margin: "20px 0px 20px 0px" }}>
            {mainImage && (
              <div>
                <button
                  className="delete_img_btn"
                  onClick={(evn) => {
                    evn.preventDefault();
                    setMainImage(null);
                  }}
                >
                  <AiOutlineClose />
                </button>
                <img
                  src={mainImage}
                  style={{ objectFit: "cover", width: "100%" }}
                />
              </div>
            )}
            <div>
              <Button variant="primary" style={{ cursor: "pointer" }}>
                <label
                  htmlFor="main_img"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <AiOutlineFileImage />
                  <span>Գույքի հիմնական նկար</span>
                </label>
              </Button>
              <input
                type="file"
                id="main_img"
                onChange={(evn) => {
                  setMainImage(URL.createObjectURL(evn.target.files[0]));
                }}
                multiple
                required={true}
              />
            </div>
          </div>
          <div className="form-panel">
            <div className="item-images-panel">
              {itemImages.map((el) => {
                return (
                  <div>
                    <button
                      className="delete_img_btn"
                      onClick={(evn) => {
                        evn.preventDefault();
                        setItemImages(
                          itemImages.filter((image) => image !== el)
                        );
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                    <img src={el} width={"100%"} />
                  </div>
                );
              })}
            </div>
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
                  setItemImages([
                    ...itemImages,
                    URL.createObjectURL(evn.target.files[0]),
                  ]);
                }}
                multiple
                required={true}
              />
            </div>
          </div>
          <Button variant="success" style={{ marginTop: "15px" }} type="submit">
            Ավելացնել
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddItem;
