import randomSeed from 'random-seed'

const colors = [
  { name: 'aqua',    bg: '#7fdbff', },
  { name: 'blue',    bg: '#0074d9', },
  { name: 'lime',    bg: '#01ff70', },
  { name: 'navy',    bg: '#001f3f', },
  { name: 'teal',    bg: '#39cccc', },
  { name: 'olive',   bg: '#3d9970', },
  { name: 'green',   bg: '#2ecc40', },
  { name: 'red',     bg: '#ff4136', },
  { name: 'maroon',  bg: '#85144b', },
  { name: 'orange',  bg: '#ff851b', },
  { name: 'purple',  bg: '#b10dc9', },
  { name: 'yellow',  bg: '#ffdc00', },
  { name: 'fuchsia', bg: '#f012be', },
]

export default function getColor(seed) {
  const rand = randomSeed.create(seed)
  const index = rand(colors.length)

  return {
    backgroundColor: colors[index].bg,
    opacity: 0.3,
    filter: 'blur(1px)',
  }
}

global.getColor = getColor
