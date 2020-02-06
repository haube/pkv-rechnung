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
  erstattungBh: number;
  erstattungPkv: number;
}
export interface FilteredData {
  data: Array<any>;
  summen: Array<{ key: string; value: number }>;
}
