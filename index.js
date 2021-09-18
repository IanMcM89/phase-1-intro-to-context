// Your code here

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let updatedsRecord = createTimeInEvent(sRecord, "2019-01-01 0900"); createTimeOutEvent(sRecord, "2019-01-01 1300"); createTimeInEvent(sRecord, "2019-01-02 1000"); createTimeOutEvent(sRecord, "2019-01-02 1300");
let updatedrRecord = createTimeInEvent(rRecord, "2019-01-11 0900"); createTimeOutEvent(rRecord, "2019-01-11 1300"); createTimeInEvent(rRecord, "2019-01-12 1000"); createTimeOutEvent(rRecord, "2019-01-12 1300");

employeeArray = [updatedrRecord, updatedsRecord];

//console.log(employeeArray);

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    let result = array.map(a => createEmployeeRecord(a));
    return result;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let newObj = {
        type: 'TimeIn',
        date: dateStamp.substr(0, 10),
        hour: parseInt(dateStamp.substr(11, 14), 10)
    }
    employeeRecord.timeInEvents.push(newObj);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let newObj = {
        type: 'TimeOut',
        date: dateStamp.substr(0, 10),
        hour: parseInt(dateStamp.substr(11, 14), 10)
    }
    employeeRecord.timeOutEvents.push(newObj);
    return employeeRecord;
}

function filterTimeInEvents(employeeRecord, dateStamp) {
    let getTimeInEvents = employeeRecord.timeInEvents;
    let filterTimeIn = getTimeInEvents.filter(eventObj => eventObj.date === dateStamp);
    return filterTimeIn;
}

function filterTimeOutEvents(employeeRecord, dateStamp) {
    let getTimeOutEvents = employeeRecord.timeOutEvents;
    let filterTimeOut = getTimeOutEvents.filter(eventObj => eventObj.date === dateStamp);
    return filterTimeOut;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let timeIn = filterTimeInEvents(employeeRecord, dateStamp);
    let timeOut = filterTimeOutEvents(employeeRecord, dateStamp);
    let result = ((timeOut[0].hour) - (timeIn[0].hour))/100;
    //console.log(result);
    return result;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
    return hoursWorked * employeeRecord.payPerHour
}

function getDates(employeeRecord) {
    let getDates = employeeRecord.timeInEvents;
    let dateArray = getDates.map(obj => obj.date);
    //console.log(getDates);
    return dateArray;
}

function allWagesFor(employeeRecord) {
    let dates = getDates(employeeRecord);
    //console.log(dates);
    let mapDates = dates.map(date => wagesEarnedOnDate(employeeRecord, date));
    //console.log(mapDates);
    let reducer = (previousValue, currentValue) => previousValue + currentValue;
    return mapDates.reduce(reducer);
}

function calculatePayroll(recordsArray) {
    let allWages = recordsArray.map(obj => allWagesFor(obj));
    //console.log(allWages);
    let reducer = (previousValue, currentValue) => previousValue + currentValue;
    return allWages.reduce(reducer);
}

console.log(calculatePayroll(employeeArray));