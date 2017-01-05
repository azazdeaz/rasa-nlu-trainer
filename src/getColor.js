import randomSeed from 'random-seed'
const TODAY = new Date().toDateString()

const colors = [
  { name: 'blue',    bg: '#0074d9', },
  { name: 'navy',    bg: '#001f3f', },
  { name: 'lime',    bg: '#01ff70', },
  { name: 'teal',    bg: '#39cccc', },
  { name: 'olive',   bg: '#3d9970', },
  { name: 'fuchsia', bg: '#f012be', },
  { name: 'red',     bg: '#ff4136', },
  { name: 'green',   bg: '#2ecc40', },
  { name: 'orange',  bg: '#ff851b', },
  { name: 'maroon',  bg: '#85144b', },
  { name: 'purple',  bg: '#b10dc9', },
  { name: 'yellow',  bg: '#ffdc00', },
  { name: 'aqua',    bg: '#7fdbff', },
]

export default function getColor(no) {
  const rand = randomSeed.create(TODAY)
  const startIndex = rand(colors.length)
  const index = (startIndex + no) % colors.length

  return {
    backgroundColor: colors[index].bg,
    opacity: 0.3,
    //filter: 'blur(0px)',
  }
}

global.getColor = getColor
