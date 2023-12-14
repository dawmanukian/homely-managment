import React, { useState } from "react";
import "./add-item.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="add_item_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-panel">
          <InputGroup className="mb-3" >
            <Form.Control aria-describedby="basic-addon1" placeholder="Անուն Ազգանուն"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control aria-describedby="basic-addon1" placeholder="Հեռ․ համար"/>
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
            <Form.Select aria-label="Default select example">
              <option>Երևան</option>
              <option>Կոտայք</option>
            </Form.Select>
          </div>
          <div>
            <span>Փողոց</span>
            <InputGroup className="mb-3">
              <Form.Control aria-describedby="basic-addon1" />
            </InputGroup>
          </div>
        </div>
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
            <Form.Check type="switch" id="custom-switch" label="Նորակառույց" />
            <Form.Check type="switch" id="custom-switch" label="Ունի վերելակ" />
          </div>
          <div>
            <span>Հարկայնություն</span>
            <InputGroup className="mb-3">
              <Form.Control aria-describedby="basic-addon1" />
            </InputGroup>
          </div>
          <div>
            <Form.Check type={"checkbox"} id={`default`} label={`Դոմոֆոն`} />
            <Form.Check type={"checkbox"} id={`default`} label={`Դռնապահ`} />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Խաղահրապարակ`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Բացօթյա կայանատեղի`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Ծածկապատ կայանատեղի`}
            />
            <Form.Check type={"checkbox"} id={`default`} label={`Ավտոտնակ`} />
          </div>
        </div>
        <hr />
        <div className="form-panel">
          <h5 className="h_header">Գույքի մասին</h5>
          <div>
            <span>Մակերես</span>
            <InputGroup className="mb-3">
              <Form.Control aria-describedby="basic-addon2" />
              <InputGroup.Text id="basic-addon2">ք․ մ․</InputGroup.Text>
            </InputGroup>
          </div>
          <div>
            <span>Սենյակների քանակ</span>
            <Form.Select aria-label="Default select example">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12+</option>
            </Form.Select>
          </div>
          <div>
            <span>Առաստաղի բարձրություն</span>
            <Form.Select aria-label="Default select example">
              <option>2,5 մ</option>
              <option>2,6 մ</option>
              <option>2,7 մ</option>
              <option>2,75 մ</option>
              <option>2,8 մ</option>
              <option>3 մ</option>
              <option>3,2 մ</option>
              <option>3,5 մ</option>
            </Form.Select>
          </div>
          <div>
            <span>Հարկ</span>
            <Form.Select>{add_floor()}</Form.Select>
          </div>
          <div>
            <span>Պատշգամբ</span>
            <Form.Select>
              <option>Առկա չէ</option>
              <option>Բաց պատշգամբ</option>
              <option>Փակ պատշգամբ</option>
              <option>Մի քանի պատշգամբ</option>
            </Form.Select>
          </div>
          <div>
            <span>Կահույք</span>
            <Form.Select>
              <option>Առկա չէ</option>
              <option>Առկա է</option>
              <option>Մասնակի կահույք</option>
              <option>Համաձայնությամբ</option>
            </Form.Select>
          </div>
          <div>
            <Form.Check type={"checkbox"} id={`default`} label={`Օդորակիչ`} />
            <Form.Check type={"checkbox"} id={`default`} label={`Սառնարան`} />
            <Form.Check type={"checkbox"} id={`default`} label={`Սալօջախ`} />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Աման լվացող մեքենա`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Լվացքի մեքենա`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Չորացնող մեքենա`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Տեսարան դեպի բակ`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Տեսարան դեպի փողոց`}
            />
            <Form.Check
              type={"checkbox"}
              id={`default`}
              label={`Տեսարան դեպի քաղաք`}
            />
          </div>
        </div>
        <div className="form-panel">
          <h5 className="h_header">Գին</h5>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </div>
        <div className="form-panel">
          <h5 className="h_header">Տեղեկություն</h5>
          <div>
            <Form.Control
              as="textarea"
              placeholder="Նկարագիր"
              style={{ height: "140px" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
