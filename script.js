const timetable = document.getElementById('timetable')
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const periodsLength = 10
const daysOfWeekLenght = daysOfWeek.length

function createTable() {
    // tao tieu de dong dau tien
    const headingTable = document.createElement('tr')
    const emptyCell = document.createElement('td')
    
    headingTable.appendChild(emptyCell)

    for (let day = 0; day < daysOfWeekLenght; day++) {
        const headingCtx = document.createElement('th')
        headingCtx.innerText = `${daysOfWeek[day]}`
        headingTable.appendChild(headingCtx)
    }

    timetable.appendChild(headingTable)

    // tao du lieu bang
    for (let row = 0; row < periodsLength; row++) {
        const rowTable = document.createElement('tr')
        const periodCell = document.createElement('th')

        periodCell.innerText = `${row + 1}`
        rowTable.appendChild(periodCell)

        for (let col = 0; col < daysOfWeekLenght; col++) {
            const cellTable = document.createElement('td')
            cellTable.innerText = ''
            rowTable.appendChild(cellTable)
        }

        timetable.appendChild(rowTable)
    }
}

function getInfo() {
    const subject = document.getElementById('subject').value.trim()
    const teacher = document.getElementById('teacher').value.trim()
    const classroom = document.getElementById('classroom').value.trim()
    const day = document.getElementById('day').value
    const startPeriod = parseInt(document.getElementById('start-period').value)
    const endPeriod = parseInt(document.getElementById('end-period').value)

    if (subject && teacher && classroom && !isNaN(startPeriod) && !isNaN(endPeriod) &&
        startPeriod <= endPeriod && startPeriod > 0 && endPeriod <= periodsLength) {
        const dayIndex = daysOfWeek.indexOf(day)
        
        let isFull = false
        for (let i = startPeriod; i <= endPeriod; i++) {
            const cell = timetable.rows[i].cells[dayIndex + 1]
            if (cell.innerText !== '' || cell.style.display === 'none') {
                isFull = true
                break
            }
        }
        
        if (isFull) {
            alert("Lỗi: Trùng lịch")
            return
        }

        const firstCell = timetable.rows[startPeriod].cells[dayIndex + 1]
        firstCell.innerHTML = `<strong>${subject}</strong><br>${teacher}<br>${classroom}`
        firstCell.rowSpan = endPeriod - startPeriod + 1
        
        for (let i = startPeriod + 1; i <= endPeriod; i++) {
            timetable.rows[i].cells[dayIndex + 1].style.display = 'none'
        }

        clearInputs()
    } else {
        alert("Vui lòng nhập đầy đủ thông tin")
    }
}

function clearInputs() {
    document.getElementById('subject').value = ''
    document.getElementById('teacher').value = ''
    document.getElementById('classroom').value = ''
    document.getElementById('start-period').value = ''
    document.getElementById('end-period').value = ''
}

createTable()