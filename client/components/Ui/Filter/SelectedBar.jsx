import PropTypes from "prop-types";
import { CloseSvg } from "icons";
import {useTranslation} from "react-i18next";

function SelectedBar({ name, fields, inititalState, filters, setFilter, setFilters }) {
  const selected = [];
  const {t, i18n} = useTranslation();

  const getLabelFromOptions = (field, value) => {
    if (!field || !value) {
      return null;
    }

    if (field.options) {
      const i = field.options.map(o => o.value).indexOf(value);
      if (field.options[i]) {
        return field.options[i].label;
      }
    }

    if (field.labelResolver) {
      return field.labelResolver(value);
    }

    if (field.component === 'checkbox' && field.label && value) {
      return field.label;
    }

    return null;
  };

  const getLabel = (key, value) => {
    const index = fields.map(f => f.name).indexOf(key);
    const field = fields[index];

    return getLabelFromOptions(field, value);
  };

  filters &&
    Object.keys(filters).map(key => {
      const state = filters[key];

      if (Array.isArray(state)) {
        state.map(value => {
          const label = getLabel(key, value);

          if (label) {
            selected.push({
              isArray: true,
              key,
              value,
              label
            });
          }
        });
      }
      const label = getLabel(key, state);

      if (label) {
        selected.push({
          isArray: false,
          key,
          label
        });
      }
    });

  const clearValue = ({ key, isArray, value }) => {
    let state = filters[key];

    if (isArray) {
      const index = state.indexOf(value);
      state.splice(index, 1);
    } else {
      state = "";
    }

    setFilter(key, state);
    if (key === 'canton_id') {
      setFilter('city_id', '');
    }
  };

  const clearAllValue = () => {
    let keys = [];
    selected.map(({ key, isArray }) => {
      if (isArray) {
        keys[key] = [];
      }

      keys[key] = "";
    });

    setFilters(inititalState);
  };

  if (Object.entries(selected).length === 0) {
    return null;
  }

  return (
    <div className="border-b border-divider">
      <div className="container p-5 flex items-center">
        <div className="hidden sm:block mr-2">{t('index.selected')}:</div>
          {selected.map((s, i) => (
            <div className="flex flex-wrap items-center selected-item__div -mb-4">
              <div
                className={
                  "flex items-center justify-between px-4 py-1 border border-divider hover:border-red rounded-full cursor-pointer mx-2 mb-4"
                }
                key={i}
                onClick={() => clearValue(s)}
              >
                <span className="text-sm mr-4">{s.label}</span>

                <CloseSvg
                  className="stroke-light-grey hover:stroke-red"
                  width={10}
                  height={10}
                ></CloseSvg>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center -mb-4">
          <span
            className="text-red cursor-pointer ml-4 mb-4"
            onClick={() => clearAllValue()}
          >
            {t('index.clear_all')}
          </span>
          </div>
      </div>
    </div>
  );
}

SelectedBar.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  inititalState: PropTypes.object.isRequired
};

export default SelectedBar;
