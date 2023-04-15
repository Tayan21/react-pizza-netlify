import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={517}
    viewBox="0 0 280 517"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="280" rx="11" ry="11" width="280" height="21" /> 
    <rect x="0" y="320" rx="12" ry="12" width="280" height="88" /> 
    <rect x="0" y="429" rx="0" ry="0" width="95" height="30" /> 
    <rect x="186" y="429" rx="0" ry="0" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton