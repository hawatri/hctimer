export const formatTime = (milliseconds: number, showMilliseconds: boolean = true): string => {
  const totalMs = Math.round(milliseconds);
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;

  if (minutes > 0) {
    const secondsStr = seconds.toString().padStart(2, '0');
    const msStr = showMilliseconds ? `.${Math.floor(ms / 10).toString().padStart(2, '0')}` : '';
    return `${minutes}:${secondsStr}${msStr}`;
  }

  const msStr = showMilliseconds ? `.${Math.floor(ms / 10).toString().padStart(2, '0')}` : '';
  return `${seconds}${msStr}`;
};