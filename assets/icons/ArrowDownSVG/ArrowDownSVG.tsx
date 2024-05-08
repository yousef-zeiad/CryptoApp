import * as React from "react";
import Svg, { SvgProps, Path, G, Polygon } from "react-native-svg";
const ArrowDownSVG = (props: SvgProps) => (
  <Svg width="800px" height="800px" viewBox="0 0 48 48" {...props}>
    <Path d="M0 0h48v48H0z" fill="none" />
    <G id="Shopicon">
      <G>
        <Polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585  " />
      </G>
    </G>
  </Svg>
);
export default ArrowDownSVG;
