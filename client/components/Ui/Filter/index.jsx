import PropTypes from "prop-types";
import { Formik } from "formik";
import {
  Button,
  SelectField,
  MultiSelectField,
  FormGroup,
  RangeSlider,
  SelectedBar
} from "UI";

function Filter({ name, fields, inititalState, filters, setFilters, setFilter }) {

  return (
    <>
      <div
        className="flex flex-col py-12"
        style={{
          background:
            "linear-gradient(75deg, #F5758F, #D899CB, #4C3261, #3B3045)"
        }}
      >
        <div className="fluid-container w-full">
          <div className="text-xl lg:text-3xl text-white font-black capitalize">
            {name}
          </div>
          <Formik
            enableReinitialize
            initialValues={filters}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);

              setFilters(values);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form
                className="flex flex-col flex-wrap items-center justify-between lg:flex-row"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-wrap items-end w-full lg:w-4/5 -mx-4">
                  {fields &&
                    fields.map(({ component, ...rest }, index) => {
                      switch (component) {
                        case "select":
                          return (
                            <SelectField
                              key={index}
                              className="w-full lg:w-1/5 px-2"
                              labelClassName="text-white"
                              {...rest}
                            ></SelectField>
                          );

                        case "multi-select":
                          return (
                            <MultiSelectField
                              key={index}
                              className="w-full lg:w-1/5 px-2"
                              labelClassName="text-white"
                              {...rest}
                            ></MultiSelectField>
                          );

                        case "range":
                          return (
                            <RangeSlider
                              key={index}
                              className="w-full lg:w-1/5 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            ></RangeSlider>
                          );

                        default:
                          break;
                      }
                    })}
                  <FormGroup className="w-full mt-5 lg:mt-0 lg:w-1/6 px-2">
                    <Button
                      className="w-full"
                      size="sm"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Find
                    </Button>
                  </FormGroup>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <SelectedBar name={name} fields={fields} inititalState={inititalState} filters={filters} setFilter={setFilter} setFilters={setFilters} />
    </>
  );
}

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  inititalState: PropTypes.object.isRequired
};

export default Filter;
