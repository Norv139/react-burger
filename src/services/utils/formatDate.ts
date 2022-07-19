export const formatDate = (date: Date): string => {
    let string = '';
    const HOUR = 1000 * 60 * 60;
    const now = new Date();
    
    const Days = {
      'Сегодня': now.getDate(),
      'Вчера': new Date(+now - 24 * HOUR).getDate(),
      '2 дня назад': new Date(+now - 2 * 24 * HOUR).getDate()
    };
  
    const in3days = +now - +date < HOUR * 24 * 2;
  
    if (in3days) {
      for (const day in Days) {
        //@ts-ignore
        if (Days[day] === date.getDate()) {
          string+=day;
        }
      }
    } else {
      string+= date.toLocaleDateString('ru-RU', {month: 'long', day: 'numeric'});
    }
    
    string+=`, ${date.toLocaleTimeString('ru-RU', {hour: 'numeric', minute: 'numeric'})} i-GMT+3`;  
    return string;
  };