import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_SURVEYS } from "../../../constants";
import SurveysContext from "../../../context/surveys/SurveysContext";
import CategoriesContext from "../../../context/categories/CategoriesContext";
import { Container, Form, FormControl } from "react-bootstrap";
import useForm from "../../../hooks/useForm";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormGroupMultipleChoice from "../FormGroupMultipleChoice/FormGroupMultipleChoice";
import FormGroupSimpleQuestion from "../FormGroupSimpleQuestion/FormGroupSimpleQuestion";
import FormGroupQuestionWithImage from "../FormGroupQuestionWithImage/FormGroupQuestionWithImage";
import ButtonsForAdmin from "../ButtonsForAdmin/ButtonsForAdmin";
import FormGroupTitleCategory from "../FormGroupTitleCategory/FormGroupTitleCategory";
import "./FormSurveyDetail.css";

const FormSurveyDetail = () => {
  const { surveys, getSurveys, deleteSurveys } = useContext(SurveysContext);
  const { categories, getCategories } = useContext(CategoriesContext);
  const params = useParams();

  useEffect(() => {
    getSurveys(URL_SURVEYS + params.id);
    getCategories();
  }, []);

  const initialValues = {
    name: "",
    state: "",
    questions: [],
    category: "",
  };

  const { values, admin, handleAdmin, handleEdit } = useForm(initialValues);
  const navigate = useNavigate();
  const location = useLocation();

  return admin == false? (
    <>
      <p>user</p>
    </>
  ) : (
    <Container>
      <Form onSubmit={(e) => handleEdit(e)}>
        <div className="borderM p-4">
          <div className="d-flex justify-content-end">
            <Button
              className="m-1"
              variant="danger"
              onClick={() => deleteSurveys(surveys.id)}
            >
              Eliminar
            </Button>
            <Button className="m-1" variant="primary" type="submit">
              Modificar
            </Button>
            <Button className="m-1" variant="secondary">
              Publicar
            </Button>
          </div>

          <div>
            <Form.Group>
              <Form.Label>
                <h5>Titulo</h5>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEdit(e, surveys)}
                name="name"
                placeholder={surveys.name}
                type="text"
              ></Form.Control>
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>
                <h5>Categoria</h5>
              </Form.Label>
              <Form.Select
                type="text"
                name="category"
                onChange={(e) => handleEdit(e, surveys)}
              >
                <option>{surveys.category}</option>
                {categories?.map((category, index) => (
                  <option key={index}>{category.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {surveys.questions?.map((question, index) =>
            question.response.length > 1 ? (
              <div key={`questions${index}`} className="mb-3">
                <Form.Group controlId={index} className="mb-3">
                  <Form.Label>
                    <h5>Multiple Choice</h5>
                  </Form.Label>
                  <Form.Control
                    name="questions"
                    onChange={(e) => handleEdit(e, surveys)}
                    placeholder={question.question}
                    type="text"
                  ></Form.Control>
                </Form.Group>

                <Form.Label>
                  <h6>Respuestas</h6>
                </Form.Label>
                {question.response.map((response, index) => (
                  <Form.Group
                    key={`response${index}`}
                    controlId={index}
                    className="mb-3"
                  >
                    <Form.Control
                      name="response"
                      onChange={(e) => handleEdit(e, surveys)}
                      placeholder={response}
                      type="text"
                    />
                  </Form.Group>
                ))}
              </div>
            ) : question.response.length == 1 ? (
              <Form.Group
                key={`image${index}`}
                controlId={index}
                className="mb-3"
              >
                <Form.Control label="Pregunta imagen" type="text" />
              </Form.Group>
            ) : (
              <Form.Group
                key={`questions${index}`}
                controlId={index}
                className="mb-3"
              >
                <Form.Label>
                  <h5>Pregunta Simple</h5>
                </Form.Label>
                <FormControl
                  onChange={(e) => handleEdit(e, surveys)}
                  name="questions"
                  placeholder={question.question}
                  type="text"
                ></FormControl>
              </Form.Group>
            )
          )}
        </div>
      </Form>
    </Container>
  );
};

export default FormSurveyDetail;
/* {
<Container className="py-3">
    <Row>
      <div className="border border-dark p-4">
        <ButtonsForAdmin  id={surveys.id} />
        <FormGroupTitleCategory key={surveys.id} surveys={surveys} edit={edit} values={values}/>
        {surveys.questions?.map((question, index) =>
          question.response.length > 1 ? (
            <FormGroupMultipleChoice
              key={index}
              question={question}
              edit={edit}
              values={values}
            />
          ) : question.response.length == 1 ? (
            <FormGroupQuestionWithImage
              key={index}
              question={question}
              edit={edit}
              values={values}
            />
          ) : (
            <FormGroupSimpleQuestion
              key={index}
              question={question}
              edit={edit}
              initialValues={initialValues}
            />
          )
        )}
      </div>
    </Row>
    </Container>
} */
