interface SaldoProps {
  ostot: number;
  myynnit: number;
  saldo: number;
}

const Saldo = ({ ostot, myynnit, saldo }: SaldoProps) => {
  return (
    <div className="saldo">
      <h3 style={{ borderBottom: "1px solid black" }}>Kaikki</h3>
      <div className="ostot">
        <h4>Ostot</h4>
        <p>{ostot} &euro;</p>
      </div>
      <div className="myynnit">
        <h4>Myynnit</h4>
        <p>{myynnit} &euro;</p>
      </div>
      <div className="total">
        <h3>Saldo</h3>
        <p>
          <strong className={saldo > 0 ? `plussateksti` : `miinusteksti`}>
            {saldo > 0 && "+"}
            {saldo} &euro;
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Saldo;
