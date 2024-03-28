import React, { useEffect, useState } from "react";
import { SyntheticEvent, ChangeEvent, Dispatch } from "react";
import { Tapahtuma, Tyyppi } from "../../utils/types";
import MyButton from "../MyButton";
import rahaApi from "../../api/rahaApi";

interface Props {
  lisaaUus: (event: SyntheticEvent) => Promise<void>;

  infoMsg: string | null;
  setMuokkaaOpen: Dispatch<React.SetStateAction<boolean>>;
  setUus: Dispatch<React.SetStateAction<Tapahtuma>>;
  id: string;
}

const Muokkaus = ({ infoMsg, setMuokkaaOpen, id }: Props) => {
  const [info, setInfo] = useState<Tapahtuma>({
    pvm: new Date(),
    mita: "",
    info: "",
    hinta: 0,
    tyyppi: Tyyppi.Osto,
  });
  const [poistatko, setPoistatko] = useState(false);

  // Eti yks
  useEffect(() => {
    const etiYks = async (id: string) => {
      const res = await rahaApi.etiTapahtuma(id);
      setInfo(res);
    };
    etiYks(id);
  }, [id]);

  // Paivita
  const updateTehtava = async (event: SyntheticEvent) => {
    event.preventDefault();

    const updatedJuttu = {
      pvm: info.pvm,
      mita: info.mita,
      info: info.info,
      hinta: info.hinta,
      tyyppi: info.tyyppi,
    };

    console.log("updatedjuttu", updatedJuttu);

    try {
      const res = await rahaApi.updateTapahtuma(id, updatedJuttu);
      setMuokkaaOpen(false);
      console.log("Updated res", res);
    } catch (error: unknown) {
      console.log("Error updating juttu", error);
    }
  };

  // Poista
  const poistaTehtava = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const res = await rahaApi.poistaTapahtuma(id);
      console.log("res", res);
      setPoistatko(false);
      setMuokkaaOpen(false);
    } catch (error: unknown) {
      console.log("Error removin tehtava", error);
    }
  };

  // Input Handler
  const handleMuokkaus = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setInfo((data) => ({
      ...data,
      [name]: value,
    }));

    // if (name === "pvm") {
    //   const dateValue = new Date(value); // Convert the string value to a Date object
    //   setInfo((data) => ({
    //     ...data,
    //     [name]: dateValue,
    //   }));
    // }

    if (name === "tyyppi") {
      setInfo((prev) => ({ ...prev, tyyppi: value as Tyyppi }));
    }
  };

  console.log("MUOKKAUIS info", info);

  return (
    <div className="lisays">
      {!poistatko ? (
        <form onSubmit={updateTehtava}>
          <h2>Muokkaa:</h2>

          {/* PAIVAMAARA */}
          <div className="input-div">
            <label htmlFor="pvm">Päivä</label>
            <input
              type="date"
              name="pvm"
              id="pvm"
              value={String(info.pvm).split("T")[0]}
              onChange={handleMuokkaus}
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
              value={info.mita}
              onChange={handleMuokkaus}
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
              value={info.info}
              onChange={handleMuokkaus}
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
              value={info.hinta}
              onChange={handleMuokkaus}
            />
          </div>

          {/* MYITKO VAI OSTITKO */}
          <div className="select-div">
            <label htmlFor="tyyppi">Myitkö vai Ostitko?</label>
            <select
              id="tyyppi"
              name="tyyppi"
              value={info.tyyppi}
              onChange={handleMuokkaus}
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
                {info.tyyppi === Tyyppi.Osto ? (
                  <span style={{ color: "var(--secondary)" }}>
                    {info.mita} -{info.hinta}&euro;
                  </span>
                ) : (
                  <span style={{ color: "var(--primary)" }}>
                    {info.mita} +{info.hinta}&euro;
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
                setMuokkaaOpen(false);
              }}
            />
            <MyButton
              className="btn-filled"
              style={{ width: "40%", padding: "8px 16px", marginLeft: "8px" }}
              children="Muokkaa"
              type="submit"
            />
          </div>
          <div className="poisto-nappula-div">
            <button
              className="poisto-nappula"
              style={{ width: "100%", padding: "8px 16px" }}
              type="button"
              onClick={() => setPoistatko(true)}
            >
              Poista
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={poistaTehtava}>
          <h2>
            Ootko varma et haluut poistaa (
            <strong>
              {info.mita} {info.hinta}&euro;
            </strong>
            )?
          </h2>
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
              children="EN POISTA!"
              type="button"
              onClick={() => {
                setPoistatko(false);
              }}
            />
            <MyButton
              className="btn-filled"
              style={{ width: "40%", padding: "8px 16px", marginLeft: "8px" }}
              children="Kyllä."
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Muokkaus;
