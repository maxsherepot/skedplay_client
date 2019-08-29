import React from "react";

const Logo = ({ color }) => {
  if (color === "black") {
    return (
      <svg
        width="177"
        height="43"
        viewBox="0 0 177 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.5591 13.3954C65.6764 14.0295 66.5941 14.9806 67.3522 16.1696C67.5916 16.5263 67.6714 16.8433 67.6714 17.1604C67.6714 17.5567 67.4719 17.9134 67.1128 18.1512C66.9133 18.27 66.6739 18.3493 66.3946 18.3493C66.1153 18.3493 65.836 18.27 65.5966 18.1512C65.3572 18.0323 65.1576 17.8341 65.0379 17.5963C64.5192 16.7641 63.9207 16.13 63.1626 15.694C62.4045 15.2581 61.4469 15.0599 60.2897 15.0599C58.8932 15.0599 57.7361 15.3373 56.8582 15.8922C55.9804 16.447 55.5415 17.2396 55.5415 18.27C55.5415 19.2212 55.9405 20.0535 56.6986 20.6876C57.4967 21.3217 58.8932 21.7576 60.8882 21.9558C63.1227 22.1935 64.8384 22.8673 66.0754 23.977C67.3123 25.0866 67.9108 26.5926 67.9108 28.4157C67.9108 29.7631 67.5517 30.8728 66.8335 31.8636C66.1153 32.8147 65.1576 33.5281 63.9207 34.0037C62.7237 34.4793 61.4469 34.7171 60.0503 34.7171C58.2548 34.7171 56.5789 34.3207 55.1026 33.4885C53.6263 32.6562 52.5888 31.6258 52.0302 30.2783C51.9504 30.0406 51.8706 29.882 51.8706 29.7235C51.8706 29.4461 51.9903 29.2083 52.1898 28.9705C52.3893 28.7724 52.6686 28.6138 53.0277 28.5346C53.0676 28.5346 53.1873 28.4949 53.307 28.4949C53.5864 28.4949 53.9056 28.5742 54.145 28.7724C54.4243 28.9309 54.6238 29.1687 54.7435 29.4857C55.0627 30.1991 55.741 30.8332 56.7385 31.3088C57.7361 31.824 58.8134 32.0618 60.0104 32.0618C61.407 32.0618 62.604 31.7447 63.5616 31.1106C64.5192 30.4765 64.998 29.6046 64.998 28.4949C64.998 27.4249 64.599 26.553 63.7611 25.8C62.9232 25.047 61.6863 24.6111 60.0104 24.4129C57.6962 24.1751 55.9006 23.5014 54.544 22.3917C53.2272 21.282 52.5489 19.8553 52.5489 18.1908C52.5489 17.0018 52.908 15.9714 53.5864 15.1392C54.2647 14.2673 55.1824 13.6332 56.3794 13.1576C57.5765 12.7217 58.8932 12.4839 60.3695 12.4839C62.1252 12.4442 63.4818 12.7613 64.5591 13.3954Z"
          fill="black"
        />
        <path
          d="M83.4323 33.2111C83.4323 33.6074 83.2727 33.9641 82.9136 34.2415C82.6343 34.4793 82.355 34.5585 82.0358 34.5585C81.6368 34.5585 81.2777 34.4 81.0383 34.0433L75.7314 27.5041L74.3349 28.7327V32.9733C74.3349 33.3696 74.2152 33.7263 73.9758 33.9641C73.7364 34.2018 73.3773 34.3207 72.9783 34.3207C72.5792 34.3207 72.2201 34.2018 71.9807 33.9641C71.7413 33.7263 71.6216 33.3696 71.6216 32.9733V14.0691C71.6216 13.6728 71.7413 13.3161 71.9807 13.0783C72.2201 12.8406 72.5792 12.7217 72.9783 12.7217C73.3773 12.7217 73.7364 12.8406 73.9758 13.0783C74.2152 13.3161 74.3349 13.6728 74.3349 14.0691V25.3641L81.1181 19.3401C81.3575 19.1023 81.6368 18.9834 81.9959 18.9834C82.3949 18.9834 82.7141 19.1419 82.9535 19.4194C83.1929 19.6571 83.3126 19.9346 83.3126 20.2912C83.3126 20.6876 83.153 21.0046 82.8737 21.2424L77.7265 25.8L83.153 32.4184C83.3525 32.6166 83.4323 32.894 83.4323 33.2111Z"
          fill="black"
        />
        <path
          d="M98.9139 27.4249C98.6745 27.6627 98.3553 27.7816 97.9962 27.7816H87.3825C87.582 29.0894 88.1805 30.1198 89.1382 30.9124C90.1357 31.7051 91.3327 32.1014 92.7292 32.1014C93.2879 32.1014 93.8864 31.9825 94.4849 31.7843C95.0834 31.5862 95.6021 31.3484 95.9612 31.0313C96.2405 30.8332 96.5198 30.7143 96.8789 30.7143C97.2381 30.7143 97.5174 30.7935 97.7169 30.9917C98.0361 31.2691 98.2356 31.5862 98.2356 31.9429C98.2356 32.2599 98.076 32.5373 97.7967 32.7751C97.1582 33.2903 96.3602 33.6866 95.4425 34.0037C94.4849 34.3207 93.6071 34.4793 92.7292 34.4793C91.213 34.4793 89.8165 34.1622 88.6194 33.4885C87.4224 32.8147 86.4648 31.9032 85.7865 30.7539C85.1082 29.6046 84.749 28.2571 84.749 26.7908C84.749 25.3244 85.0682 23.977 85.7067 22.788C86.3451 21.5991 87.2628 20.6876 88.38 20.0535C89.5372 19.3797 90.814 19.0627 92.2903 19.0627C93.7268 19.0627 94.9637 19.3797 96.0011 20.0138C97.0385 20.6479 97.8366 21.5198 98.3952 22.6691C98.9538 23.8184 99.2331 25.0866 99.2331 26.553C99.273 26.9097 99.1533 27.1871 98.9139 27.4249ZM88.9785 22.5899C88.1406 23.3429 87.582 24.3336 87.3825 25.5622H96.6794C96.5198 24.3336 96.041 23.3429 95.2829 22.5899C94.5248 21.8369 93.5273 21.4802 92.2903 21.4802C90.9337 21.4802 89.8165 21.8369 88.9785 22.5899Z"
          fill="black"
        />
        <path
          d="M115.992 13.0783C116.271 13.3558 116.391 13.6728 116.391 14.1088V26.7908C116.391 28.2175 116.031 29.5253 115.353 30.7143C114.675 31.9032 113.757 32.8147 112.6 33.4885C111.443 34.1622 110.126 34.5189 108.69 34.5189C107.253 34.5189 105.936 34.1622 104.779 33.4885C103.582 32.8147 102.665 31.9032 101.986 30.7143C101.308 29.5253 100.989 28.2175 100.989 26.7908C100.989 25.3641 101.308 24.0562 101.906 22.8673C102.545 21.6783 103.383 20.7668 104.46 20.0931C105.537 19.4194 106.774 19.1023 108.091 19.1023C109.168 19.1023 110.166 19.3401 111.124 19.776C112.041 20.212 112.839 20.8461 113.518 21.6387V14.1088C113.518 13.6728 113.637 13.3558 113.917 13.0783C114.196 12.8009 114.515 12.682 114.954 12.682C115.393 12.682 115.752 12.8406 115.992 13.0783ZM111.243 31.3088C112.001 30.8728 112.6 30.2387 112.999 29.4461C113.438 28.6535 113.637 27.7419 113.637 26.7908C113.637 25.8 113.438 24.9281 112.999 24.1355C112.56 23.3429 111.962 22.7088 111.243 22.2728C110.485 21.8369 109.647 21.5991 108.73 21.5991C107.812 21.5991 106.974 21.8369 106.216 22.2728C105.458 22.7088 104.859 23.3429 104.42 24.1355C103.981 24.9281 103.782 25.8 103.782 26.7908C103.782 27.7816 103.981 28.6535 104.42 29.4461C104.859 30.2387 105.458 30.8728 106.216 31.3088C106.974 31.7447 107.812 31.9825 108.73 31.9825C109.647 31.9825 110.485 31.7843 111.243 31.3088Z"
          fill="black"
        />
        <path
          d="M131.673 20.0931C132.87 20.7668 133.787 21.6783 134.466 22.8673C135.144 24.0562 135.463 25.3641 135.463 26.7908C135.463 28.2175 135.144 29.565 134.546 30.7143C133.907 31.9032 133.069 32.8147 131.992 33.4885C130.915 34.1622 129.678 34.4793 128.361 34.4793C127.284 34.4793 126.286 34.2415 125.328 33.8055C124.411 33.3696 123.613 32.7355 122.934 31.9429V41.5733C122.934 42.0092 122.815 42.3263 122.535 42.6037C122.256 42.8811 121.937 43 121.498 43C121.099 43 120.74 42.8811 120.46 42.6037C120.181 42.3263 120.061 42.0092 120.061 41.5733V26.7908C120.061 25.3641 120.421 24.0562 121.099 22.8673C121.777 21.6783 122.695 20.7668 123.852 20.0931C125.009 19.4194 126.326 19.0627 127.762 19.0627C129.199 19.0627 130.476 19.4194 131.673 20.0931ZM130.276 31.3088C131.034 30.8728 131.633 30.2387 132.072 29.4461C132.511 28.6535 132.71 27.7816 132.71 26.7908C132.71 25.8 132.511 24.9281 132.072 24.1355C131.633 23.3429 131.034 22.7088 130.276 22.2728C129.518 21.8369 128.68 21.5991 127.762 21.5991C126.845 21.5991 126.007 21.8369 125.249 22.2728C124.49 22.7088 123.892 23.3429 123.493 24.1355C123.054 24.9281 122.855 25.8396 122.855 26.7908C122.855 27.7816 123.054 28.6535 123.493 29.4461C123.932 30.2387 124.53 30.8728 125.249 31.3088C126.007 31.7447 126.845 31.9825 127.762 31.9825C128.68 31.9825 129.518 31.7843 130.276 31.3088Z"
          fill="black"
        />
        <path
          d="M138.975 13.0783C139.254 12.8009 139.573 12.682 139.972 12.682C140.371 12.682 140.73 12.8009 140.97 13.0783C141.249 13.3558 141.369 13.6728 141.369 14.0691V29.2479C141.369 29.9217 141.488 30.5161 141.768 30.9521C142.047 31.388 142.366 31.6258 142.765 31.6258H143.483C143.842 31.6258 144.162 31.7447 144.401 32.0221C144.64 32.2995 144.76 32.6166 144.76 33.0129C144.76 33.4092 144.601 33.7659 144.241 34.0037C143.882 34.2811 143.443 34.4 142.885 34.4H142.845C142.047 34.4 141.329 34.2018 140.69 33.7659C140.052 33.33 139.533 32.7355 139.214 31.9429C138.855 31.1502 138.695 30.2783 138.695 29.2876V14.0691C138.576 13.6728 138.735 13.3558 138.975 13.0783Z"
          fill="black"
        />
        <path
          d="M156.97 20.0931C158.127 20.7668 159.045 21.6783 159.723 22.8673C160.401 24.0562 160.76 25.3641 160.76 26.7908V32.9733C160.76 33.3696 160.641 33.7263 160.361 34.0037C160.082 34.2811 159.763 34.4 159.324 34.4C158.925 34.4 158.566 34.2811 158.287 34.0037C158.007 33.7263 157.888 33.4092 157.888 32.9733V31.9429C157.249 32.7355 156.451 33.3696 155.494 33.8055C154.576 34.2415 153.538 34.4793 152.461 34.4793C151.104 34.4793 149.907 34.1622 148.83 33.4885C147.753 32.8147 146.875 31.9032 146.276 30.7143C145.638 29.5253 145.359 28.2175 145.359 26.7908C145.359 25.3641 145.678 24.0562 146.356 22.8673C147.035 21.6783 147.952 20.7668 149.149 20.0931C150.346 19.4194 151.623 19.0627 153.06 19.0627C154.496 19.0627 155.813 19.4194 156.97 20.0931ZM155.613 31.3088C156.371 30.8728 156.97 30.2387 157.369 29.4461C157.808 28.6535 158.007 27.7816 158.007 26.7908C158.007 25.8 157.808 24.9281 157.369 24.1355C156.93 23.3429 156.331 22.7088 155.613 22.2728C154.855 21.8369 154.017 21.5991 153.099 21.5991C152.182 21.5991 151.344 21.8369 150.586 22.2728C149.828 22.7088 149.229 23.3429 148.79 24.1355C148.351 24.9281 148.152 25.8396 148.152 26.7908C148.152 27.7816 148.351 28.6535 148.79 29.4461C149.229 30.2387 149.828 30.8728 150.586 31.3088C151.344 31.7447 152.182 31.9825 153.099 31.9825C154.017 31.9825 154.855 31.7843 155.613 31.3088Z"
          fill="black"
        />
        <path
          d="M177 20.4101C177 20.6083 176.96 20.8065 176.841 21.0839L168.262 40.1862C168.022 40.741 167.663 41.0581 167.185 41.0581C166.985 41.0581 166.786 41.0184 166.506 40.8995C165.948 40.6617 165.668 40.3051 165.668 39.8295C165.668 39.5917 165.708 39.3935 165.828 39.1558L168.621 32.894L162.317 21.0442C162.237 20.8857 162.157 20.6876 162.157 20.4498C162.157 20.212 162.237 19.9742 162.396 19.776C162.556 19.5779 162.756 19.4194 162.995 19.3005C163.155 19.2212 163.354 19.1816 163.554 19.1816C164.072 19.1816 164.471 19.459 164.711 19.9742L169.818 30.0802L174.327 20.0138C174.566 19.459 174.925 19.2212 175.404 19.2212C175.644 19.2212 175.883 19.2608 176.082 19.3401C176.721 19.5382 177 19.8949 177 20.4101Z"
          fill="black"
        />
        <path
          d="M37.5059 6.22212C37.5059 6.22212 43.5309 3.72535 46.2841 10.3834C46.2841 10.3834 40.8974 13.435 37.5059 6.22212Z"
          fill="#00A538"
        />
        <path
          d="M38.7827 13.7124C37.2266 10.2645 34.3936 10.0267 32.9572 10.106C37.2665 7.17327 38.6231 3.05161 38.6231 3.05161C38.0645 1.10968 36.668 1.98157 36.668 1.98157C35.5907 6.10323 33.5158 8.32258 32.2789 9.353C32.4784 8.36221 32.3986 6.73733 30.9621 5.38986C28.9671 3.48756 25.1366 2.73456 21.1465 2.81382C10.6924 3.01198 2.2334 11.2949 2.2334 21.6783C2.2334 32.0618 10.7323 40.5032 21.1864 40.5032C31.6405 40.5032 40.1394 32.0618 40.1394 21.6783C40.1394 18.8645 39.8601 16.13 38.7827 13.7124Z"
          fill="#E30B17"
        />
        <path
          d="M37.7854 18.9041C41.8952 21.0839 42.9326 25.5226 41.7755 27.623C40.5785 29.7235 37.546 31.1899 37.546 31.1899C37.546 31.1899 39.0223 28.2175 38.5036 26.1171C38.0647 23.9373 36.5484 22.035 33.8352 20.1327C33.8352 20.1327 28.6081 16.9226 30.9623 13.3954C31.2017 16.9226 35.511 17.6359 37.7854 18.9041Z"
          fill="white"
        />
        <path
          d="M24.977 19.6175C24.6179 19.2608 24.2189 18.8645 23.8598 18.5078C19.5904 14.1484 17.3958 10.8986 18.9919 7.45069C20.548 4.08203 23.381 3.36866 25.4957 3.36866C26.0544 3.36866 26.6529 3.40829 27.2514 3.52719L28.1292 3.68571L27.5706 2.93272C26.6928 1.74378 25.0169 0.277419 21.9844 0.0396314C21.745 0.0396314 21.4657 0 21.1864 0C19.1515 0 12.3284 0.634101 11.2112 9.03594C10.6127 13.3954 12.6875 17.7548 17.5554 22.3521C22.0243 26.4341 25.6553 30.1198 24.7376 34.2018C24.0593 37.2931 21.2662 38.9972 16.8771 38.9972C15.6801 38.9972 14.6826 38.8783 14.0441 38.7594L12.8072 38.5217L13.7648 39.3539C15.321 40.741 17.9145 42.4055 21.1465 42.4055C22.8623 42.4055 24.578 41.93 26.3337 41.0184C31.8001 38.1253 31.8001 33.33 31.8001 33.0922C32.5981 27.2267 28.8873 23.541 24.977 19.6175Z"
          fill="white"
        />
        <path
          d="M17.7949 29.9613L15.7201 29.882L14.962 29.3668C15.0019 29.2479 15.0418 29.129 15.0817 29.0498C15.1615 28.4553 14.6428 27.5438 14.6428 27.5438C14.6428 27.5438 13.2063 24.3733 12.0093 23.7788C11.0517 23.3032 9.41572 23.6599 8.897 23.8581C6.82215 22.5502 4.18868 20.212 3.59017 19.0627C3.35076 18.5475 2.95175 17.3585 3.19116 15.8129C2.99165 15.8922 2.75225 16.0111 2.59264 16.0903C1.63502 16.4866 -0.759043 17.9134 0.238483 21.4009C0.238483 21.4009 1.39561 25.1263 6.42314 27.4645C6.62265 27.9797 6.82215 30.0009 7.69997 30.3972C8.9369 30.9917 12.8073 30.7936 12.8073 30.7936C12.8073 30.7936 13.725 30.9521 14.4033 30.318C14.4033 30.318 14.4432 30.2783 14.4831 30.1991L15.1615 30.5954L16.3186 32.7355L16.1191 30.8332L17.7949 29.9613Z"
          fill="white"
        />
        <path
          d="M11.3308 25.8793C11.8096 26.4737 12.488 26.3152 12.5279 26.3152H12.5678V26.2756C12.488 25.9982 12.2884 25.7207 12.049 25.3641C11.65 24.8885 11.2111 24.4922 11.1712 24.4922L11.1313 24.4525V24.4922C11.1313 24.4922 10.852 25.0074 11.2111 25.6018C11.2111 25.7207 11.251 25.8 11.3308 25.8793Z"
          fill="black"
        />
        <path
          d="M10.0942 30.0009L10.1341 29.9613C10.1341 29.9613 9.97454 29.2479 9.25632 29.0498C9.17652 29.0101 9.05682 29.0101 8.97702 29.0101C8.2987 28.9309 7.97949 29.4065 7.97949 29.4461V29.4857H8.01939C8.01939 29.4857 8.53811 29.7631 9.13662 29.9217C9.45583 29.9613 9.81494 30.0009 10.0942 30.0009Z"
          fill="black"
        />
      </svg>
    );
  }

  return <img className="inline-block" src="/static/img/logo.svg" />;
};

Logo.defaultProps = {
  color: "white"
};

export default Logo;
