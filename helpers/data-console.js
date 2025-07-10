const currentDate = new Date().toLocaleString('es-ES')
const description = {
  'Fecha y hora': currentDate
}

export function printAsciiTable (data) {
  const entries = Object.entries({ ...description, ...data })
  const keyWidth = Math.max(...entries.map(([k]) => k.length))
  const valWidth = Math.max(...entries.map(([, v]) => String(v).length))
  const totalWidth = keyWidth + valWidth + 7

  const line = (left, fill, right) => `${left}${fill.repeat(totalWidth - 2)}${right}`
  const row = (key, value) =>
    `│ ${key.padEnd(keyWidth)} │ ${String(value).padEnd(valWidth)} │`

  console.log(line('┌', '─', '┐'))
  entries.forEach(([key, value]) => {
    console.log(row(key, value))
  })
  console.log(line('└', '─', '┘'))
}

printAsciiTable(description)
