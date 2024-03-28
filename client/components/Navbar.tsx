import { Dispatch } from "react";
import MyButton from "./MyButton";

interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setMuokkaaOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ modalOpen, setModalOpen, setMuokkaaOpen }: Props) => {
  return (
    <nav>
      <div className="nav-stuff">
        <div className="nav-logo">Luisa Lore</div>
        <div className="nav-logo-mobile">mobile</div>
        <div className="navbar">
          <a>Kaikki</a>
          <a>Ostot</a>
          <a>Myynnit</a>
          <MyButton
            children="Uus"
            className="btn-filled nav-button"
            onClick={() => {
              setMuokkaaOpen(false);
              setModalOpen(!modalOpen);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
