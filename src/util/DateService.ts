export interface DateServiceI {
  checkDate(str: string): boolean;
}

class DateService implements DateServiceI {
  checkDate(str: string) {
    //TODO this sucks!
    // Funktioniert fürs erste, arbeitet aber anders als erwartet.
    // Keine Exception für Kontrollfluss, Zahlenwerte die zu groß sind werden von Parse auf den nächsten Monat addiert.
    try {
      if (Date.parse(str) >= 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}

export let dateService = new DateService();
