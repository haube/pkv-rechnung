import * as moment from "moment";

export interface Rechnung {
  id: String;
  arzt: String;
  datum: String;
  betrag: number;
  beihilfeEingAm: String;
  pkvEingAm: String;
  bemerkung: String;
  scan: String;
}
export interface FilteredData {
  data: Array<any>;
  summen: { [key: string]: number };
}
