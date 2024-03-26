// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-logo">Luisa Loreee</div>
      <div className="navbar" style={{ border: "1px solid lightcyan" }}>
        <a>Kaikki</a>
        <a>Ostot</a>
        <a>Myynnit</a>
        <button>UUS</button>
      </div>
    </nav>
  );
};

export default Navbar;
