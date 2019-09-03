import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, TextField, FormGroup } from "UI";

function Filter({ name }) {
  return (
    <div
      className="flex flex-col py-12"
      style={{
        background: "linear-gradient(75deg, #F5758F, #D899CB, #4C3261, #3B3045)"
      }}
    >
      <div className="container">
        <div className="text-3xl text-white font-black">{name}</div>
        <Formik
          initialValues={{
            location: ""
          }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="flex items-end" onSubmit={handleSubmit}>
              <TextField
                className="w-80"
                label="Location"
                name="location"
                placeholder=""
              />

              <TextField
                className="w-80 mx-5"
                label="Event type"
                name="location"
                placeholder=""
              />

              <TextField
                className="w-80"
                label="Club type"
                name="location"
                placeholder=""
              />

              <TextField
                className="w-80 mx-5"
                label="Date"
                name="location"
                placeholder=""
              />

              <FormGroup className="w-40">
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Find
                </Button>
              </FormGroup>
            </form>
          )}
        </Formik>
      </div>
    </div>
    // linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)
  );
}

Filter.propTypes = {
  name: PropTypes.string.isRequired
};

export default Filter;
