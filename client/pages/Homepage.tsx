import { SyntheticEvent, useState, Dispatch, ChangeEvent } from "react";

import { Tapahtuma, Tyyppi } from "../utils/types";
import MyButton from "../components/MyButton";

interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Homepage = ({ modalOpen, setModalOpen }: Props) => {
  const [uus, setUus] = useState<Tapahtuma>({
    pvm: new Date(),
    mita: "",
    info: "",
    hinta: 0,
    tyyppi: Tyyppi.Myynti,
  });

  const lisaaUus = (event: SyntheticEvent) => {
    event.preventDefault();

    console.log("UUS", uus.pvm);
  };

  const handleUus = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUus((data) => ({
      ...data,
      [name]: value,
    }));

    if (name === "pvm") {
      const dateValue = new Date(value); // Convert the string value to a Date object
      setUus((data) => ({
        ...data,
        [name]: dateValue,
      }));
    }

    if (name === "tyyppi") {
      setUus((prev) => ({ ...prev, tyyppi: value as Tyyppi }));
    }
  };

  // const parseDate = (pvm: Date) => {
  //   const year = pvm.getFullYear();
  //   const month = String(pvm.getMonth() + 1).padStart(2, "0");
  //   const day = String(pvm.getDate()).padStart(2, "0");

  //   return `${year}-${month}-${day}`;
  // };

  // console.log("PRASE", parseDate(uus.pvm as Date));

  return (
    <section>
      <div className={modalOpen ? "overlay" : "overlay-hidden"}>
        <div className="lisays">
          <form onSubmit={lisaaUus}>
            <h2>Lisää uus:</h2>

            {/* PAIVAMAARA */}
            <div className="input-div">
              <label htmlFor="pvm">Päivä</label>
              <input
                type="date"
                name="pvm"
                id="pvm"
                value={uus.pvm?.toISOString().split("T")[0]}
                onChange={handleUus}
              />
            </div>

            {/* MITA OSTETTU / MYYTY */}
            <div className="input-div">
              <label htmlFor="mita">Mikä / Mitä</label>
              <input
                type="text"
                placeholder="esim Taidetarvikkeet"
                name="mita"
                id="mita"
                value={uus.mita}
                onChange={handleUus}
              />
            </div>

            {/* EXTRA INFOO */}
            <div className="input-div">
              <label htmlFor="info">Extra infoo</label>
              <textarea
                style={{
                  minHeight: "80px",
                  resize: "none",
                  overflowY: "hidden",
                  padding: "8px",
                }}
                placeholder="esim. Temperasta ostin tai voi jättää tyhjäks"
                name="info"
                id="info"
                value={uus.info}
                onChange={handleUus}
              />
            </div>

            {/* HINTA */}
            <div className="input-div">
              <label htmlFor="mita">Hinta</label>
              <input
                type="text"
                placeholder="esim 80.46"
                name="hinta"
                id="hinta"
                value={uus.hinta}
                onChange={handleUus}
              />
            </div>

            {/* MYITKO VAI OSTITKO */}
            <div className="select-div">
              <label htmlFor="tyyppi">Myitkö vai Ostitko?</label>
              <select
                id="tyyppi"
                name="tyyppi"
                value={uus.tyyppi}
                onChange={handleUus}
              >
                <option value={Tyyppi.Osto}>{Tyyppi.Osto}</option>
                <option value={Tyyppi.Myynti}>{Tyyppi.Myynti}</option>
              </select>
            </div>

            <div
              style={{
                padding: "4px 0",
                textAlign: "center",
                fontSize: "1.1rem",
                letterSpacing: "1px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <h3>
                  {uus.tyyppi === Tyyppi.Osto ? (
                    <span style={{ color: "var(--secondary)" }}>
                      {uus.mita} -{uus.hinta}&euro;
                    </span>
                  ) : (
                    <span style={{ color: "var(--primary)" }}>
                      {uus.mita} +{uus.hinta}&euro;
                    </span>
                  )}
                </h3>
              </div>
            </div>

            {/* Nappulat */}
            <div className="lisays-nappulat">
              <MyButton
                className="btn-filled"
                style={{
                  width: "40%",
                  padding: "8px 16px",
                  marginRight: "8px",
                  background: "#f5f5f5",
                  border: "1px solid black",
                }}
                children="Poista"
                type="button"
                onClick={() => setModalOpen(false)}
              />
              <MyButton
                className="btn-filled"
                style={{ width: "40%", padding: "8px 16px", marginLeft: "8px" }}
                children="Lisää"
              />
            </div>
          </form>
        </div>
      </div>
      <h1 style={{ fontSize: "32px" }}>TAIDERAHA 2024!</h1>

      {/* Saldoruutu */}
      <div className="saldo">
        <h3 style={{ borderBottom: "1px solid black" }}>Kaikki</h3>
        <div className="ostot">
          <h4>Ostot</h4>
          <p>300 &euro;</p>
        </div>
        <div className="myynnit">
          <h4>Myynnit</h4>
          <p>200 &euro;</p>
        </div>
        <div className="total">
          <h3>Saldo</h3>
          <p>
            <strong>100 &euro;</strong>
          </p>
        </div>
      </div>
      {/* Saldoruutu END */}

      {/* Ite Erittely */}
      <div className="erittely">
        <div className="lista">
          <h2>Kaikki</h2>
          <div className="info-tapahtumat">
            <div>Päivä</div>
            <div>Mitä?</div>
            <div>Infoo</div>
            <div>&euro;</div>
          </div>
          <div className="tapahtumat">
            <div>Päivä</div>

            <div>Mitä?</div>
            <div>infoo</div>
            <div>&euro;</div>
          </div>
          <div className="tapahtumat">
            <div>Päivä</div>

            <div>Mitä?</div>
            <div>infoo</div>
            <div>&euro;</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
