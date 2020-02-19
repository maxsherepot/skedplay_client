import PropTypes from "prop-types";
import { Formik } from "formik";
import {
  Button,
  SelectField,
  MultiSelectField,
  FormGroup,
  Slider,
  DistanceSlider,
  RangeSlider,
  SelectedBar,
  CheckboxField
} from "UI";

import cx from 'classnames';

function Filter({ name, fields, inititalState, filters, setFilters, setFilter, bgClass }) {

  return (
    <>
      <div
        className={cx([
          "flex flex-col py-4",
          bgClass
        ])}
      >
        <div className="fluid-container w-full z-1">
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
                <div className="flex flex-wrap items-end w-full -mx-4">
                  {fields &&
                    fields.map(({ component, ...rest }, index) => {
                      switch (component) {
                        case "select":
                          return (
                            <SelectField
                              key={index}
                              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/6 px-2"
                              labelClassName="text-white"
                              {...rest}
                            ></SelectField>
                          );

                        case "multi-select":
                          return (
                            <MultiSelectField
                              key={index}
                              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/6 px-2"
                              labelClassName="text-white"
                              {...rest}
                            ></MultiSelectField>
                          );

                        case "slider":
                          return (
                            <Slider
                              key={index}
                              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/6 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            ></Slider>
                          );

                        case "distance-slider":
                          return (
                            <DistanceSlider
                              key={index}
                              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/6 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            ></DistanceSlider>
                          );

                        case "range":
                          return (
                            <RangeSlider
                              key={index}
                              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/6 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            ></RangeSlider>
                          );

                        case "checkbox":
                          return (
                            <div className="form-group px-4 pb-2 relative" key={index}>
                              <CheckboxField
                                className=""
                                checkboxClass="white"
                                labelStyle={{
                                  padding: 0,
                                }}
                                {...rest}
                                value={filters[rest.name]}
                              ></CheckboxField>
                            </div>
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
