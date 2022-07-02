import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, modeAtom } from "../atom";

function ModeBtn() {
  const [getMode, setMode] = useRecoilState(modeAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkHandler = () => {
    setDarkAtom((prev) => !prev);
    setMode((prev) => !prev);
  };
  return (
    <>
      {getMode ? (
        <NightBtn
          modeProp={getMode}
          className="material-icons"
          onClick={toggleDarkHandler}
        >
          dark_mode
        </NightBtn>
      ) : (
        <NightBtn
          modeProp={getMode}
          className="material-icons"
          onClick={toggleDarkHandler}
        >
          brightness_5
        </NightBtn>
      )}
    </>
  );
}

const NightBtn = styled.div<{ modeProp: boolean }>`
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 48px;
  border: 1px solid white;
  background-color: ${(props) =>
    props.modeProp ? "rgba(87, 65, 65, 0.698)" : "rgba(250, 164, 25, 0.808)"};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
export default ModeBtn;
