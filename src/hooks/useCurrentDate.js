import React from 'react'

const useCurrentDate = (locale = 'en-GB') => {
  return new Date().toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default useCurrentDate;