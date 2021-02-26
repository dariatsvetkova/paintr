import hslToHex from "./hslToHex";
import { IoRemove } from "react-icons/io5";

function UserColour(props) {
  const col = hslToHex(props.colour);

  return (
    <div className="user-colour">
      <div
        className="rect"
        style={{
          backgroundColor: `${col}`,
        }}
      />
      <span>{col}</span>
      <button onClick={() => props.handleRemove(props.ind)}>
        <IoRemove />
      </button>
    </div>
  );
}

export default UserColour;
