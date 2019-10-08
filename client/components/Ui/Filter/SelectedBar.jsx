import PropTypes from "prop-types";
import { CloseSvg } from "icons";
import { useApolloClient } from "@apollo/react-hooks";

function SelectedBar({ name, fields, inititalState }) {
  const selected = [];
  const client = useApolloClient();

  const getLabelFromOptions = (field, value) => {
    if (field && field.options) {
      const i = field.options.map(o => o.value).indexOf(value);
      if (field.options[i]) {
        return field.options[i].label;
      }
    }
    return null;
  };

  const getLabel = (key, value) => {
    const index = fields.map(f => f.name).indexOf(key);
    const field = fields[index];

    return getLabelFromOptions(field, value);
  };

  inititalState &&
    Object.keys(inititalState).map(key => {
      const state = inititalState[key];

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
    const state = inititalState[key];

    if (isArray) {
      const index = state.indexOf(value);
      delete state[index];
    }

    let newState = null;

    if (isArray) {
      newState = state.filter(s => s);

      if (newState && newState.length === 0) {
        newState = null;
      }
    }

    client.writeData({
      data: {
        filters: {
          [name]: {
            [key]: newState,
            __typename: "GirlFilters"
          },
          __typename: "Filters"
        }
      }
    });
  };

  const clearAllValue = () => {
    let keys = [];
    selected.map(({ key, isArray }) => {
      if (isArray) {
        keys[key] = [];
      }

      keys[key] = "";
    });

    client.writeData({
      data: {
        filters: {
          [name]: {
            ...keys,
            __typename: "GirlFilters"
          },
          __typename: "Filters"
        }
      }
    });
  };

  if (Object.entries(selected).length === 0) {
    return null;
  }

  return (
    <div className="border-b border-divider">
      <div className="fluid-container p-5 flex items-center">
        <div className="hidden sm:block mr-2">Selected:</div>
        <div className="flex flex-wrap items-center -mb-4">
          {selected.map((s, i) => (
            <div
              className={
                "flex items-center justify-between px-4 py-1 border border-divider rounded-full cursor-pointer mx-2 mb-4"
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
          ))}
          <span
            className="text-red cursor-pointer ml-4 mb-4"
            onClick={() => clearAllValue()}
          >
            Clear all
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