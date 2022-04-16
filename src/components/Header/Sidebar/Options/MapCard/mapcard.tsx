import mapcard__style from "./mapcard.module.css";
import { FC } from "react";
const MapCard: FC<{
  name: string;
  creator: string;
  link: string;
}> = ({ creator, link, name }) => {
  return (
    <div className={mapcard__style.container}>
      <a className={mapcard__style.name} href={link}>
        {name}
      </a>
      <h3 className={mapcard__style.creator}>Creator : {creator}</h3>
    </div>
  );
};
export default MapCard;
