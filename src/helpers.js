export const getRemainTime = deadline => {
  const remainTime = deadline
  const remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2)
  const reaminMinutes = ('0' + Math.floor((remainTime / 60) % 60)).slice(-2)
  const remainHours = Math.floor(remainTime / 3600)

  return {
    remainTime,
    remainSeconds,
    reaminMinutes,
    remainHours,
    formatedTime: `${remainHours}:${reaminMinutes}:${remainSeconds}`
  }
}

export const timeInSeconds = str => {
  const [hours, minutes, seconds] = str.split(':')
  const totalSeconds = hours * 3600 + minutes * 60 + parseInt(seconds)
  return totalSeconds
}

