const timeMin = '2020-03-09T22:00:00Z';
const timeMax = '2020-03-14T21:59:59Z';

const errorMsg = document.querySelector('.error-msg');
const timeTableWrapper = document.querySelector('.time-table-wrapper');
const timeTableBody = document.querySelector('.time-table-body');
const calendarIdInput = document.querySelector('.calendar-id-input');

window.onload = (event) => {
  if (event.target.URL.includes('access_token')) {
    getCalendarSlots()
  }
};

const runApp = () => {
  localStorage.setItem('calendarId', calendarIdInput.value);
  timeTableBody.innerHTML = '';

  window.location.hash
    ? getCalendarSlots()
    : oauthSignIn()
};

function getCalendarSlots() {
  const freeBusyApi= 'https://www.googleapis.com/calendar/v3/freeBusy';
  const timeZone = 'GMT';
  const calendarId = localStorage.getItem('calendarId');

  const calendarParams = {
    timeMin,
    timeMax,
    timeZone,
    'items': [{ 'id': calendarId }]
  };

  parseToken();
  localStorage.getItem('token');

  fetchCalendarData(freeBusyApi, calendarParams)
    .then(response => {
      errorMsg.style.display = 'none';
      const busySlots = response.calendars[calendarId].busy;
      calcFreeBusySlots(timeMin, timeMax, busySlots);
    })
    .catch(() => {
      errorMsg.style.display = 'block';
      timeTableWrapper.style.display = 'none';
    })
}

function parseToken() {
  const parsedHash = Object.fromEntries(
    new URLSearchParams(window.location.hash.split('#')[1]).entries()
  );
  localStorage.setItem('token', parsedHash.access_token)
}

function calcFreeBusySlots(timeMin, timeMax, busySlots) {
  const freeBusySlots = [];

  if (timeMin !== busySlots[0].start) {
    freeBusySlots.push({
      status: 'free',
      start: timeMin,
      end: busySlots[0].start
    })
  }

  for (let i = 0; i < busySlots.length; i++) {
    let lastSlotEnd = freeBusySlots[freeBusySlots.length - 1].end;

    if (lastSlotEnd === busySlots[i].start) {
      const busySlot = {
        status: 'busy',
        ...busySlots[i]
      };

      freeBusySlots.push(busySlot);
    } else {
      const freeSlot = {
        status: 'free',
        start: lastSlotEnd,
        end: busySlots[i].start
      };

      freeBusySlots.push(freeSlot);
      i--;
    }
  }

  lastSlotEnd = freeBusySlots[freeBusySlots.length - 1].end;

  if (timeMax !== lastSlotEnd) {
    freeBusySlots.push({
      status: 'free',
      start: lastSlotEnd,
      end: timeMax
    })
  }

  console.log('freeBusySlots =', freeBusySlots);
  renderSlotsTable(freeBusySlots);
}

function renderSlotsTable (freeBusySlots) {
  const calendarTitle = document.querySelector('.calendar-title');
  calendarTitle.textContent = `${localStorage.getItem('calendarId')}`;

  const timeFromEl = document.querySelector('.time-from');
  timeFromEl.textContent = `${new Date(Date.parse(timeMin)).toGMTString()}`;

  const timeTillEl = document.querySelector('.time-till');
  timeTillEl.textContent = `${new Date(Date.parse(timeMax)).toGMTString()}`;

  timeTableWrapper.style.display = 'block';

  const tableRows = [];
  freeBusySlots.forEach(timeSlot => {
    const rowCells = [];
    for (let key in timeSlot) {
      let cellContent = null;
      if (key !== 'status') {
        cellContent = new Date(Date.parse(timeSlot[key])).toGMTString()
      } else {
        cellContent = timeSlot[key];
      }
      rowCells.push(`<td>${cellContent}</td>`)
    }
    const tableRow=`<tr>${rowCells.join('')}</tr>`;
    tableRows.push(tableRow);
  });

  timeTableBody.innerHTML = tableRows.join('');
}