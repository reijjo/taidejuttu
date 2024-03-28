import {
  SyntheticEvent,
  useState,
  Dispatch,
  ChangeEvent,
  useEffect,
} from "react";
import { isAxiosError } from "axios";

import { Tapahtuma, Tyyppi } from "../utils/types";
import rahaApi from "../api/rahaApi";
import MyButton from "../components/MyButton";
import Saldo from "../components/homepage/Saldo";
import MyyntiOsto from "../components/homepage/MyyntiOsto";
import Muokkaus from "../components/homepage/Muokkaus";

interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  muokkaaOpen: boolean;
  setMuokkaaOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Homepage = ({
  modalOpen,
  setModalOpen,
  muokkaaOpen,
  setMuokkaaOpen,
}: Props) => {
  const [uus, setUus] = useState<Tapahtuma>({
    pvm: new Date(),
    mita: "",
    info: "",
    hinta: 0,
    tyyppi: Tyyppi.Osto,
  });
  const [kaikki, setKaikki] = useState<Tapahtuma[]>([]);
  const [ostot, setOstot] = useState(0);
  const [myynnit, setMyynnit] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [tapahtumaId, setTapahtumaId] = useState<string>("");

  // Get all
  useEffect(() => {
    const getAll = async () => {
      setOstot(0);
      setMyynnit(0);
      setSaldo(0);

      try {
        const res = await rahaApi.getAllTapahtumat();
        setKaikki(res);

        // Myynnit ja Ostot ja Saldo
        const laskutoimitus = res.reduce(
          (acc, current) => ({
            ...acc,
            ostot:
              acc.ostot + (current.tyyppi === Tyyppi.Osto ? current.hinta : 0),
            myynnit:
              acc.myynnit +
              (current.tyyppi === Tyyppi.Myynti ? current.hinta : 0),
          }),
          { ostot: 0, myynnit: 0 }
        );

        const saldo = laskutoimitus.myynnit - laskutoimitus.ostot;

        setOstot(laskutoimitus.ostot);
        setMyynnit(laskutoimitus.myynnit);
        setSaldo(saldo);
      } catch (error: unknown) {
        console.log("error fetching tapahtumat", error);
      }
    };
    getAll();
  }, [modalOpen, muokkaaOpen]);

  // Lisaa uus
  const lisaaUus = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const uusTapahtuma: Tapahtuma = {
        pvm: uus.pvm,
        mita: uus.mita,
        info: uus.info,
        hinta: uus.hinta,
        tyyppi: uus.tyyppi,
      };

      const res = await rahaApi.addNewTapahtuma(uusTapahtuma);
      console.log("uus response", res);
      setUus({
        pvm: new Date(),
        mita: "",
        info: "",
        hinta: 0,
        tyyppi: Tyyppi.Myynti,
      });
      setModalOpen(false);

      // console.log("UUS", uusTapahtuma);
    } catch (error: unknown | string) {
      // setInfoMsg(error?.response.data.message)
      if (isAxiosError(error)) {
        setInfoMsg(error?.response?.data.message);
        setTimeout(() => {
          setInfoMsg(null);
        }, 5000);
        console.log("Joku errori", error?.response?.data.message);
      }
    }
  };

  // Muokkaa
  const avaaMuokkaus = (id: string) => {
    setTapahtumaId(id);
    setModalOpen(false);
    setMuokkaaOpen(true);
  };

  // Input handler
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

  console.log("kaikki", kaikki);
  // console.log("ostot", ostot, myynnit, saldo);
  console.log("muokkaaOpen", muokkaaOpen);

  // RETURN ALKAA
  return (
    <section>
      {/* Overlay */}
      <div className={modalOpen || muokkaaOpen ? "overlay" : "overlay-hidden"}>
        {/* Uus Osto/Myynti */}
        {modalOpen && (
          <MyyntiOsto
            lisaaUus={lisaaUus}
            uus={uus}
            handleUus={handleUus}
            infoMsg={infoMsg}
            setModalOpen={setModalOpen}
            setUus={setUus}
          />
        )}

        {muokkaaOpen && (
          <Muokkaus
            lisaaUus={lisaaUus}
            infoMsg={infoMsg}
            setMuokkaaOpen={setMuokkaaOpen}
            setUus={setUus}
            id={tapahtumaId}
          />
        )}
      </div>
      <h1 style={{ fontSize: "32px" }}>TAIDERAHA 2024!</h1>

      {/* Saldoruutu */}
      <Saldo ostot={ostot} myynnit={myynnit} saldo={saldo} />
      {/* Saldoruutu END */}

      {/* Ite Erittely */}
      <div className="erittely">
        <div className="lista">
          <h2>Kaikki</h2>
          <div className="info-tapahtumat">
            <div className="pvm-osa">Päivä</div>
            <div>Mitä?</div>
            <div className="info-osio">Infoo</div>
            <div>&euro;</div>
            <div>Muokkaa</div>
          </div>
          {kaikki.map((k) => (
            <div
              key={k.id}
              className={`tapahtumat ${
                k.tyyppi === Tyyppi.Osto ? `miinusta` : `plussaa`
              }`}
            >
              <div className="pvm-osa">
                {String(k.pvm).split("T")[0].split("-").reverse().join("-")}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {k.mita}
              </div>
              <div className="info-osio">{k.info}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {k.tyyppi === Tyyppi.Osto ? `-` : `+`} {k.hinta}&euro;
              </div>
              <div
                style={{
                  height: "maxContent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <button style={{ padding: "2px 4px" }}>Muokkaa</button> */}
                <MyButton
                  className="btn-filled"
                  children="Muokkaa"
                  style={{
                    borderRadius: "4px",
                    padding: "2px 4px",
                    background: "var(--white)",
                    fontSize: "12px",
                  }}
                  onClick={() => avaaMuokkaus(String(k.id))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
