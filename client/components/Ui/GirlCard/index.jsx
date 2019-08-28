import PropTypes from "prop-types";

function GirlCard({ girl }) {
  return (
    <div
      className="girls__item border border-red"
      style={{ backgroundImage: `url(${girl.photos[0].thumb_url})` }}
    >
      <div className="absolute z-20 top-0 right-0 p-3-5">
        <button className="flex justify-center content-center rounded-full bg-white w-10 h-10">
          <svg
            className="stroke-grey fill-white mt-1"
            width="22"
            height="19"
            viewBox="0 0 22 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4578 2.50292C18.9691 2.02645 18.3889 1.64848 17.7503 1.39061C17.1117 1.13273 16.4272 1 15.7359 1C15.0446 1 14.3601 1.13273 13.7215 1.39061C13.0829 1.64848 12.5026 2.02645 12.0139 2.50292L10.9997 3.4913L9.98554 2.50292C8.99842 1.54094 7.6596 1.0005 6.26361 1.0005C4.86761 1.0005 3.52879 1.54094 2.54168 2.50292C1.55456 3.46491 1 4.76964 1 6.1301C1 7.49055 1.55456 8.79528 2.54168 9.75727L3.55588 10.7457L10.9997 18L18.4436 10.7457L19.4578 9.75727C19.9467 9.28102 20.3346 8.71557 20.5992 8.0932C20.8638 7.47084 21 6.80377 21 6.1301C21 5.45642 20.8638 4.78935 20.5992 4.16699C20.3346 3.54463 19.9467 2.97917 19.4578 2.50292V2.50292Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-end">
        <div className="flex flex-row justify-between items-end p-3">
          <div className="flex flex-col">
            {girl.isNew && (
              <div className="mb-2">
                <div className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none inline-block bg-black text-white">
                  NEW
                </div>
              </div>
            )}
            {girl.isVip && (
              <div className="mb-2">
                <div className="badge rounded-full uppercase font-medium text-xs pt-1 pb-2 px-4 leading-none inline-block bg-red text-white">
                  VIP
                </div>
              </div>
            )}
            <div className="flex">
              <div className="rounded-full bg-xs-grey text-sm px-2-5 leading-relaxed py-1">
                +38 050 145 78 89
              </div>
              <button className="flex justify-center content-center rounded-full bg-xs-grey w-7 h-7 ml-2">
                <svg
                  className="fill-red"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.33333 12.6667V12.1667C4.20073 12.1667 4.07355 12.2193 3.97978 12.3131L4.33333 12.6667ZM1 16H0.5C0.5 16.2022 0.621821 16.3846 0.808658 16.4619C0.995496 16.5393 1.21055 16.4966 1.35355 16.3536L1 16ZM2.66667 1V0.5V1ZM14.3333 1V0.5V1ZM4.6 3.5C4.32386 3.5 4.1 3.72386 4.1 4C4.1 4.27614 4.32386 4.5 4.6 4.5V3.5ZM12.4 4.5C12.6761 4.5 12.9 4.27614 12.9 4C12.9 3.72386 12.6761 3.5 12.4 3.5V4.5ZM4.6 5.9C4.32386 5.9 4.1 6.12386 4.1 6.4C4.1 6.67614 4.32386 6.9 4.6 6.9V5.9ZM10 6.9C10.2761 6.9 10.5 6.67614 10.5 6.4C10.5 6.12386 10.2761 5.9 10 5.9V6.9ZM4.6 8.3C4.32386 8.3 4.1 8.52386 4.1 8.8C4.1 9.07614 4.32386 9.3 4.6 9.3V8.3ZM11.2 9.3C11.4761 9.3 11.7 9.07614 11.7 8.8C11.7 8.52386 11.4761 8.3 11.2 8.3V9.3ZM15.5 11C15.5 11.3094 15.3771 11.6062 15.1583 11.825L15.8654 12.5321C16.2717 12.1257 16.5 11.5746 16.5 11H15.5ZM15.1583 11.825C14.9395 12.0437 14.6428 12.1667 14.3333 12.1667V13.1667C14.908 13.1667 15.4591 12.9384 15.8654 12.5321L15.1583 11.825ZM14.3333 12.1667H4.33333V13.1667H14.3333V12.1667ZM3.97978 12.3131L0.646447 15.6464L1.35355 16.3536L4.68689 13.0202L3.97978 12.3131ZM1.5 16V2.66667H0.5V16H1.5ZM1.5 2.66667C1.5 2.35725 1.62292 2.0605 1.84171 1.84171L1.1346 1.1346C0.728273 1.54093 0.5 2.09203 0.5 2.66667H1.5ZM1.84171 1.84171C2.0605 1.62292 2.35725 1.5 2.66667 1.5V0.5C2.09203 0.5 1.54093 0.728273 1.1346 1.1346L1.84171 1.84171ZM2.66667 1.5H14.3333V0.5H2.66667V1.5ZM14.3333 1.5C14.6428 1.5 14.9395 1.62292 15.1583 1.84171L15.8654 1.1346C15.4591 0.728273 14.908 0.5 14.3333 0.5V1.5ZM15.1583 1.84171C15.3771 2.0605 15.5 2.35725 15.5 2.66667H16.5C16.5 2.09203 16.2717 1.54093 15.8654 1.1346L15.1583 1.84171ZM15.5 2.66667V11H16.5V2.66667H15.5ZM4.6 4.5H12.4V3.5H4.6V4.5ZM4.6 6.9H10V5.9H4.6V6.9ZM4.6 9.3H11.2V8.3H4.6V9.3Z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <button className="flex justify-center content-center rounded-full bg-xs-grey w-7 h-7">
              <svg
                className="fill-red"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.0568 0.547449C8.57907 0.547449 7.35237 1.59739 7.14465 2.96029H3.56497L0.658336 0L0.0357792 0.562297L2.39027 2.96029H0L5.0781 8.41843V13.1798H2.69544V14H8.39638V13.1798H5.93326V8.41843L8.43715 5.72718C8.91513 6.02965 9.47682 6.1933 10.0568 6.1933C11.6797 6.1933 13 4.92693 13 3.37039C13 1.81385 11.6797 0.547449 10.0568 0.547449ZM7.95757 5.01074H3.05377L1.90915 3.78046H9.10215L7.95757 5.01074Z"></path>
              </svg>
            </button>
            <button className="flex justify-center content-center rounded-ful l bg-red w-7 h-7 ml-3">
              <span className="text-white font-bold text-2xs">100%</span>
            </button>
          </div>
        </div>
        <div className="bg-white w-full p-3 leading-loose">
          <div className="text-sm font-medium leading-tight">
            {girl.name}, {girl.age}
          </div>
          <div className="text-sm text-grey">
            <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"></div>
            150 km from me
          </div>
        </div>
      </div>
    </div>
  );
}

GirlCard.propTypes = {
  girl: PropTypes.object
};

export default GirlCard;
