import React from "react";
import { SyntheticEvent, ChangeEvent, Dispatch } from "react";
import { Tapahtuma, Tyyppi } from "../../utils/types";
import MyButton from "../MyButton";

interface Props {
  lisaaUus: (event: SyntheticEvent) => Promise<void>;
  uus: Tapahtuma;
  handleUus: (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  infoMsg: string | null;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setUus: Dispatch<React.SetStateAction<Tapahtuma>>;
}

const OstoMyynti = ({
  lisaaUus,
  uus,
  handleUus,
  infoMsg,
  setModalOpen,
  setUus,
}: Props) => {
  return (
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

        {/* ERROR MESSAGE */}
        {infoMsg ? <p style={{ textAlign: "center" }}>{infoMsg}</p> : null}
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
            children="Pois"
            type="button"
            onClick={() => {
              setModalOpen(false);
              setUus({
                pvm: new Date(),
                mita: "",
                info: "",
                hinta: 0,
                tyyppi: Tyyppi.Myynti,
              });
            }}
          />
          <MyButton
            className="btn-filled"
            style={{ width: "40%", padding: "8px 16px", marginLeft: "8px" }}
            children="Lisää"
          />
        </div>
      </form>
    </div>
  );
};

export default OstoMyynti;
