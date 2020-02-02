import * as moment from "moment";

export interface Rechnung {
  id: String;
  arzt: String;
  datum: String;
  betrag: number;
  beihilfeEingereichtAm: String;
  pkvEingereichtAm: String;
  bemerkung: String;
  scan: String;
}
