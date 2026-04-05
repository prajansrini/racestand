// ===== F1 2026 RACE CALENDAR (UTC Source) =====
// Sprint weekends: China, Miami, Canada, Great Britain, Netherlands, Singapore
const f1Races = [
  { round:1, name:'Australian Grand Prix', circuit:'Albert Park Circuit', location:'Melbourne', country:'Australia', flag:'🇦🇺', dateRange:'Mar 6-8', isSprint:false, podium:['RUS','ANT','LEC'], sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Mar 6',time:'07:00 AM',utc:'2026-03-06T01:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Mar 6',time:'10:30 AM',utc:'2026-03-06T05:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Mar 7',time:'07:00 AM',utc:'2026-03-07T01:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Mar 7',time:'10:30 AM',utc:'2026-03-07T05:00:00Z'},
    {name:'Race',day:'Sunday',date:'Mar 8',time:'09:30 AM',utc:'2026-03-08T04:00:00Z'}]},
  { round:2, name:'Chinese Grand Prix', circuit:'Shanghai International Circuit', location:'Shanghai', country:'China', flag:'🇨🇳', dateRange:'Mar 13-15', isSprint:true, podium:['ANT','RUS','HAM'], sprintPodium:['RUS','LEC','HAM'], sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Mar 13',time:'09:00 AM',utc:'2026-03-13T03:30:00Z'},{name:'Sprint Qualifying',day:'Friday',date:'Mar 13',time:'01:00 PM',utc:'2026-03-13T07:30:00Z'},
    {name:'Sprint Race',day:'Saturday',date:'Mar 14',time:'08:30 AM',utc:'2026-03-14T03:00:00Z'},{name:'Qualifying',day:'Saturday',date:'Mar 14',time:'12:30 PM',utc:'2026-03-14T07:00:00Z'},
    {name:'Race',day:'Sunday',date:'Mar 15',time:'12:30 PM',utc:'2026-03-15T07:00:00Z'}]},
  { round:3, name:'Japanese Grand Prix', circuit:'Suzuka International Racing Course', location:'Suzuka', country:'Japan', flag:'🇯🇵', dateRange:'Mar 27-29', isSprint:false, podium:['ANT','PIA','LEC'], sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Mar 27',time:'08:00 AM',utc:'2026-03-27T02:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Mar 27',time:'11:30 AM',utc:'2026-03-27T06:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Mar 28',time:'08:00 AM',utc:'2026-03-28T02:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Mar 28',time:'11:30 AM',utc:'2026-03-28T06:00:00Z'},
    {name:'Race',day:'Sunday',date:'Mar 29',time:'10:30 AM',utc:'2026-03-29T05:00:00Z'}]},
  { round:4, name:'Bahrain Grand Prix', circuit:'Bahrain International Circuit', location:'Sakhir', country:'Bahrain', flag:'🇧🇭', dateRange:'Apr 10-12', isSprint:false, isCancelled: true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Apr 10',time:'05:00 PM',utc:'2026-04-10T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Apr 10',time:'08:30 PM',utc:'2026-04-10T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Apr 11',time:'05:00 PM',utc:'2026-04-11T11:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Apr 11',time:'08:30 PM',utc:'2026-04-11T15:00:00Z'},
    {name:'Race',day:'Sunday',date:'Apr 12',time:'07:30 PM',utc:'2026-04-12T14:00:00Z'}]},
  { round:5, name:'Saudi Arabian Grand Prix', circuit:'Jeddah Corniche Circuit', location:'Jeddah', country:'Saudi Arabia', flag:'🇸🇦', dateRange:'Apr 17-19', isSprint:false, isCancelled: true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Apr 17',time:'07:00 PM',utc:'2026-04-17T13:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Apr 17',time:'10:30 PM',utc:'2026-04-17T17:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Apr 18',time:'07:00 PM',utc:'2026-04-18T13:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Apr 18',time:'10:30 PM',utc:'2026-04-18T17:00:00Z'},
    {name:'Race',day:'Sunday',date:'Apr 19',time:'10:30 PM',utc:'2026-04-19T17:00:00Z'}]},
  { round:6, name:'Miami Grand Prix', circuit:'Miami International Autodrome', location:'Miami', country:'USA', flag:'🇺🇸', dateRange:'May 1-3', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'May 1',time:'10:00 PM',utc:'2026-05-01T16:30:00Z'},{name:'Sprint Qualifying',day:'Saturday',date:'May 2',time:'02:00 AM',utc:'2026-05-01T20:30:00Z'},
    {name:'Sprint Race',day:'Saturday',date:'May 2',time:'09:30 PM',utc:'2026-05-02T16:00:00Z'},{name:'Qualifying',day:'Sunday',date:'May 3',time:'01:30 AM',utc:'2026-05-02T20:00:00Z'},
    {name:'Race',day:'Monday',date:'May 4',time:'01:30 AM',utc:'2026-05-03T20:00:00Z'}]},
  { round:7, name:'Canadian Grand Prix', circuit:'Circuit Gilles Villeneuve', location:'Montreal', country:'Canada', flag:'🇨🇦', dateRange:'May 22-24', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'May 22',time:'11:00 PM',utc:'2026-05-22T17:30:00Z'},{name:'Sprint Qualifying',day:'Saturday',date:'May 23',time:'02:30 AM',utc:'2026-05-22T21:00:00Z'},
    {name:'Sprint Race',day:'Saturday',date:'May 23',time:'10:00 PM',utc:'2026-05-23T16:30:00Z'},{name:'Qualifying',day:'Sunday',date:'May 24',time:'01:30 AM',utc:'2026-05-23T20:00:00Z'},
    {name:'Race',day:'Sunday',date:'May 24',time:'11:30 PM',utc:'2026-05-24T18:00:00Z'}]},
  { round:8, name:'Monaco Grand Prix', circuit:'Circuit de Monaco', location:'Monte Carlo', country:'Monaco', flag:'🇲🇨', dateRange:'Jun 5-7', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jun 5',time:'05:00 PM',utc:'2026-06-05T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Jun 5',time:'08:30 PM',utc:'2026-06-05T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Jun 6',time:'04:00 PM',utc:'2026-06-06T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Jun 6',time:'07:30 PM',utc:'2026-06-06T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Jun 7',time:'06:30 PM',utc:'2026-06-07T13:00:00Z'}]},
  { round:9, name:'Spanish Grand Prix', circuit:'Circuit de Barcelona-Catalunya', location:'Barcelona', country:'Spain', flag:'🇪🇸', dateRange:'Jun 12-14', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jun 12',time:'05:00 PM',utc:'2026-06-12T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Jun 12',time:'08:30 PM',utc:'2026-06-12T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Jun 13',time:'04:00 PM',utc:'2026-06-13T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Jun 13',time:'07:30 PM',utc:'2026-06-13T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Jun 14',time:'06:30 PM',utc:'2026-06-14T13:00:00Z'}]},
  { round:10, name:'Austrian Grand Prix', circuit:'Red Bull Ring', location:'Spielberg', country:'Austria', flag:'🇦🇹', dateRange:'Jun 26-28', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jun 26',time:'05:00 PM',utc:'2026-06-26T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Jun 26',time:'08:30 PM',utc:'2026-06-26T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Jun 27',time:'04:00 PM',utc:'2026-06-27T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Jun 27',time:'07:30 PM',utc:'2026-06-27T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Jun 28',time:'06:30 PM',utc:'2026-06-28T13:00:00Z'}]},
  { round:11, name:'British Grand Prix', circuit:'Silverstone Circuit', location:'Silverstone', country:'Great Britain', flag:'🇬🇧', dateRange:'Jul 3-5', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jul 3',time:'05:00 PM',utc:'2026-07-03T11:30:00Z'},{name:'Sprint Qualifying',day:'Friday',date:'Jul 3',time:'09:00 PM',utc:'2026-07-03T15:30:00Z'},
    {name:'Sprint Race',day:'Saturday',date:'Jul 4',time:'04:30 PM',utc:'2026-07-04T11:00:00Z'},{name:'Qualifying',day:'Saturday',date:'Jul 4',time:'08:30 PM',utc:'2026-07-04T15:00:00Z'},
    {name:'Race',day:'Sunday',date:'Jul 5',time:'07:30 PM',utc:'2026-07-05T14:00:00Z'}]},
  { round:12, name:'Belgian Grand Prix', circuit:'Circuit de Spa-Francorchamps', location:'Spa', country:'Belgium', flag:'🇧🇪', dateRange:'Jul 17-19', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jul 17',time:'05:00 PM',utc:'2026-07-17T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Jul 17',time:'08:30 PM',utc:'2026-07-17T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Jul 18',time:'04:00 PM',utc:'2026-07-18T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Jul 18',time:'07:30 PM',utc:'2026-07-18T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Jul 19',time:'06:30 PM',utc:'2026-07-19T13:00:00Z'}]},
  { round:13, name:'Hungarian Grand Prix', circuit:'Hungaroring', location:'Budapest', country:'Hungary', flag:'🇭🇺', dateRange:'Jul 24-26', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jul 24',time:'05:00 PM',utc:'2026-07-24T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Jul 24',time:'08:30 PM',utc:'2026-07-24T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Jul 25',time:'04:00 PM',utc:'2026-07-25T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Jul 25',time:'07:30 PM',utc:'2026-07-25T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Jul 26',time:'06:30 PM',utc:'2026-07-26T13:00:00Z'}]},
  { round:14, name:'Dutch Grand Prix', circuit:'Circuit Zandvoort', location:'Zandvoort', country:'Netherlands', flag:'🇳🇱', dateRange:'Aug 21-23', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Aug 21',time:'04:00 PM',utc:'2026-08-21T10:30:00Z'},{name:'Sprint Qualifying',day:'Friday',date:'Aug 21',time:'08:00 PM',utc:'2026-08-21T14:30:00Z'},
    {name:'Sprint Race',day:'Saturday',date:'Aug 22',time:'03:30 PM',utc:'2026-08-22T10:00:00Z'},{name:'Qualifying',day:'Saturday',date:'Aug 22',time:'06:30 PM',utc:'2026-08-22T13:00:00Z'},
    {name:'Race',day:'Sunday',date:'Aug 23',time:'06:30 PM',utc:'2026-08-23T13:00:00Z'}]},
  { round:15, name:'Italian Grand Prix', circuit:'Autodromo Nazionale Monza', location:'Monza', country:'Italy', flag:'🇮🇹', dateRange:'Sep 4-6', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Sep 4',time:'04:00 PM',utc:'2026-09-04T10:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Sep 4',time:'07:30 PM',utc:'2026-09-04T14:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Sep 5',time:'04:00 PM',utc:'2026-09-05T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Sep 5',time:'07:30 PM',utc:'2026-09-05T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Sep 6',time:'06:30 PM',utc:'2026-09-06T13:00:00Z'}]},
  { round:16, name:'Spanish Grand Prix (Madrid)', circuit:'IFEMA Madrid Circuit', location:'Madrid', country:'Spain', flag:'🇪🇸', dateRange:'Sep 11-13', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Sep 11',time:'05:00 PM',utc:'2026-09-11T11:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Sep 11',time:'08:30 PM',utc:'2026-09-11T15:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Sep 12',time:'04:00 PM',utc:'2026-09-12T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Sep 12',time:'07:30 PM',utc:'2026-09-12T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Sep 13',time:'06:30 PM',utc:'2026-09-13T13:00:00Z'}]},
  { round:17, name:'Azerbaijan Grand Prix', circuit:'Baku City Circuit', location:'Baku', country:'Azerbaijan', flag:'🇦🇿', dateRange:'Sep 24-26', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Thursday',date:'Sep 24',time:'02:00 PM',utc:'2026-09-24T08:30:00Z'},{name:'Free Practice 2',day:'Thursday',date:'Sep 24',time:'05:30 PM',utc:'2026-09-24T12:00:00Z'},
    {name:'Free Practice 3',day:'Friday',date:'Sep 25',time:'02:00 PM',utc:'2026-09-25T08:30:00Z'},{name:'Qualifying',day:'Friday',date:'Sep 25',time:'05:30 PM',utc:'2026-09-25T12:00:00Z'},
    {name:'Race',day:'Saturday',date:'Sep 26',time:'04:30 PM',utc:'2026-09-26T11:00:00Z'}]},
  { round:18, name:'Singapore Grand Prix', circuit:'Marina Bay Street Circuit', location:'Singapore', country:'Singapore', flag:'🇸🇬', dateRange:'Oct 9-11', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Oct 9',time:'03:00 PM',utc:'2026-10-09T09:30:00Z'},{name:'Sprint Qualifying',day:'Friday',date:'Oct 9',time:'06:00 PM',utc:'2026-10-09T12:30:00Z'},
    {name:'Sprint Race',day:'Saturday',date:'Oct 10',time:'02:30 PM',utc:'2026-10-10T09:00:00Z'},{name:'Qualifying',day:'Saturday',date:'Oct 10',time:'06:30 PM',utc:'2026-10-10T13:00:00Z'},
    {name:'Race',day:'Sunday',date:'Oct 11',time:'05:30 PM',utc:'2026-10-11T12:00:00Z'}]},
  { round:19, name:'United States Grand Prix', circuit:'Circuit of The Americas', location:'Austin', country:'USA', flag:'🇺🇸', dateRange:'Oct 23-26', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Oct 23',time:'11:00 PM',utc:'2026-10-23T17:30:00Z'},{name:'Free Practice 2',day:'Saturday',date:'Oct 24',time:'02:30 AM',utc:'2026-10-23T21:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Oct 24',time:'11:00 PM',utc:'2026-10-24T17:30:00Z'},{name:'Qualifying',day:'Sunday',date:'Oct 25',time:'02:30 AM',utc:'2026-10-24T21:00:00Z'},
    {name:'Race',day:'Monday',date:'Oct 26',time:'01:30 AM',utc:'2026-10-25T20:00:00Z'}]},
  { round:20, name:'Mexico City Grand Prix', circuit:'Autódromo Hermanos Rodríguez', location:'Mexico City', country:'Mexico', flag:'🇲🇽', dateRange:'Oct 30-Nov 2', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Saturday',date:'Oct 31',time:'12:00 AM',utc:'2026-10-30T18:30:00Z'},{name:'Free Practice 2',day:'Saturday',date:'Oct 31',time:'03:30 AM',utc:'2026-10-30T22:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Oct 31',time:'11:00 PM',utc:'2026-10-31T17:30:00Z'},{name:'Qualifying',day:'Sunday',date:'Nov 1',time:'02:30 AM',utc:'2026-10-31T21:00:00Z'},
    {name:'Race',day:'Monday',date:'Nov 2',time:'01:30 AM',utc:'2026-11-01T20:00:00Z'}]},
  { round:21, name:'São Paulo Grand Prix', circuit:'Autódromo José Carlos Pace', location:'Interlagos', country:'Brazil', flag:'🇧🇷', flag:'🇧🇷', dateRange:'Nov 6-8', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Nov 6',time:'09:00 PM',utc:'2026-11-06T15:30:00Z'},{name:'Free Practice 2',day:'Saturday',date:'Nov 7',time:'12:30 AM',utc:'2026-11-06T19:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Nov 7',time:'08:00 PM',utc:'2026-11-07T14:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Nov 7',time:'11:30 PM',utc:'2026-11-07T18:00:00Z'},
    {name:'Race',day:'Sunday',date:'Nov 8',time:'10:30 PM',utc:'2026-11-08T17:00:00Z'}]},
  { round:22, name:'Las Vegas Grand Prix', circuit:'Las Vegas Street Circuit', location:'Las Vegas', country:'USA', flag:'🇺🇸', dateRange:'Nov 19-22', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Nov 20',time:'06:00 AM',utc:'2026-11-20T00:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Nov 20',time:'09:30 AM',utc:'2026-11-20T04:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Nov 21',time:'06:00 AM',utc:'2026-11-21T00:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Nov 21',time:'09:30 AM',utc:'2026-11-21T04:00:00Z'},
    {name:'Race',day:'Sunday',date:'Nov 22',time:'09:30 AM',utc:'2026-11-22T04:00:00Z'}]},
  { round:23, name:'Qatar Grand Prix', circuit:'Lusail International Circuit', location:'Lusail', country:'Qatar', flag:'🇶🇦', dateRange:'Nov 27-29', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Nov 27',time:'07:00 PM',utc:'2026-11-27T13:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Nov 27',time:'10:30 PM',utc:'2026-11-27T17:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Nov 28',time:'08:00 PM',utc:'2026-11-28T14:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Nov 28',time:'11:30 PM',utc:'2026-11-28T18:00:00Z'},
    {name:'Race',day:'Sunday',date:'Nov 29',time:'09:30 PM',utc:'2026-11-29T16:00:00Z'}]},
  { round:24, name:'Abu Dhabi Grand Prix', circuit:'Yas Marina Circuit', location:'Abu Dhabi', country:'UAE', flag:'🇦🇪', dateRange:'Dec 4-6', isSprint:false, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Dec 4',time:'03:00 PM',utc:'2026-12-04T09:30:00Z'},{name:'Free Practice 2',day:'Friday',date:'Dec 4',time:'06:30 PM',utc:'2026-12-04T13:00:00Z'},
    {name:'Free Practice 3',day:'Saturday',date:'Dec 5',time:'04:00 PM',utc:'2026-12-05T10:30:00Z'},{name:'Qualifying',day:'Saturday',date:'Dec 5',time:'07:30 PM',utc:'2026-12-05T14:00:00Z'},
    {name:'Race',day:'Sunday',date:'Dec 6',time:'06:30 PM',utc:'2026-12-06T13:00:00Z'}]}
];

