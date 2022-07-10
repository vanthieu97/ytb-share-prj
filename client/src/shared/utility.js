export const getErrorMsg = (error) => {
  return error?.response?.data?.msg || error?.msg || 'Error'
}
