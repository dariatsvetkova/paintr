import { IoCopyOutline } from "react-icons/io5";

function CopyButton(props) {
  return (
    <>
      {document.queryCommandSupported("copy") && (
        <button
          onClick={(e) =>
            props.copyData(e, props.id, () => {
              props.callback(true);
              setTimeout(() => props.callback(false), 3000);
            })
          }
        >
          <IoCopyOutline />
        </button>
      )}
    </>
  );
}

export default CopyButton;
