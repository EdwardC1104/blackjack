import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function Icon(props: SvgProps) {
  return (
    <Svg width={17} height={17} fill="none" viewBox="0 0 17 17" {...props}>
      <Path
        d="M17 8.5c0 .822-.666 1.488-1.489 1.488H9.988v5.524a1.487 1.487 0 11-2.975 0V9.989H1.487c-.41 0-.782-.167-1.052-.436a1.487 1.487 0 011.052-2.54h5.525V1.489a1.488 1.488 0 012.976 0v5.525h5.525c.821 0 1.486.666 1.487 1.487z"
        fill="#D6D7D7"
      />
    </Svg>
  );
}

export default Icon;
