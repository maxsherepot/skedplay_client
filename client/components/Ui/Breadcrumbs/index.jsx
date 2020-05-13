import PropTypes from "prop-types";
import Link from 'components/SlashedLink';
import {useTranslation} from "react-i18next";
import cx from 'classnames';

const Breadcrubms = ({items}) => {
  const {t} = useTranslation();

  const firstItem = {as: '/', href: '/', label: t('common.home')};

  items = [firstItem, ...items];

  return (
    <div className="fluid-container w-full">
      <ol className="page-breadcrumbs flex my-4 justify-center md:justify-start" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => {
          const lastItem = i === items.length - 1;

          return (
            <li
              key={i}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {!lastItem ?
                <Link as={item.as} href={item.href}>
                  <a
                    itemProp="item"
                    onClick={() => {
                      if (item.onClick ) {
                        item.onClick();
                      }
                    }}
                  >
                    <span
                      itemProp="name"
                      className={cx([
                        "text-sm",
                        !lastItem ? "text-red" : "text-black",
                      ])}
                    >
                      {item.label}
                    </span>
                  </a>
                </Link>
              :
                <span
                  itemProp="name"
                  className={cx([
                    "text-sm",
                    !lastItem ? "text-red" : "text-black",
                  ])}
                >
                  {item.label}
                </span>
              }

              <meta itemProp="position" content={i + 1}/>

              {!lastItem &&
                <span className="separator mx-2 text-grey">
                  &nbsp;/&nbsp;
                </span>
              }
            </li>
          );
        })}
      </ol>
    </div>
  );
};

Breadcrubms.propTypes = {
  items: PropTypes.array.isRequired
};

export default Breadcrubms;