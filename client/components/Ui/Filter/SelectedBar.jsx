import PropTypes from "prop-types";
import cx from "classnames";
import { CloseSvg } from "icons";
import { useApolloClient } from "@apollo/react-hooks";

function SelectedBar({ name, fields, inititalState }) {
  const selected = {};
  const client = useApolloClient();

  const getLabel = (key, value) => {
    const index = fields.map(f => f.name).indexOf(key);
    const field = fields[index];

    if (field && field.options) {
      const i = field.options.map(o => o.value).indexOf(value);
      if (field.options[i]) {
        return field.options[i].label;
      }
    }

    return null;
  };

  inititalState &&
    Object.keys(inititalState).map(key => {
      const label = getLabel(key, inititalState[key]);
      label && (selected[key] = label);
    });

  const clearValue = key => {
    client.writeData({
      data: {
        filters: {
          [name]: {
            [key]: "",
            __typename: "GirlFilters"
          },
          __typename: "Filters"
        }
      }
    });
  };

  const clearAllValue = () => {
    let keys = [];
    Object.keys(selected).map(key => (keys[key] = ""));

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
      <div className="fluid-container py-5 flex items-center">
        <div className="mr-4">Selected:</div>
        {Object.keys(selected).map((key, i) => (
          <div
            className={cx(
              "flex items-center justify-between px-4 py-1 border border-divider rounded-full cursor-pointer",
              {
                "mx-4": i % 2 === 0
              }
            )}
            key={i}
            onClick={() => clearValue(key)}
          >
            <span className="text-sm mr-4">{selected[key]}</span>

            <CloseSvg
              className="stroke-light-grey hover:stroke-red"
              width={10}
              height={10}
            ></CloseSvg>
          </div>
        ))}
        <span
          className="text-red cursor-pointer ml-4"
          onClick={() => clearAllValue()}
        >
          Clear all
        </span>
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
