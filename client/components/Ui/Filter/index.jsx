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
import {useTranslation} from "react-i18next";
import DateField from "UI/Forms/DateField";
import React from "react";

function Filter({ name, header, fields, inititalState, filters, setFilters, setFilter, bgClass }) {

  const {t, i18n} = useTranslation();

  return (
    <>
      <div
        className={cx([
          "flex flex-col py-4",
          bgClass
        ])}
      >
        <div className="container w-full z-1">
          <h1 className="text-xl lg:text-3xl text-white font-black capitalize">
            {header}
          </h1>
          <Formik
            enableReinitialize
            initialValues={filters}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);

              setFilters(values);
            }}
          >
            {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
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
                              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/7 hd:w-1/7 px-2"
                              labelClassName="text-white"
                              {...rest}
                              placeholder={rest.handlePlaceholder ? rest.handlePlaceholder(values) : rest.placeholder}
                              options={rest.filterOptions ? rest.filterOptions(rest.options, values) : rest.options}
                              onSelect={value => rest.handleChange ? rest.handleChange(value, setFieldValue) : null}
                            />
                          );

                        case "multi-select":
                          return (
                            <MultiSelectField
                              key={index}
                              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/7 hd:w-1/7 px-2"
                              labelClassName="text-white"
                              {...rest}
                            />
                          );

                        case "slider":
                          return (
                            <Slider
                              key={index}
                              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/7 hd:w-1/8 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            />
                          );

                        case "distance-slider":
                          return (
                            <DistanceSlider
                              key={index}
                              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/7 hd:w-1/7 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            />
                          );

                        case "range":
                          return (
                            <RangeSlider
                              key={index}
                              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/7 hd:w-1/8 px-2"
                              labelClassName="text-white"
                              {...rest}
                              value={filters[rest.name]}
                            />
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
                              />
                            </div>
                          );

                        case "dateField":
                          return (
                              <DateField
                                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/7 hd:w-1/7 px-2"
                                  {...rest}
                                  labelClassName="text-white"
                              />
                          );
                        default:
                          break;
                      }
                    })}
                </div>
                <div className="flex flex flex-row justify-center items-center w-full -mx-4">
                    <FormGroup className="mt-5 w-full md:mt-0 md:w-1/3 xl:w-1/4 hd:w-1/5 px-2">
                        <Button
                            className="w-full"
                            size="sm"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {t('index.find')}
                        </Button>
                    </FormGroup>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <SelectedBar
        name={name}
        fields={fields}
        inititalState={inititalState}
        filters={filters}
        setFilter={setFilter}
        setFilters={setFilters}
      />
    </>
  );
}

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  inititalState: PropTypes.object.isRequired
};

export default Filter;
