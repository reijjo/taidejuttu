export enum Tyyppi {
  Osto = "Osto (- rahaa)",
  Myynti = "Myynti (+ rahaa)",
}

export interface Tapahtuma {
  pvm?: Date;
  mita: string;
  info?: string;
  hinta: number;
  tyyppi?: Tyyppi;
}
