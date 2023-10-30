import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);

dayjs.locale("es", {
  relativeTime: {
    future: "En %s",
    past: "Hace %s",
    s: "unos segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años",
  },
});

export const FormatoFecha = (date) => {
  return dayjs(date).fromNow();
};