const motogpRaces = [
  { round:1, name:'Thailand Grand Prix', circuit:'Chang International Circuit', location:'Buriram', country:'Thailand', flag:'🇹🇭', dateRange:'Feb 27-Mar 1', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Feb 27',time:'09:15 AM',utc:'2026-02-27T03:45:00Z'},{name:'Practice',day:'Friday',date:'Feb 27',time:'01:30 PM',utc:'2026-02-27T08:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Feb 28',time:'08:40 AM',utc:'2026-02-28T03:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Feb 28',time:'09:20 AM',utc:'2026-02-28T03:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Feb 28',time:'09:45 AM',utc:'2026-02-28T04:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Feb 28',time:'01:30 PM',utc:'2026-02-28T08:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Mar 1',time:'09:10 AM',utc:'2026-03-01T03:40:00Z'},{name:'Race',day:'Sunday',date:'Mar 1',time:'01:30 PM',utc:'2026-03-01T08:00:00Z'}]},
  { round:2, name:'Grand Prix of Brazil', circuit:'Autódromo Intl. Ayrton Senna', location:'Goiania', country:'Brazil', flag:'🇧🇷', dateRange:'Mar 20-22', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Mar 20',time:'08:35 PM',utc:'2026-03-20T15:05:00Z'},{name:'Practice',day:'Saturday',date:'Mar 21',time:'00:30 AM',utc:'2026-03-20T19:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Mar 21',time:'06:40 PM',utc:'2026-03-21T13:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Mar 21',time:'07:20 PM',utc:'2026-03-21T13:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Mar 21',time:'07:45 PM',utc:'2026-03-21T14:15:00Z'},{name:'Sprint Race',day:'Sunday',date:'Mar 22',time:'00:30 AM',utc:'2026-03-21T19:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Mar 22',time:'07:10 PM',utc:'2026-03-22T13:40:00Z'},{name:'Race',day:'Sunday',date:'Mar 22',time:'11:30 PM',utc:'2026-03-22T18:00:00Z'}]},
  { round:3, name:'Americas Grand Prix', circuit:'Circuit of The Americas', location:'Austin', country:'USA', flag:'🇺🇸', dateRange:'Mar 27-29', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Mar 27',time:'09:15 PM',utc:'2026-03-27T15:45:00Z'},{name:'Practice',day:'Saturday',date:'Mar 28',time:'01:30 AM',utc:'2026-03-27T20:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Mar 28',time:'08:40 PM',utc:'2026-03-28T15:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Mar 28',time:'09:20 PM',utc:'2026-03-28T15:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Mar 28',time:'09:45 PM',utc:'2026-03-28T16:15:00Z'},{name:'Sprint Race',day:'Sunday',date:'Mar 29',time:'01:40 AM',utc:'2026-03-28T20:10:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Mar 29',time:'09:10 PM',utc:'2026-03-29T15:40:00Z'},{name:'Race',day:'Monday',date:'Mar 30',time:'01:30 AM',utc:'2026-03-29T20:00:00Z'}]},
  { round:4, name:'Spanish Grand Prix', circuit:'Circuito de Jerez', location:'Jerez', country:'Spain', flag:'🇪🇸', dateRange:'Apr 24-26', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Apr 24',time:'02:15 PM',utc:'2026-04-24T08:45:00Z'},{name:'Practice',day:'Friday',date:'Apr 24',time:'06:30 PM',utc:'2026-04-24T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Apr 25',time:'01:40 PM',utc:'2026-04-25T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Apr 25',time:'02:20 PM',utc:'2026-04-25T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Apr 25',time:'02:45 PM',utc:'2026-04-25T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Apr 25',time:'06:30 PM',utc:'2026-04-25T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Apr 26',time:'01:10 PM',utc:'2026-04-26T07:40:00Z'},{name:'Race',day:'Sunday',date:'Apr 26',time:'05:30 PM',utc:'2026-04-26T12:00:00Z'}]},
  { round:5, name:'French Grand Prix', circuit:'Le Mans', location:'Le Mans', country:'France', flag:'🇫🇷', dateRange:'May 8-10', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'May 8',time:'02:15 PM',utc:'2026-05-08T08:45:00Z'},{name:'Practice',day:'Friday',date:'May 8',time:'06:30 PM',utc:'2026-05-08T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'May 9',time:'01:40 PM',utc:'2026-05-09T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'May 9',time:'02:20 PM',utc:'2026-05-09T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'May 9',time:'02:45 PM',utc:'2026-05-09T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'May 9',time:'06:30 PM',utc:'2026-05-09T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'May 10',time:'01:10 PM',utc:'2026-05-10T07:40:00Z'},{name:'Race',day:'Sunday',date:'May 10',time:'05:30 PM',utc:'2026-05-10T12:00:00Z'}]},
  { round:6, name:'Catalan Grand Prix', circuit:'Circuit de Barcelona-Catalunya', location:'Barcelona', country:'Spain', flag:'🇪🇸', dateRange:'May 15-17', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'May 15',time:'02:15 PM',utc:'2026-05-15T08:45:00Z'},{name:'Practice',day:'Friday',date:'May 15',time:'06:30 PM',utc:'2026-05-15T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'May 16',time:'01:40 PM',utc:'2026-05-16T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'May 16',time:'02:20 PM',utc:'2026-05-16T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'May 16',time:'02:45 PM',utc:'2026-05-16T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'May 16',time:'06:30 PM',utc:'2026-05-16T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'May 17',time:'01:10 PM',utc:'2026-05-17T07:40:00Z'},{name:'Race',day:'Sunday',date:'May 17',time:'05:30 PM',utc:'2026-05-17T12:00:00Z'}]},
  { round:7, name:'Italian Grand Prix', circuit:'Autodromo del Mugello', location:'Mugello', country:'Italy', flag:'🇮🇹', dateRange:'May 29-31', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'May 29',time:'02:15 PM',utc:'2026-05-29T08:45:00Z'},{name:'Practice',day:'Friday',date:'May 29',time:'06:30 PM',utc:'2026-05-29T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'May 30',time:'01:40 PM',utc:'2026-05-30T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'May 30',time:'02:20 PM',utc:'2026-05-30T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'May 30',time:'02:45 PM',utc:'2026-05-30T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'May 30',time:'06:30 PM',utc:'2026-05-30T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'May 31',time:'01:10 PM',utc:'2026-05-31T07:40:00Z'},{name:'Race',day:'Sunday',date:'May 31',time:'05:30 PM',utc:'2026-05-31T12:00:00Z'}]},
  { round:8, name:'Hungarian Grand Prix', circuit:'Balaton Park Circuit', location:'Balaton', country:'Hungary', flag:'🇭🇺', dateRange:'Jun 5-7', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jun 5',time:'02:15 PM',utc:'2026-06-05T08:45:00Z'},{name:'Practice',day:'Friday',date:'Jun 5',time:'06:30 PM',utc:'2026-06-05T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Jun 6',time:'01:40 PM',utc:'2026-06-06T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Jun 6',time:'02:20 PM',utc:'2026-06-06T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Jun 6',time:'02:45 PM',utc:'2026-06-06T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Jun 6',time:'06:30 PM',utc:'2026-06-06T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Jun 7',time:'01:10 PM',utc:'2026-06-07T07:40:00Z'},{name:'Race',day:'Sunday',date:'Jun 7',time:'05:30 PM',utc:'2026-06-07T12:00:00Z'}]},
  { round:9, name:'Czech Republic Grand Prix', circuit:'Automotodrom Brno', location:'Brno', country:'Czech Republic', flag:'🇨🇿', dateRange:'Jun 19-21', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jun 19',time:'02:15 PM',utc:'2026-06-19T08:45:00Z'},{name:'Practice',day:'Friday',date:'Jun 19',time:'06:30 PM',utc:'2026-06-19T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Jun 20',time:'01:40 PM',utc:'2026-06-20T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Jun 20',time:'02:20 PM',utc:'2026-06-20T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Jun 20',time:'02:45 PM',utc:'2026-06-20T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Jun 20',time:'06:30 PM',utc:'2026-06-20T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Jun 21',time:'01:10 PM',utc:'2026-06-21T07:40:00Z'},{name:'Race',day:'Sunday',date:'Jun 21',time:'05:30 PM',utc:'2026-06-21T12:00:00Z'}]},
  { round:10, name:'Dutch TT', circuit:'TT Circuit Assen', location:'Assen', country:'Netherlands', flag:'🇳🇱', dateRange:'Jun 26-28', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jun 26',time:'02:15 PM',utc:'2026-06-26T08:45:00Z'},{name:'Practice',day:'Friday',date:'Jun 26',time:'06:30 PM',utc:'2026-06-26T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Jun 27',time:'01:40 PM',utc:'2026-06-27T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Jun 27',time:'02:20 PM',utc:'2026-06-27T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Jun 27',time:'02:45 PM',utc:'2026-06-27T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Jun 27',time:'06:30 PM',utc:'2026-06-27T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Jun 28',time:'01:10 PM',utc:'2026-06-28T07:40:00Z'},{name:'Race',day:'Sunday',date:'Jun 28',time:'05:30 PM',utc:'2026-06-28T12:00:00Z'}]},
  { round:11, name:'German Grand Prix', circuit:'Sachsenring', location:'Hohenstein-Ernstthal', country:'Germany', flag:'🇩🇪', dateRange:'Jul 10-12', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Jul 10',time:'02:15 PM',utc:'2026-07-10T08:45:00Z'},{name:'Practice',day:'Friday',date:'Jul 10',time:'06:30 PM',utc:'2026-07-10T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Jul 11',time:'01:40 PM',utc:'2026-07-11T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Jul 11',time:'02:20 PM',utc:'2026-07-11T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Jul 11',time:'02:45 PM',utc:'2026-07-11T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Jul 11',time:'06:30 PM',utc:'2026-07-11T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Jul 12',time:'01:10 PM',utc:'2026-07-12T07:40:00Z'},{name:'Race',day:'Sunday',date:'Jul 12',time:'05:30 PM',utc:'2026-07-12T12:00:00Z'}]},
  { round:12, name:'British Grand Prix', circuit:'Silverstone Circuit', location:'Silverstone', country:'Great Britain', flag:'🇬🇧', dateRange:'Aug 7-9', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Aug 7',time:'03:15 PM',utc:'2026-08-07T09:45:00Z'},{name:'Practice',day:'Friday',date:'Aug 7',time:'08:30 PM',utc:'2026-08-07T15:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Aug 8',time:'01:40 PM',utc:'2026-08-08T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Aug 8',time:'03:20 PM',utc:'2026-08-08T09:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Aug 8',time:'03:45 PM',utc:'2026-08-08T10:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Aug 8',time:'08:30 PM',utc:'2026-08-08T15:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Aug 9',time:'02:10 PM',utc:'2026-08-09T08:40:00Z'},{name:'Race',day:'Sunday',date:'Aug 9',time:'05:30 PM',utc:'2026-08-09T12:00:00Z'}]},
  { round:13, name:'Aragón Grand Prix', circuit:'MotorLand Aragón', location:'Alcañiz', country:'Spain', flag:'🇪🇸', dateRange:'Aug 28-30', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Aug 28',time:'02:15 PM',utc:'2026-08-28T08:45:00Z'},{name:'Practice',day:'Friday',date:'Aug 28',time:'06:30 PM',utc:'2026-08-28T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Aug 29',time:'01:40 PM',utc:'2026-08-29T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Aug 29',time:'02:20 PM',utc:'2026-08-29T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Aug 29',time:'02:45 PM',utc:'2026-08-29T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Aug 29',time:'06:30 PM',utc:'2026-08-29T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Aug 30',time:'01:10 PM',utc:'2026-08-30T07:40:00Z'},{name:'Race',day:'Sunday',date:'Aug 30',time:'05:30 PM',utc:'2026-08-30T12:00:00Z'}]},
  { round:14, name:'San Marino Grand Prix', circuit:'Misano World Circuit', location:'Misano Adriatico', country:'Italy', flag:'🇮🇹', dateRange:'Sep 11-13', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Sep 11',time:'02:15 PM',utc:'2026-09-11T08:45:00Z'},{name:'Practice',day:'Friday',date:'Sep 11',time:'06:30 PM',utc:'2026-09-11T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Sep 12',time:'01:40 PM',utc:'2026-09-12T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Sep 12',time:'02:20 PM',utc:'2026-09-12T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Sep 12',time:'02:45 PM',utc:'2026-09-12T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Sep 12',time:'06:30 PM',utc:'2026-09-12T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Sep 13',time:'01:10 PM',utc:'2026-09-13T07:40:00Z'},{name:'Race',day:'Sunday',date:'Sep 13',time:'05:30 PM',utc:'2026-09-13T12:00:00Z'}]},
  { round:15, name:'Austrian Grand Prix', circuit:'Red Bull Ring', location:'Spielberg', country:'Austria', flag:'🇦🇹', dateRange:'Sep 18-20', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Sep 18',time:'02:15 PM',utc:'2026-09-18T08:45:00Z'},{name:'Practice',day:'Friday',date:'Sep 18',time:'06:30 PM',utc:'2026-09-18T13:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Sep 19',time:'01:40 PM',utc:'2026-09-19T08:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Sep 19',time:'02:20 PM',utc:'2026-09-19T08:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Sep 19',time:'02:45 PM',utc:'2026-09-19T09:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Sep 19',time:'06:30 PM',utc:'2026-09-19T13:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Sep 20',time:'01:10 PM',utc:'2026-09-20T07:40:00Z'},{name:'Race',day:'Sunday',date:'Sep 20',time:'05:30 PM',utc:'2026-09-20T12:00:00Z'}]},
  { round:16, name:'Japanese Grand Prix', circuit:'Twin Ring Motegi', location:'Motegi', country:'Japan', flag:'🇯🇵', dateRange:'Oct 2-4', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Oct 2',time:'07:15 AM',utc:'2026-10-02T01:45:00Z'},{name:'Practice',day:'Friday',date:'Oct 2',time:'11:30 AM',utc:'2026-10-02T06:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Oct 3',time:'06:40 AM',utc:'2026-10-03T01:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Oct 3',time:'07:20 AM',utc:'2026-10-03T01:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Oct 3',time:'07:45 AM',utc:'2026-10-03T02:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Oct 3',time:'11:30 AM',utc:'2026-10-03T06:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Oct 4',time:'06:10 AM',utc:'2026-10-04T00:40:00Z'},{name:'Race',day:'Sunday',date:'Oct 4',time:'10:30 AM',utc:'2026-10-04T05:00:00Z'}]},
  { round:17, name:'Indonesian Grand Prix', circuit:'Pertamina Mandalika Circuit', location:'Lombok', country:'Indonesia', flag:'🇮🇩', dateRange:'Oct 9-11', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Oct 9',time:'08:15 AM',utc:'2026-10-09T02:45:00Z'},{name:'Practice',day:'Friday',date:'Oct 9',time:'12:30 PM',utc:'2026-10-09T07:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Oct 10',time:'07:40 AM',utc:'2026-10-10T02:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Oct 10',time:'08:20 AM',utc:'2026-10-10T02:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Oct 10',time:'08:45 AM',utc:'2026-10-10T03:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Oct 10',time:'12:30 PM',utc:'2026-10-10T07:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Oct 11',time:'08:10 AM',utc:'2026-10-11T02:40:00Z'},{name:'Race',day:'Sunday',date:'Oct 11',time:'12:30 PM',utc:'2026-10-11T07:00:00Z'}]},
  { round:18, name:'Australian Grand Prix', circuit:'Phillip Island Circuit', location:'Phillip Island', country:'Australia', flag:'🇦🇺', dateRange:'Oct 23-25', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Oct 23',time:'05:15 AM',utc:'2026-10-22T23:45:00Z'},{name:'Practice',day:'Friday',date:'Oct 23',time:'09:30 AM',utc:'2026-10-23T04:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Oct 24',time:'04:40 AM',utc:'2026-10-23T23:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Oct 24',time:'05:20 AM',utc:'2026-10-23T23:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Oct 24',time:'05:45 AM',utc:'2026-10-24T00:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Oct 24',time:'09:30 AM',utc:'2026-10-24T04:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Oct 25',time:'04:10 AM',utc:'2026-10-24T22:40:00Z'},{name:'Race',day:'Sunday',date:'Oct 25',time:'08:30 AM',utc:'2026-10-25T03:00:00Z'}]},
  { round:19, name:'Malaysian Grand Prix', circuit:'Sepang International Circuit', location:'Sepang', country:'Malaysia', flag:'🇲🇾', dateRange:'Oct 30-Nov 1', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Oct 30',time:'08:15 AM',utc:'2026-10-30T02:45:00Z'},{name:'Practice',day:'Friday',date:'Oct 30',time:'12:30 PM',utc:'2026-10-30T07:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Oct 31',time:'07:40 AM',utc:'2026-10-31T02:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Oct 31',time:'08:20 AM',utc:'2026-10-31T02:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Oct 31',time:'08:45 AM',utc:'2026-10-31T03:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Oct 31',time:'12:30 PM',utc:'2026-10-31T07:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Nov 1',time:'08:10 AM',utc:'2026-11-01T02:40:00Z'},{name:'Race',day:'Sunday',date:'Nov 1',time:'12:30 PM',utc:'2026-11-01T07:00:00Z'}]},
  { round:20, name:'Qatar Grand Prix', circuit:'Lusail International Circuit', location:'Lusail', country:'Qatar', flag:'🇶🇦', dateRange:'Nov 6-8', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Nov 6',time:'06:15 PM',utc:'2026-11-06T12:45:00Z'},{name:'Practice',day:'Friday',date:'Nov 6',time:'10:30 PM',utc:'2026-11-06T17:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Nov 7',time:'05:50 PM',utc:'2026-11-07T12:20:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Nov 7',time:'06:10 PM',utc:'2026-11-07T12:40:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Nov 7',time:'06:35 PM',utc:'2026-11-07T13:05:00Z'},{name:'Sprint Race',day:'Saturday',date:'Nov 7',time:'10:30 PM',utc:'2026-11-07T17:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Nov 8',time:'06:10 PM',utc:'2026-11-08T12:40:00Z'},{name:'Race',day:'Sunday',date:'Nov 8',time:'10:30 PM',utc:'2026-11-08T17:00:00Z'}]},
  { round:21, name:'Portuguese Grand Prix', circuit:'Autódromo Internacional do Algarve', location:'Portimão', country:'Portugal', flag:'🇵🇹', dateRange:'Nov 20-22', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Nov 20',time:'06:15 PM',utc:'2026-11-20T12:45:00Z'},{name:'Practice',day:'Friday',date:'Nov 20',time:'08:30 PM',utc:'2026-11-20T15:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Nov 21',time:'03:40 PM',utc:'2026-11-21T10:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Nov 21',time:'04:20 PM',utc:'2026-11-21T10:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Nov 21',time:'04:45 PM',utc:'2026-11-21T11:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Nov 21',time:'08:30 PM',utc:'2026-11-21T15:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Nov 22',time:'03:10 PM',utc:'2026-11-22T09:40:00Z'},{name:'Race',day:'Sunday',date:'Nov 22',time:'07:00 PM',utc:'2026-11-22T13:30:00Z'}]},
  { round:22, name:'Valencia Grand Prix', circuit:'Circuit Ricardo Tormo', location:'Valencia', country:'Spain', flag:'🇪🇸', dateRange:'Nov 27-29', isSprint:true, sessions:[
    {name:'Free Practice 1',day:'Friday',date:'Nov 27',time:'01:15 PM',utc:'2026-11-27T07:45:00Z'},{name:'Practice',day:'Friday',date:'Nov 27',time:'05:30 PM',utc:'2026-11-27T12:00:00Z'},
    {name:'Free Practice 2',day:'Saturday',date:'Nov 28',time:'02:40 PM',utc:'2026-11-28T09:10:00Z'},{name:'Qualifying 1',day:'Saturday',date:'Nov 28',time:'03:20 PM',utc:'2026-11-28T09:50:00Z'},
    {name:'Qualifying 2',day:'Saturday',date:'Nov 28',time:'03:45 PM',utc:'2026-11-28T10:15:00Z'},{name:'Sprint Race',day:'Saturday',date:'Nov 28',time:'07:30 PM',utc:'2026-11-28T14:00:00Z'},
    {name:'Warm Up',day:'Sunday',date:'Nov 29',time:'02:10 PM',utc:'2026-11-29T08:40:00Z'},{name:'Race',day:'Sunday',date:'Nov 29',time:'06:30 PM',utc:'2026-11-29T13:00:00Z'}]}
];

// ===== F1 2026 STANDINGS (After Round 3 — Japanese GP) =====
// Real results: Russell won Australia, Antonelli won China & Japan
// Sprint: China Sprint — Russell P1, Leclerc P2, Hamilton P3
const f1DriverStandings = [
  {pos:1,name:'Kimi Antonelli',team:'Mercedes',points:72,nat:'it'},
  {pos:2,name:'George Russell',team:'Mercedes',points:63,nat:'gb'},
  {pos:3,name:'Charles Leclerc',team:'Ferrari',points:49,nat:'mc'},
  {pos:4,name:'Lewis Hamilton',team:'Ferrari',points:41,nat:'gb'},
  {pos:5,name:'Lando Norris',team:'McLaren',points:25,nat:'gb'},
  {pos:6,name:'Oscar Piastri',team:'McLaren',points:21,nat:'au'},
  {pos:7,name:'Oliver Bearman',team:'Haas',points:17,nat:'gb'},
  {pos:8,name:'Pierre Gasly',team:'Alpine',points:15,nat:'fr'},
  {pos:9,name:'Max Verstappen',team:'Red Bull Racing',points:12,nat:'nl'},
  {pos:10,name:'Liam Lawson',team:'Racing Bulls',points:10,nat:'nz'},
  {pos:11,name:'Arvid Lindblad',team:'Racing Bulls',points:4,nat:'gb'},
  {pos:12,name:'Isack Hadjar',team:'Red Bull Racing',points:4,nat:'fr'},
  {pos:13,name:'Gabriel Bortoleto',team:'Sauber',points:2,nat:'br'},
  {pos:14,name:'Carlos Sainz',team:'Williams',points:2,nat:'es'},
  {pos:15,name:'Esteban Ocon',team:'Haas',points:1,nat:'fr'},
  {pos:16,name:'Franco Colapinto',team:'Alpine',points:1,nat:'ar'},
  {pos:17,name:'Nico Hülkenberg',team:'Sauber',points:0,nat:'de'},
  {pos:18,name:'Alex Albon',team:'Williams',points:0,nat:'th'},
  {pos:19,name:'Valtteri Bottas',team:'Cadillac',points:0,nat:'fi'},
  {pos:20,name:'Sergio Pérez',team:'Cadillac',points:0,nat:'mx'},
  {pos:21,name:'Fernando Alonso',team:'Aston Martin',points:0,nat:'es'},
  {pos:22,name:'Lance Stroll',team:'Aston Martin',points:0,nat:'ca'}
];
const f1TeamStandings = [
  {pos:1,name:'Mercedes',points:135,color:'#00f5d0',drivers:['Kimi Antonelli','George Russell'], secondary: '#00a39e'},
  {pos:2,name:'Ferrari',points:90,color:'#da291c',drivers:['Charles Leclerc','Lewis Hamilton'], secondary: '#ffffff'},
  {pos:3,name:'McLaren',points:46,color:'#ff8000',drivers:['Lando Norris','Oscar Piastri'], secondary: '#ffffff'},
  {pos:4,name:'Haas',points:18,color:'#e6002d',drivers:['Oliver Bearman','Esteban Ocon'], secondary: '#000000'},
  {pos:5,name:'Alpine',points:16,color:'#061a4d',drivers:['Pierre Gasly','Franco Colapinto'], secondary: '#FF88BD'},
  {pos:6,name:'Red Bull Racing',points:16,color:'#00162b',drivers:['Max Verstappen','Isack Hadjar'], secondary: '#db0a40'},
  {pos:7,name:'Racing Bulls',points:14,color:'#070b36',drivers:['Liam Lawson','Arvid Lindblad'], secondary: '#ffffff'},
  {pos:8,name:'Sauber',points:2,color:'#101319',drivers:['Gabriel Bortoleto','Nico Hülkenberg'], secondary: '#ffffff'},
  {pos:9,name:'Williams',points:2,color:'#000a20',drivers:['Carlos Sainz','Alex Albon'], secondary: '#2270ff'},
  {pos:10,name:'Cadillac',points:0,color:'#ffffff',drivers:['Valtteri Bottas','Sergio Pérez'], secondary: '#000000'},
  {pos:11,name:'Aston Martin',points:0,color:'#00665e',drivers:['Fernando Alonso','Lance Stroll'], secondary: '#b9c600'}
];

// ===== MOTOGP 2026 STANDINGS (After Round 3 — Americas GP) =====
// Real results after Thailand, Brazil, Americas
const motogpRiderStandings = [
  {pos:1,name:'Marco Bezzecchi',team:'Aprilia Racing',points:81,nat:'it'},
  {pos:2,name:'Jorge Martín',team:'Aprilia Racing',points:77,nat:'es'},
  {pos:3,name:'Pedro Acosta',team:'Red Bull KTM Factory Racing',points:60,nat:'es'},
  {pos:4,name:'Fabio Di Giannantonio',team:'Pertamina Enduro VR46',points:50,nat:'it'},
  {pos:5,name:'Marc Márquez',team:'Ducati Lenovo Team',points:45,nat:'es'},
  {pos:6,name:'Raúl Fernández',team:'Trackhouse Racing',points:40,nat:'es'},
  {pos:7,name:'Ai Ogura',team:'Trackhouse Racing',points:37,nat:'jp'},
  {pos:8,name:'Alex Márquez',team:'Gresini Racing',points:28,nat:'es'},
  {pos:9,name:'Francesco Bagnaia',team:'Ducati Lenovo Team',points:25,nat:'it'},
  {pos:10,name:'Luca Marini',team:'Honda HRC Castrol',points:23,nat:'it'},
  {pos:11,name:'Enea Bastianini',team:'Red Bull KTM Tech3',points:22,nat:'it'},
  {pos:12,name:'Brad Binder',team:'Red Bull KTM Factory Racing',points:17,nat:'za'},
  {pos:13,name:'Franco Morbidelli',team:'Pertamina Enduro VR46',points:14,nat:'it'},
  {pos:14,name:'Fermín Aldeguer',team:'Gresini Racing',points:13,nat:'es'},
  {pos:15,name:'Johann Zarco',team:'Honda LCR',points:13,nat:'fr'},
  {pos:16,name:'Diogo Moreira',team:'Honda LCR',points:9,nat:'br'},
  {pos:17,name:'Fabio Quartararo',team:'Monster Yamaha',points:6,nat:'fr'},
  {pos:18,name:'Alex Rins',team:'Monster Yamaha',points:3,nat:'es'},
  {pos:19,name:'Joan Mir',team:'Honda HRC Castrol',points:3,nat:'es'},
  {pos:20,name:'Toprak Razgatlioglu',team:'Pramac Yamaha',points:1,nat:'tr'},
  {pos:21,name:'Maverick Viñales',team:'Red Bull KTM Tech3',points:0,nat:'es'},
  {pos:22,name:'Jack Miller',team:'Pramac Yamaha',points:0,nat:'au'}
];
const motogpTeamStandings = [
  {pos:1,name:'Aprilia Racing Team',points:158,color:'#a30000',drivers:['Marco Bezzecchi','Jorge Martín']},
  {pos:2,name:'Red Bull KTM Factory Racing',points:77,color:'#ff6600',drivers:['Pedro Acosta','Brad Binder']},
  {pos:3,name:'Trackhouse Racing Team',points:77,color:'#1e1e1e',drivers:['Raúl Fernández','Ai Ogura']},
  {pos:4,name:'Ducati Team',points:70,color:'#cc0000',drivers:['Marc Márquez','Francesco Bagnaia']},
  {pos:5,name:'Team VR46',points:64,color:'#ffdd00',drivers:['Fabio Di Giannantonio','Franco Morbidelli']},
  {pos:6,name:'Gresini Racing',points:41,color:'#00bfff',drivers:['Alex Márquez','Fermín Aldeguer']},
  {pos:7,name:'Honda HRC',points:26,color:'#ff4500',drivers:['Luca Marini','Joan Mir']},
  {pos:8,name:'Tech 3',points:22,color:'#ff6600',drivers:['Enea Bastianini','Maverick Viñales']},
  {pos:9,name:'Team LCR',points:22,color:'#ff0000',drivers:['Johann Zarco','Diogo Moreira']},
  {pos:10,name:'Yamaha Factory Racing',points:9,color:'#0033cc',drivers:['Fabio Quartararo','Alex Rins']},
  {pos:11,name:'Pramac Racing',points:1,color:'#660099',drivers:['Toprak Razgatlioglu','Jack Miller']}
];
const motogpConstructorStandings = [
  {pos:1,name:'Aprilia',points:101,color:'#a30000'},
  {pos:2,name:'Ducati',points:69,color:'#cc0000'},
  {pos:3,name:'KTM',points:65,color:'#ff6600'},
  {pos:4,name:'Honda',points:28,color:'#ff0000'},
  {pos:5,name:'Yamaha',points:9,color:'#0033cc'}
];
