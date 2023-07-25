
export const  isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
}

export const formatDate = (dateString: string) => {
  // const dateString = '2023-03-10T23:06:47.325Z';
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  return formattedDate
}

// console.log(formattedDate); // Output: March 10, 2023, 7:06:47 PM
