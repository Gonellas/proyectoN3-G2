import { Container } from "react-bootstrap";
import FormSurvey from "../components/Admin/FormSurvey/FormSurvey";
import Navegation from "../components/Admin/Navegation/Navegation";
import useForm from "../hooks/useForm";

const NewSurvey = () => {
  const {admin} = useForm()
  return (
    <>
      {admin?(<Navegation/>):(null)}
      <h2 className="mt-3 text-center">Crear Encuesta</h2>
      <Container className="d-flex flex-column w-50 p-4">
        <FormSurvey/>
      </Container>
     
    </>
  );
};

export default NewSurvey;
