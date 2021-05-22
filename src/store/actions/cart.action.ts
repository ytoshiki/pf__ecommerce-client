export const dispatchFetchCartItems = () => {
  return (dispatch: any) => {
    const storedCartItems = localStorage.getItem(`${process.env.REACT_APP_LOCAL_KEY}`);
  };
};
