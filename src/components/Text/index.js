// import React, { useState } from "react";
// import * as colors from "../../data/constants";
// import "../../App.css";

// const Text = ({ children, bold, size, color, style, mode, className }) => {
//   const textStyle = {
//     whiteSpace: "normal",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     width: "100%",
//     height: "100%",
//     textAlign: "left",
//     wordWrap: "break-word",
//   };

//   const getColor = () => {
//     switch (color) {
//       case "white":
//         return colors.defaultWhite;
//       case "black":
//         return colors.defaultBlack;
//       case "pink":
//         return colors.pink;
//       case 'green':
//         return colors.green;
//       default:
//         return color;
//     }
//   };

//   const getStyle = () => {
//     switch (mode) {
//       case "ellipsis":
//         return {
//           ...textStyle,
//           color: getColor(),
//           ...style,
//         };
//       default:
//         return {
//           color: getColor(),
//           ...style,
//         };
//     }
//   };

//   const renderTitle = () => {
//     switch (typeof children) {
//       case "string":
//         let title = children.toString().split("\n");
//         return title.map((v, index) => {
//           return (
//             <div
//               key={index}
//               style={getStyle()}
//               className={`${bold == true && "fbold"} fs${size}`}
//             >
//               {v}
//             </div>
//           );
//         });
//       default:
//         return (
//           <div
//             style={getStyle()}
//             className={`${bold == true && "fbold"} fs${size}`}
//           >
//             {children}
//           </div>
//         );
//     }
//   };

//   return (
//     <div
//       style={getStyle()}
//       className={`${className} ${bold == true && "fbold"} fs${size}`}
//     >
//       {children}
//     </div>
//   );
// };

// Text.defaultProps = {
//   bold: false,
//   size: 17,
//   color: "#000",
//   style: null,
//   mode: "normal",
// };

// export default Text;
