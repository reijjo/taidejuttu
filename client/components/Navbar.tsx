import { Dispatch } from "react";
import MyButton from "./MyButton";

interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ modalOpen, setModalOpen }: Props) => {
  return (
    <nav>
      <div className="nav-logo">Luisa Lore</div>
      <div className="navbar">
        <a>Kaikki</a>
        <a>Ostot</a>
        <a>Myynnit</a>
        <MyButton
          children="Uus"
          className="btn-filled nav-button"
          onClick={() => setModalOpen(!modalOpen)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
