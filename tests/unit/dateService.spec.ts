import { dateService } from "@/util/DateService";
import { expect } from "chai";

describe("DateService.ts", () => {
  it("kurzes Datum postiv", () => {
    const datesPostive = [
      "2020-01-01",
      "2020-12-31",
      "1970-01-01", // Der PKV Date check prüft auf Date >= Unixtimestamp(0)
      "2020-02-31" // Overflow for days will be added > 02.03
    ];
    datesPostive.forEach(date => {
      console.log("dateService.spec.ts: current Date: ", date);
      expect(dateService.checkDate(date)).to.be.true;
    });
  });

  it("kurzes Datum negativ", () => {
    const datesNegative = ["23/25/2014", "1969-11-31"];
    datesNegative.forEach(date => {
      console.log("dateService.spec.ts: current Date: ", date);
      expect(dateService.checkDate(date)).to.be.false;
    });
  });
});
